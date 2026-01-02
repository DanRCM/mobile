import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonFooter,
  IonButton,
  IonIcon,
  IonAvatar,
  IonLabel,
  IonItem
} from '@ionic/react';
import { useHistory, useParams } from 'react-router-dom'; // Importamos useHistory
import { chatbubbles, locationOutline, timeOutline } from 'ionicons/icons';
import { PRODUCTS } from '../data/mockData';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const history = useHistory(); // <--- Usamos history en lugar de router
  const { id } = useParams<{ id: string }>();

  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return <IonPage><IonContent>Producto no encontrado</IonContent></IonPage>;
  }

  const contactSeller = () => {
    const initialMsg = `Hola, me interesa tu producto "${product?.title}". ¿Sigue disponible?`;

    history.push({
      pathname: '/app/chats/1',
      state: { prefilledMessage: initialMsg }
    });
  };

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/home" text="Volver" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="detail-image-container">
          <img src={product.image} alt={product.title} />
          <div className={`detail-status ${product.available ? 'available' : 'sold'}`}>
            {product.available ? '🟢 Disponible' : '🔴 Agotado'}
          </div>
        </div>

        <div className="detail-info-container">
          <div className="detail-header">
            <h1 className="detail-title">{product.title}</h1>
            <span className="detail-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="detail-category-chip">{product.category}</div>

          <p className="detail-description">
            Este es un producto increíble ideal para estudiantes de la ESPOL.
            Estado: 10/10, poco uso.
          </p>

          <hr className="divider" />

          <h3 className="section-title">Sobre el Vendedor</h3>
          <div className="seller-card">
            <IonItem lines="none" className="seller-item">
              <IonAvatar slot="start">
                <img src={`https://ui-avatars.com/api/?name=${product.sellerName}&background=random`} alt="avatar" />
              </IonAvatar>
              <IonLabel>
                <h2>{product.sellerName}</h2>
                <p>Estudiante FEPOL</p>
              </IonLabel>
            </IonItem>

            <div className="seller-meta">
              <span><IonIcon icon={locationOutline} /> {product.location}</span>
              <span><IonIcon icon={timeOutline} /> Lunes y Jueves</span>
            </div>
          </div>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar className="footer-toolbar">
          <IonButton
            expand="block"
            shape="round"
            className="contact-btn"
            onClick={contactSeller}
          >
            <IonIcon slot="start" icon={chatbubbles} />
            Contactar Vendedor
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ProductDetail;