
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GithubIcon from '@mui/icons-material/GitHub';

type ExplicitUndefined<T> = T extends React.ComponentType<any>
? T | undefined
: T extends Array<infer U>
? Array<U extends object ? ExplicitUndefined<U> : U>
: T extends object
? { [K in keyof T]: ExplicitUndefined<T[K]> | undefined }
: T | undefined;

interface ResumeData {
    name: string;
    avatar: string;
    contacts: {
        icon: React.ComponentType;
        label: string;
        value: string;
    }[];
    skills: {
        description: string;
        languages: {
            language: string,
            technologies?: {
                technology: string
            }[]
        }[];
    };
    websites: {
        label: string;
        icons: { 
            icon: React.ComponentType;
            url: string;
        }[]
    };
    education: {
        label: string;
        educations: {
            degree: string;
            date: string;
            school: string;
        }[]
    };
    experience: {
        label: string;
        experiences: {
            title: string;
            date: string;
            descriptions: {
                description: string
            }[];
        }[]};
    projects: {
        label: string;
        projects: Project[]
    };
    speakingLanguages: {
        speakingLanguage: string
    }[]

    readonly address: string;
}

interface Project {
    title: string;
    description: string;
    link: string;
    previewImage: string;
}

type ImageWithTags = [string, string[]];

const transformResumeDataToImageTags = (resumeData: ResumeData): ImageWithTags[] => {
    const imageTags: ImageWithTags[] = [];
  
    const addImage = (url: string, tags: string[]) => {
      if (url) {
        imageTags.push([url, tags]);
      }
    };
  
    addImage(resumeData.avatar, ['avatar']);
  
    resumeData.projects.projects.forEach((project: Project) => {
      addImage(project.previewImage, ['project', project.title]);
    });
  
    return imageTags;
};

const resumeData: ResumeData = {
    name: "Mikołaj Szczepański",
    avatar: "https://i.imgur.com/nyCKuaA.png",
    contacts: [
        { icon: PhoneIcon, label: "Phone", value: "+48 727 547 926" },
        { icon: EmailIcon, label: "Email", value: "szczepanskiamikolaj@gmail.com" },
        { icon: HomeIcon, label: "Address", value: "Korczyna 38-420, Dolińska 52" }
    ],
    skills: {
        description: "Languages and Technologies",
        languages: [
            {
                language: "Java",
                technologies: [
                    { technology: "Spring Boot" },
                    { technology: "jsoup" },
                    { technology: "Selenium WebDriver" }
                ]
            },
            {
                language: "JavaScript",
                technologies: [
                    { technology: "CRA" },
                    { technology: "Gatsby" },
                    { technology: "Express" },
                    { technology: "Passport" },
                    { technology: "React Bootstrap" },
                    { technology: "MUI" }
                ]
            },
            {
                language: "TypeScript"
            },
            {
                language: "SQL",
                technologies: [
                    { technology: "PostgreSQL" },
                    { technology: "SQLite" },
                ]
            },
            {
                language: "Docker",
            }
        ]
    },
    websites: {
        label: "Websites",
        icons: [
            { icon: GithubIcon, url: "https://github.com/szczepanskiamikolaj" },
            { icon: LinkedInIcon, url: "www.linkedin.com/in/mikołaj-szczepański-4810a1233" },
     ]
    },
    education: {
        label: "Education",
        educations: [
            {
                degree: "Technik Informatyk",
                date: "2020",
                school: "Zespół Szkół Elektrycznych i Ogólnokrztałcących w Krośnie"
            },
            {
                degree: "Inżynier Technologii Internetowych i Baz Danych",
                date: "2024",
                school: "Państwowa Akademia Nauk Stosowanych w Krośnie",
            },
        ]},
    experience: {
        label: "Experience",
        experiences: [
        {
            title: "Zniczplast",
            date: "2018, 2019",
            descriptions: [
                { description: "Production Machine Operator" },
            ]
        },
        {
            title: "Wojewódzki Szpital Podkarpacki im. Jana Pawła II w Krośnie, Dział Informatyczny",
            date: "2021",
            descriptions: [
                { description: "Internship" },
                { description: "Tech Support" },
            ]
        },
        {
            title: "INNERGO",
            date: "2022, 2023",
            descriptions: [
                { description: "Internship" }
            ]
        },
        {
            title: "Mikrotech S.A.",
            date: "2024",
            descriptions: [
                { description: "Internship" },
                { description: "Java Developer" }
            ]
        },
        {
            title: "BWI Poland Technologies",
            date: "2024",
            descriptions: [
                { description: "Line Feeder" },
                { description: "Material Handler" }
            ]
        },
        ]
    },
    projects: {
        label: "Projects",
        projects: [
        {
            title: "Tierlist Laboratory",
            description: "A clone of tiermaker.com, fullstack webapp made using Vite+React and Express.js. Featues Drag'n'Drop, image uploading, cropping, Google Sign-In and more.",
            link: "https://caddy-proxy-bj9b-production.up.railway.app",
            previewImage: "https://i.imgur.com/Lir8qOO.png"
        },
        {
            title: "Digital Attendance List",
            description: "Fullstack webapp made using Spring Boot and CRA, designed to handle user authentication, role-based access, and attendance management. The backend is fully integrated with a PostgreSQL database, using Hibernate for ORM",
            link: "https://github.com/szczepanskiamikolaj/lista-obecnosci-backend",
            previewImage: "https://i.imgur.com/IjCd4vi.png"
        },
    ],},
    speakingLanguages: [{ speakingLanguage: "Polish" }, { speakingLanguage: "English" }],

    get address(): string {
        const addressContact = this.contacts.find(contact => contact.label === "Address");
        return addressContact ? addressContact.value : "No Adress";
    }
};

const resumeDataPL: ExplicitUndefined<typeof resumeData> = {
    name: undefined,
    avatar: undefined,
    contacts: [
        { icon: undefined, label: "Telefon", value: undefined},
        { icon: EmailIcon, label: undefined, value: undefined },
        { icon: HomeIcon, label: "Adres", value: "Korczyna 38-420, Dolińska 52" }
    ],
    skills: {
        description: "Języki i Technologie",
        languages: [
            {
                language: undefined,
                technologies: [
                    {technology: undefined},
                    {technology: undefined},
                    {technology: undefined}
                ]
            },
            {
                language: undefined,
                technologies: [
                    {technology: undefined},
                    {technology: undefined},
                    {technology: undefined},
                    {technology: undefined},
                    {technology: undefined},
                    {technology: undefined}
                ]
            },
            {
                language: undefined
            },
            {
                language: undefined,
                technologies: [
                    {technology: undefined},
                    {technology: undefined},
                ]
            }
        ]
    },
    websites: {
        label: "Strony",
        icons: [
            { icon: undefined, url: undefined },
            { icon: undefined, url: undefined },
     ]
    },
    education: {
        label: "Edukacja",
        educations: [
            {
                degree: undefined,
                date: undefined,
                school: undefined
            },
            {
                degree: undefined,
                date: undefined,
                school: undefined,
            },
        ]
    },
    experience: {
        label: "Doświadczenie",
        experiences: 
        [
            {
                title: undefined,
                date: undefined,
                descriptions: [ 
                    {description: "Operator Maszyn"},
                ]
            },
            {
                title: undefined,
                date: undefined,
                descriptions: [ 
                    {description: "Praktykant"},
                    {description: "Wsparcie Techniczne,"},
                ]
            },
            {
                title: undefined,
                date: undefined,
                descriptions: [ 
                    {description: "Praktykant"}
                ]
            },
            {
                title: undefined,
                date: undefined,
                descriptions: [ 
                    {description: "Praktykant"},
                    {description: "Java Developer"}
                ]
            },
            {
                title: undefined,
                date: undefined,
                descriptions: [ 
                    {description: "Line Feeder"},
                    {description: "Obsługa Materiałów"}
                ]
            },
        ],
    },
    projects: {
        label: "Projekty", 
        projects: [
            {
                title: "Tierlist Laboratory",
                description: "Klon tiermaker.com, fullstackowa aplikacja webowa stworzona przy użyciu Vite+React i Express.js. Zawiera przeciąganie i upuszczanie, przesyłanie obrazów, przycinanie, logowanie kontem Google itd.",
                link: "https://caddy-proxy-production-2751.up.railway.app/",
                previewImage: ""
            },
            {
                title: "Digital Attendance List",
                description: "Fullstackowa aplikacja stworzona przy użyciu Spring Boot i CRA, zaprojektowana do uwierzytelniania użytkowników oraz dostępu opartego na rolach. Backend jest w pełni zintegrowany z bazą danych PostgreSQL, z użyciem Hibernate do ORM.",
                link: "https://github.com/szczepanskiamikolaj/lista-obecnosci-backend",
                previewImage: ""
            },
        ],
    },
    speakingLanguages: [{speakingLanguage: "Polski"},{speakingLanguage: "Angielski"}],

    get address(): string {
        const addressContact = this.contacts?.find(contact => contact?.label === "Adres")
        return addressContact?.value ?? "Brak";
    }
    
};

export {resumeData, resumeDataPL, ResumeData, Project, transformResumeDataToImageTags, ImageWithTags};