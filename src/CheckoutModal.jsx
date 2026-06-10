export default function CheckoutModal({ show, cart, total, onConfirm, onCancel }) {
  if (!show) return null

  return (
    <div className="checkout-overlay">
      <div className="checkout-modal">
        <h2>Confirmar Compra</h2>
        <div className="checkout-summary">
          {cart.map(item => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.name} />
              <div>
                <p className="checkout-item-name">{item.name}</p>
                <p className="checkout-item-qty">Cantidad: {item.quantity}</p>
                <p className="checkout-item-subtotal">
                  ${(item.price * item.quantity).toLocaleString('es-CO')} COP
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="checkout-total">
          <span>Total</span>
          <span>${total.toLocaleString('es-CO')} COP</span>
        </div>
        <p className="checkout-msg">¿Estás seguro de que deseas finalizar tu compra?</p>
        <div className="checkout-actions">
          <button className="checkout-cancel" onClick={onCancel}>Cancelar</button>
          <button className="checkout-confirm" onClick={onConfirm}>Sí, finalizar</button>
        </div>
      </div>
    </div>
  )
}
