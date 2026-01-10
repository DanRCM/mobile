import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonItem, 
  IonAvatar, 
  IonLabel, 
  IonBadge,
  IonSearchbar
} from '@ionic/react';
import { CHATS } from '../data/mockData';
import '../themes/Chats.css';

const Chats: React.FC = () => {
  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>Mensajes</IonTitle>
        </IonToolbar>
        <IonToolbar>
             <IonSearchbar placeholder="Buscar chat..."></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList lines="full"> 
          {/* Mapeamos la lista de chats falsos */}
          {CHATS.map((chat) => (
            <IonItem 
              key={chat.id} 
              button 
              detail={false} // Quitamos la flechita > por defecto para un look más limpio
              routerLink={`/app/chats/${chat.id}`} // Navegaremos a la sala de chat (próximo paso)
            >
              {/* Avatar del usuario */}
              <IonAvatar slot="start">
                <img src={chat.avatar} alt={chat.userName} />
              </IonAvatar>

              <IonLabel>
                {/* Primera línea: Nombre y Contexto de Rol */}
                <h2>
                  {chat.userName}
                  {/* Etiqueta opcional para saber si compro o vendo */}
                  <span style={{ float: 'right', fontSize: '0.7rem', color: '#999' }}>
                    {chat.isSelling ? '🛍️ Cliente' : '🛒 Vendedor'}
                  </span>
                </h2>

                {/* Segunda línea: De qué producto hablan */}
                <h3 className="chat-product-context">
                  {chat.productName}
                </h3>

                {/* Tercera línea: Último mensaje (truncado) */}
                <p>{chat.lastMessage}</p>
              </IonLabel>

              {/* Columna Derecha: Hora y Badge de no leídos */}
              <div slot="end" style={{ textAlign: 'right' }}>
                <span className="chat-time">{chat.time}</span>
                {chat.unreadCount > 0 && (
                  <IonBadge color="primary" className="chat-badge">
                    {chat.unreadCount}
                  </IonBadge>
                )}
              </div>
            </IonItem>
          ))}
        </IonList>

        {/* Mensaje si no hay chats (solo visual por ahora) */}
        {CHATS.length === 0 && (
          <div className="ion-padding ion-text-center">
            <p>No tienes mensajes aún.</p>
          </div>
        )}

      </IonContent>
    </IonPage>
  );
};

export default Chats;