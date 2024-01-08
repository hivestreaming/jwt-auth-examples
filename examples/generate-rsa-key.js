require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');

/*
  This script generates a new RSA key pair and saves the key to the file system.
*/

const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
  modulusLength: 3072,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
  },
});

// Save the key details to a file
fs.writeFileSync('./private-key.pem', privateKey);
fs.writeFileSync('./public-key.pem', publicKey);

// Extract public key details
const publicKeyDetails = crypto.createPublicKey(publicKey);
const jwk = publicKeyDetails.export({ format: 'jwk' });

console.log(`Public key details: `, { modulus: jwk.n, exponent: jwk.e });

