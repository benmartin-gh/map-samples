import { useEffect, useState } from 'react';
import { useGoogleMap } from '../../context/mapContext';

const Marker = ({ ...options }) => {
  const [marker] = useState<google.maps.Marker>(new google.maps.Marker());

  const map = useGoogleMap();

  useEffect(() => {
    if (marker && map) {
      marker.setOptions({
        ...options,
        map: map,
        optimized: true,
      });
    }
  }, [map, marker, options]);

  return null;
};

export default Marker;
