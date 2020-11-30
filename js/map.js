/*
    * Populate Google Maps
    */


let map
function initMap () {
    const csunCordinates = {
        lat: 34.23839816216911,
        lng: -118.52932792017283
    }

    const geoFence = {
        latLngBounds: {
            north: 34.25525563820801,
            south: 34.23547084176029,
            east: -118.52317398174648,
            west: -118.53615522148043,
        },
    }

    const mapId = 'd9ab15593fae6746'
    const minZoom = 17
    const maxZoom = 19

    map = new google.maps.Map(document.getElementById("map"), {
        mapId: mapId,
        center: csunCordinates,
        restriction: geoFence,
        zoom: minZoom,
        maxZoom: maxZoom,
        minZoom: minZoom,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    })

    const zoneListingsNameArray = Object.keys(zoneListings)
    for (const building of zoneListingsNameArray) {
        createBuildingZone(building)
    }
}

function createBuildingZone(nameOfBuilding) {
    let isBuildingValid = (zoneListings[nameOfBuilding])

    if (isBuildingValid) {
        // Create new Shape based off the nameOfBuilding Zone Object
        new google.maps.Rectangle( new Zone(zoneListings[nameOfBuilding]).getZoneObject() )
    }
}