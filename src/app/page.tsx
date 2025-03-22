"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pagination, Stack, FormControl, InputLabel, Select, MenuItem, Box, IconButton, Tooltip } from '@mui/material';
import { Clear } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import '@/styles/home.scss';
import { Product, ProductsResponse } from '@/types/product';
import { getProducts } from '@/utils/API';
import Loading from '@/components/Loading';
import { ProductCard } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

const ITEMS_PER_PAGE = 12;

export default function Home() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState<string>('all');
  const [brand, setBrand] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const { data, isLoading, error } = useQuery<ProductsResponse>({
    queryKey: ['products', page],
    queryFn: () => getProducts(100, 0), 
    placeholderData: (previousData) => previousData,
  });

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
    setPage(1); 
  };

  const handleBrandChange = (event: any) => {
    setBrand(event.target.value);
    setPage(1); 
  };

  const handlePriceRangeChange = (event: any) => {
    setPriceRange(event.target.value);
    setPage(1); 
  };

  const handleClearFilters = () => {
    setCategory('all');
    setBrand('all');
    setPriceRange('all');
    setPage(1);
  };

  const hasActiveFilters = category !== 'all' || brand !== 'all' || priceRange !== 'all';

  if (isLoading) {
    return (
      <main className="home">
        <div className="home__container">
          <Loading />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="home">
        <div className="home__container">
          <div className="error">Mahsulotlar yuklanmadi</div>
        </div>
      </main>
    );
  }

  let filteredProducts = data?.products || [];
  
  if (category !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (brand !== 'all') {
    filteredProducts = filteredProducts.filter(product => product.brand === brand);
  }
  
  if (priceRange !== 'all') {
    const [min, max] = priceRange.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => 
      product.price >= min && product.price <= max
    );
  }

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(skip, skip + ITEMS_PER_PAGE);

  const categories = Array.from(new Set(data?.products.map(p => p.category) || []));
  const brands = Array.from(new Set(data?.products.map(p => p.brand) || []));

  return (
    <main className="home">
      <div className="home__container">
        <h1 className="home__title">Mashhur mahsulotlar</h1>
        
        <div className="home__filters">
          <Box sx={{ display: 'flex', gap: 2, mb: 3, alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Kategoriya</InputLabel>
              <Select
                value={category}
                label="Kategoriya"
                onChange={handleCategoryChange}
              >
                <MenuItem value="all">Barchasi</MenuItem>
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Brend</InputLabel>
              <Select
                value={brand}
                label="Brend"
                onChange={handleBrandChange}
              >
                <MenuItem value="all">Barchasi</MenuItem>
                {brands.map(b => (
                  <MenuItem key={b} value={b}>{b}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Narx oralig'i</InputLabel>
              <Select
                value={priceRange}
                label="Narx oralig'i"
                onChange={handlePriceRangeChange}
              >
                <MenuItem value="all">Barchasi</MenuItem>
                <MenuItem value="0-100">$0 - $100</MenuItem>
                <MenuItem value="100-500">$100 - $500</MenuItem>
                <MenuItem value="500-1000">$500 - $1000</MenuItem>
                <MenuItem value="1000-999999">$1000+</MenuItem>
              </Select>
            </FormControl>

            {hasActiveFilters && (
              <Tooltip title="Filtrlarni tozalash">
                <IconButton 
                  onClick={handleClearFilters}
                  color="primary"
                  sx={{ 
                    backgroundColor: '#f3f4f6',
                    '&:hover': {
                      backgroundColor: '#e5e7eb'
                    }
                  }}
                >
                  <Clear />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </div>
        
        <div className="home__products">
          {paginatedProducts.map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Stack spacing={2} alignItems="center" className="home__pagination">
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Stack>
        )}
      </div>
    </main>
  );
}
