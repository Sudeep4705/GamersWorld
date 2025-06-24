
   
   mapboxgl.accessToken = mapToken
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        center: coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });


const marker1 = new mapboxgl.Marker({color:'red'})
        .setLngLat(coordinates)
        .setPopup( new mapboxgl.Popup({offset:25 }) //popup option
        .setHTML("<h6>Exact location of Headquarters</h6>")
        .setMaxWidth("300px"))
        .addTo(map);
