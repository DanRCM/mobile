import React, { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonThumbnail, IonLabel, IonToggle,
  IonFab, IonFabButton, IonIcon, IonModal, IonButton,
  IonInput, IonTextarea, IonItemDivider, IonSelect, IonSelectOption,
  IonNote, useIonToast, useIonViewWillEnter
} from '@ionic/react';
import { add, camera, cubeOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

const Sell: React.FC = () => {
  const history = useHistory();
  const [present] = useIonToast();
  const [showModal, setShowModal] = useState(false);

  // ESTADOS PARA EL NUEVO PRODUCTO
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [tempImage, setTempImage] = useState<string | null>(null);

  const [myProducts, setMyProducts] = useState<any[]>([]);

  // Cada vez que el usuario entre a la pestaña "Mi Tienda"
  useIonViewWillEnter(() => {
    // Filtramos los productos que quedan en el array global
    const updatedList = PRODUCTS.filter(p => p.sellerName === 'Juan P.');
    setMyProducts(updatedList);
  });

  // Función de cámara
  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false, // Puedes poner true si quieres que el usuario recorte
        resultType: CameraResultType.Uri, // Devuelve una ruta web usable
        source: CameraSource.Prompt, // Pregunta si quiere Cámara o Galería
        promptLabelHeader: 'Añadir foto del producto',
        promptLabelPhoto: 'Elegir de la galería',
        promptLabelPicture: 'Tomar foto ahora'
      });

      // Guardamos la ruta de la imagen para mostrarla en el modal
      if (image.webPath) {
        setTempImage(image.webPath);
      }
    } catch (error) {
      console.log('Usuario canceló la cámara');
    }
  };

  const handlePublish = () => {
    if (!newName || !newPrice || !newCategory) {
      present({
        message: 'Por favor, llena los campos básicos',
        duration: 2000,
        color: 'danger'
      });
      return;
    }

    // 1. Crear el nuevo objeto producto
    const newProduct = {
      id: PRODUCTS.length + 1,
      title: newName,
      price: parseFloat(newPrice),
      category: newCategory,
      image: tempImage || 'https://via.placeholder.com/150?text=Sin+Foto',
      description: newDescription,
      sellerName: 'Juan P.', // Tu usuario
      user_status: 'Estudiante',
      location: 'FEPOL',
      available: true
    };

    // 2. Insertar en la "base de datos" global
    PRODUCTS.push(newProduct);

    // 3. Actualizar la lista local
    setMyProducts([...myProducts, { ...newProduct, stock: parseInt(newStock) || 1 }]);

    // 4. Limpiar formulario y cerrar modal
    setShowModal(false);
    resetForm();

    // 5. Feedback visual
    present({
      message: '¡Producto publicado! Ya aparece en el Home.',
      duration: 2500,
      color: 'success',
      icon: checkmarkCircleOutline
    });
  };

  const resetForm = () => {
    setNewName('');
    setNewPrice('');
    setNewStock('');
    setNewCategory('');
    setNewDescription('');
    setTempImage(null);
  };

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
          <IonItemDivider>Tus productos en venta</IonItemDivider>
          {myProducts.map(p => (
            <IonItem key={p.id}>
              <IonThumbnail slot="start" onClick={() => history.push(`/app/sell/detail/${p.id}`)}>
                <img src={p.image} alt={p.title} style={{ borderRadius: '8px' }} />
              </IonThumbnail>
              <IonLabel onClick={() => history.push(`/app/sell/detail/${p.id}`)}>
                <h2>{p.title}</h2>
                <p>${p.price.toFixed(2)}</p>
                <IonNote color="primary"><IonIcon icon={cubeOutline} /> Stock: {p.stock}</IonNote>
              </IonLabel>
              <IonToggle slot="end" checked={p.available} color="success" onClick={(e) => { e.stopPropagation(); handleToggle(p.id); }} />
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
            <div
              onClick={takePhoto}
              style={{
                textAlign: 'center',
                padding: '20px',
                background: tempImage ? `url(${tempImage}) center/cover no-repeat` : '#e0e0e0',
                borderRadius: '15px',
                marginBottom: '15px',
                border: '2px dashed #b0b0b0',
                height: '180px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center', // Centra horizontalmente
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer'
              }}>
              {!tempImage ? (
                <div style={{ color: '#444' }}> {/* Color oscuro para que se vea sobre el gris */}
                  <IonIcon icon={camera} style={{ fontSize: '48px', marginBottom: '8px' }} />
                  <p style={{ margin: 0, fontWeight: '500' }}>Tocar para tomar foto real</p>
                </div>
              ) : (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  padding: '10px',
                  fontSize: '0.8rem'
                }}>
                  Tocar para cambiar foto
                </div>
              )}
            </div>

            <IonItem>
              <IonLabel position="stacked">Nombre del producto</IonLabel>
              <IonInput value={newName} onIonInput={e => setNewName(e.detail.value!)} placeholder="Ej: Bolón mixto"></IonInput>
            </IonItem>

            <div style={{ display: 'flex' }}>
              <IonItem style={{ flex: 1 }}>
                <IonLabel position="stacked">Precio ($)</IonLabel>
                <IonInput type="number" value={newPrice} onIonInput={e => setNewPrice(e.detail.value!)} placeholder="0.00"></IonInput>
              </IonItem>
              <IonItem style={{ flex: 1 }}>
                <IonLabel position="stacked">Stock</IonLabel>
                <IonInput type="number" value={newStock} onIonInput={e => setNewStock(e.detail.value!)} placeholder="Cant."></IonInput>
              </IonItem>
            </div>

            <IonItem>
              <IonLabel position="stacked">Categoría</IonLabel>
              <IonSelect value={newCategory} onIonChange={e => setNewCategory(e.detail.value)} placeholder="Selecciona una">
                {CATEGORIES.filter(c => c !== 'Todo').map(c => (
                  <IonSelectOption key={c} value={c}>{c}</IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Descripción</IonLabel>
              <IonTextarea value={newDescription} onIonInput={e => setNewDescription(e.detail.value!)} placeholder="Describe tu producto..."></IonTextarea>
            </IonItem>

            <IonButton expand="block" style={{ marginTop: '20px' }} onClick={handlePublish}>
              Publicar ahora
            </IonButton>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Sell;