import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';

const Profile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>Perfil de Juan Pérez</h2>
        <IonButton color="danger" routerLink="/login">Cerrar Sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Profile;