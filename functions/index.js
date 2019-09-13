const functions = require('firebase-functions');
const fetch = require('node-fetch');

exports.getAllWarriors = functions.region('europe-west1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    const users = ['gautemo', 'alfkal'];
    const allUsers = users.map(u => getUser(u));

    response.send(await Promise.all(allUsers));
});

const getUser = async user => {
    const token = functions.config().codewars.token;
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${user}?access_key=${token}`);
    return await resp.json();
}
