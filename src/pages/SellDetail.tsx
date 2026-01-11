import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonBackButton, IonList, IonItem, IonLabel,
  IonIcon, IonCard, IonCardContent, IonGrid, IonRow, IonCol,
  IonButton, IonModal, IonInput, IonTextarea, IonSelect,
  IonSelectOption, useIonAlert, useIonToast
} from '@ionic/react';
import { useHistory, useParams } from 'react-router';
import {
  eyeOutline, chatbubblesOutline, statsChartOutline,
  createOutline, camera, trashOutline
} from 'ionicons/icons';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

const SellDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();

  // Buscamos el producto
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  // ESTADOS PARA LA EDICIÓN
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(product?.title || '');
  const [editPrice, setEditPrice] = useState(product?.price.toString() || '');
  const [editDesc, setEditDesc] = useState(product?.description || '');
  const [editStock, setEditStock] = useState(product?.stock?.toString() || '0');

  if (!product) return <IonPage><IonContent>No encontrado</IonContent></IonPage>;

  // FUNCION PARA GUARDAR CAMBIOS
  const handleSave = () => {
    if (parseFloat(editPrice) <= 0 || parseInt(editStock) < 0) {
      presentToast({
        message: 'El precio debe ser mayor a 0 y el stock no puede ser negativo.',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    const index = PRODUCTS.findIndex(p => p.id === product.id);
    if (index !== -1) {
      PRODUCTS[index].title = editName;
      PRODUCTS[index].price = parseFloat(editPrice);
      PRODUCTS[index].stock = parseInt(editStock);

      // Si el stock llega a 0, se oculta automáticamente
      if (parseInt(editStock) === 0) PRODUCTS[index].available = false;

      presentToast({ message: 'Datos actualizados', duration: 2000, color: 'success' });
      setShowEditModal(false);
    }
  };

  // FUNCION PARA ELIMINAR (Simulación real)
  const handleDelete = () => {
    presentAlert({
      header: '¿Eliminar publicación?',
      message: 'Esta acción no se puede deshacer.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            const index = PRODUCTS.findIndex(p => p.id === product.id);
            if (index !== -1) {
              // 1. Eliminamos del array global definitivamente
              PRODUCTS.splice(index, 1);

              // 2. Notificamos al usuario
              presentToast({
                message: 'Publicación eliminada permanentemente',
                duration: 2000,
                color: 'danger'
              });

              // 3. Volvemos atrás. Al entrar a 'Sell', el useIonViewWillEnter 
              // hará que la lista se vuelva a calcular y el ítem ya no estará.
              history.replace('/app/sell');
            }
          }
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/app/sell" />
          </IonButtons>
          <IonTitle>Detalle</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" >
        {/* CABECERA RESUMEN */}
        
        <IonCard mode="ios" style={{ border: '1px solid var(--ion-color-step-200, #ccc)', borderRadius: '12px', margin: '10px' }}>
          <IonCardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <img src={product.image} style={{ width: '70px', height: '70px', borderRadius: '12px', objectFit: 'cover' }} />
              <div>
                <h2 style={{ margin: 0, fontWeight: 'bold' }}>{product.title}</h2>
                <p style={{ margin: 0, fontSize: '0.9rem' }}>Precio: <strong>${product.price.toFixed(2)}</strong></p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* RENDIMIENTO */}
        <h3 style={{ marginLeft: '16px', fontSize: '1.1rem', fontWeight: 'bold', marginTop: '20px' }}>
          Rendimiento
        </h3>

        <div style={{
          display: 'flex',
          justifyContent: 'center', // Centra el conjunto
          gap: '12px',              // Espacio exacto entre cuadros
          padding: '0 16px',
        }}>
          {/* CUADRO 1 */}
          <div style={{
            flex: 1,                // Ocupan el mismo ancho
            aspectRatio: '1/1',
            maxWidth: '160px',      // Para que no crezcan infinito en pantallas grandes
            background: 'var(--ion-color-step-150, #9998a2)', // Gris que cambia en Dark Mode
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <IonIcon icon={eyeOutline} color="primary" style={{ fontSize: '28px' }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '8px', color: 'var(--ion-text-color)' }}>124</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6, color: 'var(--ion-text-color)' }}>Vistas</span>
          </div>

          {/* CUADRO 2 */}
          <div style={{
            flex: 1,
            aspectRatio: '1/1',
            maxWidth: '160px',
            background: 'var(--ion-color-step-150, #9998a2)',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <IonIcon icon={chatbubblesOutline} color="success" style={{ fontSize: '28px' }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 'bold', marginTop: '8px', color: 'var(--ion-text-color)' }}>8</span>
            <span style={{ fontSize: '0.8rem', opacity: 0.6, color: 'var(--ion-text-color)' }}>Interesados</span>
          </div>
        </div>

        {/* ACCIONES 
        Añadimos un borde a la lista para que resalte más en modo claro
        */}
        <IonList inset={true} style={{ marginTop: '10px' }} >
          <IonItem button onClick={() => setShowEditModal(true)} >
            <IonIcon slot="start" icon={createOutline} color="primary" />
            <IonLabel>Editar información</IonLabel>
          </IonItem>
          {/* CONECTANDO EL HISTORIAL AQUÍ */}
          <IonItem button routerLink={`/app/sell/history/${product.id}`}>
            <IonIcon slot="start" icon={statsChartOutline} color="medium" />
            <IonLabel>Ver historial de ventas</IonLabel>
          </IonItem>
        </IonList>

        {/* BOTÓN DE ELIMINAR */}
        <IonButton
          expand="block"
          color="danger"
          fill="clear"
          style={{ marginTop: '30px', border: '1px solid var(--ion-color-step-200, #ccc)', borderRadius: '12px' }}
          onClick={handleDelete}
        >
          <IonIcon slot="start" icon={trashOutline}  />
          Eliminar Publicación
        </IonButton>

        {/* MODAL DE EDICIÓN (Reutilizando formulario) */}
        <IonModal isOpen={showEditModal} onDidDismiss={() => setShowEditModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Editar Producto</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowEditModal(false)}>Cerrar</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Nombre</IonLabel>
              <IonInput value={editName} onIonInput={e => setEditName(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Precio ($)</IonLabel>
              <IonInput type="number" value={editPrice} onIonInput={e => setEditPrice(e.detail.value!)} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea value={editDesc} onIonInput={e => setEditDesc(e.detail.value!)} rows={4} />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Stock Disponible</IonLabel>
              <IonInput
                type="number"
                value={editStock}
                onIonInput={e => setEditStock(e.detail.value!)}
                placeholder="Ej: 10"
              />
            </IonItem>

            <IonButton expand="block" style={{ marginTop: '30px' }} onClick={handleSave}>
              Guardar Cambios
            </IonButton>
          </IonContent>
        </IonModal>

      </IonContent>
    </IonPage>
  );
};

export default SellDetail;