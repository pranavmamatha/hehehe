'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from 'next/navigation';

export default function ProductsSection() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    technologies: '',
    tags: '',
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.products);
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleCreateProduct = async () => {
    redirect('/add-product');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <div className='flex justify-between text-2xl font-bold'>
      Products Section
      <Button onClick={handleCreateProduct}>
        + New Product
      </Button>
      </div>
      <div className="grid grid-cols-1 gap-1">
        {products?.map((product: any) => (
          <Card key={product.id}>
            <CardHeader className='text-2xl font-semibold'>{product.name}</CardHeader>
            <CardContent>
              <p>{product.description}</p>
              <div className="mt-2">
                <p>Technologies: {product.technologies.join(', ')}</p>
                <p>Tags: {product.tags.join(', ')}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 