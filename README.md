# Accountable Anonymous Credentials

We implement an accountable anonymous credential system which is an alternative implementation of the [Proof-of-Personhood](https://ieeexplore.ieee.org/document/7966966) mechanism using [cryptographic accumulators](https://link.springer.com/chapter/10.1007/3-540-69053-0_33) and [zkSNARKs](https://eprint.iacr.org/2016/260.pdf).

## Cryptographic accumulators

The ```MerkleTree``` folder contains an implementation of the Merkle tree accumulator in JavaScript.

## zkSNARKs

The ```circuit``` folder contains the arithmetic circuits used to generate the zero-knowledge arguments used in our credential system.

## Generating credentials

For generating the credentials, an example is provided in the ````test```` folder whose values are the same as in the arithemtic circuits. Before running this JavaScript file, firstly install the dependancies in the ```MerkleTree``` folder. In other words, in the ```MerkleTree``` folder:
```
npm install
```
