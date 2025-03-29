const mongoose = require('mongoose');
require('dotenv').config();

const MenuItem = require('../models/MenuItem');
const InventoryItem = require('../models/InventoryItem');
const connectDB = require('../config/db');

const menuData = [
  {
    name: "Masala Dosa",
    price: 120,
    ingredients: [
      { name: "Rice", quantity: 75 },
      { name: "Urad Dal", quantity: 25 },
      { name: "Fenugreek Seeds", quantity: 2 },
      { name: "Potatoes", quantity: 100 },
      { name: "Onions", quantity: 50 },
      { name: "Mustard Seeds", quantity: 5 },
      { name: "Curry Leaves", quantity: 2 },
      { name: "Turmeric", quantity: 2 },
      { name: "Green Chillies", quantity: 2 },
      { name: "Ghee", quantity: 15 }
    ]
  },
  {
    name: "Plain Dosa",
    price: 100,
    ingredients: [
      { name: "Rice", quantity: 75 },
      { name: "Urad Dal", quantity: 25 },
      { name: "Fenugreek Seeds", quantity: 2 },
      { name: "Ghee", quantity: 15 }
    ]
  },
  {
    name: "Idli",
    price: 80,
    ingredients: [
      { name: "Rice", quantity: 70 },
      { name: "Urad Dal", quantity: 30 },
      { name: "Fenugreek Seeds", quantity: 2 },
      { name: "Ghee", quantity: 5 }
    ]
  },
  {
    name: "Medu Vada",
    price: 90,
    ingredients: [
      { name: "Urad Dal", quantity: 75 },
      { name: "Black Pepper", quantity: 2 },
      { name: "Curry Leaves", quantity: 2 },
      { name: "Oil", quantity: 30 }
    ]
  },
  {
    name: "Upma",
    price: 85,
    ingredients: [
      { name: "Rava", quantity: 100 },
      { name: "Mustard Seeds", quantity: 5 },
      { name: "Curry Leaves", quantity: 2 },
      { name: "Mixed Vegetables", quantity: 50 },
      { name: "Green Chillies", quantity: 2 },
      { name: "Ghee", quantity: 15 }
    ]
  },
  {
    name: "Pongal",
    price: 90,
    ingredients: [
      { name: "Rice", quantity: 100 },
      { name: "Moong Dal", quantity: 50 },
      { name: "Ghee", quantity: 15 },
      { name: "Black Pepper", quantity: 5 },
      { name: "Cumin", quantity: 5 },
      { name: "Cashews", quantity: 5 }
    ]
  },
  {
    name: "Sambar",
    price: 70,
    ingredients: [
      { name: "Toor Dal", quantity: 100 },
      { name: "Tamarind Paste", quantity: 15 },
      { name: "Sambar Masala", quantity: 15 },
      { name: "Mixed Vegetables", quantity: 100 },
      { name: "Mustard Seeds", quantity: 5 },
      { name: "Curry Leaves", quantity: 2 }
    ]
  },
  {
    name: "Rasam Rice",
    price: 60,
    ingredients: [
      { name: "Rice", quantity: 100 },
      { name: "Tomatoes", quantity: 100 },
      { name: "Tamarind Paste", quantity: 15 },
      { name: "Rasam Powder", quantity: 15 },
      { name: "Mustard Seeds", quantity: 5 },
      { name: "Curry Leaves", quantity: 2 }
    ]
  },
  {
    name: "Curd Rice",
    price: 70,
    ingredients: [
      { name: "Rice", quantity: 100 },
      { name: "Curd", quantity: 100 },
      { name: "Mustard Seeds", quantity: 5 },
      { name: "Curry Leaves", quantity: 2 }
    ]
  },
  {
    name: "Filter Coffee",
    price: 40,
    ingredients: [
      { name: "Coffee Powder", quantity: 10 },
      { name: "Milk", quantity: 150 },
      { name: "Sugar", quantity: 5 }
    ]
  }
];

const inventoryData = [
  { name: "Rice", quantity: 10000, unit: "grams", threshold: 500 },
  { name: "Urad Dal", quantity: 5000, unit: "grams", threshold: 500 },
  { name: "Moong Dal", quantity: 3000, unit: "grams", threshold: 500 },
  { name: "Toor Dal", quantity: 5000, unit: "grams", threshold: 500 },
  { name: "Rava", quantity: 4000, unit: "grams", threshold: 500 },
  { name: "Fenugreek Seeds", quantity: 500, unit: "grams", threshold: 500 },
  { name: "Potatoes", quantity: 2000, unit: "grams", threshold: 500 },
  { name: "Onions", quantity: 2000, unit: "grams", threshold: 500 },
  { name: "Tomatoes", quantity: 2000, unit: "grams", threshold: 500 },
  { name: "Mixed Vegetables", quantity: 3000, unit: "grams", threshold: 500 },
  { name: "Green Chillies", quantity: 500, unit: "grams", threshold: 500 },
  { name: "Mustard Seeds", quantity: 800, unit: "grams", threshold: 500 },
  { name: "Curry Leaves", quantity: 300, unit: "grams", threshold: 500 },
  { name: "Turmeric", quantity: 400, unit: "grams", threshold: 500 },
  { name: "Black Pepper", quantity: 300, unit: "grams", threshold: 500 },
  { name: "Cumin", quantity: 300, unit: "grams", threshold: 500 },
  { name: "Cashews", quantity: 200, unit: "grams", threshold: 500 },
  { name: "Tamarind Paste", quantity: 500, unit: "grams", threshold: 500 },
  { name: "Sambar Masala", quantity: 400, unit: "grams", threshold: 500 },
  { name: "Rasam Powder", quantity: 400, unit: "grams", threshold: 500 },
  { name: "Curd", quantity: 2000, unit: "grams", threshold: 500 },
  { name: "Milk", quantity: 3000, unit: "grams", threshold: 500 },
  { name: "Coffee Powder", quantity: 500, unit: "grams", threshold: 500 },
  { name: "Sugar", quantity: 1000, unit: "grams", threshold: 500 },
  { name: "Oil", quantity: 5000, unit: "grams", threshold: 500 },
  { name: "Ghee", quantity: 3000, unit: "grams", threshold: 500 },
  { name: "Coconut", quantity: 1000, unit: "grams", threshold: 100 },
  { name: "Roasted Chana Dal", quantity: 1000, unit: "grams", threshold: 100 }

];

const seedData = async () => {
  try {
    await connectDB();

    await MenuItem.deleteMany();
    await InventoryItem.deleteMany();

    await MenuItem.insertMany(menuData);
    await InventoryItem.insertMany(inventoryData);

    console.log('🌱 Data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
