import React from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Payment({ price }) {
  const { courseId } = useParams();

  const handlePayment = async () => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/courses/${courseId}/order`,
      {
        amount: Number(price + '00'),
        currency: 'INR',
        receipt: 'receipt#1',
      },
      {
        withCredentials: true,
      }
    );

    const order = data.data.order;

    const options = {
      key: 'rzp_test_aZCO2RyqPnGcmx',
      amount: order.amount,
      currency: order.currency,
      name: 'Learnify',
      description: 'Test Transaction',
      image: '/Logo.png',
      order_id: order.id,
      handler: async function (response) {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/courses/${courseId}/enroll`,
            {},
            {
              withCredentials: true,
            }
          );
          toast.success('Enrolled successfully! 🎉');
          setTimeout(() => window.location.reload(), 1500);
        } catch (err) {
          toast.error(err.message);
        }
      },
      prefill: {
        name: data.data.name,
        email: data.data.email,
        contact: '9999999999',
      },
      theme: {
        color: '#0369a1',
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <button
        onClick={handlePayment}
        className="w-full bg-sky-800 px-3 py-[8px] text-sm text-white font-semibold rounded-md md:w-auto"
      >
        Enroll for {price} ₹
      </button>
    </div>
  );
}
