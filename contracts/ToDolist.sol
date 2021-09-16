// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract ToDoList {

    // State variable to keep the number of tasks on the list.
    uint public taskCount = 0;

    // Structure used to model a task.
    struct Task {
        uint id;
        string content;
        bool completed;
    }

    
}