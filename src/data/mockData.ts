export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
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
    image: 'https://placehold.co/600x400/orange/white?text=Hamburguesa',
    sellerName: 'María G.',
    location: 'FEPOL',
    available: true
  },
  {
    id: 2,
    title: 'Cargador iPhone Original',
    price: 15.00,
    category: 'Tecnología',
    image: 'https://placehold.co/600x400/black/white?text=Cargador',
    sellerName: 'Juan P.',
    location: 'Biblioteca',
    available: true
  },
  {
    id: 3,
    title: 'Libro Cálculo I - Stewart',
    price: 20.00,
    category: 'Libros',
    image: 'https://placehold.co/600x400/blue/white?text=Calculo',
    sellerName: 'Carlos A.',
    location: 'FCNM',
    available: false // Ejemplo de producto no disponible
  },
  {
    id: 4,
    title: 'Brownies Mágicos (Normales)',
    price: 1.50,
    category: 'Comida',
    image: 'https://placehold.co/600x400/brown/white?text=Brownie',
    sellerName: 'Luisa M.',
    location: 'Comedor',
    available: true
  },
  {
    id: 5,
    title: 'Mantenimiento de Laptop',
    price: 10.00,
    category: 'Servicios',
    image: 'https://placehold.co/600x400/gray/white?text=Reparacion',
    sellerName: 'TechTeam',
    location: 'FIEC',
    available: true
  },
  {
    id: 6,
    title: 'Hoodie ESPOL',
    price: 25.00,
    category: 'Ropa',
    image: 'https://placehold.co/600x400/navy/white?text=Hoodie',
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