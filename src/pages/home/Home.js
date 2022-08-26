import React from "react";
import { StoreFrontImages, Perks, Navbar, Footer } from "../../components";

import { collections, perks, trendingProducts } from "../../constants";

function Home() {
  return (
    <>
      <main>
        <div className="flex justify-center items-center sm:px-16 px-6">
          <div className="xl:max-w-[1280px] w-full">
            <Navbar />
          </div>
        </div>
        <div className="relative">
          {/* Background image and overlap */}
          <div
            aria-hidden="true"
            className="hidden absolute inset-0 sm:flex sm:flex-col"
          >
            <div className="flex-1 relative w-full bg-gray-800">
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="heheh"
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            </div>
            <div className="w-full bg-white h-32 md:h-40 lg:h-48" />
          </div>

          <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col sm:hidden"
            >
              <div className="flex-1 relative w-full bg-gray-800">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                    alt="heheh"
                    className="w-full h-full object-center object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gray-900 opacity-50" />
              </div>
              <div className="w-full bg-white h-48" />
            </div>
            <div className="relative py-32">
              <h1 className="text-4xl font-extrabold tracking-tight text-primaryTextLight sm:text-5xl md:text-6xl cursor-default">
                Summer Sale
              </h1>
              <div className="mt-4 sm:mt-6">
                <p className="inline-block bg-primaryPurple border border-transparent rounded-md py-3 px-8 font-medium text-primaryTextLight hover:bg-indigo-700 duration-200 cursor-pointer">
                  Shop All
                </p>
              </div>
            </div>
          </div>

          <section
            aria-labelledby="collection-heading"
            className="-mt-96 relative sm:mt-0"
          >
            <h2 id="collection-heading" className="sr-only">
              Collections
            </h2>
            <div className="max-w-md mx-auto grid grid-cols-1 gap-y-6 px-4 sm:max-w-7xl sm:px-6 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:px-8 lg:gap-x-8">
              {collections.map((collection, i) => (
                <StoreFrontImages key={i} collection={collection} />
              ))}
            </div>
          </section>
        </div>

        <section aria-labelledby="trending-heading">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:pt-32 lg:px-8">
            <div className="md:flex md:items-center md:justify-between">
              <h2
                id="favorites-heading"
                className="text-2xl font-extrabold tracking-tight text-gray-900"
              >
                Trending Products
              </h2>
              <p className="hidden text-sm font-medium text-primaryPurple hover:text-primaryPurpleHover md:block hover:underline cursor-pointer">
                Shop the collection<span aria-hidden="true"> &rarr;</span>
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
              {trendingProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    <a href={product.href}>
                      <span className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-sm md:hidden">
              <p className="font-medium text-primaryPurple hover:text-primaryPurpleHover">
                Shop the collection<span aria-hidden="true"> &rarr;</span>
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="perks-heading"
          className="bg-gray-50 border-t border-gray-200"
        >
          <h2 id="perks-heading" className="sr-only">
            Our perks
          </h2>

          <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 sm:py-32 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk) => (
                <Perks perk={perk} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

export default Home;
