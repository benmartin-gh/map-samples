import * as THREE from 'three';
import get from 'lodash/get';
// we're only using mapbox utilities not the UI library, we could replace these by eg proj4
import mapboxgl from 'mapbox-gl';
import { Feature } from '../../../types/GeoJSON';

const RAD_PER_DEG = Math.PI / 180;

export function getMatrix(feature: Feature, center: mapboxgl.MercatorCoordinate) {
  /*
    provide the web gl transform for a THREE object located at a point specified by feature
  */
  const scaleProp = get(feature.properties, 'scale', 1);
  const rotationProp = RAD_PER_DEG * get(feature.properties, 'rotation', 0);
  const rotate = [Math.PI / 2, rotationProp, 0];

  const THREE_MAP_SCALE = 1 / center.meterInMercatorCoordinateUnits();
  const altitude = 0;
  const scale = Number(scaleProp);

  const firstGeoCoord = feature.geometry.coordinates;
  const position = { lng: firstGeoCoord[0], lat: firstGeoCoord[1] };
  const coord = mapboxgl.MercatorCoordinate.fromLngLat(position, altitude);

  const rotationX = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(1, 0, 0), rotate[0]);
  const rotationY = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 1, 0), rotate[1]);
  const rotationZ = new THREE.Matrix4().makeRotationAxis(new THREE.Vector3(0, 0, 1), rotate[2]);

  return new THREE.Matrix4()
    .makeTranslation(
      (coord.x - center.x) * THREE_MAP_SCALE,
      -(coord.y - center.y) * THREE_MAP_SCALE,
      (coord.z - center.z) * THREE_MAP_SCALE,
    )
    .scale(new THREE.Vector3(scale, scale, scale))
    .multiply(rotationX)
    .multiply(rotationY)
    .multiply(rotationZ);
}
