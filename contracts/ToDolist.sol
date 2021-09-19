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

    // State variable to store tasks.
    mapping(uint => Task) public tasks;

    constructor() public {
        createTask('Task initialized in the constructor.');
    }

    // Function to create a new task.
    function createTask(string memory _content) public {
        taskCount++;
        tasks[taskCount] = Task(taskCount, _content, false);
    }
    
}