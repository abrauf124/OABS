
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";

import { History } from "history";
import {Placesdata,DriverUserdata } from "../models";
import { FirebaseApp } from "../firebaseApp";
import {  newId }  from './random';
import { getUserdata } from "../user";

export let reqdata:any={

  name:'',
  source:'',
  destin:'',
  mobno:0,
  status:''
  
}

export let reqStatus:string;

export async function bookDriver(
  sourceloc: string,
  destinloc: string | undefined
) {
  //const bookobj=params
  const driverdat = await selectRandomDriver();
  if (driverdat){
    const dstatus=await createBooking(driverdat,sourceloc,destinloc);
    console.log("inside bookdriver",driverdat);
   // return dstatus;
  const res=await bookingStatus(driverdat);
   // if (res === "waiting")
      return driverdat;
  }else {
   const msg ="couldnt find";
  console.log(msg);
  }
  //return driverdat;
 // return driverdat;

}

export async function bookingStatus(driverobj:any) {
  const DId=driverobj[0].id;
  const listener= await listenChange(DId);
  // const stat=reqdata.status;
  // console.log("st",stat);
  // if(stat==="Accepted"){
  //   return stat;
  // }else if(stat==="Rejected"){
  //   await bookDriver(source,destin);
  //   return stat;
  // }else{
  //   console.log("stt",stat);
  //   const msg="Sorry...couldnt find a driver";
  //    return stat;
  // }
  
}

export async function createBooking(driverobj:any,source:string,destin:string|undefined) {

  const DId=driverobj[0].id;

 // console.log("id",DId);
  const user= await getUserdata();
  let bookref=FirebaseApp.firestore().collection("bookings");
  let setref=await bookref.doc(DId).set({
    
    Name: user?.Name,
    Mobno: user?.Mobno,
    Source:source,
    Destin:destin,
    Status:"waiting",
    Arriving:null
    
  });
  return setref;
}

export async function deleteDoc(uid:string) {
  const col = await FirebaseApp.firestore()
  .collection("bookings")
  .doc(uid)
 .delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
return col;
}

export async function changeStatus(uid:string , status:string) {
  const col = await FirebaseApp.firestore()
  .collection("bookings")
  .doc(uid)
  .update({
    Status: status
});
reqStatus=status;
console.log("status changed to",status);
console.log("status changed",reqdata.status);
  return col;
}
export async function setArrivingTime(uid:string, arriving:number){
  const col = await FirebaseApp.firestore()
  .collection("bookings")
  .doc(uid)
  .update({
    Arriving: arriving
});

console.log("Arriving time",arriving);

  return col;

}
export async function listenChange(params:string) {
  const id= params
  const col:any= FirebaseApp.firestore().collection('bookings').doc(id).onSnapshot((doc) => {
      console.log("Current data: ", doc.data());
     // const dats= dochange(doc.data());
      // console.log("kitty",dats);
      
      return doc.data();
  },
  ( err )=> {
    
    console.log("Encountered error: ",err);
   
  });
  

}

export async function dochange(params:any) {
 // console.log("insidedo",params);
  reqdata.name=params.Name;
  reqdata.source=params.Source;
  reqdata.destin=params.Destin;
  reqdata.mobno=params.Mobno;
  reqdata.status=params.Status;
  console.log("here",reqdata);
  return;
}

export async function selectRandomDriver() {
  const random = newId();
  console.log("random", random);
  const lowvalue = "";
 
  let postsRef= FirebaseApp.firestore().collection("users");
  let queryRef:any = await postsRef.where("IsAvailable", "==", true)
    .where("RandomId", "<=", random)
    .orderBy("RandomId")
    .limit(1)
    .get()
    .then((querySnapshot: { docs: any[] }) => {
       const tempDoc = querySnapshot.docs.map((doc) => {
        return { id: doc.id,...doc.data() };
      });
      // do something with documents.
      if (!tempDoc) {
        // doc.data() will be undefined in this case
        console.log("No such document!");
        return null;
      }
      console.log("Document data:", tempDoc);
      return tempDoc;
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  if (queryRef.length==0) {
    queryRef = await postsRef
      .where("RandomId", ">=", random)
      .orderBy("RandomId")
      .limit(1)
      .get()
      .then((querySnapshot: { docs: any[] }) => {
       const tempDoc = querySnapshot.docs.map((doc) => {
          return { id: doc.id,...doc.data() };
        });
        // do something with documents.
        if (!tempDoc) {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          return null;
        }
        console.log("Document data lessthan:", tempDoc);
        return tempDoc;
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }
  console.log("queryref", queryRef);
  return queryRef;
}




 
  

