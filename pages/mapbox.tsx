import type { NextPage } from 'next';
import React, { useState } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Button from '../components/Button';
import dataPOI from '../data/sports_facilities.json';
import { Feature } from '../types/GeoJSON';

const MapBoxPage: NextPage = () => {
  const [lng] = useState(151.2093);
  const [lat] = useState(-33.8688);
  const [zoom] = useState(12);
  const [pitch] = useState(45);
  const [bearing] = useState(0);

  return (
    <main>
      <link href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css" rel="stylesheet"></link>
      <div className="flex min-h-screen w-full h-full">
        <ReactMapGL
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: zoom,
            pitch: pitch,
            bearing: bearing,
          }}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_API_KEY}
          style={{ width: '100vw', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9">
          {dataPOI.features?.map((feature: Feature, key: React.Key) => {
            return (
              <Marker
                longitude={feature.geometry.coordinates[0]}
                latitude={feature.geometry.coordinates[1]}
                key={key}
              />
            );
          })}
          ;
        </ReactMapGL>
      </div>
      <div className="absolute top-5 left-5 z-100 drop-shadow-md">
        <Button link={'/'} text="HOME" />
      </div>
    </main>
  );
};

export default MapBoxPage;
