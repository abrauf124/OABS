import React, { useContext, useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonText,
  IonButton,
  IonItem,
  IonLabel,
  IonSpinner,
  IonInput,
  IonLoading,
  IonAlert,
  IonRouterOutlet,
  IonRouterLink,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonSearchbar,
  useIonViewDidEnter,
} from "@ionic/react";
import "./MapStyle.css";
import "../components/GetDriver";
import { loadPlaces} from "../../db";
import { Plugins } from '@capacitor/core';
import { Toast } from "@capacitor/core/dist/esm/web/toast";
import { IonActionSheet } from "@ionic/react";
import {  caretForwardCircle, heart, close,callOutline, checkmarkCircle, checkmarkCircleOutline } from "ionicons/icons";
import { getDriver } from "../components/GetDriver";
import { History } from "history";
import { Redirect, Route, RouteComponentProps } from "react-router";
import { Link } from "react-router-dom";
import { AppContext } from "../../State";
import { authGuard } from "../../Routing";
import { retrievePlaces } from "../../user";
import { toast } from "../../toast";


const { Storage } = Plugins;
interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

interface Placesdata {
  name: string;
  lat: number;
  lng: number;
}
interface Driverdata {
  name: string;
  mob: number;
 
}
const AnyReactComponent = () => (
  <div
    style={{
      color: "white",
      background: "red",
      padding: "10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-80%, -100%)",
    }}
  >
    <div className="pointer"></div>
  </div>
);
const HomeView = (props: any, { history, match }: ItemProps) => {
  const searchRef = useRef<HTMLIonSearchbarElement>(null);
  const { dispatch } = useContext(AppContext);
  // We likely have a search query here
  const [query, setQuery] = useState("");
  const [drivername, setdriver]=useState();
  const [drivermob, setdrivermob]=useState();
 
  const { center, latitude, longitude, getGeoLocation, loading,locate } = props;
  const [text, setText] = useState<string>();
  const [destination, setDestination] = useState<string>();
  const [showLoading, setShowLoading] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [showAlert2, setShowAlert2] = useState(false);
  const [showAlert3, setShowAlert3] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [places, setPlaces] = useState<Placesdata>();

  useEffect(() => {
    authGuard(dispatch, match, history);
  }, [dispatch, history, match]);
  
  //console.log("hi");
  useIonViewDidEnter(() => {
    const ref = searchRef.current;
    ref && ref.setFocus && ref.setFocus();
  });

  // useEffect(() => {
  //  //fetchPlaces();
  //   async function search() {
  //     // Do the search here every time the query changes

  //     console.log('Searching');
  //   }
  //   search();
  // }, [query]);
  // const fetchPlaces  = async () => {

  //   try{
  //     const serviceArea=  await loadThings();
  //     if (serviceArea){
  //      // setPlaces(serviceArea);
  //      console.log("sss",serviceArea);
  //   }
  // }catch(error){
  //     console.log(error);

  //}

  const handleBooknow = async (e:any) => {
    e.preventDefault();
    try {
      if(destination!=undefined){
      const dest =await destination.toLowerCase();
      setShowLoading(true);
      setShowAlert2(false);
      const destn = await loadPlaces(dest);
      // console.log("ok",destn);
      await setPlaces(destn);
      if (!destn) {
        setShowLoading(false);
        setShowAlert2(true);
      } else {
        const driver = await getDriver(locate,places);
        setdriver(driver[0].Name);
        setdrivermob(driver[0].Mobno);
        let Id=driver[0].id;
      //  console.log("dr",driver[0].id);
    
      await Storage.set({
        key: 'mobno',
        value: driver[0].Mobno,
      });
      await Storage.set({
        key: 'vehno',
        value:driver[0].Vehno,
      });
      await Storage.set({
        key: 'name',
        value:driver[0].Name,
      });
      if(Id !== undefined){
        await Storage.set({
          key: 'dId',
          value:Id,
        });
      }
      // let driverdata = {
      //   name: driver[0].Name,
      //   mobno: driver[0].Mobno,
      //   vehno:driver[0].Vehno,
      //   arriving:""
      //    };
      //  await store.set('myData',driverdata); 
     // localStorage.setItem('myData',JSON.stringify(driverdata));
        if(driver){
        setShowLoading(false);
        setShowActionSheet(true);
        }
        console.log(
          "name:",
          places?.name,
          "lat:",
          places?.lat,
          "lng:",
          places?.lng
        );
      }
    }else
      console.log("undefined");
    } catch (error) {
      toast("Something went wrong,please try again");
      console.log(error)
      setShowLoading(false);
    }
    console.log("ddd",drivername);
  };

  // const handleOk = async () => {

  //   try {
  //     setShowLoading(true);

  //    // const user = await driverconfirm();

  //     console.log("double ok")

  //     //history.push('/page');
  //     setShowLoading(false);

  //   } catch (e) {

  //     setShowLoading(false);

  //   }

  // }

  return (
    <>
      <IonPage id="main">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle slot="">Book a Ride </IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonItem className="reqItems">
              <IonLabel className="reqlabel" position="fixed">
                From:
              </IonLabel>
              <IonText className="geoAbs">{locate}</IonText>
        
              <IonButton
                slot="end"
                color="primary"
                expand="block"
                onClick={getGeoLocation}
              >
                Get Loc
              </IonButton>
            </IonItem>
            <IonItem className="reqItems">
              <IonLabel className="reqlabel" position="fixed">
                To:
              </IonLabel>
              <IonInput
                value={destination}
                onIonChange={(e: any) => setDestination(e.target.value)}
              ></IonInput>
            </IonItem>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {loading && (
            <div className="full-content">
              <IonSpinner name="lines" />
            </div>
          )}
          {!loading && (
            <div id="map" className="GeoMap">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyB-bmcCtIgqoJj0nVbj9VtwJf5q-jReI7g",
                }}
                defaultCenter={center}
                defaultZoom={16}
              >
                <AnyReactComponent />
              </GoogleMapReact>
            </div>
          )}
          <IonButton
            className="geoFooter"
            onClick={handleBooknow}
            expand="block"
          >
            Book Now
          </IonButton>
          {/* <IonLoading
            isOpen={showLoading}
            message="Please Wait...Searching for driver"
            onDidDismiss={() => setShowLoading(false)}
          /> */}
          <IonAlert
            isOpen={showAlert2}
            onDidDismiss={() => setShowAlert2(true)}
            cssClass="my-custom-class"
            header={"Service Unavailable"}
            message={"Sorry...no service to this destination at the moment"}
            buttons={[
              {
                text: "Okay",
                handler: async () => {
                  //setShowLoading(true);
                  // await handleOk( );
                  //const success= await driverconfirm()
                  console.log("Confirm Okay");
                },
              },
            ]}
          />
          <IonLoading
            isOpen={showLoading}
            message="Searching for driver..."
            onDidDismiss={() => setShowLoading(false)}
          />
          <IonActionSheet
            isOpen={showActionSheet}
            onDidDismiss={() => setShowActionSheet(false)}
            cssClass="my-custom-class"
            header={drivername}
            buttons={[
              { icon: checkmarkCircleOutline,
                text: "Driver Assigned successfully. For Details, please check Bookings tab",
              },
              {
                text: drivermob,
                icon: callOutline,
                handler: () => {
                  console.log("Call clicked");
                },
              },
              {
                text: "Close",
                icon: close,
                role: "cancel",
                handler: () => {
                  console.log("Cancel clicked");
                },
              },
            ]}
          ></IonActionSheet>
        </IonContent>
      </IonPage>
    </>
  );
};
export default HomeView;
