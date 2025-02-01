"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Page = () => {
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    technologies: '',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          ...product,
          technologies: product.technologies.split(','),
          tags: product.tags.split(','),
        }),
      });
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Name</label>
              <Input
                value={product.name}
                onChange={(e) => setProduct({...product, name: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Description</label>
              <Textarea
                value={product.description}
                onChange={(e) => setProduct({...product, description: e.target.value})}
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Technologies (comma-separated)</label>
              <Input
                value={product.technologies}
                onChange={(e) => setProduct({...product, technologies: e.target.value})}
                placeholder="React, Node.js, MongoDB"
                required
              />
            </div>
            
            <div>
              <label className="block mb-2">Tags (comma-separated)</label>
              <Input
                value={product.tags}
                onChange={(e) => setProduct({...product, tags: e.target.value})}
                placeholder="web, mobile, desktop"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => router.push('/')}>
                Cancel
              </Button>
              <Button type="submit">
                Create Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
