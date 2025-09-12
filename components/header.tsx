"use client"

import { Search, ShoppingCart, User, ChevronDown, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import Link from "next/link"

interface HeaderProps {
  cartItemsCount?: number
  onCartClick?: () => void
}

export function Header({ cartItemsCount = 0, onCartClick }: HeaderProps) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      // setUser(JSON.parse(userData))
      setUser({name: "Theonest", email:"theodufi.rw"})
    }
  }, [])

  const handleAccountClick = () => {
    if (user) {
      window.location.href = "/profile"
    } else {
      window.location.href = "/login"
    }
  }

  return (
    <>
      {/* Top promotional bar */}
      <div className="bg-green-700 text-white text-sm py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>+00123456789</span>
            <span>Get 50% Off on Selected Items</span>
            <Button variant="link" className="text-white p-0 h-auto text-sm">
              Shop Now
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span>Eng</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Location</span>
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <span className="text-xl font-bold">Shopcart</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-1">
                <span>Categories</span>
                <ChevronDown className="h-4 w-4" />
              </div>
              <span>Deals</span>
              <Link href="/whats-new" className="hover:text-green-600">
                What's New
              </Link>
              <Link href="/delivery" className="hover:text-green-600">
                Delivery
              </Link>
            </nav>

            {/* Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Input placeholder="Search Product" className="pr-10" />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* User actions */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleAccountClick}>
                <User className="h-4 w-4" />
                <span>{user ? user.name : "Account"}</span>
              </Button>

              <Button variant="ghost" size="sm" className="flex items-center gap-2 relative" onClick={onCartClick}>
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
