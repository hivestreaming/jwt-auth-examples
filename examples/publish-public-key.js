const crypto = require('crypto');
const fs = require('fs');
 
const partnerId = '<partnerId>';
const partnerToken = '<partnerToken>'
const keyId = '<keyId>'; // recommended format: "<name>-<number>"
const privateKeyPath = './path/private-key.pem';
const endpoint = 'test'; // available endpoints 'test' or 'prod'
 
/*
  This script reads the private key from the file system and posts 
  the public key to Hive public key storage.
*/
(async function () {

  const privateKeyObject = crypto.createPrivateKey(
    fs.readFileSync(privateKeyPath, 'utf8')
  );
  const { n: modulus, e: exponent } = privateKeyObject.export({
    format: 'jwk',
  });
 
  const requestBody = {
    partnerId,
    expiration: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // date in 30 days, expressed as seconds since Unix epoch
    keyId,
    modulus,
    exponent,
  };
 
  const url = `https://api${
    endpoint === 'prod' ? '' : '-test'
  }.hivestreaming.com/v1/publickey`;
 
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Hive-Partner-Token': partnerToken,
    },
    body: JSON.stringify(requestBody),
  };
 
  try {
    const response = await fetch(url, request);
    if(response.ok) console.log('[publish-key] publishing successfull');
  } catch (err) {
    console.log('[publish-key] error:', err);
  }
})();