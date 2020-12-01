/*
    * Functionality
    */


function startNewGame () {
    resetMap()

    generateZoneListing()
    randomizeGuessLocations()
    updateNewLocation()

    updateStatus()
    toggleElem('.map-wrapper')
    startTimer()
}

function endGame () {
    resetMap()
    resetState()
    toggleElem('.map-wrapper')
    toggleElem('.status-modal-wrapper')
}

// Generates unique locations array
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

// Updates next location based off the guessLocationsArray
function updateNewLocation () {
    // Check if guessLocationsArray is populated
    let hasLocations = (globalState.guessLocationsArray.length !== 0)

    if (hasLocations) {
        // Set current location of next location and removes from guessLocationsArray
        globalState.currentLocation = globalState.guessLocationsArray[0]
        globalState.guessLocationsArray.shift()

        // Update location number
        globalState.locationNumber += 1

        // Update status
        updateStatus()
    } else {
        attachStatusButtonListener()
    }
}

// Attaches event listener to handle location modal
function attachStatusButtonListener () {
    const statusButtonElem = document.querySelector('.status-modal-button')

    // Remove previous event listeners
    statusButtonElem.removeEventListener('click', endGame)
    statusButtonElem.removeEventListener('click', nextLocation)

    // Assign proper event listener to status button
    if (globalState.locationNumber >= config.totalGuessLocations) {
        statusButtonElem.addEventListener('click', endGame)
    } else {
        statusButtonElem.addEventListener('click', nextLocation)
    }
}

// Updates next test location
function nextLocation () {
    toggleElem('.status-modal-wrapper')
    resetMap()
    generateZoneListing()
    updateNewLocation()
    startTimer()
}


/*
    * Status
    */


function updateStatus () {
    updateStatusIndicator()
    updateLocationCount()
    updateStatusButton()
    updateLocationStatus()
}

function updateLocationStatus () {
    const statusElem = document.querySelector('#status')
    statusElem.innerText = 'The current location to guess is ' + globalState.currentLocation
}

function updateStatusIndicator () {
    const statusIndicatorElem = document.querySelector('.status-indicator')
    statusIndicatorElem.innerText = globalState.locationNumber
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
