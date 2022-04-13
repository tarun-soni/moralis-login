import React, { useEffect } from "react";
import { useMoralis } from "react-moralis";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import FileUpload from "../components/FileUpload";
import ImageCard from "../components/ImageCard";

const CHAIN_ID = 56;
const Login = () => {
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
    enableWeb3,
    isWeb3Enabled,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled) {
      console.log("enable web3");
    }
  }, [enableWeb3, isAuthenticated, isWeb3Enabled]);

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
        })
        .catch(function (error) {
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
      <h1>Moralis Hello World!</h1>
      {!isAuthenticated ? (
        <>
          <CustomButton
            text="Login with metamask"
            onClick={login}
            isLoading={isAuthenticating}
          />
          {/* <button onClick={walletConnectLogin}>
            Moralis WalletConnect Login
          </button> */}
        </>
      ) : (
        <>
          <div className=" flex m-3 p-3 flex-col align-center justify-center w-full">
            <div className="align-center justify-start w-auto">
              <CustomInput />
              <FileUpload />
            </div>
            {/* <CustomButton
            text="Logout"
            onClick={logOut}
            isLoading={isAuthenticating}
          /> */}
          </div>
        </>
      )}
      <h1>User - {user?.id}</h1>

      <pre>{JSON.stringify(user, 0, 1)}</pre>
    </div>
  );
};

export default Login;
