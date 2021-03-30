// Assignment 1
const inventors = [
  "Albert Einstein",
  "Issac Newton",
  "Galileo Galilei",
  "Marie Curie",
  "Johannes Kepler",
  "Nicolaus Copernicus",
  "Max Planck",
  "Katherine Blodgett",
  "Ada Lovelace",
  "Sarah E. Goode",
  "Lise Meitner",
  "Hanna Hammarstrom",
];
const a1Filter = inventors.filter((item) => item.charAt(0) == "A");
// console.log(a1Filter);

const a2SortP1 = inventors.sort();
// console.log(a2SortP1);
let a2SortP2 = inventors.sort((a, b) => a.length - b.length);
// console.log(a2SortP2);

const a2MapP1 = inventors.map((item) => item.length);
// console.log(a2MapP1);
const a2MapP2 = inventors.map((item) => item.toUpperCase());
// console.log(a2MapP2);

const a2ReduceP1 = inventors.reduce(
  (splitedName, current) => splitedName + " " + current.split(" ")[0],
  ""
);
// console.log(a2ReduceP1);
const a2ReduceP2 = inventors.reduce(
  (totalChar, current) => totalChar + current.length,
  0
);
// console.log(a2ReduceP2);

// Assignment 2
let startAmount = 1000;
let transactions = [
  { currency: "USD", amount: 12, type: "withdrawal" },
  { currency: "USD", amount: 104, type: "withdrawal" },
  { currency: "USD", amount: 150, type: "deposit" },
  { currency: "USD", amount: 150, type: "deposit" },
  { currency: "USD", amount: 250, type: "withdrawal" },
  { currency: "USD", amount: 500, type: "deposit" },
  { currency: "USD", amount: 447, type: "withdrawal" },
  { currency: "USD", amount: 120, type: "deposit" },
  { currency: "USD", amount: 58, type: "withdrawal" },
  { currency: "USD", amount: 90, type: "withdrawal" },
];
const usdToVND = 23000;

// Uses forEach() to print out the transaction history
let balance = startAmount;
transactions.forEach((el) => {
  // console.log(`Balance: ${balance}`);
  if (el.type == "withdrawal") {
    balance -= el.amount;
    // console.log("Transaction History:");
    // console.log(` - You withdrew ${el.amount}. The new Balance is ${balance}`);
  } else {
    balance += el.amount;
    // console.log("Transaction History:");
    // console.log(` - You deposited ${el.amount}. The new Balance is ${balance}`);
  }
});
//Uses reduce() to calculate the balance in the end.
function endBalance() {
  let result = transactions.reduce((total, current) => {
    if (current.type == "withdrawal") {
      total -= current.amount;
    } else {
      total += current.amount;
    }
    return total;
  }, startAmount);
  return result;
}
// console.log(endBalance());
// Uses filter() and reduce() to calculate two numbers: the sum of withdrawal transactions (expense), and deposit transactions (income).

let withdrawals = transactions.filter((item) => item.type == "withdrawal");
// console.log(withdrawals);
let deposits = transactions.filter((item) => item.type == "deposit");
function a2P2() {
  let sumWithdrawal = withdrawals.reduce(
    (sum, current) => sum + current.amount,
    0
  );
  let sumDeposit = deposits.reduce((sum, current) => sum + current.amount, 0);
  return { sumWithdrawal: sumWithdrawal, sumDeposit: sumDeposit };
}
// console.log(a2P2());

// Uses map() to get a new array of transaction in VND
function changeToVND() {
  transactions.map((item) => {
    item.amount *= usdToVND;
    item.currency = "VND";
  });
  return transactions;
}
// console.log(changeToVND());

// Returns an new list of transactions that sorted by type
function sortWithType() {
  transactions.sort((a, b) => a.type.localeCompare(b.type));
  return transactions;
}
// console.log(sortWithType());

// Returns an new list of withdrawal transactions that sorted by amount
function sortWithdrawalWithAmount() {
  withdrawals.sort((a, b) => a.amount - b.amount);
  return withdrawals;
}
// console.log(sortWithdrawalWithAmount());

// Returns an new list of deposit transactions that sorted by amount

function sortDepositsWithAmount() {
  deposits.sort((a, b) => a.amount - b.amount);
  return deposits;
}
// console.log(sortDepositsWithAmount());

// Assignment 3

let shoppingCart = [
  { id: "A31", item: "T-shirt", price: 9.9, quantity: 5 },
  { id: "A32", item: "Jacket", price: 99.9, quantity: 1 },
  { id: "A33", item: "Skirt", price: 19.9, quantity: 2 },
  { id: "A34", item: "Ankle Pant", price: 39.9, quantity: 3 },
  { id: "A35", item: "Polo shirt", price: 14.9, quantity: 3 },
  { id: "A36", item: "Chino Short", price: 29.9, quantity: 2 },
  { id: "A37", item: "Easy Short", price: 19.9, quantity: 2 },
];
// Write a function that returns an array of prices for each product in the cart (item price * quantity).
function priceForEachProduct() {
  let prices = shoppingCart.map((item) => item.price * item.quantity);
  return prices;
}
// console.log(priceForEachProduct());
// Write a function that returns the total price.
function totalPrices() {
  return priceForEachProduct().reduce((sum, current) => sum + current);
}
// console.log(totalPrices());

// Write a function called removeItemsFromCart(productId, quantity) that will remove the quantity number of item with the productId in the cart and return the result in a new array. If the quantity after removing is 0, remove the product out of the cart.
function reduceQuantityItemsFromCart(productId, quantity) {
  let selectedItems = shoppingCart.filter((item) => item.id == productId);
  selectedItems.forEach((item, itemIndex) => {
    if (item.quantity - quantity <= 0) {
      let selectedItemId = item.id;
      shoppingCart.forEach((item, itemIndex) => {
        if (item.id == selectedItemId) {
          shoppingCart.splice(itemIndex, 1);
        }
      });
      selectedItems.splice(itemIndex, 1);
    } else {
      item.quantity -= quantity;
    }
  });
  return shoppingCart;
}
// console.log(reduceQuantityItemsFromCart("A32", 2));

// Write a function called addItemToCart(product, quantity) that will add new products into the cart if there is no product like this, or increase the quantity if the cart already contains that kind of product. The result will be returned in a new array.

function addProductToCart(product, quantity) {
  let selectedItems = shoppingCart.filter((item) => item.item == product);
  let NumIdArray = shoppingCart.map((item) => item.id.slice(1, 3));
  let highestNumId = parseInt(NumIdArray[NumIdArray.length - 1]);
  if (selectedItems[0] == undefined) {
    shoppingCart.push({
      id: `A${highestNumId + 1}`,
      item: product,
      price: 0,
      quantity: quantity,
    });
    console.log("working");
  } else {
    selectedItems.forEach((item) => {
      let selectedItemId = item.id;
      shoppingCart.forEach((item) => {
        if (item.id == selectedItemId) {
          item.quantity += quantity;
        }
      });
    });
  }
  return shoppingCart;
}
console.log(addProductToCart("Jacket", 3));
