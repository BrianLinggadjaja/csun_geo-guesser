/*
    * Entry Point
    */


(() => {
    const playButtonElem = document.querySelector('#playButton')
    playButtonElem.addEventListener('click', startNewGame)
})()


/*
    * Menu Toggling
    */


function toggleElem (querySelector) {
    const selectorElem = document.querySelector(querySelector)
    let isHidden = selectorElem.classList.contains('hide')

    if (isHidden) {
        selectorElem.classList.remove('hide')
    } else {
        selectorElem.classList.add('hide')
    }
}


/*
    * General Config
    */


const config = {
    totalGuessLocations: 5,
    successColor: '#00FF00',
    failColor: '#FF0000'
}


/*
    * Global State
    */


let globalState = {
    guessLocationsArray: [],
    currentLocation: null,
    zoneRefsArray: [],
    timerRef: null,
    totalTestTime: 0,
    totalSeconds: 0,
    locationNumber: 0
}


/*
    * Helpers
    */


// Reset state to defaults
function resetState () {
    globalState.guessLocationsArray = []
    globalState.currentLocation = null

    globalState.timerRef = null
    globalState.totalTestTime = 0
    globalState.totalSeconds = 0
    globalState.locationNumber = 0
}


function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
}


/*
    * Timer
    */


let timer
function startTimer () {
    timer = setInterval(() => {
        globalState.totalSeconds += 1

        updateClock()
    }, 1000) // Set timer for every second
}

function stopTimer () {
    clearInterval(timer)

    // Add totalSeconds of location completion to totalSeconds before resetting time
    globalState.totalTestTime += globalState.totalSeconds
    globalState.totalSeconds = 0
}

function updateClock () {
    let isClockValid = checkForClockValidity()

    if (isClockValid) {
        const timeElem = document.querySelector('.status-modal-time')
        let hasTotalSeconds = (globalState.totalSeconds >= 0) ? (globalState.totalSeconds + 's') : ''

        // Update minutes and seconds render
        timeElem.innerText = 'Completed In: ' + hasTotalSeconds

        // If last location completed, showcase totalTestTime
        const totalTimeElem = document.querySelector('.status-modal-total-time')
        if (globalState.locationNumber >= config.totalGuessLocations) {
            totalTimeElem.innerText = 'Total Time: ' + globalState.totalTestTime + 's'
        } else {
            totalTimeElem.innerText = ''
        }
    }
}

function checkForClockValidity () {
    let isSecondsValid = (isFinite(globalState.totalSeconds) && (globalState.totalSeconds >= 0))

    // Check if valid totalSeconds, otherwise reset clock
    if (isSecondsValid) {
        return true
    } else {
        globalState.totalSeconds = 0

        return false
    }
}
