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
  Avatar,
  Rating,
  Alert,
  IconButton,
  CircularProgress,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PropertyAgent } from '@/types/property';

interface ContactAgentModalProps {
  open: boolean;
  onClose: () => void;
  agent: PropertyAgent;
  propertyTitle: string;
  propertyLink?: string;
}

export default function ContactAgentModal({
  open,
  onClose,
  agent,
  propertyTitle,
  propertyLink,
}: ContactAgentModalProps) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [date, setDate] = React.useState('');
  const [message, setMessage] = React.useState(
    `Hello, I am interested in exploring "${propertyTitle}". Please schedule a private walkthrough.`
  );

  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [bookingRef, setBookingRef] = React.useState('');

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim() || name.trim().length < 3) {
      errs.name = 'Please enter your full name (minimum 3 characters).';
    }

    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      errs.phone = 'Please enter a valid 10-digit mobile number (e.g. 9876543210).';
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!date) {
      errs.date = 'Please select a preferred viewing date.';
    } else {
      const selected = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) {
        errs.date = 'Viewing date cannot be in the past.';
      }
    }

    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please provide at least a brief message (min 10 characters).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setBookingRef(`TOUR-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setErrors({});
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleResetAndClose}
      maxWidth="sm"
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
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A' }}>
          Schedule a Private Tour
        </Typography>
        <IconButton onClick={handleResetAndClose} size="small" aria-label="Close modal">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        {/* Agent Profile Card */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            p: 2,
            borderRadius: 3,
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            mb: 3,
          }}
        >
          <Avatar src={agent.avatar} alt={agent.name} sx={{ width: 56, height: 56, border: '2px solid #D97706' }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#0F172A', lineHeight: 1.2 }}>
              {agent.name}
            </Typography>
            <Typography variant="caption" sx={{ color: '#64748B', display: 'block', mb: 0.5 }}>
              Senior Advisor • {agent.agency}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Rating value={agent.rating} precision={0.1} size="small" readOnly />
              <Typography variant="caption" sx={{ fontWeight: 700, color: '#D97706' }}>
                {agent.rating} Verified Rating
              </Typography>
            </Box>
          </Box>
        </Box>

        {isSuccess ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <CheckCircleIcon sx={{ fontSize: 64, color: '#10B981', mb: 1.5 }} />
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mb: 1 }}>
              Private Tour Confirmed!
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748B', mb: 2 }}>
              Booking Reference ID:
            </Typography>
            <Chip
              label={bookingRef}
              color="secondary"
              sx={{ fontWeight: 800, fontSize: '1rem', px: 2, py: 2, mb: 3 }}
            />
            <Typography variant="body2" sx={{ color: '#64748B', mb: 3, maxWidth: 420, mx: 'auto' }}>
              {agent.name} will call you at <strong>{phone}</strong> and send an invitation to{' '}
              <strong>{email}</strong> with directions and security gate pass.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleResetAndClose} sx={{ px: 4, py: 1.2, borderRadius: 2 }}>
              Done
            </Button>
          </Box>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 2,
              }}
            >
              <TextField
                label="Your Full Name"
                required
                fullWidth
                size="small"
                value={name}
                error={Boolean(errors.name)}
                helperText={errors.name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="10-Digit Phone Number"
                required
                fullWidth
                size="small"
                placeholder="9876543210"
                value={phone}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <TextField
                label="Email Address"
                required
                fullWidth
                size="small"
                type="email"
                placeholder="you@domain.com"
                value={email}
                error={Boolean(errors.email)}
                helperText={errors.email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Preferred Visit Date"
                required
                fullWidth
                size="small"
                type="date"
                slotProps={{ inputLabel: { shrink: true } }}
                value={date}
                error={Boolean(errors.date)}
                helperText={errors.date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Box sx={{ gridColumn: { sm: 'span 2' } }}>
                <TextField
                  label="Personalized Request Note"
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  value={message}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </Box>
            </Box>

            {/* Quick Instant Communication Actions */}
            <Box sx={{ mt: 3, display: 'flex', gap: 1.5 }}>
              <Button
                variant="outlined"
                startIcon={<PhoneIcon />}
                href={`tel:${agent.phone}`}
                sx={{ flex: 1, borderRadius: 2, borderColor: '#CBD5E1', color: '#0F172A' }}
              >
                Direct Call
              </Button>
              <Button
                variant="outlined"
                color="success"
                startIcon={<WhatsAppIcon />}
                href={`https://api.whatsapp.com/send?text=Hi%20${encodeURIComponent(
                  agent.name
                )}%2C%20I%20am%20interested%20in%20"${encodeURIComponent(
                  propertyTitle
                )}"%20on%20HAVEN.%20Can%20we%20connect%20for%20a%20private%20tour%3F${propertyLink ? `%0A%0AProperty%20Link%3A%20${encodeURIComponent(propertyLink)}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: 1, borderRadius: 2 }}
              >
                WhatsApp
              </Button>
            </Box>

            <DialogActions sx={{ px: 0, pt: 3, mt: 1 }}>
              <Button onClick={onClose} sx={{ color: '#64748B' }}>
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
                  'Confirm Visit Booking'
                )}
              </Button>
            </DialogActions>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
