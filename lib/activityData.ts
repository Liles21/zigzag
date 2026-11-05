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
  // PART 1: ICT POLICIES (Strictly matching the 4 policies on the paper)
  {
    id: 'policy-data-privacy',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 1,
    totalInCategory: 4,
    title: 'Data Privacy',
    imageSrc: '/images/ICT%20POLICIES/Data%20Privacy.jpg',
    hint: 'Related to protecting personal information, passwords, and user records from unauthorized access.',
    description: 'Data Privacy policies ensure that students, educators, and staff retain full control over their sensitive information, preventing unauthorized harvesting and surveillance.',
    keyPoints: [
      'Strict consent required before collecting personal identifiable information (PII)',
      'Protection against unauthorized data disclosure and surveillance',
      'Compliance with privacy laws and institutional security guidelines',
    ],
    options: ['Data Privacy', 'Anti-Cybercrime', 'Copyright', 'Responsible Use of Technology'],
  },
  {
    id: 'policy-anti-cybercrime',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 2,
    totalInCategory: 4,
    title: 'Anti-Cybercrime',
    imageSrc: '/images/ICT%20POLICIES/Cyber%20security.jpg',
    hint: 'Legal measures, rules, and defenses against hacking, unauthorized system access, and cyber attacks.',
    description: 'Anti-Cybercrime policies establish strict legal frameworks and security safeguards against malicious hacking, identity theft, malware, and unauthorized intrusions.',
    keyPoints: [
      'Prohibiting illegal computer access, password cracking, and malicious attacks',
      'Implementing secure authentication, firewalls, and data protection safeguards',
      'Enforcing institutional penalties and legal accountability for digital offenses',
    ],
    options: ['Anti-Cybercrime', 'Fake News', 'Cyberbullying', 'Data Privacy'],
  },
  {
    id: 'policy-copyright',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 3,
    totalInCategory: 4,
    title: 'Copyright',
    imageSrc: '/images/ICT%20POLICIES/Copyright.jpg',
    hint: 'Legal protection granted to authors and creators for their original digital and artistic works.',
    description: 'Copyright policies govern the lawful use and attribution of creative assets, promoting fair use in academic research while penalizing digital piracy.',
    keyPoints: [
      'Always attribute and properly cite original authors and sources',
      'Observe Fair Use educational limitations when quoting materials',
      'Zero tolerance for pirated software, books, and stolen media',
    ],
    options: ['Copyright', 'Anti-Cybercrime', 'Cyberbullying', 'Internet Addiction'],
  },
  {
    id: 'policy-responsible-use',
    category: 'policies',
    categoryTitle: 'ICT POLICIES',
    questionNumber: 4,
    totalInCategory: 4,
    title: 'Responsible Use of Technology',
    imageSrc: '/images/ICT%20POLICIES/Responsible%20use%20of%20Technology.jpg',
    hint: 'Guidelines that promote ethical conduct, academic integrity, and positive digital citizenship.',
    description: 'Responsible Use Policies outline expectations for respectful, constructive, and productive interaction across educational platforms and devices.',
    keyPoints: [
      'Cultivate positive digital citizenship and constructive discussions',
      'Respect academic integrity and ethical guidelines online',
      'Protect school equipment and respect community communication channels',
    ],
    options: ['Responsible Use of Technology', 'Privacy Issues', 'Fake News', 'Copyright'],
  },

  // PART 2: ICT ISSUES (Strictly matching the 4 issues on the paper)
  {
    id: 'issue-cyberbullying',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 1,
    totalInCategory: 4,
    title: 'Cyberbullying',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Cyber%20bullying.jpg',
    hint: 'Repeated aggressive or intimidating behavior executed through social media, chat rooms, or digital forums.',
    description: 'Cyberbullying involves using digital communication tools to humiliate, threaten, or persecute peers, leading to severe psychological distress.',
    keyPoints: [
      'Targeted trolling, hate speech, and exclusionary group chats',
      'Spreading defamatory rumors or fabricated images online',
      'Importance of reporting mechanisms, bystander intervention, and empathy',
    ],
    options: ['Cyberbullying', 'Data Privacy', 'Internet Addiction', 'Anti-Cybercrime'],
  },
  {
    id: 'issue-fake-news',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 2,
    totalInCategory: 4,
    title: 'Fake News',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Fake%20news.jpg',
    hint: 'Deliberately fabricated headlines and falsified stories designed to mislead public opinion.',
    description: 'Fake News and misinformation erode public trust, distort critical issues, and spread virally when media literacy and fact-checking are absent.',
    keyPoints: [
      'Deepfakes, deceptive headlines, and sensationalized clickbait',
      'Algorithmic echo chambers reinforcing confirmation bias',
      'Critical thinking requirement: cross-check authors, dates, and primary sources',
    ],
    options: ['Fake News', 'Responsible Use of Technology', 'Copyright', 'Anti-Cybercrime'],
  },
  {
    id: 'issue-internet-addiction',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 3,
    totalInCategory: 4,
    title: 'Internet Addiction',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Internet%20Addiction.jpg',
    hint: 'Excessive, uncontrolled digital media and screen consumption interfering with daily life and sleep.',
    description: 'Internet and screen addiction impairs cognitive focus, disrupts sleep schedules, and isolates individuals from physical social connections.',
    keyPoints: [
      'Compulsive infinite-scroll feeds and obsessive online gaming',
      'Sedentary lifestyle risks, visual strain, and sleep deprivation',
      'Encouraging digital detoxes, time caps, and real-world interpersonal balance',
    ],
    options: ['Internet Addiction', 'Data Privacy', 'Cyberbullying', 'Anti-Cybercrime'],
  },
  {
    id: 'issue-privacy-issues',
    category: 'issues',
    categoryTitle: 'ICT ISSUES',
    questionNumber: 4,
    totalInCategory: 4,
    title: 'Privacy Issues',
    imageSrc: '/images/ICT%20POLICIES/ICT%20ISSUES/Privacy%20Issues.jpg',
    hint: 'Unauthorized harvesting, tracking, or leaking of confidential personal information and secrets.',
    description: 'Privacy Issues occur when bad actors or negligent systems leak, sell, or exploit sensitive student and user data without explicit permission.',
    keyPoints: [
      'Doxxing and unpermitted sharing of private conversations or photos',
      'Invasive telemetry and third-party commercial data brokers',
      'Identity theft and targeted social engineering schemes',
    ],
    options: ['Privacy Issues', 'Responsible Use of Technology', 'Fake News', 'Copyright'],
  },
];

export function getActivitiesByCategory(category: 'policies' | 'issues'): ActivityItem[] {
  return ICT_ACTIVITIES.filter((item) => item.category === category);
}

export function getActivityById(id: string): ActivityItem | undefined {
  return ICT_ACTIVITIES.find((item) => item.id === id);
}
