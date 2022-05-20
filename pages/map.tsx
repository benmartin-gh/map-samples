import { useEffect, useState, useRef, MutableRefObject, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { NextPage } from 'next';
import Map from '../components/Map';
import DeckMarker from '../components/Marker/DeckMarker';
import GeoJsonLayer from '../components/GeoJsonLayer';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import data from '../data/sports_facilities.json';
import { initGoogleMarker } from '../components/Marker/googleMarker';
import MapContext from '../context/mapContext';
import Marker from '../components/Marker';
import { Feature } from '../types/GeoJSON';
import WebGLOverlayView from '../components/WebGLOverlayView';
import dataObjects3D from '../data/objects-3d.json';

const MapPage: NextPage = () => {
  const router = useRouter();
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapDivRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement | null>;

  const {
    useVectorMap,
    useDeckGlIconLayer,
    useDeckGlGeoJsonLayer,
    useGoogleMarkers,
    useGoogleMarkersOnTileLoaded,
    useGoogleWebGLOverlayView,
  } = router.query;
  // useState for googleMarker onTileLoaded
  const [googleMarkers, setGoogleMarkers] = useState<google.maps.Marker[]>([]);

  const [loading, setLoading] = useState(true);
  const mapOptions = useGoogleWebGLOverlayView
    ? {
        center: {
          lat: -33.883552781,
          lng: 151.193288896,
        },
        tilt: 45,
        zoom: 15.8982,
      }
    : {
        center: {
          lat: -33.8688,
          lng: 151.2093,
        },
        tilt: 45,
        zoom: 12,
      };

  useEffect(() => {
    if (mapDivRef.current && !map) {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || '',
        version: 'beta',
      });

      loader
        .load()
        .then((google) => {
          const m = new google.maps.Map(mapDivRef.current, {
            mapId: useVectorMap === 'true' ? process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || '' : '',
            rotateControl: true,
            mapTypeControl: false,
            disableDefaultUI: true,
            scaleControl: true,
            zoomControl: true,
          });
          setMap(m);
          setLoading(false);
        })
        .catch(() => {
          // do nothing);
        });
    }
  }, [map, useVectorMap]);

  // UseEffect for Google Markers OnTileLoaded
  useEffect(() => {
    if (loading || !useGoogleMarkersOnTileLoaded) return;

    const tmp = [];
    const featuresMarkers = data.features;
    for (let i = 0; i < featuresMarkers.length; i++) {
      const position = {
        lat: Number(featuresMarkers[i]?.geometry?.coordinates?.[1]),
        lng: Number(featuresMarkers[i]?.geometry?.coordinates?.[0]),
      };
      tmp.push(initGoogleMarker({ position }));
    }
    setGoogleMarkers(tmp);
  }, [loading, useGoogleMarkersOnTileLoaded]);

  const handleTileLoaded = useCallback(() => {
    for (let i = 0; i < googleMarkers.length; i++) {
      const marker: google.maps.Marker = googleMarkers[i];
      if (map?.getBounds()?.contains(marker?.getPosition())) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    }
  }, [googleMarkers, map]);

  const setMapRef = (instance: HTMLDivElement | null) => {
    mapDivRef.current = instance;
  };

  return (
    <main className="flex flex-grow">
      <div className="flex min-h-screen w-full flex-grow items-center justify-center">
        <MapContext.Provider value={map}>
          <Map
            mapId={useVectorMap === 'true' ? process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || '' : ''}
            {...mapOptions}
            mapRef={setMapRef}
            onTileLoaded={handleTileLoaded}>
            {!loading && useDeckGlIconLayer && <DeckMarker GeoJson={data} />}
            {!loading &&
              useGoogleMarkers &&
              data.features?.map((feature: Feature, key: React.Key) => {
                return (
                  <Marker
                    position={{ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }}
                    key={key}
                  />
                );
              })}
            {!loading && useDeckGlGeoJsonLayer && <GeoJsonLayer GeoJson={data} />}
            {!loading && useGoogleWebGLOverlayView && <WebGLOverlayView data={dataObjects3D} />}
          </Map>
        </MapContext.Provider>
        <div className="absolute top-5 left-5 z-100">
          <Button link={'/'} text="HOME" />
        </div>
      </div>
    </main>
  );
};

export default MapPage;
