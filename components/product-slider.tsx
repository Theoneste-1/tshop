"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Heart } from "lucide-react"
import type { Product } from "@/lib/products"
import { addToCart } from "@/lib/cart"
import Link from "next/link"

interface ProductSliderProps {
  products: Product[]
}

export function ProductSlider({ products }: ProductSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerView = 4
  const maxIndex = Math.max(0, products.length - itemsPerView)

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product)
    console.log("[v0] Added to cart from slider:", product.name)
  }

  const handleProductClick = (productId: number) => {
    // Track viewed products
    const viewed = localStorage.getItem("viewedProducts")
    const viewedIds = viewed ? JSON.parse(viewed) : []

    if (!viewedIds.includes(productId)) {
      viewedIds.push(productId)
      // Keep only last 10 viewed products
      if (viewedIds.length > 10) {
        viewedIds.shift()
      }
      localStorage.setItem("viewedProducts", JSON.stringify(viewedIds))
    }
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No products available</p>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="h-8 w-8 p-0 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          {currentIndex + 1}-{Math.min(currentIndex + itemsPerView, products.length)} of {products.length}
        </div>
      </div>

      {/* Product Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {products.map((product) => (
            <div key={product.id} className="w-1/4 flex-shrink-0 px-2">
              <Card className="group hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-4">
                  <div className="relative mb-4">
                    <Link href={`/product/${product.id}`} onClick={() => handleProductClick(product.id)}>
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                    </Link>
                    <Button variant="ghost" size="sm" className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <div className="absolute bottom-2 left-2 flex gap-1">
                      <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">{product.category}</span>
                    </div>
                  </div>

                  <Link href={`/product/${product.id}`} onClick={() => handleProductClick(product.id)}>
                    <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors cursor-pointer line-clamp-1">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex text-amber-500">
                      {"★".repeat(Math.floor(product.rating))}
                      {"☆".repeat(5 - Math.floor(product.rating))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-500">{product.inStock} left</span>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-green-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
