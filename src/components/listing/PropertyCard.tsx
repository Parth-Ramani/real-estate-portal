'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Divider,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootOutlinedIcon from '@mui/icons-material/SquareFootOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Property } from '@/types/property';
import { formatPrice, formatArea, formatPricePerSqFt } from '@/utils/formatters';

interface PropertyCardProps {
  property: Property;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export default function PropertyCard({
  property,
  isFavorite = false,
  onToggleFavorite,
}: PropertyCardProps) {
  const [imgSrc, setImgSrc] = React.useState(property.featuredImage);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(property.id);
    }
  };

  return (
    <Card
      component={Link}
      href={`/properties/${property.id}`}
      id={`property-card-${property.id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 20px 30px -10px rgba(15, 23, 42, 0.12), 0 8px 10px -5px rgba(15, 23, 42, 0.04)',
          borderColor: '#CBD5E1',
          '& .card-image': {
            transform: 'scale(1.05)',
          },
          '& .view-btn': {
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
          },
        },
      }}
    >
      {/* Media Box with Overlay Badges */}
      <Box sx={{ position: 'relative', overflow: 'hidden', height: 230, backgroundColor: '#0F172A' }}>
        <CardMedia
          component="img"
          image={imgSrc}
          alt={property.title}
          onError={() =>
            setImgSrc(
              'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
            )
          }
          className="card-image"
          sx={{
            height: '100%',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
        />

        {/* Gradient overlay on image bottom */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.6) 0%, rgba(15, 23, 42, 0) 40%)',
          }}
        />

        {/* Top Badges: Purpose (Buy/Rent) & Verified */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
          }}
        >
          <Chip
            label={property.type === 'buy' ? 'FOR SALE' : 'FOR RENT'}
            size="small"
            sx={{
              fontWeight: 800,
              fontSize: '0.6875rem',
              letterSpacing: '0.05em',
              backgroundColor: property.type === 'buy' ? '#0F172A' : '#D97706',
              color: '#FFFFFF',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          />
          {property.isVerified && (
            <Chip
              icon={<VerifiedIcon sx={{ fontSize: '14px !important', color: '#10B981 !important' }} />}
              label="VERIFIED"
              size="small"
              sx={{
                fontWeight: 800,
                fontSize: '0.6875rem',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#0F172A',
                backdropFilter: 'blur(4px)',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            />
          )}
        </Box>

        {/* Favorite Heart Button */}
        <Tooltip title={isFavorite ? 'Remove from saved' : 'Save property'}>
          <IconButton
            onClick={handleFavoriteClick}
            aria-label="Save property"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(4px)',
              p: 0.9,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              transition: 'transform 0.15s ease, background-color 0.15s ease',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                transform: 'scale(1.1)',
              },
            }}
          >
            {isFavorite ? (
              <FavoriteIcon sx={{ color: '#EF4444', fontSize: 20 }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: '#475569', fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>

        {/* Property Type Badge in bottom corner */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 12,
            left: 12,
          }}
        >
          <Chip
            label={property.propertyType}
            size="small"
            sx={{
              fontWeight: 700,
              fontSize: '0.75rem',
              backgroundColor: 'rgba(15, 23, 42, 0.85)',
              color: '#F8FAFC',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          />
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            lineHeight: 1.35,
            color: '#0F172A',
            mb: 0.8,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {property.title}
        </Typography>

        {/* Location with Pin */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mb: 2 }}>
          <LocationOnOutlinedIcon sx={{ color: '#D97706', fontSize: 17, flexShrink: 0 }} />
          <Typography
            variant="body2"
            sx={{
              color: '#64748B',
              fontSize: '0.85rem',
              fontWeight: 500,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {property.location.locality}, {property.location.city}
          </Typography>
        </Box>

        {/* Specs Grid: BHK, Bathrooms, Carpet Area */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1.25,
            backgroundColor: '#F8FAFC',
            borderRadius: 2.5,
            border: '1px solid #F1F5F9',
            mb: 2.5,
          }}
        >
          {/* BHK */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <BedOutlinedIcon sx={{ color: '#475569', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.825rem' }}>
              {property.bhk} BHK
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ borderColor: '#E2E8F0' }} />

          {/* Bathrooms */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <BathtubOutlinedIcon sx={{ color: '#475569', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.825rem' }}>
              {property.bathrooms} Baths
            </Typography>
          </Box>

          <Divider orientation="vertical" flexItem sx={{ borderColor: '#E2E8F0' }} />

          {/* Carpet Area */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <SquareFootOutlinedIcon sx={{ color: '#475569', fontSize: 18 }} />
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B', fontSize: '0.825rem' }}>
              {formatArea(property.carpetAreaSqFt)}
            </Typography>
          </Box>
        </Box>

        {/* Footer: Price & View Details Action */}
        <Box
          sx={{
            mt: 'auto',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            pt: 1.5,
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <Box>
            <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, display: 'block' }}>
              {property.type === 'buy' ? 'Total Price' : 'Monthly Rent'}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#0F172A',
                lineHeight: 1.1,
                fontSize: '1.25rem',
              }}
            >
              {formatPrice(property.price, property.type)}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', fontSize: '0.72rem' }}>
              {formatPricePerSqFt(property.price, property.areaSqFt, property.type)}
            </Typography>
          </Box>

          {/* View Details Button */}
          <Button
            size="small"
            className="view-btn"
            endIcon={<ArrowForwardIcon sx={{ fontSize: '16px !important' }} />}
            sx={{
              backgroundColor: '#F1F5F9',
              color: '#0F172A',
              fontWeight: 700,
              fontSize: '0.8125rem',
              px: 1.8,
              py: 0.8,
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
              },
            }}
          >
            View
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
