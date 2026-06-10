import { useState } from 'react'
import { useCart } from './CartContext'

export default function CartSidebar({ open, onClose, onCheckout }) {
  const { cart, updateQuantity, removeFromCart } = useCart()
  const [deleteTarget, setDeleteTarget] = useState(null)

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  const confirmDelete = () => {
    if (deleteTarget) removeFromCart(deleteTarget.id)
    setDeleteTarget(null)
  }

  const cancelDelete = () => setDeleteTarget(null)

  return (
    <>
      {open && <div className="sidebar-overlay" onClick={onClose} />}
      <div className={`cart-sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Tu Carrito</h2>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <div className="sidebar-items">
          {cart.length === 0 ? (
            <p className="empty-cart">El carrito está vacío</p>
          ) : (
            cart.map(item => (
              <div key={item.id} className="sidebar-item">
                <img src={item.image} alt={item.name} className="item-img" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price.toLocaleString('es-CO')} COP</p>
                  <div className="item-controls">
                    <button onClick={() => item.quantity === 1 ? setDeleteTarget(item) : updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="item-right">
                  <p className="item-subtotal">${(item.price * item.quantity).toLocaleString('es-CO')}</p>
                  <button className="item-delete" onClick={() => setDeleteTarget(item)} title="Eliminar">
                    🗑
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="sidebar-footer">
            <div className="sidebar-total">
              <span>Total</span>
              <span>${total.toLocaleString('es-CO')} COP</span>
            </div>
            <button className="checkout-btn" onClick={onCheckout}>
              Finalizar Compra
            </button>
          </div>
        )}
      </div>

      {deleteTarget && (
        <div className="delete-overlay" onClick={cancelDelete}>
          <div className="delete-modal" onClick={e => e.stopPropagation()}>
            <p>¿Deseas eliminar el productos?</p>
            <div className="delete-actions">
              <button className="delete-no" onClick={cancelDelete}>No</button>
              <button className="delete-yes" onClick={confirmDelete}>Sí</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
