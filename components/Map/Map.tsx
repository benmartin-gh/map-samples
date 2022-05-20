import { useEffect } from 'react';
import { useGoogleMap } from '../../context/mapContext';

interface MapProps extends google.maps.MapOptions {
  onTileLoaded: () => void;
  mapRef: (instance: HTMLDivElement | null) => void;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ mapRef, onTileLoaded, children, ...options }) => {
  const map = useGoogleMap();

  useEffect(() => {
    if (map) {
      map.setOptions(options);
    }
  }, [map, options]);

  useEffect(() => {
    if (map) {
      const mapEvents = [];
      ['tilesloaded'].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

      if (onTileLoaded) {
        mapEvents.push(map.addListener('tilesloaded', onTileLoaded));
      }

      return () => {
        mapEvents.forEach(google.maps.event.removeListener);
      };
    }
  }, [map, onTileLoaded]);

  return (
    <div ref={mapRef} id="googleMap" className="w-full h-full">
      {children}
    </div>
  );
};

export default Map;
