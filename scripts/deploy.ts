// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
let imageUploadDeployedAddress = "";
async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

  // We get the contract to deploy
  const ImageUpload = await ethers.getContractFactory("ImageUpload");
  const imageUpload = await ImageUpload.deploy(
    "https://ipfs.moralis.io:2053/ipfs/QmVzM4AHCdDyEbBp1FEiu3LR6nGpyreaXnxeUS8LVX5Hug"
  );

  await imageUpload.deployed();

  console.log("ImageUpload deployed to:", imageUpload.address);
  imageUploadDeployedAddress = imageUpload.address;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export const getImageUploadDeployedAddress = () => imageUploadDeployedAddress;
