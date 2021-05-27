import { Toast } from "@capacitor/core";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonLoading,
  IonPage,
} from "@ionic/react";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";

import { History } from "history";
import {Placesdata } from "../../models";
import {bookDriver, bookingStatus, listenChange, reqdata, } from '../../logic/bookDriver';
import { FirebaseApp } from "../../firebaseApp";


export async function getDriver(sourceloc:string,destinloc:Placesdata | undefined ) {

  //const bookobj=params
  //let stst="Rejected";
  //let driverdat;
  // while(stst==="Rejected"){
 const driverdat= await bookDriver(sourceloc,destinloc?.name);
 // await bookingStatus(driverdat);
//   stst= await reqdata.status;
//    console.log(stst);
//     while(stst==="waiting"){
//       stst=await reqdata1.status;
//       console.log(stst);
//     }
//     if(stst==="Accepted"){
  //       return driverdat;
  //     }else{
//       stst="Rejected";
//     }
//   }
//   console.log("yes",driverdat)
  return driverdat
 }


