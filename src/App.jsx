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

function AppInner() {
  const { cart, addToCart } = useCart()
  const [flippedId, setFlippedId] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [toastMsg, setToastMsg] = useState(null)
  const [cartShakeKey, setCartShakeKey] = useState(0)
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
          <li>Historia</li>
          <li>Productos</li>
          <li>Proveedores</li>
          <li>Hotelería</li>
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

      <section className="historia">
        <div className="historia-img">
          <img
            src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800"
            alt="Shampoo sólido"
          />
        </div>
        <div className="historia-texto">
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
          <button>Sobre el fundador</button>
          <h3>Santiago Cavanzo</h3>
          <p>
            Santiago Cavanzo es emprendedor y consultor estratégico.
            Actualmente dirige HoneyB con una meta clara: llevar un producto
            colombiano premium a mercados internacionales.
          </p>
        </div>
      </section>

      <section className="productos">
        <h2>Productos</h2>
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
      </section>

      <section className="video-section">
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