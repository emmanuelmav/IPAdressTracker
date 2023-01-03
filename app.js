// IPFY API //
const form = document.querySelector('form');
const address = document.querySelector('.address');
const local = document.querySelector('.location');
const time = document.querySelector('.timezone');
const internet = document.querySelector('.isp');

//---- CREATING MAP WITH LEAFLET.JS AND TILE PROVIDER -----

var map = L.map('map').setView([45.50884, -73.58781], 13);
var marker = L.marker([45.50884, -73.58781]).addTo(map);

// MAP TILE/STYLE PROVIDER
var Stadia_OSMBright = L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
})
Stadia_OSMBright.addTo(map);



// FORM EVENT LISTENER
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.querySelector('input');
    const inputVal = input.value;
    try {

        const response = await fetch(`
        https://geo.ipify.org/api/v2/country,city?apiKey=at_L8G7QUOfxeCuPJhiEhg0HWCPuDyzf&ipAddress=${inputVal}`);
        const data = await response.json();

        // API SENDS BACK DATA WHICH IS STORED IN VARIABLES
        const ip = data.ip;
        const country = data.location.country;
        const region = data.location.region;
        const timezone = data.location.timezone;
        const latitude = data.location.lat;
        const longitude = data.location.lng;
        const isp = data.isp;

        address.textContent = ip;
        local.textContent = `${region}, ${country}`;
        time.textContent = `UTC${timezone}`;
        internet.textContent = isp;

        console.log(data);
        // console.log(data.location.lat);
        // console.log(ip);
        // console.log(country);
        // console.log(timezone);
        // console.log(isp);
        // console.log(region);
        console.log(latitude);
        console.log(longitude);

        L.marker([latitude, longitude]).addTo(map);
        map.setView([latitude, longitude
        ], 13);





    } catch (e) {
        console.log('Error', e)
    }



})







