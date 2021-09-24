async function callGeo(city, date, days_away) {

    console.log("::: Inside callGeoAPI :::");

    getUserName('http://localhost:8081/getUserName')
    .then(function(res) {
        getRequest("http://api.geonames.org/searchJSON", city, res.user_name)
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
            updateUI();
        })
    })
}

const getRequest = async(baseURL='', city='', user_name='')=>{
    const res = await fetch(baseURL + "?q=" + city + "&username=" + user_name);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
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

const updateUI = async() => {
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

export { callGeo }