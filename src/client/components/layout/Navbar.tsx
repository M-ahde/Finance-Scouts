import { useState, useEffect, useRef } from 'react';
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
  {
    key: 'home',
    path: '/',
  },
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logos/1.webp"
            alt="Finance Scouts"
            className="h-12 w-12 md:h-14 md:w-14 rounded-xl object-contain transition-transform group-hover:scale-105"
          />
          <span className="hidden md:block text-lg font-bold text-foreground tracking-tight">
            Finance Scouts
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.subItems ? (
              <DropdownMenu key={item.key}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-sm"
                  >
                    {t(`nav.${item.key}`)}
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align={isRTL ? 'start' : 'end'}
                  className="bg-popover/95 p-2 min-w-[200px] rounded-lg shadow-xl"
                >
                  {item.subItems.map((sub) => (
                    <DropdownMenuItem key={sub.key} asChild>
                      <Link
                        to={sub.disabled ? '#' : sub.path}
                        onClick={(e) => sub.disabled && e.preventDefault()}
                        className={cn(
                          'flex w-full cursor-pointer items-center px-3 py-2 rounded-md text-sm transition-colors',
                          sub.disabled
                            ? 'pointer-events-none opacity-40 cursor-not-allowed'
                            : 'hover:bg-muted',
                          location.pathname === sub.path
                            ? 'bg-muted font-semibold text-foreground'
                            : 'text-muted-foreground'
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
                  location.pathname === item.path
                    ? 'bg-muted text-foreground font-semibold'
                    : 'text-muted-foreground'
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="gap-2 min-w-[70px]"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline text-xs font-medium">
              {currentLanguage === 'en' ? 'EN' : 'عربي'}
            </span>
          </Button>

          <Link to="/join" className="hidden sm:block">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 text-sm">
              {t('nav.join')}
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              ref={mobileMenuRef}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="border-t border-border lg:hidden overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 space-y-1">
                {navItems.map((item) =>
                  item.subItems ? (
                    <div key={item.key} className="space-y-1">
                      <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        {t(`nav.${item.key}`)}
                      </div>
                      {item.subItems.map((sub) => (
                        <Link
                          key={sub.key}
                          to={sub.disabled ? '#' : sub.path}
                          onClick={(e) => {
                            if (sub.disabled) e.preventDefault();
                            setMobileOpen(false);
                          }}
                          className={cn(
                            'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                            sub.disabled
                              ? 'pointer-events-none opacity-40'
                              : 'hover:bg-muted',
                            location.pathname === sub.path
                              ? 'bg-muted text-foreground font-semibold'
                              : 'text-muted-foreground'
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
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors hover:bg-muted',
                        location.pathname === item.path
                          ? 'bg-muted text-foreground font-semibold'
                          : 'text-muted-foreground'
                      )}
                    >
                      {t(`nav.${item.key}`)}
                    </Link>
                  )
                )}

                <div className="pt-4">
                  <Link
                    to="/join"
                    onClick={() => setMobileOpen(false)}
                    className="block"
                  >
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {t('nav.join')}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </header>
  );
}