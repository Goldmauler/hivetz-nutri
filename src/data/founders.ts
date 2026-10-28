export type Founder = {
  id: string;
  name: string;
  title: string;
  bio: string;
  linkedin?: string;
  initials: string;
  photo?: string;
};

// Names: confirmed by the client. Roles: the brochure's "About Hivetz" names Kumar, Muthu and
// Kannan as the promotional directors; roles for the other three are not published yet, so none
// is invented here. No bios or profile links until the founders supply them.

const DIRECTOR =
  'Promotional director. The three promotional directors bring 25+ years of industry experience between them, across R&D, formulations, supply chain management, manufacturing, sales and marketing, finance and administration, and international taxation.';

export const founders: Founder[] = [
  { id: 'kumar-subramaniam', name: 'Kumar Subramaniam', title: 'Founder · Promotional Director', initials: 'KS', bio: DIRECTOR },
  { id: 'muthu', name: 'Muthu', title: 'Founder · Promotional Director', initials: 'MU', bio: DIRECTOR },
  { id: 'kannan', name: 'Kannan', title: 'Founder · Promotional Director', initials: 'KA', bio: DIRECTOR },
  { id: 'angamuthu', name: 'Angamuthu', title: 'Founder', initials: 'AN', bio: '' },
  { id: 'rathinam', name: 'Rathinam', title: 'Founder', initials: 'RA', bio: '' },
  { id: 'fernando', name: 'Fernando', title: 'Founder', initials: 'FE', bio: '' },
];
