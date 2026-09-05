'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { Property } from '@/types/property';
import PropertyCard from '@/components/listing/PropertyCard';

interface SimilarPropertiesProps {
  currentProperty: Property;
  allProperties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export default function SimilarProperties({
  currentProperty,
  allProperties,
  favorites,
  onToggleFavorite,
}: SimilarPropertiesProps) {
  // Find properties of same type or same BHK, excluding the current one
  const similar = allProperties
    .filter(
      (p) =>
        p.id !== currentProperty.id &&
        (p.type === currentProperty.type || p.bhk === currentProperty.bhk)
    )
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 0.5 }}>
          Similar Exclusive Listings
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748B' }}>
          Explore comparable {currentProperty.bhk} BHK residences in premier neighborhoods.
        </Typography>
      </Box>

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
        {similar.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isFavorite={favorites.includes(property.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </Box>
    </Box>
  );
}
