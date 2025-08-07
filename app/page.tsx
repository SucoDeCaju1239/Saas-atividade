"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, Plus, Minus, Search, Star, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { link } from "fs"
import React from 'react';


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
    image: "/images/deluxe.jpg",
    category: "lanches",
  },
  {
    id: 2,
    name: "Chicken Crispy",
    description: "Frango empanado crocante com maionese temperada",
    price: 19.9,
    image: "/images/chicken.jpg",
    category: "lanches",
  },
  {
    id: 3,
    name: "Batata Frita Grande",
    description: "Porção generosa de batatas fritas douradas",
    price: 12.9,
    image: "/images/potato.jpg",
    category: "lanches",
  },
  {
    id: 4,
    name: "Coca-Cola 500ml",
    description: "Refrigerante gelado",
    price: 6.9,
    image: "/images/coca.jpg",
    category: "bebidas",
  },
  {
    id: 5,
    name: "Suco de Laranja",
    description: "Suco natural de laranja 400ml",
    price: 8.9,
    image: "/images/aranja.jpg",
    category: "bebidas",
  },
  {
    id: 6,
    name: "Milkshake Chocolate",
    description: "Cremoso milkshake de chocolate com chantilly",
    price: 14.9,
    image: "/images/chocolate.jpg",
    category: "bebidas",
  },
  {
    id: 7,
    name: "Onion Rings",
    description: "Anéis de cebola empanados crocantes",
    price: 13.5,
    image: "/images/onionrings.jpg",
    category: "lanches",
  },
  {
    id: 8,
    name: "Cheddar Bacon",
    description: "Hambúrguer com cheddar cremoso e bacon crocante",
    price: 26.9,
    image: "/images/cheddar.jpg",
    category: "lanches",
  },
  {
    id: 9,
    name: "Combo Família",
    description: "2 hambúrgueres, 2 batatas grandes e 2 refrigerantes",
    price: 59.9,
    image: "/images/combo.jpg",
    category: "lanches",
  },
  {
    id: 10,
    name: "Sorvete Sundae",
    description: "Sorvete de baunilha com calda de chocolate",
    price: 9.9,
    image: "/images/sundae.jpg",
    category: "sobremesas",
  },
  {
    id: 11,
    name: "Brownie Quente",
    description: "Brownie de chocolate com cobertura e bola de sorvete",
    price: 14.9,
    image: "/images/brownie.jpg",
    category: "sobremesas",
  },
  {
    id: 14,
    name: "Açai",
    description: "Açaí Fruit Delicioso",
    price: 22.0,
    image: "/images/acai.jpg",
    category: "sobremesas",
  },
  {
    id: 15,
    name: "Docinhos",
    description: "Brigadeiro, Beijinho e muito mais",
    price: 1.5,
    image: "/images/docinhos.jpg",
    category: "sobremesas",
  },
    {
    id: 16,
    name: "Expressinho",
    description: "Café expresso forte",
    price: 9.5,
    image: "/images/expressinho.jpg",
    category: "sobremesas",
  },
  {
    id: 12,
    name: "Água Mineral 500ml",
    description: "Água natural ou com gás",
    price: 4.5,
    image: "/images/agua.jpg",
    category: "bebidas",
  },
  {
    id: 13,
    name: "Cerveja, Copo 500ml",
    description: "Brahma, Petra, Itaipava a muito mais.",
    price: 8.0,
    image: "/images/cerveja.jpg",
    category: "bebidas",
  }
]


const pharmacyProducts: Product[] = [
  {
    id: 7,
    name: "Metanfetamina 100/mg",
    description: "Quem consome metanfetamina sente um elevado estado de alerta, redução do cansaço e aumento da energia e da libido. Com a agitação prolongada e estímulos variados, o indivíduo acaba deixando de comer e de dormir adequadamente.",
    price: 50.5,
    image: "/images/metanfetamina.jpeg",
    category: "medicamentos",
  },
  {
    id: 8,
    name: "Metadona 25/mg",
    description: "A sensação de relaxamento aparece nos primeiros instantes de contato com a droga. O exagero, porém, pode resultar em problemas como depressão respiratória e circulatória, disforia, dor de cabeça, insônia, desorientação, fraqueza e distúrbios visuais.",
    price: 30.9,
    image: "/images/metadona.jpg",
    category: "medicamentos",
  },
  {
    id: 9,
    name: "Anfetamina 75/mg",
    description: "Empregada em tratamentos do Transtorno de Déficit de Atenção com Hiperatividade (TDAH), essa substância é encontrada em várias misturas ilícitas. É muito procurada para consumo recreativo por aumentar a energia, a autoconfiança, o bem-estar e o desejo sexual",
    price: 32.9,
    image: "/images/anfetamina.jpeg",
    category: "medicamentos",
  },
  {
  id: 10,
  name: "Cocaína 750/mg",
  description: "Ao entrar em contato com o organismo, essa substância provoca sérios prejuízos. Por ser ácida, ela causa a erosão do esmalte dental, afetando a saúde dos dentes e da gengiva. O consumo de cocaína impacta as funções cerebrais ao desequilibrar a liberação de importantes neurotransmissores que controlam o sono e o apetite.",
  price: 150.5,
  image: "/images/cocaina.jpg",
  category: "medicamentos",
},
{
  id: 11,
  name: "Heroína 25/mg",
  description: "É uma das drogas com grande potencial para causar adicção, pois alcança o Sistema Nervoso Central em questão de segundos. Os efeitos no corpo e na mente do dependente químico podem ser irreversíveis. O consumo desenfreado desse tipo de substância gera distúrbios emocionais e psíquicos que comprometem a vida social, acadêmica e profissional.",
  price: 20.0,
  image: "/images/heroina.jpg",
  category: "medicamentos",
},
{
  id: 12,
  name: "Crack 50/mg",
  description: "Usuários de crack são muito debilitados por conta da perda de apetite, que é um dos efeitos mais marcantes dessa droga. A falta de sono, a paranoia e o desejo de suicídio são comuns. Esses fatores contribuem para os desajustes psíquicos e emocionais, assim como para a queda da defesa imune observada nos dependentes do crack.",
  price: 13.9,
  image: "/images/crack.jpg",
  category: "medicamentos",
},
{
  id: 13,
  name: "Ectasy",
  description: "O ecstasy, conhecido popularmente como droga do amor, trata-se de uma substância psicoativa, classificada quimicamente como 3,4-metilenodioximetanfetamina ou MDMA. A bala ecstasy ficou bastante popular como droga do amor por aumentar a percepção de cores e sons.",
  price: 9.9,
  image: "/images/Ectasy.jpg",
  category: "medicamentos",
},
{
  id: 14,
  name: "Quetamina 10/ml",
  description: "Seus efeitos dependem da dosagem, mas, em geral, a quetamina possui uma ação dissociativa, que pode causar no paciente, além da anestesia, efeitos colaterais como sensação de estar desconectado do próprio corpo, alucinações, sentir como se estivesse sonhando, entre outros. ",
  price: 30.4,
  image: "/images/quetamina.jpg",
  category: "medicamentos",
},
{
  id: 15,
  name: "Popper 10/ml",
  description: "Poppers são conteúdos inalados, geralmente em pequenos vidros que contêm substâncias químicas da classe dos nitratos de alquila, sendo os mais comuns nitrito de isoamila, isopentila, isobutila ou isopropila. São conhecidas como “drogas do amor”, por conta de seu efeito de relaxamento muscular, intensificando o prazer sexual.",
  price: 27.5,
  image: "/images/popper.jpg",
  category: "medicamentos",
}
]

export default function Component() {
  const [isPharmacyMode, setIsPharmacyMode] = useState(false)
  const [cart, setCart] = useState<CartItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)

  const currentProducts = isPharmacyMode ? pharmacyProducts : fastFoodProducts
  const categories = isPharmacyMode ? ["todos"] : ["todos", "lanches", "bebidas", "sobremesas"]

  // Atualize o filtro de produtos para Fast Food
  const filteredProducts = isPharmacyMode
    ? pharmacyProducts
    : selectedCategory === "todos"
      ? fastFoodProducts
      : fastFoodProducts.filter(
        p => p.category === selectedCategory
      );

// Group fastFoodProducts by category for carousels
const categorizedProducts = {
  lanches: fastFoodProducts.filter((p) => p.category === "lanches"),
  bebidas: fastFoodProducts.filter((p) => p.category === "bebidas"),
  sobremesas: fastFoodProducts.filter((p) => p.category === "sobremesas"),
}

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
      setSelectedCategory(!isPharmacyMode ? "medicamentos" : "todos") // Já seleciona "medicamentos" ao ir para farmácia
      setIsTransitioning(false)
    }, 500)
  }

function Carousel({ title, products }: { title: React.ReactNode; products: Product[] }) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scroll = () => {
      container.scrollBy({ left: 320, behavior: "smooth" })
    }

    const interval = setInterval(scroll, 4000)
    return () => clearInterval(interval)
  }, [])

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -320, behavior: "smooth" })
  }

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: 320, behavior: "smooth" })
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4 px-1">
        <div className="text-4xl md:text-5xl font-bold text-white">{title}</div>
        <div className="space-x-2 hidden sm:flex">
          <button onClick={scrollLeft} className="px-2 py-1 bg-white rounded-full shadow hover:bg-gray-100">
            ◀
          </button>
          <button onClick={scrollRight} className="px-2 py-1 bg-white rounded-full shadow hover:bg-gray-100">
            ▶
          </button>
        </div>
      </div>
      <div
        ref={containerRef}
        className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory carousel-scroll"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[280px] max-w-[300px] flex-shrink-0 snap-center bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="h-48 w-full object-cover" />
            <div className="p-4 flex flex-col justify-between h-[200px]">
              <div>
                <h3
  className="font-extrabold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-600 drop-shadow-sm flex items-center gap-2 mb-1"
>
  <span role="img" aria-label="categoria">
    {product.category === "lanches"
      ? "🍔"
      : product.category === "bebidas"
      ? "🥤"
      : product.category === "sobremesas"
      ? "🍨"
      : "🛒"}
  </span>
  {product.name}
</h3>
                <p className="text-gray-600 text-sm mt-1 mb-2">{product.description}</p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xl font-bold text-red-600">R$ {product.price.toFixed(2)}</span>
                <Button
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-lg"
                  onClick={() => addToCart(product)}
                >
                  <Plus className="h-4 w-4 mr-1" /> Adicionar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


  return (
    <>
    <div
      className={`min-h-screen transition-all duration-500 ${isPharmacyMode
          ? "bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200"
          : "bg-gradient-to-br from-black via-gray-900 to-black"} ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
    >
      {/* Header with different styles for each mode */}
      <header className={`${isPharmacyMode ? "p-6" : "p-6"}`}>
  <div className="container mx-auto">
    {!isPharmacyMode ? (
      // Fast Food Header
      <div className="bg-gradient-to-r from-orange-300 to-yellow-200 rounded-full px-8 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/images/Logo site.jpg" alt="Don Pollos Hermano" className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-blue-600" />
            <div className="flex space-x-1">
              <Star className="h-4 w-4 text-red-400 fill-current drop-shadow" />
              <Star className="h-4 w-4 text-yellow-400 fill-current drop-shadow" />
              <Star className="h-4 w-4 text-blue-400 fill-current drop-shadow" />
              <Star className="h-4 w-4 text-yellow-400 fill-current drop-shadow" />
              <Star className="h-4 w-4 text-purple-400 fill-current drop-shadow" />
            </div>
          </div>

          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => setSelectedCategory("todos")}
              className={`font-medium transition-colors ${selectedCategory === "todos" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"}`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory("lanches")}
              className={`font-medium transition-colors ${selectedCategory === "lanches" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"}`}
            >
              Lanches
            </button>
            <button
              onClick={() => setSelectedCategory("bebidas")}
              className={`font-medium transition-colors ${selectedCategory === "bebidas" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"}`}
            >
              Bebidas
            </button>
            <button
              onClick={() => setSelectedCategory("sobremesas")}
              className={`font-medium transition-colors ${selectedCategory === "sobremesas" ? "text-red-700 font-bold" : "text-gray-700 hover:text-red-700"}`}
            >
              Sobremesas
            </button>
            <span className="text-gray-400">|</span>
            <a href="#" className="text-gray-700 hover:text-red-700 font-medium transition-colors">
              About
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="relative bg-orange-500 hover:bg-orange-600 text-white border-0 rounded-full px-6 py-2"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Carrinho
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
      // Pharmacy Header - agora igual ao fast food
      <div className="bg-gradient-to-r from-purple-200 to-blue-100 rounded-full px-8 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/images/gus.jpg" alt="Logo" className="w-12 h-12 rounded-full object-cover shadow-md border-2 border-gray-400" />
            <div className="flex space-x-1">
              <Star className="h-4 w-4 text-purple-400 fill-current" />
              <Star className="h-4 w-4 text-blue-400 fill-current" />
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <Star className="h-4 w-4 text-blue-400 fill-current" />
              <Star className="h-4 w-4 text-purple-400 fill-current" />
            </div>
          </div>
          <nav className="hidden lg:flex items-center space-x-8">
  <button
    onClick={() => setSelectedCategory("medicamentos")}
    className={`font-medium transition-colors ${selectedCategory === "medicamentos" ? "text-purple-700 font-bold" : "text-gray-700 hover:text-purple-700"}`}
  >
    Medicamentos
  </button>
  <span className="text-gray-400">|</span>
  <a href="#" className="text-gray-700 hover:text-purple-700 font-medium transition-colors">
    Sobre
  </a>
</nav>
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="relative bg-purple-500 hover:bg-purple-600 text-white border-0 rounded-full px-6 py-2"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Carrinho
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
                    para toda a família!
                  </p>
                  <Button
                    className="bg-yellow-500 hover:bg-red-800 text-white px-8 py-4 text-lg font-sans rounded-lg"
                    onClick={() => document.getElementById('lanches-comidas')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    Compre agora!
                  </Button>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full">
                  <img
                    src="/images/sextou.JPG"
                    alt="Delicious Burger"
                    className="w-full h-full object-cover rounded-r-3xl" />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-8">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-yellow-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-sans mb-2 text-gray-100">Frango frito c/ MOLHO ESPECIAL </h3>
                  <p className="text-yellow-100 font-sans">Molho secreto com a base de ketchup e churrasco</p>
                </div>
                <div className="bg-yellow-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-sans mb-2 text-gray-100">Prove essa delícia!</h3>
                  <p className="text-yellow-100 font-sans">Quer frango frito?? Ele sai rapidinho!</p>
                </div>
                <div className="bg-yellow-600 text-white p-6 rounded-2xl">
                  <h3 className="text-xl font-sans mb-2 text-gray-100">Bebidas bem + refrescantes</h3>
                  <p className="text-yellow-100 font-sans">Com uma boa comida, não pode faltar a bebida!</p>
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
                <h2 className="text-5xl font-bold mb-6 text-gray-800 leading-tight">Metapharma</h2>
                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                  Bem-vindo à sua farmácia online de confiança! Aqui você encontra uma ampla variedade de medicamentos, vitaminas e cuidados para toda a família, com preços justos e entrega rápida onde você estiver. Conte com atendimento humanizado, orientação segura e ofertas exclusivas para cuidar da sua saúde sem sair de casa. Sua saúde, nossa prioridade – é simples, seguro e do seu jeito!
                </p>
                <Button
                  className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 text-lg font-semibold rounded-full"
                  onClick={() => document.getElementById('lanches-comidas')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Comece sua compra!
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/images/gus.jpg"
                  alt="Pharmacy Store Illustration"
                  className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Products Grid */}
      <section id="lanches-comidas" className="py-8">
  <div className="container mx-auto px-6 ">
    {!isPharmacyMode ? (
      selectedCategory === "todos" ? (
        <>
          <Carousel
            title={
              <h1 className="text-4xl font-bold text-white">
                Lanches
              </h1>
            }
            products={categorizedProducts.lanches}
          />
          <Carousel
            title={
              <h1 className="text-4xl font-bold text-white">
                Bebidas
              </h1>
            }
            products={categorizedProducts.bebidas}
          />
          <Carousel
            title={
              <h1 className="text-4xl font-bold text-white">
                Sobremesas
              </h1>
            }
            products={categorizedProducts.sobremesas}
          />
        </>
      ) : (
        <Carousel
          title={
            selectedCategory === "lanches"
              ? "Lanches"
              : selectedCategory === "bebidas"
              ? "Bebidas"
              : "Sobremesas"
          }
          products={filteredProducts}
        />
      )
    ) : (
      // Farmácia - grid tradicional
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden hover:shadow-2xl transition duration-300 scale-105">
            <CardHeader className="p-0">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-80 object-cover" />
            </CardHeader>
            <CardContent className="p-8">
              <CardTitle className="text-2xl mb-4">{product.name}</CardTitle>
              <CardDescription className="text-gray-600 mb-6">{product.description}</CardDescription>
              <div className="flex items-center justify-between">
                <span className="text-4xl font-bold text-purple-600">R$ {product.price.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="p-8 pt-0">
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-3"
                onClick={() => addToCart(product)}
              >
                <Plus className="h-6 w-6 mr-2" /> Comprar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    )}
  </div>
</section>


      {/* Footer */}
<footer className={`${isPharmacyMode ? "bg-purple-900" : "bg-red-800"} text-white pt-12 pb-8`}>
  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">

    {/* Coluna 1 - Logo + missão */}
    <div>
      <h3 className="text-2xl font-bold mb-3">
        {isPharmacyMode ? "Gus Fring Service" : "Don Pollos Hermano"}
      </h3>
      <p className="text-sm text-gray-200 mb-3">
        {isPharmacyMode
          ? "Excelência e ética no cuidado com sua saúde."
          : "Sabores que conquistam em cada mordida!"}
      </p>
      <p className="text-xs text-gray-400">CNPJ: 00.000.000/0001-00</p>
    </div>

    {/* Coluna 2 - Links úteis */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Institucional</h4>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:underline">Sobre Nós</a></li>
        <li><a href="#" className="hover:underline">Política de Privacidade</a></li>
        <li><a href="#" className="hover:underline">Termos de Uso</a></li>
        <li><a href="#" className="hover:underline">Trabalhe Conosco</a></li>
      </ul>
    </div>

    {/* Coluna 3 - Contato */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Fale Conosco</h4>
      <p className="text-sm">Email: atendimento@{isPharmacyMode ? "gusfringservice" : "donpollos"}.com</p>
      <p className="text-sm">Telefone: (11) 4002-8922</p>
      <p className="text-sm mt-2">Endereço:</p>
      <p className="text-sm text-gray-300">Av. Central, 1234 - São Paulo/SP</p>
    </div>

    {/* Coluna 4 - Newsletter e redes */}
    <div>
      <h4 className="text-xl font-semibold mb-4">Receba Novidades</h4>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="Seu email"
          className="w-full px-4 py-2 rounded bg-white/20 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-white"
        />
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded font-semibold ${
            isPharmacyMode ? "bg-purple-600 hover:bg-purple-700" : "bg-yellow-500 hover:bg-yellow-600"
          }`}
        >
          Inscrever
        </button>
      </form>
      <div className="flex justify-center md:justify-start space-x-4 mt-6 text-white">
        <a href="#" className="hover:text-gray-300" title="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="hover:text-gray-300" title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="hover:text-gray-300" title="X (Twitter)">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="hover:text-gray-300" title="YouTube">
          <i className="fab fa-youtube"></i>
        </a>
      </div>
    </div>
  </div>

  {/* Linha de direitos autorais */}
  <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-gray-300">
    © {new Date().getFullYear()} {isPharmacyMode ? "Gus Fring Service" : "Don Pollos Hermano"} — Todos os direitos reservados.
  </div>
</footer>

      {/* Secret Button */}
      <button
        onClick={handleSecretTransformation}
        className="fixed bottom-4 right-4 w-3 h-3 border-none cursor-pointer hover:opacity-80 transition-opacity duration-300"
        aria-label="Secret transformation button"
      >
        <img
          src="/images/walter.png"
          alt="demon"
          className="w-3 h-3 object-cover" />
      </button>
    </div></>
  )
}
