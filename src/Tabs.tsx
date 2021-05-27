import React from 'react';

import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';

import { Route, Redirect, RouteComponentProps } from 'react-router';

import { home, search, person } from 'ionicons/icons';
import Home from './passenger/pages/Home';
import Bookings from './passenger/pages/Bookings';
import Profile from './passenger/pages/Profile';


interface ItemProps extends RouteComponentProps<{ tab: string }> {
}

const Tabs = ({ history, match }: ItemProps) => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/app/home" component={Home} exact={true} />
        <Route path="/app/bookings" component={Bookings} exact={true} />
        <Route path="/app/profile" component={Profile} />
        <Route path="/" render={() => <Redirect to="/page" />} exact={true} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/app/home">
          <IonIcon icon={home} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="bookings" href="/app/bookings">
          <IonIcon icon={search} />
          <IonLabel>Bookings</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/app/profile">
          <IonIcon icon={person} />
          <IonLabel>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}

export default Tabs;