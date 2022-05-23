export interface GeoJson {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  geometry: Geometry;
  properties: Properties;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  poilabel?: string;
  gltf?: string;
}

export interface Coordinates {
  lat: number;
  lng: number;
}
