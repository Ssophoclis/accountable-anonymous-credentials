# Accountable Anonymous Credential System

This folder contains the circuits used in the accountable anonymous credential system, with a trusted setup. Each attendee generates a secret value x<sub>j</sub> and creates the next block A<sub>j</sub>=h(x<sub>j</sub>, A<sub>j-1</sub>) in the chain, given the previous block A<sub>j-1</sub> from the previous attendee, for a hash function h. Furthermore, each attendee generates a zkSNARK proof &#960;<sub>j</sub> which is used to verify this computation. The first attendee receives the block A<sub>0</sub>, called the genesis block, where A<sub>0</sub>=h(0,0). After the party has ended, a Merkle tree is generated and two sets are published, namely, the set containing all the A<sub>j</sub> and the set containing the proofs &#960;<sub>j</sub>, for j in {0,...,m} and m attendees.  Each attendee generates his/her own credential PoP<sub>token</sub>= h(root,x<sub>j</sub>,A<sub>j</sub>) where root is the merkle root of all the A<sub>j</sub>. Lastly, another proof is generateed which proves that the credential was created by attending a pseudonym party. The circuits in this folder use older versions of [Snarkjs](https://github.com/iden3/snarkjs) that have a trusted setup. This is intended so that the process is simplified to show how the anonymous credential system works, without having to performe a multi-party ceremony. That being said, it is worth to note that the setup phase, proof generation and verification are much slower than newer versions. More specifically, it takes a few minutes for the setup phase and proof generation.

![](https://user-images.githubusercontent.com/42410324/92112166-4b02f480-ede5-11ea-9078-846b79cbe16d.png)

## Setup

Firstly, install all the dependancies. In the current folder:
```
npm install
```

## Genesis

All the files generated will go into the Genesis folder. To compile the ```block.circom``` circuit, in the current folder:
```
npm run circom_genesis_compile
```

To perform the zkSNARK setup, in the current folder:
```
npm run snark_genesis_setup
```

To create the witness, in the current folder:
```
npm run snark_genesis_witness
```

To create the proof, in the current folder:
```
npm run snark_genesis_prove
```

To verify the proof, in the current folder:
```
npm run snark_genesis_verify
```

Note that the proof of the genesis block uses the same circuit as any other intermediate block.

## Block

All the files generated will go into the Block folder. To compile the ```block.circom``` circuit. In the current folder:
```
npm run circom_block_compile
```

To perform the zkSNARK setup, in the current folder:
```
npm run snark_block_setup
```

To create the witness, in the current folder:
```
npm run snark_block_witness
```

To create the proof, in the current folder:
```
npm run snark_block_prove
```

To verify the proof, in the current folder:
```
npm run snark_block_verify
```

## Valid

All the files generated will go into the Valid folder. To compile the ```valid.circom``` circuit, in the current folder:
```
npm run circom_valid_compile
```

To perform the zkSNARK setup, in the current folder:
```
npm run snark_valid_setup
```

To create the witness, in the current folder:
```
npm run snark_valid_witness
```

To create the proof, in the current folder:
```
npm run snark_valid_prove
```

To verify the proof, in the current folder:
```
npm run snark_valid_verify
```
