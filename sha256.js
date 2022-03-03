
let myString = "";
  //Constants K
const k = ["0x428a2f98", "0x71374491", "0xb5c0fbcf", "0xe9b5dba5", "0x3956c25b", "0x59f111f1", "0x923f82a4", "0xab1c5ed5",
  "0xd807aa98", "0x12835b01", "0x243185be", "0x550c7dc3", "0x72be5d74", "0x80deb1fe", "0x9bdc06a7", "0xc19bf174",
  "0xe49b69c1", "0xefbe4786", "0x0fc19dc6", "0x240ca1cc", "0x2de92c6f", "0x4a7484aa", "0x5cb0a9dc", "0x76f988da",
  "0x983e5152", "0xa831c66d", "0xb00327c8", "0xbf597fc7", "0xc6e00bf3", "0xd5a79147", "0x06ca6351", "0x14292967",
  "0x27b70a85", "0x2e1b2138", "0x4d2c6dfc", "0x53380d13", "0x650a7354", "0x766a0abb", "0x81c2c92e", "0x92722c85",
  "0xa2bfe8a1", "0xa81a664b", "0xc24b8b70", "0xc76c51a3", "0xd192e819", "0xd6990624", "0xf40e3585", "0x106aa070",
  "0x19a4c116", "0x1e376c08", "0x2748774c", "0x34b0bcb5", "0x391c0cb3", "0x4ed8aa4a", "0x5b9cca4f", "0x682e6ff3",
  "0x748f82ee", "0x78a5636f", "0x84c87814", "0x8cc70208", "0x90befffa", "0xa4506ceb", "0xbef9a3f7", "0xc67178f2"
]

function getHash(msgblock) {
  //Constants H
  const H = ["0x6a09e667", "0xbb67ae85", "0x3c6ef372", "0xa54ff53a",
             "0x510e527f", "0x9b05688c", "0x1f83d9ab", "0x5be0cd19"];
  for (let msg of msgblock) {

    let W = [64];
    let current;
  
    for (current = 0; current < 16; current++) {
      W[current] = msg.slice(current * 32, (current + 1) * 32);
    }

    for (let i = 16; i < 64; i++) {
      let s0 = xor(rightRotate("" + W[i - 15], 7), rightRotate("" + W[i - 15], 18), rightShift("" + W[i - 15], 3));
      let s1 = xor(rightRotate("" + W[i - 2], 17), rightRotate("" + W[i - 2], 19), rightShift("" + W[i - 2], 10));
      // addition 
      W[i] = (((parseInt(W[i - 16], 2) + parseInt(s0, 2) + parseInt(W[i - 7], 2) + parseInt(s1, 2)) % Math.pow(2, 32)).toString(2)).padStart(32, "0");
    }

    let a = hex2bin(H[0]), b = hex2bin(H[1]), c = hex2bin(H[2]), d = hex2bin(H[3]),
        e = hex2bin(H[4]), f = hex2bin(H[5]), g = hex2bin(H[6]), h = hex2bin(H[7]);

    for (let i = 0; i < 64; i++) {

      const T1 = (parseInt(h, 2) + parseInt(sigma1(e), 2) + Ch(e, f, g) + parseInt(k[i], 16) + parseInt(W[i], 2)) % Math.pow(2, 32);
      const T2 = (parseInt(sigma0(a), 2) + Maj(a, b, c)) % Math.pow(2, 32);
      h = g;
      g = f;
      f = e;
      e = (((parseInt(d, 2) + T1) % Math.pow(2, 32)).toString(2)).padStart(32, "0");
      d = c;
      c = b;
      b = a;
      a = (((T1 + T2) % Math.pow(2, 32)).toString(2)).padStart(32, "0");

    }
    H[0] = modifyAdd(H[0], a);
    H[1] = modifyAdd(H[1], b);
    H[2] = modifyAdd(H[2], c);
    H[3] = modifyAdd(H[3], d);
    H[4] = modifyAdd(H[4], e);
    H[5] = modifyAdd(H[5], f);
    H[6] = modifyAdd(H[6], g);
    H[7] = modifyAdd(H[7], h);

  }
 
  return (hexToHash(H)).padStart(64,"0");
  

}
//FUNCTIONS 


function hexToHash(H) {
  let res = "";
  for (let i = 0; i < H.length; i++) {
    res += H[i];
  }
  return res;
}
//hexa to binary
function hex2bin(hex) {

  return (parseInt(hex, 16).toString(2)).padStart(32, "0");
}
function sigma0(x) {

  return xor(rightRotate(x, 2), rightRotate(x, 13), rightRotate(x, 22));
}
function sigma1(x) {

  return xor(rightRotate(x, 6), rightRotate(x, 11), rightRotate(x, 25));
}
function Ch(x, y, z) {
  x = parseInt(x, 2);
  y = parseInt(y, 2);
  z = parseInt(z, 2);
  return (x & y) ^ (~x & z);
}
function Maj(x, y, z) {
  x = "0b" + x;
  y = "0b" + y;
  z = "0b" + z;
  var add = ((((x & y) ^ (x & z) ^ (y & z)) >>> 0).toString(2)).padStart(32,"0");
  return parseInt(add, 2);
}
function rightShift(n, d) {
  n="0b"+n;
  return (((n>>>d)>>>0).toString(2));
}
function rightRotate(s, r) {
 s="0b"+s;
 return (((s>>> r) | (s << (32 - r))) >>> 0).toString(2);
 
}
//XOR 
function xor(a, b, c) {
   a="0b"+a;
   b="0b"+b;
   c="0b"+c;
  return (((a^b^c)>>>0).toString(2)).padStart(32,"0");
  
}
function modifyAdd(l, m) {
  return ((parseInt(l, 16) + parseInt(m, 2)) % Math.pow(2, 32)).toString(16);
}
function strToBinary(str) {
  var bin = '';
  for (let i = 0; i < str.length; i++) {
   let num = str.charCodeAt(i);
    bin += ("00000000" + num.toString(2)).substr(-8);
  }
  var len = (bin.length).toString(2);
  bin += '1';
  var temp = bin;
  if (round(bin.length) - bin.length < 64) {
    for (let i = 0; i < round(temp.length) - temp.length + 512; i++) {
      bin += '0';
    }
  }
  else {
    for (let i = 0; i < round(temp.length) - temp.length; i++) {
      bin += '0';
    }
  }
  bin = bin.slice(0, len.length * -1) + len;
  return bin;
}
function getMsgBlocks(str) {
  var block = '';
  var messageBlocks = [];
  let i = 0;
  while (i < str.length) {
    block = str.slice(i, i + 512);
    messageBlocks.push(block);
    i += 512;
  }
  return messageBlocks;
}
function round(x) {
  return Math.ceil(x / 512) * 512;
}


// Main Part

function GenerateHash(data) {
 // myString = document.getElementById("str").value;
 return  getHash(getMsgBlocks(strToBinary(data)));
}
export {GenerateHash};
