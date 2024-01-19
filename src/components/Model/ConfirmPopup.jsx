
const ConfirmPopup = ({ isOpen, onCancel, message, onConfirm }) => {


  return (
    isOpen && (
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 overflow-y-auto overflow-x-hidden z-50 flex justify-center items-center bg-[#00000078]"
      >
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="mb-4">{message}</p>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 mr-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={onCancel}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>

      </div>
    )
  );
};

export default ConfirmPopup;
