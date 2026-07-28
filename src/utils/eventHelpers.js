/**
 * Event Display Helpers
 * =====================
 *
 * Thin helpers that read the new structured fields (location, price)
 * with automatic fallback to old string fields for backward compat.
 *
 * New events should only set the structured fields.
 * Old events retain both — pages prefer new, fall back to old.
 */

/**
 * Get a display-ready location string.
 * Prefers new location.label, falls back to old location string.
 */
export function getEventLocation(event) {
  return event.location?.label || event.location || '';
}

/**
 * Format a price range object like { min: 300, max: 700 } into "$300 – $700".
 * If the given price object is null/undefined, returns the fallback string.
 */
export function formatPriceRange(price, fallback = '') {
  if (!price || price.min == null) return fallback;
  if (price.min === price.max) return `$${price.min}`;
  return `$${price.min} – $${price.max}`;
}

/**
 * Format a hotel price with unit suffix.
 * shape: { min, max, unit } → "$180/night"
 * If min !== max, shows "$150 – $250/night".
 */
export function formatHotelPrice(price, fallback = '') {
  if (!price || price.min == null) return fallback;
  const unit = price.unit ? `/${price.unit}` : '';
  if (price.min === price.max) return `$${price.min}${unit}`;
  return `$${price.min} – $${price.max}${unit}`;
}

/**
 * Safe accessors that read new structured field, fall back to old string field.
 */

export function getFlightPrice(event) {
  return formatPriceRange(event.price?.flight, event.avgFlightPrice || '');
}

export function getHotelPrice(event) {
  return formatHotelPrice(event.price?.hotel, event.avgHotelPrice || '');
}

export function getTicketPrice(event) {
  return formatPriceRange(event.price?.ticket, event.matchTickets || '');
}

export function getTravelPrice(event) {
  return formatPriceRange(event.price?.travel, event.priceEstimate || '');
}

/**
 * Get numeric minimum price for schema.org offer.
 * Reads new price.ticket.min, falls back to parsing old matchTickets string.
 */
export function getSchemaTicketPrice(event) {
  if (event.price?.ticket?.min != null) return String(event.price.ticket.min);
  const match = (event.matchTickets || '').match(/\$(\d[\d,]*)/);
  return match ? match[1].replace(/,/g, '') : '0';
}
