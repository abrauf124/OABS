import React, { useContext, useCallback, useEffect, useState } from 'react';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonAvatar,
  IonCard,
  IonCardTitle
} from '@ionic/react';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';

import { getUserdata, logout, retrieveData } from '../user';
import { AppContext, Actions } from '../State';
import { authGuard } from '../Routing';
import './dprofile.css';
interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}
interface Userdata{
  Name:string
  Email: string
  Mobno:string
  Role: string
  Licno:string
  Vehno:string
  
}

const DProfile = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);
  const [userdata, setUserdata] = useState<Userdata>();
  useEffect(() => {
    authGuard(dispatch, match, history);
    fetchuser();
  }, [dispatch, history, match]);
  

  // useEffect(()=>{
   
  // },[]);
  const fetchuser  = async () => {
    try{
    const userdats=  await getUserdata();
    if (userdats){
    setUserdata(userdats);
    }
  }catch(error){
    console.log(error);

  }
}


  const doLogout = useCallback(async () => {
    await logout();
    dispatch({
      type: Actions.LoggedOut
    });
    history.push('/page');
  }, [dispatch, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
      <IonAvatar className="profile-picture ">
      <img src="https://gravatar.com/avatar/dbaaeerer566f9d4041fbycd9aaa7741?d=identicon&f=y" />
    </IonAvatar>
    <IonCardTitle className="profile-name profile-item">{userdata?.Name}</IonCardTitle>
    </IonCard>
        <IonList >
          <IonItem><IonLabel>Email:</IonLabel>{userdata?.Email}</IonItem>
          <IonItem><IonLabel>Mobile no:</IonLabel>{userdata?.Mobno}</IonItem>
          <IonItem><IonLabel>License no:</IonLabel>{userdata?.Licno}</IonItem>
          <IonItem><IonLabel>Vehicle no:</IonLabel>{userdata?.Vehno}</IonItem>
          <IonItem onClick={doLogout}>
            <IonLabel>
              <IonButton expand="block" color="danger">Log out</IonButton>
            </IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default DProfile;
