'use client';

import * as React from 'react';
import {
  Box,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Slider,
  Button,
  Divider,
  Stack,
  Tooltip,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SortIcon from '@mui/icons-material/Sort';
import HomeIcon from '@mui/icons-material/Home';
import KeyIcon from '@mui/icons-material/Key';
import { FilterState, ListingType } from '@/types/property';
import { formatPrice } from '@/utils/formatters';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

const BHK_OPTIONS = [1, 2, 3, 4, 5];
const PROPERTY_TYPES = ['all', 'Apartment', 'Villa', 'Penthouse', 'Studio', 'Duplex', 'Townhouse'];

export default function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}: FilterBarProps) {
  // Dynamic price bounds based on Buy vs Rent
  const isRent = filters.listingType === 'rent';
  const minPossible = isRent ? 15000 : 10000000;
  const maxPossible = isRent ? 300000 : 150000000;
  const step = isRent ? 5000 : 2500000;

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
      // Reset price ranges to match appropriate scale
      const newMin = newType === 'rent' ? 15000 : 10000000;
      const newMax = newType === 'rent' ? 300000 : 150000000;
      onFilterChange({
        listingType: newType,
        minPrice: newMin,
        maxPrice: newMax,
      });
    }
  };

  const hasActiveFilters =
    filters.searchQuery !== '' ||
    filters.selectedBhks.length > 0 ||
    filters.propertyType !== 'all' ||
    filters.minPrice > minPossible ||
    filters.maxPrice < maxPossible;

  return (
    <Paper
      elevation={2}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 4,
        backgroundColor: '#FFFFFF',
        border: '1px solid #E2E8F0',
        mb: 3,
      }}
    >
      {/* Top Filter Controls: Buy/Rent Toggle + BHK Filters */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'stretch', lg: 'center' },
          gap: 2.5,
          pb: 2.5,
          borderBottom: '1px solid #F1F5F9',
        }}
      >
        {/* Buy / Rent Segmented Toggle */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569', minWidth: 60 }}>
            Purpose:
          </Typography>
          <ToggleButtonGroup
            value={filters.listingType}
            exclusive
            onChange={handleListingTypeChange}
            aria-label="Listing Type"
            sx={{
              backgroundColor: '#F1F5F9',
              p: 0.5,
              borderRadius: 3,
              '& .MuiToggleButton-root': {
                border: 'none',
                borderRadius: 2.5,
                px: 2.5,
                py: 0.8,
                fontWeight: 700,
                fontSize: '0.875rem',
                color: '#64748B',
                '&.Mui-selected': {
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)',
                  '&:hover': {
                    backgroundColor: '#1E293B',
                  },
                },
              },
            }}
          >
            <ToggleButton value="buy" aria-label="Buy property">
              <HomeIcon sx={{ fontSize: 18, mr: 0.8 }} />
              Buy
            </ToggleButton>
            <ToggleButton value="rent" aria-label="Rent property">
              <KeyIcon sx={{ fontSize: 18, mr: 0.8 }} />
              Rent
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* BHK Filter Chips */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
          <Typography variant="body2" sx={{ fontWeight: 700, color: '#475569' }}>
            Bedrooms (BHK):
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip
              label="All BHK"
              clickable
              onClick={() => onFilterChange({ selectedBhks: [] })}
              sx={{
                fontWeight: 700,
                fontSize: '0.8125rem',
                backgroundColor: filters.selectedBhks.length === 0 ? '#0F172A' : '#F1F5F9',
                color: filters.selectedBhks.length === 0 ? '#FFFFFF' : '#475569',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: filters.selectedBhks.length === 0 ? '#1E293B' : '#E2E8F0',
                },
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
                    fontSize: '0.8125rem',
                    backgroundColor: isSelected ? '#D97706' : '#F1F5F9',
                    color: isSelected ? '#FFFFFF' : '#475569',
                    borderRadius: 2,
                    '&:hover': {
                      backgroundColor: isSelected ? '#B45309' : '#E2E8F0',
                    },
                  }}
                />
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Secondary Controls: Property Type, Price Range, and Sort */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            lg: '1.2fr 2fr 1.2fr auto',
          },
          alignItems: 'center',
          gap: 3,
          pt: 2.5,
        }}
      >
        {/* Property Type Dropdown */}
        <FormControl size="small" fullWidth>
          <InputLabel id="property-type-label">Property Type</InputLabel>
          <Select
            labelId="property-type-label"
            id="property-type-select"
            value={filters.propertyType}
            label="Property Type"
            onChange={(e) => onFilterChange({ propertyType: e.target.value })}
            sx={{ borderRadius: 2 }}
          >
            {PROPERTY_TYPES.map((type) => (
              <MenuItem key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Price Range Slider */}
        <Box sx={{ px: { xs: 1, md: 1.5 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Price Range
            </Typography>
            <Typography variant="caption" sx={{ color: '#0F172A', fontWeight: 700 }}>
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
            sx={{
              color: '#D97706',
              height: 6,
              '& .MuiSlider-thumb': {
                width: 18,
                height: 18,
                backgroundColor: '#FFFFFF',
                border: '2px solid #D97706',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(217, 119, 6, 0.16)',
                },
              },
            }}
          />
        </Box>

        {/* Sort By Dropdown */}
        <FormControl size="small" fullWidth>
          <InputLabel id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            value={filters.sortBy}
            label="Sort By"
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            startAdornment={<SortIcon sx={{ color: '#64748B', mr: 1, fontSize: 20 }} />}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="featured">Featured First</MenuItem>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
            <MenuItem value="area-desc">Carpet Area: Largest</MenuItem>
            <MenuItem value="newest">Recently Added</MenuItem>
          </Select>
        </FormControl>

        {/* Reset Filters CTA */}
        {hasActiveFilters && (
          <Button
            variant="outlined"
            color="inherit"
            size="small"
            startIcon={<RestartAltIcon />}
            onClick={onResetFilters}
            sx={{
              borderRadius: 2,
              borderColor: '#CBD5E1',
              color: '#64748B',
              height: 40,
              whiteSpace: 'nowrap',
              '&:hover': {
                borderColor: '#0F172A',
                color: '#0F172A',
                backgroundColor: '#F8FAFC',
              },
            }}
          >
            Reset
          </Button>
        )}
      </Box>
    </Paper>
  );
}
