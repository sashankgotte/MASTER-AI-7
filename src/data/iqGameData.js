/**
 * Comprehensive IQ & Brain Challenge Game Data for MASTER AI 7
 * Tailored for all 7 topics across Foundations, Applied, and Advanced in English and Telugu!
 */

export const TOPIC_IQ_GAMES = {
  'what-is-ai': {
    titleEn: 'AI Detective: Identify AI vs Non-AI & Everyday Scenarios',
    titleTe: 'AI డిటెక్టివ్: AI మరియు సాధారణ పరికరాల మధ్య వ్యత్యాసాన్ని గుర్తించండి',
    descEn: 'Test your brain by distinguishing real Artificial Intelligence from standard automated machines!',
    descTe: 'ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ ఎలా ఆలోచిస్తుందో మీ మేధస్సుకు పరీక్ష పెట్టండి!',
    questions: {
      foundations: [
        {
          id: 'wai-s-1',
          questionEn: 'Which of the following uses real Artificial Intelligence?',
          questionTe: 'ఈ క్రింది వాటిలో నిజమైన ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ (AI) ఉపయోగించేది ఏది?',
          optionsEn: [
            'A mechanical wall clock that ticks every second',
            'A TV remote control with plastic buttons',
            'Google Assistant answering your spoken voice question',
            'A battery-powered flashlight'
          ],
          optionsTe: [
            'ప్రతి సెకనుకు టిక్ చేసే గోడ గడియారం',
            'ప్లాస్టిక్ బటన్లు కలిగిన టీవీ రిమోట్',
            'మీ వాయిస్ విని సమాధానం ఇచ్చే గూగుల్ అసిస్టెంట్',
            'బ్యాటరీతో వెలిగే సాధారణ టార్చ్ లైట్'
          ],
          correct: 2,
          explanationEn: 'Google Assistant uses Speech Recognition and Natural Language Processing AI to understand human voice!',
          explanationTe: 'గూగుల్ అసిస్టెంట్ మీ మాటలను గ్రహించడానికి నేచురల్ లాంగ్వేజ్ ప్రాసెసింగ్ (NLP) AI ని ఉపయోగిస్తుంది!'
        },
        {
          id: 'wai-s-2',
          questionEn: 'How does an AI learn to recognize pictures of dogs and cats?',
          questionTe: 'పిల్లులు మరియు కుక్కల ఫోటోలను AI ఎలా గుర్తించగలుగుతుంది?',
          optionsEn: [
            'By looking at thousands of labeled sample photos and finding patterns',
            'By eating healthy pet food',
            'Through magic spells inside the computer',
            'By sleeping for 8 hours every night'
          ],
          optionsTe: [
            'వేలాది ఫోటోల నమూనాలను పరిశీలించి లక్షణాలను గ్రహించడం ద్వారా',
            'కంప్యూటర్‌కి ఆహారం తినిపించడం ద్వారా',
            'కంప్యూటర్ లోపల మ్యాజిక్ ఉండటం వల్ల',
            'రోజూ 8 గంటలు నిద్రపోవడం వల్ల'
          ],
          correct: 0,
          explanationEn: 'AI learns through machine learning algorithms trained on massive image datasets!',
          explanationTe: 'AI వేలాది ఫోటోలలోని ఆకారాలు, రంగులు మరియు నమూనాలను విశ్లేషించి గుర్తించడం నేర్చుకుంటుంది!'
        },
        {
          id: 'wai-s-3',
          questionEn: 'When YouTube recommends your favorite cartoon, what is working in the background?',
          questionTe: 'యూట్యూబ్ మీకు నచ్చిన కార్టూన్లను సూచించినప్పుడు వెనుక ఏమి పనిచేస్తోంది?',
          optionsEn: [
            'A random lottery spinner',
            'An AI Recommendation Algorithm based on your watching habits',
            'A postal delivery letter',
            'A human standing inside the TV'
          ],
          optionsTe: [
            'యాదృచ్ఛిక లాటరీ చక్రం',
            'మీరు చూసిన వీడియోల ఆధారంగా పనిచేసే AI రికమండేషన్ అల్గారిథమ్',
            'ఒక పోస్టల్ లెటర్',
            'టీవీ లోపల కూర్చున్న మనిషి'
          ],
          correct: 1,
          explanationEn: 'Recommendation algorithms analyze your historical preferences to predict what you will enjoy next.',
          explanationTe: 'మీరు గతంలో చూసిన వీడియోల ఆధారంగా మీకు ఏమి నచ్చుతుందో AI రికమండేషన్ సిస్టమ్ అంచనా వేస్తుంది.'
        }
      ],
      applied: [
        {
          id: 'wai-i-1',
          questionEn: 'What is the structural hierarchy between AI, Machine Learning (ML), and Deep Learning (DL)?',
          questionTe: 'AI, మెషిన్ లెర్నింగ్ (ML), మరియు డీప్ లెర్నింగ్ (DL) మధ్య ఉన్న సరైన సంబంధం ఏమిటి?',
          optionsEn: [
            'They are three completely distinct and unrelated fields',
            'Deep Learning ⊂ Machine Learning ⊂ Artificial Intelligence',
            'Artificial Intelligence ⊂ Machine Learning ⊂ Deep Learning',
            'Machine Learning is only used in hardware robotics'
          ],
          optionsTe: [
            'ఇవి మూడూ ఒకదానితో ఒకటి సంబంధం లేని వేర్వేరు రంగాలు',
            'డీప్ లెర్నింగ్ అనేది మెషిన్ లెర్నింగ్‌లో భాగం, మరియు ML అనేది AI లో భాగం',
            'AI అనేది ML లో భాగం, మరియు ML అనేది DL లో భాగం',
            'మెషిన్ లెర్నింగ్ కేవలం రోబోటిక్స్ లో మాత్రమే పనిచేస్తుంది'
          ],
          correct: 1,
          explanationEn: 'Deep Learning is a specialized subfield of Machine Learning, which itself is a branch of Artificial Intelligence.',
          explanationTe: 'డీప్ లెర్నింగ్ అనేది మెషిన్ లెర్నింగ్ యొక్క ఉపవిభాగం, మరియు ML అనేది ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ లో భాగం.'
        },
        {
          id: 'wai-i-2',
          questionEn: 'Which AI technique powers face unlocking on modern smartphones?',
          questionTe: 'స్మార్ట్‌ఫోన్‌లలో ఫేస్ అన్‌లాక్ వెనుక పనిచేసే ప్రధాన AI సాంకేతికత ఏది?',
          optionsEn: [
            'Acoustic Waveform Analysis',
            'Convolutional Neural Networks (Computer Vision)',
            'Relational Database Indexing',
            'Bluetooth Signal Pings'
          ],
          optionsTe: [
            'ధ్వని తరంగాల విశ్లేషణ',
            'కంప్యూటర్ విజన్ & కాన్వాల్యూషనల్ న్యూరల్ నెట్‌వర్క్స్ (CNN)',
            'డేటాబేస్ ఇండెక్సింగ్',
            'బ్లూటూత్ సిగ్నల్ పల్స్'
          ],
          correct: 1,
          explanationEn: 'Computer vision algorithms extract facial landmark vectors to verify user identity securely.',
          explanationTe: 'కంప్యూటర్ విజన్ మరియు CNN ముఖం యొక్క ప్రత్యేక ఫీచర్లను విశ్లేషించి ఫోన్‌ను సురక్షితంగా అన్‌లాక్ చేస్తాయి.'
        }
      ],
      advanced: [
        {
          id: 'wai-b-1',
          questionEn: 'What mathematical concept prevents the vanishing gradient problem in Deep Neural Networks?',
          questionTe: 'డీప్ న్యూరల్ నెట్‌వర్క్‌లలో వానిషింగ్ గ్రేడియంట్ సమస్యను నివారించేది ఏది?',
          optionsEn: [
            'Using Sigmoid activation in all 100 hidden layers',
            'Residual Connections (ResNet skip connections) and ReLU/GELU activations',
            'Setting learning rate to exactly 1.0',
            'Removing all biases from the linear layers'
          ],
          optionsTe: [
            'అన్ని లేయర్లలో సిగ్మోయిడ్ యాక్టివేషన్‌ను మాత్రమే వాడటం',
            'రెస్-నెట్ స్కిప్ కనెక్షన్స్ (Residual Connections) మరియు ReLU/GELU యాక్టివేషన్స్',
            'లెర్నింగ్ రేట్‌ను ఎల్లప్పుడూ 1.0 గా ఉంచడం',
            'లీనియర్ లేయర్ల నుండి బయాస్‌లను పూర్తిగా తొలగించడం'
          ],
          correct: 1,
          explanationEn: 'Skip connections allow identity gradients to propagate backward without attenuating exponentially.',
          explanationTe: 'స్కిప్ కనెక్షన్స్ గ్రేడియంట్లు లేయర్ల గుండా క్షీణించకుండా వెనక్కి ప్రసరించడానికి సహాయపడతాయి.'
        },
        {
          id: 'wai-b-2',
          questionEn: 'What is the core equation for Scaled Dot-Product Attention in Transformer architectures?',
          questionTe: 'ట్రాన్స్‌ఫార్మర్ ఆర్కిటెక్చర్‌లో స్కేల్డ్ డాట్-ప్రాడక్ట్ అటెన్షన్ యొక్క ప్రధాన సూత్రం ఏమిటి?',
          optionsEn: [
            'Attention(Q,K,V) = Softmax(QKᵀ / √d_k) * V',
            'Attention(Q,K,V) = Q * Kᵀ + V',
            'Attention(Q,K,V) = Sigmoid(W_q * Q + W_k * K)',
            'Attention(Q,K,V) = ReLU(Q * V) / K'
          ],
          optionsTe: [
            'Attention(Q,K,V) = Softmax(QKᵀ / √d_k) * V',
            'Attention(Q,K,V) = Q * Kᵀ + V',
            'Attention(Q,K,V) = Sigmoid(W_q * Q + W_k * K)',
            'Attention(Q,K,V) = ReLU(Q * V) / K'
          ],
          correct: 0,
          explanationEn: 'Scaled Dot-Product Attention scales the matrix product of Query and Key by √d_k before applying softmax.',
          explanationTe: 'స్కేల్డ్ డాట్-ప్రాడక్ట్ అటెన్షన్ లో Q మరియు K గుణకారాన్ని √d_k తో భాగించి సాఫ్ట్‌మ్యాక్స్ వర్తింపజేస్తారు.'
        }
      ]
    }
  },

  'how-ai-works': {
    titleEn: 'Pipeline Master: Order the 6-Stage AI Workflow',
    titleTe: 'పైప్‌లైన్ మాస్టర్: 6 దశల AI ప్రక్రియను క్రమంలో అమర్చండి',
    descEn: 'Can you arrange the stages from raw data ingestion to live runtime output?',
    descTe: 'డేటా సేకరించడం నుండి చివరి ప్రిడిక్షన్ వరకు సరైన క్రమాన్ని గుర్తించండి!',
    questions: {
      foundations: [
        {
          id: 'hai-s-1',
          questionEn: 'What is the very first step before an AI can learn anything?',
          questionTe: 'AI ఏదైనా నేర్చుకోవడానికి ముందు చేయవలసిన మొదటి పని ఏమిటి?',
          optionsEn: [
            'Collecting and cleaning lots of data (like pictures or numbers)',
            'Selling the computer in a market',
            'Writing poetry with a pen',
            'Turning off the electrical power'
          ],
          optionsTe: [
            'చాలా డేటా లేదా ఉదాహరణలను సేకరించడం (ఫోటోలు లేదా నంబర్లు)',
            'కంప్యూటర్‌ను మార్కెట్‌లో అమ్మేయడం',
            'పెన్నుతో కవితలు రాయడం',
            'కరెంట్ స్విచ్ ఆఫ్ చేయడం'
          ],
          correct: 0,
          explanationEn: 'Without training data, an AI has nothing to learn from!',
          explanationTe: 'డేటా లేకుండా ఏ ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ కూడా నేర్చుకోలేదు!'
        },
        {
          id: 'hai-s-2',
          questionEn: 'What do we call the "practice session" where an AI learns from its mistakes?',
          questionTe: 'AI తన తప్పులను సరిదిద్దుకుంటూ నేర్చుకునే దశను ఏమంటారు?',
          optionsEn: ['Sleeping', 'Training', 'Formatting Hard Disk', 'Drawing'],
          optionsTe: ['నిద్రపోవడం', 'ట్రైనింగ్ (Training)', 'హార్డ్ డిస్క్ ఫార్మాట్', 'చిత్రలేఖనం'],
          correct: 1,
          explanationEn: 'During Training, the model adjusts its internal parameters to minimize errors.',
          explanationTe: 'ట్రైనింగ్ సమయంలో కంప్యూటర్ తన తప్పుల నుండి నేర్చుకుని కచ్చితత్వాన్ని పెంచుకుంటుంది.'
        }
      ],
      applied: [
        {
          id: 'hai-i-1',
          questionEn: 'What is the correct logical order of an end-to-end Machine Learning pipeline?',
          questionTe: 'మెషిన్ లెర్నింగ్ ప్రక్రియ యొక్క సరైన క్రమం ఏది?',
          optionsEn: [
            'Prediction → Testing → Data Collection → Model Training',
            'Data Collection → Model Training → Model Evaluation → Deployment/Prediction',
            'Model Training → Data Collection → Output → Prediction',
            'Testing → Prediction → Data Cleaning → Model Training'
          ],
          optionsTe: [
            'ప్రిడిక్షన్ → టెస్టింగ్ → డేటా కలెక్షన్ → మోడల్ ట్రైనింగ్',
            'డేటా కలెక్షన్ → మోడల్ ట్రైనింగ్ → మోడల్ ఎవాల్యుయేషన్ → ప్రిడిక్షన్',
            'మోడల్ ట్రైనింగ్ → డేటా కలెక్షన్ → అవుట్‌పుట్ → ప్రిడిక్షన్',
            'టెస్టింగ్ → ప్రిడిక్షన్ → డేటా క్లీనింగ్ → మోడల్ ట్రైనింగ్'
          ],
          correct: 1,
          explanationEn: 'The pipeline flows logically: Ingest Data → Train on features → Evaluate on test set → Serve predictions.',
          explanationTe: 'ముందుగా డేటా సేకరిస్తాము → మోడల్‌ను ట్రైన్ చేస్తాము → టెస్టింగ్ ద్వారా పరీక్షిస్తాము → ప్రిడిక్షన్స్ పొందుతాము.'
        }
      ],
      advanced: [
        {
          id: 'hai-b-1',
          questionEn: 'In Backpropagation, which calculus rule allows computing gradients through composite computational layers?',
          questionTe: 'బ్యాక్‌ప్రాపగేషన్‌లో కాంపోజిట్ లేయర్ల గుండా గ్రేడియంట్స్ లెక్కించడానికి ఏ గణిత సూత్రం ఉపయోగపడుతుంది?',
          optionsEn: [
            "Chain Rule of Calculus: ∂L/∂w = (∂L/∂y) * (∂y/∂w)",
            "L'Hôpital's Rule for limits",
            "Pythagorean Theorem",
            "Simpson's 1/3 Integration Rule"
          ],
          optionsTe: [
            "చైన్ రూల్ (Chain Rule): ∂L/∂w = (∂L/∂y) * (∂y/∂w)",
            "లిమిట్స్ కొరకు ఎల్-హాపిటల్ రూల్",
            "పైథాగరస్ సిద్ధాంతం",
            "సింప్సన్స్ 1/3 ఇంటిగ్రేషన్ నియమం"
          ],
          correct: 0,
          explanationEn: 'Automatic differentiation leverages the Chain Rule to backpropagate loss derivatives layer-by-layer.',
          explanationTe: 'గణితంలోని చైన్ రూల్ ద్వారా ప్రతి లేయర్ లోని వెయిట్స్‌కు గ్రేడియంట్లను సులభంగా లెక్కిస్తారు.'
        }
      ]
    }
  },

  'prompt-engineering': {
    titleEn: 'Prompt Genius: Spot The Pillars & Fix Bad Prompts',
    titleTe: 'ప్రాంప్ట్ జీనియస్: సరైన ప్రాంప్ట్ రాయడంలో నైపుణ్యం సాధించండి',
    descEn: 'Evaluate whether a prompt has the 5 core pillars: Role, Context, Task, Constraints, and Format!',
    descTe: 'ప్రాంప్ట్ ఇంజనీరింగ్ లోని 5 సూత్రాల ఆధారంగా ఉత్తమమైన ప్రశ్నను ఎంచుకోండి!',
    questions: {
      foundations: [
        {
          id: 'pe-s-1',
          questionEn: 'Which of these prompts will get the BEST answer from an AI?',
          questionTe: 'ఈ క్రింది వాటిలో AI నుండి అత్యుత్తమ సమాధానం పొందగలిగే ప్రాంప్ట్ ఏది?',
          optionsEn: [
            '"Tell me about science."',
            '"You are a friendly 6th-grade science teacher. Explain photosynthesis using simple English and 3 bullet points."',
            '"What?"',
            '"Give me a big long answer with lots of confusing words."'
          ],
          optionsTe: [
            '"సైన్స్ గురించి చెప్పు."',
            '"మీరు ఒక సైన్స్ టీచర్. 6వ తరగతి విద్యార్థికి అర్థమయ్యేలా కిరణజన్య సంయోగక్రియను 3 సులభమైన బుల్లెట్ పాయింట్లలో వివరించండి."',
            '"ఏంటి?"',
            '"ఏమీ అర్థం కాని కష్టమైన పదాలతో పెద్ద సమాధానం రాయి."'
          ],
          optionsTe_fallback: 1,
          correct: 1,
          explanationEn: 'The second prompt defines a Persona (Teacher), audience (6th grade), topic, and exact format constraint (3 bullet points)!',
          explanationTe: 'ఈ ప్రాంప్ట్‌లో పాత్ర (Teacher), లక్ష్యం (6వ తరగతి), మరియు ఫార్మాట్ (3 పాయింట్లు) స్పష్టంగా ఉన్నాయి!'
        }
      ],
      applied: [
        {
          id: 'pe-i-1',
          questionEn: 'What is missing from this prompt: "Write a python function to sort a list of numbers."?',
          questionTe: '"సంఖ్యల జాబితాను సార్ట్ చేయడానికి ఒక పైథాన్ ఫంక్షన్ రాయండి" అనే ప్రాంప్ట్‌లో ఏమి లోపించింది?',
          optionsEn: [
            'Nothing, it is perfect',
            'Time complexity constraints, sorting algorithm preference, type hints, and edge case tests',
            'The computer programming language',
            'The word "please"'
          ],
          optionsTe: [
            'ఏమీ లోపించలేదు, ఇది సంపూర్ణంగా ఉంది',
            'అల్గారిథమ్ ఎంపిక, టైమ్ కాంప్లెక్సిటీ పరిమితులు, మరియు ఎడ్జ్ కేస్ టెస్టింగ్ వివరాలు',
            'కంప్యూటర్ లాంగ్వేజ్ పేరు',
            '"దయచేసి" అనే పదం'
          ],
          correct: 1,
          explanationEn: 'Specifying algorithm type (e.g. QuickSort vs MergeSort), docstrings, and edge cases makes code generation production-ready.',
          explanationTe: 'ఏ అల్గారిథమ్ వాడాలి, టైమ్ కాంప్లెక్సిటీ ఎంత ఉండాలి అనే పరిమితులు నిర్దేశిస్తే మరింత మెరుగైన కోడ్ లభిస్తుంది.'
        }
      ],
      advanced: [
        {
          id: 'pe-b-1',
          questionEn: 'What prompt technique forces an LLM to generate applied reasoning tokens before giving a final answer?',
          questionTe: 'చివరి సమాధానం ఇవ్వడానికి ముందు మధ్యంతర తార్కిక దశలను రాయడానికి LLM ని ప్రేరేపించే టెక్నిక్ ఏది?',
          optionsEn: [
            'Zero-Shot Direct Query',
            'Chain-of-Thought (CoT) Prompting ("Think step-by-step")',
            'Random Token Masking',
            'Lowering model temperature to -1.0'
          ],
          optionsTe: [
            'జీరో-షాట్ డైరెక్ట్ ప్రశ్న',
            'చైన్-ఆఫ్-థాట్ (CoT) ప్రాంప్టింగ్ ("స్టెప్-బై-స్టెప్ ఆలోచించు")',
            'రాండమ్ టోకెన్ మాస్కింగ్',
            'మోడల్ టెంపరేచర్‌ను మైనస్‌కు తగ్గించడం'
          ],
          correct: 1,
          explanationEn: 'Chain-of-Thought prompts elicit structured multi-step reasoning which drastically reduces symbolic math errors.',
          explanationTe: 'చైన్-ఆఫ్-థాట్ (CoT) ప్రాంప్టింగ్ మోడల్‌ను ప్రతి దశను వివరించమని అడగడం ద్వారా కచ్చితమైన తార్కిక ఫలితాలను అందిస్తుంది.'
        }
      ]
    }
  },

  'ai-tools': {
    titleEn: 'Tool Matcher: Select The Right AI For The Job',
    titleTe: 'టూల్ మ్యాచర్: ప్రతి పనికి తగిన సరైన AI టూల్‌ను ఎంచుకోండి',
    descEn: 'Match real-world productivity goals to the premier AI application designed for it!',
    descTe: 'మీ లక్ష్యానికి సరిగ్గా సరిపోయే ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ టూల్‌ను గుర్తించండి!',
    questions: {
      foundations: [
        {
          id: 'at-s-1',
          questionEn: 'I need to make an interactive presentation for my foundations science fair. Which AI tool is ideal?',
          questionTe: 'స్కూల్ సైన్స్ ఎగ్జిబిషన్ కోసం అందమైన స్లైడ్స్ ప్రెజెంటేషన్ తయారు చేయడానికి ఏ AI టూల్ ఉపయోగించాలి?',
          optionsEn: ['Gamma App', 'A plain text notepad', 'A calculator', 'A photo scanner'],
          optionsTe: ['గామా యాప్ (Gamma App)', 'సాధారణ నోట్‌ప్యాడ్', 'కాలిక్యులేటర్', 'ఫోటో స్కానర్'],
          correct: 0,
          explanationEn: 'Gamma App generates interactive, visual presentation decks from a text outline in seconds!',
          explanationTe: 'గామా యాప్ మీ టాపిక్ ఆధారంగా నిమిషాల్లో ప్రొఫెషనల్ స్లైడ్స్ తయారు చేస్తుంది!'
        }
      ],
      applied: [
        {
          id: 'at-i-1',
          questionEn: 'Which AI engine provides live, cited web references alongside answers for academic research papers?',
          questionTe: 'రీసెర్చ్ పేపర్ల సమాచారం మరియు ఖచ్చితమైన వెబ్ ఆధారాలను (Citations) అందించే AI సెర్చ్ ఇంజన్ ఏది?',
          optionsEn: ['Photomath', 'Perplexity AI', 'Midjourney', 'CapCut AI'],
          optionsTe: ['ఫోటోమాథ్', 'పర్ప్లెక్సిటీ AI (Perplexity AI)', 'మిడ్‌జర్నీ', 'క్యాప్‌కట్ AI'],
          correct: 1,
          explanationEn: 'Perplexity AI combines search indexing with generative summaries and direct academic citations.',
          explanationTe: 'పర్ప్లెక్సిటీ AI వెబ్‌సైట్ల లింకులు మరియు ప్రామాణిక ఆధారాలతో సహా తాజా సమాచారాన్ని అందిస్తుంది.'
        }
      ],
      advanced: [
        {
          id: 'at-b-1',
          questionEn: 'For full-repo awareness, semantic codebase indexing, and multi-file refactoring, which AI tool leads developer workflows?',
          questionTe: 'మొత్తం కోడ్‌బేస్ అర్థం చేసుకుని, మల్టీ-ఫైల్ రీఫ్యాక్టరింగ్ చేయడంలో డెవలపర్లకు తోడ్పడే అడ్వాన్స్‌డ్ AI ఎడిటర్ ఏది?',
          optionsEn: ['Cursor AI Editor', 'MS Paint', 'Photoshop', 'Notion Web Clipper'],
          optionsTe: ['కర్సర్ AI ఎడిటర్ (Cursor AI)', 'ఎంఎస్ పెయింట్', 'ఫోటోషాప్', 'నోషన్ వెబ్ క్లిప్పర్'],
          correct: 0,
          explanationEn: 'Cursor uses codebase embeddings and Claude 3.5 Sonnet to edit multiple files across complex repositories.',
          explanationTe: 'కర్సర్ మొత్తం సాఫ్ట్‌వేర్ ప్రాజెక్ట్‌ను స్కాన్ చేసి, అనేక ఫైల్స్‌లో కోడ్‌ను స్వయంగా సవరించగలదు.'
        }
      ]
    }
  },

  'ai-projects': {
    titleEn: 'Bug Hunter: Engineering Logic & Architecture Challenge',
    titleTe: 'బగ్ హంటర్: ఇంజనీరింగ్ లాజిక్ & ఆర్కిటెక్చర్ పరీక్ష',
    descEn: 'Identify code issues and select proper framework stacks for real-world AI projects!',
    descTe: 'సాఫ్ట్‌వేర్ ప్రాజెక్టులలో సరైన టెక్నాలజీ ఎంపిక మరియు కోడ్ లోపాలను కనిపెట్టండి!',
    questions: {
      foundations: [
        {
          id: 'ap-s-1',
          questionEn: 'If your image recognition model mistakes an apple for a tomato, what should you do?',
          questionTe: 'మీ AI మోడల్ యాపిల్ పండును చూసి టమోటా అని తప్పుగా భావిస్తే మీరు ఏమి చేయాలి?',
          optionsEn: [
            'Add more varied training pictures of apples and tomatoes with distinct lighting',
            'Throw the webcam in water',
            'Delete all computer files',
            'Change the screen brightness'
          ],
          optionsTe: [
            'యాపిల్ మరియు టమోటాల యొక్క మరిన్ని విభిన్న ఫోటోలను తీసి మోడల్‌కు ట్రైనింగ్ ఇవ్వాలి',
            'వెబ్‌క్యామ్‌ను నీటిలో పడేయాలి',
            'కంప్యూటర్‌లోని ఫైల్స్ అన్నీ డిలీట్ చేయాలి',
            'స్క్రీన్ బ్రైట్‌నెస్ పెంచాలి'
          ],
          correct: 0,
          explanationEn: 'Providing more balanced, diverse training examples helps the AI distinguish subtle features!',
          explanationTe: 'మరిన్ని నాణ్యమైన ఫోటోలతో ట్రైన్ చేసినప్పుడు AI రంగులు మరియు ఆకారాల తేడాలను సరిగ్గా గుర్తిస్తుంది!'
        }
      ],
      applied: [
        {
          id: 'ap-i-1',
          questionEn: 'When building a Spam SMS Classifier in Python, which technique converts raw words into numerical feature vectors?',
          questionTe: 'పైథాన్‌లో స్పామ్ క్లాసిఫైయర్ నిర్మించేటప్పుడు టెక్స్ట్‌ను సంఖ్యలుగా మార్చే టెక్నిక్ ఏది?',
          optionsEn: [
            'TF-IDF (Term Frequency - Inverse Document Frequency)',
            'Image Bilinear Interpolation',
            'Audio FFT Spectrogram',
            'Hexadecimal Color Inversion'
          ],
          optionsTe: [
            'TF-IDF (టర్మ్ ఫ్రీక్వెన్సీ - ఇన్‌వర్స్ డాక్యుమెంట్ ఫ్రీక్వెన్సీ)',
            'ఇమేజ్ ఇంటర్‌పోలేషన్',
            'ఆడియో స్పెక్ట్రోగ్రామ్',
            'హెక్సాడెసిమల్ కలర్ కోడింగ్'
          ],
          correct: 0,
          explanationEn: 'TF-IDF scores the importance of words relative to document corpus frequency for machine learning input matrices.',
          explanationTe: 'TF-IDF పదాల ప్రాముఖ్యత ఆధారంగా వాటిని మెషిన్ లెర్నింగ్ మోడల్ అర్థం చేసుకోగల వెక్టర్స్ గా మారుస్తుంది.'
        }
      ],
      advanced: [
        {
          id: 'ap-b-1',
          questionEn: 'To prevent data leakage during preprocessing in an end-to-end ML project pipeline, what must you NEVER do?',
          questionTe: 'డేటా లీకేజ్ (Data Leakage) జరగకుండా నివారించడానికి మనం ఎప్పటికీ చేయకూడని పని ఏమిటి?',
          optionsEn: [
            'Fit the StandardScaler on the entire dataset BEFORE train-test split',
            'Fit scalers only on training split X_train and then transform X_test',
            'Use K-Fold Cross Validation within training set',
            'Log model hyperparameters to MLflow'
          ],
          optionsTe: [
            'ట్రైన్-టెస్ట్ విభజన చేయడానికి ముందే మొత్తం డేటాపై స్కేలర్‌ను ఫిట్ చేయడం',
            'స్కేలర్‌ను కేవలం ట్రైనింగ్ డేటాపై మాత్రమే ఫిట్ చేసి టెస్ట్ డేటాపై ట్రాన్స్‌ఫార్మ్ చేయడం',
            'ట్రైనింగ్ సెట్ పై క్రాస్ వాలిడేషన్ వాడటం',
            'హైపర్‌పారామీటర్లను ట్రాక్ చేయడం'
          ],
          correct: 0,
          explanationEn: 'Fitting scalers or imputers on the full dataset leaks test distribution statistics into training!',
          explanationTe: 'టెస్ట్ డేటా గణాంకాలు ట్రైనింగ్ లోకి రాకుండా ఉండటానికి, స్కేలర్లను కేవలం ట్రైనింగ్ డేటాపై మాత్రమే ఫిట్ చేయాలి.'
        }
      ]
    }
  },

  'ai-resume': {
    titleEn: 'ATS Scanner: Spot Resume Flaws & Keyword Hacks',
    titleTe: 'ATS స్కానర్: రెజ్యూమే తప్పులను సరిచేసి షార్ట్‌లిస్ట్ అవ్వండి',
    descEn: 'Evaluate whether a resume will pass automated Applicant Tracking Systems and impress top tech recruiters!',
    descTe: 'సాఫ్ట్‌వేర్ కంపెనీల రిక్రూటర్లను ఆకట్టుకునేలా సరైన రెజ్యూమే నియమాలను పరీక్షించండి!',
    questions: {
      foundations: [
        {
          id: 'ar-s-1',
          questionEn: 'Which is the best information to put at the top of a student resume?',
          questionTe: 'విద్యార్థి రెజ్యూమేలో పైభాగంలో ఉండవలసిన అత్యంత ముఖ్యమైన వివరాలు ఏవి?',
          optionsEn: [
            'Full Name, Email, Phone, and Foundations / Education details',
            'Favorite ice cream flavor and shoe size',
            'A 10-page story about vacations',
            'List of movie actors'
          ],
          optionsTe: [
            'పూర్తి పేరు, ఈమెయిల్, ఫోన్ నంబర్, మరియు విద్యార్హతలు',
            'ఇష్టమైన ఐస్‌క్రీమ్ ఫ్లేవర్ మరియు షూ సైజ్',
            'సెలవుల గురించి 10 పేజీల కథ',
            'సినిమా నటుల పేర్ల జాబితా'
          ],
          correct: 0,
          explanationEn: 'Contact details and educational qualifications must always be clear and easy to read at the very top.',
          explanationTe: 'సంప్రదింపు వివరాలు మరియు విద్యా నేపథ్యం స్పష్టంగా రెజ్యూమే పైభాగంలో ఉండాలి.'
        }
      ],
      applied: [
        {
          id: 'ar-i-1',
          questionEn: 'Which phrasing is strongest for describing a project on a student resume?',
          questionTe: 'రెజ్యూమేలో ప్రాజెక్ట్ వివరణ రాయడానికి అత్యంత బలమైన వాక్యం ఏది?',
          optionsEn: [
            '"I did some work on a website with a friend."',
            '"Developed a responsive AI study portal using React and Tailwind CSS, increasing peer study efficiency by 30%."',
            '"Stuff with code and buttons."',
            '"Helped make something cool online."'
          ],
          optionsTe: [
            '"నేను మా ఫ్రెండ్‌తో కలిసి ఒక వెబ్‌సైట్ పని చేశాను."',
            '"రియాక్ట్ మరియు టెయిల్‌విండ్ ఉపయోగించి AI స్టడీ పోర్టల్‌ను అభివృద్ధి చేసి, విద్యార్థుల అభ్యాస వేగాన్ని 30% పెంచాను."',
            '"కోడింగ్ మరియు కొన్ని బటన్స్ పెట్టాను."',
            '"ఆన్‌లైన్‌లో ఏదో ఒకటి చేశాను."'
          ],
          correct: 1,
          explanationEn: 'The winning bullet uses an action verb (Developed), target technologies (React, Tailwind), and quantified metric (30% efficiency).',
          explanationTe: 'యాక్షన్ వెర్బ్ (Developed), ఉపయోగించిన టెక్నాలజీలు మరియు గణాంక ఫలితం (30%) ఉన్న వాక్యం రిక్రూటర్లను ఆకట్టుకుంటుంది.'
        }
      ],
      advanced: [
        {
          id: 'ar-b-1',
          questionEn: 'Why do modern Applicant Tracking Systems (ATS) frequently reject multi-column graphic resumes made in Canva?',
          questionTe: 'కాన్వా (Canva) లో రంగురంగుల గ్రాఫిక్స్‌తో చేసిన రెజ్యూమేలను కంపెనీల ATS సాఫ్ట్‌వేర్ ఎందుకు తిరస్కరిస్తుంది?',
          optionsEn: [
            'ATS parsers read left-to-right linearly, corrupting text hierarchy in multi-column tables, text boxes, and SVG icons',
            'Canva is banned by law',
            'The file size is always under 10kb',
            'HR managers only like handwritten paper'
          ],
          optionsTe: [
            'ATS సాఫ్ట్‌వేర్ టేబుల్స్, ఐకాన్స్ మరియు మల్టీ-కాలమ్స్ లోని టెక్స్ట్‌ను సరిగ్గా చదవలేక గందరగోళానికి గురవుతుంది',
            'కాన్వా చట్టవిరుద్ధం కాబట్టి',
            'ఫైల్ సైజ్ చాలా చిన్నగా ఉండటం వల్ల',
            'కేవలం చేతిరాతతో రాసిన పేపర్లు మాత్రమే నచ్చుతాయి కాబట్టి'
          ],
          correct: 0,
          explanationEn: 'Single-column semantic typography ensures flawless parsing of skills, dates, and titles by automated parsers.',
          explanationTe: 'సింగిల్ కాలమ్ స్టాండర్డ్ ఫార్మాట్ లో ఉన్నప్పుడే ఆటోమేటెడ్ సాఫ్ట్‌వేర్ మీ నైపుణ్యాలను సరిగ్గా గుర్తిస్తుంది.'
        }
      ]
    }
  },

  'spoken-english': {
    titleEn: 'Grammar & Fluency Master: Real-Time English Polish',
    titleTe: 'గ్రామర్ & ఫ్లూయెన్సీ మాస్టర్: ఆత్మవిశ్వాసంతో ఇంగ్లీష్ మాట్లాడండి',
    descEn: 'Spot grammatical errors, learn native phrasing, and master conversational confidence!',
    descTe: 'సాధారణంగా దొర్లే తప్పులను సరిదిద్దుకుని చక్కటి ఇంగ్లీష్ మాట్లాడటం ప్రాక్టీస్ చేయండి!',
    questions: {
      foundations: [
        {
          id: 'se-s-1',
          questionEn: 'How should you introduce yourself politely in a classroom or interview?',
          questionTe: 'తరగతి గదిలో లేదా ఇంటర్వ్యూలో మిమ్మల్ని మీరు ఎలా పరిచయం చేసుకోవాలి?',
          optionsEn: [
            '"Myself Rahul from Hyderabad."',
            '"My name is Rahul, and I am from Hyderabad."',
            '"Me Rahul."',
            '"I am Rahul having 14 years old."'
          ],
          optionsTe: [
            '"Myself Rahul from Hyderabad." (తప్పు ప్రయోగం)',
            '"My name is Rahul, and I am from Hyderabad." (సరైన ప్రయోగం)',
            '"Me Rahul."',
            '"I am Rahul having 14 years old."'
          ],
          correct: 1,
          explanationEn: 'In English, never start an introduction with "Myself". Always say "My name is..." or "I am...".',
          explanationTe: 'ఇంగ్లీష్‌లో పరిచయం చేసుకునేటప్పుడు "Myself" తో ప్రారంభించకూడదు. "My name is..." లేదా "I am..." అని చెప్పాలి.'
        },
        {
          id: 'se-s-2',
          questionEn: 'Choose the grammatically correct sentence:',
          questionTe: 'సరైన వ్యాకరణం కలిగిన వాక్యాన్ని ఎంచుకోండి:',
          optionsEn: [
            '"I am go to foundations yesterday."',
            '"I went to foundations yesterday."',
            '"I am went to foundations yesterday."',
            '"Yesterday I was go to foundations."'
          ],
          optionsTe: [
            '"I am go to foundations yesterday."',
            '"I went to foundations yesterday."',
            '"I am went to foundations yesterday."',
            '"Yesterday I was go to foundations."'
          ],
          correct: 1,
          explanationEn: '"Yesterday" refers to past time, so we must use the past tense form of the verb: "went".',
          explanationTe: '"Yesterday" అనేది గడచిన సమయం (గతం) కాబట్టి పాస్ట్ టెన్స్ లో "went" వాడాలి.'
        }
      ],
      applied: [
        {
          id: 'se-i-1',
          questionEn: 'What is the professional alternative to the redundant Indian-English phrase "revert back"?',
          questionTe: '"Revert back" అనే అనవసరమైన పునరుక్తి పదానికి బదులుగా ఏ ప్రొఫెషనల్ పదాన్ని వాడాలి?',
          optionsEn: [
            '"Respond" or "Reply"',
            '"Repeat back again"',
            '"Do backwards"',
            '"Return back"'
          ],
          optionsTe: [
            '"Respond" లేదా "Reply"',
            '"Repeat back again"',
            '"Do backwards"',
            '"Return back"'
          ],
          correct: 0,
          explanationEn: '"Revert" already implies returning/responding. Saying "revert back" is redundant. Use "reply" or "respond".',
          explanationTe: '"Revert" అంటేనే స్పందించడం. మళ్ళీ "back" చేర్చడం తప్పు. "Please reply" లేదా "Please respond" అనాలి.'
        }
      ],
      advanced: [
        {
          id: 'se-b-1',
          questionEn: 'In a behavioral job interview, what does the STAR technique stand for?',
          questionTe: 'జాబ్ ఇంటర్వ్యూలలో ప్రాజెక్ట్ అనుభవాలను వివరించడానికి వాడే STAR టెక్నిక్ పూర్తి రూపం ఏమిటి?',
          optionsEn: [
            'Situation, Task, Action, Result',
            'Start, Time, Algorithm, Review',
            'Speed, Technology, Accuracy, Rating',
            'Salary, Title, Agreement, Role'
          ],
          optionsTe: [
            'సిచ్యుయేషన్ (Situation), టాస్క్ (Task), యాక్షన్ (Action), రిజల్ట్ (Result)',
            'స్టార్ట్, టైమ్, అల్గారిథమ్, రివ్యూ',
            'స్పీడ్, టెక్నాలజీ, కచ్చితత్వం, రేటింగ్',
            'శాలరీ, టైటిల్, అగ్రిమెంట్, రోల్'
          ],
          correct: 0,
          explanationEn: 'The STAR framework structures storytelling clearly: What was the Situation? What was the Task? What Action did you take? What measurable Result occurred?',
          explanationTe: 'STAR విధానం ద్వారా మీ ప్రాజెక్ట్ సమస్య ఏమిటి, మీరు తీసుకున్న చర్యలు మరియు వచ్చిన ఫలితాన్ని కచ్చితంగా వివరించవచ్చు.'
        }
      ]
    }
  }
};
