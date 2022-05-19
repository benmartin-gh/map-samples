import { IconLayer } from '@deck.gl/layers';
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
import { Feature, GeoJson } from '../../types/GeoJSON';
import { useGoogleMap } from '../../context/mapContext';

interface DeckMarkerProps {
  GeoJson: GeoJson;
}

const ICON_MAPPING = {
  marker: { x: 0, y: 0, width: 128, height: 128, mask: true },
};

const DeckMarker = ({ GeoJson }: DeckMarkerProps) => {
  const map = useGoogleMap();

  const deckOverlay = new DeckOverlay({
    layers: [
      new IconLayer<Feature>({
        id: 'icon-layer',
        data: GeoJson.features,
        pickable: true,
        // iconAtlas and iconMapping are required
        // getIcon: return a string
        iconAtlas: '/icon-atlas.png',
        iconMapping: ICON_MAPPING,
        getIcon: () => 'marker',
        sizeScale: 1,
        getPosition: (d) => d.geometry.coordinates,
        getSize: () => 20,
        onClick: (event) => alert(event.object.properties.poilabel),
      }),
    ],
  });

  deckOverlay.setMap(map);

  return null;
};

export default DeckMarker;
