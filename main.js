document.addEventListener('DOMContentLoaded', function () {
  var map = L.map('mapid').setView([0, 0], 2);

  var marker = L.marker([0, 0]).addTo(map);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  var input = document.querySelector('.searchbar input');
  var button = document.querySelector('.searchbar button');

  button.addEventListener('click', function () {
    var ipAddress = input.value;
    fetch(`http://ip-api.com/json/${ipAddress}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        var { city, region, country, lat, lon, timezone, isp } = data;

        marker.setLatLng([lat, lon]);
        map.setView([lat, lon], 10);

        document.getElementById('ip').textContent = ipAddress;
        document.getElementById(
          'location'
        ).textContent = `${city}, ${region}, ${country}`;
        document.getElementById('timezone').textContent = timezone;
        document.getElementById('isp').textContent = isp;
      })
      .catch((error) => console.error('Error:', error));
  });
});
