import { Plugins } from '@capacitor/core';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { FirebaseApp } from '../../firebaseApp';
import { deleteDoc, reqdata, reqStatus } from '../../logic/bookDriver';
import { toast } from '../../toast';
import './NothingBook.css';
const { Storage } = Plugins;
interface ContainerProps {
  drivID: string;
}
interface Snapshot{
  Status:string,
  Source:string,
  Destin:string,
  Name:string,
  Mobno:string
}

const Status:React.FC<ContainerProps> = ({ drivID }) => {
    const [status, setstatus] = useState<any>();
    const[driId,setDId]=useState<any>();
    const [arrive, setarrive] = useState<number>()
    useIonViewWillEnter(() => {
      fetchStatus();
    });
    useEffect(()=>{
        fetchStatus();
    },[status]);

    
    const fetchStatus=async()=> {
      const drId = await Storage.get({ key: 'dId' });
      setDId(drId.value);
      if(drId.value!==null){
        await FirebaseApp.firestore().collection('bookings').doc(drId.value).onSnapshot((doc) => {
        console.log("Current data: ", doc.data());
        readStatus(doc.data());
       
     },
    ( err )=> {
      
      console.log("Encountered error: ",err);
     
    });

  }else {
    console.log("document not found");
    toast("document  not found");
  }
    const readStatus = async (params:any) => {
      if (params!==undefined){
          let st=params.Status;
          setstatus(st);
          setarrive(params.Arriving);

        }else
        console.log("status",);
    }
}
const deleteReq =async (id:any)=>{
  await deleteDoc(id);

}

  if(status=="Accepted"){
         return (
         <IonList>
          <IonItem className="item-background-accept">
          <IonText className="status">
     <div >
       <p>Driver Confirmed... </p>
     </div></IonText> 
     </IonItem>
          <IonItem><IonLabel>Arriving in:</IonLabel>{arrive} (minutes)</IonItem>
          </IonList>  
    );
  }else  if(status=="Rejected"){
    deleteReq(driId);
    return (
      <IonItem className="item-background-reject">
        <IonText className="status">
   <div >
     <p>Driver can't reach you..please book again </p>
   </div></IonText></IonItem>
);
}else{
    return(
      <IonItem className="item-background-waiting">
        <IonText className="status">
        <div >
          <p >Waiting for confirmation from driver... </p>
        </div></IonText>
        </IonItem>

      
        );
    }
};

export default Status;