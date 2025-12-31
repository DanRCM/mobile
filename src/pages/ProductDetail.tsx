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
  IonItem,
  useIonViewWillEnter
} from '@ionic/react';
import { chatbubbles, locationOutline, timeOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { PRODUCTS, Product } from '../data/mockData'; // Importamos los datos
import './ProductDetail.css'; // Crearemos este CSS después

const ProductDetail: React.FC = () => {
  // 1. Obtener el ID de la URL (ej: /app/product/2)
  const { id } = useParams<{ id: string }>();
  
  // 2. Buscar el producto en nuestra "Base de Datos" falsa
  // Convertimos el ID a número porque useParams devuelve strings
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  // Si no encuentra el producto (caso raro), mostramos error
  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <IonPage>
      {/* HEADER con Botón de Atrás */}
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            {/* defaultHref es a donde vuelve si recargas la página y no hay historial */}
            <IonBackButton defaultHref="/app/home" text="Volver" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        
        {/* IMAGEN HERO (Grande) */}
        <div className="detail-image-container">
          <img src={product.image} alt={product.title} />
          <div className={`detail-status ${product.available ? 'available' : 'sold'}`}>
            {product.available ? '🟢 Disponible' : '🔴 Agotado'}
          </div>
        </div>

        <div className="detail-info-container">
          {/* TÍTULO Y PRECIO */}
          <div className="detail-header">
            <h1 className="detail-title">{product.title}</h1>
            <span className="detail-price">${product.price.toFixed(2)}</span>
          </div>

          <div className="detail-category-chip">{product.category}</div>

          {/* DESCRIPCIÓN */}
          <p className="detail-description">
            Este es un producto increíble ideal para estudiantes de la ESPOL. 
            (Aquí iría la descripción real del producto si la tuviéramos en los datos).
            Estado: 10/10, poco uso.
          </p>

          <hr className="divider" />

          {/* TARJETA DEL VENDEDOR */}
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

      {/* FOOTER FIJO CON ACCIÓN PRINCIPAL */}
      <IonFooter>
        <IonToolbar className="footer-toolbar">
          <IonButton expand="block" shape="round" className="contact-btn">
            <IonIcon slot="start" icon={chatbubbles} />
            Contactar Vendedor
          </IonButton>
        </IonToolbar>
      </IonFooter>

    </IonPage>
  );
};

export default ProductDetail;