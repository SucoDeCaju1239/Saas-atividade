"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus, Search, Star, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

const fastFoodProducts: Product[] = [
  {
    id: 1,
    name: "Big Burger Deluxe",
    description: "Hambúrguer duplo com queijo, alface, tomate e molho especial",
    price: 24.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "lanches",
  },
  {
    id: 2,
    name: "Chicken Crispy",
    description: "Frango empanado crocante com maionese temperada",
    price: 19.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "lanches",
  },
  {
    id: 3,
    name: "Batata Frita Grande",
    description: "Porção generosa de batatas fritas douradas",
    price: 12.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "lanches",
  },
  {
    id: 4,
    name: "Coca-Cola 500ml",
    description: "Refrigerante gelado",
    price: 6.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "bebidas",
  },
  {
    id: 5,
    name: "Suco de Laranja",
    description: "Suco natural de laranja 400ml",
    price: 8.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "bebidas",
  },
  {
    id: 6,
    name: "Milkshake Chocolate",
    description: "Cremoso milkshake de chocolate com chantilly",
    price: 14.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "bebidas",
  },
]

const pharmacyProducts: Product[] = [
  {
    id: 7,
    name: "Paracetamol 500mg",
    description: "Analgésico e antitérmico para dores e febre",
    price: 8.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "medicamentos",
  },
  {
    id: 8,
    name: "Vitamina C 1g",
    description: "Suplemento para fortalecer a imunidade",
    price: 15.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "medicamentos",
  },
  {
    id: 9,
    name: "Protetor Solar FPS 60",
    description: "Proteção solar facial e corporal",
    price: 32.9,
    image: "/placeholder.svg?height=300&width=300",
    category: "medicamentos",
  },
]

export default function Component() {
  const [isPharmacyMode, setIsPharmacyMode] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)

  const currentProducts = isPharmacyMode ? pharmacyProducts : fastFoodProducts
  const categories = isPharmacyMode ? ["todos"] : ["todos", "lanches", "bebidas"]

  const filteredProducts =
    selectedCategory === "todos"
      ? currentProducts
      : currentProducts.filter((product) => product.category === selectedCategory)

  const addToCart = async (product: Product) => {
    setAddingToCart(product.id)

    // Simulate loading time for animation
    await new Promise((resolve) => setTimeout(resolve, 800))

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })

    setAddingToCart(null)
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId)
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity - 1 } : item))
      }
      return prevCart.filter((item) => item.id !== productId)
    })
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const handleSecretTransformation = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setIsPharmacyMode(!isPharmacyMode)
      setCart([])
      setSelectedCategory("todos")
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isPharmacyMode
          ? "bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200"
          : "bg-gradient-to-br from-yellow-400 to-white-400"
      } ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
    >
      {/* Header with different styles for each mode */}
      <header className={`${isPharmacyMode ? "p-6" : "p-6"}`}>
        <div className="container mx-auto">
          {!isPharmacyMode ? (
            // Fast Food Header
            <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full px-8 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <h1 className="text-2xl font-bold text-yellow-700">Don Pollos Hermano</h1>
                  <div className="flex space-x-1">
                    <Star className="h-4 w-4 text-red-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-blue-400 fill-current" />
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <Star className="h-4 w-4 text-purple-400 fill-current" />
                  </div>
                </div>

                <nav className="hidden lg:flex items-center space-x-8">
                  <button
                    onClick={() => setSelectedCategory("todos")}
                    className={`font-medium transition-colors ${
                      selectedCategory === "todos" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setSelectedCategory("lanches")}
                    className={`font-medium transition-colors ${
                      selectedCategory === "lanches" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"
                    }`}
                  >
                    Lanches
                  </button>
                  <button
                    onClick={() => setSelectedCategory("bebidas")}
                    className={`font-medium transition-colors ${
                      selectedCategory === "bebidas" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"
                    }`}
                  >
                    Bebidas
                  </button>
                  <span className="text-gray-400">|</span>
                  <a href="#" className="text-gray-700 hover:text-red-700 font-medium transition-colors">
                    About
                  </a>
                </nav>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder=""
                      className="pl-4 pr-12 py-2 w-48 rounded-full bg-orange-200/50 border-0 focus:bg-orange-200/70 focus:ring-orange-300 placeholder:text-transparent"
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-600" />
                  </div>

                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="relative bg-orange-500 hover:bg-orange-600 text-white border-0 rounded-full px-6 py-2"
                      >
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Cart
                        {getTotalItems() > 0 && (
                          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white animate-bounce">
                            {getTotalItems()}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Seu Carrinho</SheetTitle>
                        <SheetDescription>
                          {cart.length === 0 ? "Seu carrinho está vazio" : `${getTotalItems()} itens no carrinho`}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)} cada</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {cart.length > 0 && (
                          <>
                            <Separator />
                            <div className="flex justify-between items-center font-bold text-lg">
                              <span>Total:</span>
                              <span>R$ {getTotalPrice().toFixed(2)}</span>
                            </div>
                            <Button className="w-full bg-orange-500 hover:bg-orange-600" size="lg">
                              Finalizar Pedido
                            </Button>
                          </>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                </div>
              </div>
            </div>
          ) : (
            // Pharmacy Header - Clean and minimal like the image
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 border-2 border-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-gray-800 font-bold text-sm">LOGO</span>
                  </div>
                </div>

                <nav className="hidden lg:flex items-center space-x-12">
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    Home
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    About us
                  </a>
                  <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
                    Service
                  </a>
                </nav>

                <div className="flex items-center space-x-4">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="sm" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        {getTotalItems() > 0 && (
                          <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white animate-bounce">
                            {getTotalItems()}
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Seu Carrinho</SheetTitle>
                        <SheetDescription>
                          {cart.length === 0 ? "Seu carrinho está vazio" : `${getTotalItems()} itens no carrinho`}
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6 space-y-4">
                        {cart.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-muted-foreground">R$ {item.price.toFixed(2)} cada</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        {cart.length > 0 && (
                          <>
                            <Separator />
                            <div className="flex justify-between items-center font-bold text-lg">
                              <span>Total:</span>
                              <span>R$ {getTotalPrice().toFixed(2)}</span>
                            </div>
                            <Button className="w-full bg-purple-600 hover:bg-purple-700" size="lg">
                              Finalizar Pedido
                            </Button>
                          </>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>
                  <Button variant="ghost" size="sm">
                    <Menu className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {!isPharmacyMode && (
        <>
          {/* Hero Section for Fast Food */}
          <section className="py-16">
            <div className="container mx-auto px-6">
              <div className="bg-gradient-to-r from-red-600 to-yellow-400 rounded-3xl p-12 text-white relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <h2 className="text-5xl font-bold mb-4 leading-tight">
                    APROVEITE 
                    <br />
                    O SEXTOU!
                  </h2>
                  <p className="text-2xl text-red-100 mb-8 font-semibold">
                    Frangos fritos
                    <br />
                    no capricho 
                    <br />
                    para toda família!
                  </p>
                  <Button className="bg-yellow-500 hover:bg-red-800 text-white px-8 py-4 text-lg font-bold rounded-lg">
                    Shop Now
                  </Button>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Delicious Burger"
                    className="w-full h-full object-cover rounded-r-3xl"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-8">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-yellow-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">Frango frito c/ MOLHO ESPECIAL </h3>
                  <p className="text-yellow-100">Molho secreto com a base de ketchup e churrasco</p>
                </div>
                <div className="bg-yellow-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">Prove essa delícia!</h3>
                  <p className="text-yellow-100">Quer frango frito?? Ele sai rapidinho!</p>
                </div>
                <div className="bg-yellow-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-2 text-gray-100">Bebidas bem + refrescantes</h3>
                  <p className="text-yellow-100">Com uma boa comida, não pode faltar a bebida!</p>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {isPharmacyMode && (
        /* Pharmacy Landing Page like the image */
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 text-gray-800 leading-tight">PHARMA STORE.</h2>
                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonumy. Lorem ipsum dolor sit amet,
                  consectetur amet adipiscing elit, sed diam nonumy adipiscing.
                </p>
                <Button className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 text-lg font-semibold rounded-full">
                  GET STARTED
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=500&width=600"
                  alt="Pharmacy Store Illustration"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isPharmacyMode ? "max-w-4xl mx-auto" : ""}`}
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader className="p-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-3">{product.name}</CardTitle>
                  <CardDescription className="text-gray-600 mb-4">{product.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-red-600">R$ {product.price.toFixed(2)}</span>
                    {!isPharmacyMode && (
                      <Badge variant="secondary" className="capitalize bg-red-100 text-red-900">
                        {product.category}
                      </Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Button
                    className={`w-full text-white py-3 text-lg font-semibold transition-all duration-300 ${
                      isPharmacyMode ? "bg-purple-600 hover:bg-purple-700" : "bg-red-500 hover:bg-red-800"
                    } ${addingToCart === product.id ? "scale-95" : "scale-100"}`}
                    onClick={() => addToCart(product)}
                    disabled={addingToCart === product.id}
                  >
                    {addingToCart === product.id ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Adicionando...</span>
                      </div>
                    ) : (
                      <>
                        <Plus className="h-5 w-5 mr-2" />
                        {isPharmacyMode ? "Comprar" : "Adicionar ao Carrinho"}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-red-800 text-white py-12 mt-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">{isPharmacyMode ? "Gus fring service" : "Don Pollos Hermano"}</h3>
          <p className="text-gray-200 text-lg">
            {isPharmacyMode ? "Cuidando da sua saúde com qualidade e confiança" : "Sabor e qualidade em cada mordida"}
          </p>
        </div>
      </footer>

      {/* Secret Button */}
      <button
        onClick={handleSecretTransformation}
        className="fixed bottom-4 right-4 w-3 h-3 bg-transparent border-none cursor-pointer opacity-0 hover:opacity-20 transition-opacity duration-300"
        aria-label="Secret transformation button"
      />
    </div>
  )
}
