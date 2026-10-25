# Metro Line 1 and asking prices in Ho Chi Minh City: interactive evidence site

## Overview

Bilingual (English/Vietnamese) static website that accompanies a Fulbright MPP thesis on Ho Chi Minh City Metro Line 1 (Truong Nhat Duy, 2025–2027). It asks how asking prices near the line relate to access to a station, and what that evidence allows us to say about land value capture design.

Live site: https://truong-nhat-duy.github.io/metro1-hcmc-site/

Status: work in progress. Everything shown is descriptive. The data are asking prices posted after the line opened on 22 December 2024, with no pre-opening period, so nothing on this site is a causal estimate.

## What the site shows
- Summary, policy problem, research questions, data pipeline and models.
- Theory framework, prior studies compared with this thesis, line-stage results.
- Interactive listing map around Line 1 with popups (distance to nearest station, ring premium, local density), distance-ring maps, the whole Ho Chi Minh City network, and a Hanoi comparison.
- Hedonic ring coefficients, machine-learning fit and SHAP, station-level discontinuities, supplementary exploratory results.
- Night-light maps by year (VIIRS, 2019–2026), population density by year for Ho Chi Minh City and Hanoi (WorldPop), land-use mix and amenity layers.
- Current provincial boundaries (from 1 July 2025), 800 m catchments of every station, and a land value capture arithmetic calculator marked as an illustration.

## What the data are, and are not
- Asking prices from public online listing platforms (Chợ Tốt and GuLand), after 22 December 2024. The platform names identify the sources only; there is no affiliation with or endorsement by either.
- Not transaction prices. Asking prices usually differ from the price agreed after negotiation.
- Not de-duplicated across platforms (no reliable key links the same listing across sources). Many listings share a coordinate or carry an approximate location, so the number of listings is not the number of independent properties.
- Listings are scarce close to stations: only a few per cent lie within 500 m, so station-level estimates rest on few buildings.
- Station coordinates for lines other than Line 1 are partly unverified (OpenStreetMap and planning documents) and are drawn as schematic.

## Privacy and personal data
- The repository contains no seller names, phone numbers, accounts, listing text, listing URLs or listing IDs. Raw scraped files are not published.
- The published listing sample (4,782 Ho Chi Minh City points, 5,582 Hanoi points) holds only rounded coordinates (4 decimals, about 11 m), price per m², property type, distance to the nearest station and distance ring.
- Cleaned data and analysis code are kept in a separate private repository and are not part of this site.
- Visitors: the site sets no cookies, runs no analytics, tracking or forms, and stores only your language and theme choice in your browser (localStorage).
- If you are a rights holder or a person affected and want a record removed, open a GitHub issue without personal data in it and it will be reviewed promptly.

## Security and third-party requests
- Static files only: no server-side code, database, login or API. No keys, tokens or credentials are in the repository.
- Leaflet 1.9.4 and Chart.js 4.4.1 are bundled in the repository, not loaded from a CDN.
- Your browser does contact third parties when you open the page: Esri and OpenStreetMap tile servers for base maps, and Google Fonts for typefaces. Those providers can see your IP address under their own policies.
- To report a security problem, open a GitHub issue without exploit details or personal data, or use GitHub’s private vulnerability reporting if it is enabled for this repository.

## Method and main numbers in brief
- Hedonic regressions of ln asking price per m² on ln distance to the nearest station, with property attributes, distance to the centre and location fixed effects; local-linear spatial discontinuity checks at 500 m and 800 m as diagnostics only; spatial lag, error and Durbin models; geographically weighted regression and random forest with SHAP for exploration.
- Pooled Chợ Tốt–GuLand run of 24 October 2026 (exploratory, not frozen): 35,528 listings with common support, 34,174 after trimming. Elasticity of asking price to distance −0.263 (95% CI −0.302 to −0.225) with 5 km cell fixed effects; −0.089 (95% CI −0.228 to 0.049) with 500 m cell fixed effects.
- Reading: a continuous gradient, no support for a step at conventional radii, and much of the raw gradient is location. The effect of the Metro itself is not identified.
- Daily runs only monitor. A paper uses one run frozen on a date declared in advance; later data are holdout and the specification is not changed after seeing results.

## Limitations
- No pre-opening period and no transaction prices: difference-in-differences, event studies and any causal reading are not possible with the current data.
- Results are sensitive to the fineness of location fixed effects and to the spatial weight matrix.
- WorldPop is a modelled estimate, so year-to-year change is smooth by construction; night-light, land-use and amenity layers are context, not outcomes of the metro.
- OpenStreetMap land-use polygons cover roughly a third of the area.
- Administrative boundaries are from OpenStreetMap (HCMC wards and communes, 10 October 2026 extract, 167 units) and GADM 4.1; Hanoi shows the provincial outline only.
- The land value capture calculator is arithmetic for illustration, not a forecast of revenue.

## Sources, attribution and licences
- OpenStreetMap contributors (ODbL): boundaries, amenities, land use, base map.
- Esri base maps. NASA/VIIRS Black Marble VNP46A3 (night lights). WorldPop R2025A (population). ESA WorldCover 2021 (land cover). GADM 4.1 (administrative outlines).
- GADM data are free for academic and non-commercial use, and GADM does not allow redistribution; this is a non-commercial academic site, and anyone reusing the outlines should download them from GADM directly.
- Chợ Tốt and GuLand are named only to identify the sources of the listings.
- Licence status: no licence file has been added yet, so default copyright applies to this repository’s own text, code and figures (all rights reserved) until the author chooses one. Third-party data stay under their own licences.

## Repository contents and data dictionary
- index.html, style.css, app.js, x.js, x2.js, maps.js, net.js: page and interactive code.
- data*.js: embedded data (listing sample, results, boundaries, station network). assets/: images, night-light and population overlays (webp) with metadata. vendor/: Leaflet and Chart.js.
- downloads/listings.csv: lat, lng (rounded), price_mvnd_m2 (million VND per m²), type (n house, d land, c apartment), dist_station_m, ring (r1 to r4, distance rings).
- downloads/stations.csv: Line 1 stations (id, names, coordinates, segment, structure). ring_coefs.csv: ring coefficients with confidence intervals. ml_performance.csv and shap_importance.csv: model fit and SHAP shares. ntl_event_study.csv and ntl_ring_year.csv: night-light series.
- Run locally: serve the folder with any static server, for example python -m http.server 8000, then open http://localhost:8000.

## Responsible use and citation
- This is academic research in progress, not an official product of any government body. It is not financial, legal, tax or investment advice, and must not be used to set taxes, fees or valuations. Provided as is, without warranty.
- Please cite: Truong, N. D. (2026). Metro Line 1 and asking prices in Ho Chi Minh City: interactive evidence site (work in progress). https://truong-nhat-duy.github.io/metro1-hcmc-site/
- Fulbright School of Public Policy and Management, MPP 2025–2027. Last updated 26 October 2026.
