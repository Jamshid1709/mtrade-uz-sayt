// MTrade Academy — jamoamiz (bitta manba: Home "Mentorlarimiz" va /about "Bizning jamoa")
export interface Mentor {
  name: string;
  role: string;
  image: string;
  bio: string;
  experience: string;
  badgeId: string;
}

export const mentors: Mentor[] = [
  {
    name: "Odilbek",
    role: "CEO & Asoschisi",
    image: "/images/odilbek.webp",
    bio: "5 yillik tajriba, halol treyding yo'nalishi asoschisi. Professional treyder va investor.",
    experience: "5+ yil tajriba",
    badgeId: "MTRD·001",
  },
  {
    name: "Bunyodbek",
    role: "Professional treyder & Mentor",
    image: "/images/bunyodbek.webp",
    bio: "3+ yillik tajriba, 50+ dan ortiq o'quvchilarga ta'lim bergan professional mentor.",
    experience: "50+ o'quvchi",
    badgeId: "MTRD·002",
  },
  {
    name: "Jamshid",
    role: "Signal analitik",
    image: "/images/jamshid.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi. Bozor tahlili va strategiyalar.",
    experience: "Texnik analiz",
    badgeId: "MTRD·003",
  },
  {
    name: "Azizbek",
    role: "Tahlilchi",
    image: "/images/azizbek.webp",
    bio: "Texnik tahlil mutaxassisi, signal xizmati yetakchisi. Har bir signal — dalilga asoslangan tahlil.",
    experience: "Texnik analiz",
    badgeId: "MTRD·004",
  },
];
