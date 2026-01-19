import MemberCard from '@/components/MemberCard';

const currentEboard = [
  {
    role: "President",
    name: "Anzhelika Kurnikova",
    major: "Computer Science",
    year: "Senior",
    linkedin: "https://www.linkedin.com/in/anzhelika-kurnikova/",
    imageUrl: "/members/2025/anzhelika.webp"
  },
  {
    role: "Vice President",
    name: "Elan Berezovskiy",
    major: "Computer Engineering",
    year: "Sophomore",
    linkedin: "https://www.linkedin.com/in/elan-berezovskiy-5a7618263/",
    imageUrl: "/members/2025/elan.webp"
  },
  {
    role: "Treasurer",
    name: "Zarina Zatildayeva",
    major: "Biomedical Sciences",
    year: "Senior",
    linkedin: "https://www.linkedin.com/in/zarina-zatildayeva-b928b826a/",
    imageUrl: "/members/2025/zarina.webp"
  },
  {
    role: "Media Manager",
    name: "Doung (Eric) Mai",
    major: "Computer Science",
    year: "Senior",
    linkedin: "https://www.linkedin.com/in/duongmai127/",
    imageUrl: "/members/2025/eric.webp"
  },
  {
    role: "Media Manager",
    name: "Kimberly Bahena",
    major: "Artificial Intelligence",
    year: "Sophomore",
    linkedin: "https://www.linkedin.com/in/kimberly-bahena-03a310325/",
    imageUrl: "/members/2025/kimberly.webp"
  },
  {
    role: "Outreach Chair",
    name: "Egor Kharitonov",
    major: "Computer Science",
    year: "Junior",
    linkedin: "https://www.linkedin.com/in/kharitonov-egor/",
    imageUrl: "/members/2025/egor.webp"
  },
  {
    role: "Marketing Chair",
    name: "Cesar Calderon",
    major: "Mechanical Engineering",
    year: "Sophomore",
    linkedin: "https://www.linkedin.com/in/cesarcld/",
    imageUrl: "/members/2025/cesar.webp"
  },
  {
    role: "Marketing Assistant",
    name: "Leonardo Henriques",
    major: "Computer Science",
    year: "Freshman",
    linkedin: "https://www.linkedin.com/in/leonardo-hln/",
    imageUrl: "/members/2025/leonardo.webp"
  },
  {
    role: "Marketing Assistant",
    name: "Rodrigo Molero",
    major: "Computer Engineering",
    year: "Junior",
    linkedin: "https://www.linkedin.com/in/rodrigomoleroroca",
    imageUrl: "/members/2025/rodrigo.webp"
  },
  {
    role: "Marketing Assistant",
    name: "Laura Schneider",
    major: "Information Technology",
    year: "Freshman",
    linkedin: "https://www.linkedin.com/in/-laura-schneider/",
    imageUrl: "/members/2025/laura.webp"
  },
  {
    role: "Events Chair",
    name: "Bernardo Beligolli",
    major: "Computer Science",
    year: "Freshman",
    linkedin: "https://www.linkedin.com/in/bernardo-beligolli-02536a387/",
    imageUrl: "/members/2025/bernardo.webp"
  },
  {
    role: "Events Assistant",
    name: "Adelina Albert",
    major: "Artificial Intelligence",
    year: "Freshman",
    linkedin: "https://www.linkedin.com/in/adelina-albert-3906a3386/",
    imageUrl: "/members/2025/adelina.webp"
  },
  {
    role: "Tech Lead",
    name: "Boburjon Usmonov",
    major: "Computer Science",
    year: "Senior",
    linkedin: "https://www.linkedin.com/in/boburjonusmonov/",
    imageUrl: "/members/2025/boburjon.webp"
  },
  {
    role: "Tech Lead",
    name: "Caio Bahlis",
    major: "Computer Science",
    year: "Junior",
    linkedin: "https://www.linkedin.com/in/cbahlis/",
    imageUrl: "/members/2025/caio.webp"
  },
  {
    role: "Tech Lead",
    name: "Sebastian Pulgar",
    major: "Information Technology",
    year: "Sophomore",
    linkedin: "https://www.linkedin.com/in/sebastian-pulgar-9a8b1429b/",
    imageUrl: "/members/2025/sebastian.webp"
  },
  {
    role: "Tech Lead",
    name: "Nadia Korostyleva",
    major: "Biomedical Engineering",
    year: "Master's",
    linkedin: "https://www.linkedin.com/in/nadezhda890/",
    imageUrl: "/members/2025/nadia.webp"
  },
  {
    role: "Webmaster",
    name: "Sara Perez-Soto",
    major: "Computer Science",
    year: "Junior",
    linkedin: "https://www.linkedin.com/in/sarapsoto/",
    imageUrl: "/members/2025/sara.webp"
  },
];

export default function Page() {
  return (
    <main className="min-h-screen pt-24 pb-12 px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Meet the Team</h1>
          {/* Future dropdown for year choosing */}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {currentEboard.map((member, index) => (
            <MemberCard key={index} {...member} />
          ))}
        </div>
      </div>
    </main>
  );
}
