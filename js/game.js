function startNewGame () {
    resetMap()
    generateZoneListing()
}

function resetMap () {
    for (const shapeObj of shapesRefsArray) {
        shapeObj.setMap(null)
    }
}
