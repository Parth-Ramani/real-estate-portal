'use client';

import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface ToastNotificationProps {
  open: boolean;
  message: string;
  severity?: 'success' | 'info' | 'warning' | 'error';
  onClose: () => void;
}

export default function ToastNotification({
  open,
  message,
  severity = 'success',
  onClose,
}: ToastNotificationProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{
          width: '100%',
          fontWeight: 600,
          borderRadius: 2.5,
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
