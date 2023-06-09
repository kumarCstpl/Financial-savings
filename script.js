document.addEventListener("DOMContentLoaded", function() {
    const transactionForm = document.getElementById("transactionForm");
    const transactionList = document.getElementById("transactionList");
  
    // Load stored transactions from Local Storage
    const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
    for (const storedTransaction of storedTransactions) {
      displayTransaction(storedTransaction);
    }
  
    transactionForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const amountInput = document.getElementById("amount");
      const typeInput = document.getElementById("type");
      const reasonInput = document.getElementById("reason");
  
      const amount = parseFloat(amountInput.value);
      const type = typeInput.value;
      const reason = reasonInput.value;
  
      if (!isNaN(amount) && reason !== "") {
        const transaction = {
          amount: amount,
          type: type,
          reason: reason
        };
  
        displayTransaction(transaction);
        saveTransaction(transaction);
  
        amountInput.value = "";
        reasonInput.value = "";
      }
    });
  
    function displayTransaction(transaction) {
      const listItem = document.createElement("li");
      listItem.classList.add(transaction.type);
      
      const transactionText = document.createElement("span");
      transactionText.textContent = `Amount: ${transaction.amount.toFixed(2)}, Type: ${transaction.type}, Reason: ${transaction.reason}`;
      transactionText.classList.add("reason");
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
        deleteTransaction(transaction);
        listItem.remove();
      });
  
      listItem.appendChild(transactionText);
      listItem.appendChild(deleteButton);
      transactionList.appendChild(listItem);
    }
  
    function saveTransaction(transaction) {
      // Get the stored transactions from Local Storage
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
      // Add the new transaction to the stored transactions
      storedTransactions.push(transaction);
  
      // Store the updated transactions back to Local Storage
      localStorage.setItem("transactions", JSON.stringify(storedTransactions));
    }
  
    function deleteTransaction(transaction) {
      // Get the stored transactions from Local Storage
      const storedTransactions = JSON.parse(localStorage.getItem("transactions")) || [];
  
      // Find the index of the transaction to be deleted
      const index = storedTransactions.findIndex(function(item) {
        return item.amount === transaction.amount && item.type === transaction.type && item.reason === transaction.reason;
      });
  
      if (index !== -1) {
        // Remove the transaction from the stored transactions
        storedTransactions.splice(index, 1);
  
        // Store the updated transactions back to Local Storage
        localStorage.setItem("transactions", JSON.stringify(storedTransactions));
      }
    }
  });
  