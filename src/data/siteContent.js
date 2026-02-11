import PortraitOne from '../assets/images/IMG_9488.JPG'
import PortraitTwo from '../assets/images/IMG_9517.JPG'
import PortraitThree from '../assets/images/IMG_9524.JPG'
import LogoKdn from '../assets/images/kdn.jpeg'
import LogoGdg from '../assets/images/GDG Babcock.jpeg'
import LogoUfit from '../assets/images/ufitfly.jpeg'
import LogoSchulich from '../assets/images/schulich.jpeg'
import LogoNsbe from '../assets/images/nsbe.jpeg'

export const heroContent = {
  script: 'Alli',
  name: ['Sodeeq', 'Ayobami'],
  role: 'Software Engineer',
  sub: 'Located Calgary, AB · MEng @ University of Calgary',
  email: 'sodeeqalli@gmail.com',
}

export const aboutContent = {
  portraits: [
    { src: PortraitOne, alt: 'Portrait of Sodeeq in purple tones' },
    { src: PortraitTwo, alt: 'Portrait of Sodeeq in yellow tones' },
    { src: PortraitThree, alt: 'Portrait of Sodeeq close-up' },
  ],
  quickFacts: [
    '21',
    'Located Calgary, AB',
    'MEng @ University of Calgary',
    'Love football more than words can express',
    'I also love teaching',
    'I play table-tennis',
    'Python, AWS, JS',
  ],
  paragraphs: [
    'I am a dedicated and results-driven Software and Cloud Engineer with a strong foundation in computer science and a passion for developing innovative solutions. With expertise in Python, JavaScript, and modern cloud tooling, I design, implement, and maintain scalable applications and cloud infrastructure.',
    'My experience spans full-stack development, cloud architecture, and DevOps practices. I thrive in collaborative teams and enjoy moving projects from concept to deployment with a focus on reliability and performance.',
    'I am committed to continuous learning and staying current with modern tooling and patterns. My goal is to build impactful software that aligns with business needs and delivers great user experiences.',
  ],
}

export const skills = [
  { name: 'Python', level: 80 },
  { name: 'GitHub', level: 80 },
  { name: 'Git', level: 80 },
  { name: 'JavaScript', level: 70 },
  { name: 'Node.js', level: 70 },
  { name: 'React', level: 70 },
  { name: 'Dart', level: 70 },
  { name: 'Java', level: 40 },
  { name: 'C++', level: 40 },
]

export const projectEntries = [
  {
    name: 'Cloud Expense Tracker',
    summary: 'Serverless cost dashboards with automated budget alerts and reporting.',
    story:
      'Born from monthly budget surprises, this project stitches together event-driven functions, workflow automation, and lightweight BI dashboards to surface spending anomalies in near real time. It also generates weekly digests for finance stakeholders.',
    media: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Case Study', href: 'https://github.com/yourusername/cloud-expense-tracker' },
    tags: ['project', 'python', 'serverless'],
  },
  {
    name: 'Realtime Fleet Monitor',
    summary: 'Live geolocation pipeline using Node.js, websockets, and MQTT brokers.',
    story:
      'Designed to coordinate field engineers, the monitor ingests vehicle telemetry via MQTT brokers, enriches it with weather alerts, and streams live status dashboards built in React. Dispatchers can replay any journey to debug incidents.',
    media: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'Watch Demo', href: 'https://fleet-monitor.example.com' },
    tags: ['project', 'node.js', 'javascript', 'iot'],
  },
  {
    name: 'AI Resume Ranker',
    summary: 'LangChain-powered evaluator that scores resumes against job descriptions.',
    story:
      'An internal hiring assistant that uses embeddings to match applicants to roles, highlight skill gaps, and suggest interview questions. Built with LangChain, Pinecone, and a FastAPI backend tuned for low-latency inference.',
    media: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'Explore Repo', href: 'https://github.com/yourusername/ai-resume-ranker' },
    tags: ['project', 'python', 'ai', 'ml'],
  },
  {
    name: 'React Design System',
    summary: 'Composable component library with themed tokens and accessibility baked in.',
    story:
      'A multi-brand design system leveraging Storybook, CSS variables, and unit-tested primitives. It cut new feature build time by 30% and ensures WCAG conformance across marketing and product surfaces.',
    media: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'Browse Storybook', href: 'https://design-system.example.com' },
    tags: ['project', 'react', 'javascript', 'design'],
  },
  {
    name: 'Dart Task Companion',
    summary: 'Cross-platform productivity app syncing Flutter clients with Firebase.',
    story:
      'Personal productivity side project focussed on offline-first sync and habit loops. Built with Flutter, Firebase, and Riverpod, it keeps tasks consistent across devices even on spotty connections.',
    media: 'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'See Live Build', href: 'https://task-companion.example.com' },
    tags: ['project', 'dart', 'flutter', 'firebase'],
  },
  {
    name: 'Observability Mesh',
    summary: 'Distributed tracing setup bridging OpenTelemetry collectors with Grafana dashboards.',
    story:
      'Mission was to unify metrics, logs, and traces. Implemented a Kubernetes add-on mesh that forwards telemetry to Grafana Loki and Tempo, with SLO alerts via PagerDuty and auto-remediation playbooks.',
    media: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Architecture', href: 'https://github.com/yourusername/observability-mesh' },
    tags: ['project', 'observability', 'devops'],
  },
  {
    name: 'Systems Design Nanodegree',
    summary: 'Capstone credential focused on distributed systems, caching, and scalability trade-offs.',
    story:
      'Completed real-world architecture labs covering load balancing, data partitioning, and chaos testing. Culminated in designing a video streaming platform with automated resilience drills.',
    media: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Credential', href: 'https://graduation.example.com/systems-design' },
    tags: ['certification', 'architecture'],
  },
  {
    name: 'Google Cloud Digital Leader',
    summary: 'Demonstrated cloud strategy leadership across GCP products and services.',
    story:
      'Exam covered cloud transformation case studies, data analytics, and ML strategy. It broadened my multi-cloud perspective when advising stakeholders.',
    media: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Credential', href: 'https://www.credly.com/badges/google-cloud-digital-leader' },
    tags: ['certification', 'cloud', 'strategy'],
  },
  {
    name: 'Scrum Master PSM I',
    summary: 'Certified in agile facilitation, sprint planning, and continuous delivery coaching.',
    story:
      'Proved mastery of Scrum framework and facilitation techniques that keep product and engineering aligned. Helps drive predictable delivery and healthy agile rituals on complex programs.',
    media: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
    cta: { label: 'View Credential', href: 'https://www.scrum.org/certification-listing' },
    tags: ['certification', 'agile', 'leadership'],
  },
]

export const tagLabels = {
  project: 'Projects',
  certification: 'Certifications',
  python: 'Python',
  serverless: 'Serverless',
  'node.js': 'Node.js',
  javascript: 'JavaScript',
  iot: 'IoT',
  ai: 'AI',
  ml: 'Machine Learning',
  react: 'React',
  design: 'Design Systems',
  dart: 'Dart',
  flutter: 'Flutter',
  firebase: 'Firebase',
  observability: 'Observability',
  devops: 'DevOps',
  architecture: 'Architecture',
  cloud: 'Cloud',
  strategy: 'Strategy',
  agile: 'Agile',
  leadership: 'Leadership',
}

export const experienceCards = [
  {
    company: 'Schulich Ignite · UofC',
    role: 'Python Mentor',
    dates: 'Sep 2025 – Present · Calgary, CA',
    image: LogoSchulich,
  },
  {
    company: 'NSBE · UofC',
    role: 'Software Engineer',
    dates: 'Oct 2025 – Present · Calgary, CA',
    image: LogoNsbe,
  },
  {
    company: 'KDN+',
    role: 'Software Engineer',
    dates: 'Jul 2024 – Oct 2024 · Remote',
    image: LogoKdn,
  },
  {
    company: 'GDG On Campus · Babcock',
    role: 'Mobile Application Developer',
    dates: 'Jan 2024 – Jul 2024 · Ogun, NG',
    image: LogoGdg,
  },
  {
    company: 'UfitFly',
    role: 'Intern',
    dates: 'Jan 2023 – Jul 2023 · Oyo, NG',
    image: LogoUfit,
  },
]

export const timelineBounds = { minYear: 2004, maxYear: 2025 }

export const timelineEvents = [
  {
    year: 2004,
    title: 'Hello World 🌍',
    description: 'Born in Lagos, Nigeria and instantly surrounded by curiosity and rhythm.',
    type: 'milestone',
  },
  {
    year: 2010,
    title: 'First Classroom Adventure',
    description: 'Started primary school, leading every group science project I could join.',
    type: 'school',
  },
  {
    year: 2013,
    title: 'Tinkering with Tech',
    description: 'Pulled apart a family computer to understand how the magic worked (and successfully reassembled it!).',
    type: 'milestone',
  },
  {
    year: 2016,
    title: 'STEM High School',
    description: 'Enrolled in a science-focused secondary school and dove deep into math, physics, and robotics.',
    type: 'school',
  },
  {
    year: 2019,
    title: 'Code Club Captain',
    description: 'Organised after-school coding meetups and guided classmates through HTML, CSS, and basic Python.',
    type: 'milestone',
  },
  {
    year: 2021,
    title: 'Computer Science Undergraduate',
    description: 'Began BSc studies, focusing on software engineering, algorithms, and cloud architecture.',
    type: 'school',
  },
  {
    year: 2022,
    title: 'Cloud Engineering Intern',
    description: 'Automated cloud infrastructure, writing IaC templates and ensuring deployments were reproducible.',
    type: 'work',
  },
  {
    year: 2023,
    title: 'Full-Stack Product Intern',
    description: 'Shipped React/Node features and implemented observability for more reliable user experiences.',
    type: 'work',
  },
  {
    year: 2024,
    title: 'Community Builder',
    description: 'Hosted workshops on cloud-native patterns and mentored new developers entering tech.',
    type: 'milestone',
  },
  {
    year: 2025,
    title: 'Software & Cloud Engineer',
    description: 'Designing resilient systems, advising teams on architecture, and constantly learning the next big thing.',
    type: 'work',
  },
]

export const stageNarratives = [
  { maxAge: 2, label: 'Infant Explorer', note: 'Tiny footsteps and endless wonder.' },
  { maxAge: 6, label: 'Curious Kid', note: 'Asking why about everything under the sun.' },
  { maxAge: 12, label: 'Young Tinkerer', note: 'Building, breaking, and rebuilding gadgets.' },
  { maxAge: 18, label: 'STEM Trailblazer', note: 'Leading school teams and STEM initiatives.' },
  { maxAge: 22, label: 'Emerging Engineer', note: 'Leveling up through university labs and internships.' },
  { maxAge: 40, label: 'Systems Craftsman', note: 'Designing cloud-native journeys with confidence.' },
]

export const linkItems = [
  { label: 'X', href: 'https://x.com/allisodeeq_' },
  { label: 'Instagram', href: 'https://www.instagram.com/sodeeq.alli/' },
  { label: 'Discord', href: 'https://discordapp.com/users/sodeeqalli' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sodeeq-alli-94071b267/' },
  { label: 'Credly', href: 'https://www.credly.com/users/sodeeq-alli' },
]
