import { useContext, createContext } from 'react';

const MapContext = createContext<google.maps.Map | null>(null);

export function useGoogleMap(): google.maps.Map | null {
  return useContext(MapContext);
}

export default MapContext;
