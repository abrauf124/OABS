import firebase from 'firebase/app';
import { useState } from 'react';

import { FirebaseApp } from './firebaseApp';
import './models';

interface Userdata{
  Name:string
  Email: string
  Mobno:string
  Role: string
  Licno:string
  Vehno:string

}
// interface Places{
//     id: string
//     name:string
//     lat : number
//     lng: number
 
// }
export function hasExistingSession() {
  return new Promise((resolve) => {
    FirebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    })
  });
}

export async function getUser() {
  const user = FirebaseApp.auth().currentUser;
  if (!user) {
    return null;
  }

  return user!;
  
}
export async function getUserdata() {
  const user = FirebaseApp.auth().currentUser;
  if (user) {
  const userdat=<Userdata>await retrieveData(user);
  return userdat;
  }
}
export async function retrieveData(user: any) {
  const col = <Userdata>await FirebaseApp.firestore()
    .collection("users")
    .doc(user.uid)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
      //console.log("Document data:", doc.data());
      return doc.data();
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });

  return col;
}
export async function retrievePlaces() {
  const places = await FirebaseApp.firestore().collection('places')
  .get()
  .then((querySnapshot: { docs: any[] }) => {
  const tempDoc = querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() }
  })
// do something with documents.
    if (!tempDoc) {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
   // console.log("Document data:", tempDoc);
    return tempDoc;
  })
  .catch((error) => {
    console.log("Error getting document:", error);
  });
 // console.log("places",places);
return places;
}



export async function login (email: string, password: string): Promise<firebase.User> {
  await FirebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

  const user = await FirebaseApp.auth().signInWithEmailAndPassword(email, password);

  return user.user!;
}

export async function signup({name,email,password,role,mobno,}: {
  name: string;
  email: string;
  password: string;
  role: string;
  mobno: string;
}): Promise<firebase.User> {
  await FirebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const user = await FirebaseApp.auth().createUserWithEmailAndPassword(
    email,
    password
  );
  console.log("Created user", user);
 // Create the associated user table
  await FirebaseApp.firestore().collection("users").doc(user.user!.uid).set({
    Id:user.user!.uid,
    Name: name,
    Email: email,
    Mobno: mobno,
    Role: role,
  });
  console.log("Created user data");
  return user.user!;
}
export async function dsignup({ name, email, password,role, mobno, licno, vehno }:
  { name: string, email: string, password: string, role:string, mobno:string, licno:string, vehno:string 
  }):Promise<firebase.User> {
  await FirebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  const isAvailable=false;
  const isBooked=false;
  const user = await FirebaseApp.auth().createUserWithEmailAndPassword(email, password);

  console.log('Created user', user);

  // Create the associated user table
  await FirebaseApp.firestore().collection("users").doc(user.user!.uid).set({
    RandomId:user.user!.uid,
    Name: name,
    Email: email,
    Mobno: mobno,
    Licno: licno,
    Vehno:vehno,
    Role: role,
    IsAvailable: isAvailable,
    IsBooked: isBooked
  });
 console.log('Created user data');
 return user.user!;
}

export function logout() {
  return FirebaseApp.auth().signOut();
}

export function sendPasswordResetEmail(email: string) {
  return FirebaseApp.auth().sendPasswordResetEmail(email);
}
