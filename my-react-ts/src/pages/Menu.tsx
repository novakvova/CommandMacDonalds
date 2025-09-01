import React, { useState } from 'react';
import './Menu.css';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const menuData: MenuItem[] = [
  // Бургери
  {
    id: 1,
    name: "Біг Мак",
    description: "Класичний бургер з двома котлетами, салатом, сиром, цибулею та спеціальним соусом",
    price: 89,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Біг+Мак",
    category: "burgers"
  },
  {
    id: 2,
    name: "Макчикен",
    description: "Курчачий бургер з салатом та майонезом",
    price: 75,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Макчикен",
    category: "burgers"
  },
  {
    id: 3,
    name: "Двохповерховий Чізбургер",
    description: "Два біфштекси з сиром, салатом, цибулею та кетчупом",
    price: 82,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Чізбургер",
    category: "burgers"
  },
  {
    id: 4,
    name: "Гранд Де Люкс",
    description: "Великий бургер з яловичиною, сиром, салатом та спеціальним соусом",
    price: 95,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Гранд+Де+Люкс",
    category: "burgers"
  },

  // Напої
  {
    id: 5,
    name: "Кока-Кола",
    description: "Класична газована вода з карамельним смаком",
    price: 25,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Кока-Кола",
    category: "drinks"
  },
  {
    id: 6,
    name: "Фанта",
    description: "Освіжаючий апельсиновий напій",
    price: 25,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Фанта",
    category: "drinks"
  },
  {
    id: 7,
    name: "Спрайт",
    description: "Лимонно-лаймовий газований напій",
    price: 25,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Спрайт",
    category: "drinks"
  },
  {
    id: 8,
    name: "Кава Американо",
    description: "Класична кава з гарячою водою",
    price: 35,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Кава",
    category: "drinks"
  },

  // Гарніри
  {
    id: 9,
    name: "Картопля Фрі",
    description: "Хрустка картопля, смажена до золотистої скоринки",
    price: 45,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Картопля+Фрі",
    category: "sides"
  },
  {
    id: 10,
    name: "Картопляні Діпи",
    description: "Смачні картопляні кульки з сиром",
    price: 55,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Картопляні+Діпи",
    category: "sides"
  },
  {
    id: 11,
    name: "Салат Цезар",
    description: "Свіжий салат з куркою, сиром та соусом Цезар",
    price: 65,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Салат+Цезар",
    category: "sides"
  },

  // Десерти
  {
    id: 12,
    name: "Макфлурі",
    description: "М'який морозиво з топінгом на вибір",
    price: 40,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Макфлурі",
    category: "desserts"
  },
  {
    id: 13,
    name: "Яблучний Пиріг",
    description: "Теплий пиріг з яблуками та корицею",
    price: 35,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Яблучний+Пиріг",
    category: "desserts"
  },
  {
    id: 14,
    name: "Маккафе",
    description: "Кава з морозивом та топінгом",
    price: 45,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Маккафе",
    category: "desserts"
  },

  // Сніданки
  {
    id: 15,
    name: "Макмафін з Яйцем",
    description: "Сніданковий сендвіч з яйцем та сиром",
    price: 55,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Макмафін",
    category: "breakfast"
  },
  {
    id: 16,
    name: "Хоткейки",
    description: "Теплі хоткейки з сиропом",
    price: 45,
    image: "https://via.placeholder.com/300x200/ff6b35/ffffff?text=Хоткейки",
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

  const handleAddToCart = (itemId: number, itemName: string) => {
    setAddedItems(prev => [...prev, itemId]);
    
    // Показуємо повідомлення
    const message = `${itemName} додано до кошика!`;
    alert(message);
    
    // Видаляємо з доданих через 2 секунди
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== itemId));
    }, 2000);
  };

  const filteredMenu = menuData.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="menu-container">
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
                   onClick={() => handleAddToCart(item.id, item.name)}
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
