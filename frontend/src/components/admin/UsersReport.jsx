import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function UsersReport({ tableRef }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`, {
          withCredentials: true,
        });

        setUsers(res.data.users);
      } catch (err) {
        toast.error(err);
      }
    }
    getUsers();
  }, []);

  return (
    <div className="border-[1px] border-slate-400 shadow-xl rounded-lg overflow-x-auto">
      <table ref={tableRef} className="text-center w-full border-collapse">
        <thead className="bg-black text-white text-lg">
          <tr>
            <th className="px-8 py-3 font-semibold w-fit"></th>
            <th className="px-8 py-3 font-semibold">Name</th>
            <th className="px-8 py-3 font-semibold">Email</th>
            <th className="px-8 py-3 font-semibold">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user?.user_id} className="group border-t-[1px] border-gray-400 hover:bg-slate-100">
              <td className=" px-8 py-3">
                <img
                  src={`${user?.photo ? `/user/${user?.photo}` : '/user/default.jpg'}`}
                  alt="User profile photo"
                  className="size-8 rounded-full object-cover"
                />
              </td>
              <td className=" px-8 py-3">{user?.name}</td>
              <td className=" px-8 py-3">{user?.email}</td>
              <td className=" px-8 py-3">{user?.role.charAt(0).toUpperCase() + user?.role.slice(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
