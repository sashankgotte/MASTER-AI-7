const MODULES = {
  basics: {
    title: 'AI Basics',
    keywords: ['what is ai', 'artificial intelligence', 'machine learning', 'deep learning', 'neural network', 'chatgpt work', 'computer vision', 'natural language', 'topic 1']
  },
  works: {
    title: 'How AI Works',
    keywords: ['how ai', 'how does ai', 'how do ai', 'training data', 'train', 'model learn', 'algorithm', 'prediction', 'neural network', 'topic 2']
  },
  prompts: {
    title: 'Prompt Engineering',
    keywords: ['prompt', 'prompt engineering', 'good prompt', 'prompt formula', 'prompting', 'topic 3']
  },
  tools: {
    title: 'AI Tools & Applications',
    keywords: ['ai tool', 'tools for students', 'application', 'chatgpt', 'gemini', 'perplexity', 'coding tool', 'study tool', 'image tool', 'topic 4']
  },
  projects: {
    title: 'AI Projects',
    keywords: ['ai project', 'project with ai', 'create an ai', 'build an ai', 'machine learning project', 'project idea', 'topic 5']
  },
  resume: {
    title: 'AI Resume',
    keywords: ['resume', 'cv', 'curriculum vitae', 'job application', 'career', 'what should i include', 'topic 6']
  },
  english: {
    title: 'Spoken English Skills',
    keywords: ['spoken english', 'speak english', 'improve my english', 'english speaking', 'fluency', 'conversation', 'grammar', 'topic 7']
  }
};

const hasAny = (text, words) => words.some((word) => text.includes(word));

export function detectGuideModules(question) {
  const text = (question || '').toLowerCase().trim();
  const matches = Object.entries(MODULES).filter(([, module]) => hasAny(text, module.keywords)).map(([key]) => key);
  if (matches.length) return matches;
  return ['basics'];
}

const guide = (title, definition, sections, inShort) => ({ title, definition, sections, inShort });
const list = (title, items) => ({ type: 'list', title, items });
const steps = (title, items) => ({ type: 'steps', title, items });
const table = (title, headers, rows) => ({ type: 'table', title, headers, rows });

function answerFor(module, question) {
  switch (module) {
    case 'works':
      return guide('⚙️ How AI Works', 'AI learns patterns from examples. It uses those patterns to make a prediction or create an answer when it receives new information.', [
        steps('How does AI learn?', ['Collect useful examples, such as text, images, or numbers.', 'Train a model to find patterns in those examples.', 'Test the model with information it has not seen before.', 'Use the model to make a prediction, then improve it with feedback.']),
        list('A simple example', ['You show an AI many pictures labeled “cat” and “dog.”', 'The AI notices patterns such as shapes, colors, and features.', 'When it sees a new picture, it predicts which label fits best.'])
      ], 'AI works by learning patterns from data and using them to make useful predictions.');
    case 'prompts':
      return guide('✍️ What Is Prompt Engineering?', 'Prompt engineering means writing clear instructions for an AI so it understands your goal, context, limits, and preferred answer format.', [
        steps('How to write a good prompt', ['Give the AI a useful role, such as “You are a patient science tutor.”', 'Add context and explain who the answer is for.', 'State the exact task and include important constraints.', 'Request an output format, such as steps, bullets, or a table.']),
        list('Simple Example', ['Weak: “Explain photosynthesis.”', 'Better: “Explain photosynthesis to a Grade 8 student in five simple bullet points with one example.”'])
      ], 'Prompt engineering is the skill of giving AI clear, complete, and useful instructions.');
    case 'tools':
      return guide('🧰 AI Tools & Applications', 'AI tools are applications that use artificial intelligence to help people create, learn, analyze information, communicate, or automate work.', [
        table('Common uses', ['Task', 'Useful tool type', 'What it helps with'], [['Learning', 'AI tutor', 'Explaining lessons and practice'], ['Research', 'Answer engine', 'Finding and summarizing information'], ['Creation', 'Text or image generator', 'Making drafts and visuals'], ['Coding', 'Coding assistant', 'Writing and debugging code']]),
        list('What can AI tools do?', ['Explain difficult topics in simple language', 'Summarize notes and documents', 'Create ideas, presentations, images, or code', 'Help compare options and plan projects'])
      ], 'AI tools are applications that use AI to make learning, creating, and problem-solving easier.');
    case 'projects':
      return guide('🛠️ What Is an AI Project?', 'An AI project applies data, an AI model, and a clear goal to solve a real problem or demonstrate a useful idea.', [
        steps('How to create an AI project', ['Choose a small problem that matters to a real user.', 'Collect or select safe, relevant data.', 'Build or use a suitable model or AI tool.', 'Test the result with clear success measures.', 'Explain the result, limitations, and possible improvements.']),
        list('Good beginner project ideas', ['A study-question generator', 'An image classifier for common objects', 'A simple sentiment checker', 'A resume feedback assistant'])
      ], 'An AI project uses data and intelligent tools to solve a specific problem.');
    case 'resume':
      return guide('📄 What Is a Resume?', 'A resume is a short professional document that shows your education, skills, projects, experience, and contact details to a potential employer.', [
        list('What should a student include?', ['Full name and professional headline', 'Email, phone, location, and LinkedIn', 'Education and relevant coursework', 'Projects with your contribution and results', 'Technical skills, soft skills, certifications, and goals']),
        list('Helpful resume habits', ['Use clear section headings and short bullet points.', 'Start project bullets with strong action words.', 'Mention tools used and measurable outcomes when possible.', 'Keep the design simple, readable, and honest.'])
      ], 'A resume is a clear summary of your qualifications for a job or opportunity.');
    case 'english':
      return guide('🗣️ What Is Spoken English?', 'Spoken English is the ability to communicate ideas, questions, and feelings clearly in English conversations, classrooms, interviews, and daily life.', [
        steps('How to improve speaking', ['Listen to short English conversations every day.', 'Speak aloud for a few minutes about a familiar topic.', 'Learn useful phrases instead of isolated words.', 'Record yourself and notice one improvement for next time.', 'Practice conversations and ask for friendly feedback.']),
        list('Practice topics', ['Introduce yourself', 'Describe a project', 'Explain your favorite subject', 'Answer a job interview question'])
      ], 'Spoken English is the practical skill of communicating clearly and confidently in English.');
    case 'basics':
    default:
      return guide('🤖 What Is AI?', 'Artificial Intelligence is technology that enables computers and machines to learn, understand information, solve problems, and make decisions in ways that are similar to human intelligence.', [
        list('💡 Simple Example', ['When you ask ChatGPT a question and it generates an answer, AI is being used.']),
        list('🌟 What can AI do?', ['Understand and generate language', 'Recognize images and objects', 'Recommend music or videos', 'Help vehicles navigate', 'Analyze large amounts of data', 'Generate text, images, and code', 'Help students learn'])
      ], 'AI is technology that enables machines to perform tasks that normally require human intelligence.');
  }
}

export function createLearningGuide(question) {
  const modules = detectGuideModules(question);
  const primary = answerFor(modules[0], question);
  if (modules.length < 2) return { ...primary, modules };
  const related = modules.slice(1, 3).map((module) => answerFor(module, question));
  return {
    ...primary,
    title: `${primary.title} + ${related.map((item) => item.title.replace(/^\S+\s/, '')).join(' + ')}`,
    sections: [...primary.sections, ...related.flatMap((item) => item.sections.slice(0, 1))],
    inShort: `${primary.inShort} This also connects with ${related.map((item) => item.title.replace(/^\S+\s/, '').toLowerCase()).join(' and ')}.`
  };
}

export function guideToSpeech(response) {
  return `${response.title}. ${response.definition} In short: ${response.inShort}`;
}
