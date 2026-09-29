/**
 * Spoken English Scenarios and Conversational Tracks for MASTER AI 7
 * Exact multi-level interactive practice with real-time coaching feedback
 */

export const SPOKEN_ENGLISH_TRACKS = {
  foundations: {
    name: '🎒 Foundations Level English',
    description: 'Simple, cheerful everyday conversations for foundations students to build vocabulary and speaking fluency.',
    scenarios: [
      {
        id: 'foundations_intro',
        title: '1. Introducing Yourself to Classmates',
        introPrompt: "Hello! Welcome to Master AI 7. Let’s practice English together! Please introduce yourself — tell me your name, what grade you are in, and your favorite hobby!",
        agentVoiceLine: "Hello! Welcome to Master AI 7. Let's practice English together! Please introduce yourself.",
        starterSuggestions: [
          "My name is Ananya. I study in Grade 7, and I love drawing and playing badminton.",
          "Hello! I am Rahul from Grade 8. My favorite hobby is playing cricket and learning coding.",
          "Hi! My name is Sara. I am 12 years old, and I enjoy reading storybooks and playing guitar."
        ]
      },
      {
        id: 'foundations_subject',
        title: '2. Talking About Foundations & Favorite Subject',
        introPrompt: "That is great! What is your favorite subject in foundations, and what do you like the most about your teacher?",
        agentVoiceLine: "What is your favorite subject in foundations, and why do you like it?",
        starterSuggestions: [
          "My favorite subject is Science because we do fun experiments in the lab.",
          "I really enjoy Mathematics because solving puzzles and equations is exciting.",
          "I love Computer Science because we learn how to create games and code animations."
        ]
      },
      {
        id: 'foundations_daily',
        title: '3. My Daily Routine & Weekend Fun',
        introPrompt: "Let's talk about daily life! What time do you wake up for foundations, and how do you spend your Sunday mornings?",
        agentVoiceLine: "What time do you wake up in the morning, and what is your favorite part of the day?",
        starterSuggestions: [
          "I wake up at 6:30 AM, get ready for foundations, and on Sundays I play soccer in the park.",
          "I start my day with breakfast with my family, and after foundations I practice piano."
        ]
      }
    ]
  },

  applied: {
    name: '🎓 Applied Level English',
    description: 'Medium-level professional and academic conversations, group discussions, and technology debates.',
    scenarios: [
      {
        id: 'inter_college',
        title: '1. College Life & Academic Goals',
        introPrompt: "Hello! Welcome to Master AI 7 English Mastery. Let's practice introducing your academic background and your dream career goals in tech.",
        agentVoiceLine: "Hello! Welcome. Please tell me about your field of study and your key career aspirations.",
        starterSuggestions: [
          "I am pursuing a diploma in Computer Engineering. My goal is to become an AI Developer and build helpful web applications.",
          "I am an undergraduate student passionate about data analytics and software engineering."
        ]
      },
      {
        id: 'inter_ai_trends',
        title: '2. Technology & AI Discussion',
        introPrompt: "AI is advancing rapidly every day! In your view, what is the most exciting AI tool you have used recently, and how did it help you?",
        agentVoiceLine: "In your opinion, what is the most exciting AI tool you've used recently, and how did it help you?",
        starterSuggestions: [
          "I recently used ChatGPT to understand complex data structures, which saved me hours of textbook reading.",
          "I experimented with Midjourney for graphic design, and the visual quality was astonishing."
        ]
      },
      {
        id: 'inter_gd',
        title: '3. Group Discussion: Will AI Replace Human Jobs?',
        introPrompt: "Welcome to this Group Discussion round! Please state your opening stance: Do you believe AI will eliminate jobs or create new opportunities?",
        agentVoiceLine: "Welcome to the group discussion. Do you believe AI will eliminate jobs or create brand new opportunities? Please share your stance.",
        starterSuggestions: [
          "In my perspective, AI will automate repetitive tasks while simultaneously creating high-value roles in AI safety and data engineering.",
          "I believe AI will act as a collaborative partner rather than a replacement, empowering professionals to work faster."
        ]
      }
    ]
  },

  advanced: {
    name: '💻 Advanced & Professional English',
    description: 'High-impact technical interviews, system design explanations, STAR behavioral questions, and executive communication.',
    scenarios: [
      {
        id: 'advanced_elevator',
        title: '1. Professional Elevator Pitch ("Tell Me About Yourself")',
        introPrompt: "Welcome to the Advanced Technical Interview Simulator. I am your interviewer. Let's start with your elevator pitch: 'Tell me about yourself, your technical stack, and your key AI achievements.'",
        agentVoiceLine: "Welcome to your technical interview. Please walk me through your technical background, core stack, and major AI projects.",
        starterSuggestions: [
          "I am a final-year Advanced Computer Science student specializing in Machine Learning. I have hands-on experience building PyTorch CNNs and LangChain RAG pipelines.",
          "I am a Machine Learning Engineer with strong foundations in deep learning, vector databases, and scalable backend microservices with FastAPI."
        ]
      },
      {
        id: 'advanced_project_deepdive',
        title: '2. Technical Project Walkthrough & Architecture',
        introPrompt: "Could you deep dive into one of your standout AI projects? Explain the problem statement, the neural architecture chosen, the loss function, and how you evaluated performance.",
        agentVoiceLine: "Walk me through one of your core AI projects. What was the architecture, and how did you overcome key engineering bottlenecks?",
        starterSuggestions: [
          "I architected a ResNet-50 transfer learning model for medical image classification, utilizing Cross-Entropy loss with AdamW and achieving a 96.4% ROC-AUC score.",
          "I developed an enterprise RAG pipeline using ChromaDB vector database and HuggingFace embeddings to provide low-latency semantic search."
        ]
      },
      {
        id: 'advanced_star_hr',
        title: '3. Behavioral Interview (STAR Method: Challenge Overcome)',
        introPrompt: "Describe a difficult technical bug or team conflict you encountered during a project deadline. How did you diagnose the issue, and what was the quantifiable outcome?",
        agentVoiceLine: "Tell me about a challenging technical bottleneck you faced and how you resolved it under a tight deadline.",
        starterSuggestions: [
          "During our capstone project, we faced severe GPU out-of-memory errors during training. I profiled the tensor batch size, implemented mixed-precision training (FP16), and reduced VRAM overhead by 45% without degrading accuracy."
        ]
      }
    ]
  }
};

