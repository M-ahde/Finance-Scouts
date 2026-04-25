import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/client/components/ui/button';
import { useLanguage } from '@/client/hooks/useLanguage';
import { cn } from '@/client/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/client/components/ui/dropdown-menu';

const navItems = [
  { key: 'home', path: '/' },
  {
    key: 'projects',
    subItems: [
      { key: 'workshops', path: '/workshops' },
      { key: 'publications', path: '/publications' },
      { key: 'achievements', path: '/achievements' },
    ],
  },
  {
    key: 'team',
    subItems: [
      { key: 'about', path: '/about' },
      { key: 'goals', path: '/goals' },
      { key: 'vision', path: '/vision' },
      { key: 'team', path: '/team' },
    ],
  },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  const toggleLanguage = () => changeLanguage(currentLanguage === 'en' ? 'ar' : 'en');
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/logos/2-1.webp" alt="Finance Scouts" className="h-36 w-36 rounded-xl object-contain" />
        {/*     <span className="hidden md:block text-base font-bold text-foreground">
                    {t(`nav.FinanceScouts`,"Finance Scouts")}
            
            </span>*/}
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.subItems ? (
              <DropdownMenu key={item.key}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1 text-sm">
                    {t(`nav.${item.key}`)}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="min-w-[180px]">
                  {item.subItems.map((sub) => (
                    <DropdownMenuItem key={sub.key} asChild>
                      <Link
                        to={sub.path}
                        className={cn(
                          'w-full text-sm',
                          location.pathname === sub.path && 'font-semibold'
                        )}
                      >
                        {t(`nav.${sub.key}`)}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                key={item.key}
                to={item.path}
                className={cn(
                  'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted',
                  location.pathname === item.path ? 'bg-muted text-foreground' : 'text-muted-foreground'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            )
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={toggleLanguage} className="gap-1.5 text-xs">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">{currentLanguage === 'en' ? 'EN' : 'عربي'}</span>
          </Button>

          <Link to="/join" className="hidden sm:block">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm">
              {t('nav.join')}
            </Button>
          </Link>

          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — simple dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden border-t border-border bg-background"
          >
            <div className="container mx-auto px-4 py-3 space-y-0.5">

              {navItems.map((item) =>
                item.subItems ? (
                  <div key={item.key}>
                    <p className="px-3 pt-4 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {t(`nav.${item.key}`)}
                    </p>
                    {item.subItems.map((sub) => (
                      <Link
                        key={sub.key}
                        to={sub.path}
                        className={cn(
                          'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                          location.pathname === sub.path
                            ? 'bg-accent/10 text-accent'
                            : 'text-foreground hover:bg-muted'
                        )}
                      >
                        {t(`nav.${sub.key}`)}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                      location.pathname === item.path
                        ? 'bg-accent/10 text-accent'
                        : 'text-foreground hover:bg-muted'
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                )
              )}

              {/* Bottom row */}
              <div className="flex items-center gap-2 pt-3 pb-1 border-t border-border mt-2">
                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  {currentLanguage === 'en' ? 'عربي' : 'EN'}
                </button>
                <Link to="/join" onClick={() => setMobileOpen(false)} className="flex-1">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-sm">
                    {t('nav.join')}
                  </Button>
                </Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
