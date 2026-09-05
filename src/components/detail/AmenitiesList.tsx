'use client';

import * as React from 'react';
import { Box, Paper, Typography, Grid, Chip } from '@mui/material';
import PoolIcon from '@mui/icons-material/Pool';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SecurityIcon from '@mui/icons-material/Security';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import ParkIcon from '@mui/icons-material/Park';
import BoltIcon from '@mui/icons-material/Bolt';
import ElevatorsIcon from '@mui/icons-material/Elevator';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import EvStationIcon from '@mui/icons-material/EvStation';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

interface AmenitiesListProps {
  amenities: string[];
}

function getAmenityIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.includes('pool')) return <PoolIcon sx={{ color: '#0284C7' }} />;
  if (lower.includes('gym') || lower.includes('fitness'))
    return <FitnessCenterIcon sx={{ color: '#DC2626' }} />;
  if (lower.includes('security') || lower.includes('cctv'))
    return <SecurityIcon sx={{ color: '#059669' }} />;
  if (lower.includes('parking') || lower.includes('garage'))
    return <LocalParkingIcon sx={{ color: '#4F46E5' }} />;
  if (lower.includes('garden') || lower.includes('park') || lower.includes('lawn'))
    return <ParkIcon sx={{ color: '#16A34A' }} />;
  if (lower.includes('power') || lower.includes('solar'))
    return <BoltIcon sx={{ color: '#EAB308' }} />;
  if (lower.includes('elevator') || lower.includes('lift'))
    return <ElevatorsIcon sx={{ color: '#6366F1' }} />;
  if (lower.includes('clubhouse') || lower.includes('lounge'))
    return <MeetingRoomIcon sx={{ color: '#D97706' }} />;
  if (lower.includes('play') || lower.includes('kids'))
    return <ChildCareIcon sx={{ color: '#EC4899' }} />;
  if (lower.includes('ev') || lower.includes('charging'))
    return <EvStationIcon sx={{ color: '#10B981' }} />;
  return <CheckCircleOutlinedIcon sx={{ color: '#64748B' }} />;
}

export default function AmenitiesList({ amenities }: AmenitiesListProps) {
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
          mb: 1,
          fontSize: { xs: '1.05rem', sm: '1.25rem' },
        }}
      >
        Features & Amenities
      </Typography>
      <Typography variant="body2" sx={{ color: '#64748B', mb: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
        Designed to provide an elevated lifestyle of comfort, security, and recreation.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
          },
          gap: { xs: 1.25, sm: 2 },
          width: '100%',
        }}
      >
        {amenities.map((amenity, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.5 },
              p: { xs: 1.25, sm: 1.5 },
              borderRadius: 2.5,
              backgroundColor: '#F8FAFC',
              border: '1px solid #F1F5F9',
              minWidth: 0,
              overflow: 'hidden',
              boxSizing: 'border-box',
              transition: 'all 0.2s',
              '&:hover': {
                backgroundColor: '#FFFFFF',
                borderColor: '#CBD5E1',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              },
            }}
          >
            <Box
              sx={{
                width: { xs: 30, sm: 36 },
                height: { xs: 30, sm: 36 },
                borderRadius: 2,
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                flexShrink: 0,
                '& svg': {
                  fontSize: { xs: 17, sm: 20 },
                },
              }}
            >
              {getAmenityIcon(amenity)}
            </Box>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: '#1E293B',
                fontSize: { xs: '0.78rem', sm: '0.875rem' },
                lineHeight: 1.25,
                wordBreak: 'break-word',
                minWidth: 0,
              }}
            >
              {amenity}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
}
