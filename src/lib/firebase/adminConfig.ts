var admin = require("firebase-admin");

var serviceAccount = require("./expo-trissea-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
