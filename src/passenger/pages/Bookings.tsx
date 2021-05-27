

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
  useIonViewWillEnter,
  IonAlert
} from '@ionic/react';
import { History } from 'history';
import React, { useEffect, useContext, useRef, useState } from 'react';
import { authGuard } from '../../Routing';
import { RouteComponentProps } from 'react-router';
import { AppContext } from '../../State';
import { Plugins } from '@capacitor/core';
import { setupMaster } from 'node:cluster';
import NothingBook from '../components/NothingBook';
import { changeStatus } from '../../logic/bookDriver';
import { toast } from '../../toast';
import Status from '../components/Status';
import Rating from './Rating';
const { Storage } = Plugins;
interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
  
}

  interface Driverdata {
    name: string;
    mob: number;
    vehno:string;
    arriving: number;
   
  }

const Bookings = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);
const[dname,setDname]=useState<string |null>();
const[driId,setDId]=useState<any>();
const[dmobno,setMobno]=useState<string |null>();
const[dvehno,setVehno]=useState<string |null>();
const [status, setStatus] = useState('');
const [showAlert, setShowAlert] = useState(false);
const [Load, setLoad] = useState(false)

  //const searchRef = useRef<HTMLIonSearchbarElement>(null);

  // We likely have a search query here
  //const [ query, setQuery ] = useState('');

  useEffect(() => {
    authGuard(dispatch, match, history);
  }, [dispatch, history, match]);

  useIonViewWillEnter(() => {
    fetchdata();
  // let data=(localStorage.getItem('myData'));
  });
  async function fetchdata() {
    const name = await Storage.get({ key: 'name' });
    setDname(name.value);
    const drId = await Storage.get({ key: 'dId' });
    setDId(drId.value);
    const  mobno = await Storage.get({ key: 'mobno' });
    setMobno(mobno.value);
    const  vehno  = await Storage.get({ key: 'vehno' });
    setVehno(vehno.value);
    if(name.value!== null||name.value!==''){
     setLoad(true);
    }
    
  }
  // useEffect(() => {
    //   async function search() {
  //     // Do the search here every time the query changes
    
  //     console.log('Searching');
  //   }
  //   search();
  // }, [query]);
  const deletelocal=async()=>{
    await Storage.remove({ key: 'name' });
    setDname(null);
    await Storage.remove({ key: 'dId' });
    setDId(null);
    await Storage.remove({ key: 'mobno' });
    setMobno(null);
     await Storage.remove({ key: 'vehno' });
     setVehno(null);
    }
    const handleReject = async (e:any) => {
      e.preventDefault();
      try {
        setShowAlert(true);
        
      } catch (error) {
        toast(error);
        
      }
    };
    
    const cancelBooking=async()=>{
     
      try {
        const statR="Cancelled";
        await changeStatus(driId,statR);
        await deletelocal();
     //   setStatus("Cancelled");
        if(statR ==="Cancelled"){
          setLoad(false);
        }
      } catch (error) {
        console.log(error);

        toast("No bookings to cancel");
        
      }
    }
    // const handleFinish=async()=>{
    //   return(<Rating/>);
    // }
    // if(dname!==null||''){
      //   load=true;
      // }
      if(status ==="Cancelled"){
        setLoad(false);
      }
      console.log("Did data load? : ",Load);
      if(Load==false){
        return ( <NothingBook/>);
}else{
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Booking</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonCard >
      <IonAvatar className="profile-picture ">
      <img src="https://gravatar.com/avatar/dbaaeerer566f9d4041fbycd9aaa7741?d=identicon&f=y" />
    </IonAvatar>
    <IonCardTitle className="profile-name profile-item">{dname}</IonCardTitle>
    <IonCardSubtitle className="profile-item">Rating:3.5/5</IonCardSubtitle>
    <IonList >
          <Status drivID={driId}/>
          <IonItem><IonLabel>Mobile no:</IonLabel>{dmobno}</IonItem>
          <IonItem><IonLabel>Rickshaw No:</IonLabel>{dvehno}</IonItem>
        
        
            <IonLabel>
              <IonButton style={{margin:'10px'}} expand="block" color="danger"onClick={handleReject} >Cancel Ride</IonButton>
            <IonButton color="primary" style={{margin:'10px'}}expand="block">Finish Ride</IonButton>
            </IonLabel>
            <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            cssClass="my-custom-class"
            header={"Cancel Ride"}
            message={"Are you sure to about this?"}
            buttons={[
              {
                text: "Yes",
                handler: async () => {
                  await cancelBooking();

                  console.log("Confirm");
                },
              },
              {
                text: "No",
                role: "cancel",
                cssClass: "secondary",
                handler: (blah) => {
                  console.log("clicked no");
                },
              },
            ]}
          />
         
        </IonList>
    </IonCard>
   
      </IonContent>


    </IonPage>
  );
}
}
export default Bookings;




