'use client';

import * as React from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Property } from '@/types/property';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';

interface PropertyGridProps {
  properties: Property[];
  isLoading: boolean;
  onResetFilters: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  onItemsPerPageChange?: (items: number) => void;
}

export default function PropertyGrid({
  properties,
  isLoading,
  onResetFilters,
  favorites,
  onToggleFavorite,
  currentPage,
  onPageChange,
  itemsPerPage = 6,
  onItemsPerPageChange,
}: PropertyGridProps) {
  // Calculate pagination slices
  const totalCount = properties.length;
  const totalPages = Math.ceil(totalCount / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalCount);
  const currentProperties = properties.slice(startIndex, endIndex);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value);
    const target = document.getElementById('listings-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Skeleton count while loading
  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <PropertyCardSkeleton key={`skeleton-${index}`} />
        ))}
      </Box>
    );
  }

  // Empty state when no listings match the filters
  if (totalCount === 0) {
    return (
      <Paper
        elevation={0}
        sx={{
          p: { xs: 5, md: 8 },
          textAlign: 'center',
          borderRadius: 4,
          backgroundColor: '#FFFFFF',
          border: '1px dashed #CBD5E1',
          my: 4,
        }}
      >
        <Box
          sx={{
            width: 76,
            height: 76,
            borderRadius: '50%',
            backgroundColor: '#FEF3C7',
            color: '#D97706',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2.5,
          }}
        >
          <SearchOffIcon sx={{ fontSize: 38 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
          No Matching Properties Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 460, mx: 'auto', mb: 3 }}>
          We couldn&apos;t find any properties matching your current filter criteria. Try adjusting your BHK count, price bounds, or clearing the location search.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RestartAltIcon />}
          onClick={onResetFilters}
          sx={{
            px: 3.5,
            py: 1.2,
            borderRadius: 2.5,
            fontWeight: 700,
          }}
        >
          Reset All Filters
        </Button>
      </Paper>
    );
  }

  return (
    <Box id="listings-section">
      {/* Grid of Properties */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {currentProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={favorites.includes(property.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </Box>

      {/* Pagination & Range Display */}
      {totalPages > 1 && (
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            borderRadius: 3,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mt: 2,
          }}
        >
          {/* Status info */}
          <Typography variant="body2" sx={{ color: '#64748B', fontWeight: 600 }}>
            Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalCount}</strong>{' '}
            residences (Page {currentPage} of {totalPages})
          </Typography>

          {/* MUI Pagination Component */}
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            size="medium"
            showFirstButton
            showLastButton
            sx={{
              '& .MuiPaginationItem-root': {
                fontWeight: 700,
                borderRadius: 2,
                '&.Mui-selected': {
                  backgroundColor: '#0F172A',
                  color: '#FFFFFF',
                  boxShadow: '0 2px 8px rgba(15, 23, 42, 0.2)',
                },
              },
            }}
          />

          {/* Items per page selector */}
          {onItemsPerPageChange && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
                Per page:
              </Typography>
              <Select
                size="small"
                value={itemsPerPage}
                onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
                sx={{ borderRadius: 2, height: 34, fontSize: '0.8125rem' }}
              >
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={12}>12</MenuItem>
              </Select>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
}
