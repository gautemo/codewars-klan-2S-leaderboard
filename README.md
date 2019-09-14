# codewars-klan-2S-leaderboard
Leaderboard for clans in Sopra Steria on Codewars

Visit [codewars-leaderboard-2s.web.app](https://codewars-leaderboard-2s.web.app/) to see the website.

## Web
The website is created with Vue.

```
cd web
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Backend
The backend uses Firebase. 
Firestore is used to store the usernames.
Cloud Functions for Firebase is used to perform API requests to the codewars api, since they don't allow CORS requests.
Firebase hosting is used to host the website.

### Firebase project
[Firebase console](https://console.firebase.google.com/project/codewars-leaderboard-2s/overview). Ask Gaute Meek Olsen for permission if you need this.

### Deploy
```
firebase deploy
```
Specific deployment:
```
firebase deploy --only hosting,functions,firestore:rules
```

### Cloud Functions for Firebase
Set ACCESS API TOKEN `firebase functions:config:set codewars.token="[INSERT YOUR TOKEN]"`

## Contributing
Feel free to contribute by sending pull requests.