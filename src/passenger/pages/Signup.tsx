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
import { Actions, AppContext } from '../../State';
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import { signup } from '../../user';
import './Page.css';
import { toast } from '../../toast';

interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

interface SignupErrors {
  code: number;
  message: string;
}

const SignupPage = ({ history, match }: ItemProps) => {
  const { dispatch } = useContext(AppContext);

  const [ email, setEmail ] = useState('');
  const [ name, setName ] = useState('');
  const [role,setRole]=useState('Passenger');
  const [ password, setPassword ] = useState('');
  const [ formErrors, setFormErrors ] = useState<SignupErrors | null>(null);
  const [ showLoading, setShowLoading ] = useState(false);
  const [ mobno, setMobno ] = useState('');
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setShowLoading(true);
      const phoneseq = /^\d{10}$/;
     
      setShowLoading(true);
      if(name==null||name ==''){
      toast("Unable to create account:Name can't be blank");
      setShowLoading(false);
      }
      else if(mobno.length!=10 ||!mobno.match(phoneseq)){
        toast("Unable to create account:enter a valid 10 digit mobile number");
        setShowLoading(false);
      }else{
      const user = await signup({ name, email, password, role ,mobno});

      setShowLoading(false);

      dispatch({
        type: Actions.LoggedIn,
        user
      });

      history.push('/app/home');
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
          Unable to create account: {formErrors.message}
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
          <IonItem>
            <IonLabel position={'fixed'}>Mobile No:</IonLabel>
            <IonInput name="mobno" type="number" value={mobno} onInput={(e: any) => setMobno(e.currentTarget.value)} />
          </IonItem>

       
        </IonCard>
          <IonButton className=" btnpos btnposc" color="primary" expand="block" type="submit">Create Account</IonButton>
      </form>
      <div className="reglink reglinks" style={{ textAlign: 'center' }}>
        <a className="create" href="#/" onClick={(e) => { e.preventDefault(); goTo('/login')}}>Already have an account? Log in</a>
      </div>
    </IonContent>
  </IonPage>
  );
}

export default SignupPage;