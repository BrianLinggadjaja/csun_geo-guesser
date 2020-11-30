/*
    * Zone Configuration
    */


const zoneConfig = {
    fillColor: '#000000',
    fillOpacity: 0.5,
    strokeColor: '#FFFFFF',
    strokeOpacity: 0.9,
    strokeWeight: 2
}


/*
    * Zone Class
    */


class Zone {
    constructor (bounds, nameOfBuilding) {
        this.bounds = bounds
        this.name = nameOfBuilding
    }

    getZoneObject () {
        let validZoneObject = zoneConfig
        validZoneObject.bounds = this.bounds
        validZoneObject.boundsObj = this.bounds
        validZoneObject.name = this.name
        validZoneObject.map = map

        return validZoneObject
    }
}


/*
    * Zone Listings
    */


const zoneListings = {
    'Jacaranda Hall': {
        north: 34.242087644536014,
        south: 34.24102245063175,
        east: -118.52783202370235,
        west: -118.52946809308956
    },
    'Bookstein Hall': {
        north: 34.242443084805466,
        south: 34.24143199653825,
        east: -118.53007208046506,
        west: -118.53106718002108
    },
    'Education Building': {
        north: 34.24154500389629,
        south: 34.241063846430905,
        east: -118.53041193864983,
        west: -118.53143117808726
    },
    'Bayramian Hall': {
        north: 34.240712860788214,
        south: 34.239901313696095,
        east: -118.53012805052978,
        west: -118.53146379063462
    },
    'Jerome Richfield Hall': {
        north: 34.23907311707711,
        south: 34.23867620614502,
        east: -118.53028248884158,
        west: -118.53094231226687
    },
    'Sierra Hall': {
        north: 34.23845991703256,
        south: 34.23810564311054,
        east: -118.53003866022284,
        west: -118.53139193620584
    },
    'Manzanita Hall': {
        north: 34.2378417699445,
        south: 34.236850268709716,
        east: -118.52945262824049,
        west: -118.53063281801053
    },
    'Nordhoff Hall': {
        north: 34.23670669254358,
        south: 34.235957553141354,
        east: -118.53026654712104,
        west: -118.53098556079564
    },
    'Cypress Hall': {
        north: 34.236324695016975,
        south: 34.23602057912684,
        east: -118.52925849149119,
        west: -118.53009419343647
    },
    'Chaparral Hall': {
        north: 34.23858426966581,
        south: 34.237888773636776,
        east: -118.52671062907132,
        west: -118.52726321676437
    },
    'Live Oak Hall': {
        north: 34.23838414185208,
        south: 34.23816149503999,
        east: -118.52762247497103,
        west: -118.5288135449237
    },
    'Eucalyptus Hall': {
        north: 34.23876699044487,
        south: 34.23853782061809,
        east: -118.52762457560775,
        west: -118.52881540727064
    },
    'Citrus Hall': {
        north: 34.23913024128795,
        south: 34.238922916678014,
        east: -118.52760434009437,
        west: -118.52826790917254
    },
    'Magnolia Hall': {
        north: 34.23966657870087,
        south: 34.239200908339576,
        east: -118.52815355253131,
        west: -118.52842097428821
    },
    'Sequoia Hall': {
        north: 34.24078431663641,
        south: 34.24010071446621,
        east: -118.52759786385111,
        west: -118.5284475443269
    },
    'Art and Design Center': {
        north: 34.244004479307165,
        south: 34.242984045918966,
        east: -118.52957358681721,
        west: -118.53036782263547
    },
    'Oviatt Library': {
        north: 34.24039406338949,
        south: 34.23923227190048,
        east: -118.52861280188955,
        west: -118.53003825259161
    },
    'Book Store': {
        north: 34.23778353519104,
        south: 34.23698044636001,
        east: -118.52759346700574,
        west: -118.5287545185633
    },
    'The Soraya (VPAC)': {
        north: 34.23632265241639,
        south: 34.235771516897266,
        east: -118.527514434407,
        west: -118.52879031513858
    },
    'Student Recreation Center': {
        north: 34.24061929665897,
        south: 34.23932458410198,
        east: -118.52468521642261,
        west: -118.5251732408475
    }
}

const zoneListingsNameArray = Object.keys(zoneListings)
