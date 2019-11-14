pragma solidity ^0.4.24;

import "@aragon/os/contracts/apps/AragonApp.sol";

contract Counter is AragonApp {

    bytes32 constant public DECREMENT_ROLE = keccak256("DECREMENT_ROLE");

    event Increment(address entity);
    event Decrement(address entity);

    uint256 public value;

    function initialize() public onlyInit {
        initialized();
    }

    function increment() external {
        value += 1;
        emit Increment(msg.sender);
    }

    function decrement() external auth(DECREMENT_ROLE) {
        value -= 1;
        emit Decrement(msg.sender);
    }
}
