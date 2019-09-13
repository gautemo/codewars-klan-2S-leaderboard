const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getAllWarriors = functions.region('europe-west1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    const userNames = (await db.collection('users').get()).docs.map(s => s.id);
    const usersInfo = userNames.map(u => getUser(u));

    response.send(await Promise.all(usersInfo));
});

const getUser = async user => {
    const token = functions.config().codewars.token;
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${user}?access_key=${token}`);
    return await resp.json();
}
