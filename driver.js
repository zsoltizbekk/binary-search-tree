const Tree = require("./bst");

function randomNumbersToArray(value) {
  let temp = [];
  for (let i = 0; i < value; i++) {
    temp.push(Math.floor(Math.random() * 10000 + 1));
  }
  return temp;
}
//Create a binary search tree from an array of random numbers. You can create a function if you want that returns an array of random numbers each time you call it.
let arr = randomNumbersToArray(20);

//sorting array
arr.sort((a, b) => a - b);
//remove duplicates from arr
let newArray = arr.filter((c, index) => arr.indexOf(c) === index);
const newBst = new Tree(newArray);
newBst.prettyPrint();
//Confirm that the tree is balanced by calling isBalanced
newBst.isBalanced() ? console.log("balanced") : console.log("unbalanced");
//Print out all elements in level, pre, post, and in order
console.log("inorder: " + newBst.inorder());
console.log("pre-order: " + newBst.preorder());
console.log("postorder: " + newBst.postorder());
//Unbalance the tree by adding several numbers > 100
for (let i = 0; i < 150; i++) {
  newBst.insert(Math.floor(Math.random() * 10000 + 1));
}
newBst.prettyPrint();
newBst.isBalanced() ? console.log("balanced") : console.log("unbalanced");
newBst.isBalanced() ? console.log("Already balanced!") : newBst.rebalance();
newBst.prettyPrint();

//Print out all elements in level, pre, post, and in order
console.log("inorder: " + newBst.inorder());
console.log("pre-order: " + newBst.preorder());
console.log("postorder: " + newBst.postorder());
