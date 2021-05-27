import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import './NothingBook.css';

interface ContainerProps {
  name: string;
}

const NothingBook: React.FC = () => {
    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Booking</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <div className="container">
          <strong>No Bookings</strong>
          <p>Will be shown once driver assigned... </p>
        </div>
        </IonContent>
        </IonPage>
      );
};

export default NothingBook;