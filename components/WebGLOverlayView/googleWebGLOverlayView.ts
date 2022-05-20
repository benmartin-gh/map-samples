import { PerspectiveCamera, DirectionalLight, Scene, AmbientLight, WebGLRenderer, Matrix4 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Feature, Coordinates } from '../../types/GeoJSON';
import mapboxgl from 'mapbox-gl';
import { getMatrix } from './utils';

interface GoogleWebGLOverlayViewProps {
  sourceGltf: string;
  feature: Feature;
  center: Coordinates;

  loader: GLTFLoader;
  scene: Scene;
  camera: PerspectiveCamera;
}

export function initWebGLOverlayView({
  center,
  sourceGltf,
  feature,
  loader,
  scene,
  camera,
}: GoogleWebGLOverlayViewProps): google.maps.WebGLOverlayView {
  const webGLOverlayView = new google.maps.WebGLOverlayView();
  let renderer;

  webGLOverlayView.onAdd = () => {
    const ambientLight = new AmbientLight(0xffffff, 0.75); // soft white light
    ambientLight.position.set(0.5, -1, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);

    const origin = mapboxgl.MercatorCoordinate.fromLngLat(center, 0);

    loader.load(sourceGltf, (gltf) => {
      const sc = gltf.scene.clone();
      sc.applyMatrix4(getMatrix(feature, origin));
      scene.add(sc);
    });

    // const source = 'pin.gltf';
    // loader.load(sourceGltf, (gltf) => {
    //   gltf.scene.scale.set(25, 25, 25);
    //   gltf.scene.rotation.x = (180 * Math.PI) / 180;
    //   scene.add(gltf.scene);
    // });
  };

  webGLOverlayView.onContextRestored = ({ gl }) => {
    renderer = new WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });

    renderer.autoClear = false;
  };

  webGLOverlayView.onDraw = ({ gl, transformer }) => {
    const mapCentre: google.maps.LatLngAltitudeLiteral = {
      ...center,
      altitude: 0,
    };

    // Update camera matrix to ensure the model is georeferenced correctly on the map.
    const matrix = transformer.fromLatLngAltitude(mapCentre);
    camera.projectionMatrix = new Matrix4().fromArray(matrix);

    // Request a redraw and render the scene.
    webGLOverlayView.requestRedraw();
    renderer.render(scene, camera);

    // always reset the GL state
    renderer?.resetState();
  };

  webGLOverlayView.onRemove = () => {
    scene.clear();
  };

  return webGLOverlayView;
}
