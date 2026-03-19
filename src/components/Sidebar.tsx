/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  CreditCard, 
  BarChart3, 
  Settings, 
  Sparkles 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar() {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
    { icon: Package, label: 'Inventory', to: '/inventory' },
    { icon: CreditCard, label: 'Sales', to: '/sales' },
    { icon: BarChart3, label: 'Analytics', to: '/analytics' },
    { icon: Settings, label: 'Settings', to: '/settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 flex flex-col p-6 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
          <Sparkles className="w-5 h-5 fill-current" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter text-slate-900 dark:text-slate-100">Atelier</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Store Management</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 transition-all duration-200 ease-in-out rounded-xl text-sm font-medium tracking-tight",
              isActive 
                ? "text-blue-700 dark:text-blue-400 bg-white dark:bg-slate-800 shadow-sm" 
                : "text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-100"
            )}
          >
            <item.icon className={cn("w-5 h-5", item.to === '/' && "fill-none")} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 bg-slate-100 dark:bg-slate-800/50 rounded-2xl">
        <div className="flex items-center gap-3">
          <img 
            className="w-10 h-10 rounded-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkJ1YDLbUeBJCNpfvapJ_KicaHck9qYmY09Xl09InRZu4A-kS4JrHtqbPCd2JM3cDczEgCl23umcY8mRBUcYiixBMYH6v4IMG6w83BToE4FVMmiwDfq70Chc8M1nL0JdiAQjvXgwlVEP19gkZCKcjlBpaYfAm7T418tT7lK1SXBPcl8QB4WJSM3YoxEe8K7-OH3WbJI7FeO_hu47KZxipHibnPtMCre8AN59MLnwGjhVn2QwLF-Skd9e-sZlB5oaBpLgJXfhURstJm" 
            alt="Profile"
            referrerPolicy="no-referrer"
          />
          <div className="overflow-hidden">
            <p className="text-xs font-bold truncate text-slate-900 dark:text-slate-100">Boutique Owner</p>
            <p className="text-[10px] text-slate-400 truncate">Premium Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
