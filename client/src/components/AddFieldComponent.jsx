import React from "react";

function AddFieldComponent({ close, value, onchange, submit }) {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/25">
      <div className="bg-white">
        <div>
          <h1>Add field</h1>
          <button onClick={() => close()}>close</button>
        </div>
        <input
          className="bg-blue-50 my-3 p-2 border outline-none"
          placeholder="enter field name"
          value={value}
          onChange={onchange}
        />
        <button onClick={submit}>add Field</button>
      </div>
    </section>
  );
}

export default AddFieldComponent;
