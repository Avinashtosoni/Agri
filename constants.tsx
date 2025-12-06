import React from 'react';
import { 
  Project, 
  StatMetric, 
  BlogPost, 
  Alumni, 
  SiteContent, 
  ViewState, 
  NewsEvent, 
  ContactSubmission, 
  RegistrationSubmission, 
  TrainingSubmission, 
  FormDefinition,
  HeaderConfig,
  FooterConfig,
  PageContent
} from './types';
import { 
  Users, 
  BookOpen, 
  Target, 
  Globe 
} from 'lucide-react';

export const APP_NAME = "AquaAgri";
export const APP_FULL_NAME = "AquaAgri Pathfinder";
export const APP_HINDI_NAME = "एक्वा एग्री पाथफाइंडर";

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Training on "Aqua-clinics and Entrepreneur Development Program"',
    category: 'Training',
    description: 'A comprehensive 5-day training program focusing on setting up aqua-clinics, disease management, and business strategies for ornamental fisheries.',
    imageUrl: 'https://picsum.photos/800/600?random=10',
    status: 'Upcoming',
    date: '2024-05-27',
    location: 'Udaipur Center'
  },
  {
    id: '2',
    title: 'Ornamental Fish Breeding and Culture',
    category: 'Workshop',
    description: 'Hands-on workshop on breeding techniques for Livebearers and Egg layers, including water quality management.',
    imageUrl: 'https://picsum.photos/800/600?random=11',
    status: 'Ongoing',
    date: '2024-05-20',
    location: 'Main Lab'
  },
  {
    id: '3',
    title: 'Export Promotion of Ornamental Fisheries',
    category: 'Research',
    description: 'Strategic analysis of export potential for indigenous ornamental fish species from Rajasthan.',
    imageUrl: 'https://picsum.photos/800/600?random=12',
    status: 'Completed',
    date: '2024-04-10',
    location: 'Remote'
  },
  {
    id: '4',
    title: 'Aquarium Fabrication and Maintenance',
    category: 'Training',
    description: 'Skill development course for youth on glass tank fabrication, filtration systems, and planted aquariums.',
    imageUrl: 'https://picsum.photos/800/600?random=13',
    status: 'Upcoming',
    date: '2024-06-15',
    location: 'Vocational Hall'
  }
];

export const MOCK_NEWS: NewsEvent[] = [
  {
    id: 'n1',
    title: 'TRAINING ANNOUNCEMENT',
    content: 'On-line training aquarium technicians (English) » On-line Training Aquarium Technician (HINDI)',
    date: '2024-06-01',
    imageUrl: 'https://picsum.photos/100/100?random=30',
    status: 'Published',
    category: 'Training'
  },
  {
    id: 'n2',
    title: 'Training on "Aqua-clinics and Entrepreneur Development Program"',
    content: 'Dates: 07.01.2019 to 03.02.2019 S.No. Name Gender State 1 Dr. Suman Sharad Raosaheb...',
    date: '2019-01-07',
    imageUrl: 'https://picsum.photos/100/100?random=31',
    status: 'Published',
    category: 'Training'
  },
  {
    id: 'n3',
    title: 'AquaAgri awarded for contribution to ornamental fisheries development',
    content: 'The AquaAgri Pathfinder institute was awarded for its contribution to...',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/100/100?random=32',
    status: 'Published',
    category: 'Awards'
  }
];

export const MOCK_PUBLICATIONS: NewsEvent[] = [
  {
    id: 'p1',
    title: 'Issues concerning export promotion of ornamental fisheries trade in India',
    content: 'Atul Kumar Jain AquaAgri Pathfinder, Udaipur www.aquaagri.org',
    date: '2024',
    imageUrl: 'https://picsum.photos/100/100?random=40',
    status: 'Published'
  },
  {
    id: 'p2',
    title: 'Rajasthan: A state of Thar deserts now contributes to development of skilled men power in ornamental fisheries',
    content: 'Atul Kumar Jain1, Abhinika Jain1 and Amit Purohit2 AquaAgri Pathfinder,...',
    date: '2023',
    imageUrl: 'https://picsum.photos/100/100?random=41',
    status: 'Published'
  },
  {
    id: 'p3',
    title: 'Best management practices for freshwater ornamental fish production',
    content: 'Jain, A.K., Saini, V.P. and Kaur, V.I., Best management practices for freshwater ornamental...',
    date: '2022',
    imageUrl: 'https://picsum.photos/100/100?random=42',
    status: 'Published'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Lesson 3.2: Filters for Aquarium-Types of Filters',
    excerpt: 'Understanding the different types of filtration systems crucial for maintaining healthy aquarium ecosystems.',
    content: '<h2>Types of Aquarium Filters</h2><p>Proper filtration is essential for maintaining a healthy aquarium environment...</p>',
    date: '2024-05-01',
    imageUrl: 'https://picsum.photos/400/300?random=20',
    author: 'Dr. Atul Kumar Jain',
    category: 'Education',
    status: 'Published',
    views: 1250,
    tags: ['filtration', 'aquarium', 'maintenance'],
    readTime: '5 min read'
  },
  {
    id: 'b2',
    title: 'Lesson 3.1: Auto-removal of fish waste and uneaten food',
    excerpt: 'Innovative methods for keeping aquarium substrates clean and reducing ammonia spikes.',
    content: '<h2>Waste Management in Aquariums</h2><p>Effective waste removal is crucial for fish health...</p>',
    date: '2024-04-25',
    imageUrl: 'https://picsum.photos/400/300?random=21',
    author: 'Dr. Atul Kumar Jain',
    category: 'Maintenance',
    status: 'Published',
    views: 843,
    tags: ['maintenance', 'water quality'],
    readTime: '4 min read'
  },
  {
    id: 'b3',
    title: 'Breeding Techniques for Ornamental Fish',
    excerpt: 'Complete guide to breeding popular ornamental fish species in home aquariums.',
    content: '<h2>Breeding Ornamental Fish</h2><p>Learn the essential techniques for successful breeding...</p>',
    date: '2024-06-10',
    imageUrl: 'https://picsum.photos/400/300?random=22',
    author: 'Dr. Atul Kumar Jain',
    category: 'Education',
    status: 'Published',
    views: 2100,
    tags: ['breeding', 'fish culture'],
    readTime: '8 min read'
  },
  {
    id: 'b4',
    title: 'Water Quality Parameters for Healthy Fish',
    excerpt: 'Essential water quality parameters every fish keeper should monitor regularly.',
    content: '<h2>Water Quality Management</h2><p>Maintaining optimal water parameters is key to fish health...</p>',
    date: '2024-05-20',
    imageUrl: 'https://picsum.photos/400/300?random=23',
    author: 'Dr. Atul Kumar Jain',
    category: 'Research',
    status: 'Published',
    views: 1580,
    tags: ['water quality', 'parameters'],
    readTime: '6 min read'
  },
  {
    id: 'b5',
    title: 'Setting Up Your First Aquarium',
    excerpt: 'Step-by-step guide for beginners to set up their first aquarium successfully.',
    content: '<h2>Aquarium Setup Guide</h2><p>Starting your first aquarium can be exciting...</p>',
    date: '2024-06-15',
    imageUrl: 'https://picsum.photos/400/300?random=24',
    author: 'Dr. Atul Kumar Jain',
    category: 'General',
    status: 'Published',
    views: 3200,
    tags: ['beginner', 'setup', 'aquarium'],
    readTime: '10 min read',
    isFeatured: true
  },
  {
    id: 'b6',
    title: 'Common Fish Diseases and Treatment',
    excerpt: 'Identify and treat common diseases affecting ornamental fish in aquariums.',
    content: '<h2>Fish Disease Management</h2><p>Early detection and treatment of fish diseases...</p>',
    date: '2024-05-05',
    imageUrl: 'https://picsum.photos/400/300?random=25',
    author: 'Dr. Atul Kumar Jain',
    category: 'Maintenance',
    status: 'Published',
    views: 1890,
    tags: ['disease', 'treatment', 'health'],
    readTime: '7 min read'
  }
];

export const BLOG_CATEGORIES = ['Education', 'Maintenance', 'Research', 'Events', 'General'];
export const NEWS_CATEGORIES = ['General', 'Training', 'Awards', 'Press Release', 'Updates'];

const ALUMNI_LIST: Alumni[] = [
  { id: 'a1', name: 'Amit Bakade', batch: '2018', degree: 'Certificate in Ornamental Fish Culture', currentPosition: 'Aquarium Technician', company: 'AquaTech Solutions', location: 'Mumbai, Maharashtra', email: 'amit.b@example.com', phone: '+91-9876543210', linkedIn: 'https://linkedin.com/in/amitbakade', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg', achievements: 'Started own aquarium maintenance business serving 50+ clients', status: 'Published' },
  { id: 'a2', name: 'Pritam Chavanke', batch: '2019', degree: 'Advanced Training in Aqua-clinics', currentPosition: 'Fish Health Consultant', company: 'Self-Employed', location: 'Pune, Maharashtra', email: 'pritam.c@example.com', phone: '+91-9123456789', imageUrl: 'https://randomuser.me/api/portraits/men/45.jpg', achievements: 'Established aqua-clinic serving 200+ fish farmers', status: 'Published' },
  { id: 'a3', name: 'Abhijeet Patil', batch: '2020', degree: 'Diploma in Ornamental Fisheries', currentPosition: 'Breeding Specialist', company: 'Exotic Fish Farms Pvt Ltd', location: 'Bangalore, Karnataka', email: 'abhijeet.p@example.com', linkedIn: 'https://linkedin.com/in/abhijeetpatil', imageUrl: 'https://randomuser.me/api/portraits/men/22.jpg', achievements: 'Successfully bred 15+ exotic species', status: 'Published' },
  { id: 'a4', name: 'Shubham Kumar', batch: '2021', degree: 'Certificate in Aquarium Fabrication', currentPosition: 'Workshop Manager', company: 'Crystal Aquariums', location: 'Delhi, NCR', email: 'shubham.k@example.com', phone: '+91-9988776655', imageUrl: 'https://randomuser.me/api/portraits/men/11.jpg', status: 'Published' },
  { id: 'a5', name: 'Priya Sharma', batch: '2019', degree: 'Advanced Training in Ornamental Fish', currentPosition: 'Export Manager', company: 'Marine Exports India', location: 'Chennai, Tamil Nadu', email: 'priya.s@example.com', linkedIn: 'https://linkedin.com/in/priyasharma', imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg', achievements: 'Facilitated exports worth ₹2 Cr annually', status: 'Published' },
  { id: 'a6', name: 'Rajesh Verma', batch: '2017', degree: 'Certificate in Ornamental Fish Culture', currentPosition: 'Farm Owner', company: 'Verma Fish Farm', location: 'Udaipur, Rajasthan', imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg', achievements: 'Operates 5-acre ornamental fish farm', status: 'Published' },
];

export { ALUMNI_LIST };

export const GALLERY_IMAGES = [
  "https://picsum.photos/800/600?random=100",
  "https://picsum.photos/800/600?random=101",
  "https://picsum.photos/800/600?random=102",
  "https://picsum.photos/800/600?random=103",
  "https://picsum.photos/800/600?random=104"
];

export const ABOUT_CARDS = [
  {
    title: "Introduction",
    image: "https://picsum.photos/400/300?random=200",
    text: "AquaAgri Pathfinder was established by Dr Atul Kumar Jain in 2006 as a privately-owned institute which is presently governed as a trust. The founder was a 'Fisheries Scientist' at Central Institute of Fisheries Education (Indian Council of Agricultural Research, New Delhi)."
  },
  {
    title: "Recognition",
    image: "https://picsum.photos/400/300?random=201",
    text: "Our continuous efforts to work towards our mission of 'Promoting ornamental fish keeping hobby through entrepreneurship promotion and skill development' has helped us to get recognition by several government agencies for imparting entrepreneurship and skill development training in ornamental fisheries."
  },
  {
    title: "Facilities",
    image: "https://picsum.photos/400/300?random=202",
    text: "The centre is equipped with modern teaching facilities as well as for practical classes. There is a classroom with a sitting capacity of 35 trainees which is equipped with the latest audio-video aids. There are indoor and outdoor hatcheries, a workshop and a well-equipped laboratory for water and soil analysis."
  },
  {
    title: "Faculty",
    image: "https://picsum.photos/400/300?random=203",
    text: "The training faculty at AquaAgri included highly qualified and experienced personals. The faculty members are having expertise in different fields of ornamental fisheries viz; ornamental fish production, farm designing, aquarium fabrication, marketing as well as entrepreneurship development."
  }
];

export const DEFAULT_STATS: StatMetric[] = [
  { label: 'TRAINING PROGRAMS ORGANIZED', value: '43', icon: <BookOpen className="w-6 h-6"/> },
  { label: 'CANDIDATES TRAINED', value: '628', icon: <Users className="w-6 h-6"/> },
  { label: 'E-BULLETIN', value: '35', icon: <Globe className="w-6 h-6"/> },
  { label: 'FARM VISITS', value: '23', icon: <Target className="w-6 h-6"/> },
];

export const MOCK_PAGES: PageContent[] = [
  {
    id: 'page_student_support',
    title: 'Student & Community Support',
    slug: 'student-community-support',
    content: `
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Student & Community Support</h1>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
          <p class="text-lg text-gray-700">We provide comprehensive support to fish farmers, startups, and aspiring entrepreneurs in the ornamental fisheries sector.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Support to Fish Farmers & Startups</h3>
            <p class="text-gray-600">Direct assistance to fish farmers and new startups with technical guidance, problem-solving, and best practices implementation.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Access to Essential Tools & Inputs</h3>
            <p class="text-gray-600">Provision of essential tools, quality inputs, and demonstration units to help you get started with your fish farming venture.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Enterprise Development Support</h3>
            <p class="text-gray-600">Stepwise guidance for transforming your projects into sustainable enterprises with business planning and market strategies.</p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Ongoing Technical Advice</h3>
            <p class="text-gray-600">Continuous technical advisory support for improvement, optimization, and scaling of your operations.</p>
          </div>
        </div>
      </div>
    `,
    lastUpdated: '2025-01-15',
    status: 'Published'
  },
  {
    id: 'page_training',
    title: 'Training & Capacity Building',
    slug: 'training-capacity-building',
    content: `
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Training & Capacity Building</h1>
        
        <div class="bg-green-50 border-l-4 border-green-500 p-6 mb-6">
          <p class="text-lg text-gray-700">Comprehensive training programs designed to build skills from basics to advanced levels in ornamental fisheries.</p>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-green-600 mb-3">Short Courses on Fish Farming Techniques</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Ornamental fish breeding and culture</li>
              <li>Water quality management</li>
              <li>Disease diagnosis and treatment</li>
              <li>Feed formulation and nutrition</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-green-600 mb-3">Hands-on Demonstrations</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Bio-floc technology implementation</li>
              <li>Recirculating aquaculture systems (RAS)</li>
              <li>Aquarium fabrication and setup</li>
              <li>Live breeding demonstrations</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-green-600 mb-3">Technical & Business Management</h3>
            <p class="text-gray-600 mb-3">From basics to advanced level training covering:</p>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Farm design and infrastructure planning</li>
              <li>Business planning and financial management</li>
              <li>Marketing and sales strategies</li>
              <li>Record keeping and inventory management</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-green-600 mb-3">Modern Aquaculture Models</h3>
            <p class="text-gray-600">Exposure to modern and intensive aquaculture models including visits to successful commercial operations.</p>
          </div>
        </div>
      </div>
    `,
    lastUpdated: '2025-01-15',
    status: 'Published'
  },
  {
    id: 'page_workshops',
    title: 'Workshops & Mentorship',
    slug: 'workshops-mentorship',
    content: `
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Workshops & Mentorship</h1>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-6 mb-6">
          <p class="text-lg text-gray-700">Expert-led workshops and personalized mentorship programs to accelerate your success in ornamental fisheries.</p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-purple-600 mb-3">Expert-Led Sessions</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Interactive workshops with industry experts</li>
              <li>Field visits to operational farms and hatcheries</li>
              <li>Live demonstrations of breeding techniques</li>
              <li>Q&A sessions with experienced practitioners</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-purple-600 mb-3">Mentorship for Enterprise Development</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>One-on-one mentorship for planning and operations</li>
              <li>Guidance on scaling your enterprise</li>
              <li>Business model development and refinement</li>
              <li>Financial planning and investment strategies</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-purple-600 mb-3">Market Linkages & Value Chains</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Guidance on market linkages and distribution</li>
              <li>Value chain analysis and optimization</li>
              <li>Buyer connections and networking opportunities</li>
              <li>Export market guidance and compliance</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-purple-600 mb-3">Continuous Support</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Ongoing troubleshooting assistance</li>
              <li>Technical advisory support via phone/email</li>
              <li>Follow-up visits and progress monitoring</li>
              <li>Access to alumni network and community</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    lastUpdated: '2025-01-15',
    status: 'Published'
  },
  {
    id: 'page_employment',
    title: 'Employment & Career Support',
    slug: 'employment-career-support',
    content: `
      <div class="space-y-6">
        <h1 class="text-3xl font-bold text-gray-900 mb-6">Employment & Career Support</h1>
        
        <div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
          <p class="text-lg text-gray-700">Comprehensive career guidance and placement support to help you build a successful career in the fisheries and aquaculture sectors.</p>
        </div>

        <div class="space-y-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Career Guidance</h3>
            <p class="text-gray-600 mb-3">Expert career counseling in fisheries and aquaculture sectors including:</p>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Career path assessment and planning</li>
              <li>Skill gap analysis and development roadmap</li>
              <li>Industry trends and opportunities</li>
              <li>Resume building and interview preparation</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Placement Assistance</h3>
            <p class="text-gray-600 mb-3">Active placement support in various sectors:</p>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Commercial fish farms and breeding centers</li>
              <li>Hatcheries and seed production units</li>
              <li>Feed manufacturing companies</li>
              <li>Fish processing and export units</li>
              <li>Aquarium shops and maintenance services</li>
              <li>Research institutions and government agencies</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Entrepreneurial Support</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Guidance for starting your own venture</li>
              <li>Business plan development assistance</li>
              <li>Funding and loan application support</li>
              <li>Licensing and regulatory compliance guidance</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">Freelance Opportunities</h3>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>Aqua-clinic consultant opportunities</li>
              <li>Aquarium maintenance service contracts</li>
              <li>Training and workshop facilitation</li>
              <li>Technical writing and content creation</li>
            </ul>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold text-orange-600 mb-3">New Technology Integration</h3>
            <p class="text-gray-600">Training and support for adopting cutting-edge technologies:</p>
            <ul class="list-disc list-inside text-gray-600 space-y-2">
              <li>IoT-based monitoring systems</li>
              <li>Automated feeding and water quality management</li>
              <li>Digital marketing and e-commerce platforms</li>
              <li>Mobile apps for farm management</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    lastUpdated: '2025-01-15',
    status: 'Published'
  }
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  header: {
    title: APP_NAME,
    subtitle: APP_FULL_NAME,
    subtext: "(An entrepreneurship promotion and skill development centre)",
    hindiName: APP_HINDI_NAME,
    location: "",
    logoText: "A",
    showLogoImage: true,
    logoUrl: "https://i.imgur.com/placeholder-logo.png",
    backgroundImageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=400&fit=crop" 
  },
  theme: {
    primaryColor: '#FF7F27',
    secondaryColor: '#3b1e54',
    headerBackgroundColor: '#ffffff'
  },
  navItems: [
    { id: 'nav1', label: 'HOME', view: ViewState.PUBLIC_HOME, isVisible: true },
    { 
      id: 'nav2', 
      label: 'Student & Community Support', 
      view: ViewState.PUBLIC_DYNAMIC_PAGE, 
      pageId: 'page_student_support', 
      isVisible: true,
      subItems: [
        { id: 'sub2-1', label: 'Support to Farmers & Startups', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_student_support' },
        { id: 'sub2-2', label: 'Essential Tools & Inputs', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_student_support' },
        { id: 'sub2-3', label: 'Enterprise Development', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_student_support' },
        { id: 'sub2-4', label: 'Technical Advisory', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_student_support' }
      ]
    },
    { 
      id: 'nav3', 
      label: 'Training & Capacity Building', 
      view: ViewState.PUBLIC_DYNAMIC_PAGE, 
      pageId: 'page_training', 
      isVisible: true,
      subItems: [
        { id: 'sub3-1', label: 'Fish Farming Techniques', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_training' },
        { id: 'sub3-2', label: 'Hands-on Demonstrations', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_training' },
        { id: 'sub3-3', label: 'Business Management', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_training' },
        { id: 'sub3-4', label: 'Modern Aquaculture Models', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_training' }
      ]
    },
    { 
      id: 'nav4', 
      label: 'Workshops & Mentorship', 
      view: ViewState.PUBLIC_DYNAMIC_PAGE, 
      pageId: 'page_workshops', 
      isVisible: true,
      subItems: [
        { id: 'sub4-1', label: 'Expert-Led Sessions', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_workshops' },
        { id: 'sub4-2', label: 'Enterprise Mentorship', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_workshops' },
        { id: 'sub4-3', label: 'Market Linkages', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_workshops' },
        { id: 'sub4-4', label: 'Continuous Support', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_workshops' }
      ]
    },
    { 
      id: 'nav5', 
      label: 'Employment & Career Support', 
      view: ViewState.PUBLIC_DYNAMIC_PAGE, 
      pageId: 'page_employment', 
      isVisible: true,
      subItems: [
        { id: 'sub5-1', label: 'Career Guidance', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_employment' },
        { id: 'sub5-2', label: 'Placement Assistance', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_employment' },
        { id: 'sub5-3', label: 'Entrepreneurial Support', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_employment' },
        { id: 'sub5-4', label: 'Freelance Opportunities', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_employment' },
        { id: 'sub5-5', label: 'New Technology Integration', view: ViewState.PUBLIC_DYNAMIC_PAGE, pageId: 'page_employment' }
      ]
    },
    { id: 'nav6', label: 'Blog', view: ViewState.PUBLIC_BLOG_LIST, isVisible: true },
    { id: 'nav7', label: 'Contact Us', view: ViewState.PUBLIC_CONTACT, isVisible: true },
  ],
  tickerText: "5 Days Training On Ornamental Fish Breeding And Culture From 27.05.2024 To 31.05.2024",
  presidentMessage: {
    title: "President's Message:",
    text: "The hobby of ornamental fish keeping is becoming increasingly popular in all parts of the country including rural India. It is estimated that presently 1.25% of urban households are keeping an aquarium either at home or workplace which is expected to grow to 5.00% in the next decade. It would be possible as both annual average per capita income (AAPCI) and the number of Middle Income Group Households (MIGHh) that are considered important indicators of any developing economy are continuously achieving higher peaks.",
    imageUrl: "https://randomuser.me/api/portraits/men/50.jpg", 
    buttonText: "Read More",
    missionImageUrl: "" // Default empty to show diagram
  },
  stats: DEFAULT_STATS,
  contactInfo: {
    phone1: "+91-98288-46881",
    phone2: "+91-94133-18208",
    email: "info@aquaagri.com",
    address: "Fish Home, Shop No. 772/1, Old Fatehpura, Bedla Road, Udaipur - 313001 (Raj.)"
  },
  footer: {
    aboutText: "AquaAgri Pathfinder is a private sector institution established in 2006 to develop and promote ornamental fisheries sector in the country. Ornamental fisheries include production of ornamental fishes, aquarium fabrication and trading, aquarium maintenance etc.",
    socialLinks: {
      facebook: "#",
      instagram: "#",
      twitter: "#",
      youtube: "#"
    },
    memberArea: {
      title: "Member Area",
      text: "Access exclusive training materials and staff resources."
    },
    matsyagram: {
      title: "Matsyagram",
      address: "Village Veerpura, Near Gotod Ji Temple, Near Lake Jaisamand Tehsil, Sarada, Rajasthan 313905",
      phone: "09001254762",
      mapImageUrl: "https://static-maps.yandex.ru/1.x/?lang=en-US&ll=73.68,24.58&z=10&l=map&size=300,150"
    },
    copyrightText: "© Copyright AquaAgri 2025. Designed and Developed by Digital Comrade"
  },
  whatsappConfig: {
    enabled: true,
    phoneNumber: "919828846881"
  },
  animationConfig: {
    showFish: true,
    fishSpeed: 'normal',
    showBubbles: true
  },
  accessControl: {
    permissions: {
      'projects.create': ['Admin', 'Editor'],
      'projects.edit': ['Admin', 'Editor'],
      'projects.delete': ['Admin'],
      'blogs.create': ['Admin', 'Editor'],
      'blogs.edit': ['Admin', 'Editor'],
      'blogs.delete': ['Admin'],
      'news.create': ['Admin', 'Editor'],
      'news.edit': ['Admin', 'Editor'],
      'news.delete': ['Admin'],
      'alumni.create': ['Admin', 'Editor'],
      'alumni.edit': ['Admin', 'Editor'],
      'alumni.delete': ['Admin'],
      'pages.create': ['Admin', 'Editor'],
      'pages.edit': ['Admin', 'Editor'],
      'pages.delete': ['Admin'],
      'forms.create': ['Admin'],
      'forms.edit': ['Admin', 'Editor'],
      'forms.view': ['Admin', 'Editor', 'Student'],
      'content.edit': ['Admin', 'Editor'],
      'settings.view': ['Admin'],
      'settings.edit': ['Admin']
    }
  }
};

export const CHART_DATA = [
  { name: 'Jan', value: 45, active: 2 },
  { name: 'Feb', value: 52, active: 3 },
  { name: 'Mar', value: 38, active: 1 },
  { name: 'Apr', value: 65, active: 4 },
  { name: 'May', value: 48, active: 2 },
  { name: 'Jun', value: 55, active: 3 },
  { name: 'Jul', value: 70, active: 5 },
];

export const CATEGORIES = [
  { name: 'Training', icon: <Users className="w-5 h-5"/>, color: 'bg-orange-100 text-orange-600' },
  { name: 'Research', icon: <BookOpen className="w-5 h-5"/>, color: 'bg-blue-100 text-blue-600' },
  { name: 'Workshops', icon: <Target className="w-5 h-5"/>, color: 'bg-green-100 text-green-600' },
  { name: 'Outreach', icon: <Globe className="w-5 h-5"/>, color: 'bg-purple-100 text-purple-600' },
];

// --- Mock Data for Forms ---
export const MOCK_CONTACT_SUBMISSIONS: ContactSubmission[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', subject: 'Inquiry about training', message: 'I would like to know the schedule for the next batch.', date: '2024-06-12', status: 'New' },
  { id: '2', name: 'Jane Smith', email: 'jane@test.com', subject: 'Collaboration Proposal', message: 'We are interested in partnering for research.', date: '2024-06-10', status: 'Read' }
];

export const MOCK_REGISTRATIONS: RegistrationSubmission[] = [
  { id: 'r1', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', type: 'Student', date: '2024-06-14', status: 'Pending' },
  { id: 'r2', name: 'Priya Patel', email: 'priya@example.com', phone: '9123456780', type: 'Staff', date: '2024-06-11', status: 'Approved' }
];

export const MOCK_TRAINING_SUBMISSIONS: TrainingSubmission[] = [
  { id: 't1', name: 'Vikram Singh', email: 'vikram@example.com', phone: '8899776655', programInterest: 'Ornamental Fish Breeding', date: '2024-06-15', status: 'New' },
  { id: 't2', name: 'Anita Roy', email: 'anita@example.com', phone: '7766554433', programInterest: 'Aquarium Fabrication', date: '2024-06-13', status: 'Contacted' }
];

export const DEFAULT_FORMS: FormDefinition[] = [
  {
    id: 'f_contact',
    name: 'contact',
    title: 'Contact Us',
    description: 'General inquiry form shown on the home page.',
    isSystem: true,
    submitButtonText: 'Send Message',
    fields: [
      { id: 'name', label: 'Your Name', type: 'text', required: true, placeholder: 'Enter your full name' },
      { id: 'email', label: 'Your Email', type: 'email', required: true, placeholder: 'Enter your email address' },
      { id: 'subject', label: 'Subject', type: 'text', required: true, placeholder: 'Inquiry subject' },
      { id: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Write your message here...' }
    ]
  },
  {
    id: 'f_registration',
    name: 'registration',
    title: 'User Registration',
    description: 'Registration form for students and staff.',
    isSystem: true,
    submitButtonText: 'Register',
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { id: 'type', label: 'User Type', type: 'select', required: true, options: ['Student', 'Researcher', 'Staff', 'Other'] }
    ]
  },
  {
    id: 'f_training',
    name: 'training',
    title: 'Training Pre-Registration',
    description: 'Form for candidates interested in training programs.',
    isSystem: true,
    submitButtonText: 'Submit Registration',
    fields: [
      { id: 'name', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
      { id: 'programInterest', label: 'Program of Interest', type: 'select', required: true, options: ['Ornamental Fish Breeding', 'Aquarium Fabrication', 'Aqua-clinics', 'Bio-floc Technology'] }
    ]
  }
];