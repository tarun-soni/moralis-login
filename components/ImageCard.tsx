import Image from "next/image";
import React from "react";

type Props = { data: any };

const ImageCard = ({ data }: Props) => {
  console.log("data :>> ", data);
  return (
    <div className="h-full flex items-center justify-center ">
      {console.log("props", data)}
      <div className=" delay-50 duration-100 bg-gray-800 p-5 rounded-lg w-80 group my-8">
        <Image
          src={data?.image || "https://via.placeholder.com/150"}
          // src="https://picsum.photos/250/250"
          className="w-full rounded shadow"
          alt="test"
          width={1920}
          height={1080}
        />

        <h3 className="text-gray-200 font-bold mt-5">{data.title}</h3>

        <p className="text-gray-400 font-light mt-2 text-xs">
          {" "}
          {data.description}
        </p>
        <button className="w-full bg-green-800  text-green-200  hover:bg-green-700 font-bold py-2 px-4 rounded-md mt-5 ">
          Upload Data to Blockchain
        </button>
      </div>
    </div>
  );
};
export default ImageCard;
