import { Header } from "@/components/header"
import { ProductDetails } from "@/components/product-details"
import { notFound } from "next/navigation"

// This would typically come from a database or API
const products = [
  {
    id: 1,
    name: "Wireless Earbuds, IPX8",
    description: "Organic Cotton, fairtrade certified",
    fullDescription:
      "Experience premium sound quality with these wireless earbuds featuring IPX8 water resistance and organic cotton materials.",
    price: 89,
    monthlyPrice: 14.99,
    rating: 4.5,
    reviews: 121,
    image: "/black-wireless-earbuds.jpg",
    colors: ["black", "white", "blue"],
    stock: 15,
    category: "Wireless Earbuds",
  },
  {
    id: 2,
    name: "Airpods-Max",
    description: "A perfect balance of high-fidelity audio",
    fullDescription: "A perfect balance of exhilarating high-fidelity audio and the effortless magic of AirPods.",
    price: 549,
    monthlyPrice: 99.99,
    rating: 4.8,
    reviews: 521,
    image: "/pink-airpods-max-headphones.jpg",
    colors: ["pink", "black", "green", "silver", "blue"],
    stock: 12,
    category: "Over-Ear Headphones",
  },
  {
    id: 3,
    name: "Bose BT Earphones",
    description: "Table with air purifier, stained veneer/black",
    fullDescription: "Premium Bose Bluetooth earphones with active noise cancellation and superior sound quality.",
    price: 289,
    monthlyPrice: 48.17,
    rating: 4.6,
    reviews: 267,
    image: "/black-over-ear-headphones.jpg",
    colors: ["black", "white", "blue"],
    stock: 8,
    category: "Bluetooth Earphones",
  },
  {
    id: 4,
    name: "VIVEFOX Headphones",
    description: "Wired Stereo Headset With Mic",
    fullDescription: "High-quality wired stereo headphones with built-in microphone for clear communication.",
    price: 39,
    monthlyPrice: 6.5,
    rating: 4.3,
    reviews: 167,
    image: "/red-wired-headphones.jpg",
    colors: ["red", "black", "white"],
    stock: 25,
    category: "Wired Headphones",
  },
  {
    id: 5,
    name: "JBL TUNE 500BT/NC",
    description: "Premium Bone Conduction Open Ear Bluetooth",
    fullDescription: "JBL TUNE 500BT with premium bone conduction technology for open ear listening experience.",
    price: 59,
    monthlyPrice: 9.83,
    rating: 4.2,
    reviews: 123,
    image: "/black-over-ear-headphones-jbl.jpg",
    colors: ["black", "blue", "white"],
    stock: 18,
    category: "Bone Conduction",
  },
  {
    id: 6,
    name: "TAGRY Bluetooth",
    description: "25K + Bone GPU, 8 GB",
    fullDescription: "Advanced TAGRY Bluetooth earbuds with enhanced processing power and extended battery life.",
    price: 109,
    monthlyPrice: 18.17,
    rating: 4.7,
    reviews: 129,
    image: "/black-wireless-earbuds-case.jpg",
    colors: ["black", "white", "gray"],
    stock: 22,
    category: "Wireless Earbuds",
  },
  {
    id: 7,
    name: "Monster MNFLEX",
    description: "Top Active Noise Cancelling Bluetooth",
    fullDescription: "Monster MNFLEX with top-tier active noise cancelling technology for immersive audio experience.",
    price: 89,
    monthlyPrice: 14.83,
    rating: 4.4,
    reviews: 155,
    image: "/black-bluetooth-headset.jpg",
    colors: ["black", "red", "blue"],
    stock: 11,
    category: "Noise Cancelling",
  },
  {
    id: 8,
    name: "Mpow CH6",
    description: "Kids Headphones",
    fullDescription:
      "Safe and comfortable headphones designed specifically for children with volume limiting technology.",
    price: 569,
    monthlyPrice: 94.83,
    rating: 4.6,
    reviews: 162,
    image: "/blue-kids-headphones.jpg",
    colors: ["blue", "pink", "green"],
    stock: 7,
    category: "Kids Headphones",
  },
]

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6">
        <ProductDetails product={product} />
      </main>
    </div>
  )
}
