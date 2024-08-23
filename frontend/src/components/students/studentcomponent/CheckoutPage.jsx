import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'
];

const CheckoutPage = () => {
  const [selectedState, setSelectedState] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const { items } = useSelector(state => state.cart);
  const {user}=useSelector(state=>state.auth);
  const totals = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = item.course.price;
      const offerPrice = price * (1 - item.course.offer_percentage / 100);
      
      acc.totalPrice += price;
      acc.totalOfferPrice += offerPrice;
      return acc;
    }, { totalPrice: 0, totalOfferPrice: 0 });
  }, [items]);

  const discount = totals.totalPrice - totals.totalOfferPrice;

  return (
    <>
    <Navbar user={user} />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Billing address</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" disabled>
                <option>India</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">State / Union Territory</label>
              <select 
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Please select...</option>
                {indianStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Payment method</h2>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" name="paymentMethod" value="card" onChange={() => setPaymentMethod('card')}/>
                <span className="ml-2">Credit/Debit Card</span>
              </label>
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" name="paymentMethod" value="upi" onChange={() => setPaymentMethod('upi')}/>
                <span className="ml-2">UPI</span>
              </label>
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" name="paymentMethod" value="netbanking" onChange={() => setPaymentMethod('netbanking')}/>
                <span className="ml-2">Net Banking</span>
              </label>
            </div>
            <div className="mb-2">
              <label className="inline-flex items-center">
                <input type="radio" className="form-radio" name="paymentMethod" value="wallet" onChange={() => setPaymentMethod('wallet')}/>
                <span className="ml-2">Mobile Wallets</span>
              </label>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Order details</h2>
            {items.map(item => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.course.thumbnail} alt={item.course.name} className="w-16 h-16 object-cover mr-4"/>
                <div>
                  <h3 className="font-bold">{item.course.name}</h3>
                  <p className="text-gray-600">
                    <span className="line-through">₹{item.course.price}</span>
                    <span className="ml-2 text-green-600">₹{(item.course.price * (1 - item.course.offer_percentage / 100)).toFixed(2)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-1/3 px-4">
          <div className="bg-gray-100 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="mb-4">
              <p className="flex justify-between"><span>Original Price:</span><span>₹{totals.totalPrice.toFixed(2)}</span></p>
              <p className="flex justify-between"><span>Discounts:</span><span>-₹{discount.toFixed(2)}</span></p>
            </div>
            <div className="border-t pt-4">
              <p className="flex justify-between font-bold"><span>Total:</span><span>₹{totals.totalOfferPrice.toFixed(2)}</span></p>
            </div>
            <button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Complete Checkout
            </button>
            <p className="mt-4 text-center text-sm text-gray-600">30-Day Money-Back Guarantee</p>
          </div>
        </div>
      </div>
    </div></>
  );
};

export default CheckoutPage;