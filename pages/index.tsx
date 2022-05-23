import type { NextPage } from 'next';
import React from 'react';
import Button from '../components/Button';
import data from '../data/page-data';

const Home: NextPage = () => {
  return (
    <main className="flex flex-col w-full p-8 flex-grow items-center justify-center">
      <h1 className="text-3xl p-8">Map demo app</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((page, key: React.Key) => {
          return (
            <div className="max-w-sm rounded-xl overflow-hidden shadow-lg bg-gray-100" key={key}>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{page.header}</div>
                <p className="text-gray-700 text-base">{page.description}</p>
              </div>
              <div className="px-6 py-4 flex items-bottom justify-center items-end">
                <Button
                  link="/map"
                  text="VIEW"
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
