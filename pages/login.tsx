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

import Moralis from "moralis";
import { useRouter } from "next/router";
// Moralis.executeFunction(options
const Login = () => {
  const imageUploadAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

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

  const fetchMoralisImage = async () => {
    await Moralis.enableWeb3();
    const options: Moralis.ExecuteFunctionOptions = {
      contractAddress: imageUploadAddress,
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

  const uploadImageLinkToBlockchain = async (imageLink: string) => {
    const windowProvider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = windowProvider.getSigner();

    const imageContract = new ethers.Contract(
      imageUploadAddress,
      ImageUpload.abi,
      signer
    );
    console.log("imageContract :>> ", imageContract);

    try {
      const fetchedImageLink = await imageContract.setImageLink(imageLink);
      // await imageContract.wait();

      console.log("fetchedImageLink", fetchedImageLink);

      // setLocalGreeting(greeting);
    } catch (error) {
      console.log("error 83 :>> ", error);
    }
  };

  const uploadImageLinkToBlockchainMoralis = async (imageLink: string) => {
    await Moralis.enableWeb3();
    const options: Moralis.ExecuteFunctionOptions = {
      contractAddress: imageUploadAddress,
      functionName: "setImageLink",
      abi: ImageUpload.abi,
      params: {
        _imageLink: imageLink,
      },
      // msgValue: Moralis.Units.ETH(0.1),
    };

    const res = await Moralis.executeFunction(options);

    console.log("res upload :>> ", res);
  };

  useEffect(() => {
    // fetchImage();
    fetchMoralisImage();
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
          if (user) storeUser({ user });
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

  if (isAuthenticated) router.replace("/dashboard");

  return (
    <div>
      <Nav />

      {/* {isAuthenticated ? (
        router.push("/dashboard")
      ) : (
        <CustomButton
          text="Login with metamask"
          onClick={login}
          isLoading={isAuthenticating}
        />
      )} */}

      {!isAuthenticated ? (
        <>
          <div className="mt-10">
            <CustomButton
              text="Login with metamask"
              onClick={login}
              isLoading={isAuthenticating}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Login;
