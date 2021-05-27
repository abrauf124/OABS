import React from 'react';

import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';

import { Route, Redirect, RouteComponentProps } from 'react-router';

import { home, search, person } from 'ionicons/icons';
import DProfile from './driver/DProfie';
import DHome from './driver/DHome';;


interface ItemProps extends RouteComponentProps<{ tab: string }> {
}

const DTabs = ({ history, match }: ItemProps) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/dapp/home" component={DHome} exact={true} />
   
        <Route path="/dapp/profile" component={DProfile} />
        <Route path="/" render={() => <Redirect to="/page" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/dapp/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
      
        <IonTabButton tab="profile" href="/dapp/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default DTabs;