/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Plus, 
  ChevronDown, 
  Search, 
  Bell, 
  UserCircle 
} from 'lucide-react';
import { TRANSACTIONS, PRODUCTS } from '../constants';

export function Sales() {
  return (
    <div className="space-y-16">
      {/* Metric Strip */}
      <div className="flex items-baseline gap-20 mb-16">
        <div>
          <span className="block text-[0.6875rem] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Total Sales Today</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[3.5rem] font-semibold tracking-tighter text-slate-900 dark:text-slate-100 leading-none">$12,482</span>
            <span className="text-sm font-semibold text-blue-600">+12.4%</span>
          </div>
        </div>
        <div className="h-12 w-[1px] bg-slate-200 dark:bg-slate-800 self-center"></div>
        <div>
          <span className="block text-[0.6875rem] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Average Order Value</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[3.5rem] font-semibold tracking-tighter text-slate-900 dark:text-slate-100 leading-none">$245</span>
            <span className="text-sm font-semibold text-slate-400">USD</span>
          </div>
        </div>
        <div className="h-12 w-[1px] bg-slate-200 dark:bg-slate-800 self-center"></div>
        <div>
          <span className="block text-[0.6875rem] font-bold text-slate-400 uppercase tracking-[0.1em] mb-2">Transactions</span>
          <div className="flex items-baseline gap-2">
            <span className="text-[3.5rem] font-semibold tracking-tighter text-slate-900 dark:text-slate-100 leading-none">51</span>
          </div>
        </div>
      </div>

      {/* Asymmetric Grid: Form & List */}
      <div className="grid grid-cols-12 gap-10">
        {/* Left Column: Sales Form */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 sticky top-32 border border-slate-200 dark:border-slate-800">
            <h2 className="text-xl font-semibold tracking-tight mb-8 text-slate-900 dark:text-slate-100">Record New Sale</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Product Selection</label>
                <div className="relative">
                  <select className="w-full appearance-none bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500/30 text-slate-900 dark:text-slate-100 shadow-sm">
                    <option>Select a product...</option>
                    {PRODUCTS.map(p => (
                      <option key={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 w-4 h-4" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Price Sold</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-slate-400">$</span>
                    <input className="w-full bg-white dark:bg-slate-800 border-none rounded-xl pl-8 pr-4 py-3 text-sm focus:ring-1 focus:ring-blue-500/30 text-slate-900 dark:text-slate-100 shadow-sm" placeholder="0.00" type="number"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Quantity</label>
                  <input className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500/30 text-slate-900 dark:text-slate-100 shadow-sm" type="number" defaultValue="1"/>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-1">Buyer Name (Optional)</label>
                <input className="w-full bg-white dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500/30 text-slate-900 dark:text-slate-100 shadow-sm" placeholder="e.g. Julianne Moore" type="text"/>
              </div>
              <div className="pt-4">
                <button className="w-full bg-blue-600 text-white py-4 rounded-full font-semibold text-sm transition-all hover:bg-blue-700 shadow-xl shadow-blue-500/10 active:scale-95" type="button">
                  Complete Transaction
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Recent Sales List */}
        <div className="col-span-12 lg:col-span-8">
          <div className="flex justify-between items-center mb-8 px-4">
            <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">Recent Transactions</h2>
            <button className="text-sm font-semibold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="group bg-white dark:bg-slate-900 p-6 rounded-2xl transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden">
                    <img 
                      src={tx.productImage} 
                      alt={tx.productName} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">{tx.productName}</p>
                    <p className="text-xs text-slate-500">{tx.date} • Customer: {tx.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100">${tx.amount.toFixed(2)}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                    tx.status === 'PAID' ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'
                  }`}>
                    {tx.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
