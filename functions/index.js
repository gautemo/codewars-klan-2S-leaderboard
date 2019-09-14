const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getAllWarriors = functions.region('europe-west1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    const userNames = (await db.collection('users').get()).docs.map(s => s.id);
    const usersInfoPromise = userNames.map(u => getUser(u));

    const usersInfo = await Promise.all(usersInfoPromise);
    response.send(usersInfo.filter(u => u !== null));
});

const getUser = async user => {
    const token = functions.config().codewars.token;
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${user}?access_key=${token}`);
    const data = await resp.json();
    if(data.success === false){
        if(data.reason === 'not found'){
            await db.collection('users').doc(user).delete();
        }
        return null;
    }
    if(!data.clan){
        return null;
    }
    return data;
}
