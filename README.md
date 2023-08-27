# Archivkesi.unas.cz
This project is update of existing [Github project](https://github.com/xSilence8x/JS-archived-geocaches-map-website).
The live site can be accessed [here](http://archivkesi.unas.cz).

## What's updated
- **MySQL database:** To achieve faster data loading and maintaing a MySQL database was created. 
- **Marker Clusters:** Archived geocaches are clustered on map using Leaflet's feature L.MarkerClusterGroup() which also leads to faster loading.

## Technical details
- **Front-End Technologies:** The project utilizes HTML, CSS, JavaScript, and the Leaflet library for interactive maps.
- **Back-End Technology:** The back-end is powered by PHP, which serves as the server-side scripting language. It also handles communication with the MySQL database.
- **Database:** The project uses MySQL as its database system to store geocaching data, including information about caches' names, coordinates, types, etc.
- **Dynamic Loading:** AJAX (Asynchronous JavaScript and XML) is employed to fetch data from the server without the need to reload the entire web page. This enables seamless and efficient loading of cache information onto the map.
- **Leaflet Library:** The Leaflet JavaScript library is used for displaying interactive maps. It provides various features like custom markers, clusters, popups, and layers.
- **Responsive Design:** The website is designed to be responsive, adapting to various screen sizes and devices, ensuring a good user experience across different platforms.

## Screenshots
![Choose type](https://github.com/xSilence8x/Archivkesi.unas.cz/blob/master/screenshot01.png)
![Geocache detail shown](https://github.com/xSilence8x/Archivkesi.unas.cz/blob/master/screenshot02.png)

## Contributions
- HTML, CSS and JS Marker Clusters by user [vendaciki](https://github.com/vendaciki).
