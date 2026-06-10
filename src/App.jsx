import './App.css'
import { useState } from 'react'

function App() {
  const [carrito, setCarrito] = useState(0)

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">🍯 HoneyB</div>

        <ul className="menu">
          <li>Historia</li>
          <li>Productos</li>
          <li>Proveedores</li>
          <li>Hotelería</li>
        </ul>

        <div className="cart">
          🛒 {carrito}
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <h2>BIENVENIDOS A</h2>

        <h1>HONEYB</h1>

        <p>Shampoo Sólido Premium</p>

        <span>
          Desde 2022, cuidando tu cabello y nuestro planeta
        </span>

        <button onClick={() => setCarrito(carrito + 1)}>
          Conócenos
        </button>
      </section>

      {/* Historia */}
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

      {/* Productos */}
      <section className="productos">
        <h2>Productos</h2>

        <div className="productos-container">

          <div className="producto-grande">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1200"
              alt="Shampoo Premium"
            />

            <div className="producto-info">
              <h3>Shampoo Sólido Premium</h3>

              <p>
                Formulado con ingredientes naturales.
              </p>

              <p>
                Detalles adicionales: 70g = 35-58 lavadas.
                Para toda la familia.
              </p>

              <button onClick={() => setCarrito(carrito + 1)}>
                Comprar
              </button>
            </div>
          </div>

          <div className="producto-pequeno">
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600"
              alt="Shampoo Natural"
            />

            <div className="producto-info">
              <h3>Shampoo Sólido Natural</h3>

              <p>
                Cuidado natural para el cabello.
              </p>
            </div>
          </div>

        </div>

        <div className="video-btn">
          <button>▶ Cómo usar</button>
        </div>
      </section>
    </>
  )
}

export default App