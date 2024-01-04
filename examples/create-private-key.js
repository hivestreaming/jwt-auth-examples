const { generateKeyPair } = require('crypto');
const { writeFileSync } = require('fs');

const pathToPrivateKey = './path/private-key.pem';

generateKeyPair('rsa', {
    modulusLength: 3072
}, (err, publicKey, privateKey) => {
    if(!err) {
        console.log("Public Key is : ", publicKey); 
        console.log("Private Key is: ", privateKey); 
        writeFileSync(pathToPrivateKey, privateKey.export({
            format: 'pem',
            type: 'pkcs8'
        }));
    }
});