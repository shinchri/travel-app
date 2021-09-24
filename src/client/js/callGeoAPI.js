async function callGeo(city, date) {

    console.log("::: Inside callGeoAPI :::");

    getUserName('http://localhost:8081/getUserName')
    .then(function(res) {
        getRequest("http://api.geonames.org/searchJSON", city, res.user_name)
        .then(function(res) {

            const data = {
                'latitude': res.geonames[0].lat,
                'longitude': res.geonames[0].lng,
                'country': res.geonames[0].name
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
        document.getElementById('latitude').innerHTML = allData.latitude;
        document.getElementById('longitude').innerHTML = allData.longitude;
        document.getElementById('country').innerHTML = allData.country;
    } catch(error) {
        console.log('error', error);
    }
}

export { callGeo }