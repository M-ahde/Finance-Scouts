import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/client/components/ui/button';
import { useLanguage } from '@/client/hooks/useLanguage';
import { cn } from '@/client/lib/utils';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/client/components/ui/dropdown-menu';

const navGroups = [
  {
    title: 'General',
    items: [
      { key: 'home', path: '/' },
      { key: 'about', path: '/about' },
    ],
  },
  {
    title: 'Projects',
    items: [
      { key: 'goals', path: '/goals' },
      { key: 'vision', path: '/vision' },
      { key: 'roadmap', path: '/roadmap' },
      { key: 'achievements', path: '/achievements' },
    ],
  },
  {
    title: 'Team',
    items: [
      { key: 'team', path: '/team' },
      { key: 'workshops', path: '/workshops' },
      { key: 'publications', path: '/publications' },
    ],
  },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage, isRTL } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
   <Link to="/" className="flex items-center gap-3">
  <img
    src="/logos/2-1.webp"
    alt="FT Logo"
    className="
      h-28 w-28
      rounded-xl
      object-contain
    "
  />

  {/* <span className="hidden sm:inline-block text-xl font-bold text-foreground">
    {t('home.hero.title')}
  </span> */}
</Link>


        {/* Desktop Navigation */}
        <div className="hidden gap-4 lg:flex">
          {navGroups.map((group) => (
            <DropdownMenu key={group.title}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1">
                  {t(`navGroups.${group.title}`)}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
           <DropdownMenuContent
  align={isRTL ? 'start' : 'end'}
  className="bg-popover/95 p-4 min-w-[220px] rounded-lg shadow-2xl"
>
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
  >
    <h3 className="mb-3 text-lg font-bold text-foreground border-b border-border/30 pb-2">
      {t(`navGroups.${group.title}`)}
    </h3>
<div className="flex flex-col gap-1">
  {group.items.map((item) => (
    <DropdownMenuItem key={item.key} asChild>
      <Link
        to={item.path}
        className={cn(
          'flex w-full items-center px-3 py-2 rounded transition-colors',
          'hover:bg-muted hover:text-foreground',
          location.pathname === item.path
            ? 'bg-muted font-semibold text-foreground'
            : 'text-muted-foreground'
        )}
      >
        {t(`nav.${item.key}`)}
      </Link>
    </DropdownMenuItem>
  ))}
</div>

  </motion.div>
</DropdownMenuContent>

            </DropdownMenu>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">{currentLanguage === 'en' ? 'EN' : 'عربي'}</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? 'start' : 'end'} className="bg-popover">
              <DropdownMenuItem onClick={() => changeLanguage('en')} className="cursor-pointer">
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage('ar')} className="cursor-pointer">
                العربية
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/dashboard" className="hidden sm:block">
            <Button variant="outline" size="sm">
              {currentLanguage === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
            </Button>
          </Link>

          {/* Join Button */}
          <Link to="/join" className="hidden sm:block">
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              {t('nav.join')}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="border-t border-border lg:hidden"
        >
          <div className="container mx-auto space-y-4 px-4 py-4">
            {navGroups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-2 text-lg font-bold">{t(`navGroups.${group.title}`)}</h3>
                {group.items.map((item) => (
                  <Link
                    key={item.key}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      'block rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                      location.pathname === item.path
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground'
                    )}
                  >
                    {t(`nav.${item.key}`)}
                  </Link>
                ))}
              </div>
            ))}
            <Link to="/join" onClick={() => setIsMenuOpen(false)} className="mt-4 block">
              <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                {t('nav.join')}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
