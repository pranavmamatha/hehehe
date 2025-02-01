import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsSection from "@/components/sections/ProductsSection";
import AuthSection from "@/components/sections/AuthSection";
import NewsSection from "@/components/sections/NewsSection";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          <div>
            <Link href="/">
            home
            </Link>
          </div>
          <div>
            <Link href="/about">
            about us
            </Link>
          </div>
          <div>
            <Link href="/news">
            new product
            </Link>
          </div>
        </div>
        <>
        </>
      </div>

      {/* Main grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr,1.5fr] gap-6">
        {/* News Section */}
        <div className="rounded-lg border bg-card p-6 h-[600px] overflow-scroll">
          <h2 className="text-2xl font-bold mb-4">news</h2>
          <NewsSection/>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* Products Section */}
          <div className="rounded-lg border bg-card p-6 h-[300px] overflow-scroll">
            <ProductsSection/>
          </div>

          {/* Maps Section */}
          <div className="rounded-lg border bg-card h-[260px] overflow-scroll">
            <img src="https://wmo.int/sites/default/files/styles/featured_image_x1_768x512/public/news/featured_media/render-worker-commands-7c47f6996d-7pm8d-6fe5cac1a363ec1525f54343b6cc9fd8-sZSUWd_0.png?h=dcb877b9&itok=xKCY2Lyv" className="w-full" />
          </div>
        </div>
      </div>
    </main>
  );
}
