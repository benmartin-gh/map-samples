import { PerspectiveCamera, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { useGoogleMap } from '../../../context/mapContext';

function useGoogleWebGLOverlay() {
  const map = useGoogleMap();
  const loader = new GLTFLoader();
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const webGLViews = {};

  return {
    map,
    loader,
    scene,
    camera,
    webGLViews,
  };
}

export default useGoogleWebGLOverlay;
