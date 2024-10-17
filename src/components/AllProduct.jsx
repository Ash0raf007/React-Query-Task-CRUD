"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; // Ensure you have the right import for React Query
import Image from 'next/image'
import Link from 'next/link'
import AddToCart from './AddToCart';
import Loader from "./Loader"
const API = `https://dummyjson.com/products`;

const AllProduct = () => {

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5; // Number of products per page

  const fetchProducts = async () => {
    const response = await axios.get(API);
    return response.data; // Return the fetched data

    console.log(response.data, "scddhsdhshsdhsd")
  };

  // Use the fetch function with React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ['productsKEY'], // Unique key for caching
    queryFn: fetchProducts,
  });


  console.log(data, "asasasas")



  if (error) {
    return <div>Error: {error.message}</div>; // Error handling
  }


  // Pagination logic
  const totalProducts = data?.products?.length;
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = data?.products?.slice(startIndex, startIndex + productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
{isLoading ? <Loader/>


:(

<>
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      <div className="flex flex-wrap  gap-4 mt-4 cursor-pointer">
        {currentProducts?.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105"
          >

            <Image
              src={product.images[0]}
              alt={product.title}
              width={200}
              height={200}
              className="mb-2 rounded"
            />
            <p className="text-black font-bold text-lg">{product.title}</p>
            <p className="text-gray-700 text-center mb-2">{product.description}</p>
            <p className="text-xl font-semibold">Price: ${product.price}</p>


            <AddToCart id={product.id} />
            <Link
              href={`/all-product/${product.id}`} className='flex justify-end'>
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
            className={`mx-2 px-4 py-2 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
              }`}
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
