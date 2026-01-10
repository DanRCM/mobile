import React from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonButtons, IonBackButton, IonList, IonItem, IonLabel, 
  IonNote, IonBadge, IonItemDivider, IonIcon
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/mockData';
import { receiptOutline, personOutline } from 'ionicons/icons';

const SalesHistory: React.FC = () => {
  // 1. Obtenemos el ID del producto de la URL
  const { id } = useParams<{ id: string }>();
  const product = PRODUCTS.find(p => p.id === parseInt(id));

  // 2. Generamos datos mockeados específicos para este producto
  // Si no hay producto, mostramos una lista vacía
  const getMockSales = (prodId: number) => {
    const basePrice = product?.price || 0;
    
    // Generamos 3 ventas "ficticias" pero con lógica
    return [
      { id: 101, buyer: 'Kevin M.', date: '10 Ene, 2026', qty: 1, total: basePrice },
      { id: 102, buyer: 'Andrea P.', date: '08 Ene, 2026', qty: 2, total: basePrice * 2 },
      { id: 103, buyer: 'Luis R.', date: '05 Ene, 2026', qty: 1, total: basePrice },
    ];
  };

  const sales = product ? getMockSales(product.id) : [];
  const totalGained = sales.reduce((acc, curr) => acc + curr.total, 0);

  if (!product) return <IonPage><IonContent>Producto no encontrado</IonContent></IonPage>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton />
          </IonButtons>
          <IonTitle>Historial: {product.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        {/* RESUMEN DE GANANCIAS */}
        <div style={{ 
          padding: '30px 20px', 
          textAlign: 'center', 
          background: 'linear-gradient(to bottom, #1a1a1a, #000)',
          color: 'white' 
        }}>
          <p style={{ margin: 0, opacity: 0.6, fontSize: '0.9rem' }}>Ingresos por este producto</p>
          <h1 style={{ fontSize: '2.8rem', fontWeight: '800', margin: '10px 0' }}>
            ${totalGained.toFixed(2)}
          </h1>
          <IonBadge color="success" mode="ios">
            {sales.length} Unidades vendidas
          </IonBadge>
        </div>

        <IonList inset={true} style={{ marginTop: '20px' }}>
          <IonItemDivider>Detalle de transacciones</IonItemDivider>
          {sales.map(sale => (
            <IonItem key={sale.id}>
              <IonIcon slot="start" icon={personOutline} color="medium" />
              <IonLabel>
                <h2 style={{ fontWeight: '600' }}>{sale.buyer}</h2>
                <p>{sale.date}</p>
              </IonLabel>
              <IonNote slot="end" style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--ion-color-success)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  +${sale.total.toFixed(2)}
                </div>
                <div style={{ fontSize: '0.75rem' }}>Cant: {sale.qty}</div>
              </IonNote>
            </IonItem>
          ))}
        </IonList>

        <div className="ion-padding ion-text-center">
          <p style={{ fontSize: '0.8rem', color: '#666' }}>
            <IonIcon icon={receiptOutline} /> Todas las ventas han sido verificadas
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SalesHistory;