const {multiHash} = require("../MerkleTree/node_modules/circomlib/src/mimcsponge");

module.exports.block = (x, A)=>{
    return multiHash([x, A]);
};

module.exports.accumulate = (leaves) => {
    // Number of leaves.
    var l = leaves.length;

    // Number of nodes including the leaves.
    var n = l*2-1;

    // Initialize the array.
    var node = new Array(n);


    // Set the leaves of the tree.
    for (var i = l; i < n+1; i++) {
        node[i-1]=leaves[i-l];
    }


    // Loop through all the non-leaf nodes, incuding the root, where the root is i=0.
    for (var i = n-l; i >= 1; i--) {
        node[i-1] = multiHash([node[2*i-1], node[2*i]]);
    }


    // Return the root.
    return node[0];
}

module.exports.calculateTree = (leaves) => {
    // Number of leaves
    var l = leaves.length;

    // Number of nodes including the leaves.
    var n = l*2-1;

    // Initialize the array.
    var node = new Array(n);


    // Set the leaves of the tree.
    for (var i = l; i < n+1; i++) {
        node[i-1]=leaves[i-l];
    }


    // Loop through all the non-leaf nodes, incuding the root, where the root is i=0.
    for (var i = n-l; i >= 1; i--) {
        node[i-1] = multiHash([node[2*i-1], node[2*i]]);
    }


    // Return the root.
    return node;
}

module.exports.issueCredential = (merkleRoot, x, A)=>{
    return multiHash([merkleRoot, x, A]);
};

module.exports.challenge = (name) => {
    return multiHash([name]);
}

module.exports.response = (x, challenge) => {
    return multiHash([x, challenge]);
}

module.exports.calculateWitness = (leaves,j) => {
    // Number of leaves.
	var l = leaves.length;

	// Length of Merkle path.
	var k = Math.log2(l);

	var witness = new Array(Math.log2(l)+1);


	// Choose the (j+1)th leaf and its sibling leaf.
	if (j % 2 == 0) {
		witness[0] = leaves[j];
		witness[1] = leaves[j+1];
	} else {
		witness[0] = leaves[j];
		witness[1] = leaves[j-1];
	}
	// Position of Aj in the Merkle tree.
	j += l;

	// Position of its parent node.
	j = Math.floor(j/2);


	// Calculate the Merkle tree.
	var node = new Array(l);
    node = module.exports.calculateTree(leaves);


	// Calculate the witness.
	for (var i = 1; i < k ; i++) {
		if (j % 2 == 0) {
			witness[i+1] = node[j];
		} else {
			witness[i+1] = node[j-2];
		}
		j = Math.floor(j/2);
	}


	return witness;
}


module.exports.calculateRoot = (witness,j) => {
    // Length of Merkle path.
    var k = witness.length;

    // Number of leaves.
    var l = 2**k;

    // Number of nodes including leaves
    var n = l*2-1;

    // Position of the leaf on the Merkle tree. For example, j=23 is the 8th leaf but A7.
    j += l;
    

    // Calculate the first hash value.
    if(j%2 == 0) {
        merkleRoot = multiHash([witness[0], witness[1]]);
    } else {
        merkleRoot = multiHash([witness[1], witness[0]]);
    }

    // Position of its parent node.
    j = Math.floor(j/2);

    // Calculate the Merkle root.
    for ( var i = 1; i < k - 1; i++) {
        if (j%2 == 0) {
            merkleRoot = multiHash([merkleRoot, witness[i+1]]);
        } else {
            merkleRoot = multiHash([witness[i+1],merkleRoot]);
        }
        j = Math.floor(j / 2);
    }

    return merkleRoot;
}
