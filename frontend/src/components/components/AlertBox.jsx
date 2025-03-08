export default function AlertBox({ setIsModalVisible, action, children }) {
  return (
    <>
      <div
        onClick={() => setIsModalVisible(false)}
        className="fixed z-50 inset-0 backdrop-blur-sm flex justify-center items-center text-white"
      >
        <div className="bg-black rounded-2xl w-[40%] px-10 py-10 shadow-2xl">
          <div>{children}</div>
          <div className="flex justify-end space-x-2">
            <button onClick={() => setIsModalVisible(false)} className="bg-gray-900 px-3 py-[6px] rounded-lg text-sm">
              Cancel
            </button>
            <button
              onClick={action}
              className="bg-white text-black px-3 py-[6px] rounded-lg font-semibold hover:bg-gray-300 text-sm"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
