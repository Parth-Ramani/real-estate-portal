'use client';

import * as React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BalconyIcon from '@mui/icons-material/Balcony';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import ChairIcon from '@mui/icons-material/Chair';
import CompassCalibrationIcon from '@mui/icons-material/Explore';
import LayersIcon from '@mui/icons-material/Layers';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Property } from '@/types/property';
import { formatArea } from '@/utils/formatters';

interface PropertyOverviewProps {
  property: Property;
}

export default function PropertyOverview({ property }: PropertyOverviewProps) {
  const specs = [
    {
      icon: <BedIcon sx={{ color: '#D97706' }} />,
      label: 'Bedrooms (BHK)',
      value: `${property.bhk} BHK`,
    },
    {
      icon: <BathtubIcon sx={{ color: '#D97706' }} />,
      label: 'Bathrooms',
      value: `${property.bathrooms} Baths`,
    },
    {
      icon: <BalconyIcon sx={{ color: '#D97706' }} />,
      label: 'Balconies',
      value: `${property.balconies} Balconies`,
    },
    {
      icon: <SquareFootIcon sx={{ color: '#D97706' }} />,
      label: 'Carpet Area',
      value: formatArea(property.carpetAreaSqFt),
    },
    {
      icon: <SquareFootIcon sx={{ color: '#D97706' }} />,
      label: 'Super Area',
      value: formatArea(property.areaSqFt),
    },
    {
      icon: <ChairIcon sx={{ color: '#D97706' }} />,
      label: 'Furnishing',
      value: property.furnishingStatus,
    },
    {
      icon: <CompassCalibrationIcon sx={{ color: '#D97706' }} />,
      label: 'Facing',
      value: property.facing,
    },
    {
      icon: <LayersIcon sx={{ color: '#D97706' }} />,
      label: 'Floor',
      value: `${property.floorNumber} of ${property.totalFloors}`,
    },
    {
      icon: <EventAvailableIcon sx={{ color: '#D97706' }} />,
      label: 'Possession',
      value: property.possessionStatus,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2, sm: 2.5, md: 3.5 },
        borderRadius: 4,
        border: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        mb: 4,
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          color: '#0F172A',
          mb: { xs: 2, sm: 3 },
          fontSize: { xs: '1.05rem', sm: '1.25rem' },
        }}
      >
        Property Overview & Specifications
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 1.25, sm: 2 },
          width: '100%',
        }}
      >
        {specs.map((item, index) => (
          <Box
            key={index}
            sx={{
              p: { xs: 1.5, sm: 2 },
              borderRadius: 3,
              backgroundColor: '#F8FAFC',
              border: '1px solid #F1F5F9',
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 1, sm: 1.5 },
              minWidth: 0,
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            <Box
              sx={{
                width: { xs: 32, sm: 38 },
                height: { xs: 32, sm: 38 },
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                flexShrink: 0,
                '& svg': {
                  fontSize: { xs: 18, sm: 20 },
                },
              }}
            >
              {item.icon}
            </Box>
            <Box sx={{ minWidth: 0, width: '100%', overflow: 'hidden' }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#64748B',
                  fontWeight: 600,
                  fontSize: { xs: '0.7rem', sm: '0.75rem' },
                  display: 'block',
                  lineHeight: 1.2,
                  mb: 0.25,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 700,
                  color: '#0F172A',
                  fontSize: { xs: '0.825rem', sm: '0.9rem' },
                  lineHeight: 1.25,
                  wordBreak: 'break-word',
                }}
              >
                {item.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
