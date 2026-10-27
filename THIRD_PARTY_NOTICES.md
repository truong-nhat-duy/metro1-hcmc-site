# Third-party notices

This repository's own content is licensed under CC BY-NC 4.0 (see `LICENSE`). The components below are **not** covered by that licence and keep their own terms. Terms were noted from each provider's public documentation and should be re-checked before any reuse.

| Component | Used for | Terms |
|---|---|---|
| OpenStreetMap contributors | Boundaries, amenities, land use, base map | ODbL 1.0. Attribution: © OpenStreetMap contributors |
| Esri base maps | Map tiles | Esri terms of use; attribution shown on the map |
| NASA / VIIRS Black Marble VNP46A3 | Night-light overlays | NASA open data; cite the product |
| WorldPop R2025A | Population-density overlays | CC BY 4.0 |
| ESA WorldCover 2021 | Land-cover context | CC BY 4.0 |
| OpenStreetMap contributors (extract of 10 Oct 2026) | Provinces after the 2025 merger, ring roads, expressways, railways, metro alignments, bus routes (with headway and opening-hours tags), amenity tiles for Vietnam, walking-distance grid, key facilities (`data/*.json`, simplified derived copies) | ODbL 1.0. Attribution: © OpenStreetMap contributors. Derived database; share-alike applies to the derived files. |
| GADM 4.1 | Administrative outlines (simplified, derived) | **Academic and other non-commercial use only; no redistribution or commercial use without GADM's permission.** Download the original from https://gadm.org and follow its terms. The derived outlines here are for non-commercial academic visualisation only. |
| Leaflet 1.9.4 | Interactive maps | BSD-2-Clause |
| Chart.js 4.4.1 | Charts | MIT |
| Inter, Source Serif 4 | Fonts (Google Fonts) | SIL Open Font License 1.1 |

## Not covered by `LICENSE`

- Photographs and illustrations in `assets/` (source and rights not yet documented; they remain with their owners).
- Chợ Tốt and GuLand are named only to identify where listings came from. No listing text, images or personal data are redistributed here. A terms and robots.txt review of these sources is still pending.

## Replacing GADM

If you need a version without the GADM restriction, replace the outlines in `data_bnd.js` with OpenStreetMap or geoBoundaries data (check each licence) and delete this row.
