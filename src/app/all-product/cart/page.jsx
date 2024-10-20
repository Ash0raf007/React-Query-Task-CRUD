"use client"
import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image'; // Import Image from Next.js
import Loader from '@/components/Loader';

const Page = () => {
  const API = `https://dummyjson.com/carts`;
  const fetchProducts = async () => {
    const response = await axios.get(API);
    return response.data; // Return the fetched data

    console.log(response.data, "scd")
  };

  // Use the fetch function with React Query
  const { data, error, isLoading } = useQuery({
    queryKey: ['cartsKEY'], // Unique key for caching
    queryFn: fetchProducts,
  });


  console.log(data, "test...")

  // if (isLoading) {
  //   return <div>Loading...</div>; // Loading state
  // }

  if (error) {
    return <div>Error: {error.message}</div>; // Error handling
  }


  return (
    <div>
      { isLoading? 
      <Loader/>
      :
      <div className='h-[500px] overflow-y-scroll mt-[10px]'>
      {data?.carts?.map((cart) => (
        <div key={cart.id}>
          {cart.products.map((product) => (
            <div key={product.id}>
              <Image
                src={product.thumbnail}
                alt="img"
                width={100} // Adjust width/height as needed
                height={100}
                className="mb-2 rounded"
              />
              <hr className="w-full" />

              <p className="">{product.title}</p>
              <hr className="w-full" />

              <hr className="w-full mb-[20px]" />
              <div className="flex gap-[30px] capitalize">
                <p>Price: {product.price}</p>
                <p>DiscountedTotal: {product.discountedTotal}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
      </div>
      
      }
      
    </div>
  )
}

export default Page
