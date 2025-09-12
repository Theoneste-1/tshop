import { Button } from "@/components/ui/button"

export function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-purple-50 rounded-lg p-8 mb-8 flex items-center justify-between">
      <div className="flex-1">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Grab Upto 50% Off On
          <br />
          Selected Headphone
        </h1>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">Buy Now</Button>
      </div>
      <div className="flex-1 flex justify-end">
        <img src="/woman-wearing-headphones-in-purple-hoodie.jpg" alt="Woman wearing headphones" className="h-64 w-64 object-cover" />
      </div>
    </div>
  )
}
