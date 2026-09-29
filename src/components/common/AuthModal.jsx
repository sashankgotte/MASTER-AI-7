import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, User, Mail, Lock, Sparkles, Award, Flame, LogOut, Check } from 'lucide-react';

const AVATARS = ['🤖', '🚀', '🧠', '⚡', '💻', '🌟', '👾', '🎓'];

export default function AuthModal() {
  const {
    isAuthModalOpen,
    authMode,
    setAuthMode,
    closeAuth,
    login,
    signup,
    logout,
    user,
    updateProfile
  } = useAuth();

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    password: '',
    avatar: user.avatar || '🤖',
    careerGoal: 'AI / Machine Learning Engineer'
  });

  const [message, setMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      login(formData.email, formData.password);
    } else if (authMode === 'signup') {
      signup(formData.name, formData.email);
    } else if (authMode === 'forgot') {
      setMessage(`Password reset link sent to ${formData.email}!`);
      setTimeout(() => {
        setMessage('');
        setAuthMode('login');
      }, 2000);
    } else if (authMode === 'profile') {
      updateProfile({
        name: formData.name,
        avatar: formData.avatar,
        email: formData.email
      });
      closeAuth();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl glass-panel-glow border border-cyan-500/40 p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeAuth}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 mb-3 shadow-neon-cyan text-2xl">
            {authMode === 'profile' ? formData.avatar : '🤖'}
          </div>
          <h3 className="text-xl font-bold font-display text-white">
            {authMode === 'login' && 'Welcome Back to MASTER AI 7'}
            {authMode === 'signup' && 'Create Your Student Account'}
            {authMode === 'forgot' && 'Reset Your Password'}
            {authMode === 'profile' && 'Student Profile & Achievements'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {authMode === 'login' && 'Sign in to access your interactive AI Dashboard & lessons'}
            {authMode === 'signup' && 'Join thousands of students learning AI at their own level'}
            {authMode === 'forgot' && 'Enter your registered email to receive a recovery code'}
            {authMode === 'profile' && 'Track your learning XP, streak, and target milestones'}
          </p>
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            {message}
          </div>
        )}

        {/* Form Body */}
        {authMode === 'profile' ? (
          <div className="space-y-4">
            {/* Stats Overview */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-dark-900 border border-cyan-500/20">
                <div className="text-lg font-black font-mono text-cyan-400 flex items-center justify-center gap-1">
                  <Award className="w-4 h-4" />
                  {user.xp}
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Learning XP</div>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-cyan-500/20">
                <div className="text-lg font-black font-mono text-amber-400 flex items-center justify-center gap-1">
                  <Flame className="w-4 h-4" />
                  {user.streak} Days
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Study Streak</div>
              </div>
              <div className="p-2.5 rounded-xl bg-dark-900 border border-cyan-500/20">
                <div className="text-lg font-black font-mono text-emerald-400">
                  {user.completedTopics?.length || 0} / 7
                </div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Modules Done</div>
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1.5">Choose Avatar</label>
              <div className="flex items-center justify-between gap-1">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setFormData({ ...formData, avatar: av })}
                    className={`w-9 h-9 rounded-lg text-lg flex items-center justify-center border transition-all ${
                      formData.avatar === av
                        ? 'bg-cyan-500/30 border-cyan-400 shadow-neon-cyan scale-110'
                        : 'bg-dark-900 border-dark-700 hover:border-slate-500'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            {/* Name input */}
            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Student Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-cyan-500/30 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-dark-950 font-bold text-sm shadow-neon-cyan transition-all"
              >
                Save Profile
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeAuth();
                }}
                className="p-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 text-rose-400 border border-rose-500/40"
                title="Log Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maya Patel"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-dark-900 border border-cyan-500/30 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="student@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-dark-900 border border-cyan-500/30 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {authMode !== 'forgot' && (
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-dark-900 border border-cyan-500/30 text-slate-100 text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-dark-950 font-bold text-sm shadow-neon-cyan transition-all mt-2"
            >
              {authMode === 'login' && 'Sign In to Dashboard'}
              {authMode === 'signup' && 'Create Free Account'}
              {authMode === 'forgot' && 'Send Reset Link'}
            </button>

            {/* Sub Links */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-cyan-900/30">
              {authMode === 'login' && (
                <>
                  <button
                    type="button"
                    onClick={() => setAuthMode('signup')}
                    className="hover:text-cyan-300 text-cyan-400 font-medium"
                  >
                    Need an account? Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="hover:text-slate-200"
                  >
                    Forgot Password?
                  </button>
                </>
              )}
              {authMode === 'signup' && (
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full text-center hover:text-cyan-300 text-cyan-400 font-medium"
                >
                  Already have an account? Sign In
                </button>
              )}
              {authMode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="w-full text-center hover:text-cyan-300 text-cyan-400 font-medium"
                >
                  Back to Login
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

