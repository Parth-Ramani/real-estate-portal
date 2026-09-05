'use client';

import * as React from 'react';
import { Box, Chip, Typography, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FilterState } from '@/types/property';
import { formatPrice } from '@/utils/formatters';

interface ActiveFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export default function ActiveFilters({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}: ActiveFiltersProps) {
  const isRent = filters.listingType === 'rent';
  const minPossible = isRent ? 15000 : 10000000;
  const maxPossible = isRent ? 300000 : 150000000;

  const hasSearch = filters.searchQuery.trim().length > 0;
  const hasBhks = filters.selectedBhks.length > 0;
  const hasType = filters.propertyType !== 'all';
  const hasPrice = filters.minPrice > minPossible || filters.maxPrice < maxPossible;

  const hasAnyFilter = hasSearch || hasBhks || hasType || hasPrice;

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 1.5,
        mb: 3,
      }}
    >
      {/* Results Count */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '1.125rem' }}>
          {totalResults} {totalResults === 1 ? 'Property' : 'Properties'} Available
        </Typography>
        <Chip
          label={`For ${filters.listingType === 'buy' ? 'Sale' : 'Rent'}`}
          size="small"
          sx={{
            fontWeight: 700,
            fontSize: '0.75rem',
            backgroundColor: filters.listingType === 'buy' ? '#E0F2FE' : '#FEF3C7',
            color: filters.listingType === 'buy' ? '#0369A1' : '#B45309',
          }}
        />
      </Box>

      {/* Active Filter Chips */}
      {hasAnyFilter && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1 }}>
          <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
            Active Filters:
          </Typography>

          {/* Search chip */}
          {hasSearch && (
            <Chip
              label={`Location: "${filters.searchQuery}"`}
              size="small"
              onDelete={() => onFilterChange({ searchQuery: '' })}
              sx={{ backgroundColor: '#EFF6FF', color: '#1D4ED8', fontWeight: 600 }}
            />
          )}

          {/* BHK chips */}
          {filters.selectedBhks.map((bhk) => (
            <Chip
              key={bhk}
              label={`${bhk} BHK`}
              size="small"
              onDelete={() =>
                onFilterChange({
                  selectedBhks: filters.selectedBhks.filter((b) => b !== bhk),
                })
              }
              sx={{ backgroundColor: '#FEF3C7', color: '#B45309', fontWeight: 600 }}
            />
          ))}

          {/* Property Type chip */}
          {hasType && (
            <Chip
              label={filters.propertyType}
              size="small"
              onDelete={() => onFilterChange({ propertyType: 'all' })}
              sx={{ backgroundColor: '#F3E8FF', color: '#7E22CE', fontWeight: 600 }}
            />
          )}

          {/* Price chip */}
          {hasPrice && (
            <Chip
              label={`${formatPrice(filters.minPrice, filters.listingType)} - ${formatPrice(
                filters.maxPrice,
                filters.listingType
              )}`}
              size="small"
              onDelete={() => onFilterChange({ minPrice: minPossible, maxPrice: maxPossible })}
              sx={{ backgroundColor: '#ECFDF5', color: '#047857', fontWeight: 600 }}
            />
          )}

          {/* Clear All CTA */}
          <Button
            size="small"
            onClick={onResetFilters}
            sx={{
              fontSize: '0.75rem',
              color: '#EF4444',
              p: 0,
              minWidth: 'auto',
              fontWeight: 600,
              '&:hover': { background: 'none', textDecoration: 'underline' },
            }}
          >
            Clear All
          </Button>
        </Box>
      )}
    </Box>
  );
}
