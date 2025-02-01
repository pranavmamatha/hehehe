'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...newProduct,
          technologies: newProduct.technologies.split(','),
          tags: newProduct.tags.split(','),
        }),
      });
      if (response.ok) {
        fetchProducts();
        setNewProduct({ name: '', description: '', technologies: '', tags: '' });
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>Add New Product</CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <Textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <Input
              placeholder="Technologies (comma-separated)"
              value={newProduct.technologies}
              onChange={(e) => setNewProduct({ ...newProduct, technologies: e.target.value })}
            />
            <Input
              placeholder="Tags (comma-separated)"
              value={newProduct.tags}
              onChange={(e) => setNewProduct({ ...newProduct, tags: e.target.value })}
            />
            <Button onClick={handleCreateProduct}>Create Product</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.map((product: any) => (
          <Card key={product.id}>
            <CardHeader>{product.name}</CardHeader>
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