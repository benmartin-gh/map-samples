import type { NextPage } from 'next';
import Map from '../components/Map';
import DeckMarker from '../components/Marker/DeckMarker';
import GeoJsonLayer from '../components/GeoJsonLayer';
import Button from '../components/Button';
import Marker from '../components/Marker/Marker';
import { useRouter } from 'next/router';
import { Feature } from '../types/GeoJSON';
import data from '../data/sports_facilities.json';

const MapPage: NextPage = () => {
  const router = useRouter();
  const { useVectorMap, useDeckGlIconLayer, useDeckGlGeoJsonLayer, useGoogleMarkers } = router.query;

  return (
    <main className="flex flex-grow">
      <div className="flex min-h-screen w-full flex-grow items-center justify-center">
        <Map
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || ''}
          mapId={useVectorMap === 'true' ? process.env.NEXT_PUBLIC_GOOGLE_MAP_ID || '' : ''}
          center={{
            lat: -33.8688,
            lng: 151.2093,
          }}
          tilt={45}
          zoom={12}>
          {useDeckGlIconLayer && <DeckMarker GeoJson={data} />}
          {useGoogleMarkers &&
            data.features?.map((feature: Feature, key: React.Key) => {
              return (
                <Marker
                  position={{ lat: feature.geometry.coordinates[1], lng: feature.geometry.coordinates[0] }}
                  key={key}
                />
              );
            })}
          {useDeckGlGeoJsonLayer && <GeoJsonLayer GeoJson={data} />}
        </Map>
        <div className="absolute top-5 left-5 z-100">
          <Button link={'/'} text="HOME" />
        </div>
      </div>
    </main>
  );
};

export default MapPage;
