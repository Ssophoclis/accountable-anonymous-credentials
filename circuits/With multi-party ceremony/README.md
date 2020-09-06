# Accountable Anonymous Credential System

This folder contains the circuits used in the accountable anonymous credential system, with a multi-party ceremony called [Perpetual Powers of Tau](https://medium.com/coinmonks/announcing-the-perpetual-powers-of-tau-ceremony-to-benefit-all-zk-snark-projects-c3da86af8377). Each attendee generates a secret value x<sub>j</sub> and creates the next block A<sub>j</sub> in the chain by obtaining the previous block A<sub>j-1</sub> from the previous attendee and performing A<sub>j</sub>=h(x<sub>j</sub>, A<sub>j-1</sub>), for a hash function h. Furthermore, each attendee generates a zkSNARK proof  &#960;<sub>j</sub> which is used to verify this computation. The first attendee receives the block A<sub>0</sub>, called the genesis block, where A<sub>0</sub>=h(0,0). After the party has ended, a merkle tree accumulator is generated where the leaves contain the A<sub>j</sub> and two sets are published, namely, the set containing all the A<sub>j</sub> and the set containing the proofs &#960;<sub>j</sub>, for j in {0,...,n} and n attendees. Each attendee generates his/her own PoP token, where PoP<sub>token</sub>= h(root,x<sub>j</sub>,A<sub>j</sub>) where root is the merkle root of all the A<sub>j</sub>. A tutorial with more explanations for the following steps can be found at [Snarkjs](https://github.com/Ssophoclis/snarkjs).

![](https://user-images.githubusercontent.com/42410324/92112166-4b02f480-ede5-11ea-9078-846b79cbe16d.png)

## Setup

Firstly, install all the dependencies. In the current folder:
```
npm install
```

## Ceremony


### Phase 1

This step performs the phase 1 ceremony of Perpetual Powers of Tau which never ends. To start the ceremony, in the Ceremony folder:
```
../node_modules/.bin/snarkjs powersoftau new bn128 16 pot16_0000.ptau -v
```
Then, the first participant can add a contribution by generating a round with the following command:
```
../node_modules/.bin/snarkjs powersoftau contribute pot16_0000.ptau pot16_0001.ptau --name="First contribution" -v
```
Then, the participant has to enter some random string. To add more rounds, participants perform the above step while incrementing the name of the ```.ptau``` file. The name of the files can by arbitrary but for simplicity we can set them to be the number of the latest round.


To start the circuit specific phase 2 ceremony, the organisers of the pseudonym party take the latest round, add a random beacon and finilize phase 1 with the following commands:
```
../node_modules/.bin/snarkjs powersoftau beacon pot16_0003.ptau pot16_beacon.ptau 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon"
```
For the above command, replace the 3 in pot16_0003.ptau with the latest round. For example, if 10 participants created a round each, the file will be named pot16_0010.ptau. 
```
../node_modules/.bin/snarkjs powersoftau prepare phase2 pot16_beacon.ptau pot16_final.ptau -v
```
Note that the above command will take around 15 minutes depending on the device.



To verify all the above computations, the following command can be performed by anyone.
```
../node_modules/.bin/snarkjs powersoftau verify pot16_final.ptau
```


### Phase 2 
The phase 2 ceremony for the ```block.circom``` circuit is performed before the pseudonym party, while the phase 2 ceremony of the ```valid.circom``` circuit is performed after the party.

To perform the phase 2 ceremony for the ```block.circom``` circuit, the organisers run the following commands in the Ceremony folder:
Firstly, compile the circuit:
```
../node_modules/.bin/circom block.circom --r1cs --wasm --sym -v
```
Then, using the final file from phase 1, initialize phase 2:
```
../node_modules/.bin/snarkjs zkey new block.r1cs pot16_final.ptau block_0000.zkey
```
To contribute randomness, the participants of the second phase take part in a similar process to that of phase 1. More specifically, the first participant generates the first round with the following command:
```
../node_modules/.bin/snarkjs zkey contribute block_0000.zkey block_0001.zkey --name="First Contributor Name" -v
```
The above step is repeated once for each participant and the ```zkey``` file is incremented accordingly. Suppose 3 participants generate a round. The organisers finish the second phase of the ceremony by applying another random beacon:
```
../node_modules/.bin/snarkjs zkey beacon block_0003.zkey block_final.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"
```

To verify the validity of the entire process, anyone can run the following command:
```
../node_modules/.bin/snarkjs zkey verify block.r1cs pot16_final.ptau block_final.zkey
```

Finally, to export the verification key:
```
../node_modules/.bin/snarkjs zkey export verificationkey block_final.zkey verification_key.json

```
Copy the ```block_final.zkey``` and ```verification_key.json``` files to the Genesis and Block folders.



After the pseudonym party, the above steps are performed again for the ```valid.circom``` circuit. To do so, repeat the above steps by replacing ```block``` with ```valid```. For example, to compile the circuit,
```
../node_modules/.bin/circom valid.circom --r1cs --wasm --sym -v
```
and so on. Lastly, copy the ```valid_final.zkey``` file and the new ```verification_key.json```  file to the Valid folder. Note that the verificaiton key has the same name for both circuits. Thus, when ```verification_key.json``` is created for relation R<sub>block</sub> and is copied to both Genesis and Block folders, delete it from the Ceremony folder to create the new verificaiton key for relation R<sub>valid</sub>.


## Genesis and Block
In the Genesis and Block folders, we create the proofs with relation R<sub>block</sub> for the genesis block and the intermediate blocks A<sub>j</sub> using the ```block.circom``` circuit. To compile the circuit, either run the following command in both folders:

```
../node_modules/.bin/circom block.circom --r1cs --wasm --sym -v
```
Or copy the ```block.r1cs```, ```block.sym``` and ```block.wasm``` files from the Ceremony folder to the Genesis and Block folders. After this step, the folders should have the following files:
```block.circom```, ```block.r1cs```, ```block.sym```, ```block.wasm```,  ```block_final.zkey```, ```inputGenesis.json``` / ```inputBlock.json``` and ```verification_key.json```.

### Genesis proof
To create the proof for the genesis block, in the Genesis folder:
```
../node_modules/.bin/snarkjs groth16 fullprove inputGenesis.json block.wasm block_final.zkey proofGenesis.json publicGenesis.json
```

To verify the proof, in the Genesis folder:
```
../node_modules/.bin/snarkjs groth16 verify verification_key.json publicGenesis.json proofGenesis.json
```

### Block proof
To create the proof for an intermediate block, in the Block folder:
```
../node_modules/.bin/snarkjs groth16 fullprove inputBlock.json block.wasm block_final.zkey proofBlock.json publicBlock.json
```

To verify the proof, in the Block folder:
```
../node_modules/.bin/snarkjs groth16 verify verification_key.json publicBlock.json proofBlock.json
```


## Valid
In the valid folder, we create the proofs with relation R<sub>valid</sub> for the validity of the credential using the ```valid.circom``` circuit. Similarly, after copying the  ```valid.r1cs```, ```valid.sym``` and ```valid.wasm``` files, the Valid folder should have the following files: 
```valid.circom```, ```valid.r1cs```, ```valid.sym```, ```valid.wasm```,  ```valid_final.zkey```, ```inputValid.json``` and ```verification_key.json```.

To create the proof for a credential, in the Valid folder:
```
../node_modules/.bin/snarkjs groth16 fullprove inputValid.json valid.wasm valid_final.zkey proofValid.json publicValid.json
```

To verify the proof, in the Valid folder:
```
../node_modules/.bin/snarkjs groth16 verify verification_key.json publicValid.json proofValid.json
```
