import { useGetDesignsQuery } from "../../../../features/designs/designAPI";
import {  type TypeDesign } from "../../../../features/designs/designAPI";

const BrowseDesigns = () => {
  const { data: designs, isLoading, isError } = useGetDesignsQuery();

  if (isLoading) return <p className="p-4">Loading designs...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load designs</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-pink-700 mb-6">
        Explore Cake Designs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {designs?.map((design: TypeDesign) => (
          <div
            key={design.designId}
            className="border rounded shadow hover:shadow-lg transition p-4 bg-white"
          >
            <img
              src={design.imageUrl}
              alt={design.name}
              className="w-full h-48 object-cover rounded"
            />

            <h3 className="font-semibold text-lg mt-2">{design.name}</h3>

            <p className="text-gray-600 text-sm line-clamp-2">
              {design.description}
            </p>

            <p className="font-bold mt-2 text-pink-700">
              Category: {design.category}
            </p>

            <button
              className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded"
              onClick={() => alert(`Use design ${design.name}`)}
            >
              Use This Design
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrowseDesigns;
