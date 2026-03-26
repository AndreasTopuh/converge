'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MaterialIcon from '@/components/MaterialIcon';
import BrandMark from '@/components/BrandMark';
import { demoCompany } from '@/data/mockData';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: 'space_dashboard' },
  { href: '/connections', label: 'Connections', icon: 'lan' },
  { href: '/brain-feed', label: 'Brain Feed', icon: 'timeline' },
  { href: '/ask', label: 'Ask', icon: 'search' },
  { href: '/auto-docs', label: 'Auto Docs', icon: 'description' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="sidebar desktop-sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <BrandMark className="brand-mark-image" />
          </div>
          <div className="sidebar-brand">
            <p className="sidebar-eyebrow">Knowledge platform</p>
            <h2>CONVERGE</h2>
            <span>Structured intelligence for teams</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Workspace</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <MaterialIcon icon={item.icon} className="nav-icon" />
                <span className="nav-text">{item.label}</span>
                <MaterialIcon icon="chevron_right" className="nav-arrow" />
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="workspace-card">
            <div className="workspace-icon">
              <MaterialIcon icon="apartment" className="workspace-icon-glyph" />
            </div>
            <div className="workspace-info">
              <div className="workspace-name">{demoCompany.name}</div>
              <div className="workspace-status">
                <span className="workspace-status-dot" />
                Malaysia demo workspace live
              </div>
            </div>
          </div>
        </div>
      </aside>

      <nav className="mobile-nav" aria-label="Primary">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
            >
              <MaterialIcon icon={item.icon} className="mobile-nav-icon" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
