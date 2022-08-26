import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { TbDatabaseOff } from "react-icons/tb";
import { Link } from "react-router-dom";

function EmptySearch({ query }) {
  return (
    <div className="text-center py-2">
      <TbDatabaseOff className="h-8 w-8 mx-auto text-gray-400" />

      <h3 className="mt-2 text-sm font-medium text-gray-900">
        {query} isn't in the database
      </h3>
      <p className="mt-1 text-sm text-gray-500">Want to add it?</p>
      <div className="mt-6">
        <Link to="/admin/add-product">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EmptySearch;
