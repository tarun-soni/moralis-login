import React, { useEffect, useState } from "react";
import CustomButton from "./CustomButton";
import { useMoralisFile } from "react-moralis";
import ImageCard from "./ImageCard";
import axios from "axios";
import Image from "next/image";
import { useStore } from "../store";
// import { getImageUploadDeployedAddress } from "../scripts/deploy";

function FileUpload({ uploadImageLinkToBlockchain }) {
  const [file, setFile] = React.useState<string | null>(null);
  const { saveFile, isUploading } = useMoralisFile();

  const [previewFile, setPreviewFile] = useState();
  const [metaData, setMetaData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLS] = useState([]);

  const { setImageMetaData } = useStore();
  // const addr = getImageUploadDeployedAddress();
  // console.log("addr :>> ", addr);
  // console.log(
  //   "getImageUploadDeployedAddress :>> ",
  //   getImageUploadDeployedAddress()
  // );

  useEffect(() => {
    async function run() {
      // const Greeter = await ethers.getContractFactory("Greeter");
      // const greeter = await Greeter.deploy("Hello, Hardhat!");
      // await greeter.deployed();
      // console.log("Greeter deployed to:", greeter.address);
    }
    run();
  }, []);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event.target.files :>> ", event.target.files);

    const file = event.target.files[0];

    var imageList = images;
    var urlList = imageURLS;

    if (event.target.files && event.target.files[0]) {
      imageList.push(event.target.files[0]);
      urlList.push(URL.createObjectURL(event.target.files[0]));
      setImages(imageList);
      setImageURLS(urlList);
    }

    setPreviewFile(file);
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);
    reader.onload = async () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      console.log(buffer);
    };
    reader.onloadend = async () => {
      console.log("reader.result :>> ", reader.result);
      const x = new Uint8Array(reader.result as ArrayBuffer);
      console.log("x", x);

      const base64 = Buffer.from(x).toString("base64");
      setFile(base64);
    };
  };

  const uploadToIpfs = () => {
    const base64 = file;

    saveFile(
      "myfile.txt",
      { base64 },
      {
        type: "base64",
        saveIPFS: true,
        onSuccess: (result) => {
          console.log(result.ipfs());
          const _metaData = {
            name: "test name",
            description: "test desc",
            image: `${result.ipfs()}`,
          };
          console.log("_metaData :>> ", _metaData);
          setMetaData(_metaData);
          setImageMetaData(_metaData);
        },

        onError: (error) => console.log(error),
      }
    );
  };

  // const uploadMetaData = () => {
  //   // const _file =

  //   uploadToIpfs();

  //   const base64 = btoa(JSON.stringify(metaData));
  //   saveFile(
  //     "myfile.txt",
  //     { base64 },
  //     {
  //       type: "base64",
  //       saveIPFS: true,
  //       onSuccess: (result) => {
  //         console.log("result .ipfs", result.ipfs());
  //         const _metaData = {
  //           name: "test name",
  //           description: "test desc",
  //           image: `${result.ipfs()}`,
  //         };
  //         setMetaData(_metaData);
  //       },

  //       onError: (error) => console.log(error),
  //     }
  //   );
  // };

  const bulkUpload = () => {
    const API_KEY =
      "7sdoWSuoUuv1XXIcJ03OFDDa2WsuQnh6azFAzEQutmMon4bZUbegq8UQslJ6iAGp";
    const _file = {
      path: "./images/test.jpeg",
      content: {
        name: "test name",
        description: "test desc",
        image: file,
      },
    };
    const ipfsArray = [];
    console.log("file :>> ", _file);

    axios
      .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", [_file], {
        headers: {
          "X-API-KEY": API_KEY,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <div className="py-10 h-30 bg-gray-300 px-2">
      <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden md:max-w-lg">
        <div className="md:flex">
          <div className="w-full">
            <div className="p-3">
              <div className="mb-2">
                <span className="text-sm">Title</span>
                <input
                  type="text"
                  className="h-12 px-3 w-full border-gray-200 border rounded focus:outline-none focus:border-gray-300"
                />
              </div>
              <div className="mx-2 my-6">
                <span className="text-md font-bold text-gray-600">
                  Attachments
                </span>
                {images?.length > 0 ? (
                  <div className="p-4 ">
                    {images.map((file, index) => (
                      <div className="row  w-30 h-60" key={index}>
                        <h1>{file.name}</h1>
                        <Image
                          src={imageURLS[index]}
                          alt={`${index}`}
                          // layout="responsive"
                          // layout="fill"
                          width={400}
                          height={200}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="relative h-40 rounded-lg border-dashed  border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                    <div className="absolute">
                      <div className="flex flex-col items-center ">
                        <i className="fa fa-cloud-upload fa-3x text-gray-200"></i>
                        <span className="block text-gray-400 font-normal">
                          Attach you files here
                        </span>
                        <span className="block text-gray-400 font-normal">
                          or
                        </span>
                        <span className="block text-blue-400 font-normal">
                          Browse files
                        </span>
                      </div>
                    </div>
                    <input
                      type="file"
                      className="h-full w-full opacity-0"
                      onChange={uploadFile}
                    />
                  </div>
                )}

                <div className="flex justify-between items-center text-gray-400">
                  <span>Accepted file type:.doc only</span>
                  <span className="flex items-center ">
                    <i className="fa fa-lock mr-1"></i> secure
                  </span>
                </div>
              </div>
              <div className="mt-3 text-center pb-3">
                {/* <button className="h-12 text-lg w-full bg-indigo-600 rounded text-white hover:bg-blue-900">
                  Create
                </button> */}
                <CustomButton
                  text="Upload"
                  onClick={uploadToIpfs}
                  isLoading={isUploading}
                />
                {/* <CustomButton
                  text="Bullk Upload"
                  onClick={bulkUpload}
                  isLoading={isUploading}
                /> */}
              </div>
              <ImageCard
                isUploadButtonEnabled={true}
                data={metaData}
                uploadImageLinkToBlockchain={uploadImageLinkToBlockchain}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
