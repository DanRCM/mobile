import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonThumbnail, IonLabel, IonToggle, 
  IonFab, IonFabButton, IonIcon, IonModal, IonButton,
  IonInput, IonTextarea, IonItemDivider, IonSelect, IonSelectOption,
  IonNote, useIonToast 
} from '@ionic/react';
import { add, camera, cubeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

const Sell: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [showModal, setShowModal] = useState(false);
  
  // Este estado controla la lista local para que el switch se mueva visualmente
  const [myProducts, setMyProducts] = useState(
    PRODUCTS.filter(p => p.sellerName === 'Juan P.').map(p => ({ ...p, stock: 10 }))
  );

  const handleToggle = (id: number) => {
    // 1. Encontrar el producto en el array global y en el local
    const productIndex = PRODUCTS.findIndex(p => p.id === id);
    
    if (productIndex !== -1) {
      // Invertimos el valor real en el array de datos
      const newStatus = !PRODUCTS[productIndex].available;
      PRODUCTS[productIndex].available = newStatus;

      // 2. Actualizar el estado local para que React redibuje los switches
      setMyProducts(prev => 
        prev.map(p => p.id === id ? { ...p, available: newStatus } : p)
      );

      // 3. Mostrar el Toast con botón de cerrar
      present({
        message: newStatus ? 'Publicación ahora visible' : 'Publicación oculta',
        duration: 3000, // Un poco más de tiempo pero con botón
        position: 'bottom',
        color: newStatus ? 'success' : 'warning',
        buttons: [
          {
            text: 'CERRAR',
            role: 'cancel'
          }
        ]
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Tienda</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItemDivider>Gestión de Inventario</IonItemDivider>
          
          {myProducts.map(p => (
            <IonItem key={p.id}>
              <IonThumbnail slot="start" onClick={() => history.push(`/app/sell/detail/${p.id}`)}>
                <img src={p.image} alt={p.title} style={{borderRadius: '8px'}} />
              </IonThumbnail>
              
              <IonLabel onClick={() => history.push(`/app/sell/detail/${p.id}`)}>
                <h2>{p.title}</h2>
                <p>${p.price.toFixed(2)}</p>
                <IonNote color="primary">
                    <IonIcon icon={cubeOutline} /> Stock: {p.stock}
                </IonNote>
              </IonLabel>

              <IonToggle 
                slot="end" 
                checked={p.available} 
                color="success" 
                /* Cambiamos onIonChange por onClick para tener control total del evento */
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggle(p.id);
                }}
              />
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* Modal de nuevo producto (abreviado por brevedad, manten tu código interno) */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Nuevo Producto</IonTitle>
                    <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)}>Cerrar</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                {/* ... tus campos de input aquí ... */}
                <IonButton expand="block" onClick={() => setShowModal(false)}>Publicar</IonButton>
            </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Sell;