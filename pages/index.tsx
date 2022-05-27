import type { NextPage } from 'next';
import React from 'react';
import Button from '../components/Button';
import data from '../data/page-data';

const Home: NextPage = () => {
  return (
    <main className="flex flex-col w-full p-8 flex-grow items-center justify-center">
      <h1>Map Samples</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {data.map((page, key: React.Key) => {
          return (
            <div className="flex flex-col max-w-md rounded overflow-hidden shadow bg-gray-50" key={key}>
              <div className="px-6 py-4 flex-none">
                <div className="font-bold font-light text-xl mb-2">{page.header}</div>
                <p className="text-gray-600 text-base">{page.description}</p>
              </div>
              <div className="px-6 py-4 grow flex items-bottom justify-center items-end">
                <Button
                  link={page.mapProvider === 'mapbox' ? '/mapbox' : '/map'}
                  text={page.params.mapType === '3D' ? '3D MAP' : '2D MAP'}
                  type={page.params.mapType === '3D' ? 'red' : 'blue'}
                  data={page.params}
                />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Home;
