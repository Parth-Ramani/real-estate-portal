'use client';

import * as React from 'react';
import { Box, CardMedia, Chip, IconButton } from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

interface PropertyGalleryProps {
  images: string[];
  title: string;
  isVerified: boolean;
  listingType: 'buy' | 'rent';
}

export default function PropertyGallery({
  images,
  title,
  isVerified,
  listingType,
}: PropertyGalleryProps) {
  const [activeImage, setActiveImage] = React.useState(images[0] || '');

  return (
    <Box sx={{ mb: 4 }}>
      {/* Main Feature Image */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: 240, sm: 360, md: 480 },
          borderRadius: 4,
          overflow: 'hidden',
          backgroundColor: '#0F172A',
          boxShadow: '0 10px 30px rgba(15, 23, 42, 0.15)',
          mb: 2,
        }}
      >
        <CardMedia
          component="img"
          image={activeImage}
          alt={title}
          onError={() =>
            setActiveImage(
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
            )
          }
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'all 0.3s ease',
          }}
        />

        {/* Status badges */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 12, sm: 16 },
            left: { xs: 12, sm: 16 },
            display: 'flex',
            flexWrap: 'wrap',
            gap: 0.75,
            zIndex: 2,
            maxWidth: 'calc(100% - 24px)',
          }}
        >
          <Chip
            label={listingType === 'buy' ? 'FOR SALE' : 'FOR RENT'}
            size="small"
            sx={{
              fontWeight: 800,
              backgroundColor: listingType === 'buy' ? '#0F172A' : '#D97706',
              color: '#FFFFFF',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              fontSize: { xs: '0.7rem', sm: '0.75rem' },
            }}
          />
          {isVerified && (
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: '15px !important', color: '#10B981 !important' }} />}
              label="VERIFIED RESIDENCE"
              size="small"
              sx={{
                fontWeight: 800,
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#0F172A',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                fontSize: { xs: '0.7rem', sm: '0.75rem' },
              }}
            />
          )}
        </Box>

        {/* Photo count indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 12, sm: 16 },
            right: { xs: 12, sm: 16 },
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            color: '#FFFFFF',
            px: { xs: 1.5, sm: 2 },
            py: { xs: 0.5, sm: 0.7 },
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            fontSize: { xs: '0.75rem', sm: '0.8125rem' },
            fontWeight: 700,
            backdropFilter: 'blur(6px)',
          }}
        >
          <PhotoCameraIcon sx={{ fontSize: 16 }} />
          {images.length} Photos
        </Box>
      </Box>

      {/* Thumbnail Bar */}
      {images.length > 1 && (
        <Box
          sx={{
            display: 'flex',
            gap: 1.5,
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: '#CBD5E1', borderRadius: 3 },
          }}
        >
          {images.map((img, index) => {
            const isSelected = activeImage === img;
            return (
              <Box
                key={index}
                onClick={() => setActiveImage(img)}
                sx={{
                  width: { xs: 80, sm: 110 },
                  height: { xs: 60, sm: 80 },
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  flexShrink: 0,
                  cursor: 'pointer',
                  border: isSelected ? '3px solid #D97706' : '2px solid transparent',
                  opacity: isSelected ? 1 : 0.7,
                  transition: 'all 0.2s',
                  '&:hover': { opacity: 1, transform: 'scale(1.03)' },
                }}
              >
                <CardMedia
                  component="img"
                  image={img}
                  alt={`Thumbnail ${index + 1}`}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
}
