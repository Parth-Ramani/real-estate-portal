'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { Property, ListingType, PropertyType } from '@/types/property';

interface ListPropertyModalProps {
  open: boolean;
  onClose: () => void;
  onPropertyAdded: (newProp: Property) => void;
}

const PROPERTY_TYPES: PropertyType[] = [
  'Apartment',
  'Villa',
  'Penthouse',
  'Studio',
  'Duplex',
  'Townhouse',
];

export default function ListPropertyModal({
  open,
  onClose,
  onPropertyAdded,
}: ListPropertyModalProps) {
  const [title, setTitle] = React.useState('');
  const [listingType, setListingType] = React.useState<ListingType>('buy');
  const [propertyType, setPropertyType] = React.useState<PropertyType>('Apartment');
  const [bhk, setBhk] = React.useState<number>(3);
  const [bathrooms, setBathrooms] = React.useState<number>(3);
  const [carpetArea, setCarpetArea] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [city, setCity] = React.useState('Mumbai');
  const [locality, setLocality] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [ownerName, setOwnerName] = React.useState('');
  const [ownerPhone, setOwnerPhone] = React.useState('');
  const [ownerEmail, setOwnerEmail] = React.useState('');

  const [customImage, setCustomImage] = React.useState<string>('');
  const [imageUrl, setImageUrl] = React.useState<string>('');

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [createdId, setCreatedId] = React.useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Please choose an image under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setCustomImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getSelectedImage = () => {
    if (customImage) return customImage;
    if (imageUrl.trim()) return imageUrl.trim();
    // Curated high-res photo corresponding to selected property type
    switch (propertyType) {
      case 'Penthouse':
        return 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80';
      case 'Villa':
        return 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80';
      case 'Studio':
        return 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80';
      case 'Duplex':
        return 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80';
      case 'Townhouse':
        return 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
      case 'Apartment':
      default:
        return 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80';
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 6) {
      errs.title = 'Title must be at least 6 characters long.';
    }
    if (!carpetArea || isNaN(Number(carpetArea)) || Number(carpetArea) < 150) {
      errs.carpetArea = 'Please enter a valid area (min 150 sq.ft).';
    }
    if (!price || isNaN(Number(price)) || Number(price) < 5000) {
      errs.price = 'Please enter a valid price (minimum ₹5,000).';
    }
    if (!locality.trim()) {
      errs.locality = 'Locality is required.';
    }
    if (!address.trim()) {
      errs.address = 'Street address is required.';
    }
    if (!ownerName.trim() || ownerName.trim().length < 3) {
      errs.ownerName = 'Please enter your full name (min 3 characters).';
    }
    if (!/^[6-9]\d{9}$/.test(ownerPhone.trim())) {
      errs.ownerPhone = 'Please enter a valid 10-digit mobile number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(ownerEmail.trim())) {
      errs.ownerEmail = 'Please enter a valid email address.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newId = `prop-custom-${Date.now()}`;
      const newProperty: Property = {
        id: newId,
        title: title.trim(),
        description: `Newly listed ${bhk} BHK ${propertyType} in prime ${locality}, ${city}. Direct listing from owner with clear legal titles and immediate viewing availability.`,
        type: listingType,
        propertyType,
        bhk,
        bathrooms,
        balconies: 2,
        areaSqFt: Math.round(Number(carpetArea) * 1.25),
        carpetAreaSqFt: Number(carpetArea),
        price: Number(price),
        location: {
          address: address.trim(),
          locality: locality.trim(),
          city,
          state: 'Maharashtra',
          pincode: '400001',
        },
        images: [
          getSelectedImage(),
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        ],
        featuredImage: getSelectedImage(),
        isVerified: true,
        isFeatured: true,
        furnishingStatus: 'Semi-Furnished',
        facing: 'East',
        floorNumber: 5,
        totalFloors: 14,
        possessionStatus: 'Ready to Move',
        possessionDate: 'Immediate',
        amenities: [
          'Covered Parking',
          '24/7 Security',
          'High Speed Elevators',
          'Power Backup',
          'Gymnasium',
        ],
        agent: {
          name: ownerName.trim(),
          phone: ownerPhone.trim(),
          email: ownerEmail.trim(),
          agency: 'Direct Owner Verified',
          avatar:
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          rating: 5.0,
        },
        createdAt: new Date().toISOString(),
      };

      onPropertyAdded(newProperty);
      setCreatedId(newId);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 800);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrors({});
    setTitle('');
    setCarpetArea('');
    setPrice('');
    setLocality('');
    setAddress('');
    setOwnerName('');
    setOwnerPhone('');
    setOwnerEmail('');
    setCustomImage('');
    setImageUrl('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleResetAndClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          p: { xs: 1, sm: 2 },
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              backgroundColor: '#0F172A',
              color: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddHomeWorkIcon sx={{ fontSize: 22 }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
            List Property Free (Direct Owner)
          </Typography>
        </Box>
        <IconButton onClick={handleResetAndClose} size="small" aria-label="Close dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {isSuccess ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircleIcon sx={{ fontSize: 72, color: '#10B981', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Property Successfully Published!
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748B', maxWidth: 500, mx: 'auto', mb: 2 }}>
              Your listing has been instantly validated and published live to the HAVEN portal under reference ID:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: '#D97706',
                p: 1.5,
                borderRadius: 2,
                backgroundColor: '#FEF3C7',
                display: 'inline-block',
                mb: 4,
              }}
            >
              #{createdId}
            </Typography>
            <Box>
              <Button
                variant="contained"
                color="primary"
                onClick={handleResetAndClose}
                sx={{ px: 4, py: 1.2, borderRadius: 2.5, fontWeight: 700 }}
              >
                View in Listings
              </Button>
            </Box>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600, display: 'block', mb: 2 }}>
              All fields are validated in real-time with zero brokerage guaranteed.
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 2 }}>
              {/* Title */}
              <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                <TextField
                  label="Property Headline / Project Name"
                  required
                  fullWidth
                  size="small"
                  placeholder="e.g. Luxurious 3 BHK with Balcony at Bandra"
                  value={title}
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>

              {/* Photo Upload & Preview */}
              <Box
                sx={{
                  gridColumn: { sm: 'span 2' },
                  p: 2,
                  borderRadius: 2.5,
                  backgroundColor: '#F8FAFC',
                  border: '1px dashed #CBD5E1',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                  Property Photo (Optional)
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 1.5 }}>
                  Upload a photo from your computer, paste a photo URL, or leave blank to automatically assign a curated {propertyType} photo.
                </Typography>

                {customImage || imageUrl ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      component="img"
                      src={customImage || imageUrl}
                      alt="Property Preview"
                      sx={{
                        width: 96,
                        height: 72,
                        objectFit: 'cover',
                        borderRadius: 2,
                        border: '1px solid #CBD5E1',
                      }}
                    />
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#10B981', mb: 0.5 }}>
                        ✓ Photo attached
                      </Typography>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setCustomImage('');
                          setImageUrl('');
                        }}
                        sx={{ fontSize: '0.75rem', py: 0.3 }}
                      >
                        Remove Photo
                      </Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      component="label"
                      size="small"
                      startIcon={<CloudUploadIcon />}
                      sx={{
                        backgroundColor: '#0F172A',
                        '&:hover': { backgroundColor: '#1E293B' },
                        textTransform: 'none',
                        fontWeight: 600,
                      }}
                    >
                      Upload From Device
                      <input type="file" accept="image/*" hidden onChange={handleFileUpload} />
                    </Button>

                    <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }}>
                      OR
                    </Typography>

                    <TextField
                      size="small"
                      placeholder="Paste image URL (https://...)"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      sx={{ flexGrow: 1, minWidth: { xs: '100%', sm: 220 } }}
                    />
                  </Box>
                )}
              </Box>

              {/* Purpose */}
              <TextField
                select
                label="Listing Purpose"
                size="small"
                fullWidth
                value={listingType}
                onChange={(e) => setListingType(e.target.value as ListingType)}
              >
                <MenuItem value="buy">For Sale (Buy)</MenuItem>
                <MenuItem value="rent">For Rent</MenuItem>
              </TextField>

              {/* Property Type */}
              <TextField
                select
                label="Property Type"
                size="small"
                fullWidth
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value as PropertyType)}
              >
                {PROPERTY_TYPES.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </TextField>

              {/* BHK */}
              <TextField
                select
                label="Bedrooms (BHK)"
                size="small"
                fullWidth
                value={bhk}
                onChange={(e) => setBhk(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} BHK
                  </MenuItem>
                ))}
              </TextField>

              {/* Bathrooms */}
              <TextField
                select
                label="Bathrooms"
                size="small"
                fullWidth
                value={bathrooms}
                onChange={(e) => setBathrooms(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num} Bathrooms
                  </MenuItem>
                ))}
              </TextField>

              {/* Carpet Area */}
              <TextField
                label="Carpet Area (sq.ft)"
                required
                size="small"
                fullWidth
                type="number"
                placeholder="e.g. 1250"
                value={carpetArea}
                error={Boolean(errors.carpetArea)}
                helperText={errors.carpetArea}
                onChange={(e) => setCarpetArea(e.target.value)}
              />

              {/* Price */}
              <TextField
                label={listingType === 'buy' ? 'Total Asking Price (₹)' : 'Monthly Rent (₹)'}
                required
                size="small"
                fullWidth
                type="number"
                placeholder={listingType === 'buy' ? 'e.g. 25000000' : 'e.g. 65000'}
                value={price}
                error={Boolean(errors.price)}
                helperText={errors.price}
                onChange={(e) => setPrice(e.target.value)}
              />

              {/* City */}
              <TextField
                select
                label="City"
                size="small"
                fullWidth
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                {['Mumbai', 'Bengaluru', 'Gurugram', 'Pune', 'Hyderabad', 'New Delhi', 'Kolkata'].map(
                  (c) => (
                    <MenuItem key={c} value={c}>
                      {c}
                    </MenuItem>
                  )
                )}
              </TextField>

              {/* Locality */}
              <TextField
                label="Locality / Neighborhood"
                required
                size="small"
                fullWidth
                placeholder="e.g. Bandra West, Worli, Indiranagar"
                value={locality}
                error={Boolean(errors.locality)}
                helperText={errors.locality}
                onChange={(e) => setLocality(e.target.value)}
              />

              {/* Full Address */}
              <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                <TextField
                  label="Street Address / Tower Name"
                  required
                  size="small"
                  fullWidth
                  placeholder="e.g. Flat 1402, Signature Palms, Perry Cross Road"
                  value={address}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Box>

              {/* Owner Details Header */}
              <Box sx={{ gridColumn: { sm: 'span 2' }, mt: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  Owner / Representative Contact Details
                </Typography>
              </Box>

              {/* Owner Name */}
              <TextField
                label="Your Full Name"
                required
                size="small"
                fullWidth
                value={ownerName}
                error={Boolean(errors.ownerName)}
                helperText={errors.ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />

              {/* Owner Phone */}
              <TextField
                label="10-Digit Mobile Number"
                required
                size="small"
                fullWidth
                placeholder="9876543210"
                value={ownerPhone}
                error={Boolean(errors.ownerPhone)}
                helperText={errors.ownerPhone}
                onChange={(e) => setOwnerPhone(e.target.value)}
              />

              {/* Owner Email */}
              <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                <TextField
                  label="Email Address"
                  required
                  size="small"
                  fullWidth
                  type="email"
                  placeholder="owner@example.com"
                  value={ownerEmail}
                  error={Boolean(errors.ownerEmail)}
                  helperText={errors.ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                />
              </Box>
            </Box>

            <DialogActions sx={{ px: 0, pt: 3, mt: 2 }}>
              <Button onClick={handleResetAndClose} sx={{ color: '#64748B' }}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                sx={{ px: 3, borderRadius: 2, fontWeight: 700 }}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} sx={{ color: '#FFFFFF' }} />
                ) : (
                  'Publish Property Live'
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
