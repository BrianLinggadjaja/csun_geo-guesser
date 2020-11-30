/*
    * Populate Google Maps
    */


let map
let zoneRefsArray = []
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
    const maxZoom = 18

    map = new google.maps.Map(document.getElementById("map"), {
        mapId: mapId,
        center: csunCordinates,
        restriction: geoFence,
        zoom: minZoom,
        maxZoom: maxZoom,
        minZoom: minZoom,
        disableDoubleClickZoom: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false
    })
}


/*
    * Shapes Generation
    */


function generateZoneListing () {
    // Generate Building Zones from Listing
    for (const buildingName of zoneListingsNameArray) {
        createBuildingZone(zoneListings, buildingName)
    }
}

function createBuildingZone (zoneListings, buildingName) {
    let isBuildingValid = (zoneListings[buildingName])

    if (isBuildingValid) {
        // Create new Shape based off the buildingName Zone Object
        let newBuildingZone = new google.maps.Rectangle( new Zone(zoneListings[buildingName], buildingName).getZoneObject() )
        
        // Attach Double Click Listener
        addBuildingZoneListener(newBuildingZone)

        zoneRefsArray.push(newBuildingZone)
    }
}

function addBuildingZoneListener (buildingZone) {
    buildingZone.addListener('dblclick', () => {
        checkLocation(buildingZone)
    })
}

function resetMap () {
    // Grab all the shapes references in the array and clear the shape
    for (const shapeObj of zoneRefsArray) {
        shapeObj.setMap(null)
    }

    // CLear all references in shapes array
    zoneRefsArray = []
}
