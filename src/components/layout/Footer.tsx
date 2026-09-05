'use client';

import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  TextField,
  Button,
  CircularProgress,
} from '@mui/material';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useRouter, usePathname } from 'next/navigation';
import PolicyModal, { PolicyType } from '@/components/common/PolicyModal';

interface FooterProps {
  onLocationSelect?: (location: string) => void;
  onSubscribeSuccess?: (email: string) => void;
}

export default function Footer({ onLocationSelect, onSubscribeSuccess }: FooterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [isSubscribing, setIsSubscribing] = React.useState(false);
  const [subscribed, setSubscribed] = React.useState(false);
  const [policyType, setPolicyType] = React.useState<PolicyType>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    setEmailError('');
    setIsSubscribing(true);

    setTimeout(() => {
      setIsSubscribing(false);
      setSubscribed(true);
      if (onSubscribeSuccess) {
        onSubscribeSuccess(email.trim());
      }
      setEmail('');
    }, 600);
  };

  const handleLocationClick = (loc: string) => {
    if (pathname === '/') {
      if (onLocationSelect) {
        onLocationSelect(loc);
      }
      // Smooth scroll to listings grid
      const target = document.getElementById('listings-section') || document.getElementById('property-location-search');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(`/?search=${encodeURIComponent(loc)}`);
    }
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          backgroundColor: '#0F172A',
          color: '#F8FAFC',
          pt: 8,
          pb: 4,
          mt: 'auto',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: '1.5fr 1fr 1.2fr 1.3fr',
              },
              gap: 5,
            }}
          >
            {/* Brand Column */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#D97706',
                  }}
                >
                  <HomeWorkIcon sx={{ fontSize: 26 }} />
                </Box>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                  HAVEN REALTY
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#94A3B8', mb: 3, maxWidth: 360, lineHeight: 1.7 }}>
                India&apos;s foremost destination for curated luxury residences, penthouses, and modern architectural villas. Verified properties, zero brokerage listings, and personalized concierge advisory.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  size="small"
                  aria-label="Instagram"
                  sx={{ color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)', '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}
                >
                  <InstagramIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="Twitter"
                  sx={{ color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)', '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}
                >
                  <TwitterIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="LinkedIn"
                  sx={{ color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)', '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}
                >
                  <LinkedInIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="YouTube"
                  sx={{ color: '#94A3B8', backgroundColor: 'rgba(255, 255, 255, 0.05)', '&:hover': { color: '#FFFFFF', backgroundColor: 'rgba(255, 255, 255, 0.15)' } }}
                >
                  <YouTubeIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Popular Cities */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Top Cities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {['Mumbai', 'Bengaluru', 'Gurugram', 'Hyderabad', 'Pune', 'New Delhi'].map((city) => (
                  <Typography
                    key={city}
                    variant="body2"
                    onClick={() => handleLocationClick(city)}
                    sx={{
                      color: '#94A3B8',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                      '&:hover': { color: '#F59E0B', transform: 'translateX(4px)' },
                    }}
                  >
                    Properties in {city}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Popular Localities */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Trending Localities
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { name: 'Bandra West', city: 'Mumbai' },
                  { name: 'Worli', city: 'Mumbai' },
                  { name: 'Indiranagar', city: 'Bengaluru' },
                  { name: 'DLF Phase 5', city: 'Gurugram' },
                  { name: 'Jubilee Hills', city: 'Hyderabad' },
                  { name: 'Koregaon Park', city: 'Pune' },
                ].map((item) => (
                  <Typography
                    key={item.name}
                    variant="body2"
                    onClick={() => handleLocationClick(item.name)}
                    sx={{
                      color: '#94A3B8',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'inline-block',
                      '&:hover': { color: '#F59E0B', transform: 'translateX(4px)' },
                    }}
                  >
                    {item.name}, {item.city}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Trust Guarantee & Interactive Newsletter */}
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', mb: 2.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Verified Guarantee
              </Typography>
              <Box
                sx={{
                  mb: 2.5,
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.8 }}>
                  <VerifiedIcon sx={{ color: '#10B981', fontSize: 18 }} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                    100% Verified Titles & RERA
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', lineHeight: 1.5 }}>
                  Every residence undergoes rigorous on-ground physical inspection and legal clearance.
                </Typography>
              </Box>

              <Typography variant="caption" sx={{ color: '#94A3B8', display: 'block', mb: 1 }}>
                Subscribe for private off-market listings:
              </Typography>

              {subscribed ? (
                <Box sx={{ p: 1.5, borderRadius: 2, backgroundColor: '#064E3B', color: '#34D399', fontSize: '0.8125rem', fontWeight: 600 }}>
                  ✓ You&apos;re subscribed to VIP drops!
                </Box>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      size="small"
                      placeholder="Enter your email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      error={Boolean(emailError)}
                      helperText={emailError}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 1,
                        input: { color: '#FFFFFF', fontSize: '0.8125rem' },
                        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                        '& .MuiFormHelperText-root': { color: '#F87171' },
                      }}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={isSubscribing}
                      sx={{ px: 2, minWidth: 'auto', fontSize: '0.8125rem', fontWeight: 700 }}
                    >
                      {isSubscribing ? <CircularProgress size={18} sx={{ color: '#FFFFFF' }} /> : 'Join'}
                    </Button>
                  </Box>
                </form>
              )}
            </Box>
          </Box>

          <Divider sx={{ my: 5, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

          {/* Bottom copyright row with functioning Policy Links */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Typography variant="caption" sx={{ color: '#64748B' }}>
              © {new Date().getFullYear()} HAVEN Luxury Real Estate Portal. All rights reserved.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3 }}>
              <Typography
                variant="caption"
                onClick={() => setPolicyType('privacy')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  '&:hover': { color: '#F59E0B', textDecoration: 'underline' },
                }}
              >
                Privacy Policy
              </Typography>
              <Typography
                variant="caption"
                onClick={() => setPolicyType('terms')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  '&:hover': { color: '#F59E0B', textDecoration: 'underline' },
                }}
              >
                Terms of Service
              </Typography>
              <Typography
                variant="caption"
                onClick={() => setPolicyType('rera')}
                sx={{
                  color: '#94A3B8',
                  cursor: 'pointer',
                  '&:hover': { color: '#F59E0B', textDecoration: 'underline' },
                }}
              >
                RERA Disclaimer
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Policy Modal Dialog */}
      <PolicyModal type={policyType} onClose={() => setPolicyType(null)} />
    </>
  );
}
