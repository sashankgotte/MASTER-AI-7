import React, { useRef, useState } from 'react';
import { Download, ExternalLink, FileText, Plus, Trash2, Volume2, ArrowRight, Mail, Phone, MapPin, GraduationCap, Wrench, Sparkles, Languages, UserRound, BriefcaseBusiness, Award, Target } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAgent } from '../../context/AgentContext';
import { useAuth } from '../../context/AuthContext';

const inputClass = 'w-full rounded-xl border border-cyan-500/30 bg-dark-950 px-3 py-2.5 text-sm text-slate-100 outline-none transition focus:border-cyan-300';
const emptyProject = () => ({ title: '', description: '', achievements: '', outcomes: '' });
const emptyEducation = () => ({ institution: '', degree: '', years: '' });

function createResumeData(preset) {
  return {
    name: preset.name || '', headline: preset.title || '', email: preset.email || '', phone: preset.phone || '',
    address: preset.location || '', linkedin: '', about: preset.summary || '',
    education: [{ institution: preset.education || '', degree: '', years: '' }],
    projects: (preset.projects || []).map((project) => ({ ...emptyProject(), ...project })),
    skills: preset.skills ? preset.skills.split(',').map((item) => item.trim()).filter(Boolean) : [],
    softSkills: [], languages: [],
    certifications: preset.certifications ? preset.certifications.split(',').map((item) => item.trim()).filter(Boolean) : [],
    strengths: [], careerGoals: preset.careerGoal || '',
  };
}

const Section = ({ title, children }) => <section className="rounded-2xl border border-cyan-500/20 bg-dark-900/50 p-5 space-y-3"><h2 className="text-sm font-black uppercase tracking-wider text-cyan-300">{title}</h2>{children}</section>;
const ListEditor = ({ label, values, onChange }) => <div><label className="mb-1 block text-xs font-mono text-slate-400">{label}</label><div className="space-y-2">{values.map((value, index) => <div className="flex gap-2" key={`${label}-${index}`}><input className={inputClass} value={value} onChange={(event) => { const next = [...values]; next[index] = event.target.value; onChange(next); }} /><button type="button" title={`Remove ${label}`} onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))} className="rounded-lg border border-rose-500/30 px-2 text-rose-300"><Trash2 className="h-4 w-4" /></button></div>)}</div><button type="button" onClick={() => onChange([...values, ''])} className="mt-2 text-xs font-bold text-cyan-300">+ Add More</button></div>;

function ResumeDocument({ data, documentRef }) {
  const visible = (value) => value && String(value).trim();
  const contact = [[Mail, data.email], [Phone, data.phone], [MapPin, data.address], [ExternalLink, data.linkedin]].filter(([, value]) => visible(value));
  const skills = data.skills.filter(visible);
  const strengths = data.strengths.filter(visible);
  const languages = data.languages.filter(visible);
  const certifications = data.certifications.filter(visible);
  const education = data.education.filter((item) => visible(item.institution) || visible(item.degree) || visible(item.years));
  const projects = data.projects.filter((item) => visible(item.title) || visible(item.description) || visible(item.achievements) || visible(item.outcomes));
  return <article ref={documentRef} className="resume-document">
    <header className="resume-header">
      <div className="resume-header-content">
        {visible(data.name) && <h1>{data.name}</h1>}
        {visible(data.headline) && <p className="resume-headline">{data.headline}</p>}
        {visible(data.about) && <p className="resume-summary">{data.about}</p>}
      </div>
      <div className="resume-header-rule" aria-hidden="true" />
    </header>
    <div className="resume-body">
      <aside className="resume-sidebar">
        {education.length > 0 && <ResumeSection title="Education" icon={GraduationCap}><div className="resume-education">{education.map((item, index) => <div className="resume-entry" key={index}><div className="resume-entry-title">{visible(item.institution) && <strong>{item.institution}</strong>}{visible(item.years) && <span>{item.years}</span>}</div>{visible(item.degree) && <p>{item.degree}</p>}</div>)}</div></ResumeSection>}
        {contact.length > 0 && <ResumeSection title="Contact" icon={Mail}><div className="resume-contact-list">{contact.map(([Icon, value]) => <div key={value}><Icon aria-hidden="true" /><span>{value}</span></div>)}</div></ResumeSection>}
        {projects.length > 0 && <ResumeSection title="Projects" icon={BriefcaseBusiness}><div>{projects.map((project, index) => <div className="resume-project" key={index}>{visible(project.title) && <h3>{project.title}</h3>}{visible(project.description) && <p>{project.description}</p>}{visible(project.achievements) && <p><strong>Achievements:</strong> {project.achievements}</p>}{visible(project.outcomes) && <p><strong>Outcome:</strong> {project.outcomes}</p>}</div>)}</div></ResumeSection>}
        {skills.length > 0 && <ResumeSection title="Skills" icon={Wrench}><ul className="resume-list resume-skill-list">{skills.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></ResumeSection>}
        {data.softSkills.filter(visible).length > 0 && <ResumeSection title="Soft Skills" icon={Sparkles}><ul className="resume-list">{data.softSkills.filter(visible).map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></ResumeSection>}
      </aside>
      <main className="resume-main">
        {visible(data.about) && <ResumeSection title="About Me" icon={UserRound}><p className="resume-copy">{data.about}</p></ResumeSection>}
        {languages.length > 0 && <ResumeSection title="Languages" icon={Languages}><ul className="resume-list">{languages.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></ResumeSection>}
        {strengths.length > 0 && <ResumeSection title="Key Strengths" icon={Sparkles}><ul className="resume-list">{strengths.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></ResumeSection>}
        {certifications.length > 0 && <ResumeSection title="Certifications" icon={Award}><ul className="resume-list">{certifications.map((item, index) => <li key={`${item}-${index}`}>{item}</li>)}</ul></ResumeSection>}
        {visible(data.careerGoals) && <ResumeSection title="Career Goals" icon={Target}><p className="resume-copy">{data.careerGoals}</p></ResumeSection>}
      </main>
    </div>
  </article>;
}
const ResumeSection = ({ title, icon: Icon, children }) => <section className="resume-section"><h2><Icon aria-hidden="true" />{title}</h2>{children}</section>;

export default function AIResume({ onNavigate }) {
  const { speak } = useAgent();
  const { markTopicComplete } = useAuth();
  const [data, setData] = useState(() => createResumeData({}));
  const [activeTab, setActiveTab] = useState('editor');
  const [errors, setErrors] = useState({});
  const documentRef = useRef(null);
  const update = (field, value) => setData((previous) => ({ ...previous, [field]: value }));
  const validate = () => { const next = {}; if (!data.name.trim()) next.name = 'Full Name is required.'; if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = 'Enter a valid email address.'; setErrors(next); return Object.keys(next).length === 0; };
  const generateResume = () => { if (!validate()) { setActiveTab('editor'); return; } setActiveTab('download'); markTopicComplete(6); };
  const downloadResume = async () => { if (!validate() || !documentRef.current) { setActiveTab('editor'); return; } const canvas = await html2canvas(documentRef.current, { scale: 2, backgroundColor: '#ffffff', useCORS: true }); const image = canvas.toDataURL('image/png'); const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' }); const scale = Math.min(210 / canvas.width, 297 / canvas.height); const width = canvas.width * scale; const height = canvas.height * scale; pdf.addImage(image, 'PNG', (210 - width) / 2, (297 - height) / 2, width, height); pdf.save(`${data.name.trim().replace(/\s+/g, '-').toLowerCase() || 'resume'}.pdf`); };
  const field = (label, key, type = 'text') => <div><label className="mb-1 block text-xs font-mono text-slate-400">{label}</label><input type={type} className={inputClass} value={data[key]} onChange={(event) => update(key, event.target.value)} />{errors[key] && <p className="mt-1 text-xs text-rose-300">{errors[key]}</p>}</div>;
  return <div className="mx-auto max-w-6xl space-y-8 px-4 py-8"><div className="relative overflow-hidden rounded-3xl border border-blue-500/40 glass-panel-glow p-6 md:p-10"><div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center"><div><div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-400 bg-blue-950/80 px-3 py-1 text-xs font-mono font-bold text-blue-300"><FileText className="h-4 w-4" /> TOPIC 6 • RESUME</div><h1 className="text-3xl font-black text-white md:text-5xl">CREATE <span className="text-gradient-cyan">RESUME</span></h1><p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">Enter your details, generate a professional resume, and download a clean PDF containing only your finished CV.</p><button onClick={() => speak('Welcome to Resume. Enter your details, generate your resume, and download the finished PDF.')} className="mt-4 flex items-center gap-2 rounded-xl bg-blue-500 px-4 py-2 text-xs font-bold text-dark-950"><Volume2 className="h-4 w-4" /> Hear Resume Guide</button></div><FileText className="h-24 w-24 text-blue-300" /></div></div>
  <div className="flex flex-wrap items-center gap-2 border-b border-dark-800 pb-2"><button onClick={() => setActiveTab('editor')} className={`rounded-xl px-4 py-2 text-xs font-mono font-bold ${activeTab === 'editor' ? 'bg-blue-500 text-dark-950' : 'bg-dark-900 text-slate-400'}`}>Create Resume</button><button onClick={generateResume} className={`rounded-xl px-4 py-2 text-xs font-mono font-bold ${activeTab === 'download' ? 'bg-amber-500 text-dark-950' : 'bg-dark-900 text-slate-400'}`}>Resume Download</button></div>
  {activeTab === 'editor' && <div className="space-y-5"><Section title="Personal Details"><div className="grid gap-4 sm:grid-cols-2">{field('Full Name', 'name')}{field('Headline', 'headline')}{field('Email', 'email', 'email')}{field('Phone Number', 'phone')}{field('Address', 'address')}{field('LinkedIn Link', 'linkedin', 'url')}</div><div><label className="mb-1 block text-xs font-mono text-slate-400">About Me</label><textarea rows="4" className={inputClass} value={data.about} onChange={(event) => update('about', event.target.value)} /></div></Section><Section title="Education"><div className="space-y-3">{data.education.map((item, index) => <div className="grid gap-2 rounded-xl border border-cyan-500/20 p-3 sm:grid-cols-3" key={index}><input className={inputClass} placeholder="Institution" value={item.institution} onChange={(event) => { const next = [...data.education]; next[index] = { ...item, institution: event.target.value }; update('education', next); }} /><input className={inputClass} placeholder="Degree / Field" value={item.degree} onChange={(event) => { const next = [...data.education]; next[index] = { ...item, degree: event.target.value }; update('education', next); }} /><input className={inputClass} placeholder="Years" value={item.years} onChange={(event) => { const next = [...data.education]; next[index] = { ...item, years: event.target.value }; update('education', next); }} /></div>)}</div><button onClick={() => update('education', [...data.education, emptyEducation()])} className="flex items-center gap-1 text-xs font-bold text-cyan-300"><Plus className="h-4 w-4" /> Add More</button></Section><Section title="Projects"><div className="space-y-4">{data.projects.map((project, index) => <div className="space-y-2 rounded-xl border border-cyan-500/20 p-3" key={index}><input className={inputClass} placeholder="Project title" value={project.title} onChange={(event) => { const next = [...data.projects]; next[index] = { ...project, title: event.target.value }; update('projects', next); }} /><textarea rows="2" className={inputClass} placeholder="Description" value={project.description} onChange={(event) => { const next = [...data.projects]; next[index] = { ...project, description: event.target.value }; update('projects', next); }} /><textarea rows="2" className={inputClass} placeholder="Achievements" value={project.achievements} onChange={(event) => { const next = [...data.projects]; next[index] = { ...project, achievements: event.target.value }; update('projects', next); }} /><textarea rows="2" className={inputClass} placeholder="Outcomes" value={project.outcomes} onChange={(event) => { const next = [...data.projects]; next[index] = { ...project, outcomes: event.target.value }; update('projects', next); }} /></div>)}</div><button onClick={() => update('projects', [...data.projects, emptyProject()])} className="flex items-center gap-1 text-xs font-bold text-cyan-300"><Plus className="h-4 w-4" /> Add More</button></Section><Section title="Skills"><ListEditor label="Technical Skills" values={data.skills} onChange={(value) => update('skills', value)} /></Section><Section title="Additional Details"><ListEditor label="Soft Skills" values={data.softSkills} onChange={(value) => update('softSkills', value)} /><ListEditor label="Languages" values={data.languages} onChange={(value) => update('languages', value)} /><ListEditor label="Certifications" values={data.certifications} onChange={(value) => update('certifications', value)} /><ListEditor label="Key Strengths" values={data.strengths} onChange={(value) => update('strengths', value)} /><div><label className="mb-1 block text-xs font-mono text-slate-400">Career Goals</label><textarea rows="3" className={inputClass} value={data.careerGoals} onChange={(event) => update('careerGoals', event.target.value)} /></div></Section><div className="flex justify-end"><button onClick={generateResume} className="flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-black text-dark-950">Generate Resume <ArrowRight className="h-4 w-4" /></button></div></div>}
  {activeTab === 'download' && <div className="space-y-5"><div className="flex flex-wrap justify-between gap-3"><p className="text-sm text-slate-300">Review your generated resume, or return to edit your details before downloading.</p><div className="flex gap-2"><button onClick={() => setActiveTab('editor')} className="rounded-xl border border-cyan-400/50 px-4 py-2 text-xs font-bold text-cyan-300">Edit Details</button><button onClick={downloadResume} className="flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-dark-950"><Download className="h-4 w-4" /> Download Resume</button></div></div><div className="overflow-x-auto rounded-2xl bg-slate-800 p-2"><ResumeDocument data={data} documentRef={documentRef} /></div></div>}
  <div className="flex items-center justify-between pt-2"><button onClick={() => onNavigate('ai-projects')} className="rounded-xl border border-cyan-500/20 bg-dark-850 px-4 py-2 text-xs text-slate-300">← Previous: Topic 5 AI Projects</button><button onClick={() => onNavigate('spoken-english')} className="flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-dark-950">Next: Topic 7 <ArrowRight className="h-4 w-4" /></button></div></div>;
}
