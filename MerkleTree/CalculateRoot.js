/*
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

const { multiHash} = require("circomlib/src/mimcsponge");

var witness = [
    13281023939982560411348601652777847345973472192043949548370725934383906399361n,
    6594576977337024810605280205881676376455522480400910569161130375729796322297n,
    13213783183224413871956764979228054759903185879894278755854673644113538051322n,
    18908763309819367401481761083003126361789371417082160570181213784639531758211n,
    1139008293126416180868430189452015762800554327691895809264264518487384280658n
];

// Index of the attendee. For example, j=7 is the 7th attendee and 8th leaf.
var j = 7;

var root = calculateRoot(witness, j);
console.log(root);





function calculateRoot(witness,j) {
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
        root = multiHash([witness[0], witness[1]]);
    } else {
        root = multiHash([witness[1], witness[0]]);
    }

    // Position of its parent node.
    j = Math.floor(j/2);


    // Calculate the Merkle root.
    for ( var i = 1; i < k - 1; i++) {
        if (j%2 == 0) {
            root = multiHash([root, witness[i+1]]);
        } else {
            root = multiHash([witness[i+1],root]);
        }
        j = Math.floor(j / 2);
    }

    return root;
}
