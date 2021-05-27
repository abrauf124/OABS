import { IonButton, IonButtons, IonContent, IonHeader, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';

const Page = () => {
  type Item = {
    src: string;
    text: string;
  };
  const items: Item[] = [
    { src: "http://placekitten.com/g/200/300", text: "a picture of a cat" },
  ];

  const { name } = useParams<{ name: string }>();

  return (
    <IonPage>
      <IonContent color="secondary" fullscreen>
        <IonTitle className="t" class='ion-text-center ion-padding'size="large">Welcome!</IonTitle>

        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );
};

export default Page;
