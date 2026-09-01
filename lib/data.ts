// ============================================================
// Portfolio Data — Cinematic Filmmaker Edition
// ============================================================

export const PERSONAL = {
  name: "Saran Siddarth",
  title: "Filmmaker & Visual Storyteller",
  tagline: "I DON'T MAKE VIDEOS.",
  tagline2: "I CREATE CINEMATIC EXPERIENCES.",
  location: "Coimbatore",
  email: "saransid23@gmail.com",
  showreelUrl: "#showreel",
  github: "https://github.com/saransid23",
  linkedin: "https://www.linkedin.com/in/saran-siddarth-s-b49662371?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  instagram: "https://instagram.com",
  behance: "https://behance.net",
  twitter: "https://twitter.com",
  available: true,
};

export const ABOUT = {
  description: [
    "I’m a visual storyteller passionate about turning ideas into compelling experiences through video editing, photography, and videography. I believe every frame has a story to tell, and I use *creativity, composition, light, motion, and sound* to make those stories stand out.",
    "From creative content and advertisements to short form videos and photography, I approach every project with curiosity and attention to detail. For me, great visuals aren’t just about looking good — they’re about *creating an emotion, capturing a moment, and leaving a lasting impression.*",
    "I’m constantly experimenting with *new styles, techniques, and perspectives* to create visuals that feel authentic, engaging, and uniquely my own.",
  ],
};



export interface Experience {
  id: string;
  role: string;
  company: string;
  description: string;
}

export const EXPERIENCES: Experience[] = [
  {
    id: "exp-1",
    role: "Director of Photography",
    company: "Freelance / Independent",
    description:
      "Directing photography for commercial brands, short films, and documentary projects. Specializing in low-light and practical light cinematography.",
  },
  {
    id: "exp-2",
    role: "Video Editor & Colorist",
    company: "Creative Agency",
    description:
      "Cut and color graded commercial content for fashion brands, music artists, and event clients. Developed a signature high contrast, desaturated color signature.",
  },
];


export const SKILLS_MARQUEE = [
  "Cinematography",
  "Video Editing",
  "Color Grading",
  "Premiere Pro",
  "Capcut",
  "Storytelling",
  "Lightroom",
  "Photoshop",
  "Photograghy",
];


export const SERVICES = [
  {
    id: "filmmaking",
    title: "FILMMAKING",
    description:
      "Full-scale cinematic production from concept to final cut. Features, shorts, documentaries, and experimental work.",
    icon: "Film",
  },
  {
    id: "video editing",
    title: "VIDEO EDITING",
    description:
      "Narrative first editing that finds the story in the footage. Pacing, rhythm, tension every cut is intentional.",
    icon: "Scissors",
  },
  {
    id: "color-grading",
    title: "COLOR GRADING",
    description:
      "Signature cinematic color work in DaVinci Resolve. From naturalistic grades to bold, stylized looks.",
    icon: "Palette",
  },
  {
    id: "short-films",
    title: "SHORT FILMS",
    description:
      "Self initiated and collaborative short form fiction. The proving ground for every visual idea I want to push further.",
    icon: "Aperture",
  },
];


export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Showreel", href: "#showreel" },
  { label: "Services", href: "#services" },
  { label: "Expertise", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
