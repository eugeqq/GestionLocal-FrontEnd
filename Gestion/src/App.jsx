import { Navigate, Route, Routes } from 'react-router-dom'
import { useLocalStorage } from './hooks/useLocalStorage'
import Navigation from './components/Navigation'
import Products from './pages/Products'
import Inventory from './pages/Inventory'
import Sales from './pages/Sales'
import './App.css'

function App() {
  const [products, setProducts] = useLocalStorage('gestion_products', [])
  const [sales, setSales] = useLocalStorage('gestion_sales', [])
  const [inventoryLogs, setInventoryLogs] = useLocalStorage('gestion_inventoryLogs', [])

  const addProduct = ({ name, price, stock }) => {
    const newProduct = {
      id: crypto.randomUUID(),
      name,
      price,
      stock: Math.max(0, Number(stock) || 0),
    }
    setProducts((current) => [...current, newProduct])
  }

  const adjustStock = ({ productId, delta, note }) => {
    setProducts((current) => {
      const product = current.find((p) => p.id === productId)
      if (product) {
        setInventoryLogs((currentLogs) => [
          {
            id: crypto.randomUUID(),
            date: new Date().toISOString(),
            productId,
            productName: product.name,
            delta: Number(delta),
            note,
          },
          ...currentLogs,
        ])
      }

      return current.map((product) => {
        if (product.id !== productId) return product
        return {
          ...product,
          stock: Math.max(0, product.stock + Number(delta)),
        }
      })
    })
  }

  const addSale = ({ productId, quantity }) => {
    const saleQuantity = Number(quantity)

    setProducts((current) => {
      const product = current.find((p) => p.id === productId)
      if (!product) return current

      const total = product.price * saleQuantity

      setSales((currentSales) => [
        {
          id: crypto.randomUUID(),
          date: new Date().toISOString(),
          productId,
          productName: product.name,
          price: product.price,
          quantity: saleQuantity,
          total,
        },
        ...currentSales,
      ])

      return current.map((product) => {
        if (product.id !== productId) return product
        return {
          ...product,
          stock: Math.max(0, product.stock - saleQuantity),
        }
      })
    })
  }

  return (
    <div className="app">
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={<Navigate replace to="/productos" />}
        />
        <Route
          path="/productos"
          element={<Products products={products} onAddProduct={addProduct} />}
        />
        <Route
          path="/inventario"
          element={
            <Inventory
              products={products}
              inventoryLogs={inventoryLogs}
              onAdjustStock={adjustStock}
            />
          }
        />
        <Route
          path="/ventas"
          element={<Sales products={products} sales={sales} onAddSale={addSale} />}
        />
        <Route path="*" element={<Navigate replace to="/productos" />} />
      </Routes>
    </div>
  )
}

export default App
