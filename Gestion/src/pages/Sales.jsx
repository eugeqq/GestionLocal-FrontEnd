import { useMemo, useState } from 'react'

export default function Sales({ products, sales, onAddSale }) {
  const [productId, setProductId] = useState(() => (products[0]?.id ?? ''))
  const [quantity, setQuantity] = useState('')

  const product = useMemo(
    () => products.find((p) => p.id === productId) ?? null,
    [products, productId],
  )

  const canSubmit = useMemo(() => {
    return product && !Number.isNaN(Number(quantity)) && Number(quantity) > 0
  }, [product, quantity])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onAddSale({
      productId,
      quantity: Number(quantity),
    })

    setQuantity('')
  }

  return (
    <main className="page">
      <h1>Ventas</h1>

      <section className="card">
        <h2>Registrar venta</h2>
        {products.length === 0 ? (
          <p>No hay productos cargados. Ve a "Productos" para comenzar.</p>
        ) : (
          <form onSubmit={handleSubmit} className="form-grid">
            <label>
              Producto
              <select
                value={productId}
                onChange={(event) => setProductId(event.target.value)}
              >
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Cantidad
              <input
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                type="number"
                min="1"
                step="1"
                placeholder="Ej. 1"
                required
              />
            </label>
            <div className="sale-summary">
              <div>
                <strong>Precio unitario:</strong>{' '}
                {product
                  ? product.price.toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'ARS',
                    })
                  : '-'}
              </div>
              <div>
                <strong>Total:</strong>{' '}
                {product && Number(quantity) > 0
                  ? (product.price * Number(quantity)).toLocaleString(undefined, {
                      style: 'currency',
                      currency: 'ARS',
                    })
                  : '-'}
              </div>
            </div>
            <button type="submit" className="primary" disabled={!canSubmit}>
              Agregar venta
            </button>
          </form>
        )}
      </section>

      {sales.length > 0 && (
        <section className="card">
          <h2>Historial de ventas</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {sales
                  .slice()
                  .reverse()
                  .map((sale) => (
                    <tr key={sale.id}>
                      <td>{new Date(sale.date).toLocaleString()}</td>
                      <td>{sale.productName}</td>
                      <td>{sale.quantity}</td>
                      <td>
                        {sale.price.toLocaleString(undefined, {
                          style: 'currency',
                          currency: 'ARS',
                        })}
                      </td>
                      <td>
                        {sale.total.toLocaleString(undefined, {
                          style: 'currency',
                          currency: 'ARS',
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  )
}
