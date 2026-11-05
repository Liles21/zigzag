export interface ActivityItem {
  id: string;
  category: 'policies' | 'issues';
  categoryTitle: string;
  questionNumber: number;
  totalInCategory: number;
  title: string;
  imageSrc: string;
  hint: string;
  description: string;
  keyPoints: string[];
  options: string[];
}

export const ICT_ACTIVITIES: ActivityItem[] = [
  // PART 1: ICT POLICIES (Audience guesses this first)
  {
    id: 'policy-data-privacy',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 1,
    totalInCategory: 5,
    title: 'Data Privacy',
    imageSrc: '/images/ICT%20POLICIES/Data%20Privacy.jpg',
    hint: 'Related to protecting personal information, passwords, and user records from unauthorized access.',
    description: 'Data Privacy policies ensure that students, educators, and staff retain full control over their sensitive information, preventing unauthorized harvesting and surveillance.',
    keyPoints: [
      'Strict consent required before collecting personal identifiable information (PII)',
      'Protection against unauthorized data disclosure and surveillance',
      'Compliance with the Data Privacy Act and institutional security guidelines',
    ],
    options: ['Data Privacy', 'Digital Divide', 'Copyright & Fair Use', 'Internet Addiction'],
  },
  {
    id: 'policy-cyber-security',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 2,
    totalInCategory: 5,
    title: 'Cybersecurity',
    imageSrc: '/images/ICT%20POLICIES/Cyber%20security.jpg',
    hint: 'Defending computers, servers, mobile devices, and digital networks from malicious cyber attacks.',
    description: 'Cybersecurity measures safeguard educational networks, user credentials, and data infrastructure against malware, phishing, and ransomware intrusions.',
    keyPoints: [
      'Multi-factor authentication (MFA) and strong password hygiene',
      'Active firewalls, malware scanners, and encrypted network protocols',
      'Timely software patching to close security vulnerabilities',
    ],
    options: ['Cybersecurity', 'Fake News', 'Cyberbullying', 'Digital Divide'],
  },
  {
    id: 'policy-copyright',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 3,
    totalInCategory: 5,
    title: 'Copyright & Intellectual Property',
    imageSrc: '/images/ICT%20POLICIES/Copyright.jpg',
    hint: 'Legal rights granted to creators to protect their original literary, artistic, and digital creations.',
    description: 'Copyright policies govern the lawful use and attribution of creative assets, promoting fair use in academic research while penalizing digital piracy.',
    keyPoints: [
      'Always attribute and properly cite original authors and sources',
      'Observe Fair Use educational limitations when quoting materials',
      'Zero tolerance for pirated software, books, and stolen media',
    ],
    options: ['Copyright & Intellectual Property', 'Data Privacy', 'Cyberbullying', 'Screen Addiction'],
  },
  {
    id: 'policy-responsible-use',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 4,
    totalInCategory: 5,
    title: 'Responsible Use of Technology',
    imageSrc: '/images/ICT%20POLICIES/Responsible%20use%20of%20Technology.jpg',
    hint: 'Guidelines that promote ethical conduct, academic integrity, and positive digital citizenship.',
    description: 'Responsible Use Policies outline expectations for respectful, constructive, and productive interaction across educational platforms and devices.',
    keyPoints: [
      'Cultivate positive digital citizenship and constructive discussions',
      'Respect academic integrity and refrain from AI/cheat assistance misuse',
      'Protect school equipment and respect community communication channels',
    ],
    options: ['Responsible Use of Technology', 'Digital Divide', 'Privacy Violations', 'Fake News'],
  },
  {
    id: 'policy-digital-accessibility',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 5,
    totalInCategory: 5,
    title: 'Digital Accessibility',
    imageSrc: '/images/ICT%20POLICIES/Digital%20accessibility.jpg',
    hint: 'Designing digital tools and content so that all individuals, including persons with disabilities, can use them.',
    description: 'Digital Accessibility standards ensure equitable educational access through assistive technologies, closed captions, screen-reader compatibility, and high contrast.',
    keyPoints: [
      'Universal design for learning (UDL) across all digital courseware',
      'Captions, transcripts, and alternative text for visual and audio media',
      'Screen reader and keyboard navigation compatibility',
    ],
    options: ['Digital Accessibility', 'Cyberbullying', 'Copyright Law', 'Cybersecurity'],
  },

  // PART 2: ICT ISSUES
  {
    id: 'issue-privacy-violations',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 1,
    totalInCategory: 5,
    title: 'Privacy Violations',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Privacy%20Issues.jpg',
    hint: 'Unauthorized harvesting, tracking, or leaking of confidential personal information and secrets.',
    description: 'Privacy violations occur when bad actors or negligent systems leak, sell, or exploit sensitive student and user data without explicit permission.',
    keyPoints: [
      'Doxxing and unpermitted sharing of private conversations or photos',
      'Invasive telemetry and third-party commercial data brokers',
      'Identity theft and targeted social engineering schemes',
    ],
    options: ['Privacy Violations', 'Digital Divide', 'Digital Accessibility', 'Copyright'],
  },
  {
    id: 'issue-cyberbullying',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 2,
    totalInCategory: 5,
    title: 'Cyberbullying & Online Harassment',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Cyber%20bullying.jpg',
    hint: 'Repeated aggressive or intimidating behavior executed through social media, chat rooms, or digital forums.',
    description: 'Cyberbullying involves using digital communication tools to humiliate, threaten, or persecute peers, leading to severe psychological distress.',
    keyPoints: [
      'Targeted trolling, hate speech, and exclusionary group chats',
      'Spreading defamatory rumors or fabricated images online',
      'Importance of reporting mechanisms, bystander intervention, and empathy',
    ],
    options: ['Cyberbullying & Online Harassment', 'Responsible Use', 'Internet Addiction', 'Data Privacy'],
  },
  {
    id: 'issue-fake-news',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 3,
    totalInCategory: 5,
    title: 'Fake News & Misinformation',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Fake%20news.jpg',
    hint: 'Deliberately fabricated headlines and falsified stories designed to mislead public opinion.',
    description: 'Misinformation and disinformation erode civic trust, distort critical issues, and spread virally when media literacy and fact-checking are absent.',
    keyPoints: [
      'Deepfakes, deceptive headlines, and sensationalized clickbait',
      'Algorithmic echo chambers reinforcing confirmation bias',
      'Critical thinking requirement: cross-check authors, dates, and primary sources',
    ],
    options: ['Fake News & Misinformation', 'Digital Divide', 'Copyright Law', 'Cybersecurity'],
  },
  {
    id: 'issue-digital-divide',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 4,
    totalInCategory: 5,
    title: 'Digital Divide',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Digital%20divide.jpg',
    hint: 'The gap between individuals with modern internet and computers versus those without access.',
    description: 'The Digital Divide highlights educational and socioeconomic inequality between students with fast fiber internet and devices versus those in underserved rural communities.',
    keyPoints: [
      'Disparities in hardware availability and reliable electrical grids',
      'High-speed broadband access limitations in remote areas',
      'The need for government subsidies, public Wi-Fi, and school device lending',
    ],
    options: ['Digital Divide', 'Fake News', 'Cyberbullying', 'Internet Addiction'],
  },
  {
    id: 'issue-internet-addiction',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 5,
    totalInCategory: 5,
    title: 'Internet Addiction',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Internet%20Addiction.jpg',
    hint: 'Excessive, uncontrolled digital media and screen consumption interfering with daily life and sleep.',
    description: 'Internet and screen addiction impairs cognitive focus, disrupts sleep schedules, and isolates individuals from physical social connections.',
    keyPoints: [
      'Dopamine loops in algorithmic infinite-scroll feeds and gaming',
      'Sedentary lifestyle risks, visual strain, and sleep deprivation',
      'Encouraging digital detoxes, time caps, and real-world interpersonal balance',
    ],
    options: ['Internet Addiction', 'Digital Accessibility', 'Data Privacy', 'Cybersecurity'],
  },
];

export function getActivitiesByCategory(category: 'policies' | 'issues'): ActivityItem[] {
  return ICT_ACTIVITIES.filter((item) => item.category === category);
}

export function getActivityById(id: string): ActivityItem | undefined {
  return ICT_ACTIVITIES.find((item) => item.id === id);
}
