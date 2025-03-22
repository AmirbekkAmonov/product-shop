"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import '@/styles/header.scss';

const Header = () => {
  const router = useRouter();
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="header__container">
        <Link href="/" className="header__logo">
          OnlineDokon
        </Link>

        <form onSubmit={handleSearch} className="header__search">
          <div className="header__search-wrapper">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Mahsulotlarni qidirish..."
              className="header__search-input"
            />
            <button type="submit" className="header__search-button">
              <Search className="header__search-icon" size={20} />
            </button>
          </div>
        </form>

        <nav className="header__nav">
          <Link href="/cart" className="header__cart">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="header__cart-count">{totalItems}</span>
            )}
          </Link>
          <Link href="/profile" className="header__nav-link">
            <User size={24} />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;