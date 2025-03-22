"use client";

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import '@/styles/cart.scss';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h1>Savat bo'sh</h1>
        <p>Mahsulotlar savatchangizda mavjud emas</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <h1 className="cart__title">Savat</h1>
        
        <div className="cart__items">
          {items.map((item) => (
            <div key={item.id} className="cart__item">
              <div className="cart__item-image">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
              
              <div className="cart__item-info">
                <h3 className="cart__item-title">{item.title}</h3>
                <div className="cart__item-price">${item.price}</div>
                <div className="cart__item-quantity">
                  <label>Miqdor:</label>
                  <select 
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                className="cart__item-remove"
                onClick={() => removeFromCart(item.id)}
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <div className="cart__summary">
          <h2>Jami: ${totalPrice.toFixed(2)}</h2>
          <button className="cart__checkout">
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  );
} 