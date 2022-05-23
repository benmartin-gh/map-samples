import { GeoJson } from '../../types/GeoJSON';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { useGoogleMap } from '../../context/mapContext';
import { GeoJsonLayer } from '@deck.gl/layers';

interface GeoJsonLayerProps {
  geoJson: GeoJson;
}

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const DeckMarker = ({ geoJson }: GeoJsonLayerProps) => {
  const map = useGoogleMap();

  const deckOverlay = new DeckOverlay({
    layers: [
      new GeoJsonLayer({
        id: 'geojson-layer',
        data: geoJson.features,
        pointType: 'icon',
        getIconSize: 20,
        iconAtlas: '/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        getIcon: () => 'marker',
        sizeScale: 1,
        getSize: () => 20,
      }),
    ],
  });

  deckOverlay.setMap(map);

  return null;
};

export default DeckMarker;
