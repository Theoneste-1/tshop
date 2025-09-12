"use client"

import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import type { Product } from "@/lib/products"

interface ProductGridProps {
  products: Product[]
  onAddToCart: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        {products.length > 0 ? `Products For You! (${products.length})` : "No products found"}
      </h2>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products match your current filters.</p>
          <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <Link href={`/product/${product.id}`}>
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
                    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">{product.location}</span>
                  </div>
                </div>

                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-lg mb-1 hover:text-green-600 transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>

                <div className="flex items-center gap-1 mb-2">
                  <div className="flex text-amber-500">
                    {"★".repeat(Math.floor(product.rating))}
                    {"☆".repeat(5 - Math.floor(product.rating))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews})</span>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">{product.inStock} left</span>
                </div>

                <Button className="w-full mt-3 bg-green-600 hover:bg-green-700" onClick={() => onAddToCart(product)}>
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
