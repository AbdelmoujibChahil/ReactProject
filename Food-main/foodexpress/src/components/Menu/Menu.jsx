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
