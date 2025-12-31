import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Sell: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Tienda</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Gestión de mis ventas</h2>
      </IonContent>
    </IonPage>
  );
};

export default Sell;