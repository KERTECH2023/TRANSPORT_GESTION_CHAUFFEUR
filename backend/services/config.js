const {initializeApp}=require('firebase/app');
const admin =require("firebase-admin");
const firebaseServiceAccount=require("../firebase.json");
const{getAuth}=require ("firebase-admin/auth");
const firestoreApp=admin.initializeApp({
  credential:admin.credential.cert(firebaseServiceAccount),
  databaseURL:"https://transport-app-36443-default-rtdb.firebaseio.com"
},'firestoreApp');
admin.initializeApp({
  credential:admin.credential.cert(firebaseServiceAccount)});
const  db = admin.firestore;
module.exports={
admin,
firestoreApp,
db 

}