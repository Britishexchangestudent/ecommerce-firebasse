import React from "react";
import { XCircleIcon } from "@heroicons/react/solid";

function EmptyProduct() {
  return (
    <div className="rounded-md bg-indigo-50 p-4  cursor-default">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-indigo-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-indigo-800">
            No available products
          </h3>
          <div className="mt-2 text-sm text-indigo-700">
            <p>
              Sorry, it looks like there are no available products that fall
              within your criteria. Please try again.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <p className="bg-indigo-50 px-2 py-1.5 rounded-md text-sm font-medium text-indigo-800 hover:bg-indigo-100  duration-200">
                Please change your criteria
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmptyProduct;
