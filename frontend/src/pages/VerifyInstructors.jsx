import { useEffect, useRef, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import VideoModal from '../components/admin/VideoModal';

export default function VerifyInstructors() {
  const [usersAppliedForInstructor, setUsersAppliedForInstructor] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [url, setUrl] = useState('');
  const tableRef = useRef();

  useEffect(() => {
    async function getUsersAppliedForInstructor() {
      try {
        tableRef.current.scrollIntoView({ block: 'end' });
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/users/sample`, {
          withCredentials: true,
        });

        setUsersAppliedForInstructor(res.data.data.users);
      } catch (err) {
        toast.error(err.message);
      }
    }

    getUsersAppliedForInstructor();
  }, []);

  async function onChange(userId, role) {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/role`,
        {
          role,
        },
        {
          withCredentials: true,
        }
      );

      toast.success('Status updated successfully.');

      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <div ref={tableRef} className="w-[95%] mx-auto mt-20 border-[1px] border-gray-400 rounded-lg overflow-x-auto">
        <table className="text-left w-full border-collapse">
          <thead className="bg-black text-white text-lg text-center">
            <tr>
              <th className="px-8 py-3 font-semibold text-left">Name</th>
              <th className="px-8 py-3 font-semibold">Email</th>
              <th className="px-8 py-3 font-semibold">Samples</th>
              <th className="px-8 py-3 font-semibold">Role</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {usersAppliedForInstructor?.map((user) => (
              <tr key={user?.user_id} className="group border-t-[1px] border-gray-400 hover:bg-slate-100">
                <td className=" px-8 py-3">
                  <div className="flex items-center gap-1">
                    <img
                      src={`/user/${user?.photo}`}
                      alt="profile photo"
                      className="size-5 object-cover rounded-full"
                    />
                    <span className="text-sm">{user?.name}</span>
                  </div>
                </td>
                <td className="px-8 py-3">{user?.email}</td>
                <td className="px-8 py-3 space-x-2">
                  {user?.samples.map((samp, i) => (
                    <button
                      key={samp}
                      onClick={() => {
                        setUrl(samp);
                        setIsModalVisible(true);
                        tableRef.current.scrollIntoView();
                      }}
                      className="text-blue-800 underline"
                    >{`sample${i + 1}`}</button>
                  ))}
                </td>
                <td className="px-8 py-3 w-20">
                  <select
                    onChange={(e) => onChange(user.user_id, e.target.value)}
                    defaultValue={user?.role}
                    className="group-hover:bg-slate-100"
                  >
                    <option value="user">User</option>
                    <option value="instructor">Instructor</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalVisible && <VideoModal setIsModalVisible={setIsModalVisible} url={url} tableRef={tableRef} />}
      <Toaster />
    </>
  );
}
