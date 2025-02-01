"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const NewsSection = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchNews = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/news`, {
                withCredentials: true
            });
            console.log(response.data);
            setNews(response.data);
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

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Latest News</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news?.map((item: any, index: number) => (
                    <Card key={item._id}>
                        <>{JSON.stringify(item)}</>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default NewsSection;