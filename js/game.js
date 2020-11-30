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
    for (let i = 0; i <= config.totalGuessLocations; i += 1) {
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
    if (guessLocationsArray) {
        // Set current location of next location and removes from guessLocationsArray
        currentLocation = guessLocationsArray[0]
        guessLocationsArray.unshift

        // Update prompt with newLocation
    } else {
        console.error('No guess locations from promptLocation()')
    }
}

function checkLocation (buildingZone) {
    const isCorrectLocation = (buildingZone.name === currentLocation)

    if (isCorrectLocation) {
        updateShape(buildingZone, config.successColor)
        // Prompt user with success prompt
    } else {
        updateShape(buildingZone, config.failColor)
    }
}

function updateShape (buildingZone, fillColor) {
    // Clear Zone Shape
    buildingZone.setMap(null)

    // Create new Zone Object with Proper fillColor
    let newZoneObj = zoneConfig
    newZoneObj.bounds = buildingZone.boundsObj
    newZoneObj.name = buildingZone.name
    newZoneObj.fillColor = fillColor

    // Generate new Shape from newZoneObj
    new google.maps.Rectangle( newZoneObj )
}
