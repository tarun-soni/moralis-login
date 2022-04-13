import Image from "next/image";
import React from "react";

type Props = { data: any };

const ImageCard = ({ data }: Props) => {
  return (
    <div className="h-full flex items-center justify-center ">
      {console.log("props", data)}
      <a className="hover:bg-gray-700 delay-50 duration-100 bg-gray-800 p-5 rounded-lg w-60 group">
        <img
          src={data.image || "https://via.placeholder.com/150"}
          // src="https://picsum.photos/250/250"
          className="w-full rounded shadow"
          alt="test"
          layout="fill"
        />

        <h3 className="text-gray-200 font-bold mt-5">{data.title}</h3>

        <p className="text-gray-400 font-light mt-2 text-xs">
          {" "}
          {data.description}
          Your daily update of the most played track from around the world...
        </p>
      </a>
    </div>
  );
};
export default ImageCard;
