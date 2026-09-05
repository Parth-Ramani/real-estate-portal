'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Box, Typography, Button } from '@mui/material';
import Navbar, { NavTab } from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/listing/HeroSection';
import FilterBar from '@/components/listing/FilterBar';
import ActiveFilters from '@/components/listing/ActiveFilters';
import PropertyGrid from '@/components/listing/PropertyGrid';
import MobileFilterDrawer from '@/components/listing/MobileFilterDrawer';
import ListPropertyModal from '@/components/listing/ListPropertyModal';
import ToastNotification from '@/components/common/ToastNotification';
import { useDebounce } from '@/hooks/useDebounce';
import { useFavorites } from '@/hooks/useFavorites';
import { Property, FilterState } from '@/types/property';
import rawPropertiesData from '@/data/properties.json';

const INITIAL_PROPERTIES: Property[] = rawPropertiesData as Property[];

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  listingType: 'buy',
  selectedBhks: [],
  propertyType: 'all',
  minPrice: 10000000, // 1 Cr
  maxPrice: 150000000, // 15 Cr
  sortBy: 'featured',
};

function PropertyListingContent() {
  // Properties state (initialized from json, can dynamically receive user listed properties)
  const [propertiesList, setPropertiesList] = React.useState<Property[]>(INITIAL_PROPERTIES);

  // Restore any user-listed properties from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem('haven_custom_properties');
      if (stored) {
        const customProps: Property[] = JSON.parse(stored);
        if (customProps.length > 0) {
          setPropertiesList([...customProps, ...INITIAL_PROPERTIES]);
        }
      }
    } catch (e) {
      console.error('Error reading custom properties from localStorage:', e);
    }
  }, []);

  // Filters state
  const [filters, setFilters] = React.useState<FilterState>(INITIAL_FILTERS);
  const [searchInput, setSearchInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [showOnlyFavorites, setShowOnlyFavorites] = React.useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = React.useState<number>(6);

  // Nav Tab state
  const [activeTab, setActiveTab] = React.useState<NavTab>('all');

  // Modal states
  const [listModalOpen, setListModalOpen] = React.useState(false);

  // Debounced search query (350ms delay for smooth typing)
  const debouncedSearchQuery = useDebounce(searchInput, 350);

  // Favorites hook with localStorage persistence
  const { favorites, toggleFavorite, favoriteCount } = useFavorites();

  // Toast Notification state
  const [toast, setToast] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Keep filters.searchQuery synced with debounced query & reset to page 1
  React.useEffect(() => {
    setFilters((prev) => ({ ...prev, searchQuery: debouncedSearchQuery }));
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  // Initial loading simulation for Skeleton display
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Update specific filter fields and reset page to 1
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...newFilters };
      // Sync active tab if listing type changed
      if (newFilters.listingType && !newFilters.propertyType) {
        setActiveTab(newFilters.listingType as NavTab);
      }
      return updated;
    });
    setCurrentPage(1);
  };

  // Tab switching from Navbar
  const handleTabSelect = React.useCallback((tab: NavTab, showNotification = true) => {
    setActiveTab(tab);
    setShowOnlyFavorites(false);
    setCurrentPage(1);

    if (tab === 'all') {
      setSearchInput('');
      setFilters({
        ...INITIAL_FILTERS,
        listingType: 'buy',
      });
      if (showNotification) {
        setToast({
          open: true,
          message: 'Exploring all residential properties.',
          severity: 'info',
        });
      }
    } else if (tab === 'buy') {
      setSearchInput('');
      handleFilterChange({
        listingType: 'buy',
        propertyType: 'all',
        minPrice: 10000000,
        maxPrice: 150000000,
        selectedBhks: [],
      });
      if (showNotification) {
        setToast({
          open: true,
          message: 'Viewing residences available for purchase.',
          severity: 'info',
        });
      }
    } else if (tab === 'rent') {
      setSearchInput('');
      handleFilterChange({
        listingType: 'rent',
        propertyType: 'all',
        minPrice: 15000,
        maxPrice: 300000,
        selectedBhks: [],
      });
      if (showNotification) {
        setToast({
          open: true,
          message: 'Viewing premier rental residences.',
          severity: 'info',
        });
      }
    } else if (tab === 'penthouse') {
      setSearchInput('');
      handleFilterChange({
        listingType: 'buy',
        propertyType: 'Penthouse',
        minPrice: 10000000,
        maxPrice: 150000000,
        selectedBhks: [],
      });
      if (showNotification) {
        setToast({
          open: true,
          message: 'Viewing featured luxury penthouses.',
          severity: 'info',
        });
      }
    }

    // Smooth scroll to top of listings
    const target = document.getElementById('listings-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Initial URL Search Params handling (e.g. arriving from detail page or direct link)
  const searchParams = useSearchParams();
  const initialParamsHandled = React.useRef(false);

  React.useEffect(() => {
    if (initialParamsHandled.current) return;

    const tabParam = searchParams.get('tab');
    const filterParam = searchParams.get('filter');
    const searchParam = searchParams.get('search');
    const actionParam = searchParams.get('action');

    if (!tabParam && !filterParam && !searchParam && !actionParam) {
      return;
    }
    initialParamsHandled.current = true;

    if (actionParam === 'list') {
      setListModalOpen(true);
    }

    if (filterParam === 'favorites') {
      setShowOnlyFavorites(true);
      setActiveTab('all');
      setCurrentPage(1);
      setToast({
        open: true,
        message: 'Viewing your saved favorite properties.',
        severity: 'info',
      });
    } else if (searchParam) {
      setSearchInput(searchParam);
      setCurrentPage(1);
      setToast({
        open: true,
        message: `Filtering listings in ${searchParam}.`,
        severity: 'info',
      });
    } else if (tabParam && ['all', 'buy', 'rent', 'penthouse'].includes(tabParam)) {
      handleTabSelect(tabParam as NavTab, false);
    }
  }, [searchParams, handleTabSelect]);

  // Location select from Footer or Hero
  const handleLocationSelect = (loc: string) => {
    setSearchInput(loc);
    setCurrentPage(1);
    setToast({
      open: true,
      message: `Filtering listings in ${loc}.`,
      severity: 'info',
    });
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchInput('');
    setShowOnlyFavorites(false);
    setActiveTab('all');
    setCurrentPage(1);
    setFilters({
      ...INITIAL_FILTERS,
      listingType: filters.listingType,
      minPrice: filters.listingType === 'rent' ? 15000 : 10000000,
      maxPrice: filters.listingType === 'rent' ? 300000 : 150000000,
    });
    setToast({
      open: true,
      message: 'All search filters reset.',
      severity: 'info',
    });
  };

  // Toggle favorite with feedback
  const handleToggleFavorite = (id: string) => {
    const wasFavorite = favorites.includes(id);
    toggleFavorite(id);
    setToast({
      open: true,
      message: wasFavorite ? 'Removed from saved properties.' : 'Property saved to your favorites!',
      severity: 'success',
    });
  };

  // Add dynamically published property
  const handlePropertyAdded = (newProp: Property) => {
    setPropertiesList((prev) => [newProp, ...prev]);

    // Persist to localStorage for persistence across reloads and detail page views
    try {
      const stored = localStorage.getItem('haven_custom_properties');
      const customProps: Property[] = stored ? JSON.parse(stored) : [];
      localStorage.setItem('haven_custom_properties', JSON.stringify([newProp, ...customProps]));
    } catch (e) {
      console.error('Error saving custom property to localStorage:', e);
    }

    setToast({
      open: true,
      message: `Property "${newProp.title}" published live to listings!`,
      severity: 'success',
    });

    // Reset filters and ensure price bounds contain the new property so it is 100% visible at the top
    setSearchInput('');
    setShowOnlyFavorites(false);
    setActiveTab(newProp.type);
    setCurrentPage(1);

    const minPriceBound = newProp.type === 'rent' ? 15000 : 1000000;
    const maxPriceBound = newProp.type === 'rent' ? 300000 : 150000000;

    setFilters({
      ...INITIAL_FILTERS,
      listingType: newProp.type,
      propertyType: 'all',
      selectedBhks: [],
      minPrice: Math.min(minPriceBound, newProp.price),
      maxPrice: Math.max(maxPriceBound, newProp.price),
    });

    // Smooth scroll to top of listings grid
    setTimeout(() => {
      const target = document.getElementById('listings-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }, 120);
  };

  // Filter & Sort properties
  const filteredProperties = React.useMemo(() => {
    return propertiesList
      .filter((prop) => {
        // Only favorites filter if active
        if (showOnlyFavorites && !favorites.includes(prop.id)) {
          return false;
        }

        // Buy / Rent match
        if (prop.type !== filters.listingType) {
          return false;
        }

        // BHK match (if any BHK filter selected)
        if (filters.selectedBhks.length > 0 && !filters.selectedBhks.includes(prop.bhk)) {
          return false;
        }

        // Property Type match
        if (filters.propertyType !== 'all' && prop.propertyType !== filters.propertyType) {
          return false;
        }

        // Price range match
        if (prop.price < filters.minPrice || prop.price > filters.maxPrice) {
          return false;
        }

        // Location Search with Debounce: checks locality, city, state, address, and title
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchLocation =
            prop.location.locality.toLowerCase().includes(q) ||
            prop.location.city.toLowerCase().includes(q) ||
            prop.location.address.toLowerCase().includes(q) ||
            prop.location.state.toLowerCase().includes(q) ||
            prop.title.toLowerCase().includes(q);

          if (!matchLocation) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'price-asc') return a.price - b.price;
        if (filters.sortBy === 'price-desc') return b.price - a.price;
        if (filters.sortBy === 'area-desc') return b.carpetAreaSqFt - a.carpetAreaSqFt;
        if (filters.sortBy === 'newest')
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        // Default: Featured first
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [propertiesList, filters, favorites, showOnlyFavorites]);

  const isSearching = searchInput !== debouncedSearchQuery;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      {/* Sticky Navigation Bar with Tabs & Free Listing trigger */}
      <Navbar
        favoriteCount={favoriteCount}
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
        onOpenListProperty={() => setListModalOpen(true)}
        showFavoritesOnly={showOnlyFavorites}
        onFavoriteClick={() => {
          const nextState = !showOnlyFavorites;
          setShowOnlyFavorites(nextState);
          setCurrentPage(1);
          setToast({
            open: true,
            message: nextState
              ? `Showing your ${favoriteCount} saved favorites.`
              : 'Showing all properties.',
            severity: 'info',
          });
        }}
      />

      {/* Hero Section with Debounced Search */}
      <HeroSection
        searchQuery={searchInput}
        onSearchChange={(val) => setSearchInput(val)}
        isSearching={isSearching}
      />

      {/* Main Listing Section */}
      <Container maxWidth="xl" sx={{ py: { xs: 4, md: 6 }, flexGrow: 1 }}>
        {/* Saved Favorites banner if active */}
        {showOnlyFavorites && (
          <Box
            sx={{
              p: 2.5,
              mb: 3,
              borderRadius: 3,
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E40AF' }}>
                Viewing Saved Favorites ({favoriteCount} properties)
              </Typography>
              <Typography variant="caption" sx={{ color: '#3B82F6' }}>
                Properties you bookmarked in localStorage are displayed below.
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setShowOnlyFavorites(false);
                setCurrentPage(1);
              }}
              sx={{ fontWeight: 700, color: '#1D4ED8', borderColor: '#93C5FD' }}
            >
              Show All Properties
            </Button>
          </Box>
        )}

        {/* Desktop Filter Controls (Buy/Rent, BHK, Price Slider, Sort) */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalResults={filteredProperties.length}
          />
        </Box>

        {/* Active Filter Chips & Results Count */}
        <ActiveFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={filteredProperties.length}
        />

        {/* Property Cards Grid with Skeleton Support & Full Pagination */}
        <PropertyGrid
          properties={filteredProperties}
          isLoading={isLoading}
          onResetFilters={handleResetFilters}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={(num) => {
            setItemsPerPage(num);
            setCurrentPage(1);
          }}
        />

        {/* Mobile Slide-Up Filter Drawer */}
        <MobileFilterDrawer
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalResults={filteredProperties.length}
        />
      </Container>

      {/* List Property Modal (Free Direct Owner Listing) */}
      <ListPropertyModal
        open={listModalOpen}
        onClose={() => setListModalOpen(false)}
        onPropertyAdded={handlePropertyAdded}
      />

      {/* Toast Feedback */}
      <ToastNotification
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      {/* Real Estate Portal Footer with Working Links & Policy Modal */}
      <Footer
        onLocationSelect={handleLocationSelect}
        onSubscribeSuccess={(email) => {
          setToast({
            open: true,
            message: `VIP subscription activated for ${email}.`,
            severity: 'success',
          });
        }}
      />
    </Box>
  );
}

export default function PropertyListingPage() {
  return (
    <React.Suspense fallback={null}>
      <PropertyListingContent />
    </React.Suspense>
  );
}
