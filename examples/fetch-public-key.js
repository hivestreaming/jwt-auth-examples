require('dotenv').config();

/*
  This script fetches a public key stored in Hive public key storage.
*/

const partnerId = process.env.HIVE_PARTNER_ID || '<partnerId>';
const partnerToken = process.env.HIVE_PARTNER_TOKEN || '<partnerToken>';
const keyId = process.env.HIVE_PARTNER_KEY_ID || '<keyId>';
const hiveEnvironment = process.env.HIVE_API_ENV || 'test'; // available environments: 'test' or 'prod'

(async function () {
    const url = `https://api${
        hiveEnvironment === 'prod' ? '' : '-test'
    }.hivestreaming.com/v1/publickey/${partnerId}/${keyId}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Hive-Partner-Token': partnerToken
            }
        });
        if (response.ok) {
            const responseBody = await response.json();
            console.log('Fetching successful, response:', responseBody);
        } else {
            console.log('Fetching failed, response status:', response.status);
        }
    } catch (err) {
        console.log('Error:', err);
    }
})();
