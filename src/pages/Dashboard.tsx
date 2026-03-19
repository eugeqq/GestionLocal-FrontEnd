/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Minus, 
  AlertCircle, 
  Package, 
  Sparkles,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { CHART_DATA, ORDERS, PRODUCTS } from '../constants';

export function Dashboard() {
  const lowStockItems = PRODUCTS.filter(p => p.stock < 20);

  return (
    <div className="space-y-14">
      {/* Metric Strip */}
      <section>
        <div className="flex flex-wrap gap-20">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2 block">Daily Revenue</span>
            <h2 className="text-[3.5rem] font-semibold leading-none tracking-tighter text-slate-900 dark:text-slate-100">
              $2,482.<span className="text-slate-300 dark:text-slate-700">50</span>
            </h2>
            <p className="text-xs text-blue-600 font-semibold mt-2 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +14.2% from yesterday
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2 block">New Customers</span>
            <h2 className="text-[3.5rem] font-semibold leading-none tracking-tighter text-slate-900 dark:text-slate-100">38</h2>
            <p className="text-xs text-blue-600 font-semibold mt-2 flex items-center gap-1">
              <Users className="w-3 h-3" /> Active session peaking
            </p>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 mb-2 block">Conversion</span>
            <h2 className="text-[3.5rem] font-semibold leading-none tracking-tighter text-slate-900 dark:text-slate-100">
              4.2<span className="text-slate-300 dark:text-slate-700">%</span>
            </h2>
            <p className="text-xs text-slate-400 font-semibold mt-2 flex items-center gap-1">
              <Minus className="w-3 h-3" /> Stable performance
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Main Analytics Card */}
        <div className="col-span-12 lg:col-span-8 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h3 className="text-xl font-medium tracking-tight mb-1 text-slate-900 dark:text-slate-100">Sales Performance</h3>
              <p className="text-sm text-slate-500">Real-time revenue stream analysis</p>
            </div>
            <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-full gap-1">
              <button className="px-4 py-1.5 text-[11px] font-bold rounded-full bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-slate-100">WEEKLY</button>
              <button className="px-4 py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">MONTHLY</button>
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CHART_DATA}>
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#94a3b8' }} 
                  dy={10}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" radius={[12, 12, 0, 0]}>
                  {CHART_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.day === 'FRI' ? '#2563eb' : '#e2e8f0'} 
                      className="hover:fill-blue-400 transition-colors duration-300"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          {/* Stock Alerts */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-medium tracking-tight mb-6 text-slate-900 dark:text-slate-100">Stock Alerts</h3>
            <div className="space-y-4">
              {lowStockItems.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.stock < 5 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {item.stock < 5 ? <AlertCircle className="w-5 h-5" /> : <Package className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.name}</p>
                      <p className="text-[10px] text-slate-500">Only {item.stock} remaining</p>
                    </div>
                  </div>
                  <button className="text-[11px] font-bold text-blue-600 hover:underline">RESTOCK</button>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Retention Card */}
          <div className="bg-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <Sparkles className="w-8 h-8 mb-4 fill-current" />
              <h3 className="text-lg font-medium leading-tight mb-2">Customer Retention is at an All-Time High</h3>
              <p className="text-xs text-blue-100 mb-6">Your recent 'Summer Collection' campaign increased return visits by 22%.</p>
              <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-xs font-bold w-full hover:bg-blue-50 transition-colors">VIEW REPORT</button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium tracking-tight text-slate-900 dark:text-slate-100">Recent Orders</h3>
          <button className="text-sm text-blue-600 font-semibold hover:underline">View All Transactions</button>
        </div>
        <div className="space-y-1">
          {/* Table Header */}
          <div className="grid grid-cols-12 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <div className="col-span-4">Product / Order ID</div>
            <div className="col-span-3 text-center">Status</div>
            <div className="col-span-3 text-center">Customer</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>
          {/* Rows */}
          {ORDERS.map((order) => (
            <div key={order.id} className="grid grid-cols-12 items-center px-6 py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="col-span-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img 
                    src={order.productImage} 
                    alt={order.productName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{order.productName}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{order.id}</p>
                </div>
              </div>
              <div className="col-span-3 flex justify-center">
                <span className={`px-3 py-1 text-[10px] font-bold rounded-full ${
                  order.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="col-span-3 text-center text-sm font-medium text-slate-600 dark:text-slate-400">{order.customer}</div>
              <div className="col-span-2 text-right text-sm font-bold text-slate-900 dark:text-slate-100">${order.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAB */}
      <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-blue-600 text-white shadow-xl shadow-blue-500/30 flex items-center justify-center hover:scale-105 transition-transform z-50">
        <Plus className="w-8 h-8" />
      </button>
    </div>
  );
}
