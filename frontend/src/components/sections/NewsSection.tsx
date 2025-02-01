"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/news`, {
                withCredentials: true
            });
            console.log(response.data.data);
            setNews(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchNews();
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">Error loading news</div>;

    const filteredNews = news.filter((item: any) => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Latest News</h1>
            
            <Input
                type="search"
                placeholder="Search news..."
                className="mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <div className="grid grid-cols-1 gap-5">
                {filteredNews?.map((item: any, index: number) => (
                    <Card key={item._id} className="cursor-pointer " onClick={() => window.location.href = `/news/${item._id}`}>
                        <CardHeader>
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default NewsSection;