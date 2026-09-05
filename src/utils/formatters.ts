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

/**
 * Strips non-digit characters from phone number for wa.me link
 */
export function sanitizePhoneForWhatsApp(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Generates safe WhatsApp inquiry URL for the listing agent.
 * Uses the universal WhatsApp send intent with pre-filled message, avoiding
 * accidentally linking to real stranger phone numbers while preserving full inquiry context.
 */
export function getAgentWhatsAppUrl(
  agent: { name: string; phone: string },
  property: { title: string; price: number; type: 'buy' | 'rent'; location: { locality: string; city: string } },
  currentUrl?: string
): string {
  const formattedPrice = formatPrice(property.price, property.type);
  const text = `Hello ${agent.name}, I am interested in *${property.title}* (${formattedPrice}, ${property.location.locality}, ${property.location.city}) listed on HAVEN.\n\nCould you please share more details or arrange a private site visit?\n\nProperty link: ${currentUrl || ''}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text.trim())}`;
}

/**
 * Generates WhatsApp share URL to share the property with friends or family
 */
export function getPropertyWhatsAppShareUrl(
  property: {
    title: string;
    price: number;
    type: 'buy' | 'rent';
    bhk: number;
    propertyType: string;
    areaSqFt: number;
    location: { locality: string; city: string };
  },
  currentUrl?: string
): string {
  const formattedPrice = formatPrice(property.price, property.type);
  const text = `🏡 *${property.title}*\n💰 Price: ${formattedPrice}\n📍 Location: ${property.location.locality}, ${property.location.city} (${property.bhk} BHK ${property.propertyType} • ${property.areaSqFt.toLocaleString('en-IN')} sq.ft)\n\n✨ Explore photos, floor plan & amenities on HAVEN:\n${currentUrl || ''}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text.trim())}`;
}
