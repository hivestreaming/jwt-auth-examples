require('dotenv').config();

/*
  This script deletes (invalidates) a public key stored in Hive public key storage.
*/

/* Partner ID provided by Hive */
const partnerId = process.env.HIVE_PARTNER_ID || '<partnerId>';

/* Partner token provided by Hive */
const partnerToken = process.env.HIVE_PARTNER_TOKEN || '<partnerToken>';

/* Unique ID for a public RSA key */
const keyId = process.env.HIVE_PARTNER_KEY_ID || 'test-key-id-123';

/* Hive API environment - prod or test */
const hiveEnvironment = process.env.HIVE_API_ENV || 'prod';

(async function () {
    const url = `https://api${
        hiveEnvironment === 'prod' ? '' : '-test'
    }.hivestreaming.com/v1/publickey/${partnerId}/${keyId}`;

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'X-Hive-Partner-Token': partnerToken
            }
        });
        if (response.ok) {
            console.log('Deleting successful');
        } else {
            console.log('Deleting failed, response status:', response.status);
        }
    } catch (err) {
        console.log('Error:', err);
    }
})();
