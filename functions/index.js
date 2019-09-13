const functions = require('firebase-functions');
const fetch = require('node-fetch');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.getUserStats = functions.region('europe-west1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    const user = request.body.user;
    const apiToken = request.body.token;
    console.log(`https://www.codewars.com/api/v1/users/${user}?access_key=${apiToken}`);
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${user}?access_key=${apiToken}`);
    const json = await resp.json();
    response.send(json);
});
