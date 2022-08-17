import React from "react";

function StoreFrontImages({ collection }) {
  return (
    <div
      key={collection.name}
      className="group relative h-96 bg-white rounded-lg shadow-xl"
    >
      <div>
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 overflow-hidden group-hover:opacity-75 duration-200">
            <img
              src={collection.imageSrc}
              alt={collection.imageAlt}
              className="w-full h-full object-center object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
        </div>
        <div className="absolute inset-0 rounded-lg p-6 flex items-end">
          <div>
            <p aria-hidden="true" className="text-sm text-white group-hover:underline">
              Shop the collection
            </p>
            <h3 className="mt-1 font-semibold text-white">
              <a href={collection.href}>
                <span className="absolute inset-0" />
                {collection.name}
              </a>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreFrontImages;
