"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import AddToCart from './AddToCart';
import Loader from "./Loader";
import SearchSec from './SearchSec';

const API = `https://dummyjson.com/products`;

const AllProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const productsPerPage = 5;

  const fetchProducts = async () => {
    const response = await axios.get(API);
    return response.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ['productsKEY'],
    queryFn: fetchProducts,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const totalProducts = data?.products?.length || 0;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = data?.products?.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredProducts = searchQuery
    ? data.products.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentProducts;

  return (
    <div>
      {isLoading ? <Loader /> : (
        <>
          <h1 className="text-2xl font-bold mb-4 px-[20px] mt-[10px]">Product List</h1>
        <div className="flex items-center justify-center">
          <SearchSec setSearchQuery={setSearchQuery} />
        </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4 cursor-pointer">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg max-w-[400px] flex flex-col items-center transition-all duration-500 ease-in-out transform hover:scale-105 hover:rotate-2 hover:shadow-xl"
              >
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  width={100}
                  height={100}
                  className="mb-2 max-h-[400px]"
                />
                <p className="text-black font-bold text-lg">{product.title}</p>
                <p className="text-gray-700 text-start mb-2 px-[10px] h-[70px] overflow-y-scroll">{product.description}</p>
                <p className="text-xl font-semibold">Price: ${product.price}</p>
                <AddToCart id={product.id} />
                <Link
                  href={`/all-product/${product.id}`}
                  className='flex justify-center text-gray-800 items-center mb-[10px] hover:text-white rounded-xl hover:bg-[#1F2937] px-[10px] py-[8px] text-gray-200 text-center transition duration-300'
                >
                  Show Product Details &#62;
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-2 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllProduct;
