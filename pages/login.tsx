import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import FileUpload from "../components/FileUpload";
import ImageCard from "../components/ImageCard";
import Nav from "../components/Nav";
import { ImageMetaData, useStore } from "../store";
import ImageUpload from "../artifacts/contracts/ImageUpload.sol/ImageUpload.json";
import { ethers } from "ethers";
const CHAIN_ID = 56;
const Login = () => {
  const imageUploadAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

  const [inputValue, setInputValue] = useState("");

  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
    enableWeb3,
    isWeb3Enabled,
    provider,
  } = useMoralis();

  const { imageMetaData } = useStore();

  const [localImageMetaData, setLocalImageMetaData] =
    useState<ImageMetaData | null>();

  const [alreadyPresentImageLink, setAlreadyPresentImageLink] = useState<
    string[]
  >([]);

  useEffect(() => {
    setLocalImageMetaData(imageMetaData);
  }, [imageMetaData]);

  // const requestAccount = async () => {
  //   const accs = await window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   console.log("accs :>> ", accs);
  // };
  const fetchImage = async () => {
    const windowProvider = new ethers.providers.Web3Provider(window.ethereum);

    // const code = await provider.getCode(greeterAddress);

    // console.log("code :>> ", code);

    const imageContract = new ethers.Contract(
      imageUploadAddress,
      ImageUpload.abi,
      windowProvider
    );

    console.log("iamgeContract :>> ", imageContract);
    try {
      const imageLink = await imageContract.getImageLink();
      console.log("imageLink", imageLink);

      if (imageLink) {
        setAlreadyPresentImageLink([...alreadyPresentImageLink, imageLink]);
      }

      // setLocalGreeting(greeting);
    } catch (error) {
      console.log("error 64 :>> ", error);
    }
  };

  const uploadImageLinkToBlockchain = async (imageLink) => {
    const windowProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = windowProvider.getSigner();

    const imageContract = new ethers.Contract(
      imageUploadAddress,
      ImageUpload.abi,
      signer
    );

    try {
      const fetchedImageLink = await imageContract.setImageLink(imageLink);
      await imageContract.wait();

      console.log("fetchedImageLink", fetchedImageLink);

      // setLocalGreeting(greeting);
    } catch (error) {
      console.log("error 83 :>> ", error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled) {
      console.log("enable web3");
    }
  }, [enableWeb3, isAuthenticated, isWeb3Enabled]);

  const { removeUser, storeUser } = useStore();

  useEffect(() => {
    if (isAuthenticated) {
      storeUser({ user });
    } else {
      removeUser();
    }
  }, [isAuthenticated, removeUser, storeUser, user]);

  const walletConnectLogin = async () => {
    await authenticate({
      provider: "walletconnect",
      chainId: CHAIN_ID,
      signingMessage: "Welcome",
    });
  };

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "Log in using Moralis" })
        .then(function (user) {
          console.log("logged in user:", user);
          console.log(user!.get("ethAddress"));
          storeUser({ user });
        })
        .catch(function (error) {
          storeUser({ user: null });
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    console.log("logged out");
  };

  return (
    <div>
      <Nav />
      {!isAuthenticated ? (
        <>
          <div className="mt-10">
            <CustomButton
              text="Login with metamask"
              onClick={login}
              isLoading={isAuthenticating}
            />
          </div>
          {/* <button onClick={walletConnectLogin}>
            Moralis WalletConnect Login
          </button> */}
        </>
      ) : (
        <>
          {/* <div className=" border-2  flex m-3 p-3 flex-col align-center justify-center w-full"> */}
          <div className="align-center justify-start w-auto">
            {alreadyPresentImageLink.map((imageLink, index) => (
              <ImageCard
                key={index}
                data={{
                  title: "titleee",
                  description: "sample desc",
                  image: alreadyPresentImageLink[0],
                }}
              />
            ))}

            {/* <CustomInput
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setInputValue(e.target.value)
              }
              text={`Enter Title`}
            /> */}
            <FileUpload
              uploadImageLinkToBlockchain={uploadImageLinkToBlockchain}
            />
          </div>
          {/* <CustomButton
              text="Logout"
              onClick={logOut}
              isLoading={isAuthenticating}
            /> */}
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default Login;
