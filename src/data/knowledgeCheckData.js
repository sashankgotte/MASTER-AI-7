const difficultyNames = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];

const question = (index, text, options, correct, explanation) => ({
  id: `knowledge-q-${index + 1}`,
  difficulty: difficultyNames[Math.floor(index / 5)],
  question: text,
  options,
  correct,
  explanation,
});

const QUESTIONS = [
  question(0, 'What does AI stand for?', ['Artificial Intelligence', 'Automatic Internet', 'Advanced Input', 'Applied Information'], 0, 'AI means Artificial Intelligence.'),
  question(1, 'Which is an example of AI?', ['A paper notebook', 'A voice assistant understanding speech', 'A regular light switch', 'A glass of water'], 1, 'Voice assistants use AI to understand language and respond.'),
  question(2, 'What do AI systems learn from?', ['Data and examples', 'Only batteries', 'Random guesses', 'Printed labels only'], 0, 'AI finds patterns in data and examples.'),
  question(3, 'Which task can computer vision perform?', ['Recognize objects in images', 'Charge a phone', 'Print paper', 'Measure temperature without a sensor'], 0, 'Computer vision helps computers interpret images and video.'),
  question(4, 'What can a recommendation system suggest?', ['Your exact future', 'A physical keyboard', 'Music or videos you may enjoy', 'Electricity usage without data'], 2, 'Recommendation systems use patterns to suggest relevant content.'),
  question(5, 'Machine learning is best described as:', ['A computer screen', 'A way for computers to learn patterns from data', 'A manual filing system', 'A battery-saving mode'], 1, 'Machine learning is a major approach within AI.'),
  question(6, 'What is deep learning?', ['Learning without data', 'A deep storage folder', 'Machine learning using multi-layer neural networks', 'A faster internet connection'], 2, 'Deep learning uses neural networks with many processing layers.'),
  question(7, 'What does natural language processing help computers understand?', ['Battery voltage', 'Human language', 'Screen brightness', 'Keyboard shape'], 1, 'Natural language processing works with text and speech.'),
  question(8, 'Why is training data important?', ['It guarantees perfect answers', 'It gives a model examples from which to learn', 'It makes hardware unnecessary', 'It replaces all testing'], 1, 'Training data supplies examples of patterns and outcomes.'),
  question(9, 'What is a prediction in AI?', ['A computer password', 'A type of image file', 'A model output based on learned patterns', 'A promise that cannot be tested'], 2, 'A prediction is the model’s best result for new input.'),
  question(10, 'What happens during model training?', ['The model adjusts parameters using examples', 'The model writes a resume', 'The computer replaces the dataset', 'The user selects a font'], 0, 'Training updates parameters to reduce errors on examples.'),
  question(11, 'What is inference?', ['Collecting electricity', 'Using a trained model to produce an output for new input', 'Writing a project title', 'Deleting a model'], 1, 'Inference is the prediction stage after training.'),
  question(12, 'Why split data into training and testing sets?', ['To make every answer identical', 'To avoid defining a goal', 'To learn on one part and evaluate on unseen examples', 'To remove all errors'], 2, 'The split helps measure generalization.'),
  question(13, 'What does a loss function measure?', ['How far a model output is from the desired answer', 'How much storage a monitor has', 'How many users opened a page', 'The age of a dataset'], 0, 'Loss gives training a signal about prediction error.'),
  question(14, 'What does an optimizer do?', ['Labels every image by hand', 'Changes the operating system', 'Adjusts model parameters to reduce loss', 'Creates a presentation theme'], 2, 'Optimizers improve parameters during training.'),
  question(15, 'What is a good prompt?', ['Do it', 'Explain photosynthesis to a beginner in three bullet points', 'Tell me something', 'AI please'], 1, 'A clear prompt gives the topic, audience, and format.'),
  question(16, 'What is overfitting?', ['When a model memorizes training examples and performs poorly on new data', 'When a model has no parameters', 'When a computer runs out of electricity', 'When a dataset is too small to open'], 0, 'Overfit models learn noise instead of general patterns.'),
  question(17, 'What is a confusion matrix used for?', ['Compressing video', 'Choosing a programming language', 'Examining correct and incorrect classification types', 'Measuring internet speed'], 2, 'It shows true and false positives and negatives.'),
  question(18, 'What is retrieval-augmented generation?', ['Deleting a model after each question', 'Generating an answer using retrieved reference information', 'Drawing a logo automatically', 'Training without a source'], 1, 'It combines retrieval with generation to ground responses.'),
  question(19, 'Why should AI outputs be reviewed by people?', ['Outputs can be incomplete, biased, or wrong', 'AI cannot process any input', 'Checking makes data disappear', 'People are never responsible for decisions'], 0, 'Human review helps catch errors and supports responsible use.'),
  question(20, 'What is data leakage?', ['When a file is stored safely', 'When information unavailable at prediction time influences training', 'When a model has too few layers', 'When labels are reviewed'], 1, 'Leakage creates unrealistically strong evaluation results.'),
  question(21, 'Why can class imbalance be a problem?', ['A model may favor the common class and miss rare cases', 'It always makes training impossible', 'It removes all features', 'It guarantees high recall'], 0, 'Rare but important classes can be overlooked.'),
  question(22, 'What is transfer learning?', ['Copying a password between users', 'Moving a database to a new folder', 'Starting with knowledge from a model trained on a related task', 'Training without data'], 2, 'Transfer learning reuses useful representations.'),
  question(23, 'Which practice supports responsible AI?', ['Trusting outputs without testing', 'Protecting privacy, checking bias, and monitoring results', 'Using any data without permission', 'Hiding every limitation'], 1, 'Responsible AI considers safety, fairness, privacy, and accountability.'),
  question(24, 'How should a project choose between a simple and complex model?', ['Always choose the largest model', 'Choose by name alone', 'Avoid evaluating trade-offs', 'Use the simplest model that meets the goal while considering accuracy, cost, and maintainability'], 3, 'Good model selection balances performance with practical constraints.'),
];

const TOPICS = ['what-is-ai', 'how-ai-works', 'prompt-engineering', 'ai-tools', 'ai-projects'];
export const KNOWLEDGE_CHECKS = Object.fromEntries(TOPICS.map((topicId) => [
  topicId,
  QUESTIONS.map((item) => ({ ...item, id: `${topicId}-${item.id}` })),
]));
