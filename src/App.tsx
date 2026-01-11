import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { storefront, chatbubbles, addCircle, person } from 'ionicons/icons';

/* Importación de nuestras Páginas */
import Login from './pages/Login';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Chats from './pages/Chats';
import ChatRoom from './pages/ChatRoom';
import Sell from './pages/Sell';
import Profile from './pages/Profile';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* App.tsx */
import '@ionic/react/css/palettes/dark.class.css';
import SellDetail from './pages/SellDetail';
import SellerProfile from './pages/SellerProfile';
import SalesHistory from './pages/SellHistory';
import './themes/App.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        {/* RUTA 1: El Login (Fuera de las Tabs) */}
        <Route exact path="/login">
          <Login />
        </Route>

        {/* RUTA 2: La Aplicación Principal (Con Tabs) */}
        <Route path="/app">
          <IonTabs>
            <IonRouterOutlet>
              {/* Aquí definimos qué pantalla carga cada pestaña */}
              <Route exact path="/app/home">
                <Home />
              </Route>
              {/* NUEVA RUTA: DETALLE DE PRODUCTO */}
              {/* Los dos puntos :id indican que es un parámetro variable */}
              <Route path="/app/product/:id">
                <ProductDetail />
              </Route>
              <Route exact path="/app/chats">
                <Chats />
              </Route>
              {/* NUEVA RUTA: SALA DE CHAT */}
              <Route path="/app/chats/:id">
                <ChatRoom />
              </Route>
              <Route exact path="/app/sell">
                <Sell />
              </Route>
              <Route path="/app/seller-profile/:name">
                <SellerProfile />
              </Route>
              <Route path="/app/sell/detail/:id">
                <SellDetail />
              </Route>
              <Route path="/app/sell/history/:id" component={SalesHistory} exact />
              <Route exact path="/app/profile">
                <Profile />
              </Route>
              {/* Redirección por defecto: Si entran a /app, van al Home */}
              <Route exact path="/app">
                <Redirect to="/app/home" />
              </Route>
            </IonRouterOutlet>

            {/* La Barra de Navegación Inferior */}
            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/app/home">
                <IonIcon icon={storefront} />
                <IonLabel>Explorar</IonLabel>
              </IonTabButton>

              <IonTabButton tab="chats" href="/app/chats">
                <IonIcon icon={chatbubbles} />
                <IonLabel>Chats</IonLabel>
              </IonTabButton>

              <IonTabButton tab="sell" href="/app/sell">
                <IonIcon icon={addCircle} />
                <IonLabel>Vender</IonLabel>
              </IonTabButton>

              <IonTabButton tab="profile" href="/app/profile">
                <IonIcon icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </Route>

        {/* RUTA DEFAULT: Redirigir al Login si la ruta está vacía */}
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;