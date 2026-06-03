/**
 * MatchTrip Events Data
 * =====================
 *
 * Each event contains structured travel data for affiliate link generation.
 *
 * partnerRefs fields (consumed by src/utils/affiliate-links.js):
 *   - hotelCity     → Booking.com search city
 *   - flightFrom    → Skyscanner origin (your site's default departure hub)
 *   - flightTo      → Skyscanner destination city/airport code
 *   - ticketUrl     → Official ticket site (direct link, no affiliate)
 *   - ticketSlug    → StubHub event slug for resale tickets
 *   - activityQuery → Viator search query for tours & activities
 */

export const eventsData = {
  'world-cup-2026': {
    title: 'FIFA World Cup 2026',
    category: 'Football',
    location: 'USA, Canada & Mexico',
    date: 'June – July 2026',
    description: 'The biggest football tournament returns to North America with 48 teams competing across 3 nations for the first time in history.',
    priceEstimate: '$2,500 – $8,000',
    avgFlightPrice: '$600 – $1,200',
    avgHotelPrice: '$180/night',
    matchTickets: '$80 – $1,500',
    venues: ['MetLife Stadium (NJ)', 'SoFi Stadium (LA)', 'AT&T Stadium (TX)', 'Azteca Stadium (Mexico City)'],
    hostCities: ['New York', 'Los Angeles', 'Dallas', 'Mexico City', 'Toronto', 'Vancouver'],
    partnerRefs: {
      hotelCity: 'New York',
      flightTo: 'NYC',
      ticketUrl: 'https://www.fifa.com/fifaplus/en/tickets',
      ticketSlug: 'fifa-world-cup-2026',
      activityQuery: 'FIFA World Cup 2026',
    },
  },

  'winter-olympics-2026': {
    title: 'Winter Olympics 2026',
    category: 'Multi-Sport',
    location: 'Milan-Cortina, Italy',
    date: 'February 2026',
    description: 'The XXV Olympic Winter Games bring the world\'s best winter athletes to the stunning Italian Alps and Dolomites.',
    priceEstimate: '$3,000 – $10,000',
    avgFlightPrice: '$700 – $1,400',
    avgHotelPrice: '$200/night',
    matchTickets: '$50 – $2,000',
    venues: ['Milano Arena', 'Cortina Olympic Stadium', 'Stelvio Ski Centre'],
    hostCities: ['Milan', 'Cortina d\'Ampezzo', 'Verona'],
    partnerRefs: {
      hotelCity: 'Milan',
      flightTo: 'MIL',
      ticketUrl: 'https://milano-cortina2026.org/en/tickets',
      ticketSlug: 'winter-olympics-2026',
      activityQuery: 'Milan Cortina Winter Olympics tours',
    },
  },

  'f1-monaco-2026': {
    title: 'Formula 1 Monaco Grand Prix',
    category: 'Motorsport',
    location: 'Monte Carlo, Monaco',
    date: 'May 2026',
    description: 'Experience the glamour and speed of F1 racing on the iconic Monaco street circuit, the crown jewel of the Formula 1 calendar.',
    priceEstimate: '$1,200 – $5,000',
    avgFlightPrice: '$400 – $900',
    avgHotelPrice: '$350/night',
    matchTickets: '$150 – $3,000',
    venues: ['Circuit de Monaco', 'Monte Carlo'],
    hostCities: ['Monaco', 'Nice'],
    partnerRefs: {
      hotelCity: 'Monaco',
      flightTo: 'NCE',
      ticketUrl: 'https://www.formula1.com/en/racing/2026/Monaco',
      ticketSlug: 'formula-1-monaco-gp-2026',
      activityQuery: 'Monaco Grand Prix experience',
    },
  },

  'super-bowl-lx': {
    title: 'Super Bowl LX',
    category: 'American Football',
    location: 'Santa Clara, USA',
    date: 'February 2026',
    description: 'The biggest single-day sporting event in America returns to the Bay Area at Levi\'s Stadium.',
    priceEstimate: '$4,000 – $12,000',
    avgFlightPrice: '$400 – $1,000',
    avgHotelPrice: '$250/night',
    matchTickets: '$3,000 – $10,000',
    venues: ['Levi\'s Stadium'],
    hostCities: ['San Francisco', 'San Jose'],
    partnerRefs: {
      hotelCity: 'Santa Clara',
      flightTo: 'SFO',
      ticketUrl: 'https://www.nfl.com/super-bowl/',
      ticketSlug: 'super-bowl-lx',
      activityQuery: 'San Francisco Bay Area tours',
    },
  },

  'wimbledon-2026': {
    title: 'Wimbledon 2026',
    category: 'Tennis',
    location: 'London, UK',
    date: 'June – July 2026',
    description: 'The oldest and most prestigious tennis tournament in the world. Grass-court tradition meets elite competition.',
    priceEstimate: '$600 – $2,500',
    avgFlightPrice: '$500 – $1,000',
    avgHotelPrice: '$200/night',
    matchTickets: '$50 – $500',
    venues: ['All England Lawn Tennis Club'],
    hostCities: ['London'],
    partnerRefs: {
      hotelCity: 'London',
      flightTo: 'LON',
      ticketUrl: 'https://www.wimbledon.com',
      ticketSlug: 'wimbledon-2026',
      activityQuery: 'Wimbledon tennis tour London',
    },
  },

  'champions-league-final-2026': {
    title: 'Champions League Final 2026',
    category: 'Football',
    location: 'Budapest, Hungary',
    date: 'May 2026',
    description: 'The biggest club football match in the world. One night, one trophy, one winner at the Puskas Arena.',
    priceEstimate: '$1,500 – $5,000',
    avgFlightPrice: '$300 – $800',
    avgHotelPrice: '$140/night',
    matchTickets: '$100 – $2,500',
    venues: ['Puskas Arena'],
    hostCities: ['Budapest'],
    partnerRefs: {
      hotelCity: 'Budapest',
      flightTo: 'BUD',
      ticketUrl: 'https://www.uefa.com/uefachampionsleague/',
      ticketSlug: 'champions-league-final-2026',
      activityQuery: 'Budapest city tour',
    },
  },

  'us-open-tennis-2026': {
    title: 'US Open Tennis 2026',
    category: 'Tennis',
    location: 'New York, USA',
    date: 'August – September 2026',
    description: 'The final Grand Slam of the year. Hard-court action under the lights of Flushing Meadows.',
    priceEstimate: '$800 – $3,000',
    avgFlightPrice: '$300 – $700',
    avgHotelPrice: '$180/night',
    matchTickets: '$60 – $800',
    venues: ['Arthur Ashe Stadium', 'USTA Billie Jean King National Tennis Center'],
    hostCities: ['New York'],
    partnerRefs: {
      hotelCity: 'New York',
      flightTo: 'NYC',
      ticketUrl: 'https://www.usopen.org',
      ticketSlug: 'us-open-tennis-2026',
      activityQuery: 'New York Flushing Meadows tour',
    },
  },

  'nba-finals-2026': {
    title: 'NBA Finals 2026',
    category: 'Basketball',
    location: 'Various Cities, USA',
    date: 'June 2026',
    description: 'The championship series of the National Basketball Association. The best two teams battle for the Larry O\'Brien Trophy.',
    priceEstimate: '$800 – $3,500',
    avgFlightPrice: '$300 – $800',
    avgHotelPrice: '$150/night',
    matchTickets: '$200 – $5,000',
    venues: ['TBD - Conference Champion Home Courts'],
    hostCities: ['TBD'],
    partnerRefs: {
      hotelCity: '',
      flightTo: '',
      ticketUrl: 'https://www.nba.com/playoffs',
      ticketSlug: 'nba-finals-2026',
      activityQuery: '',
    },
  },

  'f1-silverstone-2026': {
    title: 'Formula 1 British Grand Prix',
    category: 'Motorsport',
    location: 'Silverstone, UK',
    date: 'July 2026',
    description: 'The home of British motorsport. Silverstone delivers high-speed drama and an atmosphere like no other on the F1 calendar.',
    priceEstimate: '$800 – $3,000',
    avgFlightPrice: '$300 – $700',
    avgHotelPrice: '$160/night',
    matchTickets: '$100 – $1,500',
    venues: ['Silverstone Circuit'],
    hostCities: ['London', 'Northampton'],
    partnerRefs: {
      hotelCity: 'Northampton',
      flightTo: 'LON',
      ticketUrl: 'https://www.formula1.com/en/racing/2026/Great-Britain',
      ticketSlug: 'f1-british-gp-2026',
      activityQuery: 'Silverstone F1 experience',
    },
  },
};
