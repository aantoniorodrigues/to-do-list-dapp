App = {
    
    // Loading status of the app.
    loading: false,
    // Where contracts will be stored in the app object.
    contracts: {},

    load: async () => {
        await App.loadWeb3();
        await App.loadAccount();
        await App.loadContract();
        await App.render();
    },

    // MetaMask sugestion to load web3 and connect to the blockchain.
    // https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },

    // Function to load the account that's using the app.
    loadAccount: async () => {
        App.account = web3.eth.accounts[0];
    },

    // Function to load the smart contracts.
    loadContract: async () => {
        // Get the contract json file.
        let toDoList = await $.getJSON('ToDoList.json');
        // Get a JavaScript representation of the contract.
        App.contracts.ToDoList = TruffleContract(toDoList);
        // Set the web3 provider.
        App.contracts.ToDoList.setProvider(App.web3Provider);
        console.log('contract:\n', toDoList);
        // Fill the smart contract with the real values from the blockchain.
        App.toDoList = await App.contracts.ToDoList.deployed();
    },

    // Function to render the client side application.
    render: async () => {
        // Prevent double render.
        if (App.loading) {
            return;
        }
        // Update loading status.
        App.setLoading(true);

        // Render the account's address.
        $('#account').html(App.content);

        // Update loading status
        App.setLoading(false);

        // Render the tasks.
    },

    renderTasks: async () => {
        // Get the number of tasks.
        let taskCount = await App.toDoList.taskCount();
        // Get the task template HTML element.
        let $taskTemplate = $('.taskTemplate');

        // Iterate through all the existent tasks.
        for (let i = 0; i <= taskCount; i++){
            // Get the task data from the blockchain.
            let task = await App.toDoList.tasks(i);
            // Set variables with the task id, content and completion status.
            let taskId = task[0].toNumber();
            let taskContent = task[1];
            let taskCompleted = task[2];
        
            // Create HTML element for the task.
            let $newTaskTemplate = $taskTemplate.clone();
            $newTaskTemplate.find('.content').html(taskContent);
            $newTaskTemplate.find('input')
                            .prop('name', taskId)
                            .prop('checked', taskCompleted)
                            // .on('click', App.toggleCompleted)
        }
    },

    setLoading: (boolean) => {
        App.loading = boolean;
        let loader = $('#loader');
        let content = $('#content');
        if (boolean) {
            loader.show();
            content.hide();
        } else {
            loader.hide();
            content.show();
        }
    }
}

$(() => {
    $(window).load(() => {
        App.load();
    })
})