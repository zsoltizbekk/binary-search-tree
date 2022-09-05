class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = arr;
    this.root = this.buildTree(this.arr);
    this.inorderArray = [];
    this.preorderArray = [];
    this.postorderArray = [];
  }

  buildTree(arr) {
    if (arr.length === 0) return null;
    let mid = Number.parseInt(arr.length / 2);

    let root = new Node(arr[mid]);
    root.left = this.buildTree(arr.slice(0, mid));
    root.right = this.buildTree(arr.slice(mid + 1));

    return root;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, node = this.root) {
    if (value === node.data) {
      console.log("this value is already exist in the tree");
      return false;
    }
    if (value < node.data) {
      if (node.left === null) {
        node.left = new Node(value);
        return;
      }
      this.insert(value, node.left);
    } else {
      if (node.right === null) {
        node.right = new Node(value);
        return;
      }
      this.insert(value, node.right);
    }
  }

  delete(value, node = this.root, previousNode = null) {
    //if we found the correct element
    if (value === node.data) {
      //if it is a leaf element
      if (node.left === null && node.right === null) {
        //the element is the parent element's left child
        if (value < previousNode.data) {
          previousNode.left = null;
          return;
        }
        //the element is the parent element's right child
        else {
          previousNode.right = null;
          return;
        }
      }
      //if it has 2 child elemenet
      //find the inorder successor, copy it's data to the node, and then delete the inorder successor
      else if (node.left !== null && node.right !== null) {
        //find successor
        let successor = node.right;
        let previousSuccessor;
        while (successor.left != null) {
          previousSuccessor = successor;
          successor = successor.left;
        }
        //successor containes the successor node
        //node containes the node that should be deleted
        node.data = successor.data;
        //delete the successor node
        previousSuccessor.left = null;
        return;
      }

      //if it only has 1 child element if (node.left === null || node.right === null)
      else {
        if (node.left !== null) {
          node = node.left;
          previousNode.left = node;
          return;
        } else {
          node = node.right;
          previousNode.right = node;
          return;
        }
      }
    }
    //left side
    if (value < node.data) {
      if (node.left === null) {
        console.log("the value does not exist!");
        return;
      }
      this.delete(value, node.left, node);
    }
    //right side
    else if (value > node.data) {
      if (node.right === null) {
        console.log("the value does not exist!");
        return;
      }
      this.delete(value, node.right, node);
    }
  }

  find(value, node = this.root) {
    if (node.right === null && node.left === null && value != node.data) {
      return false;
    }
    if (node.data === value) {
      return node;
    } else {
      if (value < node.data) {
        if (node.left) {
          node = node.left;
          return this.find(value, node);
        }
      } else {
        if (node.right) {
          node = node.right;
          return this.find(value, node);
        }
      }
    }
    return node;
  }

  levelOrder(node = this.root) {
    const arr = [];
    const queue = [];
    if (node == null) return;
    queue.push(node);
    while (queue != 0) {
      if (queue[0].left) queue.push(queue[0].left);
      if (queue[0].right) queue.push(queue[0].right);
      arr.push(queue.shift());
    }
    return arr;
  }
  inorder(node = this.root) {
    if (node === null) return;

    if (node.left != null) {
      this.inorder(node.left);
    }
    if (node.data != undefined) {
      this.inorderArray.push(node.data);
    }
    if (node.right != null) {
      this.inorder(node.right);
    }
    return this.inorderArray;
  }

  preorder(node = this.root) {
    if (node === null) return;
    this.preorderArray.push(node.data);
    if (node.left != null) {
      this.preorder(node.left);
    }
    if (node.right != null) {
      this.preorder(node.right);
    }
    return this.preorderArray;
  }

  postorder(node = this.root) {
    if (node === null) return;
    if (node.left != null) {
      this.postorder(node.left);
    }
    if (node.right != null) {
      this.postorder(node.right);
    }
    if (node.data != undefined) {
      this.postorderArray.push(node.data);
    }
    return this.postorderArray;
  }

  height(value, node) {
    let temp = this.find(value);
    if (temp === false) return false;
    return this.heightRecursive(temp);
  }

  heightRecursive(node) {
    if (node === null) {
      return -1;
    } else {
      let leftheight = this.heightRecursive(node.left);
      let rightheigth = this.heightRecursive(node.right);
      return leftheight > rightheigth ? leftheight + 1 : rightheigth + 1;
    }
  }

  depth(value) {
    let temp = this.find(value);
    if (temp === false) return false;
    return this.depthRecursive(temp);
  }

  depthRecursive(node, root = this.root) {
    let d = -1;
    if (root.data === node.data) {
      return d + 1;
    }
    if (root.left === null && root.right === null) {
      console.log("nnnn");
      d = -1;
      return false; //item does not exist in the tree
    }
    if (node.data < root.data) {
      if (root.left) {
        console.log("-");
        d = this.depthRecursive(node, root.left);
      } else {
        return false;
      }
    }
    if (node.data > root.data) {
      if (root.right) {
        d++;
        console.log("-");

        d = this.depthRecursive(node, root.right);
      } else {
        return false;
      }
    }
    return d + 1;
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return;
    }
    if (
      Math.abs(
        this.heightRecursive(node.left) - this.heightRecursive(node.right)
      ) > 1
    ) {
      return false;
    } else {
      return true;
    }
  }

  rebalance(node = this.root) {
    let temp = this.inorder();
    this.prettyPrint(this.buildTree(temp));
  }
}

module.exports = Tree;
