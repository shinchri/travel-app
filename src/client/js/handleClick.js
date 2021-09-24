import { callGeo } from './callGeoAPI.js'

function handleClick() {
    console.log('Inside handleClick()');
    let d = new Date();
    let date;
    if (d.getMonth()+1 <10) {
        date = d.getFullYear()+'-0'+(d.getMonth()+1)+'-'+ d.getDate();
    }
    else {
        date = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+ d.getDate();
    }

    const cityInput = document.getElementById('city').value;
    const dateInput = document.getElementById('departure-date').value;

    if (cityInput == '' || dateInput === '') {
        alert("Please enter values for both cityInput and dateInput");
    }
    else if (new Date(dateInput).getTime() < (new Date(date).getTime())){
        alert("Please enter date values that is today or later.")
    }
    else {
        callGeo(cityInput, dateInput, (new Date(dateInput).getTime() - new Date(date).getTime())/86400000);
    }

    

}

export { handleClick }