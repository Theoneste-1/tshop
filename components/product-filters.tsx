"use client"

import { ChevronDown, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { categories, locations } from "@/lib/products"

interface ProductFiltersProps {
  searchQuery: string
  selectedCategory: string
  selectedLocation: string
  onSearchChange: (query: string) => void
  onCategoryChange: (category: string) => void
  onLocationChange: (location: string) => void
}

export function ProductFilters({
  searchQuery,
  selectedCategory,
  selectedLocation,
  onSearchChange,
  onCategoryChange,
  onLocationChange,
}: ProductFiltersProps) {
  return (
    <div className="space-y-4 mb-6 pb-4 border-b">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products or categories..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <span className="text-sm">Category: {selectedCategory}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => onCategoryChange(category)}
                  className={selectedCategory === category ? "bg-green-50" : ""}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                <span className="text-sm">Location: {selectedLocation}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {locations.map((location) => (
                <DropdownMenuItem
                  key={location}
                  onClick={() => onLocationChange(location)}
                  className={selectedLocation === location ? "bg-green-50" : ""}
                >
                  {location}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-2">
            <span className="text-sm">Price</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Review</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Color</span>
            <ChevronDown className="h-4 w-4" />
          </div>
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            All Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by</span>
          <ChevronDown className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
