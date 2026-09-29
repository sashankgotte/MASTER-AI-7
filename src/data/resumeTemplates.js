/**
 * AI Resume Templates and Data for MASTER AI 7
 * Tailored for Foundations, Applied, Advanced, and AI/ML Specialists
 */

export const RESUME_PRESETS = {
  foundations: {
    name: 'Aarav Sharma',
    title: 'High Foundations Student & AI Enthusiast',
    email: 'aarav.sharma@foundationsmail.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    education: 'Delhi Public Foundations — Grade 10 (CGPA: 9.6/10) | Expected 2027',
    summary: 'Enthusiastic high foundations student with a passionate interest in Artificial Intelligence, coding, and science olympiads. Created image recognition models with Teachable Machine and built interactive Python quizzes.',
    skills: 'Python Basics, Google Teachable Machine, Scratch Coding, HTML/CSS, Robotics Club, Creative Writing, Public Speaking',
    projects: [
      {
        title: 'Smart Waste Sorting AI',
        description: 'Trained a computer vision model using Teachable Machine to classify plastic, organic, and paper waste with 94% accuracy for the annual foundations science fair.'
      },
      {
        title: 'Interactive Math Quiz Bot',
        description: 'Developed a Python console game with 50+ math puzzles, score tracking, and automated hints for grade 8 students.'
      }
    ],
    certifications: 'Google AI For Youth Certification, National Science Olympiad Gold Medalist (Foundations Rank 1)',
    careerGoal: 'Pursue Computer Science and Artificial Intelligence Engineering at a top university.'
  },

  applied: {
    name: 'Priya Patel',
    title: 'Diploma / Junior College Student | Aspiring ML Developer',
    email: 'priya.patel@collegemail.edu',
    phone: '+91 91234 56789',
    location: 'Hyderabad, India',
    education: 'Government Polytechnic / Junior College — Computer Engineering (88.4%) | 2024 - 2026',
    summary: 'Driven applied computer science student with hands-on experience in Python data structures, Scikit-Learn machine learning pipelines, and responsive web development.',
    skills: 'Python, JavaScript, C++, Pandas, NumPy, Scikit-Learn, Git & GitHub, React Basics, SQL, Data Visualization',
    projects: [
      {
        title: 'SMS Spam Classifier Web App',
        description: 'Engineered a Multinomial Naive Bayes classifier achieving 97.2% accuracy on 5,000+ SMS records; deployed an interactive web UI with Streamlit.'
      },
      {
        title: 'Student Performance Prediction System',
        description: 'Analyzed historical exam data to predict final grades using Ridge Regression and feature importance heatmaps in Pandas and Matplotlib.'
      }
    ],
    certifications: 'DeepLearning.AI Machine Learning Specialization, freeCodeCamp Responsive Web Design',
    careerGoal: 'Secure a competitive Advanced seat in AI/Data Science and build production-grade intelligent web applications.'
  },

  advanced: {
    name: 'Rohan Deshmukh',
    title: 'Advanced Computer Science (AI & ML) | Machine Learning Engineer',
    email: 'rohan.deshmukh@advancededu.ac.in',
    phone: '+91 99887 76655',
    location: 'Pune, India',
    education: 'National Institute of Technology — Advanced in Computer Science & Engineering (CGPA: 8.95/10) | 2023 - 2027',
    summary: 'Machine Learning Engineer with strong mathematical foundations in multivariable calculus, linear algebra, and deep learning architectures. Experienced in training PyTorch CNNs, building LangChain RAG pipelines, and deploying containerized microservices on AWS.',
    skills: 'PyTorch, TensorFlow, Python, C++, Docker, FastAPI, LangChain, ChromaDB, OpenCV, Scikit-Learn, AWS (EC2/S3), Git, CI/CD, Linux',
    projects: [
      {
        title: 'Pneumonia Detection in Chest Radiographs (PyTorch)',
        description: 'Architected a ResNet-50 transfer learning CNN achieving 96.4% ROC-AUC on 5,800+ chest X-rays. Integrated Grad-CAM explainability heatmaps and packaged inference endpoint with FastAPI and Docker.'
      },
      {
        title: 'Enterprise RAG Search Engine with Vector Database',
        description: 'Engineered a semantic document retrieval system using ChromaDB vector database and all-MiniLM-L6-v2 embeddings, reducing query hallucination by 85% across 10,000+ technical PDF documentation pages.'
      }
    ],
    certifications: 'AWS Certified Machine Learning - Specialty, Stanford Online Machine Learning (Coursera), NVIDIA Deep Learning Institute (DLI) Fundamentals',
    careerGoal: 'Join a high-growth AI research laboratory or enterprise engineering team as a Machine Learning Engineer.'
  }
};

export const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Optimized', 'Trained', 'Deployed',
  'Formulated', 'Reduced', 'Accelerated', 'Benchmarked', 'Integrated', 'Automated'
];

export const SKILLS_BY_GOAL = {
  'AI / ML Engineer': ['PyTorch', 'TensorFlow', 'Scikit-Learn', 'FastAPI', 'Docker', 'MLOps', 'Transformers', 'CUDA', 'Git', 'Data Pipelines'],
  'Data Scientist': ['Python', 'Pandas', 'NumPy', 'SQL', 'Seaborn', 'Statistical Modeling', 'Hypothesis Testing', 'Tableau', 'PowerBI'],
  'Computer Vision Specialist': ['OpenCV', 'PyTorch', 'YOLOv8', 'ResNet', 'Image Segmentation', 'Grad-CAM', 'Albumentations', 'MediaPipe'],
  'NLP / GenAI Developer': ['LangChain', 'LlamaIndex', 'ChromaDB', 'HuggingFace', 'Ollama', 'RAG Pipelines', 'Prompt Engineering', 'Vector DBs'],
  'Foundations Tech Scholar': ['Python', 'Scratch 3.0', 'HTML5/CSS3', 'Logic Puzzles', 'Google Teachable Machine', 'Robotics Basics']
};

