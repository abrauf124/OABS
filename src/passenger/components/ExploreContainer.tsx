import { IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonPage } from '@ionic/react';
import React from 'react';
import './ExploreContainer.css';

interface ContainerProps {

  name: string;
  
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <IonCard className="container">
      <IonCardHeader>
      </IonCardHeader>
      <IonCardContent>
      
          <IonButton type="button" color="primary" fill="solid" expand="block" routerLink="/login">
            Passenger
          </IonButton>
          <IonCardContent class='ion-text-center'  >OR</IonCardContent>
          <IonButton type="button" color="primary" fill="solid" expand="block" routerLink="/dsignup">
            Driver
          </IonButton>

   
      </IonCardContent>
    </IonCard>
  );
};

export default ExploreContainer;
