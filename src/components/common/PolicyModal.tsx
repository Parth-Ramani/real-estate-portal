'use client';

import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GavelIcon from '@mui/icons-material/Gavel';
import ShieldIcon from '@mui/icons-material/Shield';
import VerifiedIcon from '@mui/icons-material/Verified';

export type PolicyType = 'privacy' | 'terms' | 'rera' | null;

interface PolicyModalProps {
  type: PolicyType;
  onClose: () => void;
}

export default function PolicyModal({ type, onClose }: PolicyModalProps) {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'Privacy & Data Protection Policy',
          icon: <ShieldIcon sx={{ color: '#059669', fontSize: 24 }} />,
          body: (
            <>
              <Typography variant="body2" sx={{ color: '#334155', mb: 2, lineHeight: 1.7 }}>
                At HAVEN Luxury Real Estate Portal, safeguarding your confidential contact details and property investment preferences is our highest priority.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                1. Information Collection
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                We only collect contact details (Name, Phone number, Email) when you deliberately request a site visit, contact an authorized representative, or register a property.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                2. Zero Spam Commitment
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                Your phone number is never sold to third-party telemarketers or advertisers. Communications are restricted solely to confirmed property walkthroughs and verified concierge updates.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                3. Encryption & Storage
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                All user data, favorites, and inquiry submissions are encrypted using 256-bit SSL protocols in compliance with international data privacy laws.
              </Typography>
            </>
          ),
        };
      case 'terms':
        return {
          title: 'Terms of Service & Portal Guidelines',
          icon: <GavelIcon sx={{ color: '#D97706', fontSize: 24 }} />,
          body: (
            <>
              <Typography variant="body2" sx={{ color: '#334155', mb: 2, lineHeight: 1.7 }}>
                By accessing HAVEN, you agree to our terms of service governing listings, visits, and interactions between buyers, tenants, and property advisors.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                1. Accuracy of Listings
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                While all listings undergo initial verification, buyers and tenants are advised to conduct independent due diligence prior to signing financial agreements or executing leases.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                2. Zero Brokerage for Direct Listings
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                Direct owner listings carry 0% brokerage. Verified agency partner listings disclose advisory compensation transparently in advance without hidden charges.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                3. Code of Conduct
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                Users posting properties warrant that they hold valid ownership or authorized agency rights. Misleading prices or non-genuine floor plans lead to immediate listing termination.
              </Typography>
            </>
          ),
        };
      case 'rera':
        return {
          title: 'Real Estate Regulatory Authority (RERA) Compliance',
          icon: <VerifiedIcon sx={{ color: '#2563EB', fontSize: 24 }} />,
          body: (
            <>
              <Typography variant="body2" sx={{ color: '#334155', mb: 2, lineHeight: 1.7 }}>
                HAVEN strictly complies with the Real Estate (Regulation and Development) Act, 2016 across all operating states including MahaRERA, Karnataka RERA, and HRERA.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                1. Registered Projects Only
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                Under-construction developments advertised on this portal feature genuine RERA registration numbers and verified completion target timelines.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                2. Carpet Area Standard
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', mb: 2, lineHeight: 1.6 }}>
                All square footage measurements in property cards are calculated and highlighted as net usable RERA Carpet Area to prevent misleading super-built-up inflation.
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#0F172A', mb: 0.5 }}>
                3. Title & Encumbrance Verification
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748B', lineHeight: 1.6 }}>
                Residences labeled with the &quot;VERIFIED&quot; badge have undergone primary title verification and approved municipal building plan validation.
              </Typography>
            </>
          ),
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <Dialog
      open={Boolean(type)}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 4,
          p: { xs: 1, sm: 2 },
        },
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          {content.icon}
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: '1.1rem' }}>
            {content.title}
          </Typography>
        </Box>
        <IconButton onClick={onClose} size="small" aria-label="Close dialog">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ my: 1 }} />

      <DialogContent sx={{ pt: 2 }}>{content.body}</DialogContent>

      <DialogActions sx={{ pt: 2 }}>
        <Button variant="contained" color="primary" onClick={onClose} sx={{ borderRadius: 2, px: 3 }}>
          I Understand
        </Button>
      </DialogActions>
    </Dialog>
  );
}
