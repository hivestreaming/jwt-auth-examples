require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

/*
  This script creates a signed JWT with payload contains a manifest.
*/

const privateKeyPath = process.env.PRIVATE_KEY_PATH || './private-key.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const partnerId = process.env.HIVE_PARTNER_ID || '<partnerId>';
const customerId = process.env.HIVE_CUSTOMER_ID || '<customerId>';
const keyId = process.env.HIVE_PARTNER_KEY_ID || '<keyId>';
const videoId = process.env.VIDEO_ID || '<videoId>';
const eventName = process.env.EVENT_NAME || '<eventName>';
const manifests = ['https://streaming-simulator-prod.hivestreaming.com/generic/live/beta-big-bunny-multi/manifest.m3u8'];
const expiry = parseInt(process.env.JWT_EXPIRY) ||  Math.floor(Date.now() / 1000) + 60 * 60 * 24 // in 24 hours (in seconds since Unix epoch)

const payload = {
    iss: partnerId,
    sub: videoId,
    ver: '1.0',
    aud: 'https://hivestreaming.com',
    cid: customerId,
    evn: eventName,
    man: manifests,
    reg: [],
    exp: expiry
};

console.log(`JWT payload: ${JSON.stringify(payload, null, 2)}`);

const jwt = jsonwebtoken.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid: keyId
});

console.log(`JWT string: ${jwt}`);
