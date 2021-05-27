import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSearchbar,
    useIonViewDidEnter,
    IonAvatar,
    IonButton,
    IonCard,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonList
  } from '@ionic/react';
  import { History } from 'history';
  import React, { useEffect, useContext, useRef, useState } from 'react';
  import { authGuard } from '../../Routing';
  import { RouteComponentProps } from 'react-router';
  import { AppContext } from '../../State';
  import mobiscroll from '@mobiscroll/react-lite';
  import '@mobiscroll/react-lite/dist/css/mobiscroll.min.css';
  
  interface ItemProps extends RouteComponentProps<{ tab: string }> {
    history: History;
    
  }
  
  
  
  
     interface DemoProps {
    /* you can define props type definitions here */
  }
  
  interface DemoState {
    /* you can define state type definitions here */
  }
  
  const Rating: React.FC= () => {
      
          return (
            
              <mobiscroll.Form
                  theme="material" 
                  themeVariant="light"
              >
                  <mobiscroll.FormGroup>
                      <mobiscroll.FormGroupTitle>Rating</mobiscroll.FormGroupTitle>
                      
                      <mobiscroll.Rating color="success" val="right" max={5} value={1} template="{value}/{max}">
                          Value
                      </mobiscroll.Rating>
                      <mobiscroll.Rating disabled>
                          Disabled
                      </mobiscroll.Rating>
                  </mobiscroll.FormGroup>
          
              </mobiscroll.Form>
      
          );
      
  }
  export default Rating