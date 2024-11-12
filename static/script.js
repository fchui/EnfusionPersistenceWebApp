function createMap(center, zoom) {
    let map = L.map('map', {
        fullscreenControl: true,
        fullscreenControlOptions: {
            position: 'topleft'
        },
        crs: L.CRS.Simple
    });

    var bounds = [[0,0], [3913.073,4200]];
    var image = L.imageOverlay('static/arland.jpg', bounds).addTo(map);
    map.fitBounds(bounds);
    return map
}

function updateCharacterMarkers(markerFeatureGroup) {
    // Send a request to the server to get the new latitude and longitude data
    fetch('/character-positions/').then(response => response.json()).then(data => {
        let prevXZs = []
        markerFeatureGroup.eachLayer(layer => layer.hasOwnProperty('_latlng') && prevXZs.push(layer._latlng))

        markerFeatureGroup.clearLayers();
        data.characters.forEach((character, idx) => {
            if (idx in prevXZs) {
                let prevXZ = [prevXZs[idx].lat, prevXZs[idx].lng]
                let newXZ = [character[2], character[0]];
                L.marker(newXZ).addTo(markerFeatureGroup);
                L.polyline([prevXZ, newXZ]).addTo(markerFeatureGroup)
            }
            else
            {
                let newXZ = [character[2], character[0]];
                L.marker(newXZ).addTo(markerFeatureGroup);
            }
        })
    })
}