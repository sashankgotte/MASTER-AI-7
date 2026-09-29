/**
 * Comprehensive AI Tools Directory for MASTER AI 7
 * Categorized with beginner explanations, use cases, sample prompts, and links
 */

export const TOOL_CATEGORIES = [
  { id: 'all', name: 'All AI Tools', icon: 'Sparkles' },
  { id: 'chatbots', name: 'AI Chatbots', icon: 'MessageSquare' },
  { id: 'image', name: 'AI Image Tools', icon: 'Image' },
  { id: 'video', name: 'AI Video Tools', icon: 'Video' },
  { id: 'coding', name: 'AI Coding Tools', icon: 'Code' },
  { id: 'presentation', name: 'AI Presentation Tools', icon: 'Presentation' },
  { id: 'study', name: 'AI Study Tools', icon: 'BookOpen' },
  { id: 'productivity', name: 'AI Productivity Tools', icon: 'Zap' },
];

export const AI_TOOLS = [
  // 1. CHATBOTS
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    category: 'chatbots',
    badge: 'Most Popular',
    rating: 4.9,
    description: 'Conversational LLM capable of answering questions, writing essays, coding, and problem solving.',
    beginnerExplanation: 'Think of ChatGPT as a super-smart digital tutor who has read millions of books and can chat with you about any topic in plain English.',
    example: 'Explain photosynthesis using a comic superhero analogy.',
    useCase: 'Brainstorming, study tutoring, writing drafts, debugging code.',
    url: 'https://chat.openai.com',
    tags: ['Text', 'Reasoning', 'Vision', 'Voice']
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    provider: 'Google DeepMind',
    category: 'chatbots',
    badge: 'Multimodal Frontier',
    rating: 4.9,
    description: 'Frontier multimodal model that natively processes text, images, video, audio, and complex code with ultra-fast responses.',
    beginnerExplanation: 'Gemini is Google’s smartest AI engine that can look at your homework photos, read PDFs, and search Google simultaneously.',
    example: 'Look at this geometry diagram and guide me to find angle X step-by-step.',
    useCase: 'Real-time search integration, document analysis, YouTube video summarization.',
    url: 'https://gemini.google.com',
    tags: ['Multimodal', 'Google Ecosystem', 'Fast']
  },
  {
    id: 'claude',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    category: 'chatbots',
    badge: 'Best for Coding & Nuance',
    rating: 4.9,
    description: 'Known for industry-leading programming capabilities, deep nuanced writing, and high factual accuracy.',
    beginnerExplanation: 'Claude writes very natural, human-like essays and writes exceptionally clean code with interactive artifacts.',
    example: 'Build an interactive solar system simulation using HTML, CSS and JavaScript.',
    useCase: 'Complex coding, literature analysis, long document synthesis.',
    url: 'https://claude.ai',
    tags: ['Coding', 'Writing', 'Artifacts']
  },

  // 2. IMAGE TOOLS
  {
    id: 'midjourney',
    name: 'Midjourney',
    provider: 'Midjourney Inc',
    category: 'image',
    badge: 'Photorealistic Art',
    rating: 4.9,
    description: 'Generates breathtaking artistic and photorealistic imagery from natural language prompts.',
    beginnerExplanation: 'Type what you imagine (like "a cybernetic dragon flying over futuristic Tokyo"), and Midjourney paints a masterpiece in seconds.',
    example: 'Cinematic photograph of an astronaut discovering an ancient neon temple on Mars, 8k, Unreal Engine 5 render.',
    useCase: 'Graphic design, game asset art, book illustrations, marketing visuals.',
    url: 'https://midjourney.com',
    tags: ['Photorealism', 'Art', 'Design']
  },
  {
    id: 'dalle3',
    name: 'DALL·E 3',
    provider: 'OpenAI',
    category: 'image',
    badge: 'Prompt Accuracy',
    rating: 4.8,
    description: 'Generates detailed illustrations following complex written instructions and typography accurately.',
    beginnerExplanation: 'DALL·E 3 understands specific details, colors, and can even put text into pictures without spelling mistakes.',
    example: 'A cute 3D Pixar-style robot holding a blackboard that says "MASTER AI 7".',
    useCase: 'Educational illustrations, social media posters, creative logos.',
    url: 'https://openai.com/dall-e-3',
    tags: ['Creative', 'Accurate Text', 'ChatGPT Integrated']
  },
  {
    id: 'canva-magic',
    name: 'Canva Magic Studio',
    provider: 'Canva',
    category: 'image',
    badge: 'Design Suite',
    rating: 4.7,
    description: 'AI-assisted graphic design suite with background remover, magic expand, and auto-layout tools.',
    beginnerExplanation: 'Makes graphic design simple for foundations projects, flyers, YouTube thumbnails, and Instagram posts.',
    example: 'Remove photo background and generate a cyberpunk neon stage behind the subject.',
    useCase: 'Foundations posters, slide covers, banners, certificates.',
    url: 'https://canva.com',
    tags: ['Easy UI', 'Templates', 'Graphic Design']
  },

  // 3. VIDEO TOOLS
  {
    id: 'sora',
    name: 'OpenAI Sora',
    provider: 'OpenAI',
    category: 'video',
    badge: 'Cinematic AI Video',
    rating: 4.9,
    description: 'Creates up to 60-second realistic and imaginative video scenes with multiple characters and consistent physics.',
    beginnerExplanation: 'Turn written stories directly into Hollywood-grade video clips with realistic motion and lighting.',
    example: 'A drone shot flying through a bustling futuristic city with flying cars in rainy neon twilight.',
    useCase: 'Filmmaking, concept trailers, advertising, educational animations.',
    url: 'https://openai.com/sora',
    tags: ['Text-to-Video', 'High Quality', 'Cinematic']
  },
  {
    id: 'runway',
    name: 'Runway Gen-2 & Gen-3',
    provider: 'RunwayML',
    category: 'video',
    badge: 'Creator Studio',
    rating: 4.8,
    description: 'Multimodal AI video platform offering text-to-video, image-to-video, and cinematic motion brushes.',
    beginnerExplanation: 'Bring any still photo to life by telling the AI which parts should move, like flowing water or blowing hair.',
    example: 'Animate a still painting of the Mona Lisa blinking and smiling warmly.',
    useCase: 'Video editing, visual effects (VFX), animated shorts.',
    url: 'https://runwayml.com',
    tags: ['Motion Control', 'VFX', 'Animation']
  },
  {
    id: 'heygen',
    name: 'HeyGen',
    provider: 'HeyGen',
    category: 'video',
    badge: 'AI Avatars',
    rating: 4.8,
    description: 'Generates realistic talking avatars in 120+ languages with synchronized lip movement.',
    beginnerExplanation: 'Create a video presenter who speaks your script in any language without needing a real camera or actor.',
    example: 'Create an AI teacher presenting a 2-minute introduction to Python programming.',
    useCase: 'Educational tutorials, video resumes, company presentations.',
    url: 'https://heygen.com',
    tags: ['Talking Avatars', 'Multilingual', 'Education']
  },

  // 4. CODING TOOLS
  {
    id: 'cursor',
    name: 'Cursor AI',
    provider: 'Anysphere',
    category: 'coding',
    badge: 'AI Code Editor',
    rating: 4.9,
    description: 'Next-gen code editor fork of VS Code with deep codebase indexing, multi-file edits, and inline chat.',
    beginnerExplanation: 'A super-powered code editor that can write whole functions, fix errors, and explain codebases instantly.',
    example: 'Refactor this React component to use custom hooks and add unit tests.',
    useCase: 'Full-stack development, debugging complex errors, codebase comprehension.',
    url: 'https://cursor.com',
    tags: ['VS Code', 'Multi-File', 'Fast']
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    provider: 'GitHub / Microsoft',
    category: 'coding',
    badge: 'AI Pair Programmer',
    rating: 4.8,
    description: 'Real-time AI autocomplete and code assistant integrated directly into your favorite IDEs.',
    beginnerExplanation: 'As you write code, Copilot predicts what you want to write next, just like smart autocomplete on your phone keyboard.',
    example: '# Function to calculate Fibonacci sequence with memoization\ndef fibonacci(n):',
    useCase: 'Accelerating everyday coding, writing boilerplate, generating docstrings.',
    url: 'https://github.com/features/copilot',
    tags: ['Autocomplete', 'All Languages', 'IDE Extension']
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    provider: 'Vercel',
    category: 'coding',
    badge: 'UI Generator',
    rating: 4.8,
    description: 'Generates modern React & Tailwind CSS web interfaces from simple text prompts.',
    beginnerExplanation: 'Describe a website design in plain words, and v0 generates ready-to-copy frontend code immediately.',
    example: 'Build a dark-mode student dashboard with stats cards, progress charts, and glassmorphic navigation.',
    useCase: 'Rapid frontend prototyping, UI design, React component library.',
    url: 'https://v0.dev',
    tags: ['React', 'Tailwind', 'Frontend UI']
  },

  // 5. PRESENTATION TOOLS
  {
    id: 'gamma',
    name: 'Gamma App',
    provider: 'Gamma',
    category: 'presentation',
    badge: '1-Click PPT Maker',
    rating: 4.9,
    description: 'Transforms text outlines into stunning, interactive slide decks, documents, and webpages in seconds.',
    beginnerExplanation: 'Type your project topic, and Gamma creates a complete 8-slide presentation with images, charts, and colors ready for class!',
    example: 'Create a presentation on "Renewable Energy and AI" for college engineering symposium.',
    useCase: 'Foundations presentations, startup pitch decks, lecture slides.',
    url: 'https://gamma.app',
    tags: ['Presentations', 'Interactive Slides', 'Fast Export']
  },
  {
    id: 'beautiful-ai',
    name: 'Beautiful.ai',
    provider: 'Beautiful.ai',
    category: 'presentation',
    badge: 'Smart Layouts',
    rating: 4.7,
    description: 'Presentation software with intelligent design rules that automatically adjust slide layouts as you type.',
    beginnerExplanation: 'Never worry about misaligned text or ugly fonts; the AI formats every slide automatically according to design principles.',
    example: 'Create a comparison table slide between Supervised and Unsupervised Learning.',
    useCase: 'Corporate reports, student seminars, technical walk-throughs.',
    url: 'https://beautiful.ai',
    tags: ['Auto-Layout', 'Clean Design', 'Export to PDF']
  },

  // 6. STUDY TOOLS
  {
    id: 'perplexity',
    name: 'Perplexity AI',
    provider: 'Perplexity',
    category: 'study',
    badge: 'AI Research Engine',
    rating: 4.9,
    description: 'Conversational answer engine with direct citations from peer-reviewed papers, live websites, and academic databases.',
    beginnerExplanation: 'Like Google + ChatGPT combined: it gives you exact answers and shows you the exact web links and books where the facts came from.',
    example: 'What are the top 3 modern techniques to prevent overfitting in deep neural networks? Include citations.',
    useCase: 'Academic research, homework verification, fact-checking, literature reviews.',
    url: 'https://perplexity.ai',
    tags: ['Live Citations', 'Academic Sources', 'No Hallucinations']
  },
  {
    id: 'photomath',
    name: 'Photomath AI',
    provider: 'Google Photomath',
    category: 'study',
    badge: 'Math Solver',
    rating: 4.8,
    description: 'Scans handwritten or printed mathematical equations and breaks down solutions into step-by-step logic.',
    beginnerExplanation: 'Take a picture of any math problem with your camera, and the AI shows you how to solve it step-by-step with graphs.',
    example: 'Solve the system of equations: 3x + 2y = 12 and x - 4y = -10.',
    useCase: 'Math homework help, algebra, calculus, step-by-step proofs.',
    url: 'https://photomath.com',
    tags: ['Camera Scan', 'Step-by-Step Math', 'Mobile App']
  },

  // 7. PRODUCTIVITY TOOLS
  {
    id: 'notion-ai',
    name: 'Notion AI',
    provider: 'Notion Labs',
    category: 'productivity',
    badge: 'Workspace AI',
    rating: 4.8,
    description: 'Integrated workspace assistant that summarizes notes, drafts action items, translates, and organizes study wikis.',
    beginnerExplanation: 'Keeps all your class notes, homework checklists, and study summaries organized in one smart workspace.',
    example: 'Summarize my 5 pages of lecture notes into 10 key bullet points and a revision quiz.',
    useCase: 'Class note-taking, project task boards, syllabus planning.',
    url: 'https://notion.so',
    tags: ['Notes', 'Organization', 'Summaries']
  },
  {
    id: 'otter-ai',
    name: 'Otter.ai',
    provider: 'Otter.ai',
    category: 'productivity',
    badge: 'Voice Transcription',
    rating: 4.7,
    description: 'Transcribes lectures, meetings, and interviews in real-time, automatically tagging speakers and generating summaries.',
    beginnerExplanation: 'Records your teacher’s lecture and turns it into readable text notes so you never miss an important exam tip.',
    example: 'Transcribe 1-hour engineering lecture and extract action items and key definitions.',
    useCase: 'Lecture transcription, study group recording, interview notes.',
    url: 'https://otter.ai',
    tags: ['Audio to Text', 'Lecture Notes', 'Speaker Identification']
  }
];

