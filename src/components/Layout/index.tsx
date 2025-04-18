import { Outlet } from 'react-router-dom';
import './styles.css';
import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({children}: LayoutProps) => {
    return (
        <div className="layout">
          <header className="layout__header">
            <div className="layout__header-content">
              <h1>NYTimes Most Popular Articles</h1>
            </div>
          </header>
          <main className="layout__main">
          {children || <Outlet />}

          </main>
          <footer className="layout__footer">
            <div className="layout__footer-content">
              <p>© {new Date().getFullYear()} NYTimes Popular Articles Viewer (based on NYTimes Developer APIs)</p>
            </div>
          </footer>
        </div>
    );
}

export default Layout;