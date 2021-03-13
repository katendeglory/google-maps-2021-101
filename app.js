async function initMap() {

  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };

  // The Map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: uluru,
  });

  // Set Map to your location
  // map.setCenter(await getCurrentLocation());

  // The Marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
    icon: "https://cdn4.iconfinder.com/data/icons/social-media-2273/64/social_media_network_online_maps-64.png",
  });

  // Create An Info Window About Uluru
  const infoWindow = new google.maps.InfoWindow({
    content: "<span>🔥 The Hidden Dark Forest of Sirenhead</span>"
  });

  // Add it to the Marker Uluru
  marker.addListener("click", () => {
    infoWindow.open(map, marker);
  });


  // A function to add some more markers & info windows
  function addMarker({ position, content, icon }) {

    const newMarker = new google.maps.Marker({
      position,
      map,
    });

    icon && newMarker.setIcon(icon);

    const newInfoWindow = new google.maps.InfoWindow({
      content: `<span>${content || ""}</span>`
    });

    // Add it to the Marker Uluru
    newMarker.addListener("click", () => {
      newInfoWindow.open(map, newMarker);
    });
  }

  // Let's add some more markers
  addMarker({ position: { lat: 37.9922, lng: -1.1307 }, content: "👌 A Great place to visit!" });
  addMarker({ position: { lat: 39.4699, lng: -0.3763 }, content: "⛰ If You Love Adventure!" });
  addMarker({ position: { lat: 38.5411, lng: -0.1225 }, content: "🍕 For Food lovers!", icon: "https://cdn3.iconfinder.com/data/icons/food-set-3/91/Food_C219-32.png" });

  // Click on map to add marker
  google.maps.event.addListener(map, "click", e => {
    addMarker({ position: e.latLng });
  })
}

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      });
    } else {
      reject("The browser doesn't support Geolocation");
    }
  });
}

getCurrentLocation().then(coords => console.log(coords)).catch(err => console.log(err));