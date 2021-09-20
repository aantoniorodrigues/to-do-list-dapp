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

    // Event to emit when a new task is created.
    event TaskCreated(
        uint id,
        string content,
        bool completed
    );

    // Event to emit when a task is completed.
    event TaskComplete(
        uint id,
        bool completed
    );

    constructor() public {
        // Default task.
        createTask('Task initialized in the constructor.');
    }

    // Function to create a new task.
    function createTask(string memory _content) public {
        // Increment task count whenever a new task is created.
        taskCount++;
        // Create a new Task object and add it to the mapping.
        tasks[taskCount] = Task(taskCount, _content, false);
        // Emit a TaskCreated event.
        emit TaskCreated(taskCount, _content, false);
    }

    // Function to change the completed attribute.
    function toggleCompleted(uint _id) public {
        // Get the task to set.
        Task memory _task = tasks[_id];
        // Set the completed attribute to the opposite of the current status.
        _task.completed = !_task.completed;
        // Add the updated task to the tasks mapping.
        tasks[_id] = _task;
        // Emit TaskCompleted event.
        emit TaskComplete(_id, true);
    }
}