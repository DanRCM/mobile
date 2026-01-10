import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonToolbar, 
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonLabel
} from '@ionic/react';
import { PRODUCTS, CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';
import '../themes/Home.css';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todo');

  // Lógica de Filtrado
  const filteredProducts = PRODUCTS.filter(product => {
    // 1. Filtro por texto (Buscador)
    const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
    // 2. Filtro por categoría
    const matchesCategory = selectedCategory === 'Todo' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <IonPage>
      {/* HEADER SIN TEXTO, SOLO BUSCADOR */}
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonSearchbar 
            placeholder="¿Qué buscas hoy?" 
            value={searchText}
            onIonInput={e => setSearchText(e.detail.value!)}
            animated={true}
          ></IonSearchbar>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        
        {/* SECCIÓN DE CATEGORÍAS (Horizontal Scroll) */}
        <div className="categories-container">
          {CATEGORIES.map((cat, index) => (
            <IonChip 
              key={index} 
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'medium'}
              outline={selectedCategory !== cat}
            >
              <IonLabel>{cat}</IonLabel>
            </IonChip>
          ))}
        </div>

        {/* GRILLA DE PRODUCTOS */}
        <div className="products-container">
          <IonGrid>
            <IonRow>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <IonCol size="6" size-md="4" size-lg="3" key={product.id}>
                    <ProductCard product={product} />
                  </IonCol>
                ))
              ) : (
                <div className="no-results">
                  <p>No encontramos productos con ese filtro 😢</p>
                </div>
              )}
            </IonRow>
          </IonGrid>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default Home;