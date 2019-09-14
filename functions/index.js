const functions = require('firebase-functions');
const fetch = require('node-fetch');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

exports.getAllWarriors = functions.region('europe-west1').https.onRequest(async (request, response) => {
    response.set('Access-Control-Allow-Origin', '*');

    const users = (await db.collection('users').get()).docs;
    const usersInfoPromise = users.map(u => getUser(u));

    const usersInfo = await Promise.all(usersInfoPromise);
    response.send(usersInfo.filter(u => u !== null));
});

const getUser = async user => {
    const periodSubtract = getUserPeriodSubtract(user);
    const data = await getCodeWarsStats(user.id);
    if(!data.clan){
        return null;
    }
    data.periodHonor = data.honor - (periodSubtract);
    return data;
}

const getCodeWarsStats = async username => {
    const token = functions.config().codewars.token;
    const resp = await fetch(`https://www.codewars.com/api/v1/users/${username}?access_key=${token}`);
    return await resp.json();
}

const getUserPeriodSubtract = user => {
    const data = user.data();
    return data.periodSubtract;
}

exports.userCreated = functions.firestore
    .document('users/{username}')
    .onCreate(async (snap, context) => {
        const data = await getCodeWarsStats(snap.id);
        if(data.success === false){
            if(data.reason === 'not found'){
                await db.collection('users').doc(snap.id).delete();
            }
        }
        await db.collection('users').doc(snap.id).update({periodSubtract: data.honor});
    });