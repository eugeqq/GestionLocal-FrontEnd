/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Filter,
  Search
} from 'lucide-react';
import { PRODUCTS } from '../constants';

export function Inventory() {
  const totalItems = 1284;
  const lowStock = 12;

  return (
    <div className="space-y-16 mt-8">
      {/* Editorial Header Section */}
      <section className="flex justify-between items-end">
        <div>
          <p className="text-[11px] font-bold tracking-[0.05em] text-blue-600 mb-3 uppercase">Stock Overview</p>
          <h2 className="text-4xl font-medium tracking-tight text-slate-900 dark:text-slate-100">Curated Inventory</h2>
        </div>
        <div className="flex items-baseline gap-16">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Total Items</p>
            <p className="text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{totalItems}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Low Stock</p>
            <p className="text-3xl font-semibold text-red-600 tracking-tight">{lowStock}</p>
          </div>
        </div>
      </section>

      {/* Inventory Grid */}
      <section>
        {/* Header Row */}
        <div className="grid grid-cols-12 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-4">
          <div className="col-span-5">Product Details</div>
          <div className="col-span-2 text-center">SKU</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-1 text-center">Stock</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Product Rows */}
        <div className="space-y-4">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="grid grid-cols-12 items-center px-6 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-300 group">
              <div className="col-span-5 flex items-center gap-6">
                <div className="w-16 h-20 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-base font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 transition-colors">{product.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{product.category}</p>
                </div>
              </div>
              <div className="col-span-2 text-center text-sm font-medium text-slate-400 font-mono">{product.sku}</div>
              <div className="col-span-2 text-center text-sm font-semibold text-slate-900 dark:text-slate-100">${product.price.toFixed(2)}</div>
              <div className="col-span-1 text-center">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                  product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}>
                  {product.stock} left
                </span>
              </div>
              <div className="col-span-2 text-right">
                <button className="bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-900 dark:text-slate-100 px-5 py-2 rounded-full text-xs font-bold transition-all active:scale-95">
                  Add Stock
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination / Footer */}
      <footer className="mt-12 flex justify-between items-center px-6">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Showing 1-10 of 1,284 Products</p>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-blue-600 font-bold text-xs shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all text-xs font-medium">3</button>
          </div>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>

      {/* Floating Filter Button */}
      <div className="fixed bottom-10 right-10 flex flex-col gap-3 z-30">
        <button className="w-14 h-14 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center text-slate-900 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-90 ring-1 ring-black/5">
          <Filter className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
