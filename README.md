<br />
<div align="center">
<h1 align="center">Risk-Viz</h1>

  <p align="center">
    Risk-Viz is a full-stack application that utilizes various data visualization tools to analyze risk ratings.
    <br />
    <a href="https://risk-viz-production.up.railway.app/">Open App</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<div>
  <h2>Table of Contents</h2>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#issues">Issues or Enhancements</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<div align = 'center'>
Risk-Viz is a web application designed to help businesses visualize and analyze their risk ratings across different locations, assets, and business categories. The application uses data from a variety of sources, including risk assessments, audits, and incident reports, to generate interactive visualizations and insights that help users identify trends and potential areas of risk.
</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With 
- next.js

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->

## Road Map

1. The project was built using create next-app.
    ```shell
    npx create-next-app@latest risk-viz --ts --tailwind --eslint --src-dir --import-alias "@/*" --experimental-app
    ```
2. Next, Prisma was installed and connected to an online PostgreSQL database using Railway. The data was then loaded and parsed into the table using script.ts.
3. Leaflet was integrated to vidualize data on the map.
6. Risk data was shown on a Datatable using primereact.
7. Finally, a graph was implemented to show trends of risk ratings over the years.
8. Deployed using railway.app

## Usage and Interactivity
### Users are able to:
1. select different data from different decades and the results will be reflected on the map, table and graph.
2. select markers on the map of a given decade year.
3. zooming and panning, and display a tooltip with the Asset Name and Business Category on marker hover. (The average of risk ratings was calculated for assets that are located in the same location and year).
4. sort and filter on reasonable columns on the data table.
5. interact on the line graph and select location (Lat, Long), Asset, or Business Category over time.

<!-- references  -->

## REFERENCES 

- [DataTable](https://primereact.org/datatable/)
- [Reaflet onCkick event](https://snyk.io/advisor/npm-package/react-leaflet/functions/react-leaflet.Marker)
- [Chart](https://primereact.org/chart/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
