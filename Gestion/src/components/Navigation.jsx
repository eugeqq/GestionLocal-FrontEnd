import { NavLink } from 'react-router-dom'
import './Navigation.css'

export default function Navigation() {
  return (
    <nav className="app-nav" aria-label="Main navigation">
      <div className="nav-brand">Sistema de Gestión</div>
      <div className="nav-links">
        <NavLink to="/productos" className={({ isActive }) => (isActive ? 'active' : '')}>
          Productos
        </NavLink>
        <NavLink to="/inventario" className={({ isActive }) => (isActive ? 'active' : '')}>
          Inventario
        </NavLink>
        <NavLink to="/ventas" className={({ isActive }) => (isActive ? 'active' : '')}>
          Ventas
        </NavLink>
      </div>
    </nav>
  )
}
