import { BadgeDefinition, CompetencyId, FieldGuideEntry, LevelConfig } from '../types/game';

export const COMPETENCY_META: Record<
  CompetencyId,
  { label: string; shortLabel: string; colorClass: string; barColor: string }
> = {
  classification: {
    label: 'CapEx vs. OpEx Classification',
    shortLabel: 'Classification',
    colorClass: 'text-blue-700',
    barColor: 'bg-blue-600',
  },
  accounting: {
    label: 'Financial Statements & IFRS',
    shortLabel: 'IFRS & Statements',
    colorClass: 'text-emerald-700',
    barColor: 'bg-emerald-600',
  },
  audit: {
    label: 'Audit & Misclassification Control',
    shortLabel: 'Audit Control',
    colorClass: 'text-rose-700',
    barColor: 'bg-rose-600',
  },
  'capex-planning': {
    label: 'Stage-Gate & Capital Phasing',
    shortLabel: 'CapEx Planning',
    colorClass: 'text-indigo-700',
    barColor: 'bg-indigo-600',
  },
  'opex-planning': {
    label: 'Zero-Based OpEx & Maintenance',
    shortLabel: 'OpEx Optimization',
    colorClass: 'text-amber-700',
    barColor: 'bg-amber-600',
  },
  'tco-forecasting': {
    label: 'TCO Iceberg & Rolling Forecasts',
    shortLabel: 'TCO & Forecasting',
    colorClass: 'text-teal-700',
    barColor: 'bg-teal-600',
  },
};

export const BADGES: BadgeDefinition[] = [
  {
    id: 'first-track',
    title: 'First Track Laid',
    description: 'Complete Level 1 and master core CapEx vs. OpEx classification.',
    day: 1,
    color: 'blue',
  },
  {
    id: 'ifrs-navigator',
    title: 'IFRS Trinity Navigator',
    description: 'Complete Level 2 with knowledge of Balance Sheet, P&L, Cash Flow, and IFRS 16.',
    day: 1,
    color: 'emerald',
  },
  {
    id: 'audit-shield',
    title: 'Audit Trail Guardian',
    description: 'Spot classification traps in Level 3 before external auditors catch them.',
    day: 1,
    color: 'rose',
  },
  {
    id: 'day1-certified',
    title: 'Day 1 Certified Strategist',
    description: 'Conquer all 4 Day 1 levels including the Corridor Case Trials.',
    day: 1,
    color: 'amber',
  },
  {
    id: 'stage-gate-commander',
    title: 'Stage-Gate Commander',
    description: 'Balance S-Curve capital phasing and P80 contingency in Level 5.',
    day: 2,
    color: 'blue',
  },
  {
    id: 'iceberg-diver',
    title: 'TCO Iceberg Master',
    description: 'Optimize 30-year desert lifecycle costs beyond upfront sticker price.',
    day: 2,
    color: 'emerald',
  },
  {
    id: 'academy-graduate',
    title: 'Executive Finance Master',
    description: 'Complete all 8 levels across Days 1 & 2 of the course.',
    day: 'both',
    color: 'amber',
  },
];

export const LEVELS: LevelConfig[] = [
  // =========================================================================
  // DAY 1 — LEVEL 1
  // =========================================================================
  {
    id: 1,
    day: 1,
    moduleName: 'Module 1 · Fundamentals & Cost Classification',
    topicTag: 'Topic 1 · Core Definitions',
    title: 'The Classifier Station',
    subtitle: 'Route railway spending onto the Balance Sheet (CapEx) or Income Statement (OpEx).',
    mechanic: 'classifier',
    competency: 'classification',
    accentColor: 'blue',
    estimatedMinutes: 3,
    xpReward: 150,
    briefing: {
      objective:
        'Correctly classify 8 real railway expenditure tickets into Capital Expenditure (CapEx) or Operational Expenditure (OpEx) and watch how each choice moves the Balance Sheet vs. EBITDA.',
      howToPlay: [
        'Read each expenditure ticket carefully — check the asset lifespan, monetary materiality, and whether it creates/extends capacity or simply maintains daily operations.',
        'Choose either CapEx (Balance Sheet) or OpEx (Income Statement) to route the ticket.',
        'Review the instant financial explanation before advancing to the next step.',
      ],
      keyRules: [
        {
          title: 'CapEx (> 12 Months)',
          summary:
            'Acquires, constructs, or extends the useful life/capacity of physical (PP&E) or intangible long-term assets on the Balance Sheet.',
        },
        {
          title: 'OpEx (Current Period)',
          summary:
            'Ongoing daily running costs, routine maintenance, and items below the corporate materiality threshold — expensed immediately on the P&L.',
        },
      ],
    },
    steps: [
      {
        id: 'l1-s1',
        kind: 'classifier',
        title: 'Acquire 4 Diesel-Electric Locomotives',
        department: 'Rolling Stock Fleet',
        amountSar: '120,000,000 SAR',
        usefulLife: '30 Years',
        scenario:
          'Purchase four new heavy-haul locomotives to expand mineral freight capacity along the North-South corridor.',
        correctAnswer: 'CAPEX',
        subLabel: 'Tangible PP&E · Balance Sheet',
        hint: 'Does this generate economic benefits beyond 12 months and exceed capitalization thresholds?',
        explanation:
          'Acquiring new locomotives creates long-term Property, Plant & Equipment (PP&E) with a 25–35 year economic life. It is capitalized on the Balance Sheet and depreciated over time.',
        takeaway: 'New long-term physical fleet assets are classic Tangible CapEx.',
      },
      {
        id: 'l1-s2',
        kind: 'classifier',
        title: 'Monthly Diesel Fuel Consumption',
        department: 'Freight Operations',
        amountSar: '4,200,000 SAR',
        usefulLife: 'Consumed Immediately',
        scenario:
          'Heavy diesel fuel burned during scheduled mineral haulage runs from northern mines to Ras Al-Khair port.',
        correctAnswer: 'OPEX',
        subLabel: 'Direct OpEx · P&L Matching Principle',
        hint: 'Is the economic benefit consumed inside the current accounting period?',
        explanation:
          'Fuel is completely consumed during active train operations to generate current-period freight revenue. Under the accrual matching principle, it hits the P&L directly as Direct OpEx.',
        takeaway: 'Consumables burned in daily service are Direct OpEx and reduce EBITDA immediately.',
      },
      {
        id: 'l1-s3',
        kind: 'classifier',
        title: 'Standard Track Tools & Depot Laptops',
        department: 'Regional Maintenance Depot',
        amountSar: '8,500 SAR / unit',
        usefulLife: '3 Years Physical Life',
        scenario:
          'Purchase of 25 ruggedized laptops and hand tools, each costing 8,500 SAR — below the company’s 37,500 SAR ($10,000) materiality threshold.',
        correctAnswer: 'OPEX',
        subLabel: 'Below Materiality Threshold',
        hint: 'Check the corporate capitalization threshold rule (Materiality) even if physical life > 1 year!',
        explanation:
          'Items below the formal capitalization threshold are expensed immediately as OpEx regardless of their 3-year physical lifespan, preventing administrative burden tracking minor assets.',
        takeaway: 'Materiality thresholds override physical lifespan for low-value items.',
      },
      {
        id: 'l1-s4',
        kind: 'classifier',
        title: 'Routine Passenger Coach Repainting',
        department: 'Passenger Fleet Care',
        amountSar: '1,850,000 SAR',
        usefulLife: 'Preserves Original Condition',
        scenario:
          'Repainting exterior coach livery and replacing worn brake shoes across 12 passenger cars to maintain original appearance and safety.',
        correctAnswer: 'OPEX',
        subLabel: 'Routine Maintenance · No Life Extension',
        hint: 'Does repainting extend the train’s designed structural lifespan or add capacity?',
        explanation:
          'Repainting and replacing wear-and-tear brake pads merely restores the asset to its intended baseline operating condition without extending useful life.',
        takeaway: 'Routine upkeep that preserves baseline performance is always OpEx.',
      },
      {
        id: 'l1-s5',
        kind: 'classifier',
        title: 'Custom Railway Dispatching Software Platform',
        department: 'Digital Rail Systems',
        amountSar: '18,000,000 SAR',
        usefulLife: '10 Years (Owned IP)',
        scenario:
          'Development-phase engineering and ownership of a proprietary centralized train dispatching platform owned and controlled by the railway.',
        correctAnswer: 'CAPEX',
        subLabel: 'Intangible Asset (IAS 38)',
        hint: 'Can non-physical assets be capitalized if the organization owns and controls them?',
        explanation:
          'Under IAS 38, owned and identifiable custom software platforms that deliver multi-year economic benefits qualify as Intangible CapEx and are amortized over their useful life.',
        takeaway: 'Owned software with controlled IP is Intangible CapEx (amortized, not depreciated).',
      },
      {
        id: 'l1-s6',
        kind: 'classifier',
        title: 'Complete Locomotive Re-Engining Upgrade',
        department: 'Heavy Overhaul Workshop',
        amountSar: '9,500,000 SAR',
        usefulLife: '+15 Years Extended Life',
        scenario:
          'Extracting an aging locomotive engine and installing a next-generation high-efficiency power unit that extends operational life by 15 years.',
        correctAnswer: 'CAPEX',
        subLabel: 'Asset Extension & Enhancement',
        hint: 'Does this materially extend useful life and upgrade performance beyond baseline?',
        explanation:
          'Complete re-engining materially extends the locomotive’s productive lifespan and cuts fuel burn. Under IAS 16, it is capitalized (while derecognizing any remaining value of the old engine).',
        takeaway: 'Expenditures that extend useful life or boost capacity are CapEx.',
      },
      {
        id: 'l1-s7',
        kind: 'classifier',
        title: 'Land Acquisition for Riyadh Freight Intermodal Hub',
        department: 'Corridor Infrastructure',
        amountSar: '65,000,000 SAR',
        usefulLife: 'Indefinite Ownership',
        scenario:
          'Outright purchase of 120 hectares of industrial corridor land to build a new container-to-rail intermodal yard.',
        correctAnswer: 'CAPEX',
        subLabel: 'Non-Depreciable Tangible PP&E (Land)',
        hint: 'Land has an unlimited useful life — is its acquisition still Capital Expenditure on the Balance Sheet?',
        explanation:
          'Land acquisition is classic Tangible CapEx (PP&E) recorded on the Balance Sheet at historical cost. Unlike buildings or locomotives, freehold land is not depreciated because its useful life is indefinite.',
        takeaway: 'Freehold land purchases are Tangible CapEx (recorded on PP&E, not depreciated).',
      },
      {
        id: 'l1-s8',
        kind: 'classifier',
        title: 'Annual Network Liability Insurance & Patrol Security',
        department: 'Corporate Risk & Safety',
        amountSar: '7,800,000 SAR / yr',
        usefulLife: '12-Month Coverage Policy',
        scenario:
          'Annual all-risk operational insurance premium plus contracted right-of-way patrol guards protecting active rail corridors this year.',
        correctAnswer: 'OPEX',
        subLabel: 'Fixed Administrative & Safety OpEx',
        hint: 'Does an annual insurance policy or guard patrol create a multi-year Balance Sheet asset?',
        explanation:
          'Ongoing safety patrols and annual insurance coverage protect active operations during the current 12-month period without constructing or upgrading physical assets, making them recurring OpEx.',
        takeaway: 'Annual insurance premiums and ongoing corridor security are recurring OpEx.',
      },
    ],
  },

  // =========================================================================
  // DAY 1 — LEVEL 2
  // =========================================================================
  {
    id: 2,
    day: 1,
    moduleName: 'Module 1 · Accounting & IFRS Implications',
    topicTag: 'Topics 2 & 3 · Financial Trinity & IFRS',
    title: 'The Financial Trinity Lab',
    subtitle: 'Trace Balance Sheet, P&L, Cash Flow ripples, depreciation methods, CWIP, and IFRS 16.',
    mechanic: 'trinity-lab',
    competency: 'accounting',
    accentColor: 'emerald',
    estimatedMinutes: 3,
    xpReward: 180,
    briefing: {
      objective:
        'Master how CapEx and OpEx ripple across the three financial statements simultaneously, and apply IAS 16 component depreciation, Free Cash Flow, CWIP handover rules, and IFRS 16 lease rules.',
      howToPlay: [
        'Inspect the financial statement context box on each challenge.',
        'Select the single most accurate accounting treatment or impact.',
        'Use the Hint button anytime if you need a refresher on the IFRS principle.',
      ],
      keyRules: [
        {
          title: 'The Financial Trinity',
          summary:
            'CapEx hits Balance Sheet (PP&E) + Cash Flow (Investing) on Day 1; EBITDA is untouched until non-cash Depreciation flows later.',
        },
        {
          title: 'CWIP & IFRS 16',
          summary:
            'Zero depreciation is charged while in CWIP. Under IFRS 16, leases >12 months and >$5,000 require a Right-of-Use (ROU) Asset.',
        },
      ],
    },
    steps: [
      {
        id: 'l2-s1',
        kind: 'choice',
        badgeText: 'Financial Statements Trinity',
        prompt:
          'The railway pays 50,000,000 SAR cash to acquire a new high-speed signaling control center. How does this transaction appear across the three financial statements on Day 1?',
        contextBox: {
          title: 'Transaction Snapshot',
          metrics: [
            { label: 'Outlay', value: '50,000,000 SAR' },
            { label: 'Payment', value: 'Immediate Cash' },
            { label: 'EBITDA Impact', value: '?' },
          ],
        },
        options: [
          {
            id: 'a',
            label: 'Increases Non-Current Assets (Balance Sheet) & Investing Cash Outflow; zero Day-1 EBITDA impact',
            detail: 'Depreciation starts only after commissioning, below the EBITDA line.',
          },
          {
            id: 'b',
            label: 'Reduces EBITDA by 50M SAR immediately on the Income Statement',
            detail: 'Treats the entire capital asset as a current-period operating expense.',
          },
          {
            id: 'c',
            label: 'Appears only in Operating Cash Flow with no Balance Sheet entry',
            detail: 'Omits Non-Current Asset recognition.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Remember: CapEx does not reduce EBITDA on acquisition day — it sits on the Balance Sheet first.',
        explanation:
          'CapEx converts cash into a Non-Current Asset (PP&E) on the Balance Sheet and records an Investing Cash Outflow. EBITDA is unaffected because depreciation is recognized later below the EBITDA line.',
        takeaway: 'CapEx preserves Day-1 EBITDA while expanding Balance Sheet PP&E.',
      },
      {
        id: 'l2-s2',
        kind: 'choice',
        badgeText: 'Non-Cash OpEx & Cash Flow',
        prompt:
          'Annual Depreciation & Amortization (D&A) on the Income Statement totals 50,000,000 SAR. Why is D&A described as a "non-cash OpEx"?',
        options: [
          {
            id: 'a',
            label: 'It reduces Operating Profit (EBIT) without any current-period cash outflow',
            detail: 'The cash was already spent during the initial CapEx phase.',
          },
          {
            id: 'b',
            label: 'It is paid directly to tax authorities in cash every December',
            detail: 'Confuses accounting allocation with cash tax payments.',
          },
          {
            id: 'c',
            label: 'It reduces EBITDA dollar-for-dollar before operating profit',
            detail: 'Remember what "DA" in EBITDA stands for!',
          },
        ],
        correctOptionId: 'a',
        hint: 'EBITDA means Earnings Before Interest, Taxes, Depreciation, and Amortization.',
        explanation:
          'D&A systematically allocates historical CapEx over the asset’s useful life. It reduces EBIT (Operating Profit) to match asset wear with revenue, yet involves zero cash outflow today.',
        takeaway: 'D&A is non-cash OpEx: it lowers EBIT, sits below EBITDA, and requires no new cash.',
      },
      {
        id: 'l2-s3',
        kind: 'choice',
        badgeText: 'Depreciation Methods · Subtopic 2.6',
        prompt:
          'Which depreciation pairing correctly matches the asset type to its optimal accounting method?',
        contextBox: {
          title: 'Assets Under Review',
          metrics: [
            { label: 'Asset 1', value: 'Passenger Terminal Station' },
            { label: 'Asset 2', value: 'Heavy-Haul Freight Wagons' },
          ],
        },
        options: [
          {
            id: 'a',
            label: 'Station: Straight-Line · Freight Wagons: Units-of-Production (Gross Ton-Km)',
            detail: 'Matches time-based civil buildings vs. usage-driven rolling stock wear.',
          },
          {
            id: 'b',
            label: 'Station: Units-of-Production · Freight Wagons: Straight-Line',
            detail: 'Reverses physical wear behavior.',
          },
          {
            id: 'c',
            label: 'Both must be expensed 100% in Year 1 under IAS 16',
            detail: 'Violates the matching principle.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Fixed civil structures age with time; wagons wear out based on kilometers and tonnage hauled.',
        explanation:
          'Straight-line gives predictable annual expense for fixed civil assets like stations and bridges. Units-of-production dynamically matches freight wagon wear with actual gross-ton-kilometers hauled.',
        takeaway: 'Use Straight-Line for fixed structures and Units-of-Production for high-usage fleet.',
      },
      {
        id: 'l2-s4',
        kind: 'choice',
        badgeText: 'CWIP Transition Accounting',
        prompt:
          'A new Riyadh Central Station concourse has accumulated 420M SAR in Capital Work in Progress (CWIP), and construction is 95% complete. When must depreciation begin?',
        options: [
          {
            id: 'a',
            label: 'Only after formal commissioning, safety handover, and transfer from CWIP to active PP&E',
            detail: 'No depreciation is ever charged on CWIP balances.',
          },
          {
            id: 'b',
            label: 'Immediately when construction crosses 50% physical completion',
            detail: 'Premature capitalization distorts earnings.',
          },
          {
            id: 'c',
            label: 'As soon as the first contractor invoice is paid in Year 1',
            detail: 'Violates IAS 16 readiness criteria.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Under IAS 16, depreciation begins when an asset is in the location and condition necessary for intended operational use.',
        explanation:
          'CWIP is a temporary Balance Sheet staging account with zero depreciation. Premature capitalization inflates depreciation early; delayed closeout creates "CWIP Sinkholes" that auditors flag.',
        takeaway: 'Zero depreciation on CWIP; execute formal Handover Protocol upon commissioning.',
      },
      {
        id: 'l2-s5',
        kind: 'choice',
        badgeText: 'IFRS 16 Lease Accounting',
        prompt:
          'Under IFRS 16, which of the following leases qualifies for the practical exemption to remain simple OpEx instead of recording a Right-of-Use (ROU) Asset and Lease Liability?',
        options: [
          {
            id: 'a',
            label: 'A 6-month specialized welding generator rental with no purchase option',
            detail: 'Enforceable lease term is 12 months or less (Short-Term Exemption).',
          },
          {
            id: 'b',
            label: 'A 15-year passenger trainset lease valued at 500M SAR',
            detail: 'Long-term high-value asset.',
          },
          {
            id: 'c',
            label: 'A 5-year locomotive lease disguised as rolling 3-month extensions',
            detail: 'Substance over form treats multi-year enforceable commitments as ROU assets.',
          },
        ],
        correctOptionId: 'a',
        hint: 'IFRS 16 offers two exemptions: Short-Term leases (<= 12 months) and Low-Value assets (< ~$5,000 USD).',
        explanation:
          'IFRS 16 requires capitalizing nearly all leases as ROU Assets + Lease Liabilities, EXCEPT short-term leases (<=12 months with no purchase option) and low-value assets (<~$5,000).',
        takeaway: 'Short-term (<=12 mo) & low-value (<$5k) leases stay OpEx; longer leases become ROU Assets.',
      },
      {
        id: 'l2-s6',
        kind: 'choice',
        badgeText: 'IAS 16 Component Accounting',
        prompt:
          'Under IAS 16 Component Accounting, why must a newly built 300-km rail line separate Subgrade Earthworks (100 yrs), Ballast (18 yrs), Steel Rails (22 yrs), and Signaling Electronics (10 yrs) rather than depreciating everything at one flat 40-year rate?',
        options: [
          {
            id: 'a',
            label: 'Each major component has a distinct useful life, preventing distortion when tracks or electronics are replaced early',
            detail: 'Matches depreciation accurately and simplifies derecognition when replacing a worn component.',
          },
          {
            id: 'b',
            label: 'IAS 16 forbids depreciating steel rails or electronics separately',
            detail: 'Opposite: IAS 16 mandates componentization for significant asset parts.',
          },
          {
            id: 'c',
            label: 'Separating components converts ballast into tax-free goodwill',
            detail: 'False — ballast remains depreciable tangible PP&E.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Signaling computers wear out every 10 years, while desert earthworks last a century!',
        explanation:
          'IAS 16 requires depreciating significant components with different useful lives separately. When 10-year signaling electronics are replaced, only their specific remaining book value is derecognized.',
        takeaway: 'Apply IAS 16 componentization across subgrade, ballast, rails, and signaling.',
      },
      {
        id: 'l2-s7',
        kind: 'choice',
        badgeText: 'Free Cash Flow & EBITDA Trap',
        prompt:
          'A regional manager illegally books 20M SAR of routine track maintenance as CapEx instead of OpEx. What happens to Reported EBITDA vs. Free Cash Flow (FCF = Operating Cash Flow − CapEx)?',
        contextBox: {
          title: 'Distortion Check',
          metrics: [
            { label: 'Misbooked OpEx', value: '20M SAR → CapEx' },
            { label: 'Reported EBITDA', value: '?' },
            { label: 'Net Free Cash Flow', value: '?' },
          ],
        },
        options: [
          {
            id: 'a',
            label: 'Reported EBITDA jumps artificially by +20M SAR, while total Net Free Cash Flow remains unchanged',
            detail: 'The 20M SAR cash still left the bank account — it merely moved from Operating CF to Investing CF.',
          },
          {
            id: 'b',
            label: 'Both EBITDA and Bank Cash magically increase by +20M SAR',
            detail: 'Accounting labels never create real cash inside the bank.',
          },
          {
            id: 'c',
            label: 'EBITDA drops by -20M SAR while Investing Cash Flow goes to zero',
            detail: 'Reverses the misstatement direction.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Moving cash outflow from Operating OpEx to Investing CapEx hides it from EBITDA — does it change the bank balance?',
        explanation:
          'Aggressive capitalization inflates EBITDA and Operating Cash Flow on paper, which is why executive analysts watch Free Cash Flow (OCF − CapEx): total cash out the door is identical!',
        takeaway: 'Improper capitalization fakes higher EBITDA, but Free Cash Flow exposes the real cash burn.',
      },
    ],
  },

  // =========================================================================
  // DAY 1 — LEVEL 3
  // =========================================================================
  {
    id: 3,
    day: 1,
    moduleName: 'Module 1 · IFRS Rules & Risk Areas',
    topicTag: 'Topic 4 · Classification Traps',
    title: 'Audit Trap Detector',
    subtitle: 'Put on your Internal Auditor badge and catch illegal accounting entries before ZATCA or external auditors do.',
    mechanic: 'audit-detector',
    competency: 'audit',
    accentColor: 'rose',
    estimatedMinutes: 3,
    xpReward: 200,
    briefing: {
      objective:
        'Inspect 7 General Ledger entries submitted by regional railway departments. Identify which entries violate IFRS / internal policy and select the exact audit correction.',
      howToPlay: [
        'Examine the Department, Amount, Proposed Booking (CapEx or OpEx), and Field Evidence.',
        'Decide whether the booking is Compliant or an Audit Violation requiring reclassification.',
        'Pick the exact IFRS-compliant fix to lock in your audit score.',
      ],
      keyRules: [
        {
          title: 'Watch for Improper Capitalization',
          summary:
            'Pressure to boost EBITDA often tempts teams to hide SaaS fees, routine tamping, or pre-feasibility studies inside CapEx.',
        },
        {
          title: 'Component Derecognition & SoD',
          summary:
            'Replacing major components or stripping idle assets requires immediate derecognition of old book values to avoid "phantom assets".',
        },
      ],
    },
    steps: [
      {
        id: 'l3-s1',
        kind: 'audit',
        ledgerId: 'GL-2026-401',
        department: 'IT & Enterprise Systems',
        proposedEntry: '5-Year Cloud EAM SaaS Subscription',
        bookedAs: 'CAPEX',
        amountSar: '30,000,000 SAR',
        evidenceNote:
          'Vendor hosts the Enterprise Asset Management software on external cloud servers. Railway pays 6M SAR/year and does not own or control the source code.',
        isViolation: true,
        options: [
          {
            id: 'fix-opex',
            label: 'Audit Violation — Reclassify to OpEx (IFRIC / IAS 38 SaaS Rule)',
            detail: 'Cloud SaaS subscriptions without code control must be expensed as incurred.',
          },
          {
            id: 'keep-capex',
            label: 'Compliant — Keep capitalized as an Intangible Asset over 5 years',
            detail: 'Treats SaaS like legacy on-premise software.',
          },
        ],
        correctOptionId: 'fix-opex',
        hint: 'Ask yourself: Does the railway control the underlying software code, or is it renting cloud access?',
        explanation:
          'Under IFRIC Agenda Decisions on IAS 38, cloud-hosted SaaS subscriptions where the customer lacks control over the software code are service contracts and must be expensed as OpEx.',
        takeaway: 'Avoid the SaaS Trap: Cloud software subscriptions are OpEx, not Intangible CapEx.',
      },
      {
        id: 'l3-s2',
        kind: 'audit',
        ledgerId: 'GL-2026-419',
        department: 'Track Maintenance Division',
        proposedEntry: '300-km Routine Ballast Tamping Campaign',
        bookedAs: 'CAPEX',
        amountSar: '6,400,000 SAR',
        evidenceNote:
          'Automated tamping machines realigned existing track geometry and packed existing ballast stone beneath concrete ties to restore baseline tolerances.',
        isViolation: true,
        options: [
          {
            id: 'fix-tamping',
            label: 'Audit Violation — Reclassify to OpEx (Routine Track Preservation)',
            detail: 'Only full ballast excavation & replacement (undercutting) qualifies as CapEx.',
          },
          {
            id: 'keep-tamping',
            label: 'Compliant — Capitalize as Permanent Way Upgrade',
            detail: 'Treats routine alignment as asset creation.',
          },
        ],
        correctOptionId: 'fix-tamping',
        hint: 'Contrast routine Ballast Tamping vs. Full Ballast Undercutting (excavating and replacing degraded rock bed).',
        explanation:
          'Ballast tamping merely realigns existing stones to maintain original safety tolerances — classic OpEx. Only full ballast undercutting and replacement restores structural life as CapEx.',
        takeaway: 'Ballast tamping = OpEx; full ballast undercutting & replacement = CapEx.',
      },
      {
        id: 'l3-s3',
        kind: 'audit',
        ledgerId: 'GL-2026-432',
        department: 'Network Strategy',
        proposedEntry: 'Pre-Feasibility Soil & Corridor Concept Study',
        bookedAs: 'CAPEX',
        amountSar: '2,100,000 SAR',
        evidenceNote:
          'Consultancy hired for early exploratory biodiversity and soil scoping for a theoretical 200-km branch line with zero Board approval or funding commitment.',
        isViolation: true,
        options: [
          {
            id: 'fix-feasibility',
            label: 'Audit Violation — Expense as OpEx (Pre-Feasibility Gate Failed)',
            detail: 'Costs before commercial feasibility & Board commitment cannot be capitalized.',
          },
          {
            id: 'keep-feasibility',
            label: 'Compliant — Park inside CWIP until the Board votes next year',
            detail: 'Risk creating a CWIP Sinkhole and impairment write-off.',
          },
        ],
        correctOptionId: 'fix-feasibility',
        hint: 'Remember the "Feasibility Gate": when do design costs become capitalizable?',
        explanation:
          'Under IAS 16 and IAS 38, preliminary exploratory and pre-feasibility studies conducted before technical/commercial feasibility and commitment to construct must be expensed as OpEx.',
        takeaway: 'Pre-feasibility studies = OpEx; detailed engineering after approval = CapEx.',
      },
      {
        id: 'l3-s4',
        kind: 'audit',
        ledgerId: 'GL-2026-455',
        department: 'Rolling Stock Procurement',
        proposedEntry: 'Lump-Sum 10-Year Train + Maintenance Contract',
        bookedAs: 'CAPEX',
        amountSar: '400,000,000 SAR',
        evidenceNote:
          'Single turnkey contract includes delivery of 10 trainsets PLUS 10 years of preventive servicing, consumables, and vendor technician support.',
        isViolation: true,
        options: [
          {
            id: 'fix-unbundle',
            label: 'Audit Violation — Unbundle: Capitalize Trainsets, Expense Maintenance Over 10 Yrs',
            detail: 'Allocate lump-sum price using standalone selling prices.',
          },
          {
            id: 'keep-bundle',
            label: 'Compliant — Capitalize the full 400M SAR because it is one signed contract',
            detail: 'Illegally hides 10 years of OpEx on the Balance Sheet.',
          },
        ],
        correctOptionId: 'fix-unbundle',
        hint: 'Can 10 years of future preventive maintenance and spare consumables be capitalized into Day-1 train value?',
        explanation:
          'Bundled turnkey contracts MUST be unbundled: physical trainsets are capitalized as PP&E upon acceptance, while ongoing maintenance and technical support are expensed periodically as OpEx.',
        takeaway: 'Always unbundle bundled contracts between Capital Assets and Service OpEx.',
      },
      {
        id: 'l3-s5',
        kind: 'audit',
        ledgerId: 'GL-2026-468',
        department: 'Northern Depot Operations',
        proposedEntry: 'Idle Locomotive Stripped for Spare Parts',
        bookedAs: 'CAPEX',
        amountSar: '14,500,000 SAR',
        evidenceNote:
          'Technicians cannibalized the traction motor and onboard computer from an idle locomotive to repair active trains, but left the stripped unit at 100% full book value on the Fixed Asset Register.',
        isViolation: true,
        options: [
          {
            id: 'fix-cannibal',
            label: 'Audit Violation — Log Cannibalization & Derecognize Stripped Components',
            detail: 'Prevents phantom assets and Balance Sheet overstatement.',
          },
          {
            id: 'keep-cannibal',
            label: 'Compliant — No entry needed until the locomotive chassis is sold for scrap',
            detail: 'Leaves missing physical assets overstated on the FAR.',
          },
        ],
        correctOptionId: 'fix-cannibal',
        hint: 'What happens during physical verification audits if an asset on the register is missing its engine and electronics?',
        explanation:
          'Leaving a cannibalized unit at full book value creates "phantom assets" and violates physical existence audit standards. Component stripping must be logged and derecognized immediately.',
        takeaway: 'Component cannibalization requires immediate Fixed Asset Register derecognition.',
      },
      {
        id: 'l3-s6',
        kind: 'audit',
        ledgerId: 'GL-2026-480',
        department: 'Capital Projects Delivery',
        proposedEntry: 'Direct Project Engineers Labor on New Rail Spur',
        bookedAs: 'CAPEX',
        amountSar: '3,200,000 SAR',
        evidenceNote:
          'Verified, auditable timesheets confirm 12 civil engineers worked 100% on constructing the approved 15-km industrial spur. HR and corporate admin salaries remained in OpEx.',
        isViolation: false,
        options: [
          {
            id: 'approve-labor',
            label: 'Compliant — Direct Construction Labor with Auditable Timesheets is CapEx',
            detail: 'Meets IAS 16 directly attributable cost rules while excluding admin overhead.',
          },
          {
            id: 'reject-labor',
            label: 'Audit Violation — Internal employee salaries can never be capitalized',
            detail: 'Incorrect: direct project construction labor IS eligible under IAS 16.',
          },
        ],
        correctOptionId: 'approve-labor',
        hint: 'Check two things: Are they directly constructing an approved asset with timesheets, and was general HR/Admin excluded?',
        explanation:
          'Under IAS 16, internal engineering salaries directly engaged in constructing a capital asset CAN be capitalized when supported by auditable timesheets — provided general G&A/HR overhead is excluded.',
        takeaway: 'Direct project engineering labor (with timesheets) = CapEx; G&A/HR overhead = OpEx.',
      },
      {
        id: 'l3-s7',
        kind: 'audit',
        ledgerId: 'GL-2026-492',
        department: 'Wayside Diagnostics Team',
        proposedEntry: '10 Split Invoices for One Automated Wheel-Scan Gantry',
        bookedAs: 'OPEX',
        amountSar: '350,000 SAR (10 × 35k)',
        evidenceNote:
          'Team asked the vendor to split a single 350,000 SAR integrated wayside wheel-scan gantry into ten 35,000 SAR invoices so every invoice sat just below the 37,500 SAR threshold.',
        isViolation: true,
        options: [
          {
            id: 'fix-split',
            label: 'Audit Violation — Aggregate & Capitalize Integrated 350k SAR System (PO Splitting)',
            detail: 'Materiality applies to the complete functional asset, never artificial split invoices.',
          },
          {
            id: 'keep-split',
            label: 'Compliant — Expense all 10 invoices as OpEx because each paper bill is under 37.5k SAR',
            detail: 'Violates substance-over-form and procurement anti-splitting policy.',
          },
        ],
        correctOptionId: 'fix-split',
        hint: 'Does splitting one integrated 350,000 SAR wayside scanner into 10 bills change the fact that it is one 15-year capital system?',
        explanation:
          'Split-invoicing ("PO Splitting") to bypass capitalization or procurement thresholds is a major audit red flag. Under substance-over-form, integrated systems functioning together must be aggregated and capitalized.',
        takeaway: 'Never split invoices to evade thresholds — evaluate integrated systems as one asset.',
      },
    ],
  },

  // =========================================================================
  // DAY 1 — LEVEL 4 (BOSS)
  // =========================================================================
  {
    id: 4,
    day: 1,
    moduleName: 'Module 1 · Topic 5 Case Exercise',
    topicTag: 'Day 1 Mastery · Real SAR Scenarios',
    title: 'Corridor Case Trials',
    subtitle: 'Prove your Day 1 mastery across 8 real-world heavy rail case scenarios.',
    mechanic: 'classifier',
    competency: 'classification',
    accentColor: 'amber',
    estimatedMinutes: 3,
    xpReward: 250,
    briefing: {
      objective:
        'Classify 8 authentic railway case scenarios from Topic 5 — covering emergency sandstorms, ETCS signaling retrofits, station roof derecognition, capital spares, IAS 23 borrowing costs, and legal disputes.',
      howToPlay: [
        'Analyze each real-world scenario carefully — watch out for tricky nuances like insurance/flood repairs, capital spares, and construction loan interest!',
        'Route each scenario to CapEx or OpEx.',
        'Build a streak to unlock the Day 1 Certified Strategist badge.',
      ],
      keyRules: [
        {
          title: 'Restorative vs. Upgrading',
          summary:
            'Cleaning up sandstorms or repairing flash flood damage restores original capacity (OpEx). Expanding speed or capacity (ETCS L2) is CapEx.',
        },
        {
          title: 'IAS 23 & Capital Spares',
          summary:
            'Construction loan interest on a 3-year qualifying asset (IAS 23) and critical backup traction motors (IAS 16) are CapEx!',
        },
      ],
    },
    steps: [
      {
        id: 'l4-s1',
        kind: 'classifier',
        title: 'Emergency Desert Sand Removal',
        department: 'Emergency Track Response',
        amountSar: '1,400,000 SAR',
        usefulLife: '48-Hour Restoration',
        scenario:
          'Severe desert sandstorms bury 40 km of high-speed track. Emergency crews and vacuum machinery clear the sand to resume normal train operations.',
        correctAnswer: 'OPEX',
        subLabel: 'Restorative Maintenance · OpEx',
        hint: 'Does clearing sand create a new asset or extend the track’s original design life?',
        explanation:
          'Clearing storm sand merely restores the existing track back to its baseline operating condition without adding capacity or extending design life.',
        takeaway: 'Emergency clean-up restoring baseline condition is OpEx.',
      },
      {
        id: 'l4-s2',
        kind: 'classifier',
        title: 'Fleet-Wide ETCS Level 2 Signaling Retrofit',
        department: 'Signaling & Fleet Engineering',
        amountSar: '85,000,000 SAR',
        usefulLife: '15–20 Years',
        scenario:
          'Installing digital ETCS Level 2 computers across 45 existing passenger locomotives, raising maximum line speed from 160 km/h to 200 km/h and doubling track capacity.',
        correctAnswer: 'CAPEX',
        subLabel: 'Asset Performance Enhancement',
        hint: 'This upgrades an existing fleet — check whether it materially boosts speed and capacity.',
        explanation:
          'Even though it is installed on existing trains, ETCS Level 2 doubles track capacity and increases maximum operating speed beyond original baseline specifications — a textbook Capital Enhancement.',
        takeaway: 'Retrofits that boost speed, efficiency, or capacity are CapEx.',
      },
      {
        id: 'l4-s3',
        kind: 'classifier',
        title: 'Complete Passenger Station Roof Replacement',
        department: 'Terminal Facilities Engineering',
        amountSar: '42,000,000 SAR',
        usefulLife: '35 Years',
        scenario:
          'Removing a wind-damaged 15-year-old fabric canopy roof and engineering a permanent structural steel and insulated glass roof system.',
        correctAnswer: 'CAPEX',
        subLabel: 'CapEx + Derecognition of Old Roof',
        hint: 'Under component accounting (IAS 16), replacing a major building component is capitalized while retiring the old component.',
        explanation:
          'The new structural steel-and-glass roof is capitalized as a major component replacement under IAS 16, accompanied by derecognizing the remaining net book value of the old fabric canopy.',
        takeaway: 'Major component replacements = CapEx + Derecognition of old part.',
      },
      {
        id: 'l4-s4',
        kind: 'classifier',
        title: 'Strategic Backup Traction Motors',
        department: 'Logistics & Critical Spares',
        amountSar: '3,500,000 SAR',
        usefulLife: 'Multi-Year Standby Asset',
        scenario:
          'Buying two specialized locomotive traction motors to hold in a climate-controlled bay for unpredictable future emergency swaps across the locomotive fleet.',
        correctAnswer: 'CAPEX',
        subLabel: 'Strategic Capital Spares (IAS 16)',
        hint: 'Unlike brake pads or air filters (IAS 2), can these motors ONLY be used with specific PP&E across multiple years?',
        explanation:
          'Under IAS 16, high-value critical spare sub-assemblies usable only in connection with specific PP&E across multiple accounting periods qualify immediately as Capital Spares (PP&E).',
        takeaway: 'Critical multi-year spare assemblies (traction motors, bogies) = Capital Spares (CapEx).',
      },
      {
        id: 'l4-s5',
        kind: 'classifier',
        title: 'Emergency Bridge Pier Scour Underpinning',
        department: 'Civil Structures Maintenance',
        amountSar: '5,800,000 SAR',
        usefulLife: 'Restores Original Design',
        scenario:
          'Flash flooding erodes soil around two railway bridge piers. Contractors inject grout and place rip-rap rock armor to stabilize the piers back to original design load limits.',
        correctAnswer: 'OPEX',
        subLabel: 'Accidental Damage Restoration',
        hint: 'Did the repair widen the bridge or increase its load limits beyond pre-flood specs?',
        explanation:
          'Repairing accidental or natural-disaster damage to return an asset to its pre-incident operating condition is restorative OpEx (and any insurance payout is recorded separately as income).',
        takeaway: 'Disaster repairs that only restore original structural limits are OpEx.',
      },
      {
        id: 'l4-s6',
        kind: 'classifier',
        title: 'Borrowing Costs on 3-Year Track Extension Loan',
        department: 'Corporate Treasury',
        amountSar: '35,000,000 SAR / yr',
        usefulLife: 'During Active Construction',
        scenario:
          'Financing interest incurred during the active 3-year construction phase of an 800M SAR loan facility dedicated specifically to building a new freight bypass corridor.',
        correctAnswer: 'CAPEX',
        subLabel: 'IAS 23 Borrowing Costs',
        hint: 'Look up IAS 23: what happens to interest directly tied to constructing a >12-month Qualifying Asset?',
        explanation:
          'Under IAS 23, borrowing costs directly attributable to constructing a Qualifying Asset (>12 months to build) MUST be capitalized into the asset cost during active construction (pausing during extended halts).',
        takeaway: 'IAS 23 mandates capitalizing construction interest on Qualifying Assets.',
      },
      {
        id: 'l4-s7',
        kind: 'classifier',
        title: 'Mid-Life 10-Year Bogie Refurbishment',
        department: 'Rolling Stock Overhaul',
        amountSar: '16,000,000 SAR',
        usefulLife: '10-Year Overhaul Cycle',
        scenario:
          'Scheduled 10-year complete teardown, crack inspection, bearing replacement, and wheelset reprofiling of passenger bogies, resetting their 10-year service life.',
        correctAnswer: 'CAPEX',
        subLabel: 'IAS 16 Major Overhaul ("Dry-Docking")',
        hint: 'Check IAS 16 "dry-docking" major overhaul rules for 7–10 year resets.',
        explanation:
          'Major periodic overhauls that restore multi-year operating capability qualify as replacement capital components under IAS 16 (while derecognizing any remaining prior overhaul value).',
        takeaway: 'Scheduled multi-year major overhauls qualify as CapEx under IAS 16.',
      },
      {
        id: 'l4-s8',
        kind: 'classifier',
        title: 'Legal Defense Fees in EPC Contract Dispute',
        department: 'Corporate Legal',
        amountSar: '4,500,000 SAR',
        usefulLife: 'Post-Commissioning Dispute',
        scenario:
          'External arbitration and legal counsel fees defending against contractor delay claims on a rail line that is already finished and carrying commercial passengers.',
        correctAnswer: 'OPEX',
        subLabel: 'Administrative Legal Expense',
        hint: 'Do legal defense fees contribute to constructing the physical track or bringing it to operational readiness?',
        explanation:
          'Legal dispute fees on an already operating line do not enhance the physical asset or bring it to its intended condition; IAS 16 prohibits capitalizing them.',
        takeaway: 'Post-completion legal arbitration fees are OpEx.',
      },
    ],
  },

  // =========================================================================
  // DAY 2 — LEVEL 5
  // =========================================================================
  {
    id: 5,
    day: 2,
    moduleName: 'Module 2 · CapEx Planning & Governance',
    topicTag: 'Day 2 · Topic 1 · Stage-Gate & S-Curve',
    title: 'Stage-Gate & S-Curve Commander',
    subtitle: 'Govern megaproject capital through Stage-Gates, S-Curve phasing, and P80 probabilistic contingencies.',
    mechanic: 'stage-gate-sim',
    competency: 'capex-planning',
    accentColor: 'indigo',
    estimatedMinutes: 3,
    xpReward: 220,
    briefing: {
      objective:
        'Command a multi-year rail expansion budget: enforce Stage-Gate discipline, tune an authentic S-Curve spending profile with P80 contingency, apply Value Engineering, and enforce Post-Implementation Reviews.',
      howToPlay: [
        'Answer strategic CapEx governance questions across the 7-step Stage-Gate lifecycle.',
        'In Step 2, use the live interactive sliders to shape the 4-year S-Curve spending profile and P80 contingency reserve.',
        'Watch the live S-Curve chart respond and verify your configuration when all targets align.',
      ],
      keyRules: [
        {
          title: 'Stage-Gate Funding',
          summary:
            'Release funds gate-by-gate (Concept -> Pre-Feasibility -> Bankable Feasibility -> Design -> Handover) to avoid the Sunk Cost Fallacy.',
        },
        {
          title: 'S-Curve & P80 Contingency',
          summary:
            'Megaproject spending starts slow in design (~12-20%), surges in peak construction (~55-70%), and tapers in commissioning. Budget contingency at P80 confidence.',
        },
      ],
    },
    steps: [
      {
        id: 'l5-s1',
        kind: 'choice',
        badgeText: 'Stage-Gate Governance',
        prompt:
          'A proposed 2.5B SAR freight spur shows weak mineral demand at Gate 2 (Pre-Feasibility). Why does the Stage-Gate model release funds incrementally per gate instead of approving the full 2.5B SAR upfront?',
        options: [
          {
            id: 'a',
            label: 'Prevents the "Sunk Cost Fallacy" by letting committees pause or cancel weak projects early',
            detail: 'Only minor study capital is risked before commercial viability is proven.',
          },
          {
            id: 'b',
            label: 'Forces contractors to buy steel 5 years before blueprints exist',
            detail: 'Creates massive waste and stranded inventory.',
          },
          {
            id: 'c',
            label: 'Eliminates the need for third-party Owner’s Engineer validation at Gate 3',
            detail: 'Bankable feasibility actually requires independent verification.',
          },
        ],
        correctOptionId: 'a',
        hint: 'What happens if you commit 2.5B SAR before confirming freight demand?',
        explanation:
          'Incremental Stage-Gate releases empower governance committees to cancel, pause, or redesign non-performing projects before massive irreversible construction outlays occur.',
        takeaway: 'Stage-Gate funding kills bad projects early and prevents Sunk Cost lock-in.',
      },
      {
        id: 'l5-s2',
        kind: 'slider-lab',
        title: 'S-Curve Phasing & P80 Contingency Simulator',
        prompt:
          'Configure a realistic 4-Year Rail Corridor CapEx Plan (avoiding flat linear budgeting!) and set a conservative P80 Probabilistic Contingency Reserve.',
        visualType: 's-curve',
        sliders: [
          {
            id: 'designPct',
            label: 'Phase 1 · Design & Engineering Share',
            unit: '% of CapEx',
            min: 5,
            max: 40,
            step: 1,
            defaultValue: 33,
            targetMin: 12,
            targetMax: 22,
          },
          {
            id: 'peakPct',
            label: 'Phase 2 · Peak Construction Share',
            unit: '% of CapEx',
            min: 30,
            max: 80,
            step: 1,
            defaultValue: 34,
            targetMin: 55,
            targetMax: 72,
          },
          {
            id: 'contingencyPct',
            label: 'P80 Probabilistic Contingency Buffer',
            unit: '% Reserve',
            min: 5,
            max: 35,
            step: 1,
            defaultValue: 8,
            targetMin: 16,
            targetMax: 24,
          },
        ],
        hint: 'An authentic S-Curve allocates ~15% to Design, ~65% to Peak Construction (leaving ~20% for Commissioning), and ~18–20% P80 risk reserve!',
        explanation:
          'Megaproject cash outflows follow an S-Curve: slow during design (12–22%), steep during peak civil & track construction (55–72%), and tapering during commissioning. Pairing this with a Monte Carlo P80 reserve (16–24%) prevents mid-project liquidity shortfalls.',
        takeaway: 'Model CapEx as an S-Curve (not flat linear) and budget contingency at P80 confidence.',
      },
      {
        id: 'l5-s3',
        kind: 'choice',
        badgeText: 'Fleet Sizing Dynamics',
        prompt:
          'When sizing a new passenger rolling stock fleet, what reserve margin should planners include above peak timetable demand to cover scheduled preventive servicing and unscheduled breakdowns?',
        options: [
          {
            id: 'a',
            label: '10%–15% operational availability reserve margin',
            detail: 'Prevents missed schedules without locking up excessive idle capital.',
          },
          {
            id: 'b',
            label: '0% reserve — run 100% of trains simultaneously every day',
            detail: 'Causes immediate service cancellations when any unit needs A-Service.',
          },
          {
            id: 'c',
            label: '50% spare fleet sitting idle in the depot',
            detail: 'Triggers severe over-procurement drag and inflated depreciation.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Too little reserve causes congestion; too much ties up millions in idle balance sheet debt.',
        explanation:
          'Fleet availability modeling balances peak service schedules with scheduled PM and overhaul downtime using a typical 10–15% reserve ratio.',
        takeaway: 'Target a 10–15% rolling stock reserve margin to balance reliability and capital efficiency.',
      },
      {
        id: 'l5-s4',
        kind: 'choice',
        badgeText: 'Value Engineering (VE) Timing',
        prompt:
          'Engineers propose standardizing passenger platform lengths and optimizing earthwork cut-and-fill balances to save 120M SAR. When does Value Engineering deliver maximum savings?',
        options: [
          {
            id: 'a',
            label: 'During conceptual and preliminary engineering phases before construction contracts lock',
            detail: 'Changes are low-cost on paper and avoid physical rework.',
          },
          {
            id: 'b',
            label: 'After 70% of concrete viaduct piers are already poured on site',
            detail: 'Late VE causes massive demolition and contractor variation claims.',
          },
          {
            id: 'c',
            label: 'During the Post-Implementation Review 24 months after opening',
            detail: 'That is too late to alter the asset’s construction spend.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Is it cheaper to optimize a concrete span on a CAD drawing or after pouring concrete?',
        explanation:
          'Value Engineering optimizes functional value while cutting unnecessary CapEx. Maximum savings happen early in conceptual/preliminary design; late VE triggers expensive redesign rework.',
        takeaway: 'Execute Value Engineering early during concept and preliminary design.',
      },
      {
        id: 'l5-s5',
        kind: 'choice',
        badgeText: 'Greenfield vs. Brownfield CapEx',
        prompt:
          'Why do Brownfield rail upgrades (modernizing an active passenger corridor) often suffer higher indirect construction costs than Greenfield desert lines?',
        options: [
          {
            id: 'a',
            label: 'Requires night-shift track possessions, temporary service bypasses, and disruption reserves',
            detail: 'Live trains cannot safely share tracks with heavy construction crews.',
          },
          {
            id: 'b',
            label: 'Brownfield projects have higher desert land acquisition costs',
            detail: 'Actually, Brownfield has lower land acquisition costs since the corridor already exists.',
          },
          {
            id: 'c',
            label: 'Brownfield projects never require signaling integration',
            detail: 'They require complex live cutover testing.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Think about keeping commercial trains running while upgrading the exact same corridor.',
        explanation:
          'Brownfield upgrades save on land acquisition but face severe operational interruption constraints—requiring complex staging, short night possessions, and delay contingency budgets.',
        takeaway: 'Brownfield budgets must include staging, night-possession, and disruption reserves.',
      },
      {
        id: 'l5-s6',
        kind: 'choice',
        badgeText: 'Capital Rationing & Prioritization',
        prompt:
          'The Board caps annual expansion CapEx at 1.0B SAR while 1.8B SAR of projects are proposed. How should Finance rank and select projects under Capital Rationing?',
        options: [
          {
            id: 'a',
            label: 'Multi-Criteria Scoring combining Profitability Index (NPV per SAR invested), safety/regulatory compliance, and network bottleneck relief',
            detail: 'Maximizes strategic and financial return per scarce Riyal invested.',
          },
          {
            id: 'b',
            label: 'Fund whichever department submits the longest slide deck first',
            detail: 'Ignores risk-adjusted economic value and network capacity.',
          },
          {
            id: 'c',
            label: 'Cut every project’s engineering budget by 45% across the board so all start half-funded',
            detail: 'Causes chronic underfunding, stalls, and stranded CWIP.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Under a strict capital ceiling, should you maximize value per Riyal spent on top-ranked projects or half-build everything?',
        explanation:
          'Capital rationing requires disciplined scoring: rank projects by Profitability Index (NPV/CapEx), statutory safety priority, and corridor throughput impact—fully funding high-priority winners rather than starving all projects.',
        takeaway: 'Rank constrained CapEx via Profitability Index (NPV/CapEx) and strategic safety scoring.',
      },
      {
        id: 'l5-s7',
        kind: 'choice',
        badgeText: 'Post-Implementation Review (PIR)',
        prompt:
          '18 months after commissioning a new passenger branch line, Finance conducts a mandatory Post-Implementation Review (PIR). What is the primary strategic purpose of a PIR?',
        options: [
          {
            id: 'a',
            label: 'Compare actual CapEx, schedule, and ridership vs. Gate-3 assumptions to calibrate future models and cure Optimism Bias',
            detail: 'Closes the governance feedback loop for future megaproject estimates.',
          },
          {
            id: 'b',
            label: 'Retroactively convert past depreciation back into CWIP',
            detail: 'Illegal under IAS 16.',
          },
          {
            id: 'c',
            label: 'Hide cost overruns before external auditors inspect the depot',
            detail: 'Opposite of transparent governance.',
          },
        ],
        correctOptionId: 'a',
        hint: 'How does an organization stop repeating the same cost-underestimation mistakes on its next rail line?',
        explanation:
          'Post-Implementation Reviews (12–24 months post-handover) compare realized outcomes against Gate-3 business case promises, feeding empirical benchmarks back into future S-Curves and P80 risk buffers.',
        takeaway: 'Run Post-Implementation Reviews (12–24 mo post-opening) to defeat Optimism Bias.',
      },
    ],
  },

  // =========================================================================
  // DAY 2 — LEVEL 6
  // =========================================================================
  {
    id: 6,
    day: 2,
    moduleName: 'Module 2 · OpEx Planning & Optimization',
    topicTag: 'Day 2 · Topic 2 · ZBB, ABC & Maintenance',
    title: 'OpEx Engine & Zero-Based Optimizer',
    subtitle: 'Eliminate incremental bloat, deploy IoT predictive maintenance, and cut traction energy waste.',
    mechanic: 'opex-optimizer',
    competency: 'opex-planning',
    accentColor: 'amber',
    estimatedMinutes: 3,
    xpReward: 220,
    briefing: {
      objective:
        'Transform a bloated railway depot budget using Zero-Based Budgeting (ZBB), Activity-Based Costing (ABC), Condition-Based Maintenance, and Driver Advisory energy optimization.',
      howToPlay: [
        'Eliminate legacy budgeting traps and pick accurate rail cost drivers.',
        'In Step 3, tune the live Depot OpEx Optimizer sliders to crush emergency overtime and energy waste while keeping spare parts lean.',
        'Watch the Cost per Train-Km and EBITDA savings update in real time.',
      ],
      keyRules: [
        {
          title: 'Zero-Based Budgeting (ZBB)',
          summary:
            'Justify every operational Riyal from a zero baseline tied to verifiable train-km or inspection cycles—never "last year + 3%".',
        },
        {
          title: 'Energy & Maintenance Levers',
          summary:
            'Traction energy is 30–40% of direct OpEx; Driver Advisory Systems (DAS) cut 8–15%. Condition-Based IoT stops 150–200% overtime blowouts.',
        },
      ],
    },
    steps: [
      {
        id: 'l6-s1',
        kind: 'choice',
        badgeText: 'Zero-Based Budgeting (ZBB)',
        prompt:
          'Why does modern rail finance replace traditional Incremental Budgeting ("last year’s actuals + 3% inflation") with Zero-Based Budgeting (ZBB)?',
        options: [
          {
            id: 'a',
            label: 'Incrementalism embeds legacy waste and encourages "spend-it-or-lose-it" year-end dumping',
            detail: 'ZBB forces every Riyal to be justified from zero against active train-km drivers.',
          },
          {
            id: 'b',
            label: 'ZBB allows managers to ignore scheduled train timetables when requesting budgets',
            detail: 'Opposite: ZBB ties spending directly to operational activity.',
          },
          {
            id: 'c',
            label: 'Incremental budgeting is prohibited by IAS 16',
            detail: 'Budgeting methodology is a management governance choice, not an IAS 16 rule.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Think about what happens in Q4 when a department knows next year’s budget is based on how much they spent this year.',
        explanation:
          'Incrementalism perpetuates historical inefficiencies and incentivizes wasteful December spending. ZBB resets the baseline to zero each cycle and ties OpEx directly to verified operational activities.',
        takeaway: 'ZBB eliminates legacy bloat by tying every Riyal to real operational activity.',
      },
      {
        id: 'l6-s2',
        kind: 'choice',
        badgeText: 'Activity-Based Costing (ABC)',
        prompt:
          'Spreading general Riyadh Depot overhead equally across every train makes heavy mineral freight look artificially cheap and light passenger trains look unprofitable. What fixes this?',
        options: [
          {
            id: 'a',
            label: 'Activity-Based Costing using Gross Ton-Kilometers (GTK) and maintenance labor hours',
            detail: 'Assigns shared depot costs based on actual physical resource consumption.',
          },
          {
            id: 'b',
            label: 'Capitalizing 50% of depot overhead onto the Balance Sheet',
            detail: 'Illegal under IAS 16.',
          },
          {
            id: 'c',
            label: 'Allocating costs alphabetically by train line name',
            detail: 'Arbitrary allocation distorts tariff pricing.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Heavy 32.5-ton axle freight trains consume far more track grinding and depot wear than light passenger cars.',
        explanation:
          'Activity-Based Costing (ABC) maps indirect operational cost pools to specific consumption drivers (GTK, Train-Km, Locomotive Hours), revealing true route profitability for commercial contract pricing.',
        takeaway: 'Use ABC drivers (GTK, Train-Km) to reveal true freight vs. passenger profitability.',
      },
      {
        id: 'l6-s3',
        kind: 'slider-lab',
        title: 'Riyadh Depot OpEx Optimization Lab',
        prompt:
          'Balance Preventive/Condition-Based IoT coverage, Driver Advisory Systems (DAS), and Spare Parts Inventory buffer days to minimize total Depot OpEx without risking grounded trains.',
        visualType: 'opex-zbb',
        sliders: [
          {
            id: 'cbmCoverage',
            label: 'Preventive & IoT Condition-Based Maintenance',
            unit: '% Fleet',
            min: 20,
            max: 100,
            step: 5,
            defaultValue: 35,
            targetMin: 75,
            targetMax: 95,
          },
          {
            id: 'dasAdoption',
            label: 'Driver Advisory System (DAS) Eco-Driving',
            unit: '% Routes',
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 20,
            targetMin: 75,
            targetMax: 100,
          },
          {
            id: 'jitBufferDays',
            label: 'Consumable Spares Warehouse Buffer',
            unit: 'Days',
            min: 5,
            max: 120,
            step: 5,
            defaultValue: 95,
            targetMin: 20,
            targetMax: 45,
          },
        ],
        hint: 'Raise IoT/PM coverage above 75% to crush emergency failures, enable DAS >=75% to capture 8–15% fuel savings, and keep inventory lean around 20–45 days (avoiding 15–25% dead holding penalties!).',
        explanation:
          'Shifting from reactive breakdown repairs to Condition-Based Maintenance (acoustic & thermal sensors) prevents catastrophic failures, DAS cuts energy bills by 8–15%, and balanced 20–45 day spares prevent both grounded trains and 15–25% annual inventory holding penalties.',
        takeaway: 'Combine CBM IoT + DAS eco-driving + lean JIT spares to slash unit OpEx.',
      },
      {
        id: 'l6-s4',
        kind: 'choice',
        badgeText: 'Workforce & The Overtime Trap',
        prompt:
          'A regional depot cuts 15 certified catenary technician roles to look lean on its annual headcount budget, yet total annual labor OpEx ends up 22% HIGHER. Why?',
        options: [
          {
            id: 'a',
            label: 'Chronic under-staffing triggered 150%–200% emergency overtime pay premiums',
            detail: 'Safety-critical rail schedules cannot pause when staff are short.',
          },
          {
            id: 'b',
            label: 'Headcount reductions automatically convert salaries into CapEx',
            detail: 'False — labor type doesn’t change due to under-staffing.',
          },
          {
            id: 'c',
            label: 'Overtime labor is exempt from the Income Statement',
            detail: 'All operational payroll hits the P&L immediately.',
          },
        ],
        correctOptionId: 'a',
        hint: 'What hourly rate do technicians earn when forced into emergency weekend and night shifts?',
        explanation:
          'Rail requires specialized certified staff. Cutting headcount below timetable reality traps the depot into 150–200% overtime rates, blowing out the OpEx budget.',
        takeaway: 'False headcount cuts trigger 150–200% overtime traps; invest in domestic talent pipelines.',
      },
      {
        id: 'l6-s5',
        kind: 'choice',
        badgeText: 'Global Unit Benchmarking',
        prompt:
          'Which trio of unit benchmarks allows executive leadership to compare operational cost efficiency fairly against Tier 1 global railways?',
        options: [
          {
            id: 'a',
            label: 'Cost per Gross Ton-Km (GTK), Cost per Available Seat-Km (ASK), and Maint. Cost per Track-Km',
            detail: 'Normalizes OpEx across freight tonnage, passenger seats, and track length.',
          },
          {
            id: 'b',
            label: 'Total headquarters coffee spend divided by CEO travel days',
            detail: 'Ignores core rail operational output.',
          },
          {
            id: 'c',
            label: 'Initial locomotive sticker price divided by paint color count',
            detail: 'Irrelevant to operational unit efficiency.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Match freight output (ton-km), passenger capacity (seat-km), and civil track network (track-km).',
        explanation:
          'Benchmarking Cost/GTK (freight), Cost/ASK (passenger), and Maintenance/Track-Km (infrastructure) exposes inefficiencies and proves commercial competitiveness against global peers.',
        takeaway: 'Track Cost/GTK, Cost/ASK, and Maintenance/Track-Km to benchmark true OpEx efficiency.',
      },
      {
        id: 'l6-s6',
        kind: 'choice',
        badgeText: 'Fixed vs. Variable OpEx Elasticity',
        prompt:
          'Mineral freight volume jumps +25% next quarter. Which OpEx category will rise almost proportionally (+20–25%), versus remaining mostly fixed in the short term?',
        options: [
          {
            id: 'a',
            label: 'Variable: Traction diesel & wheel/brake wear rise with GTK · Fixed: Central Traffic Control rent & baseline track patrol salaries stay stable',
            detail: 'Distinguishes volume-driven running costs from fixed network readiness costs.',
          },
          {
            id: 'b',
            label: 'Fixed: Diesel fuel per train stays flat · Variable: HQ building depreciation doubles with freight tonnage',
            detail: 'Reverses fixed and variable cost behavior.',
          },
          {
            id: 'c',
            label: 'Every railway OpEx line item is 100% variable per passenger ticket',
            detail: 'Ignores heavy fixed infrastructure readiness costs.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Ask what changes when you run 25% more heavy trains: fuel burned & brake wear, or control-center building rent?',
        explanation:
          'Understanding Fixed vs. Variable OpEx elasticity is vital for marginal freight pricing: once fixed dispatching and base infrastructure costs are covered, incremental volume mainly adds variable fuel, crew hours, and wear.',
        takeaway: 'Separate Variable OpEx (fuel, wear/GTK) from Fixed OpEx (control center, base patrol).',
      },
      {
        id: 'l6-s7',
        kind: 'choice',
        badgeText: 'In-House vs. Turnkey SLA Contracting',
        prompt:
          'When outsourcing specialized signaling or fleet maintenance to a vendor under a multi-year Service Level Agreement (SLA), what contractual KPI protects the railway from paying more for poor reliability?',
        options: [
          {
            id: 'a',
            label: 'Performance-linked availability & Mean Time Between Failures (MTBF) targets with automated fee deductions for downtime',
            detail: 'Aligns vendor incentives directly with timetable reliability and TCO.',
          },
          {
            id: 'b',
            label: 'Pure Time-and-Materials billing where the vendor earns higher profit every time a train breaks down',
            detail: 'Creates a perverse incentive rewarding frequent failures.',
          },
          {
            id: 'c',
            label: 'Paying 100% of 10-year fees on Day 1 and capitalizing them as land',
            detail: 'Violates both cash governance and IFRS.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Avoid contracts where the contractor profits more when your trains fail more often!',
        explanation:
          'Well-designed maintenance SLAs tie vendor payments to verified fleet availability, MTBF, and response times—never pure cost-plus repair billing that rewards breakdowns.',
        takeaway: 'Tie outsourced maintenance SLAs to Fleet Availability and MTBF with malus/bonus clauses.',
      },
    ],
  },

  // =========================================================================
  // DAY 2 — LEVEL 7
  // =========================================================================
  {
    id: 7,
    day: 2,
    moduleName: 'Module 2 · Lifecycle Costing & TCO',
    topicTag: 'Day 2 · Topic 3 · The Iceberg Principle',
    title: 'The TCO Iceberg Challenge',
    subtitle: 'Look beneath the 20% purchase sticker price to master 30-year Total Cost of Ownership.',
    mechanic: 'tco-iceberg',
    competency: 'tco-forecasting',
    accentColor: 'teal',
    estimatedMinutes: 3,
    xpReward: 240,
    briefing: {
      objective:
        'Unmask the hidden 70–85% submerged lifecycle costs of railway assets, balance CapEx vs. OpEx trade-offs in harsh desert climates, and redesign procurement scorecards.',
      howToPlay: [
        'Explore why low-bid initial purchases often explode 30-year lifecycle costs.',
        'In Step 2, interact with the live TCO Iceberg Simulator to tune sleeper/rail quality, mid-life overhaul timing, and desert filtration specs.',
        'Watch the submerged OpEx portion of the SVG Iceberg shrink as you optimize Net Present Cost.',
      ],
      keyRules: [
        {
          title: 'The Iceberg Principle',
          summary:
            'Acquisition CapEx is only 15–30% of lifecycle outflows; recurring OpEx (energy, maintenance, overhauls, disposal) is 70–85%.',
        },
        {
          title: 'Desert TCO & Scorecards',
          summary:
            'Arabian Peninsula desert conditions add a 15–25% lifecycle OpEx premium. Modern tenders weight 70% Lifetime TCO / 30% Technical.',
        },
      ],
    },
    steps: [
      {
        id: 'l7-s1',
        kind: 'choice',
        badgeText: 'The Iceberg Principle',
        prompt:
          'According to the Infrastructure Cost Iceberg Principle, roughly what percentage of a railway asset’s 30-year Total Cost of Ownership lies "below the waterline" in recurring OpEx, fuel, maintenance, and disposal?',
        options: [
          {
            id: 'a',
            label: '70% to 85% of total lifecycle cash outflows',
            detail: 'Initial acquisition CapEx is just the 15%–30% visible tip of the iceberg.',
          },
          {
            id: 'b',
            label: 'Only 10% — 90% of all costs happen on Purchase Day',
            detail: 'Dangerous misconception that leads to buying cheap, high-maintenance assets.',
          },
          {
            id: 'c',
            label: 'Exactly 50% CapEx and 50% Marketing',
            detail: 'Ignores 30 years of fuel, grinding, and overhauls.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Look at the tip vs. the massive underwater ice block: CapEx is 15–30%, so what remains?',
        explanation:
          'Initial acquisition CapEx typically accounts for just 15–30% of lifetime cash outflows. The submerged 70–85% comprises energy, preventive maintenance, mid-life overhauls, spares, and decommissioning.',
        takeaway: 'Never award tenders on sticker price alone — 70–85% of TCO is submerged OpEx.',
      },
      {
        id: 'l7-s2',
        kind: 'slider-lab',
        title: '30-Year Desert TCO Iceberg Simulator',
        prompt:
          'Select the optimal CapEx/OpEx Trade-Offs for a 30-year heavy-haul desert corridor: invest in durable Concrete Ties & Head-Hardened Rail, schedule timely Mid-Life Overhauls, and specify Desert Sand Filtration.',
        visualType: 'tco-iceberg',
        sliders: [
          {
            id: 'railQuality',
            label: 'Track Spec (Timber -> Concrete Ties + Premium Rail)',
            unit: '% Quality',
            min: 20,
            max: 100,
            step: 10,
            defaultValue: 30,
            targetMin: 80,
            targetMax: 100,
          },
          {
            id: 'overhaulYear',
            label: 'Scheduled Mid-Life Overhaul Timing',
            unit: 'Year',
            min: 8,
            max: 25,
            step: 1,
            defaultValue: 23,
            targetMin: 12,
            targetMax: 15,
          },
          {
            id: 'desertSpec',
            label: 'Desert Filtration & Thermal Stressing Spec',
            unit: '% Protection',
            min: 20,
            max: 100,
            step: 10,
            defaultValue: 30,
            targetMin: 80,
            targetMax: 100,
          },
        ],
        hint: 'Choose high track quality (80–100%) for concrete ties & head-hardened steel, schedule the Mid-Life Overhaul around Year 12–15 (deferring to Year 20+ spikes fuel & breakdown OpEx!), and set Desert Spec >= 80%.',
        explanation:
          'Paying +25% upfront CapEx for concrete sleepers (40+ yr life) and head-hardened rail triples grinding intervals, while a Year 12–15 mid-life overhaul resets fuel efficiency before 8–12% engine degradation compounds with the 15–25% desert premium.',
        takeaway: 'Higher upfront RAMS & Concrete/Premium Rail CapEx dramatically shrinks the 30-year OpEx Iceberg.',
      },
      {
        id: 'l7-s3',
        kind: 'choice',
        badgeText: 'Procurement Scorecards · Subtopic 3.16',
        prompt:
          'Bidder X offers trains at 1.3B SAR upfront but 3.2B SAR in 30-year operating costs. Bidder Y offers trains at 1.5B SAR upfront with only 2.2B SAR in 30-year operating costs. How should a modern TCO Procurement Scorecard weight the tender?',
        options: [
          {
            id: 'a',
            label: '70% Lifetime TCO (Net Present Cost) / 30% Technical — awarding to Bidder Y',
            detail: 'Saves 800M SAR in total lifecycle cost while enforcing vendor fuel & spares caps.',
          },
          {
            id: 'b',
            label: '70% Initial Tender Price / 30% Technical — awarding to Bidder X',
            detail: 'The traditional low-bid trap that locks in 1B SAR of excess OpEx.',
          },
          {
            id: 'c',
            label: '100% Delivery Speed with zero penalty clauses',
            detail: 'Leaves the railway exposed to unguaranteed fuel burn.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Compare Total Cost: Bidder X = 4.5B SAR vs. Bidder Y = 3.7B SAR!',
        explanation:
          'Modern rail procurement replaces the "70% Initial Price" trap with "70% Lifetime TCO / 30% Technical" scorecards backed by contractual fuel-burn guarantees and spares price caps.',
        takeaway: 'Weight tenders 70% Lifetime TCO / 30% Technical and lock vendor TCO guarantees.',
      },
      {
        id: 'l7-s4',
        kind: 'choice',
        badgeText: 'Digital Divergence · Subtopic 3.9',
        prompt:
          'A physical locomotive chassis lasts 35–40 years, while its onboard signaling software and microprocessors become obsolete every 5–7 years. What engineering principle prevents stranding the entire train?',
        options: [
          {
            id: 'a',
            label: 'Hardware/Software Decoupling with modular upgradeable electronics & digital refresh budgets',
            detail: 'Lets software & computers refresh every 5–7 years without scrapping the 40-year locomotive.',
          },
          {
            id: 'b',
            label: 'Depreciate the entire locomotive over 5 years so it matches the microchip',
            detail: 'Distorts component accounting and overstates annual depreciation.',
          },
          {
            id: 'c',
            label: 'Never update cybersecurity patches after Year 1',
            detail: 'Exposes railway safety systems to severe cyber risk.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Remember Component Accounting (Day 1) + Modular Architecture (Day 2)!',
        explanation:
          'Hardware/software decoupling and modular component replacement schedules allow railways to refresh 5–7 year onboard digital systems seamlessly across a 40-year physical fleet.',
        takeaway: 'Decouple 5–7 yr digital lifecycles from 40-yr physical hardware via modular upgrades.',
      },
      {
        id: 'l7-s5',
        kind: 'choice',
        badgeText: 'Asset Health Index (ISO 55000)',
        prompt:
          'Bridge B-21 drops to an Asset Health Index (AHI) score of 65/100 (Critical Red), while Locomotive SAR-304 sits at 94/100 (Healthy Green). Under ISO 55000, how does AHI improve capital allocation?',
        options: [
          {
            id: 'a',
            label: 'Replaces subjective guesswork with objective data-driven triggers for targeted maintenance or CapEx renewal',
            detail: 'Directs limited funds immediately to high-criticality degrading assets like Bridge B-21.',
          },
          {
            id: 'b',
            label: 'Forces equal capital spending across all assets regardless of physical condition',
            detail: 'Wastes funds on healthy assets while critical bridges degrade.',
          },
          {
            id: 'c',
            label: 'Eliminates the Fixed Asset Register completely',
            detail: 'AHI integrates directly with the FAR and CMMS.',
          },
        ],
        correctOptionId: 'a',
        hint: 'AHI combines physical condition, degradation rate, criticality, and failure risk on a 0–100 scale.',
        explanation:
          'ISO 55000 aligns physical asset stewardship with corporate finance. Scoring assets 0–100 via AHI automatically triggers targeted interventions before catastrophic failures occur.',
        takeaway: 'Use Asset Health Index (0–100) under ISO 55000 for objective capital prioritization.',
      },
      {
        id: 'l7-s6',
        kind: 'choice',
        badgeText: 'WACC Discounting & Net Present Cost',
        prompt:
          'Why must a 30-year TCO comparison discount future annual OpEx and Year-15 overhaul cash flows using the Weighted Average Cost of Capital (WACC) into Net Present Cost (NPC)?',
        options: [
          {
            id: 'a',
            label: 'Cash spent in Year 1 today has a higher economic opportunity cost than an equal Riyal spent in Year 25',
            detail: 'Discounting puts Day-1 CapEx and Year 1–30 OpEx on a mathematically fair apples-to-apples footing.',
          },
          {
            id: 'b',
            label: 'WACC artificially multiplies Year-25 fuel prices by 10x to favor cheap low-bid trains',
            detail: 'Discounting actually reduces the present weight of distant cash flows.',
          },
          {
            id: 'c',
            label: 'IAS 16 prohibits calculating Net Present Value in procurement tenders',
            detail: 'NPC discounting is a gold-standard Treasury & Procurement practice.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Think about Time Value of Money: is 100M SAR paid today equal to 100M SAR paid 20 years from now?',
        explanation:
          'Nominal undiscounted sums distort trade-offs between Day-1 CapEx and Year-20 OpEx. Discounting all future outflows at WACC gives true Net Present Cost (NPC) for objective bid evaluation.',
        takeaway: 'Evaluate 30-year TCO bids using WACC-discounted Net Present Cost (NPC).',
      },
      {
        id: 'l7-s7',
        kind: 'choice',
        badgeText: 'Decommissioning & Circular Residual Value',
        prompt:
          'A complete 30-year Lifecycle TCO equation includes Acquisition CapEx + Lifetime OpEx + Disposal/Decommissioning (DR) minus Residual Value. Why do heavy rail planners model end-of-life steel & copper recovery?',
        options: [
          {
            id: 'a',
            label: 'Environmental dismantling costs are offset by circular scrap steel/copper recovery and modular resale value',
            detail: 'Captures both mandatory site remediation obligations and circular economy value.',
          },
          {
            id: 'b',
            label: 'Locomotives vanish automatically after Year 30 with zero dismantling cost',
            detail: 'Ignores environmental remediation and hazardous battery/oil disposal.',
          },
          {
            id: 'c',
            label: 'Residual value allows skipping preventive maintenance for all 30 years',
            detail: 'Poorly maintained assets retain almost zero resale or reuse value.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Consider both the environmental cleanup bill at Year 30 and the high-grade steel/copper inside 50 locomotives and 300 km of track.',
        explanation:
          'True cradle-to-grave TCO models end-of-life decommissioning liabilities (hazmat, site remediation) alongside circular salvage recovery (recycled rail steel, copper catenary, and refurbished bogies).',
        takeaway: 'Include Year-30 decommissioning costs and circular scrap/resale value in full TCO.',
      },
    ],
  },

  // =========================================================================
  // DAY 2 — LEVEL 8 (BOSS)
  // =========================================================================
  {
    id: 8,
    day: 2,
    moduleName: 'Module 2 · Multi-Year Budgeting & Control',
    topicTag: 'Day 2 · Topic 4 · Rolling Forecasts & Governance',
    title: 'Master Control Cockpit',
    subtitle: 'Defend cash liquidity with 5-Quarter Rolling Forecasts, Capital Clawbacks, RAG thresholds, and the CCB 1% Rule.',
    mechanic: 'rolling-cockpit',
    competency: 'tco-forecasting',
    accentColor: 'blue',
    estimatedMinutes: 3,
    xpReward: 300,
    briefing: {
      objective:
        'Step into the Executive Command Cockpit to complete Day 2: manage 5-quarter rolling horizons, respond to a live Q3 commodity & CWIP shock, enforce RAG tolerance triggers, flex budgets for volume, and apply the CCB Zero-Cost Change Rule.',
      howToPlay: [
        'Solve each governance scenario using the Day 2 Topic 4 rules.',
        'In Step 3, stabilize the live 5-Quarter Rolling Forecast Simulator by adjusting Capital Clawback %, Sinking Fund Smoothing, and Liquidity Buffer Days.',
        'Complete all 7 steps to earn your Master certification and download your official PDF Score Report!',
      ],
      keyRules: [
        {
          title: '5-Quarter Rolling & Commitment vs. Cash',
          summary:
            'Always keep a 15-month forward view by adding a new quarter as one closes. Never confuse multi-year legal Commitments with annual Cash Outlays.',
        },
        {
          title: 'RAG Thresholds & CCB 1% Rule',
          summary:
            'Green (<5%), Amber (5–10%), Red (>10% variance triggers corrective plan; 3 Red quarters = ZBR). Scope changes >1% need CCB & Zero-Cost offset.',
        },
      ],
    },
    steps: [
      {
        id: 'l8-s1',
        kind: 'choice',
        badgeText: '5-Quarter Rolling Forecast',
        prompt:
          'Static annual budgets often become obsolete by the end of Q1 when fuel prices or project timelines shift. How does a 5-Quarter (15-Month) Rolling Forecast solve this?',
        options: [
          {
            id: 'a',
            label: 'Continuously looks 5–6 quarters ahead, splicing in closed actuals and adding a new future quarter each cycle',
            detail: 'Eliminates year-end fiscal cliffs and gives treasury an early warning radar.',
          },
          {
            id: 'b',
            label: 'Freezes all departmental spending permanently for 5 years without updates',
            detail: 'Opposite of dynamic adaptive planning.',
          },
          {
            id: 'c',
            label: 'Deletes historical actuals every quarter so variances cannot be measured',
            detail: 'Forecasts must calibrate against verified trailing actuals.',
          },
        ],
        correctOptionId: 'a',
        hint: 'What happens to the 15-month forward horizon when Q1 finishes?',
        explanation:
          'Rolling forecasts decouple strategy from artificial December 31 cliffs, recalibrating revenues, CapEx drawdowns, and OpEx every quarter using verified actuals.',
        takeaway: 'Maintain a continuous 5-Quarter (15-Month) Rolling Forecast horizon.',
      },
      {
        id: 'l8-s2',
        kind: 'choice',
        badgeText: 'Commitment vs. Annual Cash Outlay',
        prompt:
          'SAR signs a 4-year EPC contract worth 2,000,000,000 SAR, with 350,000,000 SAR scheduled for certified Year-1 milestones. How must Treasury & Budget Control record these two numbers?',
        contextBox: {
          title: 'Contract vs. Treasury View',
          metrics: [
            { label: 'Total EPC Contract', value: '2.0B SAR (4 Yrs)' },
            { label: 'Year-1 Milestone Cash', value: '350M SAR' },
          ],
        },
        options: [
          {
            id: 'a',
            label: 'Track 2.0B SAR as Multi-Year Capital Commitment and budget 350M SAR as Year-1 Cash Outlay',
            detail: 'Prevents artificial budget freezes while honoring corporate debt ceilings.',
          },
          {
            id: 'b',
            label: 'Deduct the entire 2.0B SAR from Year-1 operating cash budget',
            detail: 'Creates fake budget exhaustion and freezes shovel-ready projects.',
          },
          {
            id: 'c',
            label: 'Ignore the 2.0B SAR legal liability until Year 4 handover',
            detail: 'Blinds treasury to massive legal encumbrances.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Separate legal contract obligation (Commitment) from certified milestone cash payments (Outlay).',
        explanation:
          'Confusing multi-year legal Capital Commitments with single-year Cash Outlays causes artificial capital freezes or cash surprises. Track commitments against debt ceilings and phase cash outlays by milestone.',
        takeaway: 'Track Legal Commitments across full multi-year horizons; budget Cash Outlays by annual milestone.',
      },
      {
        id: 'l8-s3',
        kind: 'slider-lab',
        title: 'Q3 Mid-Year Shock & Cash Horizon Simulator',
        prompt:
          'Mid-Year Alert: Contractor delays stalled Project Beta (leaving 200M SAR trapped in CWIP), and a 7-year major track renewal spike looms ahead. Configure Capital Clawback, Sinking Fund Smoothing, and Treasury Cash Buffer Days.',
        visualType: 'rolling-forecast',
        sliders: [
          {
            id: 'clawbackPct',
            label: 'Mid-Year Capital Clawback from Stalled Project',
            unit: '% Redeployed',
            min: 0,
            max: 100,
            step: 10,
            defaultValue: 10,
            targetMin: 60,
            targetMax: 90,
          },
          {
            id: 'sinkingFundPct',
            label: '7-Year Track Renewal Sinking Fund Smoothing',
            unit: '% Funded/Yr',
            min: 0,
            max: 100,
            step: 5,
            defaultValue: 20,
            targetMin: 80,
            targetMax: 100,
          },
          {
            id: 'liquidityDays',
            label: 'Treasury Operational Liquidity Buffer',
            unit: 'Days OpEx',
            min: 5,
            max: 90,
            step: 5,
            defaultValue: 10,
            targetMin: 30,
            targetMax: 45,
          },
        ],
        hint: 'Claw back 60–90% of unspent stalled funds to prevent capital sterilization, smooth the 7-year track renewal at 80–100%, and hold a 30–45 day direct OpEx liquidity buffer.',
        explanation:
          'Mid-year Capital Clawbacks redeploy idle money from stalled projects to shovel-ready priorities; multi-year Sinking Funds eliminate episodic track renewal "budget whiplash"; and a 30–45 day cash buffer protects supplier payments.',
        takeaway: 'Prevent capital sterilization via Clawbacks, smooth spikes with Sinking Funds, and keep 30–45 day cash buffers.',
      },
      {
        id: 'l8-s4',
        kind: 'choice',
        badgeText: 'RAG Variance Tolerance & ZBR Trigger',
        prompt:
          'Under Flexible Budgeting, a regional maintenance unit posts an unfavorable variance of +12.4% even after adjusting for actual train-kilometers run. What RAG status and governance rule applies?',
        options: [
          {
            id: 'a',
            label: 'RED (>10%): Mandates executive corrective action & Board reporting; 3 consecutive quarters trigger Zero-Base Redesign (ZBR)',
            detail: 'Green is <5%, Amber is 5%–10%, Red is >10%.',
          },
          {
            id: 'b',
            label: 'AMBER: No review required unless variance exceeds 25%',
            detail: 'Amber is strictly 5%–10%.',
          },
          {
            id: 'c',
            label: 'GREEN: Automatically reward the unit with +12.4% extra baseline next year',
            detail: 'Rewards chronic inefficiency.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Check the RAG thresholds: Green <5%, Amber 5–10%, Red >10%.',
        explanation:
          'Flexible budgeting strips out volume excuses first. A >10% Red variance demands an executive corrective plan, and three consecutive Red quarters trigger mandatory Zero-Base Redesign (ZBR).',
        takeaway: 'Green <5% · Amber 5–10% · Red >10% (3 Red quarters = Zero-Base Redesign).',
      },
      {
        id: 'l8-s5',
        kind: 'choice',
        badgeText: 'CCB 1% Rule & Zero-Cost Change',
        prompt:
          'During construction, an engineering team requests adding decorative architectural canopies that increase project CapEx by 2.2% without Board budget expansion. What must happen?',
        options: [
          {
            id: 'a',
            label: 'Mandatory Change Control Board (CCB) review (>1% rule) + identify an offsetting scope reduction (Zero-Cost Change Rule)',
            detail: 'Stops creeping "engineering gold-plating" from draining contingency.',
          },
          {
            id: 'b',
            label: 'Approve quietly using unallocated corporate contingency without a Change Request',
            detail: 'Violates contingency governance and causes budget creep.',
          },
          {
            id: 'c',
            label: 'Reclassify the canopies as Station Janitorial OpEx',
            detail: 'Illegal accounting misclassification.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Remember the two rules: any single change >1% (or cumulative >5%) goes to CCB, and Zero-Cost Change requires an offset.',
        explanation:
          'Any single engineering scope change >1% (or cumulative >5%) requires full Change Control Board (CCB) approval. Under the Zero-Cost Change Rule, scope additions must be offset elsewhere.',
        takeaway: 'Enforce the CCB 1% Threshold and Zero-Cost Change Rule to crush scope creep.',
      },
      {
        id: 'l8-s6',
        kind: 'choice',
        badgeText: 'Executive Board Narrative',
        prompt:
          'When presenting the Consolidated Annual Capital & Operational Budget Package to the Board of Directors, what turns raw numbers into a compelling strategic decision?',
        options: [
          {
            id: 'a',
            label: 'An Executive Summary Dashboard framing S-curves, sensitivities, risk mitigation, and Vision 2030 connectivity impact',
            detail: 'Demonstrates total command over cost drivers, lifecycle risks, and strategic ROI.',
          },
          {
            id: 'b',
            label: 'Printing a 500-page unformatted spreadsheet of every depot bolt and wrench',
            detail: 'Buries strategic trade-offs in operational noise.',
          },
          {
            id: 'c',
            label: 'Presenting only best-case forecasts while hiding downturn stress tests',
            detail: 'Undermines Audit Committee and Board credibility.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Boards do not read 500-page raw spreadsheets — they govern strategy, risk, and capital velocity.',
        explanation:
          'Board confidence comes from translating financial discipline into a clear strategic story: balanced CapEx S-curves, lifecycle TCO mastery, stress-tested contingencies, and national mobility outcomes.',
        takeaway: 'Communicate budgets as strategic narratives linking capital discipline to national impact.',
      },
      {
        id: 'l8-s7',
        kind: 'choice',
        badgeText: 'Flexible Budgeting Volume Adjustment',
        prompt:
          'Static Freight Fuel Budget was 40M SAR based on 100M GTK. Actual volume surged +20% to 120M GTK, and actual fuel spend came in at 47M SAR. Under Flexible Budgeting, should the Freight Director be flagged Red (+17.5% overrun)?',
        contextBox: {
          title: 'Flexible Budget Check',
          metrics: [
            { label: 'Static Fuel Budget', value: '40M SAR (100M GTK)' },
            { label: 'Flexed Budget (+20% GTK)', value: '48M SAR (120M GTK)' },
            { label: 'Actual Fuel Spend', value: '47M SAR' },
          ],
        },
        options: [
          {
            id: 'a',
            label: 'No — Compare against the 48M SAR Flexed Budget: the unit achieved a 1M SAR (-2.1% Green) efficiency gain!',
            detail: 'Flexible budgeting adjusts variable OpEx allowances for actual workload before evaluating RAG status.',
          },
          {
            id: 'b',
            label: 'Yes — Flag Red immediately and freeze freight trains whenever revenue-earning volume rises',
            detail: 'Penalizing managers for hauling extra paying cargo destroys commercial growth.',
          },
          {
            id: 'c',
            label: 'Capitalize the extra 7M SAR of diesel fuel into CWIP',
            detail: 'Diesel fuel is always direct OpEx.',
          },
        ],
        correctOptionId: 'a',
        hint: 'Compare 47M SAR actual spend against the flexed allowance for 120M GTK (40M × 1.20 = 48M SAR)!',
        explanation:
          'Static budget comparisons punish operations for hauling extra profitable cargo. Flexible budgeting recalculates variable allowances at actual volume (48M SAR), revealing a genuine 1M SAR efficiency improvement!',
        takeaway: 'Flex variable budgets for actual train volume before scoring RAG performance variances.',
      },
    ],
  },
];

export const FIELD_GUIDE_ENTRIES: FieldGuideEntry[] = [
  {
    id: 'fg-1',
    day: 1,
    category: 'Core Classification',
    title: 'CapEx vs. OpEx Fundamental Split',
    formulaOrRule: 'CapEx > 12 Months (Balance Sheet) · OpEx ≤ 12 Months (P&L)',
    summary:
      'CapEx creates, acquires, or extends the useful life/capacity of long-term assets (PP&E or Intangibles). OpEx covers routine daily running, fuel, labor, and baseline upkeep consumed in the current period.',
    railExample:
      'Locomotives & ETCS Level 2 retrofits = CapEx. Diesel fuel, routine tamping, & coach repainting = OpEx.',
  },
  {
    id: 'fg-2',
    day: 1,
    category: 'Core Classification',
    title: 'Materiality & Capitalization Thresholds',
    formulaOrRule: 'Cost < Threshold (e.g., $10k / 37.5k SAR) → Immediate OpEx',
    summary:
      'Even if a minor item lasts 3–5 years physically, organizations expense items below the formal materiality threshold immediately to avoid excessive administrative tracking.',
    railExample: 'Standard track hand tools and office laptops are expensed as OpEx.',
  },
  {
    id: 'fg-3',
    day: 1,
    category: 'Financial Statements',
    title: 'The Financial Statements Trinity & EBITDA',
    formulaOrRule: 'CapEx → Balance Sheet + Investing CF (No Day-1 EBITDA hit)',
    summary:
      'CapEx does not touch EBITDA at purchase; its historical cost flows later as non-cash Depreciation & Amortization below the EBITDA line. OpEx reduces EBITDA dollar-for-dollar immediately.',
    railExample:
      'Improperly capitalizing routine maintenance artificially inflates current EBITDA — a top audit violation.',
  },
  {
    id: 'fg-4',
    day: 1,
    category: 'IFRS Standards',
    title: 'IAS 16 Two-Pronged Test & Component Accounting',
    formulaOrRule: '1) Probable future economic benefits + 2) Reliable cost measurement',
    summary:
      'Complex rail assets are depreciated by major component (subgrade 100 yrs, ballast 15–20 yrs, rails 15–25 yrs, engines 10–12 yrs). Replacing a major component requires derecognizing the old book value.',
    railExample:
      'Replacing a station roof or re-engining a locomotive is CapEx with mandatory derecognition of the retired part.',
  },
  {
    id: 'fg-5',
    day: 1,
    category: 'IFRS Standards',
    title: 'IAS 23 Borrowing Costs & CWIP Handover',
    formulaOrRule: 'Qualifying Asset (>12 mo build) = Capitalize Interest · Zero Dep. on CWIP',
    summary:
      'Interest on loans funding >12-month Qualifying Assets is capitalized during active construction (pausing during halts). CWIP accumulates costs with zero depreciation until formal commissioning handover.',
    railExample:
      '3-year freight bypass construction interest = CapEx. Stalled CWIP >12–24 months risks impairment.',
  },
  {
    id: 'fg-6',
    day: 1,
    category: 'IFRS Standards',
    title: 'IAS 38 Intangibles & The SaaS Cloud Trap',
    formulaOrRule: 'Research Phase = OpEx · Development (6 criteria) = CapEx · SaaS = OpEx',
    summary:
      'Under IFRIC rules, cloud-hosted SaaS subscriptions where the railway does not control the underlying source code cannot be capitalized as intangible assets and must be expensed as OpEx.',
    railExample: '5-year Cloud EAM subscription = OpEx. Owned custom dispatching IP = Intangible CapEx.',
  },
  {
    id: 'fg-7',
    day: 1,
    category: 'IFRS Standards',
    title: 'IFRS 16 Leases & Practical Exemptions',
    formulaOrRule: 'ROU Asset + Liability UNLESS Short-Term (≤12 mo) or Low-Value (<$5k)',
    summary:
      'Almost all leases sit on the Balance Sheet as Right-of-Use (ROU) Assets, except short-term rentals ≤12 months (with no purchase option) and low-value items under ~$5,000.',
    railExample: '6-month generator rental = OpEx. 15-year trainset lease = ROU Asset.',
  },
  {
    id: 'fg-8',
    day: 2,
    category: 'CapEx Planning',
    title: 'Stage-Gate Governance & S-Curve Phasing',
    formulaOrRule: '5 Gates · S-Curve Phasing · Monte Carlo P80 Contingency',
    summary:
      'Funding is released gate-by-gate to defeat the Sunk Cost Fallacy. Capital outlays follow an S-Curve (slow design, steep peak construction, tapering commissioning) backed by P80 probabilistic reserves.',
    railExample: 'Value Engineering achieves maximum savings early in Gates 1–2 before concrete pours.',
  },
  {
    id: 'fg-9',
    day: 2,
    category: 'OpEx Optimization',
    title: 'Zero-Based Budgeting (ZBB) & Activity-Based Costing (ABC)',
    formulaOrRule: 'Zero Baseline · Drivers: GTK, Train-Km, ASK · DAS saves 8–15% energy',
    summary:
      'ZBB eliminates "last year +3%" bloat by tying every Riyal to verified train activity. ABC allocates depot overhead fairly via GTK/Train-Km, while Condition-Based IoT stops 150–200% overtime spikes.',
    railExample: 'Traction power/fuel represents 30–40% of direct rail OpEx.',
  },
  {
    id: 'fg-10',
    day: 2,
    category: 'Lifecycle & TCO',
    title: 'The TCO Iceberg Principle & Procurement Scorecards',
    formulaOrRule: 'TCO = CapEx (15–30%) + OpEx (70–85%) + DR + SD + EnvC (at WACC)',
    summary:
      'Sticker price is just the tip of the iceberg. Desert environments add a 15–25% TCO premium. Modern tenders weight 70% Lifetime TCO / 30% Technical rather than low upfront bid.',
    railExample:
      'Concrete ties & head-hardened steel rail cost more upfront but slash 30-year grinding & replacement OpEx.',
  },
  {
    id: 'fg-11',
    day: 2,
    category: 'Forecasting & Control',
    title: '5-Quarter Rolling Forecasts, RAG & CCB 1% Rule',
    formulaOrRule: 'Green <5% · Amber 5–10% · Red >10% (3x = ZBR) · CCB >1% Change',
    summary:
      '5-Quarter rolling forecasts prevent year-end cliffs. Track multi-year Commitments separately from annual Cash Outlays. Use Mid-Year Clawbacks for stalled projects and Sinking Funds for 7-year renewals.',
    railExample:
      'Zero-Cost Change Rule: any scope addition >1% needs CCB approval plus an offsetting reduction.',
  },
];
