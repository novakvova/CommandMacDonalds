//@ts-ignore
import React, { useState, useEffect } from 'react';
import './Menu.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const menuData: MenuItem[] = [
  // Бургери
  {
    id: 1,
    name: "Біг Мак",
    description: "Класичний бургер з двома котлетами, салатом, сиром, цибулею та спеціальним соусом",
    price: 89,
    image: "http://localhost:5129/images/bigmac.jpg",
    category: "burgers"
  },
  {
    id: 2,
    name: "Макчикен",
    description: "Курчачий бургер з салатом та майонезом",
    price: 75,
    image: "http://localhost:5129/images/macchiken.jpg",
    category: "burgers"
  },
  {
    id: 3,
    name: "Двохповерховий Чізбургер",
    description: "Два біфштекси з сиром, салатом, цибулею та кетчупом",
    price: 82,
    image: "http://localhost:5129/images/dablcheese.jpg",
    category: "burgers"
  },
  {
    id: 4,
    name: "Гранд Де Люкс",
    description: "Великий бургер з яловичиною, сиром, салатом та спеціальним соусом",
    price: 95,
    image: "http://localhost:5129/images/delux.jpg",
    category: "burgers"
  },

  // Напої
  {
    id: 5,
    name: "Кока-Кола",
    description: "Класична газована вода з карамельним смаком",
    price: 25,
    image: "http://localhost:5129/images/cola.jpg",
    category: "drinks"
  },
  {
    id: 6,
    name: "Фанта",
    description: "Освіжаючий апельсиновий напій",
    price: 25,
    image: "http://localhost:5129/images/fanta.jpg",
    category: "drinks"
  },
  {
    id: 7,
    name: "Спрайт",
    description: "Лимонно-лаймовий газований напій",
    price: 25,
    image: "http://localhost:5129/images/sprite.jpg",
    category: "drinks"
  },
  {
    id: 8,
    name: "Кава Американо",
    description: "Класична кава з гарячою водою",
    price: 35,
    image: "http://localhost:5129/images/cofe.jpg",
    category: "drinks"
  },

  // Гарніри
  {
    id: 9,
    name: "Картопля Фрі",
    description: "Хрустка картопля, смажена до золотистої скоринки",
    price: 45,
    image: "http://localhost:5129/images/kartoha.jpg",
    category: "sides"
  },
  {
    id: 10,
    name: "Картопляні Діпи",
    description: "Смачні картопляні кульки з сиром",
    price: 55,
    image: "http://localhost:5129/images/dipu.jpg",
    category: "sides"
  },
  {
    id: 11,
    name: "Салат Цезар",
    description: "Свіжий салат з куркою, сиром та соусом Цезар",
    price: 65,
    image: "http://localhost:5129/images/salad.jpg",
    category: "sides"
  },

  // Десерти
  {
    id: 12,
    name: "Макфлурі",
    description: "М'який морозиво з топінгом на вибір",
    price: 40,
    image: "http://localhost:5129/images/morozevo.jpg",
    category: "desserts"
  },
  {
    id: 13,
    name: "Яблучний Пиріг",
    description: "Теплий пиріг з яблуками та корицею",
    price: 35,
    image: "http://localhost:5129/images/pirog.jpg",
    category: "desserts"
  },
  {
    id: 14,
    name: "Маккафе",
    description: "Кава з морозивом та топінгом",
    price: 45,
    image: "http://localhost:5129/images/maccafe.jpg",
    category: "desserts"
  },

  // Сніданки
  {
    id: 15,
    name: "Макмафін з Яйцем",
    description: "Сніданковий сендвіч з яйцем та сиром",
    price: 55,
    image: "http://localhost:5129/images/eggs.jpg",
    category: "breakfast"
  },
  {
    id: 16,
    name: "Хоткейки",
    description: "Теплі хоткейки з сиропом",
    price: 45,
    image: "http://localhost:5129/images/blinu.jpg",
    category: "breakfast"
  }
];

const categories = [
  { id: "all", name: "Все меню", icon: "🍽️" },
  { id: "burgers", name: "Бургери", icon: "🍔" },
  { id: "drinks", name: "Напої", icon: "🥤" },
  { id: "sides", name: "Гарніри", icon: "🍟" },
  { id: "desserts", name: "Десерти", icon: "🍦" },
  { id: "breakfast", name: "Сніданки", icon: "🥞" }
];

// Функція для підрахунку кількості товарів у категорії
const getCategoryCount = (categoryId: string) => {
  if (categoryId === "all") {
    return menuData.length;
  }
  return menuData.filter(item => item.category === categoryId).length;
};

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  // Завантаження кошика з localStorage при ініціалізації
  useEffect(() => {
    const savedCart = localStorage.getItem('mcdonalds-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Збереження кошика в localStorage при зміні
  useEffect(() => {
    localStorage.setItem('mcdonalds-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (item: MenuItem) => {
    setAddedItems(prev => [...prev, item.id]);
    
    // Додаємо товар до кошика
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        }];
      }
    });
    
    // Видаляємо з доданих через 2 секунди
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    setIsCartOpen(false);
  };

  const toggleCart = () => {
    if (isCartOpen) {
      setCartAnimation(true);
      setTimeout(() => {
        setIsCartOpen(false);
        setCartAnimation(false);
      }, 300);
    } else {
      setIsCartOpen(true);
    }
  };

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-container">
      {/* Кнопка кошика */}
      <div className="cart-button-container">
        <button className="cart-toggle-btn" onClick={toggleCart}>
          🛒 Кошик
          {getTotalItems() > 0 && (
            <span className="cart-badge">{getTotalItems()}</span>
          )}
        </button>
      </div>

      {/* Кошик */}
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''} ${cartAnimation ? 'closing' : ''}`}>
        <div className="cart-header">
          <h3>🛒 Кошик</h3>
          <button className="cart-close-btn" onClick={toggleCart}>×</button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Кошик порожній</p>
            <p>Додайте товари з меню</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="cart-item-price">{item.price} грн</p>
                    <div className="cart-item-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity-display">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart-footer">
              <div className="cart-total">
                <span>Загальна сума:</span>
                <span className="total-price">{getTotalPrice()} грн</span>
              </div>
              <div className="cart-actions">
                <button className="clear-cart-btn" onClick={clearCart}>
                  Очистити кошик
                </button>
                <button className="checkout-btn">
                  Оформити замовлення
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Оверлей для кошика */}
      {isCartOpen && (
        <div className="cart-overlay" onClick={toggleCart}></div>
      )}

      <div className="menu-header">
        <h1>🍔 Меню Макдональдс</h1>
        <p>Оберіть свій улюблений смак</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="🔍 Пошук по меню..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="categories-section">
        <div className="categories-grid">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
              <span className="category-count">({getCategoryCount(category.id)})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="menu-grid">
        {filteredMenu.map(item => (
          <div key={item.id} className="menu-item">
            <div className="menu-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="menu-item-content">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-description">{item.description}</p>
              <div className="menu-item-footer">
                <span className="menu-item-price">{item.price} грн</span>
                <button 
                  className={`add-to-cart-btn ${addedItems.includes(item.id) ? 'added' : ''}`}
                  onClick={() => handleAddToCart(item)}
                >
                  {addedItems.includes(item.id) ? '✓ Додано' : '+ Додати'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="no-results">
          <p>😕 Нічого не знайдено</p>
          <p>Спробуйте змінити пошуковий запит або категорію</p>
        </div>
      )}
    </div>
  );
}
