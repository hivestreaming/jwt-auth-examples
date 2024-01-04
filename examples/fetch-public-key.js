/*
  This script fetches a public key stored in Hive public key storage.
*/
const partnerId = '<partnerId>';
const partnerToken = '<partnerToken>';
const keyId = '<keyId';


(async function () {
  
  const endpoint = 'test';
 
  const url = `https://api${
    endpoint === 'prod' ? '' : '-test'
  }.hivestreaming.com/v1/publickey/${partnerId}/${keyId}`;
 
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Hive-Partner-Token': partnerToken,
      },
    }).then((resp) => resp.json())
    if(response.ok) {
      console.log(response.status)
    }
    console.log('[fetch-key] response', response);
  } catch (err) {
    console.log('[fetch-key] error:', err);
  }
})();