function handleCancel() {
    console.log("Inside handleCancel()");

    document.getElementById('picture').innerHTML = '';
    document.getElementById('city').value = '';
    document.getElementById('departure-date').value = '';
    document.getElementById('travel-info').innerHTML = '';
    document.getElementById('departing').innerHTML = '';
    document.getElementById('temp').innerHTML = '';
    document.getElementById('description').innerHTML = '';

}

export { handleCancel }