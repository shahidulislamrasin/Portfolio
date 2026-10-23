/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import {
  Sun,
  Moon,
  Copy,
  Check,
  RotateCcw,
  ExternalLink,
  Mail,
  Phone,
  MessageCircle,
  Award,
  Sparkles,
} from 'lucide-react';
import {
  PORTFOLIO_DATA,
  CHAT_MESSAGES,
  FACTS,
  FIT_ITEMS,
  SKILL_CATEGORIES,
  PLATFORMS,
  LEARNER_GROUPS,
  SUPPORT_CALL_STEPS,
  APPLICATION_IDEAS,
  CERTIFICATES,
} from './data/portfolioData';

export default function App() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [chatKey, setChatKey] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedTemplate, setCopiedTemplate] = useState<boolean>(false);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('shahidul_theme') as 'light' | 'dark' | 'system' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme('system');
    }
  }, []);

  const applyTheme = (selectedTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (selectedTheme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (selectedTheme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('shahidul_theme', nextTheme);
    applyTheme(nextTheme);
  };

  // Scroll reveal observer
  useEffect(() => {
    const elements = document.querySelectorAll('.rv');
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    } else {
      elements.forEach((el) => el.classList.add('in'));
    }
  }, []);

  // Keyboard navigation for tabs
  const handleKeyDownTab = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % 4;
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + 4) % 4;
      e.preventDefault();
    }
    if (nextIndex !== index) {
      setActiveTab(nextIndex);
      tabsRef.current[nextIndex]?.focus();
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyTemplate = () => {
    const templateText = `Subject: Let’s get you back on track, one small step at a time

Hi [Name],

I noticed you haven’t been able to submit the last two assignments, and I wanted to check in. Falling behind happens to many learners, and it is completely fixable.

Here is a simple plan for this week:
1. Re-watch only the [topic] module (about 40 minutes), nothing else.
2. Solve the two easiest practice problems and share where you got stuck.
3. Join our short call on [day/time] so we can go through the hard parts together.

If anything is unclear or something outside the course is getting in the way, just reply here. I am happy to help.

Warm regards,
Shahidul Islam
Student Relationship Team, Phitron`;
    navigator.clipboard.writeText(templateText);
    setCopiedTemplate(true);
    setTimeout(() => setCopiedTemplate(false), 2200);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--line)',
        }}
      >
        <div className="wrap flex items-center justify-between flex-wrap py-2.5 gap-y-2 gap-x-4">
          <a
            href="#"
            className="text-[18px] font-extrabold tracking-tight no-underline text-[var(--ink)] hover:text-[var(--teal)] transition-colors"
            style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
          >
            {PORTFOLIO_DATA.name}
          </a>

          <div className="flex items-center gap-4 sm:gap-5 text-[15px] font-medium flex-wrap max-w-full overflow-x-auto no-scrollbar py-0.5">
            <a href="#about" className="no-underline text-[var(--muted)] hover:text-[var(--teal)] transition-colors">
              About
            </a>
            <a href="#fit" className="no-underline text-[var(--muted)] hover:text-[var(--teal)] transition-colors">
              Why me
            </a>
            <a href="#problem" className="no-underline text-[var(--muted)] hover:text-[var(--teal)] transition-colors">
              Problem solving
            </a>
            <a href="#help" className="no-underline text-[var(--muted)] hover:text-[var(--teal)] transition-colors">
              How I’d help
            </a>
            <a href="#certs" className="no-underline text-[var(--muted)] hover:text-[var(--teal)] transition-colors">
              Certificates
            </a>
            <a href="#contact" className="no-underline text-[var(--muted)] hover:text-[var(--teal)] transition-colors">
              Contact
            </a>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={`Current theme: ${theme}. Click to switch theme`}
              title={`Switch theme (Current: ${theme})`}
              className="p-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)] hover:text-[var(--teal)] transition-all cursor-pointer flex items-center justify-center ml-1"
            >
              {theme === 'dark' ? (
                <Moon className="w-4 h-4 text-[var(--teal)]" />
              ) : theme === 'light' ? (
                <Sun className="w-4 h-4 text-[var(--amber)]" />
              ) : (
                <Sparkles className="w-4 h-4 text-[var(--muted)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="hero pt-10 sm:pt-14 pb-10">
        <div className="wrap grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-8 md:gap-10 items-center">
          <div>
            {/* Candidate Photo & Info */}
            <div className="flex items-center gap-3.5 mb-4">
              <img
                src="/shahidul.jpg"
                alt={PORTFOLIO_DATA.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-3 border-[var(--teal)] shadow-md"
                style={{ objectPosition: '50% 15%' }}
              />
              <div>
                <p className="text-sm sm:text-base text-[var(--muted)] font-semibold m-0">
                  B.Sc. in CSE • RMSTU • Phitron 8th Batch
                </p>
              </div>
            </div>

            <h1
              className="font-extrabold tracking-[-0.02em] text-[var(--ink)] text-[clamp(36px,6.5vw,72px)]"
              style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              {PORTFOLIO_DATA.name}
            </h1>
            <p className="role text-[17px] sm:text-[19px] text-[var(--muted)] max-w-[30em] mt-3.5 mb-0">
              CSE student and former Phitron 8th Batch learner, applying as{' '}
              <strong className="text-[var(--ink)] font-semibold">Student Relationship Executive</strong>. I listen
              first, then help with small, clear next steps.
            </p>
            <div className="cta flex flex-wrap gap-3 mt-6 sm:mt-7">
              <a
                className="btn p inline-flex items-center justify-center px-6 py-3 rounded-full font-bold no-underline text-white transition-transform hover:-translate-y-0.5 text-center shadow-xs"
                style={{ backgroundColor: 'var(--teal)', color: '#ffffff', borderColor: 'var(--teal)' }}
                href="#help"
              >
                See my sample work
              </a>
              <a
                className="btn inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold no-underline border-2 border-[var(--teal)] text-[var(--teal)] hover:bg-[var(--teal-soft)] transition-transform hover:-translate-y-0.5 text-center"
                href={`mailto:${PORTFOLIO_DATA.email}`}
              >
                Email me
              </a>
            </div>
          </div>

          {/* Interactive Chat Card */}
          <div
            className="chat bg-[var(--surface)] border border-[var(--line)] rounded-[22px] p-4 sm:p-5"
            style={{ boxShadow: '0 18px 40px -22px rgba(15, 60, 70, 0.45)' }}
            aria-label="Example of how I reply to a learner"
          >
            <header className="flex items-center justify-between pb-3 border-b border-[var(--line)] mb-3.5">
              <div className="flex items-center gap-3">
                <img
                  src="/shahidul.jpg"
                  alt={PORTFOLIO_DATA.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[var(--amber)] shadow-xs"
                  style={{ objectPosition: '50% 15%' }}
                />
                <div>
                  <b
                    className="block text-[16px] text-[var(--ink)]"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  >
                    {PORTFOLIO_DATA.name}
                  </b>
                  <span className="block text-[13px] text-[var(--muted)] leading-tight">{PORTFOLIO_DATA.roleTeam}</span>
                </div>
              </div>

              {/* Replay Chat Animation */}
              <button
                onClick={() => setChatKey((k) => k + 1)}
                className="text-[12px] flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--teal)] hover:bg-[var(--teal-soft)] transition-colors cursor-pointer"
                title="Replay conversation animation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Replay</span>
              </button>
            </header>

            {/* Conversation Messages */}
            <div key={chatKey} className="msgs flex flex-col gap-2.5 min-h-[300px]">
              {CHAT_MESSAGES.map((msg, idx) => {
                const isStudent = msg.sender === 'student';
                return (
                  <div
                    key={idx}
                    className={`m px-3.5 py-2.5 rounded-[16px] text-[15px] sm:text-[15.5px] leading-relaxed max-w-[88%] ${
                      isStudent
                        ? 'l bg-[var(--bubble)] text-[var(--ink)] rounded-bl-[4px] self-start'
                        : 'r bg-[var(--teal)] text-[var(--bg)] rounded-br-[4px] self-end'
                    }`}
                    style={{
                      opacity: 0,
                      transform: 'translateY(8px)',
                      animation: `pop 0.5s ease forwards ${msg.timeDelay}s`,
                    }}
                  >
                    {msg.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* About Section */}
        <section id="about" className="about rv py-10 sm:py-14">
          <div className="wrap">
            <h2
              className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-2 text-[var(--ink)]"
              style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              A little about me
            </h2>
            <p className="max-w-[44em] mb-3.5 text-[var(--ink)]">
              I am a Computer Science and Engineering student at Rangamati Science and Technology University (RMSTU), in
              my 3rd semester with a CGPA of 3.63 out of 4.00.
            </p>
            <p className="max-w-[44em] mb-3.5 text-[var(--ink)]">
              I learn programming with C and C++ and practice problem solving on Codeforces, LeetCode and CodeChef. Many
              times I got stuck on a problem for a long time. I know how that feels, and I know how much it helps when
              someone explains slowly and kindly.
            </p>
            <p className="max-w-[44em] mb-3.5 text-[var(--ink)]">
              That is why I want to join Phitron: to listen to students, understand their real problem, and help with
              simple next steps, with a smile.
            </p>

            {/* Fact Cards */}
            <div className="facts grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-3 mt-5 sm:mt-6">
              {FACTS.map((fact, i) => (
                <div key={i} className="fact bg-[var(--surface)] border border-[var(--line)] rounded-[14px] p-3 sm:px-4.5 sm:py-3 flex-1 min-w-[140px]">
                  <b
                    className="block text-[19px] sm:text-[24px] font-bold text-[var(--teal)] leading-tight"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  >
                    {fact.value}
                  </b>
                  <span className="text-[13px] sm:text-[14px] text-[var(--muted)]">{fact.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Me / Fit Section */}
        <section id="fit" className="rv py-10 sm:py-14">
          <div className="wrap">
            <h2
              className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-2 text-[var(--ink)]"
              style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              Why I think I am a good fit
            </h2>
            <p className="sub text-[var(--muted)] mb-6 sm:mb-7 max-w-[40em]">
              What Phitron is looking for, and what I bring.
            </p>

            <div className="fit grid gap-0 border border-[var(--line)] rounded-[18px] overflow-hidden bg-[var(--surface)] shadow-xs">
              {FIT_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className={`grid grid-cols-1 md:grid-cols-[240px_1fr] gap-1.5 md:gap-6 p-4 sm:p-5 transition-colors hover:bg-[var(--teal-soft)] ${
                    idx > 0 ? 'border-t border-[var(--line)]' : ''
                  }`}
                >
                  <h3
                    className="text-[17px] sm:text-[18px] font-bold text-[var(--ink)]"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  >
                    {item.title}
                  </h3>
                  <p className="m-0 text-[var(--muted)] text-[15.5px] sm:text-[16.5px]">
                    {item.linkText && item.linkHref ? (
                      <>
                        {item.description.replace(item.linkText, '')}
                        <a href={item.linkHref} className="font-medium hover:underline inline-flex items-center gap-0.5">
                          {item.linkText}
                        </a>
                        .
                      </>
                    ) : (
                      item.description
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="rv py-10 sm:py-14">
          <div className="wrap">
            <h2
              className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-2 text-[var(--ink)]"
              style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              My skills
            </h2>
            <p className="sub text-[var(--muted)] mb-6 sm:mb-7 max-w-[40em]">
              Technical knowledge plus the people skills support work needs.
            </p>

            <div className="cols grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4.5">
              {SKILL_CATEGORIES.map((cat, i) => (
                <div key={i} className="card bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-5 sm:p-5.5">
                  <h3
                    className="text-[19px] sm:text-[20px] font-bold mb-3 text-[var(--ink)]"
                    style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                  >
                    {cat.title}
                  </h3>
                  <ul className="tags flex flex-wrap gap-2 p-0 m-0 list-none">
                    {cat.skills.map((skill, sIdx) => (
                      <li
                        key={sIdx}
                        className="bg-[var(--teal-soft)] text-[var(--ink)] px-3 py-1 rounded-full text-[14px] sm:text-[14.5px] font-medium"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Solving Section */}
        <section id="problem" className="rv py-10 sm:py-14">
          <div className="wrap">
            <h2
              className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-2 text-[var(--ink)]"
              style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              Problem solving
            </h2>
            <ul className="pts pl-5 max-w-[46em] text-[var(--ink)] space-y-1.5 my-3.5">
              <li>
                I completed the Phitron Problem Solving course as a Phitron 8th Batch student. I learned to think step by
                step, and I know how a Phitron student feels in class.
              </li>
              <li>
                I practice algorithm problems regularly, which improves my logic, debugging and C++ solutions.
              </li>
              <li>I solved one problem in my first ICPC contest (2025).</li>
            </ul>

            {/* Platform links */}
            <div className="plat grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              {PLATFORMS.map((plat, i) => (
                <a
                  key={i}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block no-underline text-[var(--ink)] bg-[var(--surface)] border border-[var(--line)] border-l-[5px] border-l-[var(--amber)] rounded-[14px] p-4 sm:px-4.5 sm:py-4 transition-transform hover:-translate-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <b
                      className="text-[19px] sm:text-[20px] font-bold"
                      style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                    >
                      {plat.name}
                    </b>
                    <ExternalLink className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--teal)] transition-colors" />
                  </div>
                  <span className="text-[var(--teal)] font-semibold text-[15px]">{plat.badge}</span>
                  <small className="block text-[var(--muted)] text-[13.5px] mt-1 break-all">{plat.displayUrl}</small>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* How I'd help Phitron students */}
        <section id="help" className="rv py-10 sm:py-14">
          <div className="wrap">
            <h2
              className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-2 text-[var(--ink)]"
              style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              How I would help Phitron students
            </h2>
            <p className="note text-[14.5px] text-[var(--muted)] mb-4.5">
              These are samples I made for this application to show how I would work. They are not from a past job.
            </p>

            {/* Tabs Bar */}
            <div className="tabs flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-4" role="tablist">
              {['Sample email', 'Support call', 'Grouping learners', 'My ideas'].map((tabLabel, idx) => {
                const isSelected = activeTab === idx;
                return (
                  <button
                    key={idx}
                    ref={(el) => {
                      tabsRef.current[idx] = el;
                    }}
                    role="tab"
                    id={`t${idx}`}
                    aria-controls={`p${idx}`}
                    aria-selected={isSelected}
                    onClick={() => setActiveTab(idx)}
                    onKeyDown={(e) => handleKeyDownTab(e, idx)}
                    className={`font-semibold text-[15px] px-4 py-2.5 rounded-full border-2 transition-all cursor-pointer whitespace-nowrap flex-none ${
                      isSelected
                        ? 'bg-[var(--teal)] border-[var(--teal)] text-[var(--bg)] shadow-xs'
                        : 'border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--teal)]'
                    }`}
                  >
                    {tabLabel}
                  </button>
                );
              })}
            </div>

            {/* Panel 0: Sample Email */}
            {activeTab === 0 && (
              <div
                className="panel mail bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-5 sm:p-6 animate-pop max-w-[44em]"
                role="tabpanel"
                id="p0"
                aria-labelledby="t0"
              >
                <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-[var(--line)] mb-3">
                  <div className="subj font-semibold text-[16.5px] text-[var(--ink)]">
                    Subject: Let’s get you back on track, one small step at a time
                  </div>
                  <button
                    onClick={handleCopyTemplate}
                    className="flex items-center gap-1.5 text-[13px] px-3 py-1 rounded-full border border-[var(--line)] text-[var(--muted)] hover:text-[var(--teal)] hover:bg-[var(--teal-soft)] transition-colors cursor-pointer flex-none"
                    title="Copy sample email template"
                  >
                    {copiedTemplate ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="mb-2.5 text-[var(--ink)]">Hi [Name],</p>
                <p className="mb-2.5 text-[var(--ink)]">
                  I noticed you haven’t been able to submit the last two assignments, and I wanted to check in. Falling
                  behind happens to many learners, and it is completely fixable.
                </p>
                <p className="mb-2.5 text-[var(--ink)]">Here is a simple plan for this week:</p>
                <ol className="steps pl-5 space-y-1 my-2 text-[var(--ink)] list-decimal">
                  <li>Re-watch only the [topic] module (about 40 minutes), nothing else.</li>
                  <li>Solve the two easiest practice problems and share where you got stuck.</li>
                  <li>Join our short call on [day/time] so we can go through the hard parts together.</li>
                </ol>
                <p className="mb-2.5 text-[var(--ink)]">
                  If anything is unclear or something outside the course is getting in the way, just reply here. I am happy
                  to help.
                </p>
                <p className="mt-4 mb-0 text-[var(--ink)]">
                  Warm regards,
                  <br />
                  Shahidul Islam
                  <br />
                  <span className="text-[var(--muted)]">Student Relationship Team, Phitron</span>
                </p>
              </div>
            )}

            {/* Panel 1: Support Call Flow */}
            {activeTab === 1 && (
              <div
                className="panel bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-5 sm:p-6 animate-pop"
                role="tabpanel"
                id="p1"
                aria-labelledby="t1"
              >
                <ol className="flow list-none p-0 m-0 grid gap-3">
                  {SUPPORT_CALL_STEPS.map((step, idx) => (
                    <li key={idx} className="pl-4 border-l-4 border-[var(--teal)] py-1">
                      <b
                        className="block text-[17px] text-[var(--ink)]"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                      >
                        {idx + 1}. {step.title}
                      </b>
                      <span className="text-[var(--muted)] text-[15.5px]">{step.detail}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Panel 2: Grouping Learners */}
            {activeTab === 2 && (
              <div
                className="panel bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-5 sm:p-6 animate-pop"
                role="tabpanel"
                id="p2"
                aria-labelledby="t2"
              >
                <div className="grp grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {LEARNER_GROUPS.map((grp, idx) => (
                    <div key={idx} className="border border-[var(--line)] rounded-[14px] p-4 bg-[var(--bg)]">
                      <h4
                        className="m-0 mb-1.5 text-[18px] font-bold text-[var(--ink)]"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                      >
                        {grp.name}
                      </h4>
                      <p className="my-1 text-[15px] text-[var(--muted)]">
                        <b className="text-[var(--ink)]">Example criteria:</b> {grp.criteria}
                      </p>
                      <p className="my-1 text-[15px] text-[var(--muted)]">
                        <b className="text-[var(--ink)]">Action:</b> {grp.action}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Panel 3: My Ideas */}
            {activeTab === 3 && (
              <div
                className="panel bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-5 sm:p-6 animate-pop"
                role="tabpanel"
                id="p3"
                aria-labelledby="t3"
              >
                <ul className="pts pl-5 max-w-[46em] text-[var(--ink)] space-y-2">
                  {APPLICATION_IDEAS.map((idea, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {idea}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certs" className="rv py-10 sm:py-14">
          <div className="wrap">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-[var(--teal-soft)] flex items-center justify-center text-[var(--teal)] shadow-xs">
                <Award className="w-6 h-6 text-[var(--teal)]" />
              </div>
              <h2
                className="text-[clamp(28px,4.5vw,40px)] font-extrabold text-[var(--ink)] m-0"
                style={{ fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
              >
                Certificates
              </h2>
            </div>
            <p className="sub text-[var(--muted)] mb-6 sm:mb-7 max-w-[40em]">
              Both open in Google Drive in a new tab.
            </p>

            <div className="certs grid grid-cols-1 sm:grid-cols-2 gap-5">
              {CERTIFICATES.map((cert, idx) => (
                <div
                  key={idx}
                  className="cert flex flex-col gap-3 items-start bg-[var(--surface)] border-2 border-[var(--line)] rounded-[18px] p-5 sm:p-6 shadow-xs hover:border-[var(--teal)] transition-all"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-[var(--teal-soft)]">
                        <Award className="w-5 h-5 text-[var(--teal)]" />
                      </div>
                      <h3
                        className="text-[21px] sm:text-[23px] font-bold text-[var(--ink)]"
                        style={{ fontFamily: '"Bricolage Grotesque", sans-serif' }}
                      >
                        {cert.title} Certificate
                      </h3>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[var(--teal-soft)] text-[var(--teal)]">
                      Official
                    </span>
                  </div>
                  <p className="m-0 text-[var(--muted)] text-[15.5px] leading-relaxed font-medium">
                    {cert.description}
                  </p>
                  <a
                    className="btn p inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold no-underline text-white transition-transform hover:-translate-y-0.5 mt-2 shadow-xs"
                    style={{ backgroundColor: 'var(--teal)', color: '#ffffff', borderColor: 'var(--teal)' }}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span style={{ color: '#ffffff' }}>View certificate</span>
                    <ExternalLink className="w-4 h-4 text-white" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact ("Let's talk") Section */}
        <section id="contact" className="contact rv py-10 sm:py-14 text-center">
          <div
            className="wrap bg-[var(--teal)] text-[var(--bg)] rounded-[24px] sm:rounded-[28px] p-8 sm:p-12 max-w-[960px] mx-auto shadow-md"
            style={{ color: 'var(--bg)' }}
          >
            <h2
              className="text-[clamp(28px,4.5vw,40px)] font-extrabold mb-3"
              style={{ color: 'var(--bg)', fontFamily: '"Bricolage Grotesque", Figtree, sans-serif' }}
            >
              Let’s talk
            </h2>
            <p className="max-w-[32em] mx-auto mb-6 text-[17px] opacity-95">
              I would be happy to talk with you and show how I can help Phitron students.
            </p>

            <div className="cta flex flex-wrap justify-center items-center gap-3">
              <div className="inline-flex items-stretch rounded-full overflow-hidden shadow-xs border-2" style={{ borderColor: 'var(--bg)' }}>
                <a
                  className="btn p inline-flex items-center justify-center gap-2 px-5 py-3 font-semibold no-underline transition-opacity hover:opacity-90"
                  style={{ background: 'var(--bg)', color: 'var(--teal)' }}
                  href={`mailto:${PORTFOLIO_DATA.email}`}
                >
                  <Mail className="w-4 h-4" />
                  <span>{PORTFOLIO_DATA.email}</span>
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 flex items-center justify-center transition-colors cursor-pointer border-l"
                  style={{ background: 'var(--bg)', color: 'var(--teal)', borderColor: 'var(--line)' }}
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                className="btn inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-semibold no-underline transition-transform hover:-translate-y-0.5 border-2"
                style={{ borderColor: 'var(--bg)', color: 'var(--bg)' }}
                href={PORTFOLIO_DATA.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp {PORTFOLIO_DATA.phone}</span>
              </a>

              <a
                className="btn inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-full font-semibold no-underline transition-transform hover:-translate-y-0.5 border-2"
                style={{ borderColor: 'var(--bg)', color: 'var(--bg)' }}
                href={`tel:${PORTFOLIO_DATA.phoneRaw}`}
              >
                <Phone className="w-4 h-4" />
                <span>Call</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="text-center py-7 sm:py-9 px-5 text-[var(--muted)] text-[14.5px] border-t border-[var(--line)] mt-8">
        <p className="m-0 mb-1.5">
          © {PORTFOLIO_DATA.name}, {PORTFOLIO_DATA.location}
        </p>
        <div className="flex justify-center items-center gap-4">
          <a
            href={PORTFOLIO_DATA.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-[var(--teal)] font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-[var(--line)]">•</span>
          <a
            href={PORTFOLIO_DATA.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-[var(--teal)] font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
