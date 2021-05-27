

import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    useIonViewDidEnter,
    IonAvatar,
    IonButton,
    IonCard,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList,
    IonCardSubtitle,
    IonInput,
    IonCardContent,
    useIonViewWillEnter
  } from '@ionic/react';
  import { History } from 'history';
  import React, { useEffect, useContext, useRef, useState } from 'react';
  import { authGuard } from '../../Routing';
  import { RouteComponentProps } from 'react-router';
  import { AppContext } from '../../State';
import NothingContainer from './Nothing';
import { reqdata,changeStatus, listenChange, deleteDoc, setArrivingTime} from '../../logic/bookDriver'
import '../dprofile.css';
import { toast } from '../../toast';
import { getUser } from '../../user';
import { FirebaseApp } from '../../firebaseApp';
  
  interface ItemProps extends RouteComponentProps<{ tab: string }> {
    history: History;
    
  }
  interface ContainerProps {
    load: boolean;
    userid:string;
  }
  interface Rqst{
    Name:string,
    Source:string,
    Destin:string,
    Mobno:string,
    Status:string

  }
  const RideReq: React.FC<ContainerProps> = ({ load ,userid})   => {
    const [status, setStatus] = useState('');
    const [useridd, setUserid]= useState('');
    const [Load,setLoad]=useState(false);
    const [reqstdata,setreqstdata]=useState<Rqst>();
    const [arr, setarr] = useState<number>(0);
    // let reqdata2={

    //   name:'',
    //   source:'',
    //   destin:'',
    //   mobno:0,
    //   status:''
      
    // }
    useIonViewWillEnter(() => {
      fetchreq();
    });
    useEffect(()=>{
      fetchreq();
      
     },[reqstdata?.Status]);
    const fetchreq  = async () => {
      try{
        const userdats=  await getUser();
        if (userdats){
          //console.log(userdats.uid);
        setUserid(userdats.uid);
        // const reqdat= await listenChange(userdats.uid);
        FirebaseApp.firestore().collection('bookings').doc(userdats.uid).onSnapshot((doc) => {
            console.log("Current data: ", doc.data());
          changerqst(doc.data());
            // console.log("kitty",dats);
        },
        ( err )=> {
          
          console.log("Encountered error: ",err);
          
        });
       // setLoad(true);
        //  console.log("dataf",reqdat);
        console.log("stats",status);
      }
    }catch(error){
      console.log(error);  
    }
  
  }
  const changerqst=async ( params:any)=>{
    if(params!==undefined){
      setreqstdata({
        Name:params.Name,
        Source:params.Source,
        Destin:params.Destin,
        Mobno:params.Mobno,
        Status:params.Status
      }); 
      // reqdata2.name=params.Name;
      // reqdata2.source=params.Source;
      // reqdata2.destin=params.Destin;
      // reqdata2.mobno=params.Mobno;
      // reqdata2.status=params.Status;
    //  console.log("here",reqdata2);
     // console.log("req",reqstdata?.Destin);
      if(reqstdata?.Status=="waiting"){
        setLoad(true);
      
      }
      if(reqstdata?.Status=="Cancelled"){
        setLoad(false);
      }
    }else{
      toast("no rides");
    }
    } 

    
    const handleAccept = async (e:any) => {
  e.preventDefault();
  try {
    setStatus("Accepted");
    const stat="Accepted";
    await changeStatus(useridd,stat);
    await setArrivingTime(useridd,arr);
    setLoad(true);
    toast(`Accepted the ride request and set arriving time to ${arr}`);
  } catch (error) {
    toast(error);
       
  }
    };
    const handleReject = async (e:any) => {
      e.preventDefault();
      try {
        setStatus("Rejected");
        const statR="Rejected";
       await changeStatus(useridd,statR);
       setLoad(false);
      } catch (error) {
        toast(error);
        
      }
    };
 
     const deletereqs= async(id:any)=>{
       await deleteDoc(id);
     }
  
  
    if(Load==false){
      if(reqstdata?.Status=="Cancelled"){
        deletereqs(useridd);
        return(
          <IonContent>
        <IonCard >
      
      <IonAvatar className="profile-picture ">
        <img src="https://gravatar.com/avatar/dbaaeerer566f9d4041fbycd9aaa7741?d=identicon&f=y" />
      </IonAvatar>
      <IonCardTitle className="profile-name profile-item">{reqstdata?.Name}</IonCardTitle>
     <IonCardContent>
       <IonItem className="cancelitem">
      <div >
      <p>Request Cancelled by the Passenger... </p>
    </div></IonItem>
      </IonCardContent>    
           
           
      
      </IonCard>
     
        </IonContent>
        );
      }else{
            return(
                <NothingContainer name="No Ride Requests.."/>
            );
      }
        }

       else {
         
        return ( 
        <IonContent>
        <IonCard >
        <IonAvatar className="profile-picture ">
        <img src="https://gravatar.com/avatar/dbaaeerer566f9d4041fbycd9aaa7741?d=identicon&f=y" />
      </IonAvatar>
      <IonCardTitle className="profile-name profile-item">{reqstdata?.Name}</IonCardTitle>
      <IonList >
          <IonItem><IonLabel>Pickup location:</IonLabel>{reqstdata?.Source}</IonItem>
            <IonItem><IonLabel>Drop off location:</IonLabel>{reqstdata?.Destin}</IonItem>
            <IonItem><IonLabel>Pickup Time(in minutes):</IonLabel>
            <IonInput type="number"  value={arr} onInput={(e: any) => setarr(e.currentTarget.value)} ></IonInput>
            </IonItem>
          
            <IonItem><IonLabel>Mobile no:</IonLabel>{reqstdata?.Mobno}</IonItem>
              <IonLabel>
                <IonButton color="primary" style={{margin:'10px'}}expand="block" onClick={handleAccept}>Accept Ride</IonButton>
                <IonButton style={{margin:'10px'}} expand="block" color="danger"onClick={handleReject}>Reject Ride</IonButton>
              </IonLabel>
           
          </IonList>
      </IonCard>
     
        </IonContent>
  
  
     
    );
        }
       
       
  };
  
  export default RideReq;
  
  
  
  