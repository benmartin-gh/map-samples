import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import MapContext from '../../context/mapContext';

interface MapProps extends google.maps.MapOptions {
  mapId: string;
  apiKey: string;
  children?: React.ReactNode;
}

const Map: React.FC<MapProps> = ({ mapId, apiKey, children, ...options }) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (mapDivRef.current && !map) {
      const loader = new Loader({
        apiKey: apiKey,
        version: 'beta',
      });

      loader
        .load()
        .then((google) => {
          const m = new google.maps.Map(mapDivRef.current, {
            rotateControl: true,
            mapTypeControl: false,
            disableDefaultUI: true,
            scaleControl: true,
            zoomControl: true,
            mapId: mapId || '',
            ...options,
          });
          setMap(m);
          setLoading(false);
        })
        .catch(() => {
          // do nothing);
        });
    }
  }, [mapDivRef, map, apiKey, mapId, options]);

  const setMapRef = (instance: HTMLDivElement) => {
    mapDivRef.current = instance;
  };

  return (
    <MapContext.Provider value={map}>
      <div ref={setMapRef} id="googleMap" className="w-full h-full">
        {!loading && children}
      </div>
    </MapContext.Provider>
  );
};

export default Map;
