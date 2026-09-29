/**
 * Intelligent AI Engine for MASTER AI 7
 * Powers dynamic feedback for Spoken English, Prompt Evaluation,
 * Resume Enhancements, and Conversational Learning Guides.
 */

export const AI_LEVELS = {
  FOUNDATIONS: 'foundations',
  APPLIED: 'applied',
  ADVANCED: 'advanced'
};

// Spoken English Grammar & Polish Heuristics
export function analyzeSpokenEnglish(userInput, level = AI_LEVELS.FOUNDATIONS, scenarioId = 'self_intro') {
  const text = (userInput || '').trim();
  if (!text) {
    return {
      userSentence: '',
      betterSentence: 'Please speak or type a sentence to begin our conversation!',
      explanation: 'Say hello or introduce yourself to get started.',
      score: 0,
      nextQuestion: 'Hello! I am your AI English coach. Could you tell me a little about yourself?'
    };
  }

  const lower = text.toLowerCase();
  let betterSentence = text;
  let explanation = '';
  let score = 80;
  let nextQuestion = '';

  if (lower.includes('how to talk english') || lower.includes('how can i talk english') || lower.includes('speak english')) {
    betterSentence = 'How can I speak English more confidently?';
    explanation = 'Use the question form “How can I...?” and the adverb “confidently” to describe improving a speaking skill naturally.';
    score = 78;
    nextQuestion = 'What situation would you like to speak English in: an interview, a classroom, or everyday conversation?';
    return { userSentence: text, betterSentence, explanation, score, nextQuestion };
  }

  // Common grammar patterns & level enhancements
  if (level === AI_LEVELS.FOUNDATIONS) {
    if (lower.includes('my self') || lower.includes('myself')) {
      betterSentence = text.replace(/myself\s+/i, 'My name is ').replace(/my self\s+/i, 'My name is ');
      explanation = 'In English, avoid starting an introduction with "Myself". Use "My name is..." or "I am..." for standard, polite grammar.';
      score = 75;
    } else if (lower.includes('i am having') && (lower.includes('brother') || lower.includes('sister') || lower.includes('dog') || lower.includes('car'))) {
      betterSentence = text.replace(/i am having/gi, 'I have');
      explanation = 'Use "I have" for possession instead of "I am having", which implies an ongoing activity (like having lunch).';
      score = 78;
    } else if (lower.includes('i am study in') || lower.includes('i study in class')) {
      betterSentence = text.replace(/i am study in/gi, 'I study in Grade').replace(/i study in class/gi, 'I am in Grade');
      explanation = 'Say "I am in Grade 8" or "I study in Grade 8" instead of "I am study in".';
      score = 82;
    } else if (lower.length < 15) {
      betterSentence = `${text.charAt(0).toUpperCase() + text.slice(1)}, and I am excited to learn with Master AI 7 today!`;
      explanation = 'Try adding extra details to your sentence to make the conversation lively and express enthusiasm!';
      score = 85;
    } else {
      betterSentence = text.charAt(0).toUpperCase() + text.slice(1) + (text.endsWith('.') ? '' : '.');
      explanation = 'Great grammatical structure! You expressed your thoughts clearly with correct tense and vocabulary.';
      score = 92;
    }

    // Dynamic Foundations Next Questions
    const foundationsQuestions = [
      "That's wonderful! What is your favorite subject in foundations, and why do you like it?",
      "Super! What hobbies do you enjoy when you are not studying?",
      "Awesome! Do you like playing video games or sports with your friends?",
      "Very nice! Have you ever used an AI assistant like Google Assistant or ChatGPT before?",
      "Great job! What would you like to build with AI when you grow up?"
    ];
    nextQuestion = foundationsQuestions[Math.floor(Math.random() * foundationsQuestions.length)];

  } else if (level === AI_LEVELS.APPLIED) {
    if (lower.includes('revert back')) {
      betterSentence = text.replace(/revert back/gi, 'respond') || text.replace(/revert back/gi, 'reply');
      explanation = '"Revert" already means to go back. Use "respond" or "reply" instead of "revert back".';
      score = 76;
    } else if (lower.includes('pass out') || lower.includes('passed out')) {
      betterSentence = text.replace(/passed out/gi, 'graduated').replace(/pass out/gi, 'graduate');
      explanation = 'In professional English, use "graduated" or "completed my degree". "Passed out" usually means losing consciousness!';
      score = 74;
    } else if (lower.includes('i am having 2 years') || lower.includes('i am having experience')) {
      betterSentence = text.replace(/i am having (\d+) years/gi, 'I have $1 years').replace(/i am having experience/gi, 'I possess experience');
      explanation = 'Express professional experience using "I have..." or "I possess...".';
      score = 80;
    } else {
      betterSentence = `Regarding this, ${text.toLowerCase().startsWith('i ') ? text : text.charAt(0).toLowerCase() + text.slice(1)}. I believe this plays a crucial role in modern technology.`;
      explanation = 'Using connective phrases like "Regarding this" and "plays a crucial role" elevates your fluency for group discussions and presentations.';
      score = 88;
    }

    const interQuestions = [
      "Interesting perspective! How do you think AI tools like ChatGPT are transforming the way college students study?",
      "Well spoken! If you were leading a team project, how would you divide the technical and presentation responsibilities?",
      "That's insightful. Could you describe a challenging academic project or problem you recently worked on?",
      "Excellent. In your opinion, what is the biggest advantage of learning AI early in your career?"
    ];
    nextQuestion = interQuestions[Math.floor(Math.random() * interQuestions.length)];

  } else {
    // ADVANCED LEVEL
    if (lower.includes('did not knew') || lower.includes('did not went')) {
      betterSentence = text.replace(/did not knew/gi, 'did not know').replace(/did not went/gi, 'did not go');
      explanation = 'With the auxiliary verb "did", always use the base form of the main verb ("did not know", "did not go").';
      score = 72;
    } else if (lower.includes('i have done my advanced')) {
      betterSentence = 'I hold a Bachelor of Technology degree in Computer Science, with specialization in Machine Learning.';
      explanation = 'Replace informal statements like "done my advanced" with formal industry phrasing: "I hold a Bachelor of Technology degree in..."';
      score = 80;
    } else if (lower.includes('my project is about') || lower.includes('i did a project')) {
      betterSentence = `I spearheaded an engineering project focused on ${text.replace(/.*(about|project)\s*/i, '')}, optimizing model throughput and precision.`;
      explanation = 'Use high-impact action verbs like "spearheaded", "architected", "engineered", and quantify technical achievements.';
      score = 84;
    } else {
      betterSentence = `To elaborate on that, ${text.charAt(0).toLowerCase() + text.slice(1)} Furthermore, this approach optimizes algorithmic efficiency and scalability.`;
      explanation = 'Excellent professional delivery! Adding enterprise metrics and transitional discourse markers demonstrates senior engineering communication.';
      score = 95;
    }

    const advancedQuestions = [
      "Excellent explanation. Could you walk me through the system architecture and the trade-offs between precision and recall in your model?",
      "Very articulate. How do you handle overfitting when working with sparse or imbalanced datasets in production?",
      "Impressive. Can you describe a scenario where you had to debug a complex distributed pipeline or resolve a latency bottleneck?",
      "Great technical depth. How do you stay updated with the latest LLM architectures and research papers on arXiv?"
    ];
    nextQuestion = advancedQuestions[Math.floor(Math.random() * advancedQuestions.length)];
  }

  // Fallback polish if already very clean
  if (betterSentence === text && score >= 88) {
    if (level === AI_LEVELS.FOUNDATIONS) {
      betterSentence = `🌟 "${text}" — This is well formulated and very easy to understand!`;
    } else if (level === AI_LEVELS.APPLIED) {
      betterSentence = `💡 "${text}" — Clear articulate articulation with solid grammatical flow!`;
    } else {
      betterSentence = `🚀 "${text}" — Highly professional, structured, and recruiter-ready!`;
    }
  }

  return {
    userSentence: text,
    betterSentence: betterSentence,
    explanation: explanation,
    score: Math.min(99, Math.max(65, score)),
    nextQuestion: nextQuestion
  };
}

// Prompt Engineering Evaluator
export function evaluatePrompt(promptText) {
  const p = (promptText || '').trim();
  if (!p) {
    return {
      score: 0,
      breakdown: { role: false, context: false, task: false, constraints: false, outputFormat: false },
      critique: 'Please enter a prompt to analyze.',
      suggestions: ['Add a Persona/Role', 'Specify constraints', 'Define output format'],
      improvedPrompt: '',
      sampleResponse: ''
    };
  }

  const lower = p.toLowerCase();
  const hasRole = lower.includes('act as') || lower.includes('you are') || lower.includes('as an expert') || lower.includes('role:');
  const hasContext = lower.includes('for a') || lower.includes('context:') || lower.includes('target audience') || lower.includes('student') || lower.includes('company');
  const hasTask = lower.includes('write') || lower.includes('explain') || lower.includes('create') || lower.includes('generate') || lower.includes('summarize') || lower.includes('analyze') || lower.includes('build');
  const hasConstraints = lower.includes('limit') || lower.includes('no more than') || lower.includes('in 3') || lower.includes('simple') || lower.includes('bullet points') || lower.includes('without') || lower.includes('under');
  const hasFormat = lower.includes('table') || lower.includes('markdown') || lower.includes('json') || lower.includes('bullet') || lower.includes('format:') || lower.includes('step-by-step');

  let points = 20; // baseline
  if (hasRole) points += 20;
  if (hasContext) points += 15;
  if (hasTask) points += 20;
  if (hasConstraints) points += 15;
  if (hasFormat) points += 10;
  if (p.length > 50) points += 10;
  if (p.length > 120) points += 5;

  const score = Math.min(100, points);

  let suggestions = [];
  if (!hasRole) suggestions.push('Define a clear Persona (e.g., "You are an elite AI researcher...")');
  if (!hasContext) suggestions.push('Add background context & target audience (e.g., "for a 9th-grade student")');
  if (!hasConstraints) suggestions.push('Set strict bounds (e.g., "in under 150 words, using 3 real-world analogies")');
  if (!hasFormat) suggestions.push('Specify desired output structure (e.g., "Provide answer in Markdown bullet points with key takeaways")');

  const improvedPrompt = `You are a Senior AI Professor. ${p.replace(/[?.!]+$/, '')}. Provide your response formatted in structured Markdown with: 1) A 2-sentence executive summary, 2) 3 practical real-world examples, and 3) Key takeaways for students. Keep the explanation engaging, concise, and jargon-free.`;

  const sampleResponse = `### Executive Summary\nArtificial Intelligence empowers computational systems to analyze data, identify complex patterns, and make autonomous decisions mimicking human cognition.\n\n### Key Pillars & Real-World Examples\n1. **Computer Vision**: Facial recognition on smartphones and autonomous vehicle lane detection.\n2. **Natural Language Processing**: Multilingual translation and conversational tutors like Master AI 7.\n3. **Predictive Analytics**: Weather forecasting and streaming recommendation algorithms.\n\n### Key Takeaways\n- AI learns from historical training data rather than rigid static rules.\n- Modern systems use deep neural networks with millions of parameters.\n- Responsible AI prioritizes fairness, safety, and human empowerment.`;

  return {
    score,
    breakdown: {
      role: hasRole,
      context: hasContext,
      task: hasTask,
      constraints: hasConstraints,
      outputFormat: hasFormat
    },
    critique: score > 80 
      ? 'Outstanding prompt! It contains clear role definition, task scope, and structural constraints.' 
      : score > 50 
        ? 'Decent prompt, but it lacks specific constraints or persona definition to guarantee high-precision results.'
        : 'This prompt is too vague. The AI might provide generic or verbose responses without proper context.',
    suggestions,
    improvedPrompt,
    sampleResponse
  };
}

// AI Tool Recommender
export function recommendAITools(userGoal = '', level = AI_LEVELS.FOUNDATIONS) {
  const query = userGoal.toLowerCase();

  if (query.includes('video') || query.includes('movie') || query.includes('animation')) {
    return {
      primary: 'Runway Gen-2 & Sora',
      category: 'AI Video Tools',
      why: 'Best suited for generating high-fidelity cinematic video clips and animation from text prompts.',
      alternatives: ['Pika Labs', 'HeyGen', 'CapCut AI'],
      recommendedPrompt: 'Generate a futuristic educational animation showing neural network data packets moving between brain nodes.'
    };
  }

  if (query.includes('code') || query.includes('python') || query.includes('program') || query.includes('website') || query.includes('bug')) {
    return {
      primary: level === AI_LEVELS.ADVANCED ? 'Cursor & GitHub Copilot' : 'Claude Code & ChatGPT',
      category: 'AI Coding Tools',
      why: 'Provides real-time code generation, syntax debugging, intelligent autocompletion, and architecture refactoring.',
      alternatives: ['v0 by Vercel', 'Replit AI', 'DeepSeek Coder'],
      recommendedPrompt: 'Write a clean Python script using Scikit-Learn to train a DecisionTreeClassifier on student test scores.'
    };
  }

  if (query.includes('presentation') || query.includes('slide') || query.includes('ppt') || query.includes('deck')) {
    return {
      primary: 'Gamma App',
      category: 'AI Presentation Tools',
      why: 'Instantly converts any outline or topic into gorgeous, interactive, polished presentation decks and webpages.',
      alternatives: ['Beautiful.ai', 'Tome', 'Canva Magic Design'],
      recommendedPrompt: 'Create a 7-slide presentation explaining How Neural Networks Work for high foundations students.'
    };
  }

  if (query.includes('image') || query.includes('art') || query.includes('draw') || query.includes('logo') || query.includes('poster')) {
    return {
      primary: 'Midjourney & DALL·E 3',
      category: 'AI Image Tools',
      why: 'State-of-the-art photorealistic and graphic design generation with photorealistic lighting and styles.',
      alternatives: ['Stable Diffusion XL', 'Canva Magic Media', 'Flux.1'],
      recommendedPrompt: 'A futuristic cybernetic holographic AI teacher robot in a modern neon classroom, 8k resolution, cinematic lighting.'
    };
  }

  if (query.includes('study') || query.includes('homework') || query.includes('research') || query.includes('paper') || query.includes('math')) {
    return {
      primary: 'Perplexity AI & Google Gemini',
      category: 'AI Study Tools',
      why: 'Direct answer engine with live citations, academic paper references, and step-by-step mathematical solutions.',
      alternatives: ['Photomath', 'Quizlet AI', 'Elicit AI'],
      recommendedPrompt: 'Explain the backpropagation calculus step-by-step with LaTeX equations and geometric intuition.'
    };
  }

  // Default Chatbot
  return {
    primary: 'ChatGPT-4o & Google Gemini 2.0',
    category: 'AI Chatbots & Conversational Engines',
    why: 'Versatile multimodal foundation models that can answer questions, brainstorm, debug code, and teach any subject.',
    alternatives: ['Claude 3.5 Sonnet', 'Microsoft Copilot', 'Mistral Large'],
    recommendedPrompt: 'Act as my personal AI mentor. Test my understanding of gradient descent with 3 progressive questions.'
  };
}

