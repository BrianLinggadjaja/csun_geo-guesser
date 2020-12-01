/*
    * State
    */


let guessLocationsArray = []
let currentLocation = null


/*
    * Functionality
    */


function startNewGame () {
    resetMap()
    generateZoneListing()
    randomizeGuessLocations()
    updateNewLocation()
    toggleStartScreen()
}

function randomizeGuessLocations () {
    // Copy zoneListingsNameArray without modifying original content
    let locations = []
    zoneListingsNameArray.map(location => locations.push(location))

    // Reset guess locations array
    guessLocationsArray = []

    // Populate the guessLocationsArray with new locations
    for (let i = 0; i <= (config.totalGuessLocations - 1); i += 1) {
        let randomlySelectedIndex = getRandomInt(locations.length)

        guessLocationsArray.push(locations[randomlySelectedIndex])
        locations.splice(randomlySelectedIndex, 1)
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function updateNewLocation () {
    // Check if guessLocationsArray is populated
    let hasLocations = (guessLocationsArray.length !== 0)

    if (hasLocations) {
        // Set current location of next location and removes from guessLocationsArray
        currentLocation = guessLocationsArray[0]
        guessLocationsArray.shift()

        // Update status using the currentLocation
        updateLocationStatus()
    } else {
        // Complete status
    }
}

function updateLocationStatus () {
    const statusElem = document.querySelector('#status')
    statusElem.innerText = 'The current location to guess is ' + currentLocation
}

function checkLocation (buildingZone) {
    const isCorrectLocation = (buildingZone.name === currentLocation)

    if (isCorrectLocation) {
        updateShape(buildingZone, config.successColor)
        // resetMap()
        // generateZoneListing()
        // updateNewLocation()
    } else {
        updateShape(buildingZone, config.failColor)
    }
}

function updateShape (buildingZone, fillColor) {
    // Clear Zone Shape
    buildingZone.setMap(null)

    // Create new Zone Object with Proper fillColor
    let newZoneObj = {...zoneConfig}
    newZoneObj.bounds = buildingZone.boundsObj
    newZoneObj.name = buildingZone.name
    newZoneObj.fillColor = fillColor

    // Generate new Shape from newZoneObj
    let newBuildingZone = new google.maps.Rectangle( newZoneObj )
    zoneRefsArray.push(newBuildingZone)
}
