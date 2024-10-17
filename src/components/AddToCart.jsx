"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import Cookies from 'js-cookie';
import DeleteCart from "./DeleteCart";

const AddToCart = ({ id }) => {
  // Attempt to retrieve the item count from cookies or default to 0
  const savedItemCount = Cookies.get(`itemCount-${id}`);
  const initialCount = savedItemCount ? parseInt(savedItemCount, 10) : 0;

  const [itemCount, setItemCount] = useState(initialCount); // State to manage the item count

  // function generateId() {
  //   return 'id-' + Date.now().toString(36) + Math.random();
  // }

  // const [uniqueId] = useState(() => generateId()); 

  const API = 'https://dummyjson.com/carts/add';

  // Define the mutation with mutationFn
  const mutationCart = useMutation({
    mutationFn: (cartItem) => axios.post(API, cartItem),
    onSuccess: (data) => {
      console.log('Item added to cart:', data);
      // Update item count and cookie only if the item is successfully added
      setItemCount(prevCount => {
        const newCount = prevCount + 1;
        Cookies.set(`itemCount-${id}`, newCount, { expires: 7 }); // Update the cookie with the new count
        return newCount;
      });
    },
    onError: (error) => {
      console.error('Error adding item to cart:', error);
    },
  });

  const handleADD = () => {
    mutationCart.mutate({
      userId: id,
      products: [
        {
          id: id,
          quantity: 1,
        },
      ],
    });
  };

  const incrementCount = () => {
    setItemCount(prevCount => {
      const newCount = prevCount + 1;
      Cookies.set(`itemCount-${id}`, newCount, { expires: 7 }); // Update the cookie with the new count
      return newCount;
    });
  };

  const decrementCount = () => {
    setItemCount(prevCount => {
      const newCount = Math.max(prevCount - 1, 0); // Prevent negative values
      Cookies.set(`itemCount-${id}`, newCount, { expires: 7 }); // Update the cookie with the new count
      return newCount;
    });
  };

  return (
    <div className="flex">
      <div className="mt-[20px]">
        {itemCount === 0 ? (  // Only show button if itemCount is 0
          <div className="mt-[20px]">
            <button
              onClick={handleADD}
              className="rounded-xl text-white bg-red-500 p-[10px] mb-[20px]"
              disabled={mutationCart.isLoading} // Disable button during loading
            >
              Add To Cart
            </button>
          </div>
        ) : null}
      </div>
      {itemCount > 0 && (
        <div className="flex gap-[20px] flex-col items-center">
          <div className="flex items-center gap-[10px] text-center">
            <p className="text-lg cursor-pointer rounded-xl bg-slate-300 w-[30px]" onClick={incrementCount}>+</p>
            <p className="text-lg mx-2">{itemCount}</p>
            <p className="text-lg cursor-pointer rounded-xl bg-slate-300 w-[30px]" onClick={decrementCount}>-</p>
          </div>
          <div className="flex items-center gap-[20px]">
            <DeleteCart setItemCount={setItemCount} id={id} />
            <Link href="/all-product/cart" className="bg-red-500 p-[10px] flex justify-end text-white rounded-xl">Go TO Cart</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
