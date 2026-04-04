/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Plus, 
  Loader2,
  X,
  ChevronDown,
  ChevronUp,
  Package,
  Sparkles,
  Pencil,
  Trash2,
  ArrowUpDown
} from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  description?: string;
}

type SortKey = 'name' | 'price' | 'stock' | 'category';
type SortDir = 'asc' | 'desc';

const CREATE_NEW = '__CREATE_NEW__';

export function Inventory() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add Stock / Create modal
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [stockQuantity, setStockQuantity] = useState('1');
  const [submitting, setSubmitting] = useState(false);

  // New product fields
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // Edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [editStock, setEditStock] = useState('');
  const [editCategory, setEditCategory] = useState('');

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>('name');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const isCreateMode = selectedProductId === CREATE_NEW;

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // Sorted products
  const sortedProducts = useMemo(() => {
    const sorted = [...products].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case 'name':
          cmp = a.name.localeCompare(b.name, 'es');
          break;
        case 'price':
          cmp = a.price - b.price;
          break;
        case 'stock':
          cmp = a.stock - b.stock;
          break;
        case 'category':
          cmp = a.category.localeCompare(b.category, 'es');
          break;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [products, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ArrowUpDown className="w-3 h-3 ml-1 opacity-0 group-hover/sort:opacity-50 transition-opacity" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3 h-3 ml-1 text-blue-500" />
      : <ChevronDown className="w-3 h-3 ml-1 text-blue-500" />;
  };

  // ── Add Stock / Create Modal ──
  const openModal = (productId?: number) => {
    setSelectedProductId(productId ? String(productId) : '');
    setStockQuantity('1');
    setNewName(''); setNewPrice('');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProductId('');
    setStockQuantity('1');
    setNewName(''); setNewPrice('');
  };

  const handleAddStock = async () => {
    if (!selectedProductId || !stockQuantity) return;
    const product = products.find(p => p.id === Number(selectedProductId));
    if (!product) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: product.stock + Number(stockQuantity) }),
      });
      if (!res.ok) throw new Error('Failed to update stock');
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      closeModal();
    } catch (err: any) { alert('Error: ' + err.message); }
    finally { setSubmitting(false); }
  };

  const handleCreateProduct = async () => {
    if (!newName || !newPrice) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName, price: Number(newPrice),
          stock: Number(stockQuantity) || 0,
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed'); }
      const created = await res.json();
      setProducts(prev => [created, ...prev]);
      closeModal();
    } catch (err: any) { alert(err.message); }
    finally { setSubmitting(false); }
  };

  // ── Edit / Delete Modal ──
  const openEditModal = (product: Product) => {
    setEditProduct(product);
    setEditName(product.name);
    setEditPrice(String(product.price));
    setEditStock(String(product.stock));
    setEditCategory(product.category);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleSaveEdit = async () => {
    if (!editProduct || !editName || !editPrice) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${editProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName, price: Number(editPrice),
          stock: Number(editStock) || 0, category: editCategory || 'General',
        }),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed'); }
      const updated = await res.json();
      setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
      closeEditModal();
    } catch (err: any) { alert(err.message); }
    finally { setSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!editProduct) return;
    if (!confirm(`¿Eliminar "${editProduct.name}"? Esta acción no se puede deshacer.`)) return;
    setSubmitting(true);
    try {
      const res = await fetch(`/api/products/${editProduct.id}`, { method: 'DELETE' });
      if (!res.ok && res.status !== 204) throw new Error('Failed to delete');
      setProducts(prev => prev.filter(p => p.id !== editProduct.id));
      closeEditModal();
    } catch (err: any) { alert(err.message); }
    finally { setSubmitting(false); }
  };

  const totalItems = products.reduce((sum, p) => sum + p.stock, 0);
  const today = new Date().toLocaleDateString('es-AR', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
  const selectedProduct = products.find(p => p.id === Number(selectedProductId));
  const inputClass = "w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 text-slate-900 dark:text-slate-100 transition-all";

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 text-sm">{error}</p>
        <button onClick={() => { setError(null); setLoading(true); fetchProducts(); }} className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold">Reintentar</button>
      </div>
    );
  }

  return (
    <div className="space-y-10 mt-8">
      {/* Header */}
      <section className="flex justify-between items-end">
        <div>
          <p className="text-[11px] font-bold tracking-[0.05em] text-blue-600 mb-3 uppercase">Resumen de Stock</p>
          <h2 className="text-4xl font-medium tracking-tight text-slate-900 dark:text-slate-100">Inventario</h2>
        </div>
        <div className="flex items-center gap-12">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Artículos</p>
            <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{totalItems}</p>
          </div>
          <button onClick={() => openModal()} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-full text-sm font-semibold transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/10 active:scale-95">
            <Plus className="w-4 h-4" /> Agregar Stock
          </button>
        </div>
      </section>

      {/* Product List */}
      <section>
        {products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-400 text-sm">Aún no hay productos. Hacé clic en "Agregar Stock" para crear tu primer producto.</p>
          </div>
        ) : (
          <>
            {/* Column Headers with Sort */}
            <div className="grid grid-cols-12 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-2">
              <button onClick={() => handleSort('name')} className="col-span-4 flex items-center gap-0.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors text-left group/sort">
                Producto <SortIcon col="name" />
              </button>
              <button onClick={() => handleSort('category')} className="col-span-3 flex items-center gap-0.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group/sort">
                Categoría <SortIcon col="category" />
              </button>
              <button onClick={() => handleSort('price')} className="col-span-2 flex items-center justify-center gap-0.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group/sort">
                Precio <SortIcon col="price" />
              </button>
              <button onClick={() => handleSort('stock')} className="col-span-1 flex items-center justify-center gap-0.5 hover:text-slate-600 dark:hover:text-slate-300 transition-colors group/sort">
                Stock <SortIcon col="stock" />
              </button>
              <div className="col-span-2 text-right">Acciones</div>
            </div>
            <div className="space-y-1">
              {sortedProducts.map((product) => (
                <div key={product.id} className="grid grid-cols-12 items-center px-5 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group">
                  <div className="col-span-4">
                    <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors truncate">{product.name}</h3>
                  </div>
                  <div className="col-span-3 text-xs text-slate-500 truncate">{product.category}</div>
                  <div className="col-span-2 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">${product.price.toFixed(2)}</div>
                  <div className="col-span-1 text-center">
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      product.stock === 0 
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-600' 
                        : product.stock <= 5 
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-600' 
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      {product.stock}
                    </span>
                  </div>
                  <div className="col-span-2 flex justify-end gap-1.5">
                    <button
                      onClick={() => openEditModal(product)}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-amber-500 hover:text-white text-slate-900 dark:text-slate-100 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all active:scale-95 flex items-center gap-1"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => openModal(product.id)}
                      className="bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-900 dark:text-slate-100 px-3 py-1.5 rounded-full text-[11px] font-bold transition-all active:scale-95"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Footer */}
      {products.length > 0 && (
        <footer className="flex justify-between items-center px-5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mostrando {products.length} Productos</p>
        </footer>
      )}

      {/* ══════ ADD STOCK / CREATE PRODUCT MODAL ══════ */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden ring-1 ring-black/5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCreateMode ? 'bg-green-50 dark:bg-green-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                  {isCreateMode ? <Sparkles className="w-5 h-5 text-green-600" /> : <Package className="w-5 h-5 text-blue-600" />}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{isCreateMode ? 'Crear Nuevo Producto' : 'Agregar Stock'}</h3>
                  <p className="text-xs text-slate-400">{today}</p>
                </div>
              </div>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="px-8 pb-8 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Seleccionar Producto</label>
                <div className="relative">
                  <select className={`${inputClass} appearance-none`} value={selectedProductId} onChange={e => setSelectedProductId(e.target.value)}>
                    <option value="">Elegir un producto...</option>
                    <option value={CREATE_NEW}>＋ Crear nuevo producto</option>
                    {products.length > 0 && (
                      <optgroup label="Productos existentes">
                        {products.map(p => <option key={p.id} value={p.id}>{p.name} — {p.stock} en stock</option>)}
                      </optgroup>
                    )}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                </div>
              </div>

              {isCreateMode && (
                <>
                  <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Nombre del Producto *</label><input className={inputClass} placeholder="ej. Blusa de Seda" value={newName} onChange={e => setNewName(e.target.value)} /></div>
                  <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Precio *</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span><input className={`${inputClass} pl-8`} type="number" step="0.01" placeholder="0.00" value={newPrice} onChange={e => setNewPrice(e.target.value)} /></div></div>
                </>
              )}

              {selectedProduct && !isCreateMode && (
                <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{selectedProduct.name}</p><p className="text-xs text-slate-400">{selectedProduct.category}</p></div>
                  <div className="text-right"><p className="text-xs text-slate-400">Actual</p><p className="text-lg font-bold text-slate-900 dark:text-slate-100">{selectedProduct.stock}</p></div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">{isCreateMode ? 'Stock Inicial' : 'Cantidad a Agregar'}</label>
                <input className={inputClass} type="number" min={isCreateMode ? '0' : '1'} value={stockQuantity} onChange={e => setStockQuantity(e.target.value)} />
              </div>

              {selectedProduct && !isCreateMode && Number(stockQuantity) > 0 && (
                <div className="flex justify-between items-center px-4 py-3 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                  <span className="text-xs font-semibold text-blue-600">Nuevo Total de Stock</span>
                  <span className="text-lg font-bold text-blue-600">{selectedProduct.stock + Number(stockQuantity)}</span>
                </div>
              )}

              {isCreateMode ? (
                <button onClick={handleCreateProduct} disabled={submitting || !newName || !newPrice} className="w-full bg-green-600 text-white py-4 rounded-full font-semibold text-sm transition-all hover:bg-green-700 shadow-xl shadow-green-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Creando...' : 'Crear Producto'}
                </button>
              ) : (
                <button onClick={handleAddStock} disabled={submitting || !selectedProductId || !stockQuantity || Number(stockQuantity) < 1} className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold text-sm transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? 'Actualizando...' : 'Confirmar Actualización'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══════ EDIT / DELETE PRODUCT MODAL ══════ */}
      {showEditModal && editProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeEditModal} />
          <div className="relative bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-md mx-4 overflow-hidden ring-1 ring-black/5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-8 pt-8 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                  <Pencil className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Modificar Producto</h3>
                  <p className="text-xs text-slate-400">{editProduct.category}</p>
                </div>
              </div>
              <button onClick={closeEditModal} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <X className="w-4 h-4 text-slate-400" />
              </button>
            </div>
            <div className="px-8 pb-8 space-y-5">
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Nombre del Producto *</label><input className={inputClass} value={editName} onChange={e => setEditName(e.target.value)} /></div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Precio *</label><div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span><input className={`${inputClass} pl-8`} type="number" step="0.01" value={editPrice} onChange={e => setEditPrice(e.target.value)} /></div></div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Stock</label><input className={inputClass} type="number" min="0" value={editStock} onChange={e => setEditStock(e.target.value)} /></div>
              <div className="space-y-2"><label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Categoría</label><input className={inputClass} value={editCategory} onChange={e => setEditCategory(e.target.value)} /></div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleDelete}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-red-200 text-red-600 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/10 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" /> Eliminar
                </button>
                <button
                  onClick={handleSaveEdit}
                  disabled={submitting || !editName || !editPrice}
                  className="flex-1 bg-amber-500 text-white py-4 rounded-full font-semibold text-sm transition-all hover:bg-amber-600 shadow-xl shadow-amber-500/10 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
