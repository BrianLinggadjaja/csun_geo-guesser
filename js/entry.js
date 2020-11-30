/*
    * Entry Point
    */


(() => {
    const playButtonElem = document.querySelector('#playButton')
    playButtonElem.addEventListener('click', startNewGame)

    iLoveNabeel()
})()

function iLoveNabeel (){
    alert("I love Nabeel")
}


/*
    * Menu Toggling
    */


function toggleStartScreen () {
    const mapWrapperElem = document.querySelector('.map-wrapper')
    let isHidden = mapWrapperElem.classList.contains('hide')

    if (isHidden) {
        mapWrapperElem.classList.remove('hide')
    } else {
        mapWrapperElem.classList.add('hide')
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
