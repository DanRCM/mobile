import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage, 
  IonButton, 
  IonInput, 
  IonItem, 
  IonIcon, 
  IonLoading,
  useIonRouter 
} from '@ionic/react';
import { storefrontOutline, personOutline, lockClosedOutline } from 'ionicons/icons';
import '../themes/Login.css';

const Login: React.FC = () => {
  const router = useIonRouter();
  
  // Estados para simular la captura de datos
  const [email, setEmail] = useState<string>('juan.perez@espol.edu.ec'); // Precargado para testear rápido
  const [password, setPassword] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const doLogin = () => {
    // 1. Activamos la animación de carga
    setShowLoading(true);

    // 2. Simulamos una espera de red de 1.5 segundos
    setTimeout(() => {
      setShowLoading(false);
      
      console.log("Login exitoso con:", email); // Para que veas en consola que funciona
      
      // 3. Redirigimos al Home y borramos el historial para que no puedan volver atrás con el botón físico
      router.push('/app/home', 'root', 'replace');
    }, 1500);
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="login-container">
          
          {/* SECCIÓN LOGO */}
          <div className="login-logo">
            <IonIcon icon={storefrontOutline} />
            <h1 className="login-title">EspolMarket</h1>
            <p className="login-subtitle">Conecta, compra y vende en el campus</p>
          </div>

          {/* SECCIÓN FORMULARIO */}
          <div className="input-group">
            <IonItem lines="none" className="custom-input">
              <IonIcon icon={personOutline} slot="start" color="medium" />
              <IonInput 
                value={email} 
                placeholder="Correo Institucional" 
                onIonInput={e => setEmail(e.detail.value!)} 
                type="email"
              />
            </IonItem>

            <IonItem lines="none" className="custom-input">
              <IonIcon icon={lockClosedOutline} slot="start" color="medium" />
              <IonInput 
                value={password} 
                placeholder="Contraseña" 
                onIonInput={e => setPassword(e.detail.value!)} 
                type="password"
              />
            </IonItem>
          </div>

          {/* BOTÓN DE ACCIÓN */}
          <IonButton 
            expand="block" 
            size="large" 
            shape="round" 
            onClick={doLogin}
            disabled={!email} // Deshabilitado si no hay email (pequeña validación visual)
          >
            Ingresar
          </IonButton>

          <p className="forgot-password">¿Olvidaste tu contraseña?</p>

          {/* COMPONENTE DE CARGA (Invisible hasta que se activa) */}
          <IonLoading
            isOpen={showLoading}
            message={'Autenticando...'}
            spinner="crescent"
          />

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;