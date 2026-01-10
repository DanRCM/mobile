import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonAvatar, IonLabel, IonItem, 
  IonGrid, IonRow, IonCol, IonBadge, IonIcon
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { star, locationOutline, schoolOutline } from 'ionicons/icons';
import { PRODUCTS } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const SellerProfile: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const { location } = PRODUCTS.find(p => p.sellerName === name) || { location: 'Desconocida' };
  const { user_status } = PRODUCTS.find(p => p.sellerName === name) || { user_status: 'Desconocido' };

  // Filtramos los productos de este vendedor específico
  const sellerProducts = PRODUCTS.filter(p => p.sellerName === name);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Perfil del Vendedor</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* CABECERA DEL PERFIL PÚBLICO */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <IonAvatar style={{ width: '90px', height: '90px', margin: '0 auto 10px' }}>
            <img src={`https://ui-avatars.com/api/?name=${name}&size=128&background=random`} alt={name} />
          </IonAvatar>
          <h2 style={{ fontWeight: 'bold', margin: 0 }}>{name}</h2>
          <IonBadge color="warning" style={{ marginTop: '5px' }}>
            <IonIcon icon={star} /> 4.8 Reputación
          </IonBadge>
          
          <div style={{ marginTop: '15px', color: 'gray', fontSize: '0.9rem' }}>
            <p><IonIcon icon={schoolOutline} /> {user_status} </p>
            <p><IonIcon icon={locationOutline} /> Suele entregar en: {location} / ESPOL</p>
          </div>
        </div>

        <h3 style={{ borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
          Otros productos de {name}
        </h3>

        {/* GRILLA DE SUS PRODUCTOS */}
        <IonGrid>
          <IonRow>
            {sellerProducts.map(product => (
              <IonCol size="6" key={product.id}>
                <ProductCard product={product} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SellerProfile;