import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonAvatar, IonLabel, IonBadge,
  IonSearchbar, IonText, IonChip
} from '@ionic/react';
import { CHATS } from '../data/mockData';
import '../themes/Chats.css';

const Chats: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  // Nuevo estado para el filtro de rol: 'all', 'buying', 'selling'
  const [activeFilter, setActiveFilter] = useState<'all' | 'buying' | 'selling'>('all');

  // Lógica de filtrado combinada (Buscador + Chips)
  const filteredChats = CHATS.filter(chat => {
    const searchLower = searchText.toLowerCase();
    const matchesSearch = chat.userName.toLowerCase().includes(searchLower) || 
                          chat.productName.toLowerCase().includes(searchLower);
    
    // Si el filtro es 'buying', mostramos donde soy comprador (isSelling es false para el otro)
    // En nuestro mockData, 'isSelling' indica el rol del contacto.
    if (activeFilter === 'buying') return matchesSearch && !chat.isSelling;
    if (activeFilter === 'selling') return matchesSearch && chat.isSelling;
    
    return matchesSearch;
  });

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Mensajes</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar 
            placeholder="Buscar por nombre o producto..." 
            value={searchText}
            onIonInput={e => setSearchText(e.detail.value!)}
          />
        </IonToolbar>
        
        {/* Chips de Filtro Rápido */}
        <div style={{ padding: '0 10px 10px 10px', display: 'flex', gap: '5px' }}>
          <IonChip 
            outline={activeFilter !== 'all'} 
            color="primary"
            onClick={() => setActiveFilter('all')}
          >
            <IonLabel>Todos</IonLabel>
          </IonChip>
          <IonChip 
            outline={activeFilter !== 'selling'} 
            color="success"
            onClick={() => setActiveFilter('selling')}
          >
            <IonLabel>Mis Ventas</IonLabel>
          </IonChip>
          <IonChip 
            outline={activeFilter !== 'buying'} 
            color="tertiary"
            onClick={() => setActiveFilter('buying')}
          >
            <IonLabel>Mis Compras</IonLabel>
          </IonChip>
        </div>
      </IonHeader>

      <IonContent fullscreen>
        <IonList lines="full"> 
          {filteredChats.length > 0 ? (
            filteredChats.map((chat) => (
              <IonItem 
                key={chat.id} 
                button 
                detail={false} 
                routerLink={`/app/chats/${chat.id}`}
              >
                <IonAvatar slot="start">
                  <img src={chat.avatar} alt={chat.userName} />
                </IonAvatar>

                <IonLabel>
                  <h2>
                    {chat.userName}
                    <span style={{ float: 'right', fontSize: '0.7rem', fontWeight: 'bold', color: chat.isSelling ? 'var(--ion-color-success)' : 'var(--ion-color-tertiary)' }}>
                      {chat.isSelling ? 'CLIENTE' : 'VENDEDOR'}
                    </span>
                  </h2>

                  <h3 className="chat-product-context">
                    {chat.productName}
                  </h3>

                  <p>{chat.lastMessage}</p>
                </IonLabel>

                <div slot="end" style={{ textAlign: 'right' }}>
                  <span className="chat-time" style={{ fontSize: '0.75rem' }}>{chat.time}</span>
                  {chat.unreadCount > 0 && (
                    <IonBadge color="primary" className="chat-badge">
                      {chat.unreadCount}
                    </IonBadge>
                  )}
                </div>
              </IonItem>
            ))
          ) : (
            <div className="ion-padding ion-text-center" style={{ marginTop: '40px' }}>
              <IonText color="medium">
                <p>No hay mensajes que coincidan con los filtros.</p>
              </IonText>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Chats;