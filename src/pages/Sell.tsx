import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonThumbnail, IonLabel, IonToggle, 
  IonFab, IonFabButton, IonIcon, IonModal, IonButton,
  IonInput, IonTextarea, IonItemDivider, IonSelect, IonSelectOption,
  IonBadge, IonNote
} from '@ionic/react';
import { add, camera, cubeOutline } from 'ionicons/icons';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

const Sell: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  // Simulamos que estos productos tienen un stock inicial
  const [myProducts, setMyProducts] = useState(
    PRODUCTS.slice(0, 3).map(p => ({ ...p, stock: Math.floor(Math.random() * 10) + 1 }))
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Tienda</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>
          <IonItemDivider>Tus productos publicados</IonItemDivider>
          {myProducts.map(p => (
            <IonItem key={p.id} button detail={true} routerLink={`/app/sell/detail/${p.id}`}>
              <IonThumbnail slot="start">
                <img src={p.image} alt={p.title} style={{borderRadius: '8px'}} />
              </IonThumbnail>
              <IonLabel>
                <h2>{p.title}</h2>
                <p>${p.price.toFixed(2)}</p>
                <IonNote color="primary">
                    <IonIcon icon={cubeOutline} style={{ verticalAlign: 'middle' }} /> Stock: {p.stock} uds.
                </IonNote>
              </IonLabel>
              <IonToggle 
                slot="end" 
                checked={p.available} 
                color="success" 
                onClick={(e) => e.stopPropagation()} 
              />
            </IonItem>
          ))}
        </IonList>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowModal(true)}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>

        {/* MODAL PARA NUEVO PRODUCTO */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Nuevo Producto</IonTitle>
              <IonButton slot="end" fill="clear" onClick={() => setShowModal(false)}>Cerrar</IonButton>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <div style={{ textAlign: 'center', padding: '20px', background: '#f4f4f4', borderRadius: '15px', marginBottom: '15px' }}>
                <IonIcon icon={camera} style={{ fontSize: '48px', color: '#666' }} />
                <p>Subir foto del producto</p>
            </div>
            
            <IonItem>
              <IonLabel position="stacked">Nombre del producto</IonLabel>
              <IonInput placeholder="Ej: Bolón mixto"></IonInput>
            </IonItem>

            <div style={{ display: 'flex' }}>
                <IonItem style={{ flex: 1 }}>
                  <IonLabel position="stacked">Precio ($)</IonLabel>
                  <IonInput type="number" placeholder="0.00"></IonInput>
                </IonItem>
                <IonItem style={{ flex: 1 }}>
                  <IonLabel position="stacked">Stock inicial</IonLabel>
                  <IonInput type="number" placeholder="Cant."></IonInput>
                </IonItem>
            </div>

            <IonItem>
              <IonLabel position="stacked">Categoría</IonLabel>
              <IonSelect placeholder="Selecciona una">
                {CATEGORIES.filter(c => c !== 'Todo').map(c => (
                    <IonSelectOption key={c} value={c}>{c}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea placeholder="Cuéntanos más de tu producto..."></IonTextarea>
            </IonItem>

            <IonButton expand="block" style={{ marginTop: '20px' }} onClick={() => setShowModal(false)}>
              Publicar Producto
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Sell;