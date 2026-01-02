import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonBadge, IonIcon, IonButton } from '@ionic/react';
import { locationOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { Product } from '../data/mockData';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const history = useHistory();

  // Función para ir al Detalle (al tocar la tarjeta)
  const goToDetail = () => {
    history.push(`/app/product/${product.id}`);
  };

  // Función para ir al Chat (al tocar el botón)
  const goToChat = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita comportamiento por defecto
    e.stopPropagation(); // Detiene la propagación al padre (la tarjeta)

    history.push({
      pathname: '/app/chats/1',
      state: {
        prefilledMessage: `Hola, vi tu anuncio de "${product.title}" en el Home. ¿Sigue disponible?`
      }
    });
  };

  return (
    <IonCard
      className="product-card"
      onClick={goToDetail} // Ahora manejamos el clic de la tarjeta aquí
      button={true} // Esto mantiene el efecto visual de "clic" de Ionic
    >
      <div className="card-image-container">
        <img src={product.image} alt={product.title} />
        {!product.available && (
          <IonBadge color="medium" className="status-badge">Agotado</IonBadge>
        )}
      </div>

      <IonCardHeader>
        <div className="price-tag">${product.price.toFixed(2)}</div>
        <IonCardSubtitle>{product.category}</IonCardSubtitle>
        <IonCardTitle className="card-title">{product.title}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <div className="seller-info">
          <span className="seller-name">Vende: {product.sellerName}</span>
        </div>
        <div className="location-info">
          <IonIcon icon={locationOutline} /> {product.location}
        </div>

        <IonButton
          expand="block"
          fill="outline"
          size="small"
          className="action-btn"
          onClick={goToChat} // Manejador independiente
        >
          <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
          Me interesa
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;