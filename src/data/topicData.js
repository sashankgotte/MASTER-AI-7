/**
 * Topic Educational Data for MASTER AI 7
 * Exact 7 Main Topics with 3 dynamic learning levels (Foundations, Applied, Advanced)
 */

export const TOPICS = [
  {
    id: 'what-is-ai',
    number: 1,
    title: 'WHAT IS AI',
    shortTitle: 'What is AI',
    tagline: 'Discover the foundations and magic of Artificial Intelligence',
    icon: 'Brain',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'rgba(0, 240, 255, 0.4)',
    accent: '#00f0ff',
    speechIntro: "Welcome to Topic 1: What is AI! Let's explore how machines learn to think, see, and help us every single day.",
    levels: {
      foundations: {
        title: "AI for Young Explorers (Foundations Level)",
        summary: "Artificial Intelligence (AI) is like giving a computer a super-smart brain so it can learn from examples, just like you learn at foundations!",
        keyPoints: [
          {
            title: "What is AI?",
            desc: "Normally, computers only do exactly what humans program them to do. But with AI, computers can look at photos, listen to your voice, play chess, and learn new tricks on their own!"
          },
          {
            title: "Real-Life Examples Around You",
            desc: "You use AI every day without even knowing it! When YouTube suggests your favorite cartoons, when Siri or Google Assistant answers your voice, or when your phone unlocks by recognizing your face!"
          },
          {
            title: "ChatGPT & Smart Assistants",
            desc: "ChatGPT is like a giant encyclopedia that read millions of books and can chat with you like a helpful robot friend, answering your homework questions and telling fun stories."
          },
          {
            title: "AI in Daily Life & Games",
            desc: "AI helps doctors spot illnesses in hospital scans, helps video game characters react to how you play, and helps self-driving cars stop at red lights safely!"
          }
        ],
        funFact: "Did you know? An AI named AlphaGo defeated the world champion in Go, a 2,500-year-old strategy game with more possible moves than atoms in the universe!",
        quiz: [
          {
            question: "Which of the following is an example of AI in your daily life?",
            options: ["A regular wall clock", "Google Assistant recognizing your voice", "A normal pencil", "A paper book"],
            correct: 1,
            explanation: "Google Assistant uses Natural Language Processing AI to understand your voice commands!"
          },
          {
            question: "How does an AI learn new things?",
            options: ["By eating food", "By looking at thousands of examples and data", "By sleeping", "By magic"],
            correct: 1,
            explanation: "AI learns by analyzing patterns in large amounts of data, just like practicing math problems!"
          }
        ]
      },
      applied: {
        title: "Practical AI & Machine Learning (Applied Level)",
        summary: "Artificial Intelligence is the branch of computer science dedicated to building machines capable of performing tasks that traditionally require human intelligence.",
        keyPoints: [
          {
            title: "The AI Hierarchy",
            desc: "AI is the broad umbrella. Machine Learning (ML) is the subset where systems learn from data. Deep Learning (DL) is the specialized subset that uses multi-layered artificial neural networks."
          },
          {
            title: "Recommendation Engines",
            desc: "Platforms like Netflix, Spotify, and Instagram use collaborative filtering and deep recommendation networks to predict what you'll enjoy next based on historical patterns of millions of users."
          },
          {
            title: "Large Language Models (LLMs)",
            desc: "Models like ChatGPT, Claude, and Gemini are trained on massive datasets using the Transformer architecture to predict the next most probable word (token) in a sequence with surprising coherence."
          },
          {
            title: "Computer Vision & Speech Recognition",
            desc: "Convolutional layers process pixel matrices to detect edges, shapes, and objects, while acoustic models convert spoken waveforms into phonetic text representations."
          }
        ],
        funFact: "The Transformer architecture that powers modern GenAI was invented in 2017 in a landmark paper titled 'Attention Is All You Need'!",
        quiz: [
          {
            question: "What is the relationship between AI, Machine Learning, and Deep Learning?",
            options: [
              "They are completely unrelated fields",
              "AI is inside ML, which is inside DL",
              "DL is a subset of ML, which is a subset of AI",
              "ML is only used for robotics"
            ],
            correct: 2,
            explanation: "Deep Learning is a specialized sub-branch of Machine Learning, which is a major subfield of Artificial Intelligence."
          }
        ]
      },
      advanced: {
        title: "Deep Technical Foundations (Advanced Level)",
        summary: "A rigorous mathematical and algorithmic exploration of Artificial Intelligence, Machine Learning, Deep Neural Architectures, and Optimization Paradigms.",
        keyPoints: [
          {
            title: "Mathematical Foundations",
            desc: "AI systems map high-dimensional input vectors x ∈ R^n to target vectors y ∈ R^m via parameterized differentiable functions f(x; θ). Optimization relies on multivariable calculus (gradients), linear algebra (eigenvalues, tensors), and Bayesian probability."
          },
          {
            title: "Machine Learning vs Deep Learning",
            desc: "Classical ML (SVMs, Random Forests, XGBoost) requires manual feature engineering. Deep Learning automatically extracts hierarchical feature representations across hidden layers using activation functions (ReLU, GELU, Softmax)."
          },
          {
            title: "Backpropagation & Loss Optimization",
            desc: "Networks minimize an empirical loss function L(θ) via Stochastic Gradient Descent (SGD), AdamW, or RMSprop. Gradients ∂L/∂w are computed via the chain rule of calculus backpropagated through computational graphs."
          },
          {
            title: "Modern Transformer & Attention Mechanisms",
            desc: "Self-attention computes Attention(Q, K, V) = softmax(QK^T / √d_k)V, enabling parallel processing of token sequences and capturing long-range contextual dependencies across billions of parameters."
          }
        ],
        funFact: "Training a modern frontier LLM (like GPT-4) requires clusters of tens of thousands of GPUs running continuously for months with exaflops of floating-point computations!",
        quiz: [
          {
            question: "What is the primary formula for Scaled Dot-Product Attention in Transformers?",
            options: [
              "Attention(Q, K, V) = Q * K + V",
              "Attention(Q, K, V) = softmax(QK^T / √d_k)V",
              "Attention(Q, K, V) = sigmoid(W_1 * x + b_1)",
              "Attention(Q, K, V) = ReLU(Q * K * V)"
            ],
            correct: 1,
            explanation: "Scaled Dot-Product Attention divides the matrix product QK^T by the square root of the key dimension √d_k before applying softmax."
          }
        ]
      }
    }
  },
  {
    id: 'how-ai-works',
    number: 2,
    title: 'HOW AI WORKS',
    shortTitle: 'How AI Works',
    tagline: 'Master the 6-stage lifecycle: Data → Training → Model → Testing → Prediction → Output',
    icon: 'Cpu',
    color: 'from-purple-500 to-indigo-600',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    accent: '#a855f7',
    speechIntro: "Welcome to Topic 2: How AI Works! Let's examine the step-by-step workflow of collecting data, training neural weights, and generating accurate predictions.",
    workflowStages: [
      {
        step: 1,
        name: "Data Collection & Cleaning",
        foundationsDesc: "Gathering thousands of pictures or words (like 10,000 photos of cats and dogs).",
        interDesc: "Extracting, formatting, normalizing features and handling missing values in structured or unstructured datasets.",
        advancedDesc: "Ingestion of feature tensors X ∈ R^(N×D), one-hot encoding, min-max scaling, data augmentation, train-val-test splitting (70/15/15).",
        icon: "Database"
      },
      {
        step: 2,
        name: "Training & Optimization",
        foundationsDesc: "The computer practices guessing and checks if it was right or wrong, improving over time.",
        interDesc: "Iteratively updating model parameters across multiple epochs to minimize the error or loss function.",
        advancedDesc: "Forward propagation pass, loss calculation L(y, ŷ), backward automatic differentiation to compute gradients, Adam optimizer weight updates.",
        icon: "Activity"
      },
      {
        step: 3,
        name: "Machine Learning Model",
        foundationsDesc: "The 'brain file' that now knows the rules and patterns of what a cat or dog looks like.",
        interDesc: "The trained statistical artifact containing learned weights, biases, and decision boundaries.",
        advancedDesc: "Frozen parameter weights W, b saved as ONNX/PyTorch state_dict ready for tensor inference.",
        icon: "Layers"
      },
      {
        step: 4,
        name: "Testing & Evaluation",
        foundationsDesc: "Giving the AI brand new test questions it has never seen before to check if it really learned.",
        interDesc: "Evaluating accuracy, precision, recall, F1-score, and ROC-AUC curves on an unseen test set.",
        advancedDesc: "Validation loss tracking to prevent overfitting, regularization (L2, Dropout), confusion matrix analysis, cross-validation.",
        icon: "CheckCircle"
      },
      {
        step: 5,
        name: "Prediction / Inference",
        foundationsDesc: "Showing a new photo to the AI and having it say 'I am 99% sure this is a golden retriever puppy!'.",
        interDesc: "Passing unseen runtime inputs through the trained model to generate class probabilities or regressions.",
        advancedDesc: "Low-latency forward tensor computation ŷ = f(x_new; W*), applying argmax or temperature sampling.",
        icon: "Zap"
      },
      {
        step: 6,
        name: "Output & Feedback Loop",
        foundationsDesc: "The AI gives you the result on your screen and learns from your feedback if it made a mistake.",
        interDesc: "Returning API responses to the user application and logging telemetry for continuous fine-tuning (RLHF).",
        advancedDesc: "Production serving via gRPC/REST endpoints, drift detection (KS-test), and Reinforcement Learning from Human Feedback (RLHF).",
        icon: "TrendingUp"
      }
    ]
  },
  {
    id: 'prompt-engineering',
    number: 3,
    title: 'PROMPT ENGINEERING',
    shortTitle: 'Prompt Engineering',
    tagline: 'The art & science of communicating with Large Language Models to get precision outputs',
    icon: 'Terminal',
    color: 'from-emerald-400 to-teal-600',
    glowColor: 'rgba(0, 255, 170, 0.4)',
    accent: '#00ffaa',
    speechIntro: "Welcome to Topic 3: Prompt Engineering! Learn how the right words, personas, context, and constraints unlock superpower outputs from AI models.",
    pillars: [
      { name: "Role (Persona)", desc: "Tell the AI who it is (e.g., 'You are an award-winning science teacher')." },
      { name: "Context", desc: "Provide background information and target audience (e.g., 'for a 7th grade student')." },
      { name: "Task", desc: "Define clearly what must be done (e.g., 'Explain the water cycle')." },
      { name: "Constraints", desc: "Set strict boundaries (e.g., 'in 3 bullet points, under 100 words, no jargon')." },
      { name: "Output Format", desc: "Specify the exact structure (e.g., 'Format as a Markdown table with columns: Stage, Process, Example')." }
    ],
    comparisons: [
      {
        title: "Explaining AI to Students",
        bad: "Tell me about AI.",
        badWhy: "Vague, no audience, no length limit. Produces a generic, boring 5-paragraph essay with technical jargon.",
        good: "You are an enthusiastic AI teacher. Explain Artificial Intelligence to a 6th-grade foundations student using simple English and 3 relatable real-life examples. Format your response with emoji bullet points and keep it under 150 words.",
        goodWhy: "Defines persona, target audience, exact structure (3 examples, emoji bullets), and strict word budget."
      },
      {
        title: "Coding a Python Function",
        bad: "Write a python script for sorting.",
        badWhy: "Does not specify sorting algorithm, data type, error handling, time complexity, or docstrings.",
        good: "You are a Senior Python Engineer. Write a production-ready QuickSort function in Python 3.12 with type hints, comprehensive docstrings, edge-case unit tests (empty list, duplicates, negative numbers), and an explanation of average vs worst-case Big-O time complexity.",
        goodWhy: "Ensures type safety, unit tests, edge cases, and algorithmic complexity analysis."
      },
      {
        title: "Resume Bullet Point Generation",
        bad: "Make my resume sound better for a machine learning job.",
        badWhy: "No existing projects provided, no metric framework, no ATS target role keywords.",
        good: "Act as an elite Tech Recruiter at Google. Rewrite this resume bullet point using the Google X-Y-Z formula ('Accomplished [X] as measured by [Y] by doing [Z]'): 'I built an image classifier for college.' Include target metrics, PyTorch, and ResNet-50.",
        goodWhy: "Uses proven recruiting formula (X-Y-Z) and integrates target frameworks and metrics."
      }
    ]
  },
  {
    id: 'ai-tools',
    number: 4,
    title: 'AI TOOLS & APPLICATIONS',
    shortTitle: 'AI Tools',
    tagline: 'Explore 30+ top AI tools across Chatbots, Image, Video, Coding, Study, and Productivity',
    icon: 'Grid',
    color: 'from-amber-400 to-orange-600',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    accent: '#f59e0b',
    speechIntro: "Welcome to Topic 4: AI Tools & Applications! Explore the best AI tools for coding, creating art, making presentations, and boosting your productivity.",
  },
  {
    id: 'ai-projects',
    number: 5,
    title: 'AI PROJECTS',
    shortTitle: 'AI Projects',
    tagline: 'Hands-on projects for Foundations, Applied, and Advanced with complete code and live simulators',
    icon: 'Rocket',
    color: 'from-rose-500 to-pink-600',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    accent: '#f43f5e',
    speechIntro: "Welcome to Topic 5: AI Projects! Build hands-on projects from Teachable Machine to Deep Learning neural networks with full source code and GitHub guides.",
  },
  {
    id: 'ai-resume',
    number: 6,
    title: 'RESUME',
    shortTitle: 'Resume',
    tagline: 'Build an ATS-optimized professional resume with AI bullet-point enhancers and recruiter tips',
    icon: 'FileText',
    color: 'from-blue-400 to-indigo-600',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    accent: '#3b82f6',
    speechIntro: "Welcome to Topic 6: Resume! Create an impressive professional resume with your education, projects, skills, and career goals.",
  },
  {
    id: 'spoken-english',
    number: 7,
    title: 'SPOKEN ENGLISH',
    shortTitle: 'Spoken English',
    tagline: 'Real-time conversational AI Coach: Speak, get instant grammar polish, and build fluent confidence',
    icon: 'Mic',
    color: 'from-emerald-400 to-cyan-500',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    accent: '#10b981',
    speechIntro: "Welcome to Topic 7: Spoken English! I am your AI English Coach. Talk with me, and I will help you polish your grammar, vocabulary, and interview confidence step-by-step!",
  }
];

