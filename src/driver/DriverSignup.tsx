import React, { useContext, useState, FormEvent } from 'react';
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
import { Actions, AppContext } from '../State';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import { signup, dsignup } from '../user';
import './dpage.css';
import { toast } from '../toast';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

interface SignupErrors {
  code: number;
  message: string;
}

const DriverSignupPage = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  const [role,setRole]=useState('Driver');
  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ mobno, setMobno ] = useState('');
  const [ licno, setLicno ] = useState('');
  const [ vehno, setVehno ] = useState('');
  const [ formErrors, setFormErrors ] = useState<SignupErrors | null>(null);
  const [ showLoading, setShowLoading ] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const phoneseq = /^\d{10}$/;
      const licseq= "^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$"; 
      setShowLoading(true);
      if(name==null||name ==''){
      toast("Unable to create account:Name can't be blank");
      setShowLoading(false);
      }
      else if(mobno.length!=10 ||!mobno.match(phoneseq)){
        toast("Unable to create account:enter a valid 10 digit mobile number");
        setShowLoading(false);
      }
      else if(!licno.match(licseq)){
        toast("Unable to create account:Invalid Licence number");
        setShowLoading(false);
      }

      else{
      const user = await dsignup({ name, email, password, role, mobno, licno, vehno });

      setShowLoading(false);

      dispatch({
        type: Actions.LoggedIn,
        user
      });

    
      history.push('/dapp/home');
      }
    } catch (e) {
      setFormErrors(e);
      toast(`Unable to create account: ${formErrors?.message}`)
      setShowLoading(false);
    }
  }

  const goTo = (path: string) => {
    history.push(path, { direction: 'forward' });
  }

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/`} />
        </IonButtons>
        <IonTitle>Create Account</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonLoading isOpen={showLoading} message="Creating account..." onDidDismiss={() => setShowLoading(false)}/>
      <div className="ion-padding" style={{ textAlign: 'center' }}>
        <p>
          Welcome, please create an account
        </p>
      </div>
      {/* {formErrors ? (
        <div style={{ textAlign: 'center' }}>
        
        </div>
      ) : (null)} */}
      <form onSubmit={e => handleSubmit(e)} action="post">
        <IonCard className="container1">
          <IonItem>
            <IonLabel position={'fixed'}>Name</IonLabel>
            <IonInput name="name" type="text" value={name} onInput={(e: any) => setName(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Email</IonLabel>
            <IonInput name="email" type="email" value={email} onInput={(e: any) => setEmail(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Password</IonLabel>
            <IonInput name="password" type="password" value={password} onInput={(e: any) => setPassword(e.currentTarget.value)} />
          </IonItem>

       
        </IonCard>
        <IonCard className="container2">
          <IonItem>
            <IonLabel position={'fixed'}>Mobile No:</IonLabel>
            <IonInput name="mobno" type="number" value={mobno} onInput={(e: any) => setMobno(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Licence no:</IonLabel>
            <IonInput placeholder="eg:KL-0619850034761 " name="licno" type="text" value={licno} onInput={(e: any) => setLicno(e.currentTarget.value)} />
          </IonItem>
          <IonItem>
            <IonLabel position={'fixed'}>Vehicle no:</IonLabel>
            <IonInput  placeholder="eg: KL 11 AA 1234"name="vehno" type="text" value={vehno} onInput={(e: any) => setVehno(e.currentTarget.value)} />
          </IonItem>

       
        </IonCard>
          <IonButton className="btnposd" color="primary" expand="block" type="submit">Create Account</IonButton>
      </form>
      <div className="reglinkd" style={{ textAlign: 'center' }}>
        <a className="create" href="#/" onClick={(e) => { e.preventDefault(); goTo('/dlogin')}}>Already have an account? Log in</a>
      </div>
    </IonContent>
  </IonPage>
  );
}

export default DriverSignupPage;