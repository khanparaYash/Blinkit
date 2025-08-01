import { IoClose } from "react-icons/io5";

function ConfirmBox({ onclose, handleOk }) {
  const handelDelete = async () => {
    handleOk();
  };
  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800/70  p-4 flex justify-center items-center">
      <div className="bg-white w-full max-w-md p-4 rounded">
        <div className="flex justify-between items-center gap-3">
          <h3 className="font-semibold">Permanent Delete</h3>
          <button onClick={onclose} className="cursor-pointer">
            <IoClose size={25} />
          </button>
        </div>
        <p className="my-4">Are you sure permanent delete ?</p>
        <div className="w-fit ml-auto flex items-center gap-3">
          <button
            onClick={handelDelete}
            className="px-4 py-1 border rounded border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
          >
            Confirm
          </button>
          <button
            onClick={onclose}
            className="px-4 py-1 border rounded border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmBox;
