import { PerspectiveCamera, Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useGoogleMap } from '../../../context/mapContext';
import { WebGLViewDictionary } from '../../../types/WebGLView';

function useGoogleWebGLOverlay() {
  const map = useGoogleMap();

  const loader = new GLTFLoader();
  const scene = new Scene();
  const camera = new PerspectiveCamera();
  const webGLViews: WebGLViewDictionary = {};

  return {
    map,
    loader,
    scene,
    camera,
    webGLViews,
  };
}

export default useGoogleWebGLOverlay;
