async function callGeo(city, date, days_away) {

    console.log("::: Inside callGeoAPI :::");

    getUserName('http://localhost:8081/getUserName')
    .then(function(res) {
        getGeoRequest("http://api.geonames.org/searchJSON", city, res.user_name)
        .then(function(res) {
            const data = {
                'latitude': res.geonames[0].lat,
                'longitude': res.geonames[0].lng,
                'country': res.geonames[0].name,
                'date': date,
                'days_away': days_away
            }

            postData('http://localhost:8081/postGeoData', data);
            return data;
        })
        .then(function(data) {
            getWeatherKey('http://localhost:8081/getWeatherKey')
            .then(function(res) {
                let baseURL;
                if (days_away == 0) {
                    baseURL = "http://api.weatherbit.io/v2.0/current"
                }
                else {

                    baseURL = "http://api.weatherbit.io/v2.0/forecast/daily"
                }
                
                getWeatherRequest(baseURL, res.weather_key, data.latitude, data.longitude)
                .then(function(res) {
                    console.log(res);
                    let data;
                    if(res.data.length == 1) {
                        data = {
                            'temp': res.data[0].temp,
                            'description': res.data[0].weather.description,
                            'size': res.data.length
                        }
                    }else {
                        let date_left;
                        if(days_away < 15) {
                            date_left = days_away;
                        }
                        else {
                            date_left = 15;
                        }
                        data = {
                            'min_temp': res.data[date_left].min_temp,
                            'max_temp': res.data[date_left].max_temp,
                            'description': res.data[date_left].weather.description,
                            'size': res.data.length
                        }
                    }

                    postWeatherData('http://localhost:8081/postWeatherData', data);
                    return data;
                })
                .then(function(data) {
                    getPictureKey('http://localhost:8081/getPixabayKey')
                    .then(function(res) {
                        getPictureRequest('https://pixabay.com/api/', res.pixabay_key, city)
                        .then(function(res) {
                            console.log(res.hits[0].webformatURL);
                            let url;
                            if(!res.hits[0].webformatURL) {
                                url = '';
                            }
                            else {
                                url = res.hits[0].webformatURL;
                            }
                            const data = {
                                'url': url,
                                'tag': res.hits[0].tags
                            }

                            postPictureData('http://localhost:8081/postPictureData', data)

                        })
                    })
                })
                .then(function(data) {
                    updateGeoUI();
                    updateWeatherUI();
                    updatePictureUI();
                })
            })
        })
    })
}



const getGeoRequest = async(baseURL='', city='', user_name='')=>{
    const res = await fetch(baseURL + "?q=" + city + "&username=" + user_name);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
}

const getWeatherRequest = async(baseURL='', key='', lat='', lon='')=> {
    const res = await fetch(baseURL+'?key=' + key + '&lat=' + lat + '&lon=' + lon);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log("error", error);
    }
}

const getPictureRequest = async(baseURL='', key='', q='') => {
    const res = await fetch(baseURL+'?key='+key+'%q='+q);
    try {
        const data = await res.json();
        return data;
    }catch(error) {
        console.log("error", error);
    }
}

const getUserName = async(baseURL='')=> {
    const res = await fetch(baseURL);
    try {
        const data = await res.json();
        return data;
    } catch(error) {
        console.log('error', error);
    }
}

const getWeatherKey = async(baseURL='') => {
    const res = await fetch(baseURL);
    try {
        const data = await res.json();
        return data
    } catch(error) {
        console.log("error", error);
    }
}

const getPictureKey = async(baseURL='') => {
    const res = await fetch(baseURL);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
}

const postData = async(baseURL = '', data={}) => {

    const response = await fetch(baseURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log("response is: " + response);

    try {
        const newData = await response.json();
    } catch(error) {
        console.log('error', error);
    }
}

const postWeatherData = async(baseURL = '', data={}) => {
    const response = await fetch(baseURL, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    console.log('response is: ' + response);

    try {
        const newData = await response.json();
    } catch(error) {
        console.log("error", error);
    }
}

const postPictureData = async(baseURL = '', data={}) => {
    const response = await fetch(baseURL, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    console.log('response is: ' + response);

    try {
        const newData = await response.json();
    } catch(error) {
        console.log('error', error);
    }
}

const updateGeoUI = async() => {
    const response = await fetch('http://localhost:8081/retrieveGeoData');
    try {
        const allData = await response.json();
        document.getElementById('latitude').innerHTML = "Latitude: " + allData.latitude;
        document.getElementById('longitude').innerHTML = "Longitude: " + allData.longitude;
        document.getElementById('country').innerHTML = "Country: " + allData.country;
        document.getElementById('departure').innerHTML = "Departure date: " + allData.date;
        if (allData.days_away>1) {
            document.getElementById('days_away').innerHTML = "Days left: " + allData.days_away + " days left.";
        }
        else {
            document.getElementById('days_away').innerHTML = "Days left: " + allData.days_away + " day left.";
        }
        
    } catch(error) {
        console.log('error', error);
    }
}

const updateWeatherUI = async() => {
    const response = await fetch('http://localhost:8081/retrieveWeatherData');
    try {
        const allData =await response.json();
        if(allData.size==1){
            document.getElementById('temp')
                .innerHTML = "Current temperature: " + allData.temp;
            document.getElementById('description')
                .innerHTML = "The weather is " + allData.description; 
        }
        else {
            document.getElementById('temp')
                .innerHTML = "High: " + allData.max_temp + ", Low: " + allData.min_temp;
            document.getElementById('description')
                .innerHTML = "Weather description: " + allData.description;
        }
        
    }catch(error) {
        console.log("error", error);
    }
}

const updatePictureUI = async() => {
    const response = await fetch('http://localhost:8081/retrievePictureData');
    try {
        const allData = await response.json();
        document.getElementById('picture').innerHTML = "<img id='pic' src='"+allData.url +"' alt='"+ allData.tag +"'>";

    }catch(error) {
        console.log('error', error);
    }
}

export { callGeo }