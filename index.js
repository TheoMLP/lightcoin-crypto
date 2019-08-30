class Account {

  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let balance = 0
    for (let transaction of this.transactions) {
      balance += transaction.value
    }
    return balance
  };

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
};

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Withdrawal extends Transaction {

  isAllowed() {
    return (this.account.balance - this.amount >= 0)
  }

  get value() {
    return -this.amount
  }
};

class Deposit extends Transaction {

  isAllowed() {
    return true
  }

  get value() {
    return this.amount
  }
};

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected

// const myAccount = new Account("snow-patrol")

// console.log('Starting Balance:', myAccount.balance);

// t1 = new Withdrawal(50.00, myAccount);
// t1.commit();
// console.log('Transaction 1:', t1.value);

// t2 = new Withdrawal(9.00, myAccount);
// t2.commit();
// console.log('Transaction 2:', t2.value);

// t3 = new Deposit(120.00, myAccount);
// t3.commit();
// console.log('Transaction 3:', t3.value);

// t4 = new Deposit(32.00, myAccount);
// t4.commit();
// console.log('Transaction 4:', t4.value);

// console.log('Ending balance:', myAccount.balance);

const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
