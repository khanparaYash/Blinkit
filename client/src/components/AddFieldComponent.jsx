import React from "react";
import { IoClose } from "react-icons/io5";

function AddFieldComponent({ close, value, onchange, submit }) {
  return (
    <section className="fixed top-0 bottom-0 right-0 left-0 bg-neutral-900/70  z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded p-4 w-full max-w-md">
        <div className="flex items-center justify-between gap-3">
          <h1 className='font-semibold'>Add field</h1>
          <button className="cursor-pointer" onClick={() => close()}><IoClose size={25}/></button>
        </div>
        <input
          className="bg-blue-50 my-3 p-2 border outline-none focus-within:border-primary-100 rounded w-full"
          placeholder="enter field name"
          value={value}
          onChange={onchange}
        />
        <button className='bg-primary-200 hover:bg-primary-100 px-4 py-2 rounded mx-auto w-fit block' onClick={submit}>add Field</button>
      </div>
    </section>
  );
}

export default AddFieldComponent;
