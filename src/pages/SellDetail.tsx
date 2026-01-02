import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonList, IonItem, IonLabel, 
  IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonButton
} from '@ionic/react';
import { useParams } from 'react-router';
import { eyeOutline, chatbubblesOutline, statsChartOutline, createOutline } from 'ionicons/icons';
import { PRODUCTS } from '../data/mockData';

const SellDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) return null;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/sell" />
          </IonButtons>
          <IonTitle>Estadísticas del Producto</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={product.image} style={{ width: '80px', height: '80px', borderRadius: '10px', objectFit: 'cover' }} />
              <div>
                <h2 style={{ margin: 0 }}>{product.title}</h2>
                <p style={{ margin: 0 }}>Precio actual: <strong>${product.price.toFixed(2)}</strong></p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        <h3 style={{ marginLeft: '10px' }}>Rendimiento</h3>
        
        <IonGrid>
          <IonRow>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', margin: '5px' }}>
                <IonCardContent>
                  <IonIcon icon={eyeOutline} color="primary" style={{ fontSize: '24px' }} />
                  <h2 style={{ margin: '5px 0' }}>124</h2>
                  <p style={{ fontSize: '0.8rem' }}>Vistas</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', margin: '5px' }}>
                <IonCardContent>
                  <IonIcon icon={chatbubblesOutline} color="success" style={{ fontSize: '24px' }} />
                  <h2 style={{ margin: '5px 0' }}>8</h2>
                  <p style={{ fontSize: '0.8rem' }}>Interesados</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonList inset={true}>
          <IonItem button>
            <IonIcon slot="start" icon={createOutline} />
            <IonLabel>Editar información</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon slot="start" icon={statsChartOutline} />
            <IonLabel>Ver historial de ventas</IonLabel>
          </IonItem>
        </IonList>

        <IonButton expand="block" color="danger" fill="outline" style={{ marginTop: '20px' }}>
          Eliminar Publicación
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SellDetail;