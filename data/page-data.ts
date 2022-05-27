import { PageData } from '../types/PageData';

const data: PageData[] = [
  {
    header: 'Google Markers',
    description: 'Raster based map with Google Markers',
    params: {
      useGoogleMarkers: true,
      mapType: '2D',
      library: 'Google Javascript API',
      component: 'Marker',
    },
  },
  {
    header: 'Google Markers',
    description: 'Vector based map with Google Markers',
    params: {
      useGoogleMarkers: true,
      mapType: '3D',
      library: 'Google Javascript API',
      component: 'Marker',
    },
  },
  {
    header: 'Google Markers - tileloaded',
    description: 'Vector based map with Google Markers on tile loaded',
    params: {
      useGoogleMarkersOnTileLoaded: true,
      mapType: '3D',
      library: 'Google Javascript API',
      component: 'Marker - tiled',
    },
  },
  {
    header: 'Google WebGL Overlay View',
    description: 'Vector based map with 3D objects based on WebGLOverlayView & three',
    params: {
      useGoogleWebGLOverlayView: true,
      mapType: '3D',
      library: 'Google Javascript API',
      component: 'Google Web GL Overlay View',
    },
  },
  {
    header: 'Deck.gl - IconLayer',
    description: 'Raster based map using Deck.gl IconLayer',
    params: {
      useDeckGlIconLayer: true,
      mapType: '2D',
      library: 'Deck.gl',
      component: 'IconLayer',
    },
  },
  {
    header: 'Deck.gl - IconLayer',
    description: 'Vector based map using Deck.gl IconLayer',
    params: {
      useDeckGlIconLayer: true,
      mapType: '3D',
      library: 'Deck.gl',
      component: 'IconLayer',
    },
  },
  {
    header: 'Deck.gl - GeoJsonLayer',
    description: 'Raster based map using Deck.gl GeoJsonLayer',
    params: {
      useDeckGlGeoJsonLayer: true,
      mapType: '2D',
      library: 'Deck.gl',
      component: 'GeoJsonLayer',
    },
  },
  {
    header: 'Deck.gl - GeoJsonLayer',
    description: 'Vector based map using Deck.gl GeoJsonLayer',
    params: {
      useDeckGlGeoJsonLayer: true,
      mapType: '3D',
      library: 'Deck.gl',
      component: 'GeoJsonLayer',
    },
  },
  {
    header: 'Mapbox Markers',
    description: 'Example map using Mapbox markers',
    mapProvider: 'mapbox',
    params: {
      mapType: '3D',
      library: 'Mapbox',
      component: 'Marker',
    },
  },
];

export default data;
