require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');

const partnerId = process.env.HIVE_PARTNER_ID || '<partnerId>';
const partnerToken = process.env.HIVE_PARTNER_TOKEN || '<partnerToken>';
const keyId = process.env.HIVE_PARTNER_KEY_ID || '<keyId>'; // recommended format: "<name>-<number>"
const privateKeyPath = process.env.RSA_PRIVATE_KEY_PATH || './private-key.pem';
const hiveEnvironment = process.env.HIVE_API_ENV || 'test'; // available environments: 'test' or 'prod'

/*
  This script reads the private RSA key from the file system and posts
  the public key details to the Hive public key storage.
*/

(async function () {
    const privateKeyObject = crypto.createPrivateKey(fs.readFileSync(privateKeyPath, 'utf8'));

    const { n: modulus, e: exponent } = privateKeyObject.export({
        format: 'jwk'
    });

    const requestBody = {
        partnerId,
        expiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // in 30 days (in seconds since Unix epoch)
        keyId,
        modulus,
        exponent
    };

    const url = `https://api${hiveEnvironment === 'prod' ? '' : '-test'}.hivestreaming.com/v1/publickey`;

    const request = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Hive-Partner-Token': partnerToken
        },
        body: JSON.stringify(requestBody)
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch(url, request);
        if (response.ok) {
            console.log('Publishing successful');
        } else {
            console.log('Publishing failed, response status:', response.status);
            const responseBody = await response.json();
            console.log('Response body', responseBody);
        }
    } catch (err) {
        console.log('Error:', err);
    }
})();
