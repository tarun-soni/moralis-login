import React from "react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  text: string;
};

function CustomInput({ value, onChange, text }) {
  return (
    <div>
      <form className="m-4 flex">
        <input
          className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white"
          placeholder="Some Title"
          onChange={onChange}
          value={value}
        />
        <button className="px-8 rounded-r-lg bg-teal-400  text-gray-800 font-bold p-4 uppercase border-teal-500 border-t border-b border-r">
          {text}
        </button>
      </form>
    </div>
  );
}

export default CustomInput;
