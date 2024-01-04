const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
 
const privateKeyPath = './path/private-key.pem';

const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
 
const partnerId = '<partnerId>';
const customerId = '<customerId>';
const videoId = '<videoId>';
const eventName = '<eventName>';
const keyId = '<keyId>';
const regexes = ['streaming-simulator.*(\/.*\.ts|\/.*\.m3u8|.*\.mp4)'];
 
const payload = {
    iss: partnerId,
    sub: videoId,
    ver: '1.0',
    aud: 'https://hivestreaming.com',
    cid: customerId,
    evn: eventName,
    man: [],
    reg: regexes,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
};

const jwt = jsonwebtoken.sign(payload, privateKey, {
    algorithm: 'RS256',
    keyid: keyId,
});

console.log(jwt);