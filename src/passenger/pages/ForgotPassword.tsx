import React, { useState, FormEvent } from 'react';

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
  IonCard
} from "@ionic/react";
import { History } from 'history';
import { RouteComponentProps } from 'react-router';
import './Page.css';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../user';
import {toast} from '../../toast'
interface ItemProps extends RouteComponentProps<{ tab: string }> {
  history: History;
}

const ForgotPasswordPage = ({ history, match }: ItemProps) => {
  const [ email, setEmail ] = useState('');
  const [ formErrors, setFormErrors ] = useState(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(email);
      toast(`Password reset link send to ${email}`)
    } catch (e) {
      setFormErrors(e.code);
    }
  }

  return (
  <IonPage>
    <IonHeader>
      <IonToolbar >
        <IonButtons slot="start">
          <IonBackButton defaultHref={`/`} />
        </IonButtons>
        <IonTitle>Reset Password</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      {formErrors ? (
        <div>
          Unable to reset password. Check your information and try again.
        </div>
      ) : (null)}
      <form onSubmit={e => handleSubmit(e)} action="post">
        <IonCard  className="container1">
          <IonItem>
            <IonLabel>Email</IonLabel>
            <IonInput  type="email" value={email} onInput={(e: any) => setEmail(e.currentTarget.value)} />
          </IonItem>
        
        </IonCard>
          <IonButton className="btnpos btnposf"expand="block" type="submit">Reset Password</IonButton>
      </form>
      <div className="reglink">
        <Link className="create" to='/page'>Back to login</Link>
      </div>
    </IonContent>
  </IonPage>
  );
}

export default ForgotPasswordPage;