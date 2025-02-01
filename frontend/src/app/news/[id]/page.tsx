"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

const Page = () => {
  const params = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log(params.id);
        
        const response = await axios.get(`http://localhost:3001/api/news/${params.id}`, {withCredentials: true});
        setNews(response.data.data);
        console.log(response.data.data);
        
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchNews()
  }, [params.id])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error loading news</div>
  if (!news) return <div className="text-center">News not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold">{news.title}</h1>
        </CardHeader>
        <CardContent>
          <p className="text-white/90">{news.description}</p>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Tags:</h3>
            <div className="flex gap-2 flex-wrap">
              {news.tags?.map((tag: string) => (
                <span key={tag} className="bg-gray-900 px-2 py-1 rounded-md text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Page
