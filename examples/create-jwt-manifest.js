require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

/*
  This script creates a signed JWT with payload containing manifest url(s).
*/

/* Partner ID provided by Hive */
const partnerId = process.env.HIVE_PARTNER_ID || '<partnerId>';

/* Customer ID used to generate a customer entity in Hive Services */
const customerId = process.env.HIVE_CUSTOMER_ID || '<customerId>';

/* Unique ID for a public RSA key */
const keyId = process.env.HIVE_PARTNER_KEY_ID || 'test-key-id-123';

/* Unique video ID on the partner platform */
const videoId = process.env.VIDEO_ID || 'video-id-123';

/* Name of the event that will be shown in Hive Portal */
const eventName = process.env.EVENT_NAME || 'Some descriptive name';

/* List of manifest URLs of the video stream (without query parameters) */
const manifests = process.env.MANIFESTS?.split(',')?.map(item => item?.trim()) ||
  ['https://streaming-simulator-prod.hivestreaming.com/generic/live/beta-big-bunny-multi/manifest.m3u8'];

/* Expiry of the JWT (in seconds since Unix epoch) */
const expiry = parseInt(process.env.JWT_EXPIRY) ||  Math.floor(Date.now() / 1000) + 60 * 60 * 24;

/* Path of the private RSA key */
const privateKeyPath = process.env.PRIVATE_KEY_PATH || './private-key.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

const payload = {
    iss: partnerId,
    sub: videoId,
    ver: '1.0',
    aud: 'https://hivestreaming.com',
    cid: customerId,
    evn: eventName,
    man: manifests,
    exp: expiry
};

console.log(`JWT payload: ${JSON.stringify(payload, null, 2)}`);

const jwt = jsonwebtoken.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid: keyId
});

console.log(`JWT string: ${jwt}`);
