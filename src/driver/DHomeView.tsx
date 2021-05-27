import React, { useContext, useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import {
  IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonText, IonButton, IonItem, IonLabel, IonSpinner, IonInput, IonLoading, IonAlert, IonRouterOutlet, IonRouterLink, IonCard, IonCardContent, IonCardHeader, IonToggle
} from '@ionic/react';
//import './MapStyle.css';
//import  '../components/GetDriver';



import { IonActionSheet} from '@ionic/react';
import { trash, share, caretForwardCircle, heart, close } from 'ionicons/icons';
//import {getDriver} from '../components/GetDriver';
import { History } from 'history';
import { Redirect, Route, RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { AppContext } from '../State';
import { authGuard } from '../Routing';
import NothingContainer from './components/Nothing';
import RideReq from './components/RideReqCard';
import { setAvailability } from '../db';
import { listenChange } from '../logic/bookDriver';
import { getUser } from '../user';
import { toast } from '../toast';
interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}
const AnyReactComponent = () => (
  <div style={{
    color: 'white', background: 'red', padding: '10px', display: 'inline-flex', textAlign: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: '100%', transform: 'translate(-80%, -100%)'
  }}>
    <div className="pointer">
    </div>
  </div>
);
const DHomeView = (props: any,{ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);
  const { center, latitude, longitude, getGeoLocation, loading } = props;
  const [text, setText] = useState<string>();
  const [showLoading, setShowLoading] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [checked, setChecked] = useState(true);
  const [userid, setUserid]= useState('');
  const Availability = {
    available: "Not Available",
  };
 
   let loadcard= true ;

   useEffect(() => {
    authGuard(dispatch, match, history);
  }, [dispatch, history, match]);
  
  
  // useEffect(()=>{
  //   fetchuserid();
  //  // fetchreq();
  //  });
//   const fetchreq  = async () => {
    
//     try{
//       if (userid){
//         //console.log(userdats.uid);
//         setUserid(userid);
//        const reqdat= await listenChange(userid);
//       console.log("dataf",reqdat);
//     }
//   }catch(error){
//     console.log(error);

//   }
// }
//   const fetchuserid  = async () => {
//     try{
//       const userdats=  await getUser();
//       if (userdats){
//         //console.log(userdats.uid);
//         setUserid(userdats.uid);
//       //  const reqdat:any= await listenChange(userdats.uid);
//       // console.log("dataf",reqdat);
//     }
//   }catch(error){
//     console.log(error);

//   }
// }

  if (checked) {
    Availability.available = "Available";
    setAvailability(true);
    console.log("scn");
    
  }else{
    setAvailability(false);
  }

  const handleBooknow = async () => {
    try {
      setShowLoading(true);
      setShowAlert2(false);
      //    const user = await getDriver();
      setShowLoading(false);
      console.log("work");

      setShowAlert2(true);
    } catch (error) {
      toast(error);
      setShowLoading(false);
    }
  };

  const handleOk = async () => {
    try {
      setShowLoading(true);

      // const user = await driverconfirm();

      console.log("double ok");

      //history.push('/page');
      setShowLoading(false);
      setShowActionSheet(true);
    } catch (e) {
      setShowLoading(false);
    }
  };

  return (
    <>
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonTitle slot="start"> Ride Requests </IonTitle>

            <IonLabel slot="end">{Availability.available}</IonLabel>
            <IonToggle
              slot="end"
              checked={checked}
              onIonChange={(e) => setChecked(e.detail.checked)}
            />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loading && (
            <div className="full-content">
              <IonSpinner name="lines" />
            </div>
          )}
          {!loading && (
           <div></div>
          )}

          <IonLoading
            isOpen={showLoading}
            message="Please Wait..."
            onDidDismiss={() => setShowLoading(false)}
          />
          <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(true)}
            cssClass="my-custom-class"
            header={"DriverName"}
            subHeader={"Rating"}
            message={"Choose to continue"}
            buttons={[
              {
                text: "Okay",
                handler: async () => {
                  setShowLoading(true);
                  await handleOk();

                  //const success= await driverconfirm()

                  console.log("Confirm Okay");
                },
              },
              {
                text: "Cancel",
                role: "cancel",
                cssClass: "secondary",
                handler: (blah) => {
                  console.log("Confirm Cancel: blah");
                },
              },
              {
                text: "Next",
                handler: () => {
                  handleBooknow();
                  console.log("Confirm no");
                },
              },
            ]}
          />
          <IonLoading
            isOpen={showLoading}
            message="Waiting for confirmation from driver..."
            onDidDismiss={() => setShowLoading(false)}
          />

          <RideReq load={loadcard}
                   userid={userid}
          
          />
         
        </IonContent>
      </IonPage>
    </>
  );
}
export default DHomeView