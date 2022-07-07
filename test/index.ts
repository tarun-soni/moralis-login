import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Greeter", function () {
  it("Should return the new image once it's changed", async function () {
    const ImageUpload = await ethers.getContractFactory("ImageUpload");
    const imageUpload = await ImageUpload.deploy("Sample image link");
    await imageUpload.deployed();

    expect(await imageUpload.getImageLink()).to.equal("Sample image link");

    const setImageTx = await imageUpload.setImageLink("Hola, mundo!");

    // wait until the transaction is mined
    await setImageTx.wait();

    expect(await imageUpload.getImageLink()).to.equal("Hola, mundo!");
  });
});
