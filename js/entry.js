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
    * Global State
    */


let globalState = {
    guessLocationsArray: [],
    currentLocation: null,
    zoneRefsArray: [],
    timerRef: null,
    totalMinutes: 0,
    totalSeconds: 0,
    locationNumber: 0
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
    * Helper
    */


function getRandomInt (max) {
    return Math.floor(Math.random() * Math.floor(max))
}

let timer
function startTimer () {
    timer = setInterval(() => {
        // Increment totalMinutes when totalSeconds equals a minute
        if (globalState.totalSeconds === 59) {
            globalState.totalMinutes += 1
            globalState.totalSeconds = 0
        } else {
            globalState.totalSeconds += 1
        }

        updateClock()
    }, 1000) // Set timer for every second
}

function stopTimer () {
    clearInterval(timer)

    let completionTime = []
    completionTime[0] = globalState.totalMinutes
    completionTime[1] = globalState.totalSeconds

    globalState.totalMinutes = 0
    globalState.totalSeconds = 0
}

function updateClock () {
    let isClockValid = checkForClockValidity()

    if (isClockValid) {
        const timeElem = document.querySelector('.status-modal-time')
        let hasTotalMinutes = (globalState.totalMinutes > 0) ? (globalState.totalMinutes + 'm' + ' ') : ''
        let hasTotalSeconds = (globalState.totalSeconds >= 0) ? (globalState.totalSeconds + 's') : ''

        // Update minutes and seconds render
        timeElem.innerText = 'Completed In: ' + hasTotalMinutes + ' ' + hasTotalSeconds
    }
}

function checkForClockValidity () {
    // Check if number && is in range
    let isMinutesValid = (isFinite(globalState.totalMinutes) && ((globalState.totalMinutes <= 99) || (globalState.totalMinutes >= 0)))
    let isSecondsValid = (isFinite(globalState.totalSeconds) && ((globalState.totalSeconds <= 60) || (globalState.totalSeconds >= 0)))

    // Check if valid totalMinutes && totalSeconds, otherwise reset clock
    if (isMinutesValid && isSecondsValid) {
        return true
    } else {
        globalState.totalMinutes = 0
        globalState.totalSeconds = 0

        return false
    }
}
