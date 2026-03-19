/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function Layout() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <Sidebar />
      <Topbar />
      <main className="ml-64 pt-24 px-10 pb-16">
        <Outlet />
      </main>
    </div>
  );
}
