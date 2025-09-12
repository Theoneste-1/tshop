import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Review Item And Shipping</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <img src="/pink-airpods-max.jpg" alt="AirPods Max" className="w-15 h-15 rounded" />
            <div className="flex-1">
              <h4 className="font-medium">Airpods Max</h4>
              <p className="text-sm text-gray-600">Silver</p>
              <p className="font-semibold">$549.00</p>
            </div>
            <Badge className="bg-green-600">Free</Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$549.00</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>$61.99</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$610.99</span>
            </div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700">Continue to checkout</Button>
        </CardContent>
      </Card>

      {/* Popular Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Popular Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">🪑</div>
              <div>
                <p className="font-medium text-sm">Furniture</p>
                <p className="text-xs text-gray-500">285 Brands</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">🎧</div>
              <div>
                <p className="font-medium text-sm">Headphone</p>
                <p className="text-xs text-gray-500">285 Brands</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">👟</div>
              <div>
                <p className="font-medium text-sm">Shoes</p>
                <p className="text-xs text-gray-500">285 Brands</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">👜</div>
              <div>
                <p className="font-medium text-sm">Bag</p>
                <p className="text-xs text-gray-500">285 Brands</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">💻</div>
              <div>
                <p className="font-medium text-sm">Laptop</p>
                <p className="text-xs text-gray-500">285 Brands</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">📚</div>
              <div>
                <p className="font-medium text-sm">Book</p>
                <p className="text-xs text-gray-500">285 Brands</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Detail View */}
      <Card>
        <CardContent className="p-4">
          <div className="text-center mb-4">
            <img src="/pink-airpods-max-headphones.jpg" alt="AirPods Max" className="w-32 h-32 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Airpods Max</h3>
            <p className="text-sm text-gray-600 mb-2">A perfect balance of high-fidelity audio performance</p>
            <p className="text-2xl font-bold">
              $549.00 <span className="text-sm text-gray-500">or $99.99/month</span>
            </p>
          </div>

          <div className="flex gap-2 mb-4">
            <div className="w-8 h-8 bg-pink-300 rounded-full border-2 border-pink-500"></div>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
            <div className="w-8 h-8 bg-green-300 rounded-full"></div>
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 mb-2">Buy Now</Button>
          <Button variant="outline" className="w-full bg-transparent">
            Add to Cart
          </Button>
        </CardContent>
      </Card>

      {/* Product List */}
      <Card>
        <CardContent className="p-4 space-y-4">
          {[
            { name: "Wireless Earbuds", rating: 4.5, reviews: 121, price: 89 },
            { name: "Wireless Earbuds", rating: 4.5, reviews: 121, price: 559 },
            { name: "Bose BT Earphones", rating: 4.5, reviews: 121, price: 89 },
            { name: "Beats solo3", rating: 4.5, reviews: 121, price: 1199 },
            { name: "Tap Tronics Earbuds", rating: 4.5, reviews: 121, price: 59 },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <div className="flex items-center gap-1">
                    <div className="flex text-yellow-400 text-xs">{"★".repeat(Math.floor(item.rating))}</div>
                    <span className="text-xs text-gray-500">({item.reviews})</span>
                  </div>
                </div>
              </div>
              <span className="font-semibold">${item.price}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
