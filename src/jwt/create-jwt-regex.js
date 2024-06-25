require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');

/*
  This script creates a signed JWT with payload containing regex url matcher(s).
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

/* List of regexes to match the stream manifest URLs. It will be used to create a single context
for all playlists and segments from the same manifest. Should contain a group that specifies the
known dynamic part of the URL. */
const regexes = process.env.REGEXES?.split(',')?.map(item => item?.trim()) || ['streaming-simulator.*(\\/.*\\.ts|\\/.*\\.m3u8|.*\\.mp4)'];

/* List of regexes to match the playlist/segment URL which identifies the same
stream/segment when the URL has different sources. */
const qualityRegexes = process.env.QUALITY_REGEXES?.split(',')?.map(item => item?.trim()) || ['some-quality.*(\\/.*\\.ts)'];

/* Expiry of the JWT (in seconds since Unix epoch) */
const expiry = parseInt(process.env.JWT_EXPIRY) ||  Math.floor(Date.now() / 1000) + 60 * 60 * 24;

/* Path of the private RSA key */
const privateKeyPath = process.env.PRIVATE_KEY_PATH || './private-key.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

/* Issuer in the format `partner://<partnerId>` or Partner domain if using Open ID  */
const issuer = `partner://${partnerId}`;

const payload = {
    iss: issuer,
    sub: videoId,
    ver: '1.0',
    aud: 'https://hivestreaming.com',
    cid: customerId,
    evn: eventName,
    man: [],
    reg: regexes, /* soon to be deprecated, please use the `reg_manifest` claim instead, optionally along with `reg_quality` */
    reg_manifest: regexes,
    reg_quality: qualityRegexes,
    exp: expiry
};

console.log(`JWT payload: ${JSON.stringify(payload, null, 2)}`);

const jwt = jsonwebtoken.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid: keyId
});

console.log(`JWT string`);
console.log(jwt);

console.log("")
console.log("https://streaming-simulator-prod.hivestreaming.com/generic/live/beta-big-bunny-multi/manifest.m3u8")
