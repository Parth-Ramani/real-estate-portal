/**
 * Formats price in Indian Currency system (Crores, Lakhs, Thousands)
 */
export function formatPrice(price: number, listingType: 'buy' | 'rent'): string {
  if (listingType === 'rent') {
    if (price >= 100000) {
      const lakhs = (price / 100000).toFixed(1);
      return `₹${lakhs.endsWith('.0') ? lakhs.slice(0, -2) : lakhs} Lac/mo`;
    }
    return `₹${price.toLocaleString('en-IN')}/mo`;
  }

  // Buy pricing
  if (price >= 10000000) {
    const crores = (price / 10000000).toFixed(2);
    return `₹${crores.endsWith('.00') ? crores.slice(0, -3) : crores} Cr`;
  }
  if (price >= 100000) {
    const lakhs = (price / 100000).toFixed(1);
    return `₹${lakhs.endsWith('.0') ? lakhs.slice(0, -2) : lakhs} Lacs`;
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

export function formatArea(sqFt: number): string {
  return `${sqFt.toLocaleString('en-IN')} sq.ft`;
}

export function formatPricePerSqFt(price: number, areaSqFt: number, listingType: 'buy' | 'rent'): string {
  if (listingType === 'rent') {
    const rate = Math.round(price / areaSqFt);
    return `₹${rate}/sq.ft/mo`;
  }
  const rate = Math.round(price / areaSqFt);
  return `₹${rate.toLocaleString('en-IN')} / sq.ft`;
}
