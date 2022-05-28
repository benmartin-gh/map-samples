export interface PageData {
  header: string;
  description: string;
  mapProvider?: 'google' | 'mapbox';
  params: {
    mapType: '2D' | '3D';
    library: string;
    component: string;
    useGoogleMarkers?: boolean;
    useDeckGlIconLayer?: boolean;
    useDeckGlGeoJsonLayer?: boolean;
    useGoogleMarkersOnTileLoaded?: boolean;
    useGoogleWebGLOverlayView?: boolean;
  };
}
