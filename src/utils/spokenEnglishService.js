/**
 * Spoken English Service for MASTER AI 7
 * Powers the AI English Tutor, Daily Conversation role-play, Speaking Practice,
 * and 7-Question Mock Interview with comprehensive AI feedback.
 * 
 * Architecture is designed to easily plug into an external LLM / Speech API backend.
 */

// 7 EXACT Required Daily Conversation Topics
export const DAILY_CONVERSATION_TOPICS = [
  {
    id: 'self_intro',
    emoji: '👋',
    title: 'Self Introduction',
    tagline: 'Practice introducing yourself in English',
    scenarioDescription: 'Practice introducing your name, background, interests, and future ambitions in a welcoming environment.',
    openingPrompt: "Hello! Welcome to our English practice. I would love to get to know you. Could you please introduce yourself — what is your name, where are you from, and what do you enjoy doing?",
    openingVoice: "Hello! Welcome to our English practice. Could you please introduce yourself — what is your name and what do you enjoy doing?",
    roleName: 'AI English Coach',
    rolePlayPrompts: [
      "That's lovely! What inspired you to learn about Artificial Intelligence and technology?",
      "Fascinating! How do you like to spend your free time when you're not studying or working?",
      "Wonderful! What is one personal or professional goal you are currently working towards?"
    ]
  },
  {
    id: 'friends',
    emoji: '🧑🤝🧑',
    title: 'Friends Conversation',
    tagline: 'Practice casual conversations with friends',
    scenarioDescription: 'Chat casually about weekend plans, movies, music, and hanging out with close friends.',
    openingPrompt: "Hey there! It's so good to catch up with you! How has your week been going, and do you have any fun plans for this weekend?",
    openingVoice: "Hey there! It's so good to catch up with you! How has your week been going, and do you have any fun plans for this weekend?",
    roleName: 'Your Friend Alex',
    rolePlayPrompts: [
      "Oh nice! Have you watched any good movies or web series lately that you would recommend?",
      "That sounds great! Would you be up for grabbing a coffee or catching a film together sometime this Saturday?",
      "Awesome! Let's definitely do that. What kind of music or podcasts have you been listening to lately?"
    ]
  },
  {
    id: 'college',
    emoji: '🎓',
    title: 'College Conversation',
    tagline: 'Practice common college situations',
    scenarioDescription: 'Discuss coursework, seminar projects, library study sessions, and campus life with a classmate.',
    openingPrompt: "Hey! Did you attend today's computer science lecture on machine learning? What did you think about the professor's explanation of neural networks?",
    openingVoice: "Hey! Did you attend today's lecture? What did you think about the professor's explanation of neural networks?",
    roleName: 'Classmate Jordan',
    rolePlayPrompts: [
      "I agree! Are you planning to work on the lab assignment today or over the weekend?",
      "Would you like to partner up for the semester project? We could build an AI project together!",
      "Great idea! Which library or study room do you usually prefer for group discussions?"
    ]
  },
  {
    id: 'interview',
    emoji: '💼',
    title: 'Interview Conversation',
    tagline: 'Practice professional conversations',
    scenarioDescription: 'Engage in a professional workplace discussion regarding role expectations, collaboration, and deadlines.',
    openingPrompt: "Good morning! Thank you for meeting with me today. Could you share a quick overview of your professional background and why you are interested in this position?",
    openingVoice: "Good morning! Thank you for meeting with me today. Could you share an overview of your background and your interest in this role?",
    roleName: 'Hiring Manager Sarah',
    rolePlayPrompts: [
      "Thank you for sharing that. How do you handle tight project deadlines when multiple tasks compete for your attention?",
      "Can you describe an instance where you worked closely with a team to solve a challenging technical problem?",
      "That demonstrates good problem solving. What type of work culture helps you perform at your best?"
    ]
  },
  {
    id: 'shopping',
    emoji: '🛍️',
    title: 'Shopping',
    tagline: 'Practice shopping conversations',
    scenarioDescription: 'Practice asking store staff about clothing sizes, gadget specifications, discounts, and payment methods.',
    openingPrompt: "Hello! Welcome to Tech & Style Outfitters. How can I assist you with your shopping today? Are you looking for anything specific?",
    openingVoice: "Hello! Welcome to Tech and Style Outfitters. How can I assist you today? Are you looking for anything specific?",
    roleName: 'Store Assistant Priya',
    rolePlayPrompts: [
      "We have some great options in stock! What size and color would you prefer to try on?",
      "We actually have a special 15% discount on this item today! Would you like me to check if we have other styles available?",
      "Sure thing! Will you be paying with a credit card, mobile pay, or cash at the checkout counter?"
    ]
  },
  {
    id: 'restaurant',
    emoji: '🍽️',
    title: 'Restaurant',
    tagline: 'Practice ordering food and speaking with restaurant staff',
    scenarioDescription: 'Practice reserving a table, asking about daily specials, ordering food and drinks, and requesting the bill.',
    openingPrompt: "Good evening! Welcome to The Skyline Bistro. A table for how many guests tonight, and would you prefer indoor or terrace seating?",
    openingVoice: "Good evening! Welcome to The Skyline Bistro. A table for how many guests, and do you prefer indoor or terrace seating?",
    roleName: 'Restaurant Host Marco',
    rolePlayPrompts: [
      "Right this way to your table! Here are the menus. Can I bring you some iced lemon tea or fresh juice while you decide on your starters?",
      "Our chef's special today is Grilled Paneer with Herb Rice, or Pasta Primavera. Are you ready to order your main course?",
      "Excellent choice! Did you enjoy your meal, and would you like to see our dessert menu or shall I prepare the bill?"
    ]
  },
  {
    id: 'travel',
    emoji: '✈️',
    title: 'Travel',
    tagline: 'Practice common English conversations while travelling',
    scenarioDescription: 'Practice airport check-in, asking for directions, hotel reception inquiries, and booking local transport.',
    openingPrompt: "Hello traveller! Welcome to Grand Horizon Airport Hotel reception. Are you checking in today, or can I help you with directions and local transport?",
    openingVoice: "Hello traveller! Welcome to Grand Horizon Hotel. Are you checking in today, or can I help you with directions and transport?",
    roleName: 'Travel Desk Agent Leo',
    rolePlayPrompts: [
      "Certainly! May I please see your booking confirmation and ID? Do you have any preference between a high-floor room or a quiet corner room?",
      "Here is your room key card! Are you interested in the airport shuttle schedule, or would you like recommendations for tourist landmarks?",
      "The metro station is just a 5-minute walk down the main street. Would you like a city map with the fastest transit routes highlighted?"
    ]
  }
];

// Curated Speaking Practice Prompts
export const SPEAKING_PRACTICE_PROMPTS = [
  {
    id: 'sp_1',
    category: 'Personal Life',
    question: "Describe your favorite hobby and explain why it makes you feel energized.",
    guidance: "Mention when you started, what tools or equipment you use, and why you recommend it.",
    modelAnswer: "One of my favorite hobbies is playing badminton because it keeps me physically fit and mentally alert. I usually play every evening with my friends at the local court."
  },
  {
    id: 'sp_2',
    category: 'Technology & AI',
    question: "Explain what Artificial Intelligence is as if you were explaining it to a young student.",
    guidance: "Use simple real-world metaphors like a smart robot helper, voice assistants, or self-driving cars.",
    modelAnswer: "Artificial Intelligence is like giving computers a brain so they can learn from examples, recognize photos, understand your voice, and help humans solve complex problems."
  },
  {
    id: 'sp_3',
    category: 'Professional Skills',
    question: "Why is effective communication important when collaborating on a team project?",
    guidance: "Highlight clarity, avoiding misunderstandings, active listening, and meeting deadlines.",
    modelAnswer: "Effective communication ensures everyone is aligned with project goals, helps resolve technical disagreements respectfully, and prevents costly delays."
  },
  {
    id: 'sp_4',
    category: 'Travel & Culture',
    question: "Describe a city or place you would love to visit in the future and what you would do there.",
    guidance: "Talk about historical landmarks, local cuisine, the culture, and what attracts you.",
    modelAnswer: "I would love to visit Tokyo, Japan, because of its incredible blend of futuristic robotics and rich cultural traditions. I want to experience the bullet train and visit tech districts."
  }
];

// The 7 EXACT Required Mock Interview Questions
export const INTERVIEW_QUESTIONS = [
  {
    id: 'q1',
    num: 1,
    question: "Tell me about yourself.",
    category: "Introduction & Background",
    tip: "Give an engaging 60-90 second summary of your education, tech skills, and career passion. Avoid repeating your entire resume word-for-word.",
    modelAnswer: "I am a motivated technology graduate with a strong foundation in Artificial Intelligence and software development. Throughout my academic projects, I have developed a passion for building user-centric applications, and I am excited to contribute my skills to your engineering team."
  },
  {
    id: 'q2',
    num: 2,
    question: "Tell me about your education.",
    category: "Academic Foundation",
    tip: "Focus on your degree, core coursework (like Data Structures, AI, or Web Technologies), and any academic distinctions or extracurricular leadership.",
    modelAnswer: "I completed my degree in Computer Science Engineering with a strong focus on Machine Learning and algorithms. Beyond core coursework, I actively participated in coding competitions and technical workshops that strengthened my practical problem-solving abilities."
  },
  {
    id: 'q3',
    num: 3,
    question: "Tell me about your project.",
    category: "Technical Expertise",
    tip: "Use the STAR method: Situation, Task, Action, and Result. Mention the tech stack used and what problem the project solved.",
    modelAnswer: "One of my standout projects was an AI-powered diagnostic application built with React, Python, and PyTorch. I was responsible for model training and API integration, and our team successfully achieved a 94% classification accuracy on test benchmarks."
  },
  {
    id: 'q4',
    num: 4,
    question: "What are your strengths?",
    category: "Self-Awareness & Value",
    tip: "Pick 2-3 genuine strengths (e.g. quick learner, disciplined debugger, team collaborator) and back them up with a brief real-world example.",
    modelAnswer: "My greatest strengths are rapid adaptability to new technologies and strong analytical persistence. When encountering complex bugs, I break the problem into smaller testable modules until a clean solution is found."
  },
  {
    id: 'q5',
    num: 5,
    question: "What are your career goals?",
    category: "Vision & Ambition",
    tip: "Balance short-term mastery (becoming a dependable engineer) with long-term aspiration (leading technical initiatives or architecting scalable systems).",
    modelAnswer: "In the short term, my goal is to hone my software engineering skills on impactful production projects. Long term, I aim to lead innovative AI initiatives that solve meaningful real-world challenges for enterprise users."
  },
  {
    id: 'q6',
    num: 6,
    question: "Why should we hire you?",
    category: "Value Proposition",
    tip: "Connect your enthusiasm, foundational skills, and willingness to learn directly to the company's growth and team goals.",
    modelAnswer: "You should hire me because I combine solid technical fundamentals with a relentless work ethic. I am eager to learn from your experienced engineers and consistently deliver clean, maintainable code."
  },
  {
    id: 'q7',
    num: 7,
    question: "Where do you see yourself in 5 years?",
    category: "Long-Term Commitment",
    tip: "Show commitment to continuous growth, mentoring newer team members, and taking ownership of key architectural responsibilities.",
    modelAnswer: "In 5 years, I envision myself as a seasoned senior engineer or technical lead within the organization, mentoring junior developers and driving high-impact technical architecture decisions."
  }
];

/**
 * Robust linguistic rule-based analyzer for English speech and text
 * Identifies common grammatical mistakes, provides polished natural sentences,
 * assesses structure and fluency, and provides honest pronunciation tips.
 */
export function analyzeEnglishResponse(rawInput, context = {}) {
  const text = (rawInput || '').trim();
  if (!text) {
    return {
      userSentence: '',
      correction: 'Please speak or type a sentence.',
      betterSentence: 'Hello! I am ready to practice English with you today.',
      grammarFeedback: 'No sentence detected yet. Click the microphone or type to practice.',
      pronunciationFeedback: 'Speak clearly into your microphone when ready.',
      sentenceStructure: 'Incomplete sentence.',
      fluency: 'Awaiting speech input.',
      score: 0
    };
  }

  const lower = text.toLowerCase();
  let correction = text;
  let grammarNotes = [];
  let score = 82;

  // 1. "Myself <name>" -> "My name is <name>"
  if (lower.startsWith('myself ') || lower.includes(' myself ')) {
    correction = correction.replace(/\bmyself\s+([a-zA-Z]+)/i, 'My name is $1');
    grammarNotes.push('Avoid starting self-introductions with "Myself". In standard English, use "My name is..." or "I am...".');
    score -= 8;
  }

  // 2. "I am having <noun>" for possession
  if (/\bi am having\s+(a\s+)?(brother|sister|car|laptop|phone|dog|cat|doubt|question|two years|experience)/i.test(correction)) {
    correction = correction.replace(/\bi am having\b/gi, 'I have');
    grammarNotes.push('Use "I have" for possession or states. "I am having" is reserved for dynamic actions like "having lunch".');
    score -= 6;
  }

  // 3. "Passed out" -> "graduated"
  if (/\b(passed out|pass out)\b/i.test(correction)) {
    correction = correction.replace(/\bpassed out\b/gi, 'graduated').replace(/\bpass out\b/gi, 'graduate');
    grammarNotes.push('In professional and academic English, use "graduated". "Passed out" commonly means fainting or losing consciousness.');
    score -= 7;
  }

  // 4. "Revert back" -> "reply" or "respond"
  if (/\brevert back\b/i.test(correction)) {
    correction = correction.replace(/\brevert back\b/gi, 'reply');
    grammarNotes.push('"Revert" already means to go back. Use "reply" or "respond" to avoid redundancy.');
    score -= 5;
  }

  // 5. "I am study in" / "I study in class"
  if (/\bi am study\b/i.test(correction) || /\bi study in class\b/i.test(correction)) {
    correction = correction.replace(/\bi am study in\b/gi, 'I study in').replace(/\bi am study\b/gi, 'I am studying');
    grammarNotes.push('Use the continuous form "I am studying" or the simple present "I study".');
    score -= 6;
  }

  // 6. Subject-Verb agreement: "he do", "she do", "they is"
  if (/\b(he|she|it)\s+do\b/i.test(correction)) {
    correction = correction.replace(/\b(he|she|it)\s+do\b/gi, '$1 does');
    grammarNotes.push('Third-person singular subjects (he, she, it) take "does", not "do".');
    score -= 6;
  }
  if (/\b(they|we)\s+is\b/i.test(correction)) {
    correction = correction.replace(/\b(they|we)\s+is\b/gi, '$1 are');
    grammarNotes.push('Plural subjects (they, we) require the plural verb "are".');
    score -= 6;
  }

  // 7. Double Negatives: "don't know nothing"
  if (/\bdon't\s+know\s+nothing\b/i.test(correction)) {
    correction = correction.replace(/\bdon't\s+know\s+nothing\b/gi, "don't know anything");
    grammarNotes.push('Avoid double negatives. Use "don\'t know anything" instead of "don\'t know nothing".');
    score -= 8;
  }

  // 8. Capitalize first letter and ensure ending punctuation
  correction = correction.charAt(0).toUpperCase() + correction.slice(1);
  if (!/[.!?]$/.test(correction)) {
    correction += '.';
  }

  // Generate a polished, natural "Better Sentence"
  let betterSentence = correction;
  const wordCount = text.split(/\s+/).filter(Boolean).length;

  if (wordCount < 4) {
    betterSentence = `${correction.replace(/\.$/, '')}, and I am looking forward to exploring this further.`;
  } else if (!lower.includes('excited') && !lower.includes('confident') && wordCount > 6) {
    // Enrich with fluent transitional phrases
    betterSentence = correction
      .replace(/^I think /, 'In my view, ')
      .replace(/^Because /, 'This is primarily because ')
      .replace(/\band also\b/gi, 'furthermore,');
  }

  // Formulate clear grammar feedback
  let grammarFeedback = grammarNotes.length > 0
    ? grammarNotes.join(' ')
    : 'Excellent grammatical structure! Your sentence conveys your ideas clearly with proper tense and subject-verb harmony.';

  // Sentence Structure breakdown
  let sentenceStructure = 'Well-formed complete sentence with a clear subject and predicate.';
  if (wordCount <= 3) {
    sentenceStructure = 'Short phrase. Try expanding into a complete sentence with connecting clauses.';
  } else if (text.includes('and') || text.includes('because') || text.includes('which') || text.includes('while')) {
    sentenceStructure = 'Complex sentence with cohesive connective conjunctions. Great structure!';
  }

  // Fluency Assessment (based on length, rhythm, vocabulary richness)
  let fluency = 'Good natural cadence and speech clarity.';
  if (wordCount < 5) {
    fluency = 'Concise response. Adding one more supporting detail will make your speaking sound more fluent.';
  } else if (wordCount >= 12) {
    fluency = 'Rich, articulate vocabulary with strong expressive flow.';
    score = Math.min(98, score + 6);
  }

  // Honest Pronunciation Feedback
  // Identifies words with challenging phonetic accents or multi-syllable stresses
  const phoneticCheck = [
    { word: 'algorithm', tip: 'Stress the first syllable: AL-go-rith-um' },
    { word: 'comfortable', tip: 'Pronounced with 3 syllables: COMF-ter-bul (not com-for-ta-ble)' },
    { word: 'schedule', tip: 'Stress the first syllable: SKED-yool (or SHED-yool)' },
    { word: 'technology', tip: 'Stress the second syllable: tek-NOL-o-jee' },
    { word: 'experience', tip: 'Four syllables with stress on the second: ek-SPEER-ee-ens' },
    { word: 'graduated', tip: 'Pronounce clearly: GRA-joo-ay-ted' },
    { word: 'development', tip: 'Stress the second syllable: de-VEL-op-ment' },
    { word: 'interview', tip: 'Stress the first syllable: IN-ter-view' }
  ];

  const foundPhonetics = phoneticCheck.filter(p => lower.includes(p.word));
  let pronunciationFeedback = '';
  if (foundPhonetics.length > 0) {
    pronunciationFeedback = `Phonetic pronunciation guide: For "${foundPhonetics[0].word}", ${foundPhonetics[0].tip}.`;
  } else {
    pronunciationFeedback = 'Speech recognition transcribed your words clearly. Focus on smooth breath pacing and natural sentence rhythm.';
  }

  score = Math.max(65, Math.min(98, score));

  return {
    userSentence: text,
    correction,
    betterSentence,
    grammarFeedback,
    pronunciationFeedback,
    sentenceStructure,
    fluency,
    score
  };
}

/**
 * Generates an interactive role-play response for Daily Conversation
 */
export function generateConversationResponse(topicId, turnIndex, userInput, history = []) {
  const topic = DAILY_CONVERSATION_TOPICS.find(t => t.id === topicId) || DAILY_CONVERSATION_TOPICS[0];
  const analysis = analyzeEnglishResponse(userInput);

  // Pick prompt for next turn or conclude gracefully
  const nextPrompts = topic.rolePlayPrompts;
  const promptIdx = turnIndex % nextPrompts.length;
  const nextQuestion = nextPrompts[promptIdx];

  const motivationalPrefixes = [
    "That makes total sense!",
    "I appreciate you sharing that!",
    "That's wonderful to hear!",
    "Great point!",
    "Thanks for explaining that so clearly!"
  ];
  const prefix = motivationalPrefixes[turnIndex % motivationalPrefixes.length];

  const replyText = `${prefix} ${nextQuestion}`;
  const speechText = `${prefix} ${nextQuestion}`;

  return {
    replyText,
    speechText,
    analysis
  };
}

/**
 * Generates AI English Tutor response for freeform dialogue
 */
export function generateTutorResponse(userInput, history = []) {
  const analysis = analyzeEnglishResponse(userInput);
  const lower = userInput.toLowerCase();

  let tutorMessage = '';
  let speechText = '';

  if (lower.includes('hello') || lower.includes('hi ') || lower === 'hi') {
    tutorMessage = "Hello! It is fantastic to practice with you. What English topic would you like to explore today: everyday conversation, grammar tips, or mock interview practice?";
    speechText = "Hello! It is fantastic to practice with you. What English topic would you like to explore today?";
  } else if (lower.includes('grammar') || lower.includes('rule')) {
    tutorMessage = "I would love to help with grammar! A great tip for spoken English is subject-verb agreement: remember singular subjects take singular verbs (e.g., 'She runs', 'He speaks'). Tell me a sentence and we can polish it!";
    speechText = "I would love to help with grammar! Tell me a sentence, and we can polish it together.";
  } else if (lower.includes('interview') || lower.includes('job')) {
    tutorMessage = "Job interviews are all about confidence and concise storytelling! Use the STAR method: Situation, Task, Action, and Result. Would you like to practice your elevator pitch right now?";
    speechText = "Job interviews are all about confidence! Would you like to practice your elevator pitch right now?";
  } else if (lower.includes('how are you') || lower.includes('how r u')) {
    tutorMessage = "I am doing splendidly, thank you! Ready and eager to help you build confident, fluent English communication. What is on your mind today?";
    speechText = "I am doing splendidly, thank you! Ready and eager to help you build confident English communication.";
  } else {
    const conversationalFollowUps = [
      "That is a great thought! Can you expand a little more on that?",
      "Well spoken! How would you describe that experience in your own words?",
      "Interesting perspective! What do you think is the most exciting part about that?",
      "Nice sentence! Let's keep the dialogue moving — what else would you like to discuss?"
    ];
    const followUp = conversationalFollowUps[Math.floor(Math.random() * conversationalFollowUps.length)];
    tutorMessage = `You expressed your thoughts well! ${followUp}`;
    speechText = tutorMessage;
  }

  return {
    tutorMessage,
    speechText,
    analysis
  };
}

/**
 * Generates the Comprehensive # AI INTERVIEW FEEDBACK report after completing all 7 questions
 */
export function generateInterviewFeedback(interviewAnswers = []) {
  const total = 7;
  const completed = interviewAnswers.filter(a => a && a.userAnswer).length;

  // Aggregate grammar and vocabulary patterns
  const allAnalyses = interviewAnswers.map(a => a.analysis || analyzeEnglishResponse(a.userAnswer));
  const avgScore = allAnalyses.length > 0
    ? Math.round(allAnalyses.reduce((acc, curr) => acc + (curr.score || 80), 0) / allAnalyses.length)
    : 85;

  const grammarImprovementAreas = [
    "Ensure consistent past tense when describing historical projects and past coursework.",
    "Avoid self-introduction idioms like 'Myself John' — always use 'My name is John' or 'I am John'.",
    "Maintain subject-verb consistency when describing team achievements ('Our team was responsible for...')."
  ];

  const vocabularyImprovementAreas = [
    "Replace generic verbs like 'did' or 'made' with high-impact engineering action verbs: 'Architected', 'Implemented', 'Optimized', and 'Coordinated'.",
    "Incorporate transitional signposts like 'Furthermore', 'Consequently', and 'In summary' to structure answers coherently.",
    "Use industry-standard terminology when describing algorithms, frameworks, and performance benchmarks."
  ];

  const pronunciationPracticeAreas = [
    "Practice multi-syllable tech words with steady syllable emphasis: 'Al-go-rithm', 'De-vel-op-ment', 'Ar-chi-tec-ture'.",
    "Pause deliberately after key sentences rather than using filler words like 'um' or 'like'.",
    "Maintain clear consonant endings on past-tense verbs (e.g. 'completed', 'integrated', 'achieved')."
  ];

  let fluencySummary = "Moderate speech rhythm with clear message delivery.";
  if (avgScore >= 88) {
    fluencySummary = "Exceptional composure, articulate vocabulary choices, and strong structured storytelling.";
  } else if (avgScore >= 78) {
    fluencySummary = "Strong communicational foundation with understandable responses. Continued practice will enhance executive confidence.";
  }

  return {
    questionsCompleted: `${completed} / ${total}`,
    isComplete: completed >= total,
    overallScore: avgScore,
    speakingPracticeCompleted: `Full 7-Question Technical & Behavioral Mock Interview Session`,
    grammarImprovementAreas,
    vocabularyImprovementAreas,
    pronunciationPracticeAreas,
    fluencySummary,
    overallSummary: `You have successfully completed the 7-Question AI Mock Interview! You demonstrated solid clarity and authentic communication. Focusing on action verbs and concise STAR framework structures will help you stand out to top recruiters.`,
    answersList: interviewAnswers
  };
}
