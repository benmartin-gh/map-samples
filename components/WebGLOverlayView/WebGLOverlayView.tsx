import { useEffect } from 'react';
import { Feature, GeoJson, Coordinates } from '../../types/GeoJSON';
import { forEach } from 'lodash';
import useGoogleWebGLOverlay from './hooks/useGoogleWebGLOverlay';
import { initWebGLOverlayView } from './googleWebGLOverlayView';

export type FeatureDictionary = { [key: string]: Feature };

interface WebGLOverlayViewProps {
  geoJson: GeoJson;
}

const WebGLOverlayView = ({ geoJson }: WebGLOverlayViewProps) => {
  const { map, camera, loader, scene, webGLViews } = useGoogleWebGLOverlay();

  useEffect(() => {
    return () => {
      Object.values(webGLViews).map((view) => view.setMap(null));
      Object.keys(webGLViews).map((key) => delete webGLViews[key]);
    };
  });

  const notRenderedGltf: FeatureDictionary = {};
  const features: Feature[] = geoJson?.features.filter((feature) => feature?.properties?.gltf);

  for (let i = 0; i < features?.length; i++) {
    const gltf: string | undefined = features[i].properties.gltf;
    if (gltf && webGLViews[gltf] === undefined) {
      notRenderedGltf[gltf] = features[i];
    }
  }

  forEach(notRenderedGltf, (feature: Feature, sourceGltf: string) => {
    const position = {
      lat: feature.geometry.coordinates[1],
      lng: feature.geometry.coordinates[0],
    } as Coordinates;

    const newWebGLView: google.maps.WebGLOverlayView = initWebGLOverlayView({
      position,
      sourceGltf,
      loader,
      scene,
      camera,
    });
    newWebGLView.setMap(map);
    webGLViews[sourceGltf] = newWebGLView;
    console.log('render... ', sourceGltf, newWebGLView);
  });

  return <></>;
};

export default WebGLOverlayView;
