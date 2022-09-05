// //SPDX-License-Identifier: Unlicense
// pragma solidity ^0.8.0;

// import "hardhat/console.sol";

// contract ImageUpload {
//     struct User {
//         uint256 id;
//         bytes32 name;
//         bool set;
//     }

//     string private imageLink;

//     mapping(uint256 => User) private users;

//     function createUser(
//         address _userAddress,
//         uint256 _userId,
//         bytes32 _userName
//     ) public {
//         User storage user = users[_userAddress];
//         // Check that the user did not already exist:
//         require(!user.set);
//         //Store the user
//         users[_userAddress] = User({id: _userId, name: _userName, set: true});
//     }

//     function storeUserDataHash(uint256 _userId, bytes32 _dataHash) public {
//         users[_userId] = _dataHash;
//     }
// }
