import React from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonBadge, IonIcon, IonButton } from '@ionic/react';
import { locationOutline, chatbubbleEllipsesOutline } from 'ionicons/icons';
import { Product } from '../data/mockData';
import './ProductCard.css'; // Crearemos este CSS en un momento

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <IonCard className="product-card">
      {/* Imagen del Producto */}
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
        
        <IonButton expand="block" fill="outline" size="small" className="action-btn">
          <IonIcon slot="start" icon={chatbubbleEllipsesOutline} />
          Me interesa
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
};

export default ProductCard;