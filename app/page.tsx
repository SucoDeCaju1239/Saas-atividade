"use client"

import { useState, useRef, useEffect } from "react"
import { ShoppingCart, Plus, Minus, Star, ArrowLeft, CreditCard, Users, Target, Award, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type React from "react"
import { Check } from "lucide-react"

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

// Adicione este tipo para o plano no carrinho
interface PlanCartItem extends CartItem {
  planType: string
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
  },
]

const pharmacyProducts: Product[] = [
  {
    id: 7,
    name: "Metanfetamina 100/mg",
    description:
      "Quem consome metanfetamina sente um elevado estado de alerta, redução do cansaço e aumento da energia e da libido. Com a agitação prolongada e estímulos variados, o indivíduo acaba deixando de comer e de dormir adequadamente.",
    price: 50.5,
    image: "/images/metanfetamina.jpeg",
    category: "medicamentos",
  },
  {
    id: 8,
    name: "Metadona 25/mg",
    description:
      "A sensação de relaxamento aparece nos primeiros instantes de contato com a droga. O exagero, porém, pode resultar em problemas como depressão respiratória e circulatória, disforia, dor de cabeça, insônia, desorientação, fraqueza e distúrbios visuais.",
    price: 30.9,
    image: "/images/metadona.jpg",
    category: "medicamentos",
  },
  {
    id: 9,
    name: "Anfetamina 75/mg",
    description:
      "Empregada em tratamentos do Transtorno de Déficit de Atenção com Hiperatividade (TDAH), essa substância é encontrada em várias misturas ilícitas. É muito procurada para consumo recreativo por aumentar a energia, a autoconfiança, o bem-estar e o desejo sexual",
    price: 32.9,
    image: "/images/anfetamina.jpeg",
    category: "medicamentos",
  },
  {
    id: 10,
    name: "Cocaína 750/mg",
    description:
      "Ao entrar em contato com o organismo, essa substância provoca sérios prejuízos. Por ser ácida, ela causa a erosão do esmalte dental, afetando a saúde dos dentes e da gengiva. O consumo de cocaína impacta as funções cerebrais ao desequilibrar a liberação de importantes neurotransmissores que controlam o sono e o apetite.",
    price: 150.5,
    image: "/images/cocaina.jpg",
    category: "medicamentos",
  },
  {
    id: 11,
    name: "Heroína 25/mg",
    description:
      "É uma das drogas com grande potencial para causar adicção, pois alcança o Sistema Nervoso Central em questão de segundos. Os efeitos no corpo e na mente do dependente químico podem ser irreversíveis. O consumo desenfreado desse tipo de substância gera distúrbios emocionais e psíquicos que comprometem a vida social, acadêmica e profissional.",
    price: 20.0,
    image: "/images/heroina.jpg",
    category: "medicamentos",
  },
  {
    id: 12,
    name: "Crack 50/mg",
    description:
      "Usuários de crack são muito debilitados por conta da perda de apetite, que é um dos efeitos mais marcantes dessa droga. A falta de sono, a paranoia e o desejo de suicídio são comuns. Esses fatores contribuem para os desajustes psíquicos e emocionais, assim como para a queda da defesa imune observada nos dependentes do crack.",
    price: 13.9,
    image: "/images/crack.jpg",
    category: "medicamentos",
  },
  {
    id: 13,
    name: "Ectasy",
    description:
      "O ecstasy, conhecido popularmente como droga do amor, trata-se de uma substância psicoativa, classificada quimicamente como 3,4-metilenodioximetanfetamina ou MDMA. A bala ecstasy ficou bastante popular como droga do amor por aumentar a percepção de cores e sons.",
    price: 9.9,
    image: "/images/Ectasy.jpg",
    category: "medicamentos",
  },
  {
    id: 14,
    name: "Quetamina 10/ml",
    description:
      "Seus efeitos dependem da dosagem, mas, em geral, a quetamina possui uma ação dissociativa, que pode causar no paciente, além da anestesia, efeitos colaterais como sensação de estar desconectado do próprio corpo, alucinações, sentir como se estivesse sonhando, entre outros. ",
    price: 30.4,
    image: "/images/quetamina.jpg",
    category: "medicamentos",
  },
  {
    id: 15,
    name: "Popper 10/ml",
    description:
      'Poppers são conteúdos inalados, geralmente em pequenos vidros que contêm substâncias químicas da classe dos nitratos de alquila, sendo os mais comuns nitrito de isoamila, isopentila, isobutila ou isopropila. São conhecidas como "drogas do amor", por conta de seu efeito de relaxamento muscular, intensificando o prazer sexual.',
    price: 27.5,
    image: "/images/popper.jpg",
    category: "medicamentos",
  },
]

export default function Component() {
  const [isPharmacyMode, setIsPharmacyMode] = useState(false)
  const [cart, setCart] = useState<(CartItem | PlanCartItem)[]>([])
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [addingToCart, setAddingToCart] = useState<number | null>(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  // ============================================
  // 🔥 NOVA FUNCIONALIDADE: PÁGINA SOBRE NÓS
  // ============================================
  const [showAboutUs, setShowAboutUs] = useState(false)

  const currentProducts = isPharmacyMode ? pharmacyProducts : fastFoodProducts
  const categories = isPharmacyMode ? ["todos"] : ["todos", "lanches", "bebidas", "sobremesas"]

  // Atualize o filtro de produtos para Fast Food
  const filteredProducts = isPharmacyMode
    ? pharmacyProducts
    : selectedCategory === "todos"
      ? fastFoodProducts
      : fastFoodProducts.filter((p) => p.category === selectedCategory)

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
      setShowCheckout(false)
      setShowAboutUs(false) // Reset about us page
      setIsTransitioning(false)
    }, 500)
  }

  const handleCheckout = () => {
    setShowCheckout(true)
  }

  const handleBackToStore = () => {
    setShowCheckout(false)
  }

  // ============================================
  // 🔥 NOVA FUNÇÃO: MOSTRAR PÁGINA SOBRE NÓS
  // ============================================
  const handleShowAboutUs = () => {
    setShowAboutUs(true)
    setShowCheckout(false)
  }

  const handleBackFromAbout = () => {
    setShowAboutUs(false)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessingPayment(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    alert("Pagamento realizado com sucesso!")
    setCart([])
    setShowCheckout(false)
    setIsProcessingPayment(false)
  }

  const plans = [
    {
      name: "Básico",
      price: "R$ 9,90/mês",
      description: "Ideal para quem está começando",
      benefits: [
        "5% de desconto em todas as compras",
        "1 cupom de frete grátis por mês",
        "Acesso a ofertas exclusivas",
      ],
      color: isPharmacyMode ? "bg-blue-500" : "bg-orange-500",
    },
    {
      name: "Premium",
      price: "R$ 19,90/mês",
      description: "Para quem quer mais vantagens",
      benefits: [
        "10% de desconto em todas as compras",
        "3 cupons de frete grátis por mês",
        "Acesso prioritário a novos produtos",
        "Suporte 24/7",
      ],
      color: isPharmacyMode ? "bg-purple-500" : "bg-green-500",
      popular: true,
    },
    {
      name: "VIP",
      price: "R$ 29,90/mês",
      description: "A experiência completa",
      benefits: [
        "15% de desconto em todas as compras",
        "Frete grátis ilimitado",
        "Cupons especiais toda semana",
        "Acesso a produtos exclusivos",
        "Gerente de conta dedicado",
      ],
      color: isPharmacyMode ? "bg-indigo-500" : "bg-red-500",
    },
  ]

  // Remova o conteúdo de checkout do Carousel, mantendo apenas o carrossel de produtos:
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
            <button onClick={scrollLeft} className="px-2 py-1 bg-red-500 rounded-md shadow hover:bg-red-800">
              ◀
            </button>
            <button onClick={scrollRight} className="px-2 py-1 bg-red-500 rounded-md shadow hover:bg-red-800">
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
                  <h3 className="font-extrabold text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-red-500 to-yellow-600 drop-shadow-sm flex items-center gap-2 mb-1">
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

  // ============================================
  // 🔥 NOVA PÁGINA: SOBRE NÓS
  // ============================================
  if (showAboutUs) {
    return (
      <div
        className={`min-h-screen transition-all duration-500 ${
          isPharmacyMode
            ? "bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200"
            : "bg-gradient-to-br from-black via-gray-900 to-black"
        }`}
      >
        {/* About Us Header */}
        <header className="p-6">
          <div className="container mx-auto">
            <div
              className={
                isPharmacyMode
                  ? "bg-purple-700 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg"
                  : "bg-yellow-600 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg"
              }
            >
              <div className="flex items-center justify-between">
                <Button variant="ghost" onClick={handleBackFromAbout} className="flex items-center space-x-2">
                  <ArrowLeft className="h-5 w-5" />
                  <span>Voltar</span>
                </Button>
                <h1 className={`text-2xl font-bold ${isPharmacyMode ? "text-white" : "text-gray-900"}`}>
                  {isPharmacyMode ? "Sobre a Metapharma" : "Sobre Don Pollos Hermano"}
                </h1>
                <div className="w-24"></div>
              </div>
            </div>
          </div>
        </header>

        {/* About Us Content */}
        <section className="py-12">
          <div className="container mx-auto px-6">
            {!isPharmacyMode ? (
              // Fast Food About Us
              <>
                {/* Hero Section */}
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-white mb-6">Nossa História</h2>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Desde 2008, Don Pollos Hermano tem sido sinônimo de qualidade, sabor e tradição familiar. Começamos
                    como um pequeno restaurante com o sonho de servir os melhores frangos fritos da região.
                  </p>
                </div>

                {/* Values Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-red-600">Paixão</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">
                        Cada prato é preparado com amor e dedicação, usando receitas familiares passadas de geração em
                        geração.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-yellow-600">Qualidade</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">
                        Selecionamos os melhores ingredientes e seguimos rigorosos padrões de qualidade em todos os
                        processos.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-green-600">Família</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">
                        Tratamos cada cliente como parte da nossa família, criando um ambiente acolhedor e familiar.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Story Section */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 mb-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-6">Como Tudo Começou</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Começou através da atividade proposta pelo professor Paulo Montier, com a criação de um saas de tema livre, onde resolvemos fazer em homenagem à serie Breaking Bad, junto do meme do Don Pollo.
                      </p>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Nosso site mostra toda nossa capacidade criativa em reimaginar um site de fast food, com cárdapio e variações de lanches e bebidas reais.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        A apresentação da idéia do projeto já foi feito com muito sucesso e a apresentação do protótipo será realizada nesta terça feira.
                      </p>
                    </div>
                    <div className="relative">
                      <img
                        src="/images/Logo site.jpg?height=400&width=500&text=Nossa+Historia"
                        alt="História do restaurante"
                        className="w-full h-auto rounded-2xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                  <h3 className="text-4xl font-bold text-white mb-12">Nossa Equipe</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
      { name: "Maykon Sullyvan", role: "Programador front-end e designer", image: "/images/gostoso.jpeg" },
      { name: "Matheus Ribeiro", role: "Programador front-end", image: "/images/matheus.jpeg" },
      { name: "Gabriel Anoé", role: "Programador back-end", image: "/images/gabriel.jpeg" },
      
      { name: "Joaquim Squarça", role: "Integrante", image: "/images/joaquim.jpeg" },
    ].map((member, index) => (
      <Card key={index} className="bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <img
            src={member.image}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-500"
          />
          <CardTitle className="text-xl">{member.name}</CardTitle>
          <CardDescription className="text-red-600 font-semibold">{member.role}</CardDescription>
        </CardHeader>
      </Card>
    ))}
                  </div>
                </div>
              </>
            ) : (
              // Pharmacy About Us
              <>
                {/* Hero Section */}
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-800 mb-6">Nossa Missão</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    A Metapharma nasceu com o propósito de revolucionar o cuidado com a venda e transporte de drogas, oferecendo medicamentos
                    de qualidade com atendimento humanizado e tecnologia de ponta, com efeitos mais prolongados.
                  </p>
                </div>

                {/* Values Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Heart className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-purple-600">Cuidado</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">
                        Cada cliente é tratado com atenção especial, garantindo orientação segura e cuidado
                        personalizado.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-blue-600">Excelência</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">
                        Mantemos os mais altos padrões de qualidade em todos os medicamentos e serviços oferecidos.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm">
                    <CardHeader className="text-center">
                      <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Target className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl text-indigo-600">Inovação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 text-center">
                        Utilizamos tecnologia avançada para oferecer melhorias modernas e eficientes para maior pureza da meta.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Story Section */}
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 mb-16">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-3xl font-bold text-gray-800 mb-6">Nossa Trajetória</h3>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Tudo começou com o senhor Gus Fring, que resolveu criar uma máscara de rede de fast-food para assim lucrar no mercado negro com o seu negócio.
                      </p>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        Nossa equipe trabalha incansavelmente para garantir que cada cliente receba não
                        apenas medicamentos de qualidade, mas também a maior pureza da metanfetamina no mercado.
                      </p>
                      <p className="text-gray-700 leading-relaxed">
                        Hoje, somos referência na venda de drogas, sempre priorizando a segurança, eficácia e
                        a colaboração com os nossos clientes.
                      </p>
                    </div>
                    <div className="relative">
                      <img
                        src="/images/gus.jpg?height=400&width=500&text=Metapharma+Historia"
                        alt="História da farmácia"
                        className="w-full h-auto rounded-2xl shadow-lg"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Section */}
                <div className="text-center mb-16">
                  <h3 className="text-4xl font-bold text-gray-800 mb-12">Nossos Especialistas</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { name: "Gustavo Fring", role: "CEO", image: "/images/fring.jpeg" },
                      { name: "Mr. White", role: "Sócio", image: "/images/White.png" },
                      { name: "Don Pollo", role: "Sócio", image: "/images/pollo.jpg" },
                      { name: "Pinkman", role: "Sócio", image: "/images/jesse.jpeg" },
                      ].map((member, index) => (
                        <Card key={index} className="bg-white/90 backdrop-blur-sm">
                          <CardHeader className="text-center">
                            <img
                              src={member.image}
                              alt={member.name}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-yellow-500"
                          />
                          <CardTitle className="text-xl">{member.name}</CardTitle>
                          <CardDescription className="text-purple-600 font-semibold">{member.role}</CardDescription>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Contact Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 text-center">
              <h3 className="text-3xl font-bold text-gray-800 mb-8">Entre em Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Telefone</h4>
                  <p className="text-gray-600">(13) 997979068</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Email</h4>
                  <p className="text-gray-600">maykonsullyvan12@gmail{isPharmacyMode ? "" : ""}.com</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Endereço</h4>
                  <p className="text-gray-600">Av. Central, 1234 - São Paulo/SP</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Secret Button */}
        <button
          onClick={handleSecretTransformation}
          className="fixed bottom-4 right-4 w-3 h-3 border-none cursor-pointer hover:opacity-80 transition-opacity duration-300"
          aria-label="Secret transformation button"
        >
          <img src="/images/walter.png" alt="demon" className="w-3 h-3 object-cover" />
        </button>
      </div>
    )
  }

  if (showCheckout) {
    return (
      <div
        className={`min-h-screen transition-all duration-500 ${
          isPharmacyMode
            ? "bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200"
            : "bg-gradient-to-br from-black via-gray-700 to-black"
        }`}
      >
        {/* Checkout Header */}
        <header className="p-0">
          <div className="container mx-auto">
    <div
      className={`${
        isPharmacyMode
          ? "bg-gradient-to-r from-purple-200 to-blue-100"
          : "bg-gradient-to-r from-orange-300 to-yellow-200"
      } backdrop-blur-sm rounded-2xl px-8 py-4 shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={handleBackToStore}
          className={`flex items-center space-x-2 transition-colors ${
            isPharmacyMode
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "hover:text-white hover:bg-orange-500"
          }`}
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Voltar à loja</span>
        </Button>
        <h1 className="text-2xl font-bold text-gray-700">Finalizar Compra</h1>
        <div className="w-24"></div>
      </div>
    </div>
  </div>
</header>

        {/* Checkout Content */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Informações de Pagamento</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">Nome</Label>
                        <Input id="firstName" placeholder="João" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Sobrenome</Label>
                        <Input id="lastName" placeholder="Silva" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="joao@email.com" required />
                    </div>
                    <div>
                      <Label htmlFor="cardNumber">Número do Cartão</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Validade</Label>
                        <Input id="expiry" placeholder="MM/AA" required />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Rua das Flores, 123" required />
                    </div>
                    <Button
                      type="submit"
                      className={`w-full ${
                        isPharmacyMode ? "bg-purple-600 hover:bg-purple-700" : "bg-orange-500 hover:bg-orange-600"
                      }`}
                      disabled={isProcessingPayment}
                    >
                      {isProcessingPayment ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processando...</span>
                        </div>
                      ) : (
                        `Pagar R$ ${getTotalPrice().toFixed(2)}`
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-gray-500">Quantidade: {item.quantity}</p>
                        </div>
                        <span className="font-bold">R$ {(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total:</span>
                      <span>R$ {getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Secret Button */}
        <button
          onClick={handleSecretTransformation}
          className="fixed bottom-4 right-4 w-3 h-3 border-none cursor-pointer hover:opacity-80 transition-opacity duration-300"
          aria-label="Secret transformation button"
        >
          <img src="/images/walter.png" alt="demon" className="w-3 h-3 object-cover" />
        </button>
      </div>
    )
  }

  const addPlanToCart = (plan: (typeof plans)[number]) => {
    // Evita duplicidade de plano no carrinho
    setCart((prevCart) => {
      const alreadyAdded = prevCart.some((item) => "planType" in item && item.planType === plan.name)
      if (alreadyAdded) return prevCart
      return [
        ...prevCart,
        {
          id: 1000 + Math.random(), // id único
          name: `Plano ${plan.name}`,
          description: plan.description,
          price: Number(plan.price.replace(/[^\d,]/g, "").replace(",", ".")),
          image: "",
          category: "plano",
          quantity: 1,
          planType: plan.name,
        },
      ]
    })
    setShowCheckout(true)
  }

  return (
    <>
      <div
        className={`min-h-screen transition-all duration-500 ${
          isPharmacyMode
            ? "bg-gradient-to-br from-purple-100 via-blue-50 to-purple-200"
            : "bg-gradient-to-br from-black via-gray-900 to-black"
        } ${isTransitioning ? "opacity-50 scale-95" : "opacity-100 scale-100"}`}
      >
        {/* Header with different styles for each mode */}
        <header className={`${isPharmacyMode ? "p-0" : "p-0"}`}>
          <div className="container mx-auto">
            {!isPharmacyMode ? (
              // Fast Food Header
              <div className="bg-white shadow-lg px-8 py-6 flex flex-col items-center relative w-full rounded-b-2xl">
                {/* Imagem de fundo do hambúrguer */}
                <img
                  src="/images/burguer_fundo.jpg"
                  alt="Fundo Hambúrguer"
                  className="absolute inset-0 w-full h-full object-cover rounded-b-2xl pointer-events-none"
                  style={{
                    zIndex: 0,
                    filter: "brightness(0.6)",
                    opacity: 1,
                  }}
                />
                {/* Fundo semitransparente para o conteúdo */}
                <div
      className="absolute inset-0 w-full h-full rounded-b-2xl"
      style={{
        background: "rgba(0, 0, 0, 0.75)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
                {/* Conteúdo do header */}
                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Logo e estrelas centralizados */}
                  <div className="flex flex-col items-center mb-2" style={{ zIndex: 2, position: "relative" }}>
                    <img
                      src="/images/Logo site.jpg"
                      alt="Don Pollos Hermano"
                      className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-yellow-500 mb-2"
                    />
                    <div className="flex space-x-1">
                      <Star className="h-4 w-4 text-red-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-blue-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-purple-400 fill-current drop-shadow" />
                    </div>
                  </div>
                  {/* Menu e carrinho alinhados horizontalmente */}
                  <nav className="flex items-center justify-center gap-8 mt-2 w-full max-w-2xl mx-auto">
                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => setSelectedCategory("todos")}
                        className={`font-medium transition-colors ${selectedCategory === "todos" ? "text-red-700 font-bold" : "text-gray-300 hover:text-red-700"}`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setSelectedCategory("lanches")}
                        className={`font-medium transition-colors ${selectedCategory === "lanches" ? "text-red-700 font-bold" : "text-gray-300 hover:text-red-700"}`}
                      >
                        Lanches
                      </button>
                      <button
                        onClick={() => setSelectedCategory("bebidas")}
                        className={`font-medium transition-colors ${selectedCategory === "bebidas" ? "text-red-700 font-bold" : "text-gray-300 hover:text-red-700"}`}
                      >
                        Bebidas
                      </button>
                      <button
                        onClick={() => setSelectedCategory("sobremesas")}
                        className={`font-medium transition-colors ${selectedCategory === "sobremesas" ? "text-red-700 font-bold" : "text-gray-300 hover:text-red-700"}`}
                      >
                        Sobremesas
                      </button>
                      <span className="text-gray-400">|</span>
                      <button
                        onClick={handleShowAboutUs}
                        className="text-gray-300 hover:text-red-700 font-medium transition-colors"
                      >
                        Sobre
                      </button>
                    </div>
                    {/* Carrinho alinhado na mesma linha */}
                    <div className="flex items-center ml-auto">
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
                                  <p className="text-sm text-muted-foreground">
                                    {item.category === "plano"
                                      ? "Assinatura de plano"
                                      : `R$ ${item.price.toFixed(2)} cada`}
                                  </p>
                                </div>
                                <div className="flex items-center space-x-2">
                                  {item.category !== "plano" && (
                                    <>
                                      <Button variant="outline" size="sm" onClick={() => removeFromCart(item.id)}>
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <span className="w-8 text-center">{item.quantity}</span>
                                      <Button variant="outline" size="sm" onClick={() => addToCart(item)}>
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </>
                                  )}
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
                                <Button
                                  className="w-full bg-orange-500 hover:bg-orange-600"
                                  size="lg"
                                  onClick={handleCheckout}
                                >
                                  Finalizar Pedido
                                </Button>
                              </>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </nav>
                </div>
              </div>
            ) : (
              // Metapharma Header igual ao fast food, mas com degradê roxo/azul
              <div className="bg-white shadow-lg px-8 py-6 flex flex-col items-center relative w-full rounded-b-2xl">
                {/* Fundo degradê roxo/azul sem imagem */}
                <div
      className="absolute inset-0 w-full h-full rounded-b-2xl"
      style={{
        background: "linear-gradient(90deg, rgba(140, 82, 168, 0.85) 0%, rgba(205, 205, 247, 0.85) 100%)",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
                {/* Conteúdo do header */}
                <div className="relative z-10 flex flex-col items-center w-full">
                  {/* Logo e estrelas centralizados */}
                  <div className="flex flex-col items-center mb-2" style={{ zIndex: 2, position: "relative" }}>
                    <img
                      src="/images/gus.jpg"
                      alt="Gus Fring Service"
                      className="w-14 h-14 rounded-full object-cover shadow-md border-2 border-purple-500 mb-2"
                    />
                    <div className="flex space-x-1">
                      <Star className="h-4 w-4 text-purple-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-blue-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-yellow-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-blue-400 fill-current drop-shadow" />
                      <Star className="h-4 w-4 text-purple-400 fill-current drop-shadow" />
                    </div>
                  </div>
                  {/* Menu e carrinho alinhados horizontalmente */}
                  <nav className="flex items-center justify-center gap-8 mt-2 w-full max-w-2xl mx-auto">
                    <div className="flex items-center gap-8">
                      <button
                        onClick={() => setSelectedCategory("medicamentos")}
                        className={`font-medium transition-colors ${selectedCategory === "medicamentos" ? "text-purple-700 font-bold" : "text-gray-300 hover:text-purple-400"}`}
                      >
                        Medicamentos
                      </button>
                      <span className="text-gray-100">|</span>
                      <button
                        onClick={handleShowAboutUs}
                        className="text-gray-300 hover:text-purple-700 font-medium transition-colors"
                      >
                        Sobre
                      </button>
                    </div>
                    {/* Carrinho alinhado na mesma linha */}
                    <div className="flex items-center ml-auto">
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
                                  <p className="text-sm text-muted-foreground">
                                    {item.category === "plano"
                                      ? "Assinatura de plano"
                                      : `R$ ${item.price.toFixed(2)} cada`}
                                  </p>
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
                                <Button
                                  className="w-full bg-purple-600 hover:bg-purple-700"
                                  size="lg"
                                  onClick={handleCheckout}
                                >
                                  Finalizar Pedido
                                </Button>
                              </>
                            )}
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </nav>
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
                      <br />O SEXTOU!
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
                      onClick={() => document.getElementById("lanches-comidas")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Compre agora!
                    </Button>
                  </div>
                  <div className="absolute right-0 top-0 w-1/2 h-full">
                    <img
                      src="/images/sextou.JPG"
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
                    Bem-vindo à sua farmácia online de confiança! Aqui você encontra uma ampla variedade de
                    medicamentos, vitaminas e cuidados para toda a família, com preços justos e entrega rápida onde você
                    estiver. Conte com atendimento humanizado, orientação segura e ofertas exclusivas para cuidar da sua
                    saúde sem sair de casa. Sua saúde, nossa prioridade – é simples, seguro e do seu jeito!
                  </p>
                  <Button
                    className="bg-purple-400 hover:bg-purple-500 text-white px-8 py-4 text-lg font-semibold rounded-full"
                    onClick={() => document.getElementById("lanches-comidas")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    Comece sua compra!
                  </Button>
                </div>
                <div className="relative">
                  <img src="/images/gus.jpg" alt="Pharmacy Store Illustration" className="w-full h-auto rounded-lg" />
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
                    title={<h1 className="text-4xl font-bold text-white">Lanches</h1>}
                    products={categorizedProducts.lanches}
                  />
                  <Carousel
                    title={<h1 className="text-4xl font-bold text-white">Bebidas</h1>}
                    products={categorizedProducts.bebidas}
                  />
                  <Carousel
                    title={<h1 className="text-4xl font-bold text-white">Sobremesas</h1>}
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
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-80 object-cover"
                      />
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

        {/* Plans Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
    <div className="text-center mb-12">
      <h2
        className={`text-4xl font-bold mb-4 ${
          isPharmacyMode ? "text-blue-700" : "text-red-700"
        }`}
      >
        {isPharmacyMode ? "Planos de biqueira" : "Planos Gourmet"}
      </h2>
      <p className="text-xl text-gray-600">
        {isPharmacyMode
          ? "Escolha o plano ideal e receba cupons exclusivos para seus medicamentos"
          : "Assine um plano e ganhe cupons especiais para suas refeições favoritas"}
      </p>
    </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${plan.popular ? "ring-2 ring-yellow-400" : ""}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-yellow-400 text-black px-3 py-1 text-sm font-bold">
                      POPULAR
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                    <div className="text-3xl font-bold text-gray-800 mt-4">{plan.price}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {plan.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center space-x-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full ${plan.color} hover:opacity-90 text-white`}
                      onClick={() => addPlanToCart(plan)}
                    >
                      Assinar Plano
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className={`${isPharmacyMode ? "bg-purple-900" : "bg-red-800"} text-white pt-12 pb-8`}>
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            {/* Coluna 1 - Logo + missão */}
            <div>
              <h3 className="text-2xl font-bold mb-3">{isPharmacyMode ? "Gus Fring Service" : "Don Pollos Hermano"}</h3>
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
                <li>
                  <a href="#" className="hover:underline">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Termos de Uso
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Trabalhe Conosco
                  </a>
                </li>
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
            © {new Date().getFullYear()} {isPharmacyMode ? "Gus Fring Service" : "Don Pollos Hermano"} — Todos os
            direitos reservados.
          </div>
        </footer>

        {/* Secret Button */}
        <button
          onClick={handleSecretTransformation}
          className="fixed bottom-4 right-4 w-3 h-3 border-none cursor-pointer hover:opacity-80 transition-opacity duration-300"
          aria-label="Secret transformation button"
        >
          <img src="/images/walter.png" alt="demon" className="w-3 h-3 object-cover" />
        </button>
      </div>
    </>
  )
}
