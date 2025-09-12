"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, CreditCard, CheckCircle } from "lucide-react"
import { getCart, clearCart, type CartItem } from "@/lib/cart"
import Link from "next/link"
import { useRouter } from "nextjs-toploader/app"

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Confirmation
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  useEffect(() => {
    const cart = getCart()
    if (cart.length === 0) {
      router.push("/cart")
    }
    setCartItems(cart)

    // Pre-fill user info if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setShippingInfo((prev) => ({
        ...prev,
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      }))
    }
  }, [])

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handlePlaceOrder = () => {
    // Create order object
    const order = {
      id: Date.now().toString(),
      items: cartItems,
      shippingInfo,
      paymentInfo: { ...paymentInfo, cardNumber: "**** **** **** " + paymentInfo.cardNumber.slice(-4) },
      total: getTotalPrice() * 1.08,
      status: "confirmed",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    }

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    existingOrders.push(order)
    localStorage.setItem("orders", JSON.stringify(existingOrders))

    // Clear cart
    clearCart()
    setOrderPlaced(true)

    console.log("[v0] Order placed:", order)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemsCount={0} />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <div className="space-y-3">
              <Link href="/delivery">
                <Button className="bg-green-600 hover:bg-green-700 mr-4">Track Your Order</Button>
              </Link>
              <Link href="/">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={getTotalItems()} />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${step >= 1 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="ml-2">Shipping</span>
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? "bg-green-600" : "bg-gray-200"}`}></div>
              <div className={`flex items-center ${step >= 2 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className="ml-2">Payment</span>
              </div>
              <div className={`w-16 h-1 ${step >= 3 ? "bg-green-600" : "bg-gray-200"}`}></div>
              <div className={`flex items-center ${step >= 3 ? "text-green-600" : "text-gray-400"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? "bg-green-600 text-white" : "bg-gray-200"}`}
                >
                  <CheckCircle className="h-4 w-4" />
                </div>
                <span className="ml-2">Confirm</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          value={shippingInfo.fullName}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, fullName: e.target.value }))}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <Input
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, email: e.target.value }))}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <Input
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Address</label>
                      <Input
                        value={shippingInfo.address}
                        onChange={(e) => setShippingInfo((prev) => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter your address"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <Input
                          value={shippingInfo.city}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, city: e.target.value }))}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">State</label>
                        <Input
                          value={shippingInfo.state}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, state: e.target.value }))}
                          placeholder="State"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">ZIP Code</label>
                        <Input
                          value={shippingInfo.zipCode}
                          onChange={(e) => setShippingInfo((prev) => ({ ...prev, zipCode: e.target.value }))}
                          placeholder="ZIP Code"
                          required
                        />
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setStep(2)}>
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <Input
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <Input
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVV</label>
                        <Input
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cardholder Name</label>
                      <Input
                        value={paymentInfo.cardName}
                        onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardName: e.target.value }))}
                        placeholder="Name on card"
                        required
                      />
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back to Shipping
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => setStep(3)}>
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Order Confirmation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Shipping Address</h3>
                      <p className="text-gray-600">
                        {shippingInfo.fullName}
                        <br />
                        {shippingInfo.address}
                        <br />
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
                        <br />
                        {shippingInfo.phone}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Payment Method</h3>
                      <p className="text-gray-600">
                        **** **** **** {paymentInfo.cardNumber.slice(-4)}
                        <br />
                        {paymentInfo.cardName}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back to Payment
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handlePlaceOrder}>
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <hr />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
