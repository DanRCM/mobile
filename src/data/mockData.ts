export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sellerName: string;
  location: string;
  available: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'Hamburguesa Completa',
    price: 3.50,
    category: 'Comida',
    image: '/assets/products/hamburguesa.webp', 
    description: 'Deliciosa hamburguesa artesanal con carne de res, queso cheddar, tocino crujiente y vegetales frescos. ¡Viene con papas!',
    sellerName: 'María G.',
    location: 'FEPOL',
    available: true
  },
  {
    id: 2,
    title: 'Cargador iPhone Original',
    price: 15.00,
    category: 'Tecnología',
    image: '/assets/products/cargador_iphone.webp',
    description: 'Cargador USB-C de 20W original. Carga rápida garantizada para tu iPhone o iPad. En caja sellada.',
    sellerName: 'Juan P.',
    location: 'Biblioteca',
    available: true
  },
  {
    id: 3,
    title: 'Libro Cálculo I - Stewart',
    price: 20.00,
    category: 'Libros',
    image: '/assets/products/libro_calculo_stewart.webp',
    description: 'Séptima edición del clásico de James Stewart. Ideal para nivelación y primer semestre. Está forrado y sin rayones.',
    sellerName: 'Carlos A.',
    location: 'FCNM',
    available: false
  },
  {
    id: 4,
    title: 'Brownies Mágicos (Normales)',
    price: 1.50,
    category: 'Comida',
    image: '/assets/products/brownies.webp',
    description: 'Brownies caseros melcochudos con doble ración de chispas de chocolate. ¡El snack perfecto para estudiar!',
    sellerName: 'Luisa M.',
    location: 'Comedor',
    available: true
  },
  {
    id: 5,
    title: 'Mantenimiento de Laptop',
    price: 10.00,
    category: 'Servicios',
    image: '/assets/products/mantenimiento_laptop.webp',
    description: 'Limpieza interna de ventiladores, cambio de pasta térmica y optimización de software. ¡Dale una nueva vida a tu PC!',
    sellerName: 'TechTeam',
    location: 'FIEC',
    available: true
  },
  {
    id: 6,
    title: 'Hoodie ESPOL',
    price: 25.00,
    category: 'Ropa',
    image: '/assets/products/hoodie.png',
    description: 'Hoodie azul marino oficial de la ESPOL. Talla M, material ultra suave y abrigado para las clases con aire acondicionado.',
    sellerName: 'Tienda Estudiantil',
    location: 'Rectorado',
    available: true
  }
];

export const CATEGORIES = ['Todo', 'Comida', 'Tecnología', 'Libros', 'Ropa', 'Servicios'];

export interface Chat {
  id: number;
  userName: string;
  avatar: string; // URL de la imagen
  lastMessage: string;
  time: string;
  unreadCount: number;
  isSelling: boolean; // true = Yo vendo, false = Yo compro
  productName: string; // Contexto: ¿De qué producto hablan?
}

export const CHATS: Chat[] = [
  {
    id: 1,
    userName: 'María G.',
    avatar: 'https://ui-avatars.com/api/?name=Maria+G&background=FFD700&color=fff',
    lastMessage: 'Sí, estoy en las bancas de la FIEC.',
    time: '10:30 AM',
    unreadCount: 2,
    isSelling: false, // Yo quiero comprar su hamburguesa
    productName: 'Hamburguesa Completa'
  },
  {
    id: 2,
    userName: 'Carlos A.',
    avatar: 'https://ui-avatars.com/api/?name=Carlos+A&background=0D8ABC&color=fff',
    lastMessage: '¿Aceptas $18 por el libro?',
    time: 'Ayer',
    unreadCount: 0,
    isSelling: true,
    productName: 'Libro Cálculo I'
  },
  {
    id: 3,
    userName: 'TechTeam',
    avatar: 'https://ui-avatars.com/api/?name=Tech+Team&background=333&color=fff',
    lastMessage: 'Listo, tu laptop quedó como nueva.',
    time: 'Lun',
    unreadCount: 1,
    isSelling: false,
    productName: 'Mantenimiento'
  }
];