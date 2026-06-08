import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
          🍯 HoneyB
        </div>

        <ul className="menu">
          <li>Historia</li>
          <li>Productos</li>
          <li>Proveedores</li>
          <li>Hotelería</li>
        </ul>

        <div className="cart">
          🛒 0
        </div>
      </nav>

      <section className="hero">
        <h2>BIENVENIDOS A</h2>

        <h1>HONEYB</h1>

        <p>Shampoo Sólido Premium</p>

        <span>
          Desde 2022, cuidando tu cabello y nuestro planeta
        </span>

        <button>Conócenos</button>
      </section>
    </>
  )
}

export default App