'use client';

import * as React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Fab,
  Badge,
  Divider,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import { FilterState, ListingType } from '@/types/property';
import { formatPrice } from '@/utils/formatters';

interface MobileFilterDrawerProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const BHK_OPTIONS = [1, 2, 3, 4, 5];
const PROPERTY_TYPES = ['all', 'Apartment', 'Villa', 'Penthouse', 'Studio', 'Duplex', 'Townhouse'];

export default function MobileFilterDrawer({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = React.useState(false);

  const isRent = filters.listingType === 'rent';
  const minPossible = isRent ? 15000 : 10000000;
  const maxPossible = isRent ? 300000 : 150000000;
  const step = isRent ? 5000 : 2500000;

  const activeCount =
    (filters.searchQuery ? 1 : 0) +
    filters.selectedBhks.length +
    (filters.propertyType !== 'all' ? 1 : 0) +
    (filters.minPrice > minPossible || filters.maxPrice < maxPossible ? 1 : 0);

  const handleBhkToggle = (bhk: number) => {
    let updatedBhks: number[];
    if (filters.selectedBhks.includes(bhk)) {
      updatedBhks = filters.selectedBhks.filter((b) => b !== bhk);
    } else {
      updatedBhks = [...filters.selectedBhks, bhk];
    }
    onFilterChange({ selectedBhks: updatedBhks });
  };

  const handleListingTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: ListingType | null
  ) => {
    if (newType && newType !== filters.listingType) {
      const newMin = newType === 'rent' ? 15000 : 10000000;
      const newMax = newType === 'rent' ? 300000 : 150000000;
      onFilterChange({
        listingType: newType,
        minPrice: newMin,
        maxPrice: newMax,
      });
    }
  };

  return (
    <>
      {/* Floating Action Button on Mobile */}
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1100,
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            px: 3,
            py: 1.5,
            boxShadow: '0 8px 25px rgba(15, 23, 42, 0.4)',
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#1E293B',
            },
          }}
        >
          <Badge badgeContent={activeCount} color="secondary" sx={{ mr: 1.5 }}>
            <TuneIcon sx={{ fontSize: 20 }} />
          </Badge>
          Filter & Sort ({totalResults})
        </Fab>
      </Box>

      {/* Slide-Up Bottom Drawer */}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          zIndex: 1300,
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            maxHeight: '85vh',
            p: 3,
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        {/* Drawer Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
              Filter Properties
            </Typography>
            {activeCount > 0 && (
              <Chip label={`${activeCount} Active`} size="small" color="secondary" />
            )}
          </Box>
          <IconButton onClick={() => setOpen(false)} aria-label="Close filters">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2.5 }} />

        {/* Scrollable Filters Content */}
        <Box sx={{ overflowY: 'auto', pr: 0.5, mb: 3 }}>
          {/* Purpose (Buy / Rent) */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#334155' }}>
            Looking To:
          </Typography>
          <ToggleButtonGroup
            value={filters.listingType}
            exclusive
            fullWidth
            onChange={handleListingTypeChange}
            sx={{ mb: 3 }}
          >
            <ToggleButton value="buy" sx={{ py: 1.2, fontWeight: 700 }}>
              <HomeIcon sx={{ fontSize: 18, mr: 1 }} />
              Buy Properties
            </ToggleButton>
            <ToggleButton value="rent" sx={{ py: 1.2, fontWeight: 700 }}>
              <KeyIcon sx={{ fontSize: 18, mr: 1 }} />
              Rent Properties
            </ToggleButton>
          </ToggleButtonGroup>

          {/* BHK Filter */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: '#334155' }}>
            Number of Bedrooms (BHK):
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            <Chip
              label="All BHK"
              clickable
              onClick={() => onFilterChange({ selectedBhks: [] })}
              sx={{
                fontWeight: 700,
                backgroundColor: filters.selectedBhks.length === 0 ? '#0F172A' : '#F1F5F9',
                color: filters.selectedBhks.length === 0 ? '#FFFFFF' : '#475569',
              }}
            />
            {BHK_OPTIONS.map((bhk) => {
              const isSelected = filters.selectedBhks.includes(bhk);
              return (
                <Chip
                  key={bhk}
                  label={`${bhk} BHK`}
                  clickable
                  onClick={() => handleBhkToggle(bhk)}
                  sx={{
                    fontWeight: 700,
                    backgroundColor: isSelected ? '#D97706' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#475569',
                  }}
                />
              );
            })}
          </Box>

          {/* Price Range Slider */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#334155' }}>
                Price Range
              </Typography>
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                {formatPrice(filters.minPrice, filters.listingType)} -{' '}
                {formatPrice(filters.maxPrice, filters.listingType)}
              </Typography>
            </Box>
            <Slider
              value={[filters.minPrice, filters.maxPrice]}
              min={minPossible}
              max={maxPossible}
              step={step}
              onChange={(_e, newValue) => {
                if (Array.isArray(newValue)) {
                  onFilterChange({ minPrice: newValue[0], maxPrice: newValue[1] });
                }
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(val) => formatPrice(val, filters.listingType)}
              sx={{ color: '#D97706' }}
            />
          </Box>

          {/* Property Type */}
          <FormControl fullWidth size="small" sx={{ mb: 3 }}>
            <InputLabel id="mobile-property-type">Property Type</InputLabel>
            <Select
              labelId="mobile-property-type"
              value={filters.propertyType}
              label="Property Type"
              onChange={(e) => onFilterChange({ propertyType: e.target.value })}
            >
              {PROPERTY_TYPES.map((type) => (
                <MenuItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Sort By */}
          <FormControl fullWidth size="small">
            <InputLabel id="mobile-sort-by">Sort Properties By</InputLabel>
            <Select
              labelId="mobile-sort-by"
              value={filters.sortBy}
              label="Sort Properties By"
              onChange={(e) =>
                onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })
              }
            >
              <MenuItem value="featured">Featured First</MenuItem>
              <MenuItem value="price-asc">Price: Low to High</MenuItem>
              <MenuItem value="price-desc">Price: High to Low</MenuItem>
              <MenuItem value="area-desc">Carpet Area: Largest</MenuItem>
              <MenuItem value="newest">Recently Added</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Drawer Actions */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            fullWidth
            startIcon={<RestartAltIcon />}
            onClick={() => {
              onResetFilters();
            }}
            sx={{ py: 1.2, borderRadius: 2.5 }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setOpen(false)}
            sx={{ py: 1.2, borderRadius: 2.5, fontWeight: 700 }}
          >
            Show {totalResults} Results
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
