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