// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HoneyPot {
    mapping(address => bool) public blockedUsers;

    function interactWithButton() public {
        // Block the user when they interact with the button
        blockedUsers[msg.sender] = true;
    }

    function isBlocked(address user) public view returns (bool) {
        return blockedUsers[user];
    }
}