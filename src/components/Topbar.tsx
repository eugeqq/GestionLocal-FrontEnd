/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Bell, UserCircle } from 'lucide-react';

export function Topbar() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-16rem)] z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-10 py-4 border-b border-slate-200 dark:border-slate-800">
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center focus-within:ring-2 focus-within:ring-blue-500/20 rounded-full transition-all">
          <Search className="absolute left-4 w-4 h-4 text-slate-400" />
          <input 
            className="w-full bg-slate-200/50 dark:bg-slate-800/50 border-none rounded-full py-2.5 pl-12 text-xs focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400" 
            placeholder="Search orders, products..." 
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
        </button>
        <button className="text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
          <UserCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
