import { useEffect } from 'react';
import { Feature, GeoJson, Coordinates } from '../../types/GeoJSON';
import { forEach } from 'lodash';
import useGoogleWebGLOverlay from './hooks/useGoogleWebGLOverlay';
import { initWebGLOverlayView } from './googleWebGLOverlayView';

interface WebGLOverlayViewProps {
  GeoJson: GeoJson;
}

const WebGLOverlayView = ({ GeoJson }: WebGLOverlayViewProps) => {
  const { map, camera, loader, scene, webGLViews } = useGoogleWebGLOverlay();

  useEffect(() => {
    return () => {
      Object.values(webGLViews).map((view: google.maps.WebGLOverlayView) => view.setMap(null));
      Object.keys(webGLViews).map((key) => delete webGLViews[key]);
    };
  });

  if (!map) return;

  let notRenderedGltf = {};
  const features: Feature[] = GeoJson?.features.filter((feature) => feature?.properties?.gltf);

  for (let i = 0; i < features.length; i++) {
    const gltf = features[i].properties.gltf;
    if (webGLViews[gltf] === undefined) {
      notRenderedGltf[gltf] = features[i];
    }
  }

  console.log('not Rendered buildings ', notRenderedGltf);

  if (!Object.values(notRenderedGltf).length) return;

  const center = {
    lat: features[0].geometry.coordinates[1],
    lng: features[0].geometry.coordinates[0],
  } as Coordinates;

  forEach(notRenderedGltf, (feature: Feature, sourceGltf: string) => {
    const newWebGLView: google.maps.WebGLOverlayView = initWebGLOverlayView({
      center,
      sourceGltf,
      feature,
      loader,
      scene,
      camera,
    });
    newWebGLView.setMap(map);
    webGLViews[sourceGltf] = newWebGLView;
    console.log('render... ', sourceGltf, newWebGLView);
  });

  return null;
};

export default WebGLOverlayView;
