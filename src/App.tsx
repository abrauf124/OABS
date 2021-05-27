import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  IonPage
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { AppContextProvider } from './State';
import Page from './passenger/pages/Page';
import LoginPage from './passenger/pages/Login';
import ForgotPasswordPage from './passenger/pages/ForgotPassword';
import SignupPage from './passenger/pages/Signup';
import Tabs from './Tabs';
import DTabs from'./DTabs';
import DriverSignupPage from './driver/DriverSignup';
import DriverLoginPage from './driver/DriverLogin';

const App: React.FC = () => (
  <AppContextProvider>
    <IonApp>
      <IonReactRouter>
        <IonPage>
          <IonRouterOutlet>
            <Route path="/page" component={Page} exact={true} />
            <Route path="/login" component={LoginPage} exact={true} />
            <Route path="/dlogin" component={DriverLoginPage} exact={true} />
            <Route path="/forgot-password" component={ForgotPasswordPage} exact={true} />
            <Route path="/signup" component={SignupPage} exact={true} />
            <Route path="/dsignup" component={DriverSignupPage} exact={true} />
            <Route exact={true} path="/" render={() => <Redirect to="/page" />} />
          </IonRouterOutlet>
          <Route path="/app" component={Tabs} />
          <Route path="/dapp" component={DTabs} />
        </IonPage>
      </IonReactRouter>
    </IonApp>
  </AppContextProvider>
);

export default App;
