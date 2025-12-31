import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Chats: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mensajes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Bandeja de Entrada</h2>
      </IonContent>
    </IonPage>
  );
};

export default Chats;