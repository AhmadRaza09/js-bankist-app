'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type  movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}ε</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  // console.log(containerMovements.textContent);
};

const calcPrintBalance = function (account) {
  account.balance = account.movements.reduce(
    (bal, movement) => (bal = bal + movement),
    0
  );

  labelBalance.textContent = `${account.balance} ε`;
};

const calcDisplaySummary = function (account) {
  const movements = account.movements;
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${incomes}ε`;

  const out = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}ε`;

  const interest = movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit / 100) * account.interestRate)
    .filter(inter => inter >= 1)
    .reduce((acc, inter) => acc + inter, 0);

  labelSumInterest.textContent = `${interest}ε`;
};

const createUsernames = function (accounts) {
  accounts.forEach(
    account =>
      (account.userName = account.owner
        .split(' ')
        .map(singleName => singleName[0])
        .join('')
        .toLowerCase())
  );
};

createUsernames(accounts);

const updateUI = function (account) {
  // //display movements
  displayMovements(account.movements);
  //diplay balance
  calcPrintBalance(account);
  //display summary
  calcDisplaySummary(account);
};

// event handler
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e);
  // console.log('login');
  // console.log(this);

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //dipslay UI and wlecome message
    // console.log('login');
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    //clear input
    inputLoginUsername.value = inputLoginPin.value = '';

    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('transfer');
  const amount = Number(inputTransferAmount.value);
  // console.log(amount);
  const receiverAcc = accounts.find(
    account => account.userName === inputTransferTo.value
  );
  // console.log(receiverAcc?.userName);
  // console.log(Boolean(undefined));

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //doing transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
  }

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  // console.log(receiverAcc);
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (
    loan > 0 &&
    currentAccount.movements.some(movement => movement >= loan * 0.1)
  ) {
    currentAccount.movements.push(loan);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(inputCloseUsername.value, inputClosePin.value);
  if (
    currentAccount.userName === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      account => account.userName === currentAccount.userName
    );

    // console.log(index);
    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
    // console.log('yes');
  }
  // console.log('no');
});

let sort = false;

btnSort.addEventListener('click', function () {
  // console.log('yes');
  sort = !sort;
  displayMovements(currentAccount.movements, sort);
});

// console.log(accounts);

// const user = 'Ahmad Raza Qadri';

// const username = user.split(' ');
// console.log(username);

// const a = username.map(function (usr) {
//   return usr[0];
// });

// console.log(a);
// const b = a.join('');
// console.log(b.toLowerCase());
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// let arr = ['a', 'b', 'c', 'd', 'e'];

// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log([...arr]);

// // splice

// // console.log(arr.splice(2));
// arr.splice(-1);
// console.log(arr);
// arr.splice(1, 2);
// console.log(arr);

// // reverse
// arr = ['a', 'b', 'c', 'd', 'e'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// // concat

// const letters = arr.concat(arr2);
// console.log(letters);

// //join
// console.log(letters.join('-'));

// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of mov) {
//   if (movement > 0) {
//     console.log(`You depsit ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// }

// console.log('For Each');

// movements.forEach(function (movement, index, array) {
//   console.log(index, array);
//   if (movement > 0) {
//     console.log(`You depsit ${movement}`);
//   } else {
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurToUsd = 1.1;

// console.log(
//   mov.map(function (movement, index, arr) {
//     console.log(index, arr);
//     return movement * eurToUsd;
//   })
// );

// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const a = mov.filter(function (move) {
// //   return move < 0;
// // });

// // console.log(a);

// const a = mov.reduce(function (acc, move, i) {
//   console.log('acc', acc);
//   if (acc > move) return acc;
//   else return move;
// });

// console.log(a);

// const b = mov.reduce(function (acc, move, i) {
//   console.log('a', acc);
//   return acc;
// });

// console.log(b);

// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const a = mov.find(move => move < 0);

// console.log(a);

// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // console.log(mov.includes(-130));

// console.log(mov.some(mov => mov > 5000));

// const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(mov.every(move => typeof move === 'number'));

// const arr = [[1, 2, 3, [2, 3]], [4, 5, 5], 7, 8];

// // console.log(arr.flat(2));

// const overalBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, current) => acc + current, 0);

// console.log(overalBalance);

// const overalBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, current) => acc + current, 0);

// console.log(overalBalance2);
// const owner = ['jonas', 'zach', 'adam', 'martha'];

// console.log(owner.sort());

// console.log(mov.sort());
// console.log(mov);

// mov.sort((a, b) => a - b);

// console.log(mov);

// const x = new Array(7);
// console.log(x);

// x.map(() => 5);
// console.log(x);

// x.fill(5);
// x.fill(1, 3, 5);
// console.log(x);

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// arr.fill(1);
// console.log(arr);

// const a = Array.from({ length: 7 }, (_, i) => i);
// console.log(a);

// labelBalance.addEventListener('click', function () {
//   const movementsUI = Array.from(
//     document.querySelectorAll('.movements__value'),
//     el => Number(el.textContent.replace('ε', ''))
//   );

//   console.log(movementsUI);
// });

// console.log(document.querySelectorAll('.movements__value').length);

// const dogs = [
//   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
//   { weight: 8, curFood: 200, owners: ['Matilda'] },
//   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
//   { weight: 32, curFood: 340, owners: ['Michael'] },
// ];

// dogs.forEach(
//   current => (current.recommendedFood = Math.trunc(current.weight ** 0.75 * 28))
// );

// console.log(dogs);

// const a = dogs.find(current => current.owners.includes('Sarah'));

// console.log(a);
// console.log(
//   `Sarah's dog is eating too ${
//     a.curFood > a.recommendedFood ? 'much' : 'little'
//   }`
// );

// const much = dogs
//   .filter(current => current.curFood > current.recommendedFood)
//   .flatMap(current => current.owners);

// console.log(much);

// const little = dogs
//   .filter(current => current.curFood < current.recommendedFood)
//   .flatMap(current => current.owners);

// console.log(little);

// console.log(`${much.join(' and ')} dogs eat too much`);

// console.log(`${little.join(' and ')} dogs eat too little`);

// console.log(dogs.some(current => current.curFood === current.recommendedFood));
