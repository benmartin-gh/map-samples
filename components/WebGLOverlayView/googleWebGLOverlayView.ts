import { PerspectiveCamera, DirectionalLight, Scene, AmbientLight, WebGLRenderer, Matrix4 } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { Coordinates } from '../../types/GeoJSON';

interface GoogleWebGLOverlayViewProps {
  sourceGltf: string;
  position: Coordinates;
  loader: GLTFLoader;
  scene: Scene;
  camera: PerspectiveCamera;
}

export function initWebGLOverlayView({
  position,
  sourceGltf,
  loader,
  scene,
  camera,
}: GoogleWebGLOverlayViewProps): google.maps.WebGLOverlayView {
  console.log('position: ', position);
  const webGLOverlayView = new google.maps.WebGLOverlayView();
  let renderer: WebGLRenderer;

  webGLOverlayView.onAdd = () => {
    const ambientLight = new AmbientLight(0xffffff, 0.75); // soft white light
    ambientLight.position.set(0.5, -1, 0.5);
    scene.add(ambientLight);

    const directionalLight = new DirectionalLight(0xffffff, 0.25);
    directionalLight.position.set(0.5, -1, 0.5);
    scene.add(directionalLight);

    loader.load(sourceGltf, (gltf) => {
      gltf.scene.scale.set(250, 250, 250);
      gltf.scene.rotation.x = (180 * Math.PI) / 180;
      scene.add(gltf.scene);
    });
  };

  webGLOverlayView.onContextRestored = ({ gl }) => {
    renderer = new WebGLRenderer({
      canvas: gl.canvas,
      context: gl,
      ...gl.getContextAttributes(),
    });

    renderer.autoClear = false;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  webGLOverlayView.onDraw = ({ gl, transformer }) => {
    const latLngAltitudeLiteral: google.maps.LatLngAltitudeLiteral = {
      ...position,
      altitude: 100,
    };

    // Update camera matrix to ensure the model is georeferenced correctly on the map.
    const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
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
