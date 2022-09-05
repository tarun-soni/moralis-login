import React, { useState } from "react";
import ImageCard from "../components/ImageCard";
import Nav from "../components/Nav";
import Moralis from "moralis";
import { useStore } from "../store";

import ImageUpload from "../artifacts/contracts/ImageUpload.sol/ImageUpload.json";
import { useRouter } from "next/router";
import { useMoralis, useMoralisFile, useMoralisQuery } from "react-moralis";

function Dashboard() {
  const [alreadyPresentImageLink, setAlreadyPresentImageLink] = useState<
    string[]
  >([]);

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    // user,
    account,
    logout,
    enableWeb3,
    isWeb3Enabled,
    provider,
  } = useMoralis();
  const router = useRouter();
  const { chainData, user } = useStore();

  const fetchMoralisImage = async () => {
    await Moralis.enableWeb3();
    const options: Moralis.ExecuteFunctionOptions = {
      contractAddress: chainData.imageUploadAddress,
      functionName: "getImageLink",
      abi: ImageUpload.abi,
    };

    const imageLink = await Moralis.executeFunction(options);

    console.log("fetched imageLink :>> ", imageLink);
    if (imageLink) {
      setAlreadyPresentImageLink([...alreadyPresentImageLink, `${imageLink}`]);
    }

    console.log("res :>> ", imageLink);
  };

  // console.log("isAuthenticated :>> ", isAuthenticated);
  return (
    <div>
      <Nav />

      {/* <div className=" border-2  flex m-3 p-3 flex-col align-center justify-center w-full"> */}
      <div className="align-center justify-start w-auto">
        {alreadyPresentImageLink.map((imageLink, index) => (
          <ImageCard
            isUploadButtonEnabled={false}
            key={index}
            data={{
              title: "titleee",
              description: "sample desc",
              image: alreadyPresentImageLink[0],
            }}
          />
        ))}

        {/* <FileUpload
          uploadImageLinkToBlockchain={uploadImageLinkToBlockchainMoralis}
        /> */}
      </div>
    </div>
  );
}

export default Dashboard;
