"use client"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteCart = ({ setItemCount, id }) => {
  const API = `https://dummyjson.com/carts/${id}`

  const mutationCart = useMutation({
    mutationFn: () => axios.delete(API),
    onSuccess: (data) => {
      console.log('Item deleted from cart:', data);
      setItemCount(0); // Reset item count after deletion
      Cookies.remove(`itemCount-${id}`);
    },
    onError: (error) => {
      console.error('Error deleting item from cart:', error);
    },
  });

  // Handler function to trigger deletion
  const handleDelete = () => {
    mutationCart.mutate();
  };

  return (
    <div onClick={handleDelete}>

      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2M6 6h12l-1 14H7L6 6z" />
      </svg>
    </div>
  )
}

export default DeleteCart