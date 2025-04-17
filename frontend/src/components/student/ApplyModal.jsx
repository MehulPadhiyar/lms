import toast from 'react-hot-toast';
import axios from 'axios';

export default function ApplyModal({ setIsModalVisible }) {
  async function sendSampleVideos(formData) {
    try {
      const sample1 = formData.get('sample1');
      const sample2 = formData.get('sample2');
      const sample3 = formData.get('sample3');

      await axios.post(
        `${import.meta.env.VITE_API_URL}/users/sample`,
        { sample1, sample2, sample3 },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        }
      );

      toast.success('You have successfully applied for the instructor role.');
      setIsModalVisible(false);
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className="fixed z-50 inset-0 backdrop-blur-sm flex justify-center items-center text-white">
        <div className="bg-black rounded-2xl w-[52%] h-auto px-10 py-10 shadow-2xl">
          <div>
            <h2 className="text-xl">
              Upload three sample videos of yourself teaching to apply for the instructor role.
            </h2>
            <form action={sendSampleVideos} className="space-y-4 mt-6 flex flex-col">
              <input type="file" name="sample1" id="sample1" accept="video/*" />
              <input type="file" name="sample2" id="sample2" accept="video/*" />
              <input type="file" name="sample3" id="sample3" accept="video/*" />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalVisible(false)}
                  className="bg-gray-900 px-3 py-[6px] rounded-lg text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-white text-black px-3 py-[6px] rounded-lg font-semibold hover:bg-gray-300 text-sm"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
