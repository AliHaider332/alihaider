//Web Pics

const images = {
  P11: '/Pictures/P11.png',
  P12: '/Pictures/P12.png',
  P13: '/Pictures/P13.png',
  P14: '/Pictures/P14.png',
  P15: '/Pictures/P15.png',
  P16: '/Pictures/P16.png',
  P17: '/Pictures/P17.png',
  P18: '/Pictures/P18.png',
  P19: '/Pictures/P19.png',
  P20: '/Pictures/P20.png',

  P31: '/Pictures/P31.png',
  P32: '/Pictures/P32.png',
  P33: '/Pictures/P33.png',
  P34: '/Pictures/P34.png',
  P35: '/Pictures/P35.png',
  P36: '/Pictures/P36.png',
  P37: '/Pictures/P37.png',
  P38: '/Pictures/P38.png',

  PS1: '/Pictures/PS1.png',
  PS2: '/Pictures/PS2.png',
  PS3: '/Pictures/PS3.png',
  PS4: '/Pictures/PS4.png',
  PS5: '/Pictures/PS5.png',

  PB1: '/Pictures/PB1.png',
  PB2: '/Pictures/PB2.png',
  PB3: '/Pictures/PB3.png',
  PB4: '/Pictures/PB4.png',
  PB5: '/Pictures/PB5.png',
  PB6: '/Pictures/PB6.png',

  P22: '/Pictures/P22.png',
  P23: '/Pictures/P23.png',

  PD1: '/Pictures/PD1.png',
  PC1: '/Pictures/PC1.png',

  BS1: '/Pictures/BS1.png',
  BS2: '/Pictures/BS2.png',
  BS3: '/Pictures/BS3.png',
  BS4: '/Pictures/BS4.png',
  BS5: '/Pictures/BS5.png',
  BS6: '/Pictures/BS6.png',
  BS7: '/Pictures/BS7.png',

  CP1: '/Pictures/CP-1.png',
  CP2: '/Pictures/CP-2.png',
  CP3: '/Pictures/CP-3.png',
  CP4: '/Pictures/CP-4.png',
  CP5: '/Pictures/CP-5.png',
  CP6: '/Pictures/CP-6.png',
  CP7: '/Pictures/CP-6.png',
};

// ---------- Types ----------
export interface Project {
  id: number;
  title: string;
  image: string[];
  summary: string;
  techStack: string[];
  tags: string[];
  link?: string;
  github?: string;
  featured?: boolean;
}




export const Web :Project[]= [
  {
    id: 8,
    title: 'Talkify - Real-Time Chat Application',
    image: [images.CP1,images.CP2, images.CP3, images.CP4,images. CP5, images.CP6, images.CP7],
    summary:
      'A real-time chatting application with full authentication, protected routes, and WebSocket-based messaging using MongoDB. Users can create accounts, join chats, and send/receive messages instantly. The app is fully deployment-ready, though free Vercel runtime does not support WebSockets, so it may require a suitable server environment for real-time features.',
    techStack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'WebSocket (Socket.IO)',
      'JWT Authentication',
      'React.js',
      'Tailwind CSS',
    ],
    tags: [
      'FullStack',
      'MERN',
      'RealTime',
      'ChatApp',
      'Authentication',
      'ProtectedRoutes',
      'WebSocket',
      'NodeJS',
      'MongoDB',
      'TailwindCSS',
    ],
    // link: 'https://your-chatify-live-link.com/', // add your live project link
    github: 'https://github.com/AliHaider332/Talkify-Chatting-App', // add your GitHub repo link
  },
  {
    id: 7,
    title: 'BlogSpace - SSR Blogging Platform',
    image: [images.BS1, images.BS2, images.BS3, images.BS4, images.BS5, images.BS6, images.BS7], // add your project screenshots here
    summary:
      'A server-side rendered MERN blogging platform that allows users to sign up, log in, and manage their blogs with full CRUD functionality. Users can create, update, and delete blogs, like and comment on posts, and interact with other users. The application focuses on performance and SEO using server-side rendering while maintaining secure authentication and a smooth user experience.',
    techStack: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'Server-Side Rendering (SSR)',
      'JWT Authentication',
      'Tailwind CSS',
    ],
    tags: [
      'FullStack',
      'MERN',
      'SSR',
      'BlogPlatform',
      'Authentication',
      'CRUD',

      'NodeJS',
      'Express',
      'MongoDB',
      'TailwindCSS',
    ],
    link: 'https://internship-projects-blog-app.vercel.app/', // add your live project link later
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Portfolio', // add your GitHub repo link later
  },
  {
    id: 6,
    title: 'PDF to Chat Converter',
    image: [images.PS1, images.PS2, images.PS3, images.PS4, images.PS5],
    summary:
      'A full-stack MERN application that allows users to upload PDF files and interact with their content using an AI-powered chat interface. The system integrates Google Generative AI (LLM) and Pinecone vector database to implement Retrieval-Augmented Generation (RAG). When users ask questions, the app retrieves relevant context from the uploaded PDF using vector similarity search and provides accurate, contextual answers through the AI model.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Google Generative AI',
      'Pinecone',
      'Tailwind CSS',
    ],
    tags: [
      'FullStack',
      'AIIntegration',
      'RAG',
      'React',
      'NodeJS',
      'Express',
      'MongoDB',
      'TailwindCSS',
      'GoogleAI',
      'Pinecone',
      'PDFChat',
    ],
    link: 'https://internship-projects-b72u.vercel.app/', // you can add your live project link here
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/PDF-Summerizer', // you can add your GitHub repo link here
  },
  {
    id: 5,
    title: 'AI-Powered Portfolio Builder',
    image: [images.PB1, images.PB2, images.PB3, images.PB4, images.PB5, images.PB6],
    summary:
      'A full-stack AI-driven web application that allows users to generate personalized portfolio websites using Google Generative AI. Users input their personal information, professional details, and preferred design choices such as colors, layout, and style. The system automatically generates complete HTML, CSS, and JavaScript files, provides a live preview, and allows customization of the UI/UX before download.',
    techStack: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Google Generative AI',
      'Tailwind CSS',
    ],
    tags: [
      'FullStack',
      'AIIntegration',
      'React',
      'NodeJS',
      'Express',
      'MongoDB',
      'TailwindCSS',
      'PortfolioGenerator',
      'GoogleAI',
      'Automation',
    ],
    link: 'https://internship-projects-portfolio-build.vercel.app/', // you can add your live project link here
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Portfolio-Creator', // you can add your GitHub repo link here
  },

  {
    id: 4,
    title: 'MERN Social Media Application',
    image: [images.P31, images.P32, images.P33, images.P34, images.P35, images.P36, images.P37, images.P38],
    summary:
      'A full-stack social media web application built using the MERN stack, featuring complete user authentication and authorization. Users can create an account, log in, and manage posts with full CRUD operations — including create, update, delete, and comment functionalities. The platform allows liking, disliking, editing comments, and managing user profiles. Backend authentication is powered by JWT, while the frontend provides a smooth and responsive user interface with React and Tailwind CSS.',
    techStack: [
      'MongoDB',
      'Express.js',
      'React.js',
      'Node.js',
      'JWT Authentication',
      'Tailwind CSS',
      'Mongoose',
      'RESTful API',
    ],
    tags: [
      'MERNStack',
      'FullStackDevelopment',
      'Authentication',
      'Authorization',
      'CRUDOperations',
      'JWT',
      'MongoDB',
      'ReactApp',
    ],

    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Mini-linkdin',
  },
  {
    id: 3,
    title: 'AI Girlfriend Chatbot',
   image: [images.P23],
    summary:
      'An interactive AI-powered chatbot designed to simulate romantic and emotional conversations. Built using Node.js, Express, and the Gemini LLM (via Google GenAI API), the chatbot role-plays as a virtual girlfriend, responding affectionately and naturally in Urdu-English (Roman Urdu). The backend handles real-time communication and maintains chat history to create a continuous, personalized experience. The app is fully deployed on Vercel with a secure serverless architecture.',
    techStack: [
      'Node.js',
      'Express.js',
      'Google Gemini API',
      'CORS',
      'dotenv',
      'Vercel (Serverless Deployment)',
    ],
    tags: [
      'AIChatbot',
      'GeminiLLM',
      'ExpressBackend',
      'GoogleGenAI',
      'APIDevelopment',
      'Serverless',
      'VercelDeployment',
    ],
    link: 'https://internship-projects-moc3.vercel.app/',
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/GinAi',
  },
  {
    id: 2,
    title: 'Weather Forecast Application',
   image: [images.P22],
    summary:
      'A fully responsive, well-structured weather forecast application with support for both dark and light modes. The app allows users to check real-time weather for their current location and any other city. It features hourly forecasts for the next 24 hours (in 3-hour intervals) and 5-day weather predictions. Integrated with two different free APIs, the application updates weather data every 10 minutes to ensure accuracy.',
    techStack: [
      'React',
      'Tailwind CSS',
      'React Router',
      'Weather API',
      'Forecast API',
    ],
    tags: [
      'React',
      'TailwindCSS',
      'APIIntegration',
      'WeatherApp',
      'ResponsiveDesign',
      'DarkMode',
      'LightMode',
      'PortfolioProject',
    ],
    link: 'https://internship-projects-doem.vercel.app/',
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/Weather-App',
  },
  {
    id: 1,
    title: 'E-Commerce Website',
    image: [images.P11, images.P12, images.P13, images.P14, images.P15, images.P16, images.P17, images.P18, images.P19, images.P20],
    summary:
      'A professional-level, fully responsive e-commerce website built with React, Redux, Tailwind CSS, and React Router. It integrates DummyJSON API for product data fetching, features multi-page navigation, and allows users to add items to their cart. The design follows modern UI/UX standards for all devices.',
    techStack: [
      'React',
      'Redux',
      'Tailwind CSS',
      'React Router',
      'DummyJSON API',
    ],
    tags: [
      'React',
      'Redux',
      'TailwindCSS',
      'APIIntegration',
      'ECommerce',
      'ResponsiveDesign',
      'PortfolioProject',
    ],
    link: 'https://internship-projects-three.vercel.app/',
    github:
      'https://github.com/AliHaider332/Internship-Projects/tree/main/E-commerce',
  },
];

export const DESKTOP :Project[]= [
  {
    id: 1,
    title: 'Day Calories Calculator',
   image: [images.PD1], // imported image
    summary:
      "A fun, interactive desktop application that calculates a user’s Total Daily Energy Expenditure (TDEE) and Basal Metabolic Rate (BMR). The app begins with a sign-up page where users enter their details, followed by a verification step requiring them to re-enter specific information such as the password. Some details are pre-filled from the initial sign-up, with only a few additional inputs required. Once validated, the app computes and displays the user's daily caloric needs in a simple, user-friendly format. Built as a classroom-recommended project to practice desktop app development and health-related calculations.",
    techStack: ['C#', '.NET Framework', 'Windows Forms'],
    tags: [
      'DesktopApp',
      'CSharp',
      'BMRCalculation',
      'TDEECalculation',
      'FormValidation',
      'FunProject',
    ],
    link: '',
    github: 'https://github.com/AliHaider332/Personal-Health-Desktop-App',
  },
];

export const Console :Project[]= [
  {
    id: 1,
    title: 'Operating System Schedulers ',
    image: [images.PC1],
    summary:
      'A console-based C++ application that implements and visually represents multiple CPU scheduling algorithms, including First Come First Serve (FCFS), Shortest Job First (SJF), Priority Scheduling, and Round Robin. The program uses linked lists, queues, and other data structures to manage processes, track states (New, Ready, Running, Waiting), and handle unique constraints like duplicate process IDs or priorities. It supports special operations like process interrupts and I/O waiting states, providing an educational simulation of how operating system process scheduling works.',
    techStack: ['C++', 'Data Structures', 'Operating System Concepts'],
    tags: [
      'C++',
      'ConsoleApp',
      'OSSchedulers',
      'ProcessManagement',
      'DSA',
      'OOPs',
      'FCFS',
      'SJF',
      'PriorityScheduling',
      'RoundRobin',
    ],
    link: '',
    github:
      'https://github.com/AliHaider332/DSA-Projects/blob/main/OS_Project.cpp',
  },
];


export const sections = {
  web: Web,
  desktop: DESKTOP,
  console: Console,
} as const;

export type SectionKey = keyof typeof sections;