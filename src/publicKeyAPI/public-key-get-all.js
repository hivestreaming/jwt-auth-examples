require('dotenv').config();

/*
  This script fetches all public keys for a given partner stored in Hive public key storage.
*/

/* Partner ID provided by Hive */
const partnerId = process.env.HIVE_PARTNER_ID || '<partnerId>';

/* Partner token provided by Hive */
const partnerToken = process.env.HIVE_PARTNER_TOKEN || '<partnerToken>';

/* Hive API environment - prod or test */
const hiveEnvironment = process.env.HIVE_API_ENV || 'prod';

/* Include deleted keys - true or false */
const includeDeleted = false;

(async function () {
    const url = `https://api${
        hiveEnvironment === 'prod' ? '' : '-test'
    }.hivestreaming.com/v1/publickey/${partnerId}?includeDeleted=${includeDeleted}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'X-Hive-Partner-Token': partnerToken
            }
        });
        if (response.ok) {
            const responseBody = await response.json().catch(() => undefined);
            console.log('Fetching successful, response:', responseBody);
        } else {
            console.log('Fetching failed, response status:', response.status, response.statusText);
        }
    } catch (err) {
        console.log('Error:', err);
    }
})();
