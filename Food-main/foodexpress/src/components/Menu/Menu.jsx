import React, { useEffect, useState } from "react";
import "./Menu.css";
import { categoryData } from "../../data/categoryData";
//import { foodData } from "../../data/foodData";
import FoodItem from "../FoodItem/FoodItem";
import {ClientApi} from "../../ClientApi/ClientApi";

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
const [plats,setplats]= useState([]); //recuperation des plats
  const [sortBy, setSortBy] = useState("recommended"); // ✅ NEW: Sort state


  useEffect(()=>{
  const fetchUser = async () => {
      try {
        const response = await ClientApi.GetPlats();  
        console.log(response.data)
        setplats(response.data);  
      } catch (err) {
        console.error("Erreur lors de la récupération des plats:", err);
      } 
    };

    fetchUser()
  },[])

  // Filter the food
  const filteredFood = plats
    .filter((item) => {
      // Category filter
      if (selectedCategory === "All") {
        return true;
      }
      return item.category === selectedCategory;
    })
    .filter((item) => {
      // Search term filter
      return item.nom.toLowerCase().includes(searchTerm.toLowerCase());
    }).sort((a, b) => {
      // ✅ NEW: Sorting logic
      if (sortBy === "recommended") {
        // Sort by rating (highest first)
        return b.review_count - a.review_count;  //A CHANGER VERS LE RATING FEEDBACK
      } else if (sortBy === "price-high") {
        // Sort by price (highest first)
        return b.prix - a.prix;
      } else if (sortBy === "price-low") {
        // Sort by price (lowest first)
        return a.prix - b.prix;
      }
      return 0;
    });

  return (
    <section id="menu" className="menu-container">
      <h2 className="menu-title">Explore Our Menu</h2>

      <div className="menu-filters">
        <input
          type="text"
          placeholder="Search for food..."
          className="menu-search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="menu-categories">
          <button
            className={`category-btn ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </button>
          {categoryData.map((category) => (
            <button
              key={category.id}
              className={`category-btn ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <img src={category.image} alt={category.name} />
              {category.name}
            </button>
          ))}
        </div>
          <div className="menu-sort-container">
          <label htmlFor="sort-select" className="sort-label">
            Sort by:
          </label>
           {/* Sort Dropdown positioned under All button */}
          <div className="menu-sort-container">
            <select
              id="sort-select"
              className="menu-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recommended">🌟 Recommended</option>
              <option value="price-high">💰 Price: High to Low</option>
              <option value="price-low">💸 Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      <div className="menu-food-grid">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => <FoodItem key={item.id} item={item} />)
        ) : (
          <p className="menu-no-results">No items match your search.</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
