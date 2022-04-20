// 'use strict';

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // BANKIST APP

// // Data
// const account1 = {
//   owner: 'Jonas Schmedtmann',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jessica Davis',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Steven Thomas Williams',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Sarah Smith',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];

// // Elements
// const labelWelcome = document.querySelector('.welcome');
// const labelDate = document.querySelector('.date');
// const labelBalance = document.querySelector('.balance__value');
// const labelSumIn = document.querySelector('.summary__value--in');
// const labelSumOut = document.querySelector('.summary__value--out');
// const labelSumInterest = document.querySelector('.summary__value--interest');
// const labelTimer = document.querySelector('.timer');

// const containerApp = document.querySelector('.app');
// const containerMovements = document.querySelector('.movements');

// const btnLogin = document.querySelector('.login__btn');
// const btnTransfer = document.querySelector('.form__btn--transfer');
// const btnLoan = document.querySelector('.form__btn--loan');
// const btnClose = document.querySelector('.form__btn--close');
// const btnSort = document.querySelector('.btn--sort');

// const inputLoginUsername = document.querySelector('.login__input--user');
// const inputLoginPin = document.querySelector('.login__input--pin');
// const inputTransferTo = document.querySelector('.form__input--to');
// const inputTransferAmount = document.querySelector('.form__input--amount');
// const inputLoanAmount = document.querySelector('.form__input--loan-amount');
// const inputCloseUsername = document.querySelector('.form__input--user');
// const inputClosePin = document.querySelector('.form__input--pin');

// const displayMovements = function (movements, sort = false) {
//   containerMovements.innerHTML = '';

//   const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

//   movs.forEach(function (mov, i) {
//     const type = mov > 0 ? 'deposit' : 'withdrawal';
//     const html = `
//     <div class="movements__row">
//       <div class="movements__type  movements__type--${type}">${
//       i + 1
//     } ${type}</div>
//       <div class="movements__value">${mov}ε</div>
//   </div>`;

//     containerMovements.insertAdjacentHTML('afterbegin', html);
//   });
//   // console.log(containerMovements.textContent);
// };

// const calcPrintBalance = function (account) {
//   account.balance = account.movements.reduce(
//     (bal, movement) => (bal = bal + movement),
//     0
//   );

//   labelBalance.textContent = `${account.balance} ε`;
// };

// const calcDisplaySummary = function (account) {
//   const movements = account.movements;
//   const incomes = movements
//     .filter(mov => mov > 0)
//     .reduce((acc, mov) => acc + mov, 0);

//   labelSumIn.textContent = `${incomes}ε`;

//   const out = movements
//     .filter(mov => mov < 0)
//     .reduce((acc, mov) => acc + mov, 0);

//   labelSumOut.textContent = `${Math.abs(out)}ε`;

//   const interest = movements
//     .filter(mov => mov > 0)
//     .map(deposit => (deposit / 100) * account.interestRate)
//     .filter(inter => inter >= 1)
//     .reduce((acc, inter) => acc + inter, 0);

//   labelSumInterest.textContent = `${interest}ε`;
// };

// const createUsernames = function (accounts) {
//   accounts.forEach(
//     account =>
//       (account.userName = account.owner
//         .split(' ')
//         .map(singleName => singleName[0])
//         .join('')
//         .toLowerCase())
//   );
// };

// createUsernames(accounts);

// const updateUI = function (account) {
//   // //display movements
//   displayMovements(account.movements);
//   //diplay balance
//   calcPrintBalance(account);
//   //display summary
//   calcDisplaySummary(account);
// };

// // event handler
// let currentAccount;
// btnLogin.addEventListener('click', function (e) {
//   e.preventDefault();
//   // console.log(e);
//   // console.log('login');
//   // console.log(this);

//   currentAccount = accounts.find(
//     acc => acc.userName === inputLoginUsername.value
//   );
//   // console.log(currentAccount);

//   if (currentAccount?.pin === Number(inputLoginPin.value)) {
//     //dipslay UI and wlecome message
//     // console.log('login');
//     labelWelcome.textContent = `Welcome back, ${
//       currentAccount.owner.split(' ')[0]
//     }`;

//     containerApp.style.opacity = 100;

//     //clear input
//     inputLoginUsername.value = inputLoginPin.value = '';

//     inputLoginPin.blur();

//     updateUI(currentAccount);
//   }
// });

// btnTransfer.addEventListener('click', function (e) {
//   e.preventDefault();
//   // console.log('transfer');
//   const amount = Number(inputTransferAmount.value);
//   // console.log(amount);
//   const receiverAcc = accounts.find(
//     account => account.userName === inputTransferTo.value
//   );
//   // console.log(receiverAcc?.userName);
//   // console.log(Boolean(undefined));

//   if (
//     amount > 0 &&
//     receiverAcc &&
//     currentAccount.balance >= amount &&
//     receiverAcc?.userName !== currentAccount.userName
//   ) {
//     //doing transfer
//     currentAccount.movements.push(-amount);
//     receiverAcc.movements.push(amount);

//     updateUI(currentAccount);
//   }

//   inputTransferAmount.value = inputTransferTo.value = '';
//   inputTransferAmount.blur();
//   // console.log(receiverAcc);
// });

// btnLoan.addEventListener('click', function (e) {
//   e.preventDefault();
//   const loan = Number(inputLoanAmount.value);
//   if (
//     loan > 0 &&
//     currentAccount.movements.some(movement => movement >= loan * 0.1)
//   ) {
//     currentAccount.movements.push(loan);
//     updateUI(currentAccount);
//   }
//   inputLoanAmount.value = '';
//   inputLoanAmount.blur();
// });

// btnClose.addEventListener('click', function (e) {
//   e.preventDefault();
//   // console.log(inputCloseUsername.value, inputClosePin.value);
//   if (
//     currentAccount.userName === inputCloseUsername.value &&
//     currentAccount.pin === Number(inputClosePin.value)
//   ) {
//     const index = accounts.findIndex(
//       account => account.userName === currentAccount.userName
//     );

//     // console.log(index);
//     accounts.splice(index, 1);
//     containerApp.style.opacity = 0;
//     // console.log('yes');
//   }
//   // console.log('no');
// });

// let sort = false;

// btnSort.addEventListener('click', function () {
//   // console.log('yes');
//   sort = !sort;
//   displayMovements(currentAccount.movements, sort);
// });

// // console.log(accounts);

// // const user = 'Ahmad Raza Qadri';

// // const username = user.split(' ');
// // console.log(username);

// // const a = username.map(function (usr) {
// //   return usr[0];
// // });

// // console.log(a);
// // const b = a.join('');
// // console.log(b.toLowerCase());
// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// // const currencies = new Map([
// //   ['USD', 'United States dollar'],
// //   ['EUR', 'Euro'],
// //   ['GBP', 'Pound sterling'],
// // ]);

// // const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////

// // let arr = ['a', 'b', 'c', 'd', 'e'];

// // console.log(arr.slice(2));
// // console.log(arr.slice(2, 4));
// // console.log(arr.slice(-2));
// // console.log(arr.slice(1, -2));
// // console.log(arr.slice());
// // console.log([...arr]);

// // // splice

// // // console.log(arr.splice(2));
// // arr.splice(-1);
// // console.log(arr);
// // arr.splice(1, 2);
// // console.log(arr);

// // // reverse
// // arr = ['a', 'b', 'c', 'd', 'e'];
// // const arr2 = ['j', 'i', 'h', 'g', 'f'];
// // console.log(arr2.reverse());
// // console.log(arr2);

// // // concat

// // const letters = arr.concat(arr2);
// // console.log(letters);

// // //join
// // console.log(letters.join('-'));

// // const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // for (const movement of mov) {
// //   if (movement > 0) {
// //     console.log(`You depsit ${movement}`);
// //   } else {
// //     console.log(`You withdrew ${Math.abs(movement)}`);
// //   }
// // }

// // console.log('For Each');

// // movements.forEach(function (movement, index, array) {
// //   console.log(index, array);
// //   if (movement > 0) {
// //     console.log(`You depsit ${movement}`);
// //   } else {
// //     console.log(`You withdrew ${Math.abs(movement)}`);
// //   }
// // });

// // const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const eurToUsd = 1.1;

// // console.log(
// //   mov.map(function (movement, index, arr) {
// //     console.log(index, arr);
// //     return movement * eurToUsd;
// //   })
// // );

// // const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // // const a = mov.filter(function (move) {
// // //   return move < 0;
// // // });

// // // console.log(a);

// // const a = mov.reduce(function (acc, move, i) {
// //   console.log('acc', acc);
// //   if (acc > move) return acc;
// //   else return move;
// // });

// // console.log(a);

// // const b = mov.reduce(function (acc, move, i) {
// //   console.log('a', acc);
// //   return acc;
// // });

// // console.log(b);

// // const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const a = mov.find(move => move < 0);

// // console.log(a);

// // const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];
// // // console.log(mov.includes(-130));

// // console.log(mov.some(mov => mov > 5000));

// // const mov = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // console.log(mov.every(move => typeof move === 'number'));

// // const arr = [[1, 2, 3, [2, 3]], [4, 5, 5], 7, 8];

// // // console.log(arr.flat(2));

// // const overalBalance = accounts
// //   .map(acc => acc.movements)
// //   .flat()
// //   .reduce((acc, current) => acc + current, 0);

// // console.log(overalBalance);

// // const overalBalance2 = accounts
// //   .flatMap(acc => acc.movements)
// //   .reduce((acc, current) => acc + current, 0);

// // console.log(overalBalance2);
// // const owner = ['jonas', 'zach', 'adam', 'martha'];

// // console.log(owner.sort());

// // console.log(mov.sort());
// // console.log(mov);

// // mov.sort((a, b) => a - b);

// // console.log(mov);

// // const x = new Array(7);
// // console.log(x);

// // x.map(() => 5);
// // console.log(x);

// // x.fill(5);
// // x.fill(1, 3, 5);
// // console.log(x);

// // const arr = [1, 2, 3, 4, 5, 6, 7, 8];

// // arr.fill(1);
// // console.log(arr);

// // const a = Array.from({ length: 7 }, (_, i) => i);
// // console.log(a);

// // labelBalance.addEventListener('click', function () {
// //   const movementsUI = Array.from(
// //     document.querySelectorAll('.movements__value'),
// //     el => Number(el.textContent.replace('ε', ''))
// //   );

// //   console.log(movementsUI);
// // });

// // console.log(document.querySelectorAll('.movements__value').length);

// // const dogs = [
// //   { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
// //   { weight: 8, curFood: 200, owners: ['Matilda'] },
// //   { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
// //   { weight: 32, curFood: 340, owners: ['Michael'] },
// // ];

// // dogs.forEach(
// //   current => (current.recommendedFood = Math.trunc(current.weight ** 0.75 * 28))
// // );

// // console.log(dogs);

// // const a = dogs.find(current => current.owners.includes('Sarah'));

// // console.log(a);
// // console.log(
// //   `Sarah's dog is eating too ${
// //     a.curFood > a.recommendedFood ? 'much' : 'little'
// //   }`
// // );

// // const much = dogs
// //   .filter(current => current.curFood > current.recommendedFood)
// //   .flatMap(current => current.owners);

// // console.log(much);

// // const little = dogs
// //   .filter(current => current.curFood < current.recommendedFood)
// //   .flatMap(current => current.owners);

// // console.log(little);

// // console.log(`${much.join(' and ')} dogs eat too much`);

// // console.log(`${little.join(' and ')} dogs eat too little`);

// // console.log(dogs.some(current => current.curFood === current.recommendedFood));

//new code

'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-03-27T17:01:17.194Z',
    '2022-04-15T23:36:17.929Z',
    '2022-04-19T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2022-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovement = function (date) {
  const calcdaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 24 * 60 * 60));

  const daysPassed = calcdaysPassed(new Date(), date);

  // console.log(daysPassed);

  if (daysPassed === 0) {
    return 'Today';
  } else if (daysPassed === 1) {
    return 'Yesterday';
  } else if (daysPassed <= 7) {
    return `${daysPassed} days ago`;
  } else {
    const options = {
      // hour: 'numeric',
      // minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long',
    };
    return new Intl.DateTimeFormat(currentAccount.locale, options).format(date);
  }
};

const formattedCurrency = function (currentAccount, mov, signDisplay = 'auto') {
  return new Intl.NumberFormat(currentAccount.locale, {
    style: 'currency',
    currency: currentAccount.currency,
    signDisplay,
  }).format(mov);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);

    const displayDate = formatMovement(date);

    const formattedMov = formattedCurrency(currentAccount, mov);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  const formattedBal = formattedCurrency(currentAccount, acc.balance);
  labelBalance.textContent = formattedBal;

  const now = new Date();
  // const locale = navigator.language;
  // console.log(locale);
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    // weekday: 'long',
  };
  labelDate.textContent = new Intl.DateTimeFormat(
    currentAccount.locale,
    options
  ).format(now);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  const formattedIcn = formattedCurrency(currentAccount, incomes);
  labelSumIn.textContent = formattedIcn;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  const formattedOut = formattedCurrency(currentAccount, out, 'never');
  labelSumOut.textContent = formattedOut;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);

  const formattedIn = formattedCurrency(currentAccount, interest);
  labelSumInterest.textContent = formattedIn;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // when 0 second , stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = 'Log in to get started';
      currentAccount = {};
      // console.log('0');
      // return;
    }
    // console.log(sec);
    labelTimer.textContent = `${min}:${sec}`;

    //decrease 1 second

    //  in each call, print the reamaning time to UI
    time = time - 1;
  };
  // set time to 5 minutes
  let time = 60 * 5;
  // call the timer every second
  tick();
  timer = setInterval(tick, 1000);
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// //fake
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if (timer) {
      clearInterval(timer);
    }

    startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    const transferDate = new Date().toISOString();
    currentAccount.movements.push(-amount);
    currentAccount.movementsDates.push(transferDate);
    receiverAcc.movements.push(amount);
    receiverAcc.movementsDates.push(transferDate);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(+inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    setTimeout(function () {
      const loanDate = new Date().toISOString();

      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(loanDate);

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// console.log(23 === 23.0);

// console.log(0.1 + 0.2);

// console.log(Number('23'));

// console.log(+'23');

// console.log(Number.parseInt('30px', 10));

// console.log(Number.parseFloat('2.3rem'));

// console.log(Number.isNaN('adfs'));

// console.log(Math.sqrt(25));
// console.log(25 ** (1 / 2));

// console.log(Math.max(5, 18, '7', 5));

// console.log(Math.PI * Number.parseFloat('10px') ** 2);

// console.log(Math.trunc(Math.random() * 6) + 1);

// const randomInt = (min, max) =>
//   Math.trunc(Math.random() * (max - min) + 1) + min;

// console.log(randomInt(10, 20));

// console.log(Math.round(23.9));

// console.log(Math.ceil(23.3));
// console.log(Math.floor(23.3));

// console.log((2.7).toFixed(0));

// console.log(5 % 2);
// console.log(5 / 2);
// console.log(8 % 3);
// console.log(8 / 3);

// console.log(2 ** 53 + 0);
// console.log(Number.MAX_SAFE_INTEGER);

// console.log(3840932843209840328403284093284932859435809435453645645667657n);
// console.log(
//   BigInt(3840932843209840328403284093284932859435809435453645645667657n)
// );

// console.log(10000n + 10000n);

// const now = new Date();
// console.log(now);

// console.log(new Date('Apr 19 2022 10:24:20'));

// console.log(new Date('April 29, 2022'));

// console.log(new Date('2019-11-18T21:31:17.178Z'));

// const future = new Date(2022, 3, 19, 10, 31);

// console.log(future);

// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());

// console.log(future.toISOString());

// console.log(future.getTime());

// console.log(new Date(1650346260000));

// const future = new Date(2022, 3, 19, 10, 31);

// console.log(+future);

// const calcdaysPassed = (date1, date2) =>
//   Math.abs(date2 - date1) / (1000 * 24 * 60 * 60);

// console.log(calcdaysPassed(new Date(2022, 3, 14), new Date(2022, 3, 24)));

// const now = new Date();
// const locale = navigator.language;
// console.log(locale);
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'long',
//   year: 'numeric',
//   weekday: 'long',
// };
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);

// const options = {
//   style: 'currency',
//   unit: 'celsius',
//   currency: 'EUR',
//   // useGrouping: false,
// };
// const num = 3888438438.34;
// console.log(new Intl.NumberFormat('en-US', options).format(num));
// console.log(new Intl.NumberFormat('pa', options).format(num));

// console.log(new Intl.NumberFormat('ur').format(num));

// console.log(new Intl.NumberFormat('de-DE').format(num));

// console.log(new Intl.NumberFormat('ar-SY', options).format(num));
// console.log(new Intl.NumberFormat(navigator.language).format(num));

// const ingredients = ['olives', 'spanich'];
// const pizzaTimer = setTimeout(
//   (...ingredient) => console.log(ingredient),
//   3000,
//   ...ingredients
// );

// console.log('waiting....');

// if (ingredients.includes('spanich')) clearTimeout(pizzaTimer);

// setInterval(function () {
//   const now = new Date();
//   console.log(now);
// }, 1000);
