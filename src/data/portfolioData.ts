export interface FactItem {
  value: string;
  label: string;
}

export interface FitItem {
  title: string;
  description: string;
  linkText?: string;
  linkHref?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface PlatformProfile {
  name: string;
  badge: string;
  url: string;
  displayUrl: string;
}

export interface LearnerGroup {
  name: string;
  criteria: string;
  action: string;
}

export const PORTFOLIO_DATA = {
  name: "Shahidul Islam",
  roleTitle: "Student Relationship Executive Application",
  headline: "CSE student and former Phitron 8th Batch learner, applying as Student Relationship Executive. I listen first, then help with small, clear next steps.",
  roleTeam: "Student Relationship Team, Phitron",
  email: "ishahed494@gmail.com",
  phone: "+880 1860-695313",
  phoneRaw: "+8801860695313",
  whatsappUrl: "https://wa.me/8801860695313",
  githubUrl: "https://github.com/shahidulislamrasin",
  linkedinUrl: "https://linkedin.com/in/shahidulislamrasin",
  location: "Chattogram, Bangladesh",
  avatar: "/shahidul.jpg",
};

export const CHAT_MESSAGES = [
  {
    sender: "student",
    text: "I missed two assignments and I feel lost.",
    timeDelay: 0.5,
  },
  {
    sender: "shahidul",
    text: "Thanks for telling me. It happens to many learners, and it is fixable. Where did you get stuck first?",
    timeDelay: 1.6,
  },
  {
    sender: "student",
    text: "Loops. After that nothing made sense.",
    timeDelay: 3.0,
  },
  {
    sender: "shahidul",
    text: "Let’s do just one thing this week: re-watch the loops module (40 min) and solve two easy problems.",
    timeDelay: 4.3,
  },
  {
    sender: "shahidul",
    text: "Then we go through the hard parts together on a short call. 🙂",
    timeDelay: 5.6,
  },
];

export const FACTS: FactItem[] = [
  {
    value: "3.63 / 4.00",
    label: "CGPA, B.Sc. CSE, RMSTU",
  },
  {
    value: "4.83 / 5.00",
    label: "HSC Science GPA, 2023",
  },
  {
    value: "Phitron 8th",
    label: "Batch student",
  },
  {
    value: "ICPC 2025",
    label: "Solved 1 problem in first contest",
  },
];

export const FIT_ITEMS: FitItem[] = [
  {
    title: "Listening and understanding problems",
    description:
      "I like to break a big problem into small steps. I use the same way to find out what is really stopping a student, before I suggest a solution.",
  },
  {
    title: "Clear and kind communication",
    description:
      "I speak and write in a clear, polite and simple way, and I check the small details. See my sample email.",
    linkText: "sample email",
    linkHref: "#help",
  },
  {
    title: "Phitron and CSE background",
    description:
      "I was a Phitron 8th Batch student and I have a Phitron certificate. I know C, C++, OOP, DSA and Git/GitHub, so I can understand the technical questions students ask.",
    linkText: "Phitron certificate",
    linkHref: "#certs",
  },
  {
    title: "Teamwork and new ideas",
    description:
      "I work with classmates on academic projects and programming tasks, and I like to share small ideas that make teamwork better.",
  },
  {
    title: "Using student data",
    description:
      "Problem solving taught me to think clearly and logically. See how I would group students and help each group.",
    linkText: "how I would group students",
    linkHref: "#help",
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Technical",
    skills: ["C", "C++", "OOP", "Data Structures", "Algorithms", "Git", "GitHub", "VS Code"],
  },
  {
    title: "Support and people skills",
    skills: ["Listening", "Clear, polite communication", "Patience", "Explaining next steps", "Attention to detail"],
  },
  {
    title: "Working style",
    skills: ["Step-by-step troubleshooting", "Time management", "Careful work", "Teamwork", "Ready to learn"],
  },
  {
    title: "Interests",
    skills: ["Software development", "Competitive programming", "Artificial intelligence", "Machine learning"],
  },
];

export const PLATFORMS: PlatformProfile[] = [
  {
    name: "Codeforces",
    badge: "Rating 956",
    url: "https://codeforces.com/profile/Shahidul_Islam_",
    displayUrl: "codeforces.com/profile/Shahidul_Islam_",
  },
  {
    name: "LeetCode",
    badge: "Active",
    url: "https://leetcode.com/u/SHAHIDUL_ISLAM1",
    displayUrl: "leetcode.com/u/SHAHIDUL_ISLAM1",
  },
  {
    name: "CodeChef",
    badge: "2-star",
    url: "https://codechef.com/users/shah_ed_27",
    displayUrl: "codechef.com/users/shah_ed_27",
  },
];

export const LEARNER_GROUPS: LearnerGroup[] = [
  {
    name: "Inactive",
    criteria: "no login or class activity for 7+ days",
    action: "friendly check-in email, then a call",
  },
  {
    name: "Falling behind",
    criteria: "missed 2+ assignments in a row",
    action: "personal study plan and call",
  },
  {
    name: "Repeated doubts",
    criteria: "same topic raised in feedback or the Facebook group",
    action: "share the topic with the team; suggest a revision resource or session",
  },
];

export const SUPPORT_CALL_STEPS = [
  {
    title: "Welcome",
    detail: "Greet warmly and let the learner talk first without interrupting.",
  },
  {
    title: "Understand",
    detail: "Ask open questions (“Where exactly did you get stuck?”) and repeat back what I heard.",
  },
  {
    title: "Find the cause",
    detail: "Separate technical gaps, time problems and motivation problems.",
  },
  {
    title: "Agree a small plan",
    detail: "Two or three concrete steps for the next week, with a date.",
  },
  {
    title: "Follow up",
    detail: "Send a short summary by email and check progress at the agreed time.",
  },
];

export const APPLICATION_IDEAS = [
  "A short “first week” checklist for new batches, so learners know exactly what to do.",
  "A weekly Facebook post that answers the most common doubts from the previous week.",
  "Small peer study groups for learners who are at the same stage.",
];

export const CERTIFICATES = [
  {
    title: "Phitron",
    description: "Phitron 8th Batch, Problem Solving course.",
    url: "https://drive.google.com/file/d/1hGcG40xjkWlJtsBDZOAiYj9VS6_mFz42/view",
  },
  {
    title: "CodeChef",
    description: "Competitive programming certificate.",
    url: "https://drive.google.com/file/d/1WeTm4WIT52lzDcpUVyBRU__jAanUTpWi/view",
  },
];
