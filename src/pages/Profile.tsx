import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonAvatar, IonLabel, IonItem, IonList, IonIcon, 
  IonButton, IonToggle, IonItemDivider, IonNote, useIonViewWillEnter
} from '@ionic/react';
import { 
  settingsOutline, star, walletOutline, 
  notificationsOutline, moonOutline, logOutOutline,
  shieldCheckmarkOutline, schoolOutline
} from 'ionicons/icons';
import '../themes/Profile.css';
import { PRODUCTS } from '../data/mockData';

const Profile: React.FC = () => {
  const myProducts = PRODUCTS.filter(p => p.sellerName === 'Juan P.');
  // Necesitamos mostrar el numero de productos que no estan agotados
  const activeProductsCount = myProducts.filter(p => p.available).length;
  const [tick, setTick] = useState(0);

  // Cada vez que entres a la pestaña "Explorar", forzamos un refresco
  useIonViewWillEnter(() => {
    setTick(t => t + 1);
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        {/* CABECERA DE PERFIL ESTILO "HERO" */}
        <div className="profile-header">
          <IonAvatar className="profile-avatar">
            <img src="https://ui-avatars.com/api/?name=Juan+Perez&size=128&background=0D8ABC&color=fff" alt="Juan" />
          </IonAvatar>
          <h1 className="profile-name">Juan Pérez</h1>
          <p style={{ margin: '5px 0' }}>Ingeniería en Computación</p>
          
          <div className="reputation-badge">
            <IonIcon icon={star} color="warning" />
            <span>4.8 Reputación (24 ventas)</span>
          </div>

          <div className="profile-stats-row">
            <div className="stat-item">
              <span className="stat-value">12</span>
              <span className="stat-label">Ventas</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{activeProductsCount}</span>
              <span className="stat-label">Activos</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">30</span>
              <span className="stat-label">Favoritos</span>
            </div>
          </div>
        </div>

        {/* LISTA DE OPCIONES */}
        <IonList inset={true} style={{ marginTop: '20px' }}>
          <IonItemDivider>Información Académica</IonItemDivider>
          <IonItem lines="full">
            <IonIcon slot="start" icon={schoolOutline} color="medium" />
            <IonLabel>
              <h2>Facultad</h2>
              <p>FIEC - Prosperina</p>
            </IonLabel>
          </IonItem>
          <IonItem lines="full">
            <IonIcon slot="start" icon={shieldCheckmarkOutline} color="success" />
            <IonLabel>
              <h2>Estado Estudiantil</h2>
              <p>Matriculado - Verificado</p>
            </IonLabel>
          </IonItem>

          <IonItemDivider>Preferencias de la App</IonItemDivider>
          <IonItem>
            <IonIcon slot="start" icon={moonOutline} />
            <IonLabel>Modo Oscuro</IonLabel>
            <IonToggle slot="end" checked={true} />
          </IonItem>
          <IonItem button>
            <IonIcon slot="start" icon={notificationsOutline} />
            <IonLabel>Notificaciones</IonLabel>
            <IonNote slot="end">Activadas</IonNote>
          </IonItem>
          <IonItem button>
            <IonIcon slot="start" icon={walletOutline} />
            <IonLabel>Métodos de Cobro</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon slot="start" icon={settingsOutline} />
            <IonLabel>Configuración de Cuenta</IonLabel>
          </IonItem>
        </IonList>

        {/* BOTÓN DE CIERRE DE SESIÓN */}
        <div className="ion-padding">
          <IonButton 
            expand="block" 
            color="danger" 
            fill="clear" 
            routerLink="/login" 
            routerDirection="root"
          >
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar Sesión
          </IonButton>
          <p className="ion-text-center" style={{ fontSize: '0.7rem', color: 'gray' }}>
            EspolMarket v1.0.0-beta
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profile;