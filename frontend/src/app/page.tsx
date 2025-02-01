import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductsSection from "@/components/sections/ProductsSection";
import AuthSection from "@/components/sections/AuthSection";
import NewsSection from "@/components/sections/NewsSection";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">Security Dashboard</h1>
      </header>

      <AuthSection />
      
      <Tabs defaultValue="products" className="mt-6">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="news">Threat News</TabsTrigger>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="products">
          <ProductsSection />
        </TabsContent>
        
        <TabsContent value="news">
          <>
            <NewsSection />
          </>
        </TabsContent>
        
        <TabsContent value="chat">
          {/* <ChatSection /> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
