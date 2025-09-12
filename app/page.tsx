"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { HeroBanner } from "@/components/hero-banner"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { Sidebar } from "@/components/sidebar"
import { products, type Product } from "@/lib/products"
import { addToCart, getCartItemsCount } from "@/lib/cart"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLocation, setSelectedLocation] = useState("All")
  const [cartItemsCount, setCartItemsCount] = useState(0)

  useEffect(() => {
    // Load cart count on mount
    setCartItemsCount(getCartItemsCount())
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      const matchesLocation = selectedLocation === "All" || product.location === selectedLocation

      return matchesSearch && matchesCategory && matchesLocation
    })
  }, [searchQuery, selectedCategory, selectedLocation])

  const handleAddToCart = (product: Product) => {
    const updatedCart = addToCart(product)
    setCartItemsCount(updatedCart.reduce((total, item) => total + item.quantity, 0))
    console.log("[v0] Added to cart:", product.name)
  }

  const handleCartClick = () => {
    window.location.href = "/cart"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={cartItemsCount} onCartClick={handleCartClick} />
      <main className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <div className="flex-1">
            <HeroBanner />
            <ProductFilters
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              onSearchChange={setSearchQuery}
              onCategoryChange={setSelectedCategory}
              onLocationChange={setSelectedLocation}
            />
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
          </div>
          <div className="w-80 flex-shrink-0">
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  )
}
