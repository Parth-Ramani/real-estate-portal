'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  IconButton,
  Badge,
  Chip,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AddHomeOutlinedIcon from '@mui/icons-material/AddHomeOutlined';

export type NavTab = 'all' | 'buy' | 'rent' | 'penthouse' | 'none';

interface NavbarProps {
  favoriteCount?: number;
  onFavoriteClick?: () => void;
  activeTab?: NavTab;
  onTabSelect?: (tab: NavTab) => void;
  onOpenListProperty?: () => void;
  showFavoritesOnly?: boolean;
}

export default function Navbar({
  favoriteCount = 0,
  onFavoriteClick,
  activeTab = 'all',
  onTabSelect,
  onOpenListProperty,
  showFavoritesOnly = false,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const pathname = usePathname();

  const navItems: { label: string; tab: NavTab }[] = [
    { label: 'Explore All', tab: 'all' },
    { label: 'Buy Properties', tab: 'buy' },
    { label: 'Rentals', tab: 'rent' },
    { label: 'Featured Penthouses', tab: 'penthouse' },
  ];

  const handleTabClick = (tab: NavTab) => {
    setMobileOpen(false);
    if (onTabSelect) {
      onTabSelect(tab);
    } else {
      router.push(`/?tab=${tab}`);
    }
  };

  const handleFavoriteClick = () => {
    if (onFavoriteClick) {
      onFavoriteClick();
    } else {
      router.push('/?filter=favorites');
    }
  };

  const handleListPropertyClick = () => {
    if (onOpenListProperty) {
      onOpenListProperty();
    } else {
      router.push('/?action=list');
    }
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.96)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid #E2E8F0',
          color: 'text.primary',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 76 }, justifyContent: 'space-between' }}>
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={() => onTabSelect && onTabSelect('all')}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#D97706',
                  boxShadow: '0 4px 12px rgba(15, 23, 42, 0.25)',
                }}
              >
                <HomeWorkIcon sx={{ fontSize: 26 }} />
              </Box>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                  <Typography
                    variant="h5"
                    component="span"
                    sx={{
                      fontWeight: 800,
                      letterSpacing: '-0.03em',
                      color: '#0F172A',
                      lineHeight: 1,
                    }}
                  >
                    HAVEN
                  </Typography>
                  <Chip
                    label="LUXURY"
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.625rem',
                      fontWeight: 800,
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      letterSpacing: '0.05em',
                    }}
                  />
                </Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: '#64748B',
                    letterSpacing: '0.08em',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    display: 'block',
                  }}
                >
                  Premier Real Estate
                </Typography>
              </Box>
            </Link>

            {/* Desktop Navigation Links with Live Tab Switching */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                {navItems.map((item) => {
                  const isActive = !showFavoritesOnly && activeTab === item.tab;
                  return (
                    <Button
                      key={item.tab}
                      onClick={() => handleTabClick(item.tab)}
                      sx={{
                        color: isActive ? '#0F172A' : '#475569',
                        backgroundColor: isActive ? '#F1F5F9' : 'transparent',
                        fontWeight: isActive ? 800 : 600,
                        fontSize: '0.9rem',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        borderBottom: isActive ? '2px solid #0F172A' : '2px solid transparent',
                        '&:hover': {
                          backgroundColor: '#F1F5F9',
                          color: '#0F172A',
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* Right Action Buttons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Favorites Action Toggle */}
              <IconButton
                onClick={handleFavoriteClick}
                aria-label="View saved favorites"
                sx={{
                  border: showFavoritesOnly ? '2px solid #EF4444' : '1px solid #CBD5E1',
                  borderRadius: '12px',
                  p: 1.1,
                  backgroundColor: showFavoritesOnly ? '#FEF2F2' : '#FFFFFF',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: showFavoritesOnly ? '#FEE2E2' : '#F8FAFC',
                    borderColor: '#EF4444',
                  },
                }}
              >
                <Badge badgeContent={favoriteCount} color="error">
                  {showFavoritesOnly ? (
                    <FavoriteIcon sx={{ color: '#EF4444', fontSize: 22 }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: '#0F172A', fontSize: 22 }} />
                  )}
                </Badge>
              </IconButton>

              {/* Functional Post Property Free CTA */}
              {!isMobile && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddHomeOutlinedIcon />}
                  onClick={handleListPropertyClick}
                  sx={{
                    px: 2.5,
                    py: 1.1,
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    borderRadius: 2.5,
                    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.25)',
                  }}
                >
                  List Property Free
                </Button>
              )}

              {/* Mobile Hamburger */}
              {isMobile && (
                <IconButton
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-label="Toggle navigation menu"
                  sx={{
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    p: 1,
                  }}
                >
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer,
          '& .MuiDrawer-paper': {
            top: 64,
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            p: 2,
          },
        }}
      >
        <List>
          {navItems.map((item) => {
            const isActive = !showFavoritesOnly && activeTab === item.tab;
            return (
              <ListItem key={item.tab} disablePadding>
                <ListItemButton
                  onClick={() => handleTabClick(item.tab)}
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    backgroundColor: isActive ? '#F1F5F9' : 'transparent',
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          fontWeight: isActive ? 800 : 600,
                          color: isActive ? '#0F172A' : '#475569',
                        }}
                      >
                        {item.label}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding sx={{ pt: 1.5 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<AddHomeOutlinedIcon />}
              onClick={() => {
                setMobileOpen(false);
                handleListPropertyClick();
              }}
              sx={{ py: 1.2, fontWeight: 700, borderRadius: 2 }}
            >
              List Property Free
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}
