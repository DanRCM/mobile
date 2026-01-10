import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonFooter,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonAvatar,
    IonLabel
} from '@ionic/react';
import { send, locationOutline } from 'ionicons/icons';
import { useParams } from 'react-router';
import { CHATS } from '../data/mockData';
import '../themes/ChatRoom.css';

const ChatRoom: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const chatData = CHATS.find(c => c.id === parseInt(id));
    const location = useLocation<{ prefilledMessage?: string }>(); // Tipado correcto
    const [messageText, setMessageText] = useState('');

    const [fakeMessages, setFakeMessages] = useState([
        { id: 1, text: 'Hola, ¿sigue disponible?', isMe: true },
        { id: 2, text: chatData?.lastMessage || 'Hola', isMe: false }
    ]);

    // 1. Lista de puntos de encuentro comunes en ESPOL
    const espolLocations = [
        "📍 Bancas de la FIEC",
        "📍 Planta baja de la FEPOL",
        "📍 Entrada de la Biblioteca Central",
        "📍 Parqueadero de la FCNM",
        "📍 Comedor de Grado"
    ];

    const sendLocation = () => {
        // Elegimos uno al azar para el ejemplo
        const randomLoc = espolLocations[Math.floor(Math.random() * espolLocations.length)];
        const locationMsg = `Sugiero encontrarnos en: ${randomLoc}`;

        // Añadimos el mensaje al chat
        setFakeMessages(prev => [...prev, { id: Date.now(), text: locationMsg, isMe: true }]);

        // Simulamos que el vendedor acepta
        setTimeout(() => {
            setFakeMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: '¡Dale, me parece bien! Ahí te veo.', isMe: false }
            ]);
        }, 1200);
    };

    useEffect(() => {
        // Con history.push, el estado llega directamente a location.state
        if (location.state?.prefilledMessage) {
            setMessageText(location.state.prefilledMessage);
        }
    }, [location]);

    const sendMessage = () => {
        if (!messageText.trim()) return;

        setFakeMessages([...fakeMessages, { id: Date.now(), text: messageText, isMe: true }]);
        setMessageText('');

        setTimeout(() => {
            setFakeMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: '¡Claro! Nos vemos en la universidad.', isMe: false }
            ]);
        }, 1500);
    };

    if (!chatData) return <IonPage><IonContent>Chat no encontrado</IonContent></IonPage>;

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/app/chats" />
                    </IonButtons>

                    <IonItem lines="none" className="header-chat-info">
                        <IonAvatar slot="start" style={{ width: '30px', height: '30px' }}>
                            <img src={chatData.avatar} alt="avatar" />
                        </IonAvatar>
                        <IonLabel>
                            <h2>{chatData.userName}</h2>
                            <p className="status-online">En línea</p>
                        </IonLabel>
                    </IonItem>
                </IonToolbar>

                <div className="product-context-bar">
                    <span>Hablando sobre: <strong>{chatData.productName}</strong></span>
                </div>
            </IonHeader>

            <IonContent className="chat-content">
                <div className="messages-container">
                    {fakeMessages.map((msg) => (
                        <div key={msg.id} className={`message-bubble ${msg.isMe ? 'me' : 'them'}`}>
                            {msg.text}
                        </div>
                    ))}
                </div>
            </IonContent>

            <IonFooter>
                <IonToolbar className="chat-input-toolbar">
                    <div className="input-container">
                        {/* 2. CONECTAMOS LA FUNCIÓN AL BOTÓN */}
                        <IonButton fill="clear" size="small" onClick={sendLocation}>
                            <IonIcon icon={locationOutline} slot="icon-only" />
                        </IonButton>

                        <IonInput
                            value={messageText}
                            placeholder="Escribe un mensaje..."
                            onIonInput={e => setMessageText(e.detail.value!)}
                            onKeyPress={e => e.key === 'Enter' && sendMessage()}
                        />
                        <IonButton fill="clear" onClick={sendMessage} disabled={!messageText}>
                            <IonIcon icon={send} slot="icon-only" color="primary" />
                        </IonButton>
                    </div>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default ChatRoom;