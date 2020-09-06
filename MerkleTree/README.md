# Merkle Tree Accumulator

In this folder we include all the algorithms used to create a Merkle tree with a power of 2 number of leaves. To construct the Merkle tree we use the hash function [MiMCSponge](https://github.com/iden3/circomlib/blob/master/src/mimcsponge.js). Firstly, install [circomlib](https://github.com/iden3/circomlib):
``` 
npm install
```

## Accumulator

The ```accumulate``` takes as inputs *l* leaves and calculates the Merkle tree root.


We provide an example where we construct a Merkle tree by accumulating the blocks from the table below. However, since we require a balanced Merkle tree, we add three genesis blocks A<sub>0</sub> at the end.

|       i       |     Block     |      Leaf     |
| ------------- | ------------- | ------------- |
| 0  | A<sub>0</sub> | 20636625426020718969131298365984859231982649550971729229988535915544421356929n|
| 1  | A<sub>1</sub> |  19692351381509008526674869164028204674581562778678059238007466345850648512859n|
| 2  | A<sub>2</sub> | 3260317181256834846140115039123589072259884931802311535649272369690470859820n |
| 3  | A<sub>3</sub> |12559855626748052907876877964709605782913587798297964389509937561042131488444n  |
| 4  | A<sub>4</sub> | 9293363803876686890705584793074152013070937946762690785125371091818451325249n |
| 5  | A<sub>5</sub> | 18986613911141877111059303650428624479276914537821274094557926354566801070694n |
| 6  | A<sub>6</sub> | 6594576977337024810605280205881676376455522480400910569161130375729796322297n|
| 7  | A<sub>7</sub> | 13281023939982560411348601652777847345973472192043949548370725934383906399361n|
| 8  | A<sub>8</sub> | 7455278944954866418836366694791383055917545224687928003145285008456395087672n|
| 9  | A<sub>9</sub> | 1213856726369934280347171009173534548427863030671371843792820420333011250756n|
| 10 | A<sub>10</sub> | 2380547835869466608358205008815195360499221128399310971635383412564068579244n |
| 11 | A<sub>11</sub> | 8299559464105167209482322694522697329548520636870909653503467836670813977401n|
| 12 | A<sub>12</sub> | 16819457404953781318509876520657929952860175851320045696106603468343197921610n|
| 13 | A<sub>0</sub> | 20636625426020718969131298365984859231982649550971729229988535915544421356929n|
| 14 | A<sub>0</sub> | 20636625426020718969131298365984859231982649550971729229988535915544421356929n|
| 15 | A<sub>0</sub> | 20636625426020718969131298365984859231982649550971729229988535915544421356929n|

## CalculateWitness

The ```calculateWitness``` takes as inputs the leaves of the Merkle tree, and the position of the leaf its witness we want to calculate. For example, ```j=7``` is the 8th leaf in the Merkle tree. However, since the first leaf is the genesis block of the credential system, ```j=7``` corresponds to the 7th attendee.

## CalculateRoot

The ```calculateRoot``` takes as input the witness of a leaf accumulated in a Merkle tree and outputs the root. The witness is the leaf plus its Merkle Path that leads to the root. An example is given in which a witness is provided for the 8th leaf of a 16 leaf Merkle tree.
