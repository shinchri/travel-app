import { callGeo } from './callGeoAPI.js'

function handleClick() {
    console.log('Inside handleClick()');

    const cityInput = document.getElementById('city').value;

    callGeo(cityInput);

}

export { handleClick }