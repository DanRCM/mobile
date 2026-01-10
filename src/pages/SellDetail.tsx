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

  if (!product) return <IonPage><IonContent>No encontrado</IonContent></IonPage>;

  // FUNCION PARA GUARDAR CAMBIOS
  const handleSave = () => {
    const index = PRODUCTS.findIndex(p => p.id === product.id);
    if (index !== -1) {
      PRODUCTS[index].title = editName;
      PRODUCTS[index].price = parseFloat(editPrice);
      PRODUCTS[index].description = editDesc;

      presentToast({
        message: 'Producto actualizado con éxito',
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
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
          <IonTitle>Estadísticas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* CABECERA RESUMEN */}
        <IonCard mode="ios">
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

        <h3 style={{ marginLeft: '10px', marginTop: '20px' }}>Rendimiento</h3>

        {/* DISEÑO DE GRILLA CORREGIDO (CENTRADO) */}
        <IonGrid className="ion-no-padding">
          <IonRow>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', margin: '8px' }}>
                <IonCardContent>
                  <IonIcon icon={eyeOutline} color="primary" style={{ fontSize: '28px' }} />
                  <h2 style={{ margin: '8px 0', fontWeight: 'bold' }}>124</h2>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Vistas</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
            <IonCol size="6">
              <IonCard style={{ textAlign: 'center', margin: '8px' }}>
                <IonCardContent>
                  <IonIcon icon={chatbubblesOutline} color="success" style={{ fontSize: '28px' }} />
                  <h2 style={{ margin: '8px 0', fontWeight: 'bold' }}>8</h2>
                  <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Interesados</p>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* ACCIONES */}
        <IonList inset={true} style={{ marginTop: '10px' }}>
          <IonItem button onClick={() => setShowEditModal(true)}>
            <IonIcon slot="start" icon={createOutline} color="primary" />
            <IonLabel>Editar información</IonLabel>
          </IonItem>
          <IonItem button>
            <IonIcon slot="start" icon={statsChartOutline} color="medium" />
            <IonLabel>Ver historial de ventas</IonLabel>
          </IonItem>
        </IonList>

        <IonButton
          expand="block"
          color="danger"
          fill="clear"
          style={{ marginTop: '30px' }}
          onClick={handleDelete}
        >
          <IonIcon slot="start" icon={trashOutline} />
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