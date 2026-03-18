import { useMemo, useState } from 'react'

export default function Products({ products, onAddProduct }) {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [stock, setStock] = useState('')

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && !Number.isNaN(Number(price)) && Number(price) >= 0
  }, [name, price])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSubmit) return

    onAddProduct({
      name: name.trim(),
      price: Number(price),
      stock: Number(stock) || 0,
    })

    setName('')
    setPrice('')
    setStock('')
  }

  return (
    <main className="page">
      <h1>Productos</h1>
      <section className="card">
        <h2>Agregar producto</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Nombre
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Ej. Camiseta"
              required
            />
          </label>
          <label>
            Precio (ARS)
            <input
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              placeholder="Ej. 1250"
              type="number"
              min="0"
              step="0.01"
              required
            />
          </label>
          <label>
            Stock inicial
            <input
              value={stock}
              onChange={(event) => setStock(event.target.value)}
              placeholder="Ej. 10"
              type="number"
              min="0"
            />
          </label>
          <button type="submit" className="primary" disabled={!canSubmit}>
            Guardar producto
          </button>
        </form>
      </section>

      <section className="card">
        <h2>Catálogo</h2>
        {products.length === 0 ? (
          <p>No hay productos cargados aún.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Stock</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.price.toLocaleString(undefined, { style: 'currency', currency: 'ARS' })}</td>
                    <td>{product.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  )
}
