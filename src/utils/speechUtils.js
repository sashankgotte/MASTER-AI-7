/**
 * Speech Utilities for MASTER AI 7
 * Handles Web Speech API (SpeechSynthesis for TTS and SpeechRecognition for STT)
 */

class SpeechService {
  constructor() {
    this.synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
    this.recognition = null;
    this.isListening = false;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.voices = [];
    this.selectedVoice = null;
    this.onSpeakingStateChange = null;
    this.onListeningStateChange = null;
    this.audioContext = null;
    this.analyser = null;
    this.speakingInterval = null;

    if (typeof window !== 'undefined') {
      this.initVoices();
      this.initRecognition();
    }
  }

  initVoices() {
    if (!this.synth) return;
    const updateVoices = () => {
      this.voices = this.synth.getVoices();
      // Prefer friendly English voices (Google, Microsoft, Natural)
      this.selectedVoice = 
        this.voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('David'))) ||
        this.voices.find(v => v.lang.startsWith('en')) ||
        this.voices[0] || null;
    };

    updateVoices();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = updateVoices;
    }
  }

  initRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
    }
  }

  speak(text, options = {}) {
    if (!this.synth) {
      console.warn('SpeechSynthesis is not supported in this browser.');
      return;
    }

    // Stop any ongoing speech
    this.stopSpeaking();

    // Clean text of markdown/emojis for smoother TTS
    const cleanText = text
      .replace(/[*_#`~[\]()]/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    utterance.rate = options.rate || 0.95; // Slightly slower for clear educational understanding
    utterance.pitch = options.pitch || 1.05; // Slightly friendly upbeat pitch

    utterance.onstart = () => {
      this.isSpeaking = true;
      if (this.onSpeakingStateChange) this.onSpeakingStateChange(true);
      if (options.onStart) options.onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onSpeakingStateChange) this.onSpeakingStateChange(false);
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('TTS unavailable:', e?.error || e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onSpeakingStateChange) this.onSpeakingStateChange(false);
      if (options.onError) options.onError(e);
    };

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (this.onSpeakingStateChange) this.onSpeakingStateChange(false);
    }
  }

  startListening(callbacks = {}) {
    if (!this.recognition) {
      if (callbacks.onError) {
        callbacks.onError('Speech Recognition is not supported in this browser. Please use Google Chrome, Edge, or type your message in the chat.');
      }
      return false;
    }

    this.stopSpeaking(); // don't talk over the user

    let finalTranscript = '';

    this.recognition.onstart = () => {
      this.isListening = true;
      if (this.onListeningStateChange) this.onListeningStateChange(true);
      if (callbacks.onStart) callbacks.onStart();
    };

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      if (callbacks.onInterim) {
        callbacks.onInterim(interimTranscript);
      }

      if (callbacks.onResult && (finalTranscript || interimTranscript)) {
        callbacks.onResult(finalTranscript || interimTranscript, !!finalTranscript);
      }
    };

    this.recognition.onerror = (event) => {
      console.warn('STT Error:', event.error);
      this.isListening = false;
      if (this.onListeningStateChange) this.onListeningStateChange(false);
      if (callbacks.onError) callbacks.onError(event.error);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onListeningStateChange) this.onListeningStateChange(false);
      if (callbacks.onEnd) callbacks.onEnd(finalTranscript);
    };

    try {
      this.recognition.start();
      return true;
    } catch (e) {
      console.error('Failed to start recognition:', e);
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch (e) {
        console.warn(e);
      }
      this.isListening = false;
      if (this.onListeningStateChange) this.onListeningStateChange(false);
    }
  }
}

export const speechService = new SpeechService();

