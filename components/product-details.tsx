"use client"

import { useState } from "react"
import { Heart, Minus, Plus, Package, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

interface Product {
  id: number
  name: string
  description: string
  fullDescription: string
  price: number
  monthlyPrice: number
  rating: number
  reviews: number
  image: string
  colors: string[]
  stock: number
  category: string
}

interface ProductDetailsProps {
  product: Product
}

const colorMap: Record<string, string> = {
  pink: "bg-pink-400",
  black: "bg-black",
  green: "bg-green-400",
  silver: "bg-gray-300",
  blue: "bg-blue-400",
  white: "bg-white border-2 border-gray-200",
  red: "bg-red-400",
  gray: "bg-gray-400",
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)

  const breadcrumbs = [
    { name: "Electronics", href: "/" },
    { name: "Audio", href: "/" },
    { name: "Headphones", href: "/" },
    { name: "Shop Headphones by type", href: "/" },
    { name: product.name.toLowerCase().replace(/\s+/g, "-"), href: "#" },
  ]

  return (
    <div>
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            <Link
              href={crumb.href}
              className={index === breadcrumbs.length - 1 ? "text-gray-900 font-medium" : "hover:text-gray-900"}
            >
              {crumb.name}
            </Link>
          </div>
        ))}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <Card className="mb-4">
            <CardContent className="p-6">
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <Button variant="ghost" size="sm" className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {product.colors.map((color, index) => (
              <Card key={color} className="cursor-pointer hover:ring-2 hover:ring-green-500">
                <CardContent className="p-2">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} in ${color}`}
                    className="w-full h-16 object-cover rounded"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.fullDescription}</p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex text-amber-500">
              {"★".repeat(Math.floor(product.rating))}
              {"☆".repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="text-3xl font-bold mb-1">
              ${product.price}.00 or {product.monthlyPrice}/month
            </div>
            <p className="text-sm text-gray-600">Suggested payments with 6 months special financing</p>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Choose a Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full ${colorMap[color]} ${
                    selectedColor === color ? "ring-2 ring-green-500 ring-offset-2" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border rounded-lg">
              <Button variant="ghost" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-3"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="text-sm">
              <span className="text-orange-500 font-medium">Only {product.stock} Items Left!</span>
              <br />
              <span className="text-gray-600">Don't miss it</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mb-6">
            <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3">Buy Now</Button>
            <Button variant="outline" className="flex-1 py-3 bg-transparent">
              Add to Cart
            </Button>
          </div>

          {/* Delivery Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Package className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">Free Delivery</h4>
                <p className="text-sm text-gray-600">Enter your Postal code for Delivery Availability</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <RotateCcw className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-semibold">Return Delivery</h4>
                <p className="text-sm text-gray-600">Free 30days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Specifications */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Apple AirPods Max Wireless Headphones Full Specifications</h2>
        {/* Additional specifications content would go here */}
      </div>
    </div>
  )
}
