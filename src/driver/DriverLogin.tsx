import React, { useContext, useState, FormEvent, useCallback, useRef, KeyboardEvent } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonPage,
  IonButtons,
  IonBackButton,
  IonLoading,
  IonCard
  
} from "@ionic/react";
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import './dpage.css';
import '../passenger/pages/Page.css';
import { AppContext } from '../State';
import { Actions } from '../State';
import { login, retrieveData } from '../user';
import { toast } from '../toast';


interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

interface LoginErrors {
  code: number;
  message: string;
}
interface Userdata{
  Name:string
  Email: string
  Mobno:string
  Role: string
  Licno:string
  Vehno:string
  
}


const DriverLoginPage = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ formErrors, setFormErrors ] = useState<LoginErrors | null>(null);
  const [ showLoading, setShowLoading ] = useState(false);
  const [userdata, setUserdata] = useState<Userdata>();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setShowLoading(true);

      const user = await login(email, password);
     
        const userdats=  await retrieveData(user);
        if (userdats){
        setUserdata(userdats);
        }
      

      dispatch({
        type: Actions.LoggedIn,
        user
      });
      if(userdata!==undefined && userdata?.Role=== "Driver"){
        history.push('/dapp/home');
        console.log(userdata);
        setShowLoading(false);   
      }else{
        toast('You are not a registered driver');
      setShowLoading(false);
    }
    } catch (e) {
      setFormErrors(e);
      setShowLoading(false);
    }
  }

  const goTo = (path: string) => {
    history.push(path, { direction: 'forward' });
  }

  const formRef = useRef<HTMLFormElement>(null);
  const handleEnter = useCallback((e: KeyboardEvent<HTMLIonInputElement>) => {
   /* 
    if (e.key === 'Enter' && formRef.current) {
      formRef.current.submit();
    }
    */
  }, []);

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/`} />
        </IonButtons>
        <IonTitle>Driver Login</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonLoading isOpen={showLoading} message="Logging in..." onDidDismiss={() => setShowLoading(false)}/>
      {formErrors ? (
        <div className="ion-padding" style={{ textAlign: 'center' }}>
          Unable to log in: {formErrors.message}
        </div>
      ) : (null)}
      <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
        <IonCard className="container1">
          <IonItem>
            <IonLabel position={'fixed'}>Email</IonLabel>
            <IonInput  type="email" value={email} onInput={(e: any) => setEmail(e.currentTarget.value)} onKeyUp={handleEnter} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Password</IonLabel>
            <IonInput
              type="password"
              value={password}
              onInput={(e: any) => setPassword(e.currentTarget.value)}
              onKeyUp={handleEnter} />
          </IonItem>
      
        </IonCard>
          <IonButton className="btnpos btnposl" expand="block" type="submit">Log in</IonButton>
      </form>
      <div className="reglink" style={{ textAlign: 'center' }}>
        <a className="create" href="#/" onClick={(e) => { e.preventDefault(); goTo('/forgot-password')}}>Forgot your password?</a>
        <br /><br />
        <a className="create" href="#/" onClick={(e) => { e.preventDefault(); goTo('/dsignup')}}>Create account instead</a>
      </div>
    
    </IonContent>
  </IonPage>
  );
}

export default DriverLoginPage;