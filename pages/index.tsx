import type { NextPage } from 'next';
import React from 'react';
import Button from '../components/Button';

const data = [
  {
    header: 'Google Markers',
    description: 'Vector based map with Google Markers',
    link: {
      text: 'VIEW - 3D',
      url: 'map?useVectorMap=true&useGoogleMarkers=true',
    },
  },
  {
    header: 'Google Markers - tileloaded',
    description: 'Vector based map with Google Markers on tile loaded',
    link: {
      text: 'VIEW - 3D',
      url: 'map?useVectorMap=true&useGoogleMarkersOnTileLoaded=true',
    },
  },
  {
    header: 'Google WebGL Overlay View',
    description: 'Vector based map with 3D objects based on WebGLOverlayView & three',
    link: {
      text: 'VIEW - 3D',
      url: 'map?useVectorMap=true&useGoogleWebGLOverlayView=true',
    },
  },
  {
    header: 'Deck.gl - IconLayer',
    description: 'Raster based map using Deck.gl IconLayer',
    link: {
      text: 'VIEW - 2D',
      url: 'map?useDeckGlIconLayer=true',
    },
  },
  {
    header: 'Deck.gl - IconLayer',
    description: 'Vector based map using Deck.gl IconLayer',
    link: {
      text: 'VIEW - 3D',
      url: 'map?useVectorMap=true&useDeckGlIconLayer=true',
    },
  },
  {
    header: 'Deck.gl - GeoJsonLayer',
    description: 'Raster based map using Deck.gl GeoJsonLayer',
    link: {
      text: 'VIEW - 2D',
      url: 'map?useVectorMap=false&useDeckGlGeoJsonLayer=true',
    },
  },
  {
    header: 'Deck.gl - GeoJsonLayer',
    description: 'Vector based map using Deck.gl GeoJsonLayer',
    link: {
      text: 'VIEW - 3D',
      url: 'map?useVectorMap=true&useDeckGlGeoJsonLayer=true',
    },
  },
];

const Home: NextPage = () => {
  return (
    <main className="flex flex-col w-full p-8 flex-grow items-center justify-center">
      <h1 className="text-3xl p-8">Map demo app</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((page, key: React.Key) => {
          return (
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg" key={key}>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{page.header}</div>
                <p className="text-gray-700 text-base">{page.description}</p>
              </div>
              <div className="px-6 py-4 flex justify-center">
                <Button link={page.link.url} text={page.link.text} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
