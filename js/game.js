/*
    * Functionality
    */


function startNewGame () {
    resetMap()
    generateZoneListing()
    randomizeGuessLocations()
    updateNewLocation()
    toggleElem('.map-wrapper')
    startTimer()
    updateStatus()
}

function endGame () {
    resetMap()
    resetState()
    toggleElem('.map-wrapper')
    toggleElem('.status-modal-wrapper')
}

// Reset state to defaults
function resetState () {
    globalState.guessLocationsArray = []
    globalState.currentLocation = null

    globalState.timerRef = null
    globalState.timeArray = []
    globalState.totalMinutes = 0
    globalState.totalSeconds = 0
    globalState.locationNumber = 0
}

function randomizeGuessLocations () {
    // Copy zoneListingsNameArray without modifying original content
    let locations = []
    zoneListingsNameArray.map(location => locations.push(location))

    // Reset guess locations array
    globalState.guessLocationsArray = []

    // Populate the guessLocationsArray with new locations
    for (let i = 0; i <= (config.totalGuessLocations - 1); i += 1) {
        let randomlySelectedIndex = getRandomInt(locations.length)

        globalState.guessLocationsArray.push(locations[randomlySelectedIndex])
        locations.splice(randomlySelectedIndex, 1)
    }
}

function updateNewLocation () {
    // Check if guessLocationsArray is populated
    let hasLocations = (globalState.guessLocationsArray.length !== 0)

    if (hasLocations) {
        // Set current location of next location and removes from guessLocationsArray
        globalState.currentLocation = globalState.guessLocationsArray[0]
        globalState.guessLocationsArray.shift()

        // Update location number
        globalState.locationNumber += 1
        updateStatus()

        // Update status using the currentLocation
        updateLocationStatus()
    } else {
        attachStatusButton()
    }
}

function updateLocationStatus () {
    const statusElem = document.querySelector('#status')
    statusElem.innerText = 'The current location to guess is ' + globalState.currentLocation
}

function checkLocation (buildingZone) {
    const isCorrectLocation = (buildingZone.name === globalState.currentLocation)

    if (isCorrectLocation) {
        updateShape(buildingZone, config.successColor)
        stopTimer()
        toggleElem('.status-modal-wrapper')
        attachStatusButton()
        updateStatus()
    } else {
        updateShape(buildingZone, config.failColor)
    }
}

function attachStatusButton () {
    const statusButtonElem = document.querySelector('.status-modal-button')
    statusButtonElem.removeEventListener('click', nextLocation)

    if (globalState.locationNumber >= config.totalGuessLocations) {
        statusButtonElem.addEventListener('click', endGame)
    } else {
        statusButtonElem.addEventListener('click', nextLocation)
    }
}

function nextLocation () {
    toggleElem('.status-modal-wrapper')
    resetMap()
    generateZoneListing()
    updateNewLocation()
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
    globalState.zoneRefsArray.push(newBuildingZone)
}

function updateStatus () {
    updateLocationCount()
    updateStatusButton()
}

function updateLocationCount () {
    const statusProgressElem = document.querySelector('.status-modal-progress')
    statusProgressElem.innerText = 'Location ' + globalState.locationNumber + '/' + config.totalGuessLocations
}

function updateStatusButton () {
    const statusButtonElem = document.querySelector('.status-modal-button')
    
    if (globalState.locationNumber >= config.totalGuessLocations) {
        statusButtonElem.innerText = 'Restart'
    } else {
        statusButtonElem.innerText = 'Next Location'
    }
}
