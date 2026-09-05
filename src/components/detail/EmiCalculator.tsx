'use client';

import * as React from 'react';
import { Box, Paper, Typography, Slider, Divider } from '@mui/material';
import CalculateOutlinedIcon from '@mui/icons-material/CalculateOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import { formatPrice } from '@/utils/formatters';

interface EmiCalculatorProps {
  propertyPrice: number;
  listingType: 'buy' | 'rent';
}

export default function EmiCalculator({ propertyPrice, listingType }: EmiCalculatorProps) {
  // If property is for rent, show rental deposit & maintenance estimator
  const isBuy = listingType === 'buy';

  // Buy State
  const defaultLoan = Math.round(propertyPrice * 0.8);
  const [loanAmount, setLoanAmount] = React.useState<number>(defaultLoan);
  const [interestRate, setInterestRate] = React.useState<number>(8.5);
  const [tenureYears, setTenureYears] = React.useState<number>(20);

  // Rent State
  const defaultDepositMonths = 6;
  const [depositMonths, setDepositMonths] = React.useState<number>(defaultDepositMonths);
  const [maintenanceCost, setMaintenanceCost] = React.useState<number>(Math.round(propertyPrice * 0.1));

  // EMI Formula Calculation
  // E = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi =
    loanAmount && monthlyRate
      ? Math.round(
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : 0;

  const totalPayment = emi * totalMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const principalPercentage = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 50;

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, mb: 1 }}>
        <CalculateOutlinedIcon sx={{ color: '#D97706', fontSize: 28, flexShrink: 0 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#0F172A', fontSize: { xs: '1.05rem', sm: '1.25rem' } }}>
          {isBuy ? 'Home Loan & EMI Estimator' : 'Rental Cost & Deposit Estimator'}
        </Typography>
      </Box>
      <Typography variant="body2" sx={{ color: '#64748B', mb: { xs: 2, sm: 3 }, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
        {isBuy
          ? 'Estimate your monthly home loan installments based on tenure and current bank interest rates.'
          : 'Understand your monthly outflow including maintenance and upfront security deposit.'}
      </Typography>

      {isBuy ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.4fr 1fr' },
            gap: 4,
            alignItems: 'center',
          }}
        >
          {/* Sliders Column */}
          <Box>
            {/* Loan Amount Slider */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                  Loan Amount
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {formatPrice(loanAmount, 'buy')}
                </Typography>
              </Box>
              <Slider
                value={loanAmount}
                min={1000000}
                max={propertyPrice}
                step={500000}
                onChange={(_e, val) => setLoanAmount(val as number)}
                sx={{ color: '#0F172A' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                  Min: ₹10 Lacs
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                  Max: {formatPrice(propertyPrice, 'buy')}
                </Typography>
              </Box>
            </Box>

            {/* Interest Rate Slider */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                  Interest Rate (% p.a.)
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {interestRate}%
                </Typography>
              </Box>
              <Slider
                value={interestRate}
                min={7.0}
                max={14.0}
                step={0.1}
                onChange={(_e, val) => setInterestRate(val as number)}
                sx={{ color: '#D97706' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                  7.0%
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                  14.0%
                </Typography>
              </Box>
            </Box>

            {/* Loan Tenure Slider */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155' }}>
                  Loan Tenure
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                  {tenureYears} Years ({tenureYears * 12} Months)
                </Typography>
              </Box>
              <Slider
                value={tenureYears}
                min={5}
                max={30}
                step={1}
                onChange={(_e, val) => setTenureYears(val as number)}
                sx={{ color: '#059669' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                  5 Years
                </Typography>
                <Typography variant="caption" sx={{ color: '#94A3B8' }}>
                  30 Years
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Breakdown Card Column */}
          <Box sx={{ minWidth: 0 }}>
            <Box
              sx={{
                p: { xs: 2.25, sm: 3 },
                borderRadius: 3.5,
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
                color: '#FFFFFF',
                boxShadow: '0 10px 25px rgba(15, 23, 42, 0.2)',
                minWidth: 0,
                overflow: 'hidden',
              }}
            >
              <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Estimated Monthly EMI
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 800,
                  color: '#F59E0B',
                  my: 1,
                  fontSize: { xs: '1.5rem', sm: '1.85rem', md: '2.125rem' },
                  wordBreak: 'break-word',
                }}
              >
                ₹{emi.toLocaleString('en-IN')}{' '}
                <Typography component="span" variant="body2" sx={{ color: '#CBD5E1' }}>
                  /month
                </Typography>
              </Typography>

              <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.15)' }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
                  Principal Amount:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                  {formatPrice(loanAmount, 'buy')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
                  Total Interest:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#F59E0B' }}>
                  {formatPrice(totalInterest, 'buy')}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#CBD5E1' }}>
                  Total Payable:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                  {formatPrice(totalPayment, 'buy')}
                </Typography>
              </Box>

              {/* Progress bar visual */}
              <Box sx={{ height: 8, borderRadius: 4, backgroundColor: '#F59E0B', overflow: 'hidden', display: 'flex' }}>
                <Box sx={{ width: `${principalPercentage}%`, backgroundColor: '#38BDF8' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.8 }}>
                <Typography variant="caption" sx={{ color: '#38BDF8' }}>
                  Principal ({principalPercentage}%)
                </Typography>
                <Typography variant="caption" sx={{ color: '#F59E0B' }}>
                  Interest ({100 - principalPercentage}%)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 3,
          }}
        >
          <Box sx={{ p: 2.5, borderRadius: 3, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Monthly Rent
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
              {formatPrice(propertyPrice, 'rent')}
            </Typography>
          </Box>
          <Box sx={{ p: 2.5, borderRadius: 3, backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
            <Typography variant="caption" sx={{ color: '#64748B', fontWeight: 600 }}>
              Estimated Maintenance
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', mt: 0.5 }}>
              ₹{maintenanceCost.toLocaleString('en-IN')}/mo
            </Typography>
          </Box>
          <Box sx={{ p: 2.5, borderRadius: 3, backgroundColor: '#FEF3C7', border: '1px solid #FDE68A' }}>
            <Typography variant="caption" sx={{ color: '#B45309', fontWeight: 600 }}>
              Security Deposit (6 Months)
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 800, color: '#92400E', mt: 0.5 }}>
              ₹{(propertyPrice * depositMonths).toLocaleString('en-IN')}
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
}
