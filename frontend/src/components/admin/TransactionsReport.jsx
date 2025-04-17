import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Label from '../components/Label';
import { CircleCheckBig, XCircle } from 'lucide-react';

export default function TransactionsReport({ tableRef }) {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function getPayments() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/payments`, {
          withCredentials: true,
        });

        setPayments(res.data.data.payments);
      } catch (err) {
        toast.error(err);
      }
    }

    getPayments();
  }, []);

  return (
    <div className="border-[1px] border-slate-400 shadow-xl rounded-lg overflow-x-auto">
      <table ref={tableRef} className="text-center w-full border-collapse">
        <thead className="bg-black text-white text-lg">
          <tr>
            <th className="px-8 py-3 font-semibold">Payment ID</th>
            <th className="px-8 py-3 font-semibold">User details</th>
            <th className="px-8 py-3 font-semibold">Created on</th>
            <th className="px-8 py-3 font-semibold">Amount</th>
            <th className="px-8 py-3 font-semibold">Method</th>
            <th className="px-8 py-3 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => (
            <tr key={pay?.id} className="group border-t-[1px] border-gray-400 hover:bg-slate-100">
              <td className="px-8 py-3">{pay?.id}</td>
              <td className="px-8 py-3">
                <div className="flex flex-col text-sm text-slate-600">
                  <p>{pay?.email}</p>
                  <p>{pay?.contact}</p>
                </div>
              </td>
              <td className="px-8 py-3">{new Date(pay?.created_at * 1000).toLocaleString()}</td>
              <td className="px-8 py-3">{pay?.amount} ₹</td>
              <td className="px-8 py-3">{(pay?.method).charAt(0).toUpperCase() + (pay?.method).slice(1)}</td>
              <td className="px-8 py-3 place-items-center">
                <Label bgColor={`${pay?.status === 'captured' ? '#1ab79d' : '#dc2626'}`}>
                  <div className="flex items-center gap-1">
                    {pay?.status === 'captured' ? <CircleCheckBig size={14} /> : <XCircle size={14} />}
                    {(pay?.status).charAt(0).toUpperCase() + (pay?.status).slice(1)}
                  </div>
                </Label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
