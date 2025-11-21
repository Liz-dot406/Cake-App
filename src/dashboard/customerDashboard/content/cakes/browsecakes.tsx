// src/dashboard/customer/cakes/BrowseCakes.tsx
import React from "react";
import { useGetCakesQuery } from "../../../../features/cakes/cakesAPI";

const BrowseCakes: React.FC = () => {
  const { data: cakes, isLoading, isError } = useGetCakesQuery();

  if (isLoading) return <p>Loading cakes...</p>;
  if (isError) return <p className="text-red-500">Failed to load cakes.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Browse Cakes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cakes?.map((cake) => (
          <div
            key={cake.cake_Id} 
            className="border rounded shadow p-4 flex flex-col items-center bg-white"
          >
            <img
              src={cake.image}
              alt={cake.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h2 className="text-lg font-semibold">{cake.name}</h2>
            <p className="text-gray-600 mb-2">{cake.description}</p>
            <p className="font-bold text-pink-700 mb-2">Ksh {cake.price}</p>
            {cake.available ? (
              <span className="bg-green-500 text-white px-2 py-1 rounded">
                Available
              </span>
            ) : (
              <span className="bg-red-500 text-white px-2 py-1 rounded">
                Unavailable
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseCakes;
