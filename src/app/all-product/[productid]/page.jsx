"use client"
import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'; // Ensure you have the right import for React Query
import Image from 'next/image'
import AddToCart from '@/components/AddToCart';

const Page = ({ params }) => {

  const userId = params.productid;
const API = `https://dummyjson.com/products/${userId}`;
console.log(API,"sdsdssd")

const fetchProduct = async () => {
  const response = await axios.get(API);
  return response.data; // Return the fetched data

  console.log(response.data,"scddhsdhshsdhsd")
};
const { data, error, isLoading } = useQuery({
  queryKey: ['productsKEY'], // Unique key for caching
  queryFn: fetchProduct,
});


console.log(data,"asasasas")

if (isLoading) {
  return <div>Loading...</div>; // Loading state
}

if (error) {
  return <div>Error: {error.message}</div>; // Error handling
}
return (
    <div className='bg-slate-100 rounded-xl flex flex-col items-center mt-[20px]'>
<Image
              src={data.thumbnail}
              alt="img"
              width={200}
              height={200}
              className="mb-2 rounded"
            />
            <hr className='w-full'/>

            <p className="text-center">{data.title}</p>
            <hr className='w-full'/>

<p className="px-[20px] ">{data.description}</p>
<hr className='w-full mb-[20px]'/>
<div className="flex gap-[30px] capitalize">
<p>category: {data.category}</p>
<p>price: {data.price}</p>
<p>rating: {data.rating}</p>
</div>

<AddToCart id={userId}/>

    </div>
  )
}

export default Page
