export type Domain = 'disability' | 'mental-health' | 'digital-inclusion';

export interface ServiceEntry {
  id: string;
  domain: Domain[];
  org: string;
  description: string; // Plain-language description
  location: string;
  contact: string;
  eligibility: string;
  cost: string;
  verifiedDate: string;
  tags: string[]; // For referral intelligence mapping
}

export const PERTH_DIRECTORY: ServiceEntry[] = [
  // --- DISABILITY ---
  {
    id: 'alike-wa',
    domain: ['disability'],
    org: 'ALIKE',
    description: 'A peer-led network for navigating the NDIS and connecting with others who understand the disability sector. Run by people with disabilities, for people with disabilities.',
    location: 'Perth, WA (Statewide)',
    contact: 'https://alike.org.au',
    eligibility: 'People with disability, their families, and carers in WA.',
    cost: 'Free',
    verifiedDate: '2026-02-24',
    tags: ['ndis', 'peer support', 'advocacy', 'disability']
  },
  {
    id: 'pwda-wa',
    domain: ['disability'],
    org: 'People with Disabilities WA (PWdWA)',
    description: 'The peak disability consumer organisation in Western Australia. Provides non-legal advocacy for people with disabilities.',
    location: 'City West Lotteries House, 2 Delhi Street, West Perth',
    contact: '1800 193 331 | info@pwdwa.org',
    eligibility: 'Anyone in WA with a disability needing advocacy support.',
    cost: 'Free',
    verifiedDate: '2026-02-24',
    tags: ['advocacy', 'rights', 'systemic advocacy', 'disability']
  },

  // --- MENTAL HEALTH ---
  {
    id: 'activate-mh',
    domain: ['mental-health'],
    org: 'Activate Mental Health',
    description: 'Organises fun, inclusive social events to help people experiencing mental health issues build connections and break isolation.',
    location: 'Various locations across Perth',
    contact: 'https://activatemh.com.au',
    eligibility: 'Adults (18+) experiencing or recovering from mental health challenges.',
    cost: 'Mostly free or low cost (depends on the event)',
    verifiedDate: '2026-02-24',
    tags: ['social', 'peer support', 'isolation', 'mental health', 'events']
  },
  {
    id: 'waamh',
    domain: ['mental-health'],
    org: 'Western Australian Association for Mental Health (WAAMH)',
    description: 'The peak body for community mental health in WA. They focus on systemic advocacy, training, and sector development rather than direct crisis care.',
    location: '1 Nash Street, Perth',
    contact: 'https://waamh.org.au',
    eligibility: 'Community organisations and individuals interested in mental health advocacy.',
    cost: 'Free for general information; training and membership have fees',
    verifiedDate: '2026-02-24',
    tags: ['peak body', 'advocacy', 'training', 'mental health']
  },

  // --- DIGITAL INCLUSION ---
  {
    id: 'wacoss-digital',
    domain: ['digital-inclusion'],
    org: 'WACOSS (WA Council of Social Service) - Digital Inclusion Project',
    description: 'A massive $3.9M Lotterywest-funded initiative training 1,500 frontline community service workers in Perth to help their clients navigate the digital world.',
    location: 'City West Lotteries House, 2 Delhi Street, West Perth',
    contact: 'digitalinclusion@wacoss.org.au',
    eligibility: 'Frontline community service workers in WA.',
    cost: 'Free for eligible workers',
    verifiedDate: '2026-02-24',
    tags: ['training', 'frontline workers', 'digital literacy', 'digital inclusion']
  },
  {
    id: 'linkwest',
    domain: ['digital-inclusion'],
    org: 'Linkwest',
    description: 'The peak body for over 140 Neighbourhood and Community Resource Centres in WA. Many of these centres offer direct digital literacy help and free computer access.',
    location: 'Perth, WA (Statewide network)',
    contact: 'https://linkwest.asn.au',
    eligibility: 'Open to the general public.',
    cost: 'Varies by centre (often free or very low cost)',
    verifiedDate: '2026-02-24',
    tags: ['neighbourhood centres', 'computer access', 'digital literacy', 'community']
  }
];

// Simple referral intelligence layer
export function findRelevantServices(needs: string[]): ServiceEntry[] {
  const normalizedNeeds = needs.map(n => n.toLowerCase());
  
  return PERTH_DIRECTORY.map(service => {
    // Score how well this service matches the needs
    let score = 0;
    
    // Direct domain match gives strong signal
    for (const domain of service.domain) {
      if (normalizedNeeds.some(n => n.includes(domain.replace('-', ' ')))) {
        score += 3;
      }
    }
    
    // Tag matches
    for (const tag of service.tags) {
      if (normalizedNeeds.some(n => n.includes(tag) || tag.includes(n))) {
        score += 2;
      }
    }
    
    // Text description match
    const textToSearch = (service.org + ' ' + service.description).toLowerCase();
    for (const need of normalizedNeeds) {
      if (textToSearch.includes(need)) {
        score += 1;
      }
    }
    
    return { service, score };
  })
  .filter(item => item.score > 0)
  .sort((a, b) => b.score - a.score)
  .map(item => item.service);
}
