let ToDoList = artifacts.require('./ToDoList.sol');

contract('ToDoList', (accounts) => {
    before(async () => {
        this.toDoList = await ToDoList.deployed();
    })

    // Test to see if the smart contract is deployed.
    it('deploys smart contract succesfully', async () => {
        // Get the smart contract's address.
        let address = await this.toDoList.address;
        assert.notEqual(address, 0x0);
        assert.notEqual(address, '');
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
    })

    // Test to see if the task data is correct
    it('lists tasks', async () => {
        // Variables to store the task count and the task's mapping.
        let taskCount = await this.toDoList.taskCount();
        let task = await this.toDoList.tasks(taskCount);
        // Check if all the data is correct.
        assert.equal(task.id.toNumber(), taskCount.toNumber());
        assert.equal(task.content, 'Task initialized in the constructor.');
        assert.equal(task.completed, false);
        assert.equal(taskCount.toNumber(), 1);
    })

    // Test to see if it creates tasks.
    it('creates tasks', async () => {
        let result = await this.toDoList.createTask('New created task.');
        let taskCount = await this.toDoList.taskCount();
        // Check if task count was incremented by 1.
        assert.equal(taskCount, 2);
        // Variable to store the emited event (TaskCreated) data.
        let event = result.logs[0].args;
        // Check if all the data is correct.
        assert.equal(event.id, 2);
        assert.equal(event.content, 'New created task.');
        assert.equal(event.completed, false);
    })

    // Test to see if it toggles tasks completion.
    it ('toggles task completion', async () => {
        let result = await this.toDoList.toggleCompleted(1);
        let task = await this.toDoList.tasks(1);
        // Check if task count was incremented by 1.
        assert.equal(task.completed, true);
        // Variable to store the emited event (TaskCompleted) data.
        let event = result.logs[0].args;
        // Check if all the data is correct.
        assert.equal(event.id.toNumber(), 1);
        assert.equal(event.completed, true);
    })

})