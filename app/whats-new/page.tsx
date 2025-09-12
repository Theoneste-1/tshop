"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { ProductSlider } from "@/components/product-slider"
import { products } from "@/lib/products"
import { getCartItemsCount } from "@/lib/cart"

export default function WhatsNewPage() {
  const [cartItemsCount, setCartItemsCount] = useState(0)
  const [viewedProducts, setViewedProducts] = useState<any[]>([])

  useEffect(() => {
    setCartItemsCount(getCartItemsCount())

    // Get recently viewed products from localStorage
    const viewed = localStorage.getItem("viewedProducts")
    if (viewed) {
      const viewedIds = JSON.parse(viewed)
      const viewedItems = products.filter((p) => viewedIds.includes(p.id))
      setViewedProducts(viewedItems)
    }
  }, [])

  // Get recent products (last 8 products by ID)
  const recentProducts = products.slice(-8)

  // Get recommended products (highest rated)
  const recommendedProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8)

  // Get similar items (same categories as viewed products)
  const getSimilarProducts = () => {
    if (viewedProducts.length === 0) return products.slice(0, 8)

    const viewedCategories = [...new Set(viewedProducts.map((p) => p.category))]
    return products
      .filter((p) => viewedCategories.includes(p.category) && !viewedProducts.some((vp) => vp.id === p.id))
      .slice(0, 8)
  }

  const similarProducts = getSimilarProducts()

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">What's New</h1>
          <p className="text-gray-600 mb-12">Discover the latest products and your personalized recommendations</p>

          <div className="space-y-12">
            {/* Recent Products */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Latest Arrivals</h2>
              <ProductSlider products={recentProducts} />
            </section>

            {/* Recently Viewed */}
            {viewedProducts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6">Recently Viewed</h2>
                <ProductSlider products={viewedProducts} />
              </section>
            )}

            {/* Similar Items You Might Like */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Similar Items You Might Like</h2>
              <ProductSlider products={similarProducts} />
            </section>

            {/* Recommended for You */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Recommended for You</h2>
              <ProductSlider products={recommendedProducts} />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
