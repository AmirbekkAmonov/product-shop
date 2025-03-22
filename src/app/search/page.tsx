"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/types/product';
import { getProducts } from '@/utils/API';
import { Loading } from '@/components/Loading';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';
import '@/styles/search.scss';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const { addToCart } = useCart();

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', query],
    queryFn: () => getProducts(100, 0), // Barcha mahsulotlarni olamiz
    enabled: !!query,
  });

  const filteredProducts = data?.products.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleProductClick = (productId: number) => {
    window.location.href = `/product/${productId}`;
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  if (isLoading) {
    return (
      <main className="search">
        <div className="search__container">
          <Loading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="search">
        <div className="search__container">
          <div className="error">Qidiruv natijalari yuklanmadi</div>
        </div>
      </main>
    );
  }

  return (
    <main className="search">
      <div className="search__container">
        <h1 className="search__title">
          "{query}" uchun qidiruv natijalari
        </h1>

        {filteredProducts?.length === 0 ? (
          <div className="search__no-results">
            Hech qanday mahsulot topilmadi
          </div>
        ) : (
          <div className="search__results">
            {filteredProducts?.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
} 