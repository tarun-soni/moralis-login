//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract ImageUpload {
    string private imageLink;

    constructor(string memory _imageLink) {
        console.log("Deploying a Greeter with greeting:", _imageLink);
        imageLink = _imageLink;
    }

    function getImageLink() public view returns (string memory) {
        return imageLink;
    }

    function setImageLink(string memory _imageLink) public {
        console.log("Changing imageLink from '%s' to '%s'", imageLink, _imageLink);
        imageLink = _imageLink;
    }
}
