# Metro Line 1 and asking prices in Ho Chi Minh City: interactive website

Bilingual (EN/VI) static website accompanying a Fulbright MPP thesis (Truong Nhat Duy, 2025–2027). It shows a listing map around Metro Line 1, distance-ring hedonic estimates, machine-learning fit and SHAP, a Hanoi comparison, the whole planned Ho Chi Minh City network, distance-ring maps, night-light maps by year (VIIRS, 2019–2026), land-use mix and amenity layers, and station-level discontinuities. Listing popups give distance to the nearest station, ring premium, ring-relative price and local density.

**Live site:** https://truong-nhat-duy.github.io/metro1-hcmc-site/

Descriptive evidence only: the data are asking prices after the line opened on 22 Dec 2024, with no pre-opening period, so nothing here is a causal estimate.

- `downloads/` holds aggregated result tables and a rounded-coordinate listing sample (no seller information), ready for Power BI, Excel or R.
- The cleaned data and analysis code are kept in a separate private repository.
- Sources shown on the maps: OpenStreetMap contributors (ODbL), Esri basemaps, ESA WorldCover 2021, NASA/VIIRS Black Marble VNP46A3, GADM 4.1.
- Land-use mix and amenity layers are candidate context variables, not outcomes of the metro; OSM land-use polygons cover roughly a third of the area.
