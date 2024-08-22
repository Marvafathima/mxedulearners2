// src/components/CartPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCart, removeFromCart } from '../../../store/cartSlice';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
const CartPage = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector(state => state.cart);
  const { user,loading,usererror } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleRemoveItem = (cartItemId) => {
    console.log(cartItemId,"this is our cart item id")
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFromCart(cartItemId)).then(() => {
          dispatch(fetchCart());  // Fetch the updated cart after removal
          Swal.fire(
            'Removed!',
            'The course has been removed from your cart.',
            'success'
          );
        });
      }
    });
  };
  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (

    <div className="container mx-auto px-4 py-8">
      <Navbar user={user}/>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      <div className="flex flex-wrap -mx-4">
        
          {items.length>0 ?<> <div className="w-full lg:w-2/3 px-4">  {items.map((item) => (
            <div key={item.id} className="flex items-center mb-6 bg-white p-4 rounded-lg shadow">
              <img src={item.course.thumbnail} alt={item.course.name} className="w-24 h-24 object-cover rounded mr-4" />
              <div className="flex-grow">
                <h2 className="text-xl text-black font-semibold">{item.course.name}</h2>
                <p className="text-gray-600">by {item.course.creator}</p>
                <div className="mt-2">
                  {item.course.offer_percentage > 0 ? (
                    <>
                      <span className="font-bold text-lg text-black">₹{(item.course.price * (1 - item.course.offer_percentage / 100)).toFixed(2)}</span>
                      <span className="text-gray-500 line-through ml-2">₹{item.course.price}</span>
                    </>
                  ) : (
                    <span className="font-bold text-lg">₹{item.course.price}</span>
                  )}
                </div>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 font-bold text-xl">X</button>
            </div>
          ))}</div>
         
        
        <div className="w-full lg:w-1/3 px-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="card">
                  Card Number
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="card" type="text" placeholder="1234 5678 9012 3456" />
              </div>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="button">
                Proceed to Payment
              </button>
            </form>
          </div>
        </div></>
        :
        <div className="w-full h-[70vh] flex justify-center items-center">
        <div className="w-[30%] md:w-[40%] max-w-[300px]">
          <img 
            src="/emptycart.png" 
            alt="This cart is empty" 
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
        // <div className="w-full flex justify-center items-center">
        // <img src="/emptycart.png" alt="this cart is empty"></img>
        // </div>
        }
      </div>
    </div>
  );
};

export default CartPage;