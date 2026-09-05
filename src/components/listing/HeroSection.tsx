'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  InputBase,
  IconButton,
  Chip,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ClearIcon from '@mui/icons-material/Clear';
import VerifiedIcon from '@mui/icons-material/Verified';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import SecurityIcon from '@mui/icons-material/Security';
import StarIcon from '@mui/icons-material/Star';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  isSearching?: boolean;
}

const POPULAR_LOCATIONS = [
  'Bandra West',
  'Worli',
  'Indiranagar',
  'DLF Phase 5',
  'Whitefield',
  'Powai',
  'Juhu',
];

export default function HeroSection({
  searchQuery,
  onSearchChange,
  isSearching = false,
}: HeroSectionProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        background: 'linear-gradient(135deg, #090E17 0%, #0F172A 50%, #1E293B 100%)',
        color: '#FFFFFF',
        pt: { xs: 7, md: 10 },
        pb: { xs: 8, md: 11 },
        overflow: 'hidden',
      }}
    >
      {/* Decorative ambient lighting glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(217, 119, 6, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          {/* Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 2,
              py: 0.75,
              borderRadius: 50,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              mb: 2.5,
            }}
          >
            <AutoAwesomeIcon sx={{ color: '#F59E0B', fontSize: 16 }} />
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#F1F5F9',
              }}
            >
              Curated Architectural Residences
            </Typography>
          </Box>

          {/* Main Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.1rem', sm: '2.8rem', md: '3.6rem' },
              fontWeight: 800,
              lineHeight: 1.15,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              mb: 2,
              maxWidth: 900,
              mx: 'auto',
            }}
          >
            Discover Extraordinary Living in Premier Locations
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="body1"
            sx={{
              color: '#94A3B8',
              fontSize: { xs: '1rem', md: '1.15rem' },
              maxWidth: 680,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Explore verified penthouses, luxury apartments, and boutique garden villas. Filter by BHK, Buy/Rent status, and location in real-time.
          </Typography>
        </Box>

        {/* Debounced Search Bar */}
        <Paper
          elevation={4}
          sx={{
            p: { xs: '6px 12px', md: '8px 18px' },
            display: 'flex',
            alignItems: 'center',
            maxWidth: 780,
            mx: 'auto',
            borderRadius: '16px',
            backgroundColor: '#FFFFFF',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)',
          }}
        >
          <LocationOnIcon sx={{ color: '#D97706', mr: 1.5, fontSize: { xs: 24, md: 28 } }} />
          <InputBase
            id="property-location-search"
            sx={{
              flex: 1,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
              color: '#0F172A',
              fontWeight: 500,
              '& input::placeholder': {
                color: '#94A3B8',
                opacity: 1,
              },
            }}
            placeholder="Search by city, locality, or address (e.g. Bandra, Worli, Whitefield)..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            inputProps={{ 'aria-label': 'Search properties by location' }}
          />

          {isSearching && (
            <CircularProgress size={20} sx={{ color: '#D97706', mr: 1 }} />
          )}

          {searchQuery && (
            <IconButton
              size="small"
              onClick={() => onSearchChange('')}
              aria-label="Clear location search"
              sx={{ p: 0.8, color: '#64748B', '&:hover': { color: '#0F172A' } }}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          )}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '12px',
              px: { xs: 2, md: 3 },
              py: 1.2,
              ml: 1,
              fontWeight: 600,
              fontSize: { xs: '0.85rem', md: '0.95rem' },
              gap: 0.8,
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'all 0.2s',
              '&:hover': { backgroundColor: '#1E293B' },
            }}
          >
            <SearchIcon sx={{ fontSize: 20 }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              Search
            </Box>
          </Box>
        </Paper>

        {/* Quick Popular Locations Chips */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 1,
            mt: 2.5,
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#94A3B8',
              fontWeight: 600,
              mr: 0.5,
              display: { xs: 'none', sm: 'inline' },
            }}
          >
            Trending:
          </Typography>
          {POPULAR_LOCATIONS.map((loc) => {
            const isSelected = searchQuery.toLowerCase() === loc.toLowerCase();
            return (
              <Chip
                key={loc}
                label={loc}
                size="small"
                onClick={() => onSearchChange(isSelected ? '' : loc)}
                sx={{
                  backgroundColor: isSelected ? '#D97706' : 'rgba(255, 255, 255, 0.08)',
                  color: isSelected ? '#FFFFFF' : '#CBD5E1',
                  border: isSelected
                    ? '1px solid #D97706'
                    : '1px solid rgba(255, 255, 255, 0.12)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    backgroundColor: isSelected ? '#B45309' : 'rgba(255, 255, 255, 0.16)',
                    color: '#FFFFFF',
                  },
                }}
              />
            );
          })}
        </Box>

        {/* Trust Metric Counters */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
            gap: 2,
            mt: { xs: 4, md: 5 },
            pt: 3,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: 850,
            mx: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <VerifiedIcon sx={{ color: '#10B981', fontSize: 20 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                100%
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Verified Listings
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <SecurityIcon sx={{ color: '#38BDF8', fontSize: 20 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                ₹0 Brokerage
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Direct Owner / Prime
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <StarIcon sx={{ color: '#F59E0B', fontSize: 20 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                4.9 / 5.0
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Client Trust Score
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <AutoAwesomeIcon sx={{ color: '#A855F7', fontSize: 20 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', lineHeight: 1.1 }}>
                Fast Virtual Tours
              </Typography>
              <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                Instant Scheduling
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
