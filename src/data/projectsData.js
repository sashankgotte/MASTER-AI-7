/**
 * Comprehensive AI Projects Hub for MASTER AI 7
 * Categorized by Foundations, Applied, and Advanced
 * Complete with step-by-step blueprints, runnable code, live simulators, and GitHub guides.
 */

export const AI_PROJECTS = [
  // ---------------- FOUNDATIONS PROJECTS ----------------
  {
    id: 'teachable-machine',
    title: 'Google Teachable Machine Vision Classifier',
    level: 'foundations',
    levelLabel: '🎒 Foundations Level',
    difficulty: 'Beginner',
    timeEstimate: '30 mins',
    category: 'Computer Vision',
    idea: 'Train an AI with your webcam to recognize whether you are raising your left hand, right hand, or holding a pencil.',
    techStack: ['Google Teachable Machine', 'Webcam', 'JavaScript', 'HTML5'],
    overview: 'Teachable Machine is a fast, easy way to create machine learning models for your web apps without writing complex math.',
    steps: [
      'Step 1: Open Google Teachable Machine (teachablemachine.withgoogle.com) and create an "Image Project".',
      'Step 2: Create 3 Classes: "Left Hand", "Right Hand", and "Pencil". Record 30 webcam samples for each.',
      'Step 3: Click "Train Model" and observe the real-time training progress bar.',
      'Step 4: Test with your webcam to see the confidence percentage live.',
      'Step 5: Click "Export Model" and embed the TensorFlow.js code snippet into your web page!'
    ],
    codeSnippet: `<!-- Teachable Machine Image Classifier Integration -->
<div>Teachable Machine Model</div>
<button type="button" onclick="init()">Start Camera</button>
<div id="webcam-container"></div>
<div id="label-container"></div>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></script>
<script>
    const URL = "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/";
    let model, webcam, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        webcam = new tmImage.Webcam(300, 300, true);
        await webcam.setup();
        await webcam.play();
        window.requestAnimationFrame(loop);

        document.getElementById("webcam-container").appendChild(webcam.canvas);
        labelContainer = document.getElementById("label-container");
    }

    async function loop() {
        webcam.update();
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        const prediction = await model.predict(webcam.canvas);
        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(1) + "%";
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }
    }
</script>`,
    simulatorType: 'vision_classifier',
    githubGuide: 'git init\ngit add index.html\ngit commit -m "Add Teachable Machine visual classifier"\ngit branch -M main\ngit remote add origin https://github.com/your-username/ai-hand-classifier.git\ngit push -u origin main'
  },
  {
    id: 'rock-paper-scissors-ai',
    title: 'Smart Rock-Paper-Scissors AI Game',
    level: 'foundations',
    levelLabel: '🎒 Foundations Level',
    difficulty: 'Beginner',
    timeEstimate: '45 mins',
    category: 'Game AI & Probability',
    idea: 'Build an AI opponent that tracks player move patterns using frequency analysis to predict and beat your next move.',
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Probability Logic'],
    overview: 'Learn how AI games use pattern recognition: if a player usually plays Rock after losing with Scissors, the AI learns to counter with Paper!',
    steps: [
      'Step 1: Create the game UI with 3 clickable buttons: Rock ✊, Paper ✋, Scissors ✌️.',
      'Step 2: Build a transition frequency matrix that records the user’s previous moves.',
      'Step 3: Program the AI logic: Predict the user move with highest probability and choose the counter move.',
      'Step 4: Display the score board and the AI’s win percentage in real time.'
    ],
    codeSnippet: `// Pattern-predicting AI for Rock Paper Scissors
const history = { rock: 0, paper: 0, scissors: 0 };

function getAIMove() {
  const total = history.rock + history.paper + history.scissors;
  if (total < 3) {
    const moves = ['rock', 'paper', 'scissors'];
    return moves[Math.floor(Math.random() * moves.length)];
  }
  
  // Predict most frequent player move and choose counter
  if (history.rock >= history.paper && history.rock >= history.scissors) {
    return 'paper'; // Counters rock
  } else if (history.paper >= history.rock && history.paper >= history.scissors) {
    return 'scissors'; // Counters paper
  } else {
    return 'rock'; // Counters scissors
  }
}

function play(playerMove) {
  history[playerMove]++;
  const aiMove = getAIMove();
  console.log(\`You chose \${playerMove}, AI chose \${aiMove}\`);
}`,
    simulatorType: 'rps_game',
    githubGuide: 'git init\ngit add .\ngit commit -m "Initial commit for Rock Paper Scissors AI"\ngit push origin main'
  },

  // ---------------- APPLIED PROJECTS ----------------
  {
    id: 'spam-classifier',
    title: 'AI Spam SMS / Email Classifier',
    level: 'applied',
    levelLabel: '🎓 Applied Level',
    difficulty: 'Applied',
    timeEstimate: '1.5 hours',
    category: 'Natural Language Processing',
    idea: 'Train a Naive Bayes classifier on thousands of SMS messages to automatically detect spam vs legitimate messages.',
    techStack: ['Python', 'Scikit-Learn', 'Pandas', 'TF-IDF Vectorizer'],
    overview: 'Spam detection is one of the classic real-world applications of Machine Learning used in Gmail and phone messaging apps.',
    steps: [
      'Step 1: Load the SMS Spam Collection dataset using Pandas DataFrame.',
      'Step 2: Clean and preprocess text (lowercasing, stopword removal, stemming).',
      'Step 3: Convert text into numerical matrices using TfidfVectorizer.',
      'Step 4: Train a Multinomial Naive Bayes model on 80% training data.',
      'Step 5: Test on remaining 20% and evaluate accuracy, precision, and recall.'
    ],
    codeSnippet: `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import classification_report, accuracy_score

# 1. Load Dataset
data = {
    'text': [
        'WINNER! You have won $10,000 cash! Call now to claim!',
        'Hey are we still meeting for lunch at 1pm?',
        'URGENT! Your account has been suspended. Click link to verify.',
        'Can you send me the lecture notes from today?',
        'Congratulations! FREE prize voucher is waiting for you!'
    ],
    'label': ['spam', 'ham', 'spam', 'ham', 'spam']
}
df = pd.DataFrame(data)

# 2. Vectorization & Split
vectorizer = TfidfVectorizer(stop_words='english')
X = vectorizer.fit_transform(df['text'])
y = df['label']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 3. Model Training
model = MultinomialNB()
model.fit(X_train, y_train)

# 4. Predict on new input
test_sms = ["Free tickets to the championship game! Text WIN to 55555"]
test_vec = vectorizer.transform(test_sms)
prediction = model.predict(test_vec)
print(f"Prediction for '{test_sms[0]}': {prediction[0].upper()}")`,
    simulatorType: 'spam_detector',
    githubGuide: 'pip freeze > requirements.txt\ngit init\ngit add spam_classifier.py requirements.txt\ngit commit -m "Implement SMS Spam Classifier using Scikit-Learn"\ngit push origin main'
  },
  {
    id: 'house-price-prediction',
    title: 'House Price Predictor using Linear & Ridge Regression',
    level: 'applied',
    levelLabel: '🎓 Applied Level',
    difficulty: 'Applied',
    timeEstimate: '2 hours',
    category: 'Supervised Machine Learning',
    idea: 'Predict real estate prices based on square footage, bedrooms, bathrooms, neighborhood ratings, and age of property.',
    techStack: ['Python', 'Scikit-Learn', 'NumPy', 'Matplotlib', 'Streamlit'],
    overview: 'Learn how continuous target variables are predicted using multivariate linear regression and feature scaling.',
    steps: [
      'Step 1: Perform Exploratory Data Analysis (EDA) and heatmap correlation analysis.',
      'Step 2: Handle outliers and apply StandardScaler to normalize continuous features.',
      'Step 3: Fit LinearRegression, Ridge, and RandomForestRegressor models.',
      'Step 4: Compare Mean Absolute Error (MAE) and R² Score.',
      'Step 5: Deploy an interactive Web UI with Streamlit sliders.'
    ],
    codeSnippet: `import numpy as np
import pandas as pd
from sklearn.linear_model import Ridge
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import make_pipeline

# Synthetic Housing Dataset
df = pd.DataFrame({
    'sqft': [1200, 1500, 1800, 2400, 3000, 850, 2100],
    'bedrooms': [2, 3, 3, 4, 5, 1, 3],
    'age': [10, 5, 2, 8, 1, 15, 3],
    'price_k': [250, 320, 390, 510, 680, 180, 460]
})

X = df[['sqft', 'bedrooms', 'age']]
y = df['price_k']

# Pipeline with Standard Scaler + Ridge Regression
model = make_pipeline(StandardScaler(), Ridge(alpha=1.0))
model.fit(X, y)

# Predict for a new house: 2000 sqft, 3 bed, 4 years old
new_house = pd.DataFrame([[2000, 3, 4]], columns=['sqft', 'bedrooms', 'age'])
pred_price = model.predict(new_house)[0]
print(f"Estimated Price: \${pred_price * 1000:,.2f}")`,
    simulatorType: 'price_predictor',
    githubGuide: 'git init\ngit add .\ngit commit -m "House price regression model with interactive evaluation"\ngit push origin main'
  },

  // ---------------- ADVANCED PROJECTS ----------------
  {
    id: 'cnn-chest-xray',
    title: 'Deep Learning Chest X-Ray Pneumonia Classifier (PyTorch)',
    level: 'advanced',
    levelLabel: '💻 Advanced Level',
    difficulty: 'Advanced / Capstone',
    timeEstimate: '4-6 hours',
    category: 'Computer Vision & Healthcare AI',
    idea: 'Architect a Convolutional Neural Network (CNN) with Transfer Learning (ResNet-50 / DenseNet-121) to detect pneumonia from medical chest radiographs.',
    techStack: ['PyTorch', 'Torchvision', 'CUDA', 'Albumentations', 'Weights & Biases', 'Grad-CAM'],
    overview: 'A capstone-grade deep learning project implementing transfer learning, data augmentation, ROC-AUC metric optimization, and Grad-CAM explainability heatmaps for clinical validation.',
    steps: [
      'Step 1: Download NIH Chest X-Ray or Kaggle Pneumonia dataset (5,863 JPEG images).',
      'Step 2: Build an Albumentations data augmentation pipeline (RandomHorizontalFlip, Affine rotation, ColorJitter).',
      'Step 3: Instantiate pretrained ResNet50, replace classification head with Dropout(0.4) + Linear(2048, 2).',
      'Step 4: Train with CrossEntropyLoss and AdamW optimizer with CosineAnnealingWarmRestarts scheduler.',
      'Step 5: Generate Grad-CAM heatmaps to visually verify that the model is focusing on lung opacities.',
      'Step 6: Export model as TorchScript and deploy REST API with FastAPI & Docker.'
    ],
    codeSnippet: `import torch
import torch.nn as nn
import torchvision.models as models
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from PIL import Image

class ChestXRayResNet(nn.Module):
    def __init__(self, num_classes=2, pretrained=True):
        super(ChestXRayResNet, self).__init__()
        self.backbone = models.resnet50(weights=models.ResNet50_Weights.DEFAULT if pretrained else None)
        in_features = self.backbone.fc.in_features
        self.backbone.fc = nn.Sequential(
            nn.Dropout(p=0.4),
            nn.Linear(in_features, 512),
            nn.ReLU(),
            nn.BatchNorm1d(512),
            nn.Dropout(p=0.2),
            nn.Linear(512, num_classes)
        )

    def forward(self, x):
        return self.backbone(x)

# Device configuration
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model = ChestXRayResNet(num_classes=2).to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-4, weight_decay=1e-2)

print("Architecture initialized successfully on device:", device)
print(model.backbone.fc)`,
    simulatorType: 'xray_classifier',
    githubGuide: 'git init\ngit add train.py model.py dataset.py Dockerfile requirements.txt\ngit commit -m "Pneumonia detection CNN with Transfer Learning and Grad-CAM"\ngit branch -M main\ngit remote add origin https://github.com/your-name/chest-xray-pneumonia-dl.git\ngit push -u origin main'
  },
  {
    id: 'rag-docs-engine',
    title: 'Enterprise RAG (Retrieval-Augmented Generation) Search Engine',
    level: 'advanced',
    levelLabel: '💻 Advanced Level',
    difficulty: 'Advanced / Capstone',
    timeEstimate: '5-8 hours',
    category: 'LLMs & Generative AI Systems',
    idea: 'Build an end-to-end RAG system that ingests PDFs/documents, generates semantic vector embeddings, stores them in ChromaDB/Pinecone, and generates grounded, cited answers using LLMs.',
    techStack: ['LangChain', 'OpenAI / Ollama', 'ChromaDB', 'FastAPI', 'PyPDF', 'Sentence-Transformers'],
    overview: 'RAG is the most in-demand enterprise generative AI architecture, eliminating LLM hallucinations by grounding answers directly in verified proprietary documentation.',
    steps: [
      'Step 1: Ingest multi-page technical PDFs using PyPDFLoader.',
      'Step 2: Split text into semantic chunks with RecursiveCharacterTextSplitter (chunk_size=800, overlap=150).',
      'Step 3: Embed chunks into 768-dimensional dense vectors using HuggingFace all-MiniLM-L6-v2.',
      'Step 4: Store and index vectors inside ChromaDB with HNSW cosine similarity.',
      'Step 5: Execute Hybrid Search (Vector + BM25 keyword search) to retrieve Top-K relevant passages.',
      'Step 6: Construct augmented prompt with source metadata and stream response via FastAPI.'
    ],
    codeSnippet: `from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.chains import RetrievalQA
from langchain_community.llms import Ollama

# 1. Document Chunking
sample_text = """MASTER AI 7 is an enterprise-grade AI education platform.
It features 7 core learning topics and adaptive level selection (Foundations, Applied, Advanced).
The Spoken English module uses Web Speech recognition to deliver real-time grammatical feedback."""

splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=30)
chunks = splitter.create_documents([sample_text])

# 2. Embedding & Vector Store
embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
vector_db = Chroma.from_documents(chunks, embeddings, collection_name="master_ai_7_docs")

# 3. Retriever setup
retriever = vector_db.as_retriever(search_kwargs={"k": 2})
docs = retriever.get_relevant_documents("How does the Spoken English module work?")

print(f"Found {len(docs)} relevant context passages:")
for i, d in enumerate(docs):
    print(f"[{i+1}] {d.page_content}")`,
    simulatorType: 'rag_simulator',
    githubGuide: 'git init\ngit add app.py rag_pipeline.py vector_store.py requirements.txt\ngit commit -m "Enterprise RAG Pipeline with ChromaDB and LangChain"\ngit push origin main'
  }
];

