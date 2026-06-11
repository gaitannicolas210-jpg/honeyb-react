import { useState, useRef, useCallback, useEffect } from 'react'
import './App.css'
import abejaImg from './assets/abejaportadabg.png'
import { CartProvider, useCart } from './CartContext'
import CartSidebar from './CartSidebar'
import CheckoutModal from './CheckoutModal'

const PRODUCTS = [
  {
    id: 1,
    name: 'Shampoo Sólido Premium',
    price: 45000,
    description: 'Formulado con ingredientes naturales. 70g = 35-58 lavadas. Para toda la familia.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200',
  },
  {
    id: 2,
    name: 'Shampoo Sólido Natural',
    price: 35000,
    description: 'Cuidado natural para el cabello. Ingredientes orgánicos y biodegradables.',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600',
  },
]

const SUPPLIERS = [
  {
    name: 'Apicultores Locales',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200',
  },
  {
    name: 'Laboratorio Natural',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=1200',
  },
  {
    name: 'Ingredientes Orgánicos',
    image: 'https://images.unsplash.com/photo-1598392482227-5bed91183f47?w=1200',
  },
  {
    name: 'Envasado Sustentable',
    image: 'https://images.unsplash.com/photo-1542600998-6f719b3e5b20?w=1200',
  },
]

function AppInner() {
  const { cart, addToCart } = useCart()
  const [flippedId, setFlippedId] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const [cartShakeKey, setCartShakeKey] = useState(0)
  const [showFounder, setShowFounder] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const cardRefs = useRef({})
  const cartRef = useRef(null)

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const handleFlip = useCallback((id) => {
    setFlippedId(id)
    setTimeout(() => {
      const el = cardRefs.current[id]
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }, [])

  const handleClose = useCallback(() => {
    setFlippedId(null)
  }, [])

  const handleBuy = useCallback((product) => {
    addToCart(product)
    setFlippedId(null)
    setCartShakeKey(k => k + 1)
    setToastMsg(`"${product.name}" agregado al carrito`)
  }, [addToCart])

  useEffect(() => {
    if (flippedId !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [flippedId])

  useEffect(() => {
    if (!toastMsg) return
    const t = setTimeout(() => setToastMsg(null), 2200)
    return () => clearTimeout(t)
  }, [toastMsg])

  useEffect(() => {
    if (cartShakeKey === 0) return
    const el = cartRef.current
    if (!el) return
    el.classList.remove('cart-shake')
    void el.offsetWidth
    el.classList.add('cart-shake')
    const t = setTimeout(() => { el.classList.remove('cart-shake') }, 600)
    return () => { clearTimeout(t); el.classList.remove('cart-shake') }
  }, [cartShakeKey])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SUPPLIERS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {flippedId !== null && <div className="blur-overlay" onClick={handleClose} />}

      {toastMsg && (
        <div className="toast">
          <span className="toast-icon">✓</span>
          {toastMsg}
        </div>
      )}

      <nav className="navbar">
        <div className="logo">🍯 HoneyB</div>
        <ul className="menu">
          <li><a href="#historia">Historia</a></li>
          <li><a href="#productos">Productos</a></li>
          <li><a href="#proveedores">Proveedores</a></li>
          <li><a href="#hoteleria">Hotelería</a></li>
        </ul>
        <div className="cart" ref={cartRef} onClick={() => setCartOpen(true)}>🛒 {totalItems}</div>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h2>BIENVENIDOS A</h2>
          <h1>HONEYB</h1>
          <p>Shampoo Sólido Premium</p>
          <span>Desde 2022, cuidando tu cabello y nuestro planeta</span>
          <button>Conócenos</button>
        </div>
        <div className="hero-right">
          <div className="floating-bee">
            <img src={abejaImg} className="hero-bee-image" alt="Abeja HoneyB" />
          </div>
        </div>
      </section>

      <section className="historia" id="historia">
        <div className="historia-content">
          <h2>Nuestra Historia</h2>
          <p>
            HONEY'B nació en 2022 con una visión clara: ofrecer productos
            capilares de alta calidad que respeten tanto el bienestar del
            usuario como el equilibrio del medio ambiente.
          </p>
          <p>
            Desde sus inicios, la marca ha evolucionado en formulación,
            diseño y experiencia, consolidándose como una propuesta premium
            dentro del cuidado natural.
          </p>
          <button className="fundador-btn" onClick={() => setShowFounder(prev => !prev)}>
            {showFounder ? '▲' : '▼'} Nuestro fundador
          </button>
        </div>
      </section>

      {showFounder && (
        <section className="fundador-section">
          <div className="fundador-texto">
            <h3>Santiago Cavanzo</h3>
            <p>
              Santiago Cavanzo es emprendedor y consultor estratégico.
              Actualmente dirige HoneyB con una meta clara: llevar un producto
              colombiano premium a mercados internacionales.
            </p>
            <p>
              Su visión combina la tradición apícola colombiana con prácticas
              sostenibles y formulaciones innovadoras que elevan los estándares
              de la industria capilar natural.
            </p>
          </div>
          <div className="fundador-imagen">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
              alt="Santiago Cavanzo"
            />
          </div>
        </section>
      )}

      <section className="productos" id="productos">
        <div className="pilares">
          <h3 className="pilares-title">¿Por qué HoneyB?</h3>
          <div className="pilares-grid">
            <div className="pilar-card">
              <div className="pilar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                  <path d="M24 4C24 4 12 12 12 24C24 32 32 38 36 24C36 12 24 4 24 4Z" fill="#caa642" opacity="0.15"/>
                  <path d="M24 8C22 12 18 18 18 24C18 30 20 34 24 38C28 34 30 30 30 24C30 18 26 12 24 8Z" fill="#caa642"/>
                  <path d="M24 18L26 22L30 22.5L27 25.5L28 30L24 27.5L20 30L21 25.5L18 22.5L22 22L24 18Z" fill="#ffffff" opacity="0.6"/>
                </svg>
              </div>
              <h4 className="pilar-name">Puro &amp; Orgánico</h4>
              <p className="pilar-desc">
                Creado con miel pura y extractos naturales. Sin químicos
                agresivos, sin sulfatos ni parabenos; solo nutrición real
                desde la raíz.
              </p>
            </div>
            <div className="pilar-card">
              <div className="pilar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                  <circle cx="24" cy="24" r="18" fill="#caa642" opacity="0.15"/>
                  <path d="M24 10L26 18H34L28 23L30 32L24 27L18 32L20 23L14 18H22L24 10Z" fill="#caa642"/>
                  <circle cx="24" cy="24" r="4" fill="#ffffff" opacity="0.5"/>
                </svg>
              </div>
              <h4 className="pilar-name">Sostenible <span className="pilar-sub">(Zero Waste)</span></h4>
              <p className="pilar-desc">
                Cuidamos de ti y del planeta. Adiós al plástico: empaques
                100% biodegradables y un formato sólido premium de larga
                duración.
              </p>
            </div>
            <div className="pilar-card">
              <div className="pilar-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none">
                  <path d="M24 6L26.5 15.5H36L28.5 21L31 30.5L24 25.5L17 30.5L19.5 21L12 15.5H21.5L24 6Z" fill="#caa642"/>
                  <circle cx="24" cy="24" r="16" fill="#caa642" opacity="0.08"/>
                  <path d="M24 12L25.5 18H32L27 22L28.5 28L24 24.5L19.5 28L21 22L16 18H22.5L24 12Z" fill="#ffffff" opacity="0.7"/>
                </svg>
              </div>
              <h4 className="pilar-name">Resultados Reales</h4>
              <p className="pilar-desc">
                Brillo natural, suavidad incomparable y un aroma que te
                acompaña todo el día. Notarás la transformación desde la
                primera lavada.
              </p>
            </div>
          </div>
        </div>

        <h2>Nuestros productos</h2>

        <div className="productos-container">
          {PRODUCTS.map(product => {
            const isFlipped = flippedId === product.id
            return (
              <div
                key={product.id}
                className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                ref={el => cardRefs.current[product.id] = el}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front" onClick={() => !isFlipped && handleFlip(product.id)}>
                    <img src={product.image} alt={product.name} />
                    <div className="flip-card-hint">Haz clic para ver más</div>
                  </div>
                  <div className="flip-card-back">
                    <button className="close-btn" onClick={handleClose}>✕</button>
                    <img src={product.image} alt={product.name} className="back-img" />
                    <h3>{product.name}</h3>
                    <p className="back-description">{product.description}</p>
                    <p className="back-price">${product.price.toLocaleString('es-CO')} COP</p>
                    <button className="buy-btn" onClick={() => handleBuy(product)}>Comprar</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="video-section">
          <h2>¿Cómo se usa?</h2>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/REPLACE_ME"
              title="Cómo usar HoneyB"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="proveedores" id="proveedores">
        <div className="proveedores-header">
          <h2 className="proveedores-title">Proveedores</h2>
          <p className="proveedores-subtitle">Aliados que comparten nuestra calidad</p>
        </div>
        <div className="proveedores-carousel">
          {SUPPLIERS.map((supplier, index) => (
            <div
              key={index}
              className={`proveedores-slide ${index === currentSlide ? 'active' : ''}`}
            >
              <img src={supplier.image} alt={supplier.name} />
              <div className="proveedores-caption">
                <h3>{supplier.name}</h3>
              </div>
            </div>
          ))}
          <div className="proveedores-dots">
            {SUPPLIERS.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="hoteleria" id="hoteleria">
        <div className="hoteleria-content">
          <h2>Hotelería</h2>
          <p>Próximamente — una experiencia exclusiva para hoteles y resorts.</p>
        </div>
      </section>

      <CartSidebar
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={() => { setShowCheckout(true); setCartOpen(false) }}
      />

      <CheckoutModal
        show={showCheckout}
        cart={cart}
        total={totalPrice}
        onConfirm={() => { setShowCheckout(false) }}
        onCancel={() => setShowCheckout(false)}
      />
    </>
  )
}

function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  )
}

export default App