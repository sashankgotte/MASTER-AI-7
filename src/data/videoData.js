/**
 * Educational Video Database for MASTER AI 7
 * Dedicated video libraries for all 7 learning topics with full English & Telugu metadata.
 */

export const TOPIC_VIDEOS = {
  'what-is-ai': [
    {
      id: 'wai-1',
      titleEn: 'What is Artificial Intelligence? (Beginner Friendly)',
      titleTe: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ అంటే ఏమిటి? (పూర్తి వివరణ)',
      duration: '04:15',
      descEn: 'A crystal-clear introduction to Artificial Intelligence, how computers learn from patterns, and what makes AI smart.',
      descTe: 'కంప్యూటర్లు డేటా మరియు నమూనాల నుండి ఎలా నేర్చుకుంటాయో మరియు AI నిత్యజీవితంలో ఎలా పనిచేస్తుందో సులభంగా వివరించబడింది.',
      category: 'Foundations',
      badge: 'Bilingual • English | తెలుగు',
      views: '12.4K',
      gradient: 'from-cyan-600 to-blue-900',
      icon: 'Brain'
    },
    {
      id: 'wai-2',
      titleEn: 'AI in Daily Life: 10 Things You Use Every Day',
      titleTe: 'నిత్యజీవితంలో AI: మనం ప్రతిరోజూ ఉపయోగించే 10 ఉదాహరణలు',
      duration: '05:30',
      descEn: 'From YouTube recommendations and Google Maps to smartphone face unlock and auto-correct keyboards.',
      descTe: 'యూట్యూబ్ రికమండేషన్లు, గూగుల్ మ్యాప్స్ మరియు ఫేస్ అన్‌లాక్ వెనుక ఉన్న AI సాంకేతికత పరిశీలన.',
      category: 'Real-Life AI',
      badge: 'Bilingual • English | తెలుగు',
      views: '9.8K',
      gradient: 'from-blue-600 to-indigo-900',
      icon: 'Smartphone'
    },
    {
      id: 'wai-3',
      titleEn: 'How ChatGPT Works — Beginner Explanation',
      titleTe: 'ChatGPT ఎలా పనిచేస్తుంది? — విద్యార్థులకు సులభమైన వివరణ',
      duration: '06:10',
      descEn: 'Understand Large Language Models (LLMs), token prediction, and how ChatGPT generates human-like text.',
      descTe: 'లార్జ్ లాంగ్వేజ్ మోడల్స్ (LLM) మరియు చాట్‌జిపిటి ప్రశ్నలను అర్థం చేసుకుని ఎలా సమాధానాలు ఇస్తుందో తెలుసుకోండి.',
      category: 'Generative AI',
      badge: 'Bilingual • English | తెలుగు',
      views: '18.2K',
      gradient: 'from-teal-600 to-emerald-900',
      icon: 'Bot'
    },
    {
      id: 'wai-4',
      titleEn: 'AI Around Us: Self-Driving Cars & Healthcare',
      titleTe: 'మన చుట్టూ AI: సెల్ఫ్ డ్రైవింగ్ కార్లు & వైద్య రంగం',
      duration: '04:45',
      descEn: 'Explore how computer vision guides autonomous vehicles and scans medical X-rays with superhuman precision.',
      descTe: 'రోడ్లపై డ్రైవర్ లేని కార్లు మరియు ఆసుపత్రులలో వ్యాధులను గుర్తించడంలో ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ఎలా సహకరిస్తోంది.',
      category: 'Applications',
      badge: 'Bilingual • English | తెలుగు',
      views: '7.5K',
      gradient: 'from-purple-600 to-pink-900',
      icon: 'Zap'
    },
    {
      id: 'wai-5',
      titleEn: 'AI Examples: Games, Chess & AlphaGo',
      titleTe: 'AI ఉదాహరణలు: వీడియో గేమ్స్ మరియు చెస్ ఛాంపియన్స్',
      duration: '03:50',
      descEn: 'How AI algorithms mastered complex human strategy games like Chess, Go, and dynamic NPC gaming behaviors.',
      descTe: 'చదరంగం మరియు ఆధునిక వీడియో గేమ్‌లలో స్మార్ట్ ప్రత్యర్థులను కంప్యూటర్ ఎలా నడిపిస్తుందో చూడండి.',
      category: 'Gaming AI',
      badge: 'Bilingual • English | తెలుగు',
      views: '6.1K',
      gradient: 'from-amber-600 to-red-900',
      icon: 'Gamepad2'
    }
  ],

  'how-ai-works': [
    {
      id: 'hai-1',
      titleEn: 'How AI Works: The Complete 6-Stage Pipeline',
      titleTe: 'AI ఎలా పనిచేస్తుంది: 6 దశల పూర్తి లైఫ్‌సైకిల్',
      duration: '05:40',
      descEn: 'Step-by-step visual animation through Data Collection, Training, Model Weights, Validation, and Prediction.',
      descTe: 'డేటా సేకరించడం నుండి మోడల్ ట్రైనింగ్, టెస్టింగ్ మరియు అవుట్‌పుట్ ప్రిడిక్షన్ వరకు 6 దశల వివరణ.',
      category: 'Pipeline',
      badge: 'Bilingual • English | తెలుగు',
      views: '11.1K',
      gradient: 'from-purple-600 to-indigo-900',
      icon: 'Cpu'
    },
    {
      id: 'hai-2',
      titleEn: 'How Machine Learning Works: Learning from Data',
      titleTe: 'మెషిన్ లెర్నింగ్ ఎలా పనిచేస్తుంది: డేటా నుండి నేర్చుకోవడం',
      duration: '06:15',
      descEn: 'How computers discover patterns in tabular, image, and text data instead of relying on hardcoded if-else logic.',
      descTe: 'సాంప్రదాయ కోడింగ్ కాకుండా, కంప్యూటర్లు డేటా ద్వారా స్వయంగా నియమాలను ఎలా నేర్చుకుంటాయి.',
      category: 'ML Core',
      badge: 'Bilingual • English | తెలుగు',
      views: '14.5K',
      gradient: 'from-indigo-600 to-blue-900',
      icon: 'Layers'
    },
    {
      id: 'hai-3',
      titleEn: 'How AI Learns From Data: Weights & Neurons',
      titleTe: 'AI డేటా నుండి ఎలా నేర్చుకుంటుంది: న్యూరల్ నెట్‌వర్క్స్',
      duration: '04:50',
      descEn: 'Visualizing neural network layers, input features, synaptic weights, and activation functions.',
      descTe: 'ఆర్టిఫిషియల్ న్యూరల్ నెట్‌వర్క్‌లలో నోడ్స్, వెయిట్స్ మరియు లేయర్స్ సమాచారాన్ని ఎలా ప్రాసెస్ చేస్తాయి.',
      category: 'Deep Learning',
      badge: 'Bilingual • English | తెలుగు',
      views: '8.9K',
      gradient: 'from-cyan-600 to-teal-900',
      icon: 'Activity'
    },
    {
      id: 'hai-4',
      titleEn: 'Training and Testing: Overfitting vs Generalization',
      titleTe: 'ట్రైనింగ్ మరియు టెస్టింగ్: ఓవర్‌ఫిట్టింగ్ అంటే ఏమిటి?',
      duration: '05:05',
      descEn: 'Why we split datasets into Train, Validation, and Test sets, and how loss functions guide gradient descent.',
      descTe: 'డేటాను ట్రైన్ మరియు టెస్ట్ సెట్లుగా ఎందుకు విభజిస్తారు మరియు మోడల్ నిజమైన పరీక్షను ఎలా ఎదుర్కొంటుంది.',
      category: 'Optimization',
      badge: 'Bilingual • English | తెలుగు',
      views: '7.2K',
      gradient: 'from-rose-600 to-purple-900',
      icon: 'CheckCircle'
    },
    {
      id: 'hai-5',
      titleEn: 'AI Prediction Example: Image & Speech Recognition',
      titleTe: 'AI ప్రిడిక్షన్ ఉదాహరణ: ఫోటోలు & వాయిస్ గుర్తించడం',
      duration: '04:20',
      descEn: 'Follow an unseen runtime sample through forward inference to output confidence probability scores.',
      descTe: 'ఒక కొత్త ఫోటోను చూసినప్పుడు AI దాని క్లాస్ (ఉదా: పిల్లి లేదా కుక్క) ను ఎలా సెకన్లలో అంచనా వేస్తుంది.',
      category: 'Inference',
      badge: 'Bilingual • English | తెలుగు',
      views: '9.3K',
      gradient: 'from-emerald-600 to-cyan-900',
      icon: 'Zap'
    }
  ],

  'prompt-engineering': [
    {
      id: 'pe-1',
      titleEn: 'What is Prompt Engineering? The Power of Instructions',
      titleTe: 'ప్రాంప్ట్ ఇంజనీరింగ్ అంటే ఏమిటి? AI తో సరైన సంభాషణ',
      duration: '04:35',
      descEn: 'Why Prompt Engineering is the #1 skill for working with LLMs like ChatGPT, Claude, and Gemini.',
      descTe: 'AI మోడల్స్ నుండి అత్యంత నాణ్యమైన ఫలితాలను పొందడానికి సరైన పదాలను ఎలా ఎంచుకోవాలో నేర్చుకోండి.',
      category: 'Masterclass',
      badge: 'Bilingual • English | తెలుగు',
      views: '16.7K',
      gradient: 'from-emerald-600 to-teal-900',
      icon: 'Terminal'
    },
    {
      id: 'pe-2',
      titleEn: 'How to Write a Good Prompt: The 5-Pillar Framework',
      titleTe: 'మంచి ప్రాంప్ట్ ఎలా రాయాలి: 5 కీలక నియమాలు',
      duration: '05:55',
      descEn: 'Mastering Role, Context, Task, Constraints, and Output Format to guarantee pinpoint precision answers.',
      descTe: 'పాత్ర (Role), నేపథ్యం (Context), పని (Task), పరిమితులు (Constraints), మరియు ఫార్మాట్ ఉపయోగించే విధానం.',
      category: 'Framework',
      badge: 'Bilingual • English | తెలుగు',
      views: '19.4K',
      gradient: 'from-teal-600 to-cyan-900',
      icon: 'Layers'
    },
    {
      id: 'pe-3',
      titleEn: 'Bad Prompt vs Good Prompt: Live Side-by-Side Analysis',
      titleTe: 'తప్పు ప్రాంప్ట్ vs సరైన ప్రాంప్ట్: ప్రత్యక్ష ఉదాహరణలు',
      duration: '05:10',
      descEn: 'See real comparisons showing why vague questions get boring essays while structured prompts yield golden outputs.',
      descTe: 'సాధారణ ప్రాంప్ట్‌లకు మరియు ప్రొఫెషనల్ ప్రాంప్ట్‌లకు మధ్య అవుట్‌పుట్ నాణ్యత తేడాలను పరిశీలించండి.',
      category: 'Practical',
      badge: 'Bilingual • English | తెలుగు',
      views: '13.1K',
      gradient: 'from-amber-600 to-orange-900',
      icon: 'Zap'
    },
    {
      id: 'pe-4',
      titleEn: 'Prompt Engineering Techniques: Few-Shot & Chain-of-Thought',
      titleTe: 'అడ్వాన్స్‌డ్ ప్రాంప్ట్ టెక్నిక్స్: చైన్-ఆఫ్-థాట్ రీజనింగ్',
      duration: '06:30',
      descEn: 'Learn Zero-Shot, Few-Shot prompting, and step-by-step reasoning tricks to solve complex reasoning problems.',
      descTe: 'క్లిష్టమైన గణిత మరియు తార్కిక సమస్యలను AI పరిష్కరించేలా చేసే ఆధునిక ప్రాంప్ట్ వ్యూహాలు.',
      category: 'Advanced',
      badge: 'Bilingual • English | తెలుగు',
      views: '8.4K',
      gradient: 'from-purple-600 to-indigo-900',
      icon: 'Brain'
    },
    {
      id: 'pe-5',
      titleEn: 'Advanced Prompts for Students: Coding, Notes & Research',
      titleTe: 'విద్యార్థుల కోసం ఉపయోగకరమైన ప్రాంప్ట్స్: కోడింగ్ & స్టడీ',
      duration: '04:55',
      descEn: 'Ready-to-use prompt blueprints for homework summarization, Python debugging, and exam preparation.',
      descTe: 'పరీక్షల తయారీ, అసైన్‌మెంట్లు, మరియు కోడింగ్ ప్రాక్టీస్ కోసం వెంటనే ఉపయోగించగల ప్రాంప్ట్ టెంప్లేట్‌లు.',
      category: 'Templates',
      badge: 'Bilingual • English | తెలుగు',
      views: '15.2K',
      gradient: 'from-blue-600 to-teal-900',
      icon: 'FileText'
    }
  ],

  'ai-tools': [
    {
      id: 'at-1',
      titleEn: 'What are AI Tools? Overview of the Modern AI Landscape',
      titleTe: 'AI టూల్స్ అంటే ఏమిటి? ఆధునిక AI ప్రపంచం పరిచయం',
      duration: '04:20',
      descEn: 'A high-level survey of modern generative AI tools across text, art, video, coding, and presentations.',
      descTe: 'టెక్స్ట్, బొమ్మలు, వీడియోలు మరియు కోడింగ్ కోసం అందుబాటులో ఉన్న ప్రసిద్ధ AI టూల్స్ అవగాహన.',
      category: 'Overview',
      badge: 'Bilingual • English | తెలుగు',
      views: '10.8K',
      gradient: 'from-amber-600 to-yellow-900',
      icon: 'Grid'
    },
    {
      id: 'at-2',
      titleEn: 'How to Use AI Tools Responsibly and Productively',
      titleTe: 'AI టూల్స్‌ను సమర్థవంతంగా ఎలా ఉపయోగించాలి?',
      duration: '05:15',
      descEn: 'Best practices for verifying facts, avoiding hallucinations, citing sources, and boosting speed.',
      descTe: 'AI ఫలితాలను సరిచూసుకోవడం, తప్పుడు సమాచారాన్ని నివారించడం మరియు ఉత్పాదకతను పెంచుకోవడం.',
      category: 'Best Practices',
      badge: 'Bilingual • English | తెలుగు',
      views: '8.6K',
      gradient: 'from-orange-600 to-amber-900',
      icon: 'CheckCircle'
    },
    {
      id: 'at-3',
      titleEn: 'Top AI Tools for Students: Homework, Flashcards & Research',
      titleTe: 'విద్యార్థుల కోసం ఉత్తమ AI టూల్స్: హోమ్‌వర్క్ & రీసెర్చ్',
      duration: '06:00',
      descEn: 'Deep dive into Perplexity, Gemini, Claude, Quizlet AI, and Photomath for accelerated learning.',
      descTe: 'పాఠాలు త్వరగా అర్థం చేసుకోవడానికి మరియు పరీక్షలకు సిద్ధం కావడానికి విద్యార్థులకు తోడ్పడే టూల్స్.',
      category: 'Study Tools',
      badge: 'Bilingual • English | తెలుగు',
      views: '17.3K',
      gradient: 'from-emerald-600 to-teal-900',
      icon: 'Sparkles'
    },
    {
      id: 'at-4',
      titleEn: 'AI Tools for Coding: GitHub Copilot, Cursor & v0',
      titleTe: 'కోడింగ్ కోసం AI టూల్స్: కాపీలట్, కర్సర్ & v0 ఉపయోగం',
      duration: '06:40',
      descEn: 'How software developers write, debug, and ship production applications 5x faster with AI coding assistants.',
      descTe: 'సాఫ్ట్‌వేర్ ఇంజనీర్లు మరియు కంప్యూటర్ సైన్స్ విద్యార్థులు కోడ్ రాయడానికి AI ని ఎలా వాడుతున్నారు.',
      category: 'Coding',
      badge: 'Bilingual • English | తెలుగు',
      views: '21.5K',
      gradient: 'from-cyan-600 to-blue-900',
      icon: 'Code'
    },
    {
      id: 'at-5',
      titleEn: 'AI Presentation & Design Tools: Gamma & Midjourney',
      titleTe: 'ప్రెజెంటేషన్లు & డిజైనింగ్ AI టూల్స్: గామా & మిడ్‌జర్నీ',
      duration: '05:25',
      descEn: 'Turn simple outlines into stunning slide decks with Gamma, and create photorealistic art with Midjourney.',
      descTe: 'నిమిషాల్లో అందమైన ప్రెజెంటేషన్ స్లయిడ్‌లు మరియు అద్భుతమైన డిజిటల్ గ్రాఫిక్స్ రూపొందించడం.',
      category: 'Design',
      badge: 'Bilingual • English | తెలుగు',
      views: '14.2K',
      gradient: 'from-purple-600 to-pink-900',
      icon: 'Tv'
    }
  ],

  'ai-projects': [
    {
      id: 'ap-1',
      titleEn: 'How to Build an AI Chatbot: Beginner to Pro Tutorial',
      titleTe: 'AI చాట్‌బాట్‌ను ఎలా తయారు చేయాలి? స్టెప్-బై-స్టెప్ ట్యుటోరియల్',
      duration: '07:15',
      descEn: 'From simple rule-based web chatbots to connecting OpenAI and Gemini APIs with conversational memory.',
      descTe: 'సులభమైన జావాస్క్రిప్ట్ బాట్ నుండి అత్యాధునిక AI API ఆధారిత చాట్‌బాట్ నిర్మించే విధానం.',
      category: 'Tutorial',
      badge: 'Bilingual • English | తెలుగు',
      views: '22.8K',
      gradient: 'from-rose-600 to-pink-900',
      icon: 'Rocket'
    },
    {
      id: 'ap-2',
      titleEn: 'Image Recognition Project: Google Teachable Machine',
      titleTe: 'ఇమేజ్ రికగ్నిషన్ ప్రాజెక్ట్: గూగుల్ టీచబుల్ మెషిన్ ప్రాక్టీస్',
      duration: '05:30',
      descEn: 'Train a webcam computer vision model in under 10 minutes without writing a single line of complex code!',
      descTe: 'కోడింగ్ అవసరం లేకుండా వెబ్‌క్యామ్ ద్వారా వస్తువులను గుర్తించే AI మోడల్‌ను గూగుల్ టూల్‌తో ట్రైన్ చేయండి.',
      category: 'No-Code ML',
      badge: 'Bilingual • English | తెలుగు',
      views: '18.1K',
      gradient: 'from-pink-600 to-purple-900',
      icon: 'Sparkles'
    },
    {
      id: 'ap-3',
      titleEn: 'Machine Learning Project: Spam SMS Classifier in Python',
      titleTe: 'మెషిన్ లెర్నింగ్ ప్రాజెక్ట్: స్పామ్ మెసేజ్ డిటెక్టర్ పైథాన్ కోడ్',
      duration: '06:50',
      descEn: 'Complete walkthrough using Scikit-Learn, TF-IDF vectorization, Naive Bayes, and confusion matrix accuracy metrics.',
      descTe: 'పైథాన్ ద్వారా స్పామ్ మెసేజ్‌లను గుర్తించే వర్గీకరణ (Classification) మోడల్ పూర్తి నిర్మాణం.',
      category: 'Scikit-Learn',
      badge: 'Bilingual • English | తెలుగు',
      views: '15.6K',
      gradient: 'from-indigo-600 to-blue-900',
      icon: 'Code'
    },
    {
      id: 'ap-4',
      titleEn: 'Python AI Project: House Price Prediction with Regression',
      titleTe: 'పైథాన్ AI ప్రాజెక్ట్: హౌస్ ప్రైస్ ప్రిడిక్షన్ (రిగ్రెషన్)',
      duration: '06:10',
      descEn: 'Train linear and ensemble regression models to forecast real estate values based on square footage and location.',
      descTe: 'గణాంక వివరాల ఆధారంగా ఇంటి ధరలను అంచనా వేసే మెషిన్ లెర్నింగ్ రిగ్రెషన్ ప్రాజెక్ట్.',
      category: 'Regression',
      badge: 'Bilingual • English | తెలుగు',
      views: '13.9K',
      gradient: 'from-purple-600 to-indigo-900',
      icon: 'TrendingUp'
    },
    {
      id: 'ap-5',
      titleEn: 'Final Year AI Project Ideas & How to Upload to GitHub',
      titleTe: 'ఫైనల్ ఇయర్ AI ప్రాజెక్ట్ ఐడియాస్ & గిట్‌హబ్ అప్‌లోడ్ గైడ్',
      duration: '08:20',
      descEn: 'Top portfolio-worthy Advanced capstone project ideas, README documentation best practices, and Git push guide.',
      descTe: 'ఇంటర్వ్యూలలో మెప్పించే బి.టెక్ మేజర్ ప్రాజెక్ట్ ఆలోచనలు మరియు గిట్‌హబ్‌లో ప్రాజెక్ట్ ఉంచే పద్ధతి.',
      category: 'Career Capstone',
      badge: 'Bilingual • English | తెలుగు',
      views: '25.4K',
      gradient: 'from-cyan-600 to-emerald-900',
      icon: 'GitBranch'
    }
  ],

  'ai-resume': [
    {
      id: 'ar-1',
      titleEn: 'What is a Modern Resume? Structure & Recruiter Psychology',
      titleTe: 'రెజ్యూమే అంటే ఏమిటి? రిక్రూటర్ల ఆలోచనా విధానం & ఫార్మాట్',
      duration: '04:50',
      descEn: 'Learn how recruiters scan resumes in 6 seconds and what makes an engineering profile stand out.',
      descTe: 'కంపెనీల హెచ్‌ఆర్ అధికారులు రెజ్యూమేలో ఏం చూస్తారు మరియు ప్రాథమిక నిర్మాణం ఎలా ఉండాలి.',
      category: 'Career Basics',
      badge: 'Bilingual • English | తెలుగు',
      views: '14.3K',
      gradient: 'from-blue-600 to-indigo-900',
      icon: 'FileText'
    },
    {
      id: 'ar-2',
      titleEn: 'How to Create an ATS-Friendly Resume: Passing The Robots',
      titleTe: 'ATS ఫ్రెండ్లీ రెజ్యూమే ఎలా రూపొందించాలి? కీలక సూచనలు',
      duration: '05:40',
      descEn: 'Understanding Applicant Tracking Systems (ATS), keyword matching, typography rules, and formatting traps to avoid.',
      descTe: 'ఆటోమేటెడ్ సాఫ్ట్‌వేర్ స్క్రీనింగ్ (ATS) లో తిరస్కరణకు గురికాకుండా రెజ్యూమేను ఎలా రూపొందించాలి.',
      category: 'ATS Optimization',
      badge: 'Bilingual • English | తెలుగు',
      views: '19.8K',
      gradient: 'from-cyan-600 to-blue-900',
      icon: 'CheckCircle'
    },
    {
      id: 'ar-3',
      titleEn: 'Top 7 Resume Mistakes Students Make (And How to Fix Them)',
      titleTe: 'విద్యార్థులు చేసే 7 సాధారణ రెజ్యూమే తప్పులు (వాటి పరిష్కారాలు)',
      duration: '05:15',
      descEn: 'Avoid generic objectives, passive verbs, missing GitHub links, and unquantified project claims.',
      descTe: 'రెజ్యూమేలలో విద్యార్థులు ఎక్కువగా చేసే తప్పులు మరియు వాటిని సరిదిద్దే మార్గాలు.',
      category: 'Mistakes Fix',
      badge: 'Bilingual • English | తెలుగు',
      views: '16.2K',
      gradient: 'from-rose-600 to-pink-900',
      icon: 'XCircle'
    },
    {
      id: 'ar-4',
      titleEn: 'Advanced Engineering Resume: Projects, Skills & Formatting',
      titleTe: 'బి.టెక్ ఇంజనీరింగ్ విద్యార్థుల రెజ్యూమే: ప్రాజెక్టులు & నైపుణ్యాలు',
      duration: '06:25',
      descEn: 'How to highlight Python, Machine Learning, cloud deployments, and college academic honors effectively.',
      descTe: 'బి.టెక్ కంప్యూటర్ సైన్స్ విద్యార్థులు తమ ప్రోగ్రామింగ్ నైపుణ్యాలు మరియు ప్రాజెక్టులను ఎలా వివరించాలి.',
      category: 'Advanced Special',
      badge: 'Bilingual • English | తెలుగు',
      views: '23.1K',
      gradient: 'from-purple-600 to-indigo-900',
      icon: 'Award'
    },
    {
      id: 'ar-5',
      titleEn: 'AI & Data Science Fresher Resume: The Google X-Y-Z Formula',
      titleTe: 'ఫ్రెషర్స్ రెజ్యూమే కోసం గూగుల్ X-Y-Z ఫార్ములా',
      duration: '05:35',
      descEn: 'Master the formula: "Accomplished [X] as measured by [Y] by doing [Z]" to write irresistible project bullets.',
      descTe: 'ప్రాజెక్ట్ ఫలితాలను సంఖ్యలలో మరియు కచ్చితమైన వివరాలతో ఎలా రాయాలో తెలిపే టెక్నిక్.',
      category: 'Formulas',
      badge: 'Bilingual • English | తెలుగు',
      views: '17.5K',
      gradient: 'from-emerald-600 to-teal-900',
      icon: 'Sparkles'
    }
  ],

  'spoken-english': [
    {
      id: 'se-1',
      titleEn: 'How to Practice English with an AI Coach: Speak Confidently',
      titleTe: 'AI కోచ్‌తో ఇంగ్లీష్ మాట్లాడటం ఎలా ప్రాక్టీస్ చేయాలి?',
      duration: '04:40',
      descEn: 'How interactive voice practice removes fear of judgment and helps build natural conversational rhythm.',
      descTe: 'భయం లేకుండా సులువుగా ఇంగ్లీష్ మాట్లాడే నైపుణ్యాన్ని AI సహాయంతో ఎలా అలవర్చుకోవాలి.',
      category: 'Fluency',
      badge: 'Bilingual • English | తెలుగు',
      views: '28.9K',
      gradient: 'from-emerald-600 to-teal-900',
      icon: 'Mic'
    },
    {
      id: 'se-2',
      titleEn: 'English Self-Introduction Mastery for Foundations & College',
      titleTe: 'ఇంగ్లీష్‌లో ఆకట్టుకునే సెల్ఫ్ ఇంట్రడక్షన్ ఇచ్చే పద్ధతి',
      duration: '05:20',
      descEn: 'Common mistakes like "Myself...", how to state your goals, hobbies, and educational background smoothly.',
      descTe: 'క్లాస్‌రూమ్ లేదా ఇంటర్వ్యూలలో మీ గురించి ఆత్మవిశ్వాసంతో సరైన వ్యాకరణంతో ఎలా పరిచయం చేసుకోవాలి.',
      category: 'Self Intro',
      badge: 'Bilingual • English | తెలుగు',
      views: '34.2K',
      gradient: 'from-teal-600 to-cyan-900',
      icon: 'User'
    },
    {
      id: 'se-3',
      titleEn: 'Overcoming Telugu to English Translation Hesitation',
      titleTe: 'తెలుగు నుండి ఇంగ్లీష్ అనువాద తడబాటును ఎలా అధిగమించాలి?',
      duration: '06:05',
      descEn: 'Stop translating word-for-word in your head! Learn connective phrases and sentence frameworks for automatic speech.',
      descTe: 'మనసులో తెలుగు నుండి ఇంగ్లీషుకు అనువదించడం ఆపి, నేరుగా ఇంగ్లీషులో ఆలోచించి మాట్లాడే చిట్కాలు.',
      category: 'Telugu Support',
      badge: 'Bilingual • English | తెలుగు',
      views: '42.1K',
      gradient: 'from-amber-600 to-orange-900',
      icon: 'Sparkles'
    },
    {
      id: 'se-4',
      titleEn: 'Group Discussions & College Presentations in English',
      titleTe: 'గ్రూప్ డిస్కషన్స్ మరియు కాలేజ్ ప్రెజెంటేషన్లలో ఇంగ్లీష్ స్పీకింగ్',
      duration: '05:50',
      descEn: 'Key phrases for entering a discussion politely, expressing agreement, polite disagreement, and summarizing ideas.',
      descTe: 'గ్రూప్ డిస్కషన్లలో ఇతరుల అభిప్రాయాలను గౌరవిస్తూ మీ ఆలోచనలను సమర్థవంతంగా వ్యక్తపరచడం.',
      category: 'Group Discussion',
      badge: 'Bilingual • English | తెలుగు',
      views: '19.7K',
      gradient: 'from-purple-600 to-pink-900',
      icon: 'MessageSquare'
    },
    {
      id: 'se-5',
      titleEn: 'Technical & HR Job Interview English for Advanced Engineers',
      titleTe: 'బి.టెక్ విద్యార్థుల టెక్నికల్ & హెచ్‌ఆర్ ఇంటర్వ్యూ ఇంగ్లీష్',
      duration: '07:30',
      descEn: 'Explaining software architecture, handling behavioral questions (STAR technique), and salary discussions with confidence.',
      descTe: 'టెక్నికల్ ప్రాజెక్టులను స్పష్టంగా వివరించడం మరియు హెచ్‌ఆర్ ప్రశ్నలకు ప్రొఫెషనల్‌గా సమాధానాలు చెప్పడం.',
      category: 'Job Interview',
      badge: 'Bilingual • English | తెలుగు',
      views: '31.4K',
      gradient: 'from-cyan-600 to-blue-900',
      icon: 'Briefcase'
    }
  ]
};
