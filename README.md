# EspolMarket 🛒

**EspolMarket** es una plataforma móvil híbrida desarrollada para la comunidad de la **ESPOL**. Su objetivo es facilitar el comercio seguro y eficiente de productos y servicios entre estudiantes, permitiendo una gestión integral desde la publicación hasta la analítica de ventas.

## 🎯 Objetivo del Proyecto
Crear un ecosistema digital confiable dentro del campus universitario que fomente la economía circular, permitiendo a los usuarios monetizar artículos que ya no necesitan y adquirir lo que buscan de forma cercana y segura.

## 🚀 Tecnologías y Herramientas
* **Framework:** [Ionic React](https://ionicframework.com/) (Capacitor) para una experiencia nativa multiplataforma.
* **Lenguaje:** TypeScript para un desarrollo con tipado fuerte y menos errores.
* **Diseño UI:** CSS3 con variables dinámicas de Ionic para soporte de temas.
* **Iconografía:** [Ionicons](https://ionicons.com/) para una interfaz intuitiva.
* **Navegación:** React Router para la gestión de flujos de usuario.

## ✨ Características Principales

### 1. Exploración y Filtrado
* Buscador en tiempo real con filtrado dinámico por categorías (Comida, Tecnología, Libros, Ropa, etc.).
* Interfaz optimizada para visualización de productos en grillas adaptativas.

### 2. Gestión de Ventas (Panel del Vendedor)
* **Control de Stock:** Validación de inventario que inhabilita automáticamente anuncios agotados.
* **Privacidad y Control:** Botón toggle para activar/desactivar la visibilidad de anuncios manualmente.
* **Cámara Integrada:** Funcionalidad para capturar fotos de productos directamente desde la app.

### 3. Analítica y Rendimiento
* **Dashboard de Rendimiento:** Visualización de métricas (Vistas e Interesados) mediante componentes simétricos con diseño *Glassmorphism*.
* **Historial de Ventas:** Registro detallado por producto que muestra compradores, fechas y ganancias totales calculadas.

### 4. Experiencia de Usuario (UX)
* **Modo Oscuro Dinámico:** Implementación mediante clases de CSS (`dark.class.css`) que permite cambiar el tema de toda la app (incluyendo TabBars, Chats y Cards) de forma independiente al sistema operativo.
* **Layout Consistente:** Uso de Flexbox avanzado para mantener la alineación de botones en las tarjetas de producto, sin importar la longitud del título.

## 🛠️ Instalación y Configuración

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/espolmarket.git](https://github.com/tu-usuario/espolmarket.git)

2. **Instala las dependencias:**
   ```bash
   npm install

3. **Inicia la aplicación en modo desarrollo:**
   ```bash
   ionic serve
   
