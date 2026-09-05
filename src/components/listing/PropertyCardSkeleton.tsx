'use client';

import * as React from 'react';
import { Card, CardContent, Skeleton, Box, Stack } from '@mui/material';

export default function PropertyCardSkeleton() {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Image Skeleton */}
      <Skeleton variant="rectangular" height={220} animation="wave" />

      <CardContent sx={{ p: 2.5 }}>
        {/* Chips row */}
        <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
          <Skeleton variant="rounded" width={70} height={24} animation="wave" />
          <Skeleton variant="rounded" width={60} height={24} animation="wave" />
        </Stack>

        {/* Title */}
        <Skeleton variant="text" height={28} width="85%" animation="wave" sx={{ mb: 0.5 }} />

        {/* Location */}
        <Skeleton variant="text" height={20} width="60%" animation="wave" sx={{ mb: 2 }} />

        {/* Specs Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 1.5,
            backgroundColor: '#F8FAFC',
            borderRadius: 2,
            mb: 2.5,
          }}
        >
          <Skeleton variant="rounded" width={55} height={22} animation="wave" />
          <Skeleton variant="rounded" width={55} height={22} animation="wave" />
          <Skeleton variant="rounded" width={75} height={22} animation="wave" />
        </Box>

        {/* Price & Action Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Skeleton variant="text" width={40} height={14} animation="wave" />
            <Skeleton variant="text" width={90} height={28} animation="wave" />
          </Box>
          <Skeleton variant="rounded" width={100} height={36} animation="wave" />
        </Box>
      </CardContent>
    </Card>
  );
}
