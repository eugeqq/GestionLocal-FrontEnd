import { useMemo, useState } from 'react'

export default function Inventory({ products, onAdjustStock, inventoryLogs }) {
  const [selectedProductId, setSelectedProductId] = useState(() => (products[0]?.id ?? ''))
  const [quantity, setQuantity] = useState('')
  const [description, setDescription] = useState('')

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [selectedProductId, products],
  )

  const canSubmit = useMemo(() => {
    return selectedProduct && !Number.isNaN(Number(quantity)) && Number(quantity) !== 0
  }, [selectedProduct, quantity])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onAdjustStock({
      productId: selectedProductId,
      delta: Number(quantity),
      note: description.trim(),
    })

    setQuantity('')
    setDescription('')
  }

  return (
    <main className="page">
      <h1>Inventario</h1>

      <section className="card">
        <h2>Resumen de stock</h2>
        {products.length === 0 ? (
          <p>No hay productos cargados. Ve a "Productos" para crear uno.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Stock actual</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.stock}</td>
                    <td>{product.price.toLocaleString(undefined, { style: 'currency', currency: 'ARS' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="card">
        <h2>Registrar movimiento de inventario</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Producto
            <select
              value={selectedProductId}
              onChange={(event) => setSelectedProductId(event.target.value)}
              disabled={products.length === 0}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Cantidad (positivo = ingreso, negativo = egreso)
            <input
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              type="number"
              step="1"
              min="-99999"
              max="99999"
              placeholder="Ej. 10 o -5"
              required
            />
          </label>
          <label>
            Nota (opcional)
            <input
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Ej. Reposición de stock"
            />
          </label>
          <button type="submit" className="primary" disabled={!canSubmit}>
            Guardar movimiento
          </button>
        </form>
      </section>

      {inventoryLogs.length > 0 && (
        <section className="card">
          <h2>Historial de movimiento</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Nota</th>
                </tr>
              </thead>
              <tbody>
                {inventoryLogs
                  .slice()
                  .reverse()
                  .map((log) => (
                    <tr key={log.id}>
                      <td>{new Date(log.date).toLocaleString()}</td>
                      <td>{log.productName}</td>
                      <td>{log.delta > 0 ? `+${log.delta}` : log.delta}</td>
                      <td>{log.note || '-'}</td>
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
