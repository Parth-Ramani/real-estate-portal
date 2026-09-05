'use client';

import * as React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Button,
  Chip,
  Paper,
  Avatar,
  Rating,
  IconButton,
  Tooltip,
  Divider,
  Breadcrumbs,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShieldIcon from '@mui/icons-material/Shield';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PropertyGallery from '@/components/detail/PropertyGallery';
import PropertyOverview from '@/components/detail/PropertyOverview';
import AmenitiesList from '@/components/detail/AmenitiesList';
import EmiCalculator from '@/components/detail/EmiCalculator';
import ContactAgentModal from '@/components/detail/ContactAgentModal';
import SimilarProperties from '@/components/detail/SimilarProperties';
import ToastNotification from '@/components/common/ToastNotification';
import { useFavorites } from '@/hooks/useFavorites';
import { Property } from '@/types/property';
import rawPropertiesData from '@/data/properties.json';
import { formatPrice, formatPricePerSqFt } from '@/utils/formatters';

const allProperties = rawPropertiesData as Property[];

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [property, setProperty] = React.useState<Property | null>(() => {
    return allProperties.find((p) => p.id === id) || null;
  });

  React.useEffect(() => {
    const staticFound = allProperties.find((p) => p.id === id);
    if (staticFound) {
      setProperty(staticFound);
      return;
    }
    // Check localStorage for custom user-submitted listings
    try {
      const stored = localStorage.getItem('haven_custom_properties');
      if (stored) {
        const customProps: Property[] = JSON.parse(stored);
        const customFound = customProps.find((p) => p.id === id);
        if (customFound) {
          setProperty(customFound);
          return;
        }
      }
    } catch (e) {
      console.error('Error finding custom property:', e);
    }
    setProperty(null);
  }, [id]);

  const { favorites, toggleFavorite, favoriteCount } = useFavorites();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [toast, setToast] = React.useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  if (!property) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar
          favoriteCount={favoriteCount}
          activeTab="none"
          onTabSelect={(tab) => router.push(`/?tab=${tab}`)}
          onFavoriteClick={() => router.push('/?filter=favorites')}
          onOpenListProperty={() => router.push('/?action=list')}
        />
        <Container maxWidth="md" sx={{ py: 12, textAlign: 'center', flexGrow: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#0F172A' }}>
            Property Listing Not Found
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748B', mb: 4 }}>
            The residence you are looking for might have been sold, unlisted, or does not exist.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            color="primary"
            startIcon={<ArrowBackIcon />}
            sx={{ px: 3, py: 1.2, borderRadius: 2 }}
          >
            Back to All Properties
          </Button>
        </Container>
        <Footer onLocationSelect={(loc) => router.push(`/?search=${encodeURIComponent(loc)}`)} />
      </Box>
    );
  }

  const isFav = favorites.includes(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setToast({
        open: true,
        message: 'Property link copied to clipboard!',
        severity: 'success',
      });
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(property.id);
    setToast({
      open: true,
      message: isFav ? 'Removed from saved properties.' : 'Property added to saved favorites!',
      severity: 'success',
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>
      <Navbar
        favoriteCount={favoriteCount}
        activeTab="none"
        onTabSelect={(tab) => router.push(`/?tab=${tab}`)}
        onFavoriteClick={() => router.push('/?filter=favorites')}
        onOpenListProperty={() => router.push('/?action=list')}
      />

      <Container maxWidth="xl" sx={{ py: { xs: 3, md: 4 }, flexGrow: 1 }}>
        {/* Navigation & Breadcrumb Header */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            mb: 3,
          }}
        >
          <Button
            component={Link}
            href="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: '#334155',
              fontWeight: 700,
              fontSize: '0.875rem',
              borderRadius: 2,
              '&:hover': { backgroundColor: '#E2E8F0' },
            }}
          >
            Back to Listings
          </Button>

          {/* Quick Actions (Share & Save) */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Tooltip title="Share property link">
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                startIcon={<ShareIcon />}
                onClick={handleShare}
                sx={{
                  borderRadius: 2,
                  borderColor: '#CBD5E1',
                  color: '#334155',
                  fontWeight: 600,
                  '&:hover': { borderColor: '#0F172A', backgroundColor: '#FFFFFF' },
                }}
              >
                Share
              </Button>
            </Tooltip>

            <Tooltip title={isFav ? 'Remove from saved' : 'Save property'}>
              <Button
                variant={isFav ? 'contained' : 'outlined'}
                color={isFav ? 'secondary' : 'inherit'}
                size="small"
                startIcon={isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                onClick={handleToggleFavorite}
                sx={{
                  borderRadius: 2,
                  fontWeight: 600,
                  borderColor: '#CBD5E1',
                  backgroundColor: isFav ? '#EF4444' : 'transparent',
                  color: isFav ? '#FFFFFF' : '#334155',
                  '&:hover': {
                    backgroundColor: isFav ? '#DC2626' : '#FFFFFF',
                    borderColor: isFav ? '#DC2626' : '#0F172A',
                  },
                }}
              >
                {isFav ? 'Saved' : 'Save'}
              </Button>
            </Tooltip>
          </Box>
        </Box>

        {/* Title & Location Header */}
        <Box sx={{ mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
            <Chip
              label={property.type === 'buy' ? 'FOR SALE' : 'FOR RENT'}
              size="small"
              sx={{
                fontWeight: 800,
                backgroundColor: property.type === 'buy' ? '#0F172A' : '#D97706',
                color: '#FFFFFF',
              }}
            />
            <Chip
              label={`${property.bhk} BHK ${property.propertyType}`}
              size="small"
              sx={{ fontWeight: 700, backgroundColor: '#E2E8F0', color: '#1E293B' }}
            />
            {property.isVerified && (
              <Chip
                icon={<VerifiedIcon sx={{ fontSize: '15px !important', color: '#10B981 !important' }} />}
                label="VERIFIED"
                size="small"
                sx={{
                  fontWeight: 800,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0',
                }}
              />
            )}
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              lineHeight: 1.25,
              mb: 1,
            }}
          >
            {property.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
            <LocationOnIcon sx={{ color: '#D97706', fontSize: 20 }} />
            <Typography variant="body1" sx={{ color: '#64748B', fontWeight: 500 }}>
              {property.location.address}, {property.location.locality}, {property.location.city},{' '}
              {property.location.state} - {property.location.pincode}
            </Typography>
          </Box>
        </Box>

        {/* Main Content Layout */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 380px' },
            gap: 4,
            alignItems: 'start',
          }}
        >
          {/* Left Column: Gallery, Specs, Details, Amenities, EMI */}
          <Box sx={{ minWidth: 0 }}>
            {/* Image Gallery */}
            <PropertyGallery
              images={property.images}
              title={property.title}
              isVerified={property.isVerified}
              listingType={property.type}
            />

            {/* Specifications Overview Grid */}
            <PropertyOverview property={property} />

            {/* Detailed Description */}
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3.5 },
                borderRadius: 4,
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                mb: 4,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', mb: 2 }}>
                About this Residence
              </Typography>
              <Typography variant="body1" sx={{ color: '#334155', lineHeight: 1.8, mb: 3 }}>
                {property.description}
              </Typography>

              <Divider sx={{ my: 2.5 }} />

              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                }}
              >
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block' }}>
                    Possession Status
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#0F172A' }}>
                    {property.possessionStatus} ({property.possessionDate})
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block' }}>
                    RERA Registration
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#059669' }}>
                    Approved & Verified Title
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Features & Amenities */}
            <AmenitiesList amenities={property.amenities} />

            {/* Interactive Loan & EMI Calculator */}
            <EmiCalculator propertyPrice={property.price} listingType={property.type} />
          </Box>

          {/* Right Column: Sticky Pricing & Agent Card */}
          <Box>
            <Box sx={{ position: { lg: 'sticky' }, top: 96 }}>
              <Paper
                elevation={3}
                sx={{
                  p: 3.5,
                  borderRadius: 4,
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 10px 30px -5px rgba(15, 23, 42, 0.08)',
                  mb: 3,
                }}
              >
                {/* Price Display */}
                <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block' }}>
                  {property.type === 'buy' ? 'Total Asking Price' : 'Monthly Rent'}
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 800, color: '#0F172A', my: 0.5 }}>
                  {formatPrice(property.price, property.type)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748B', mb: 3 }}>
                  Rate:{' '}
                  <strong>{formatPricePerSqFt(property.price, property.areaSqFt, property.type)}</strong>{' '}
                  (All Inclusive)
                </Typography>

                <Divider sx={{ mb: 3 }} />

                {/* Agent Card */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Avatar
                    src={property.agent.avatar}
                    alt={property.agent.name}
                    sx={{ width: 56, height: 56, border: '2px solid #D97706' }}
                  />
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
                      {property.agent.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748B', display: 'block' }}>
                      Senior Advisor • {property.agent.agency}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.3 }}>
                      <Rating value={property.agent.rating} precision={0.1} size="small" readOnly />
                      <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                        {property.agent.rating}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Primary CTA: Schedule Tour */}
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CalendarMonthIcon />}
                  onClick={() => setModalOpen(true)}
                  sx={{
                    py: 1.5,
                    borderRadius: 2.5,
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    mb: 1.5,
                  }}
                >
                  Schedule Private Tour
                </Button>

                {/* Secondary CTAs */}
                <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<PhoneIcon />}
                    href={`tel:${property.agent.phone}`}
                    sx={{
                      borderRadius: 2.5,
                      borderColor: '#CBD5E1',
                      color: '#0F172A',
                      fontWeight: 600,
                    }}
                  >
                    Call Agent
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    href={`https://wa.me/?text=Hi%2C%20I%20am%20interested%20in%20${encodeURIComponent(
                      property.title
                    )}`}
                    target="_blank"
                    sx={{ borderRadius: 2.5, fontWeight: 600 }}
                  >
                    WhatsApp
                  </Button>
                </Box>

                {/* Trust Seal */}
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <ShieldIcon sx={{ color: '#10B981', fontSize: 24 }} />
                  <Typography variant="caption" sx={{ color: '#475569', lineHeight: 1.4 }}>
                    <strong>100% Buyer Protection</strong>: Direct contact with verified builder representatives and zero fake listings guarantee.
                  </Typography>
                </Box>
              </Paper>
            </Box>
          </Box>
        </Box>

        {/* Similar Properties Recommendation */}
        <SimilarProperties
          currentProperty={property}
          allProperties={allProperties}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </Container>

      {/* Contact Agent / Tour Modal */}
      <ContactAgentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        agent={property.agent}
        propertyTitle={property.title}
      />

      {/* Toast Feedback */}
      <ToastNotification
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <Footer onLocationSelect={(loc) => router.push(`/?search=${encodeURIComponent(loc)}`)} />
    </Box>
  );
}
