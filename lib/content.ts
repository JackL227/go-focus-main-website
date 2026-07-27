/**
 * Every string on the site lives here. Components hold no hard-coded copy, so
 * the whole site can be reworded by editing this one file.
 */

/* ------------------------------------------------------------------ *
 * Site constants
 * ------------------------------------------------------------------ */

export const site = {
  name: 'GoFocus AI',
  tagline: 'Full stack advisory for small and medium enterprises.',
  url: 'https://gofocus.ai',

  // TODO — REPLACE BEFORE LAUNCH. The real iCloser booking link was not
  // supplied with the brief. Every CTA on the site reads from this constant,
  // so changing it here changes it everywhere.
  bookingUrl: 'https://icloser.ai/gofocus-REPLACE-ME',

  email: 'ethan@gofocus.ai',
  supportEmail: 'support@gofocus.ai',
  phone: '(514) 566-7802',
  phoneHref: '+15145667802',
  address: '5757 Boulevard Cavendish, Suite 560',
  city: 'Montreal, Quebec',
} as const;

export const nav = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
] as const;

/* ------------------------------------------------------------------ *
 * Sources — one master array. Pages render only what they cite.
 * ------------------------------------------------------------------ */

export const sourcesIntro =
  'Every market figure carries a published source. Internal figures are identified as internal.';

export const sources: Record<number, string> = {
  1: 'GoFocus internal records, 2023 to 2026. Attributed client revenue, ad spend managed, net return on ad spend and engagement count. Attributed revenue reflects client revenue generated under active GoFocus engagement across paid acquisition, systems and advisory work. Unaudited.',
  2: 'American Express and Small Business Saturday UK. SME Business Barometer, July 2026. Survey of 1,000 micro, small and medium sized business owners.',
  3: 'James Oldroyd, MIT Sloan School of Management, with InsideSales.com. Lead Response Management Study, 2007. Six companies, over 15,000 leads, over 100,000 call attempts.',
  4: 'Oldroyd, McElheran and Elkington. The Short Life of Online Sales Leads. Harvard Business Review, March 2011. Audit of 2,241 US companies.',
  5: 'Brynjolfsson, Li and Raymond. Generative AI at Work. Quarterly Journal of Economics, vol. 140 no. 2 (2025), pp. 889 to 942. Field study of 5,179 customer support agents.',
  6: 'FISART closed transaction analysis, thirteen service industries, Q1 2024 to Q4 2025, enterprise values $1M to $50M, as reported by Iconic. Owner dependence discount of 1.0x to 2.0x EBITDA, graded by severity.',
  7: 'CT Acquisitions, 2026 EBITDA and SDE multiple benchmarks, drawing on IBBA Market Pulse, GF Data and BizBuySell closed sale data.',
  8: 'SHRM and Gallup employee replacement cost benchmarks. 50 to 200 percent of annual salary depending on role and seniority.',
  9: 'GoFocus client records, 2023 to 2026. Client outcomes produced using GoFocus built systems and campaigns. Problem statements reflect the situation at the start of each engagement. Figures are client results, not GoFocus fees.',
};

/* ------------------------------------------------------------------ *
 * Shared blocks used on more than one route
 * ------------------------------------------------------------------ */

export const fit = {
  eyebrow: 'The fit',
  heading: 'Built for a specific operator.',
  builtForLabel: 'Built for',
  notBuiltForLabel: 'Not built for',
  builtFor: [
    'Owner led businesses with real revenue that have outgrown the founder doing everything.',
    'Companies where one process, one channel or one missing role is visibly the bottleneck.',
    'Operators who want the business off their desk rather than another marginal month of revenue.',
    'Firms willing to change the offer or the pricing if that is where the constraint actually is.',
    'People who want a partner accountable to the outcome, not a vendor accountable to a deliverable.',
  ],
  notBuiltFor: [
    'Pre revenue businesses still looking for a product or a market.',
    'Anyone wanting a course, a template or a campaign to run themselves.',
    'Businesses chasing a lead spike with no intention of building something durable.',
    'Owners who want to stay the bottleneck and keep every decision on their desk.',
    'Anyone expecting a guaranteed multiple. A re-rating is a market mechanism, not a promise.',
  ],
} as const;

export const process = {
  eyebrow: 'How we work',
  heading: 'Discovery before solution. Every time.',
  intro:
    'We do not price work we do not understand. By the time a number appears, both sides already agree on what the problem is.',
  steps: [
    {
      n: '01',
      title: 'Materials in advance',
      body: 'Our capabilities document goes out before the first call. You know who we are, what we have done and what things cost before you spend thirty minutes with us.',
    },
    {
      n: '02',
      title: 'Discovery, 30 minutes',
      body: 'We map the business: where revenue comes from, what the founder personally touches, where work queues up. No pitch. If we cannot see where value is available, we say so.',
    },
    {
      n: '03',
      title: 'Extended discovery',
      body: 'Where the business is larger or scope is wider, a second session with the department leads who own the functions involved. They will run the system after we leave.',
    },
    {
      n: '04',
      title: 'Written summary',
      body: 'A short document covering what we discussed and what we heard. Your internal conversation then happens with accurate material rather than a recollection.',
    },
    {
      n: '05',
      title: 'Scoped proposal',
      body: 'Scope, the reasoning behind any expected result, and pricing. Sent before the next call so you read it on your own time rather than watching us present it.',
    },
    {
      n: '06',
      title: 'Terms',
      body: 'We answer questions and agree scope. If the fit is not there we would rather find that here than three weeks into a build.',
    },
  ],
} as const;

/* ------------------------------------------------------------------ *
 * CTA band — default plus per-route variants
 * ------------------------------------------------------------------ */

export const ctaDefault = {
  heading: 'Let us find the constraint.',
  body: 'Thirty minutes, no pitch. If we cannot see where value is available in your business, we will tell you on the call.',
  button: 'Book a call',
} as const;

export const ctaVariants = {
  services: {
    heading: 'Not sure which one you need.',
    body: 'That is what discovery is for. Thirty minutes, and we tell you where the constraint actually sits.',
    button: 'Book a call',
  },
  work: {
    heading: 'Your business is not on this list yet.',
    body: 'Thirty minutes, no pitch. If we cannot see where value is available, we will say so on the call.',
    button: 'Book a call',
  },
  caseStudy: {
    heading: 'Same constraint in your business?',
    body: 'Thirty minutes to find out. We scope before we price, always.',
    button: 'Book a call',
  },
  pricing: {
    heading: 'Scope first, price second.',
    body: 'Book thirty minutes and we will tell you which capabilities your business actually needs.',
    button: 'Book a call',
  },
  about: ctaDefault,
} as const;

/* ------------------------------------------------------------------ *
 * Capabilities — the five functions
 * ------------------------------------------------------------------ */

export type Capability = {
  slug: string;
  n: string;
  title: string;
  oneLine: string;
  body: string;
  bullets: string[];
  price: string;
  priceCovers: string;
  caseSlug: string;
};

export const capabilities: Capability[] = [
  {
    slug: 'outbound',
    n: '01',
    title: 'Outbound',
    oneLine:
      'Owned cold email and LinkedIn infrastructure. The channel we run to build our own pipeline.',
    body: 'Owned cold email and LinkedIn infrastructure. Domains, inboxes, warming, list build, sequencing and reply handling. This is the channel we run to build our own pipeline, which is why we install it rather than describe it.',
    bullets: [
      'Domain and inbox fleet, built and warmed',
      'List build and targeting against a defined ICP',
      'Sequencing, reply handling and routing into the CRM',
      'Deliverability monitored as an ongoing function',
    ],
    price: '$8K – $25K',
    priceCovers:
      'Infrastructure build, list, sequencing, reply handling, ongoing management',
    caseSlug: 'team-sammut',
  },
  {
    slug: 'marketing',
    n: '02',
    title: 'Marketing',
    oneLine: 'Paid acquisition, funnel architecture, offer and pricing structure.',
    body: 'Paid acquisition on Meta and other cold channels, funnel architecture and creative. Where the constraint is positioning rather than traffic, the work starts with the offer and the pricing.',
    bullets: [
      'Cold paid acquisition, built and managed',
      'Funnel architecture and conversion process',
      'Offer structure and pricing restructure',
      'Creative built against the buyer, not the platform',
    ],
    price: '$10K – $30K',
    priceCovers: 'Paid acquisition, funnel build, offer and pricing restructure',
    caseSlug: 'inflomedia',
  },
  {
    slug: 'systems',
    n: '03',
    title: 'Systems architecture',
    oneLine:
      'The operating structure of the business, built so cash flow does not depend on the founder.',
    body: 'The operating structure of the business. Built so cash flow does not depend on the founder being in the room. This is the question a buyer, a lender and a partner all ask in different words, and it is the one most owner operated businesses answer badly.',
    bullets: [
      'Attribution wired to the payment processor, not a form fill',
      'Reporting produced continuously, not monthly by hand',
      'Documented process for each core function',
      'Routing and handoffs that survive a staffing change',
      'A management layer that can run the day without the founder in it',
    ],
    price: '$15K – $45K',
    priceCovers:
      'Attribution, reporting, documented process and operating structure',
    caseSlug: 'innoveum-solutions',
  },
  {
    slug: 'agentic',
    n: '04',
    title: 'Agentic systems',
    oneLine:
      'AI built against one defined process. Qualification, routing, follow up, reporting.',
    body: 'Custom AI built against one defined process, not a general assistant bolted onto the business.',
    bullets: [
      'Lead qualification and routing to the right person',
      'Follow up that runs without being remembered',
      'Post service reporting and audit documentation',
      'Financial or eligibility qualification before a call is booked',
      'Internal knowledge capture from calls and delivery',
    ],
    price: '$12K – $40K',
    priceCovers: 'Custom AI build against a defined process, deployed and maintained',
    caseSlug: 'daniel-fhima-consulting',
  },
  {
    slug: 'talent',
    n: '05',
    title: 'Talent placement',
    oneLine:
      'We source and place whichever role the business is missing, and onboard them.',
    body: 'We source, vet and onboard whichever role the business is missing, into a system that already exists. That is what makes a placement hold rather than churn.',
    bullets: [
      'Setting and closing',
      'Operations and delivery management',
      'Finance and administration',
      'Technical, engineering and client success',
    ],
    price: '$6K – $15K per seat',
    priceCovers: 'Sourcing, vetting and onboarding, per seat',
    caseSlug: 'innoveum-solutions',
  },
];

export const capabilitiesClosing =
  'Outbound and marketing raise volume. Systems and agentic tooling absorb it without adding headcount. Talent is placed only where a person is genuinely required, into a structure that already runs.';

/* ------------------------------------------------------------------ *
 * Case studies
 * ------------------------------------------------------------------ */

export type CaseStudy = {
  slug: string;
  name: string;
  sector: string;
  filter: string;
  capabilities: string[];
  reference: boolean;
  problem: string;
  solution: string;
  result: string;
  /** Rendered as a pull-quote when present. Never invent one. */
  quote?: { text: string; attribution: string };
  logo?: string | null;
};

export const cases: CaseStudy[] = [
  {
    slug: 'innoveum-solutions',
    name: 'Innoveum Solutions',
    sector: 'Engineering, residential and commercial',
    filter: 'Engineering',
    capabilities: ['marketing', 'systems', 'agentic'],
    reference: true,
    problem:
      'Post inspection and audit reporting was manual, so engineers spent billable hours writing documents. Top of funnel was referral dependent with no repeatable source of new work.',
    solution:
      'Targeted B2B campaigns to build a repeatable pipeline, plus custom AI generating reporting from inspection data. Attribution wired to their payment processor.',
    result:
      '$1M+ in revenue attributed in year one, measured in their own dashboard. About 2 hours per day recovered per operator, sustained over 12 months.',
    logo: null,
  },
  {
    slug: 'baystone-media',
    name: 'Baystone Media',
    sector: 'Growth agency serving RIA firms',
    filter: 'Agencies',
    capabilities: ['marketing', 'systems'],
    reference: true,
    problem:
      'Revenue was inconsistent at roughly $7K per month, with acquisition running on founder led referral and no mechanism to warm prospects before a sales call.',
    solution:
      'Acquisition rebuilt end to end, funnel architecture, and pre selling systems that qualified and warmed prospects before a call was booked.',
    result:
      'Grew from $7K per month to $92K per month over 12 months, a 13x increase in monthly revenue.',
    logo: null,
  },
  {
    slug: 'daniel-fhima-consulting',
    name: 'Daniel Fhima Consulting',
    sector: 'Advisory to vehicle aesthetics businesses',
    filter: 'Agencies',
    capabilities: ['agentic'],
    reference: true,
    problem:
      'His clients were losing booked work to slow response. He had no product he could deploy across his book, so every engagement was delivered by hand.',
    solution:
      'Custom AI that engages and closes inbound for his clients, built once and deployed across his entire client base as a standard part of his offer.',
    result:
      'At one client, about 2 hours per day recovered and an 18 percent rise in sales revenue against the prior month. Now standard across his book.',
    logo: null,
  },
  {
    slug: 'savard-digital',
    name: 'Savard Digital',
    sector: 'B2B services',
    filter: 'Agencies',
    capabilities: ['marketing'],
    reference: false,
    problem:
      'The offer was structured so pricing did not reflect the value delivered, leaving revenue on the table on every closed deal and making the sales conversation harder than it needed to be.',
    solution:
      'Repositioned the B2B offer and rebuilt the pricing structure around outcome rather than deliverable.',
    result:
      '$37K cash collected within the first seven days of the engagement, on repositioning and pricing alone.',
    logo: null,
  },
  {
    slug: 'inflomedia',
    name: 'InfloMedia',
    sector: 'B2B paid acquisition agency',
    filter: 'Agencies',
    capabilities: ['marketing'],
    reference: false,
    problem:
      'Positioned generically against a crowded market, which capped deal size and forced competition on price. Their own pipeline was neglected while servicing clients.',
    solution:
      'Repositioning to support larger deals and higher pricing, plus a Meta acquisition system run on their behalf so their pipeline stopped depending on spare capacity.',
    result:
      '287 qualified leads over eight months at an 8.9x return on ad spend, against a repositioned offer.',
    logo: null,
  },
  {
    slug: 'team-sammut',
    name: 'Team Sammut',
    sector: 'Real estate, Western Australia',
    filter: 'Real estate',
    capabilities: ['outbound', 'agentic'],
    reference: false,
    problem:
      'A four time award winning firm where inbound enquiry was handled inconsistently and routed by hand, so leads reached the wrong agent or reached them late.',
    solution:
      'Outbound acquisition process plus a custom AI system that qualifies each enquiry and routes it to the correct agent automatically.',
    result:
      'Customer acquisition increased through the combined outbound and routing system, with enquiry handling no longer dependent on who happened to be available.',
    logo: null,
  },
  {
    slug: 'deli770',
    name: 'Deli770 Hospitality Group',
    sector: 'Hospitality',
    filter: 'Hospitality',
    capabilities: ['systems'],
    reference: false,
    problem:
      'Service quality lived in the heads of experienced staff. With one location that works. It does not survive a second or third site, which made expansion the risk rather than the opportunity.',
    solution:
      'Backend systems capturing post service customer experience and feeding it directly into staff training, paired with ongoing advisory on the expansion structure.',
    result:
      'Locations acquired and expansion under way in Florida, with New York planned by 2030.',
    logo: null,
  },
  {
    slug: 'brsts-uk',
    name: 'BRSTS UK',
    sector: 'Building compliance advisory',
    filter: 'Engineering',
    capabilities: ['outbound', 'systems'],
    reference: false,
    problem:
      'Expertise sat with a small number of people and revenue was project by project. No mechanism existed to reach the market at scale or convert interest into a paid relationship.',
    solution:
      'A custom built platform delivering a training and certification program used as a free entry point, followed by ascension funnels into paid programs.',
    result:
      'Top of funnel rebuilt around an owned platform rather than outbound effort, with a defined path from free certification into paid engagement.',
    logo: null,
  },
  {
    slug: 'cloud-care-towels',
    name: 'Cloud Care Towels',
    sector: 'Consumer products',
    filter: 'Consumer',
    capabilities: ['marketing'],
    reference: false,
    problem:
      'Entirely direct to consumer, competing on paid acquisition against every other consumer brand, with no B2B channel and no recurring institutional revenue.',
    solution:
      'Campaigns built to open a B2B channel, targeting hospitality groups and yoga studios where the product has repeat institutional demand.',
    result:
      'Moved from solely direct to consumer into stocked distribution across five Montreal locations.',
    logo: null,
  },
];

export const workFootnote =
  'GoFocus client records, 2023 to 2026. Problem statements reflect the situation at the start of each engagement. Figures are client outcomes produced using GoFocus built systems and campaigns, not GoFocus fees. Unaudited.';

export const workFilters = [
  'All',
  'Engineering',
  'Agencies',
  'Real estate',
  'Hospitality',
  'Consumer',
] as const;

/* ------------------------------------------------------------------ *
 * Home
 * ------------------------------------------------------------------ */

export const home = {
  hero: {
    eyebrow: 'Acquisition · Systems · AI · Talent',
    h1: "Full Stack Advisory for SME's",
    standfirst:
      'We remove the constraint holding a business back, whether it sits in acquisition, in a process the founder personally runs, or in a role nobody has filled.',
    primary: 'Book a call',
    secondary: 'See the work',
  },
  clientBar: {
    label: 'Trusted by teams backed by',
    // Assets were not supplied with the brief. A null src hides the logo
    // rather than shipping a placeholder wordmark.
    logos: [
      { name: 'Ford', src: null, aspect: 2.4 },
      { name: 'Hyundai', src: null, aspect: 5.2 },
      { name: 'Coca-Cola', src: null, aspect: 3.4 },
      { name: 'Maropost', src: null, aspect: 4.1 },
      { name: 'Vidyard', src: null, aspect: 3.8 },
    ] as { name: string; src: string | null; aspect: number }[],
  },
  stats: [
    { value: '$28M+', label: 'Client revenue attributed', cite: 1 },
    { value: '$2M+', label: 'Client ad spend managed', cite: 1 },
    { value: '6.2x', label: 'Net return on ad spend', cite: 1 },
    { value: '50+', label: 'Engagements since 2023', cite: 1 },
  ],
  positioning: {
    eyebrow: 'What we do',
    heading: 'Operators who build the system, not an agency that rents you one.',
    paragraphs: [
      'Most firms in this market sell you one thing. An agency rents you attention and goes quiet when the retainer stops. A software shop hands you a tool and a login. A recruiter fills a seat into a process that does not exist yet.',
      'We work the whole constraint. If acquisition is the bottleneck we build the channel. If the bottleneck is that the founder personally touches every job, we build the operating structure that removes him from it. If the business needs a person, we place one into a system that already runs.',
      'Scoped per engagement, not sold as a fixed product. We stay on contract as the business changes.',
    ],
  },
  constraint: {
    eyebrow: 'The constraint',
    heading: 'The person who should be selling is reconciling.',
    body: 'A survey of 1,000 owners of micro, small and medium sized businesses found owners spend an average of 11 hours a week on administrative and finance work, about six working days a month. The same owners reported 3.6 days a month on sales and business development.',
    bodyCite: 2,
    figures: [
      { value: '54%', label: 'say paperwork gets in the way of running the business', cite: 2 },
      {
        value: '36%',
        label: 'name their own capacity as the single largest barrier to growth',
        cite: 2,
      },
    ],
    chart: {
      title: 'Owner time, working days per month',
      max: 8,
      bars: [
        { label: 'Administrative and finance', value: 6.0, fill: 'var(--blue)' },
        { label: 'Sales and business development', value: 3.6, fill: '#aec2dc' },
      ],
    },
  },
  capabilities: {
    eyebrow: 'Capabilities',
    heading: 'Five functions. One engagement.',
    intro: 'Most engagements start with one and expand as the next constraint appears.',
    link: 'See all five in detail',
  },
  work: {
    eyebrow: 'Track record',
    heading: 'The problem we found, the work we did, what happened.',
    featured: ['innoveum-solutions', 'baystone-media', 'daniel-fhima-consulting'],
    link: 'All nine engagements',
  },
} as const;

/* ------------------------------------------------------------------ *
 * Services
 * ------------------------------------------------------------------ */

export const services = {
  header: {
    breadcrumb: 'Services',
    h1: 'Five functions. One engagement.',
    standfirst:
      'We scope per engagement rather than sell a fixed product. Most businesses start with one capability and expand as the next constraint appears.',
    meta: ['Scoped per engagement', '$6K to $100K+', 'Reference calls available'],
  },
  enterpriseValue: {
    eyebrow: 'Why it matters',
    heading: 'The largest discount a buyer applies is the founder.',
    body1:
      'An analysis of closed transactions across thirteen service industries, covering enterprise values from $1M to $50M, found owner dependent businesses sell at a 1.0x to 2.0x EBITDA discount against management run peers in the same industry tier.',
    body1Cite: 6,
    table: {
      head: ['Level of dependence', 'Multiple impact'],
      rows: [
        ['Owner dependent, holds all relationships', '1.5x discount'],
        ['Moderate, leadership partly in place', '1.0x discount'],
        ['Owner independent, management runs it', 'No discount'],
      ],
    },
    body2:
      'We do not claim that adopting AI raises a multiple. The published premium sits with AI native software companies, not with service businesses. What is documented is that founder dependence carries a discount, and that systems are what remove it.',
    leversLabel: 'What moves it',
    levers: [
      {
        title: 'Human capital',
        value: '50–200%',
        body: "of annual salary is the cost to replace one employee. Systems that hold process knowledge outside one person's head reduce that exposure directly.",
        cite: 8,
      },
      {
        title: 'Revenue velocity',
        value: '21x',
        body: 'better qualification odds from responding in five minutes rather than thirty. Speed is an infrastructure problem, not an effort problem.',
        cite: 3,
      },
      {
        title: 'Throughput',
        value: '14–34%',
        body: 'measured output gain per worker from generative AI in live commercial work, concentrated in less experienced staff.',
        cite: 5,
      },
      {
        title: 'Transferability',
        value: '1.0–2.0x',
        body: 'of EBITDA is the discount buyers apply to owner dependent businesses. The largest recoverable item in a sale.',
        cite: 6,
      },
    ],
  },
  outboundTable: {
    head: ['Rented channel', 'Owned channel'],
    rows: [
      ['Cost scales linearly with volume', 'Fixed infrastructure cost, volume is marginal'],
      ['Access ends when spend ends', 'The channel remains an asset of the business'],
      ['Targeting controlled by the platform', 'Targeting controlled by the operator'],
    ],
  },
  extras: {
    marketing: {
      stat: '$2M+ in client ad spend managed at an average 6.2x net return on ad spend.',
      cite: 1,
    },
    systems: {
      callout: 'Marketing raises revenue. Systems raise what that revenue is worth.',
    },
    agentic: {
      stat: 'About 2 hours per operator per day recovered from manual work. Average measured across client engagements in different industries.',
      cite: 9,
    },
    talent: {
      note: 'Replacing one employee costs 50 to 200 percent of annual salary. Placing into a defined system is what keeps that cost from recurring.',
      cite: 8,
    },
  },
  connect: {
    body: 'Outbound and marketing raise volume. Systems and agentic tooling absorb it without adding headcount. Talent is placed only where a person is genuinely required, into a structure that already runs. Most engagements start with one of the five and expand as the next constraint appears.',
  },
} as const;

/* ------------------------------------------------------------------ *
 * Work index header
 * ------------------------------------------------------------------ */

export const work = {
  header: {
    breadcrumb: 'Work',
    h1: 'The problem we found, the work we did, what happened.',
    standfirst:
      'Nine engagements since 2023, across engineering, real estate, hospitality, financial advisory and agencies. Figures are client outcomes, not our fees.',
    meta: ['9 engagements', '2023 to 2026', '3 live references'],
  },
} as const;

/* ------------------------------------------------------------------ *
 * Pricing
 * ------------------------------------------------------------------ */

export const pricing = {
  header: {
    breadcrumb: 'Pricing',
    h1: 'Priced per capability, scoped per business.',
    standfirst:
      'The bands below are starting points, not a price list. Where scope is unclear at the outset we run discovery first and price after.',
  },
  tableHead: ['Capability', 'What it covers', 'Typical range'],
  advisory: {
    label: 'Full advisory',
    figure: '$50,000 – $100,000+',
    body: 'All five capabilities, embedded, with a quarterly roadmap.',
    button: 'Book a call',
  },
  included: {
    eyebrow: 'Included',
    heading: 'What you get regardless of scope.',
    items: [
      'A written scope agreed before any work starts, and before any invoice.',
      'Attribution you can open and read yourself, not a monthly report we assemble.',
      'Documentation for anything we build, written so your team can operate it.',
      'Ownership. Infrastructure and systems stay with the business if we stop working together.',
      'Direct access to the people doing the work, not an account manager relaying messages.',
    ],
  },
} as const;

/* ------------------------------------------------------------------ *
 * About
 * ------------------------------------------------------------------ */

export const about = {
  header: {
    breadcrumb: 'About',
    h1: 'Operators who build the system, not an agency that rents you one.',
    standfirst:
      'GoFocus AI works with small and medium enterprises to remove the constraint holding back growth. Operating since 2023, based in Montreal.',
  },
  why: {
    eyebrow: 'Why we built it',
    heading: 'Most firms sell one thing. The constraint is rarely one thing.',
    paragraphs: [
      'An agency rents you attention and goes quiet when the retainer stops. A software shop hands you a tool and a login. A recruiter fills a seat into a process that does not exist yet. Each of them is selling their own capability rather than solving your problem, which works fine when your problem happens to match what they sell.',
      'It usually does not. A business with a lead problem often has a pricing problem. A business that cannot hire often has a process problem, because there is nothing for the new person to step into. Fix the visible symptom and the constraint moves somewhere else.',
      'So we work the whole thing. Acquisition, the operating structure underneath it, the AI that carries the volume, and the people who run it. Scoped per engagement, because the constraint is different in every business.',
    ],
  },
  firm: {
    eyebrow: 'The firm',
    heading: 'Who does the work.',
    people: [
      {
        name: 'Ethan Bouganim',
        role: 'Co-Founder, Strategy & Acquisition',
        bio: 'Leads positioning, commercial strategy and engagement scoping. The work behind $28M+ in attributed client revenue and $2M+ in managed ad spend across fifty plus engagements since 2023. Systems built under his direction have been deployed into engagements serving Fortune 500 and enterprise clients.',
        photo: null,
      },
      {
        name: 'Jack Lassner',
        role: 'Co-Founder, Technical',
        bio: 'Leads engineering across systems architecture and agentic builds. Keeps GoFocus at the front of what AI actually delivers in production rather than in demos, and owns the attribution layer. Clients see exactly what each system generates, wired to the payment processor, with no room left to guess.',
        photo: null,
      },
      {
        name: 'Jake Woolf',
        role: 'Head of Client Success',
        bio: 'Owns the client relationship from onboarding through delivery. Scaled an insurance brokerage from single digit headcount to over 30 staff, building the operating and service structure that carried it.',
        photo: null,
      },
    ] as { name: string; role: string; bio: string; photo: string | null }[],
    footer:
      'Operating since 2023. Based in Montreal. Client work delivered across North America, South America, Europe and Australia.',
  },
} as const;

/* ------------------------------------------------------------------ *
 * Contact
 * ------------------------------------------------------------------ */

export const contact = {
  header: {
    breadcrumb: 'Contact',
    h1: 'Let us find the constraint.',
    standfirst:
      'Thirty minutes, no pitch. If we cannot see where value is available in your business, we will tell you on the call.',
  },
  faq: {
    eyebrow: 'Questions',
    heading: 'The things worth asking anyone.',
    items: [
      {
        q: 'Do you specialise in my industry?',
        a: 'Delivery is industry agnostic by design. The constraints we remove, founder dependence, slow response, manual process and missing roles, are the same across sectors. Our engagements span engineering, real estate, hospitality, financial advisory and agencies.',
      },
      {
        q: 'How is this different from an agency?',
        a: 'An agency rents you attention and goes quiet when the retainer stops. We build infrastructure that stays with the business. Outbound in particular is an owned channel that remains an asset of yours rather than access you rent from us.',
      },
      {
        q: 'Do we own what you build?',
        a: 'Yes. Infrastructure, systems and documentation are built to be operated by your team. We are not trying to make ourselves permanent.',
      },
      {
        q: 'What happens if it does not work?',
        a: 'Scope is defined before anyone commits, and discovery happens before pricing. If we cannot see where value is available on the first call, we say so rather than sell you something. That is cheaper for both of us than finding out later.',
      },
      {
        q: 'How long before we see anything?',
        a: 'It depends on the capability. Repositioning and pricing work has produced collected revenue inside a week. Systems and agentic builds run longer, and outbound infrastructure needs a warming period before volume. The proposal gives you the honest timeline.',
      },
      {
        q: 'Can we talk to your clients?',
        a: 'Yes. Three clients have agreed to take reference calls. We introduce you directly rather than send you a written quote.',
      },
      {
        q: 'Do you guarantee a result?',
        a: 'No. What we control is the system we build and the standard we build it to. Outcomes vary by operator and market and are not typical. Be careful with anyone who tells you otherwise.',
      },
      {
        q: 'Who actually does the work?',
        a: 'We do. Engineering is in house under Jack. Strategy and engagement scoping sit with Ethan. Delivery is owned end to end by Jake. We do not resell an outsourced build under our name.',
      },
    ],
  },
  form: {
    revenueOptions: [
      'Under $1M',
      '$1M – $5M',
      '$5M – $20M',
      'Over $20M',
    ],
    success: 'Got it. We will come back to you within one working day.',
    error: 'Could not save that. Try again.',
  },
} as const;

/* ------------------------------------------------------------------ *
 * Photography. A null src hides the slot rather than leaving a gap.
 * Placeholders render as hatched grey stamped PLACEHOLDER so they
 * cannot ship by accident.
 * ------------------------------------------------------------------ */

export const photos: Record<string, { src: string | null; alt: string; caption?: string }> = {
  wide: {
    src: null,
    alt: 'The GoFocus team at work in the Montreal office',
    caption: 'Montreal, 2026',
  },
  work: { src: null, alt: 'A system being built on screen' },
  about: { src: null, alt: 'The GoFocus team in conversation' },
};
