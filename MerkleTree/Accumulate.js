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

//Leaves of the Merkle tree.
leaves = [
    20636625426020718969131298365984859231982649550971729229988535915544421356929n, //A0
    19692351381509008526674869164028204674581562778678059238007466345850648512859n, //A1
    3260317181256834846140115039123589072259884931802311535649272369690470859820n,  //A2
    12559855626748052907876877964709605782913587798297964389509937561042131488444n, //A3
    9293363803876686890705584793074152013070937946762690785125371091818451325249n,  //A4
    18986613911141877111059303650428624479276914537821274094557926354566801070694n, //A5
    6594576977337024810605280205881676376455522480400910569161130375729796322297n,  //A6
    13281023939982560411348601652777847345973472192043949548370725934383906399361n, //A7
    7455278944954866418836366694791383055917545224687928003145285008456395087672n,  //A8
    1213856726369934280347171009173534548427863030671371843792820420333011250756n,  //A9
    2380547835869466608358205008815195360499221128399310971635383412564068579244n,  //A10
    8299559464105167209482322694522697329548520636870909653503467836670813977401n,  //A11
    16819457404953781318509876520657929952860175851320045696106603468343197921610n, //A12
    20636625426020718969131298365984859231982649550971729229988535915544421356929n, //A0
    20636625426020718969131298365984859231982649550971729229988535915544421356929n, //A0
    20636625426020718969131298365984859231982649550971729229988535915544421356929n  //A0
];

// Merkle root.
var root = accumulate(leaves);
console.log(root)





function accumulate(leaves) {
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
