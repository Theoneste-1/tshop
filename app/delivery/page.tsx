"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface Order {
  id: string
  items: any[]
  shippingInfo: any
  total: number
  status: string
  orderDate: string
  estimatedDelivery: string
}

export default function DeliveryPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      window.location.href = "/login"
      return
    }
    setUser(JSON.parse(userData))

    // Load orders
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "shipped":
        return <Truck className="h-5 w-5 text-orange-500" />
      case "delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-orange-100 text-orange-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-2">No Orders Yet</h1>
            <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">Start Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Orders & Deliveries</h1>

          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        Order #{order.id}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mt-1">
                        Placed on {new Date(order.orderDate).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-3">Items ({order.items.length})</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">+{order.items.length - 3} more items</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Shipping Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2 flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Shipping Address
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order.shippingInfo.fullName}
                        <br />
                        {order.shippingInfo.address}
                        <br />
                        {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Order Summary</h3>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Total Amount:</span>
                          <span className="font-medium">${order.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Delivery:</span>
                          <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Status Timeline */}
                  <div>
                    <h3 className="font-semibold mb-3">Order Status</h3>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <span className="ml-2 text-sm">Confirmed</span>
                      </div>
                      <div
                        className={`w-16 h-1 ${order.status === "shipped" || order.status === "delivered" ? "bg-green-600" : "bg-gray-200"}`}
                      ></div>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "shipped" || order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                        >
                          <Truck className="h-4 w-4" />
                        </div>
                        <span className="ml-2 text-sm">Shipped</span>
                      </div>
                      <div
                        className={`w-16 h-1 ${order.status === "delivered" ? "bg-green-600" : "bg-gray-200"}`}
                      ></div>
                      <div className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${order.status === "delivered" ? "bg-green-600 text-white" : "bg-gray-200"}`}
                        >
                          <Package className="h-4 w-4" />
                        </div>
                        <span className="ml-2 text-sm">Delivered</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
