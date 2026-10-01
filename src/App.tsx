import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import "./App.css";
import semanticSpikeArticle from "./content/articles/semantic-spike-language-framework.md?raw";

const MarkdownArticle = lazy(() => import("./components/MarkdownArticle"));

const publicationAuthors = "Midhun Prahash SR, Rhea Alphonsa Jose, and Sam. V. George";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "portfolio-theme";

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function getInitialTheme(): Theme {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (isTheme(storedTheme)) {
      return storedTheme;
    }
  } catch {
    return getSystemTheme();
  }

  return getSystemTheme();
}

function storeTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable in private browsing or restricted contexts.
  }
}

type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

type Project = {
  id: string;
  name: string;
  type: string;
  stack: string;
  description: string;
  href?: string;
};

type SkillGroup = {
  id: string;
  label: string;
  skills: string[];
};

const experiences: Experience[] = [
  {
    id: "IIITK",
    company: "MINDS Research Lab, IIIT Kottayam",
    role: "Research Intern",
    period: "Jun 2026 - Present",
    bullets: ["Researching encoder-based transformers for detecting hidden suicidal intent in social media text, integrating sequential modeling and psycholinguistic features."],
  },
  {
    id: "cospin",
    company: "Cospin",
    role: "AI Engineering Intern",
    period: "Jan 2026 - Mar 2026",
    bullets: [
      "Built Python and FastAPI voice microservices for real-time speech ingestion, LLM orchestration, transcript persistence, and audio delivery.",
      "Engineered streaming ASR and TTS workflows with Google Speech-to-Text v2, Google Cloud Text-to-Speech, WebSockets, containers, and low-latency inference.",
    ],
  },
  {
    id: "lightcast",
    company: "Lightcast",
    role: "AI/ML Intern",
    period: "Sep 2025 - Jan 2026",
    bullets: [
      "Built a GraphRAG hybrid search and skill normalization pipeline for unstructured job descriptions and standardized taxonomy IDs.",
      "Designed Neo4j knowledge graphs with aliases, category relationships, vector indexes, Gemini 2.5 Flash workflows, and all-mpnet-base-v2 embeddings.",
      "Implemented exact match, alias resolution, semantic similarity, hierarchical context search, and threshold tuning to reduce hallucinations and improve precision.",
    ],
  },
  {
    id: "orion",
    company: "Orion Governance",
    role: "Machine Learning Intern",
    period: "Jun 2025 - Jul 2025",
    bullets: [
      "Developed a fuzzy string matching Random Forest classifier in Scikit-learn and Pandas with 89% accuracy for unauthorized username detection.",
    ],
  },
];

const earlierProjects: Project[] = [
  {
    id: "hairline-ai",
    name: "Hairline AI",
    type: "Computer vision",
    stack: "YOLOv8 / MediaPipe / OpenCV / SQL",
    description: "Facial analysis combining segmentation and landmark detection to measure and store facial proportions.",
  },
  {
    id: "studentai",
    name: "StudentAI",
    type: "RAG Learning Assistant",
    stack: "Python / FAISS / Sentence Transformers / OpenAI / OCR",
    description:
      "End-to-end educational RAG pipeline with OCR ingestion, semantic chunking, dense retrieval, source-grounded explanations, and question generation.",
  },
  {
    id: "uniguide",
    name: "UniGuide",
    type: "Production RAG System",
    stack: "FastAPI / PostgreSQL / Supabase / pgvector / JWT / RLS",
    description:
      "Multi-tenant institutional knowledge backend with vector search, full-text search, BM25, reranking, semantic caching, org-scoped controls, and streaming responses.",
  },
  {
    id: "username-matcher",
    name: "Username Matcher",
    type: "ML Security Application",
    stack: "Python / Scikit-learn / Pandas / Django / Fuzzy Matching",
    description:
      "Unauthorized username detection workflow using fuzzy string matching and a Random Forest model, integrated into a Django web application.",
  },
  {
    id: "review-analyzer",
    name: "Review Analyzer",
    type: "Sentiment Analysis",
    stack: "Selenium / NLTK / VADER / TextBlob / Matplotlib / Seaborn",
    description:
      "Automated scraping, sentiment classification, and visual summaries for product reviews across positive, negative, and neutral distributions.",
  },
];

const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: ["Python", "SQL", "Java"],
  },
  {
    id: "ml",
    label: "Machine Learning",
    skills: [
      "Classification",
      "Feature Engineering",
      "Model Evaluation",
      "Threshold Tuning",
      "Scikit-learn",
      "PyTorch",
      "Computer Vision",
      "Transformers",
      "BERT",
    ],
  },
  {
    id: "llm",
    label: "NLP + LLM Systems",
    skills: [
      "RAG",
      "GraphRAG",
      "Semantic Search",
      "Hybrid Search",
      "Embeddings",
      "Reranking",
      "OpenAI API",
      "Google Gemini",
      "Prompt Engineering",
      "ASR / TTS",
    ],
  },
  {
    id: "infra",
    label: "Data Infrastructure",
    skills: [
      "FastAPI",
      "PostgreSQL",
      "Supabase",
      "pgvector",
      "FAISS",
      "Neo4j",
      "WebSockets",
      "SSE",
      "Docker",
      "Linux",
    ],
  },
];

const contactLinks = [
  {
    label: "GitHub",
    href: "https://github.com/midhunprahash-ui",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/midhunprahash/",
  },
  {
    label: "Google Scholar",
    href: "https://scholar.google.com/citations?user=Gg4KbxIAAAAJ&hl=en",
  },
  {
    label: "Email",
    href: "mailto:midhunprahashh@gmail.com",
  },
];

const projects: Project[] = [
  {
    id: "paperflow", name: "Paperflow", type: "Document intelligence",
    stack: "TypeScript / Python / Azure / Supabase",
    description: "A research reader that turns PDFs into navigable sections, tables, and figures while keeping the original source close at hand.",
    href: "https://github.com/midhunprahash-ui/paperflow",
  },
  {
    id: "cypher", name: "CYPHER", type: "Applied machine learning",
    stack: "Python / FastAPI / LightGBM / React",
    description: "Fraud-risk scoring from transaction and identity signals, with model comparisons and explanations in an analyst-facing interface.",
    href: "https://github.com/midhunprahash-ui/credit-card-fraud-detection",
  },
  {
    id: "studentai", name: "StudentAI", type: "AI for education",
    stack: "Python / FAISS / Sentence Transformers / Gemini",
    description: "An OCR-to-vector learning assistant that turns educational texts into evidence-backed explanations and targeted assessments.",
    href: "https://github.com/midhunprahash-ui/student.ai",
  },
  {
    id: "uniguide", name: "UniChat", type: "Retrieval systems",
    stack: "FastAPI / pgvector / LlamaIndex / Supabase",
    description: "A multi-tenant institutional knowledge assistant with semantic caching, row-level security, and streamed, citation-grounded answers.",
    href: "https://github.com/midhunprahash-ui/unichat-backend",
  },
  {
    id: "proof-shield", name: "Proof Shield", type: "Evidence workflows",
    stack: "OCR / Document verification / AI drafting",
    description: "A chargeback assistant that checks payment and delivery evidence, drafts cited responses, and keeps human approval in the process.",
    href: "https://github.com/midhunprahash-ui/proof-shield",
  },
  {
    id: "indic-tts", name: "Indic TTS", type: "Speech systems",
    stack: "Python / Speech synthesis / Model evaluation",
    description: "A comparison workspace for Tamil, English, and Tanglish speech models, with side-by-side playback and latency tracking.",
    href: "https://github.com/midhunprahash-ui/indic-tts",
  },
];

const articles = [
  {
    slug: "semantic-spike-language-framework",
    title: "Direct Semantic Spike Representations for Neuromorphic Language Processing",
    description:
      "A research framework for replacing pretrained dense embeddings with emergent spike-based language representations.",
    date: "2026-06-09",
    topic: "Neuromorphic NLP",
    readTime: "Research framework",
    content: semanticSpikeArticle,
  },
];

type SiteNavProps = {
  theme: Theme;
  onThemeToggle: () => void;
};

type PageProps = SiteNavProps;

function PageShell({
  children,
  theme,
  onThemeToggle,
}: {
  children: ReactNode;
} & SiteNavProps) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteNav theme={theme} onThemeToggle={onThemeToggle} />
      <main id="main-content">{children}</main>
      <footer className="site-footer">
        <a className="footer-name" href="/">Midhun Prahash SR</a>
        <p>AI, language, and useful systems.</p>
        <a href="https://github.com/midhunprahash-ui" target="_blank" rel="noreferrer">GitHub</a>
      </footer>
    </div>
  );
}

const navigationItems = [
  { label: "Projects", href: "/projects" },
  { label: "Publications", href: "/publications" },
  { label: "Patents", href: "/patents" },
  { label: "Articles", href: "/articles" },
];

function SiteNav({ theme, onThemeToggle }: SiteNavProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

  function navLinks() {
    return <>
      {navigationItems.map(item => <a key={item.href} href={item.href} aria-current={currentPath === item.href || currentPath.startsWith(`${item.href}/`) ? "page" : undefined}>{item.label}</a>)}
      <a href="/midhun-prahash-resume-aiml.pdf" target="_blank" rel="noreferrer">Resume</a>
    </>;
  }

  return (
    <nav className="site-nav" aria-label="Primary navigation" onKeyDown={event => { if (event.key === "Escape" && menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); } }}>
      <a className="brand" href="/">Midhun Prahash SR<span aria-hidden="true">.</span></a>
      <div className="desktop-links">{navLinks()}</div>
      <div className="nav-controls">
        <button className="theme-toggle" type="button" aria-label={`Switch to ${nextTheme} theme`} aria-pressed={theme === "dark"} onClick={onThemeToggle}>
          <span className="theme-toggle__symbol" aria-hidden="true">{theme === "dark" ? "◐" : "◑"}</span>
          <span>{theme}</span>
        </button>
        <button ref={menuButtonRef} className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}</button>
      </div>
      {menuOpen && <div className="mobile-links" id="mobile-navigation">{navLinks()}</div>}
    </nav>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const pathname = window.location.pathname.replace(/\/$/, "") || "/";
  const articleMatch = /^\/articles\/([^/]+)$/.exec(pathname);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  useEffect(() => {
    const article = articles.find(item => pathname === `/articles/${item.slug}`);
    const title = article ? `${article.title} | Midhun Prahash SR`
      : navigationItems.some(item => item.href === pathname) ? `${navigationItems.find(item => item.href === pathname)?.label} | Midhun Prahash SR`
      : pathname === "/" ? "Midhun Prahash SR | AI/ML Portfolio"
      : "Page not found | Midhun Prahash SR";
    const descriptions: Record<string, string> = {
      "/projects": "AI and machine learning projects by Midhun Prahash SR, including Paperflow, CYPHER, UniChat, StudentAI, Proof Shield, and Indic TTS.",
      "/publications": "Publications by Midhun Prahash SR on transformer-based language understanding and psycholinguistic modeling, with IEEE Xplore and Google Scholar links.",
      "/patents": "Patent application by Midhun Prahash SR for personalized, inclusive, and adaptive learning support using agentic strategies.",
      "/articles": "Research notes on AI, retrieval systems, and neuromorphic language processing by Midhun Prahash SR.",
    };
    const description = article?.description ?? descriptions[pathname]
      ?? "AI engineering portfolio of Midhun Prahash SR: retrieval systems, voice AI, applied machine learning, and research.";
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [pathname]);

  function handleThemeToggle() {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      storeTheme(nextTheme);
      return nextTheme;
    });
  }

  const pageProps = {
    theme,
    onThemeToggle: handleThemeToggle,
  };

  if (pathname === "/projects") return <ProjectsPage {...pageProps} />;
  if (pathname === "/publications") return <PublicationsPage {...pageProps} />;
  if (pathname === "/patents") return <PatentsPage {...pageProps} />;

  if (pathname === "/articles") {
    return <ArticlesPage {...pageProps} />;
  }

  if (articleMatch) {
    const article = articles.find((item) => item.slug === articleMatch[1]);
    return article ? (
      <ArticlePage article={article} {...pageProps} />
    ) : (
      <NotFoundPage {...pageProps} />
    );
  }

  if (pathname !== "/") {
    return <NotFoundPage {...pageProps} />;
  }

  return <HomePage {...pageProps} />;
}

function HomePage({ theme, onThemeToggle }: PageProps) {
  return (
    <PageShell theme={theme} onThemeToggle={onThemeToggle}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__copy">
          <p className="eyebrow">AI / ML Engineer</p>
          <h1 id="hero-title">Midhun<br />Prahash SR<span>.</span></h1>
          <p className="hero__subtitle">I build AI systems that connect language, knowledge, and real-world problems.</p>
          <div className="hero__actions">
            <a className="button button--solid" href="/projects">Explore projects</a>
            <a className="text-link" href="/midhun-prahash-resume-aiml.pdf" target="_blank" rel="noreferrer">View résumé</a>
          </div>
        </div>
        <div className="hero__visual">
          <img src="/midhun-prahash.jpg" alt="Midhun Prahash SR" width="978" height="1000" fetchPriority="high" />
        </div>
      </section>

      <section className="intro" aria-labelledby="about-title">
        <h2 id="about-title">From an idea<br />to a working system.</h2>
        <div>
          <p>I work across retrieval-augmented generation, knowledge graphs, and voice AI. My interests extend to LLM evaluation, mechanistic interpretability, and neuromorphic language processing.</p>
          <dl className="education">
            <div><dt>Education</dt><dd>B.Tech AI + Data Science<span className="education-school">St. Joseph’s Institute of Technology</span></dd></div>
            <div><dt>CGPA</dt><dd>8.4 / 10</dd></div>
            <div><dt>Expected graduation</dt><dd>2027</dd></div>
          </dl>
        </div>
      </section>

      <section className="projects-section" aria-labelledby="projects-title">
        <div className="section-heading"><h2 id="projects-title">Selected projects</h2></div>
        <ProjectGrid items={projects.slice(0, 2)} />
        <a className="text-link section-link" href="/projects">Explore all projects</a>
      </section>

      <section className="experience-section" aria-labelledby="experience-title">
        <div className="section-heading"><h2 id="experience-title">Applied AI work</h2></div>
        <div className="timeline">
          {experiences.map(experience => (
            <article className="timeline-card" key={experience.id}>
              <div className="timeline-card__meta"><span>{experience.period}</span></div>
              <div className="timeline-card__content">
                <h3>{experience.company}</h3><p className="experience-role">{experience.role}</p>
                {experience.bullets.length > 0 && <ul>{experience.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-section" aria-labelledby="research-title">
        <div className="section-heading"><h2 id="research-title">Research & recognition</h2></div>
        <div className="research-layout">
          <a className="research-feature" href={`/articles/${articles[0].slug}`}>
            <img className="research-art" src="/knowledge-graph.jpg" alt="" width="1000" height="1000" loading="lazy" />
            <span className="eyebrow">Neuromorphic NLP</span>
            <h3>Can language be represented in spikes?</h3>
            <p>{articles[0].description}</p>
            <span className="research-link">Read the research framework</span>
          </a>
          <div className="research-panel__items">
            <article><span>IEEE ICITIIT 2026</span><h3 className="publication-title"><a href="/publications">Enhancing Transformer-Based Hidden Suicidal Intention Detection with Sequential Modeling and Psycholinguistic Feature Fusion.</a></h3><p className="publication-authors">{publicationAuthors}</p><a className="publication-source" href="/publications">View publications</a></article>
            <article><span>Patent application · 202541076262</span><p>Intelligent Agent for Personalized &amp; Inclusive Learning Support System for Adaptive Learning with Agentic Strategies.</p><a className="publication-source" href="/patents">View patent application</a></article>
            <article><span>Hackathon runner-up</span><p>Top 2 of 800+ teams at the 2025 Thoothukudi District Police Cyber Hackathon, building a crime prediction system with ARIMA and Random Forest.</p></article>
          </div>
        </div>
      </section>

      <section className="skills-section" aria-labelledby="skills-title">
        <div className="section-heading"><h2 id="skills-title">Tools I build with</h2></div>
        <div className="skill-board">
          {skillGroups.map(group => <article className="skill-group" key={group.id}><h3>{group.label}</h3><p>{group.skills.join(" · ")}</p></article>)}
        </div>
      </section>

      <section className="contact-section" aria-labelledby="contact-title">
        <h2 id="contact-title">Have a problem<br />worth solving?</h2>
        <div><p>Let’s talk about AI engineering, research, or building something useful together.</p>
          <a className="contact-email" href="mailto:midhunprahashh@gmail.com">midhunprahashh@gmail.com</a>
          <div className="contact-links">{contactLinks.filter(link => link.label !== "Email").map(link => <a href={link.href} key={link.label} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
        </div>
      </section>
    </PageShell>
  );
}

function ProjectGrid({ items }: { items: Project[] }) {
  return <div className="project-grid">
    {items.map((project, index) => <article className="project-card" key={project.id}>
      <div className="project-card__meta"><span>{project.type}</span><span className="project-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span></div>
      <h3><a href={project.href} target="_blank" rel="noreferrer">{project.name}</a></h3>
      <p>{project.description}</p>
      <div className="project-card__footer"><span>{project.stack}</span><a href={project.href} target="_blank" rel="noreferrer" aria-label={`View ${project.name} source on GitHub`}>View source</a></div>
    </article>)}
  </div>;
}

function ProjectsPage(props: PageProps) {
  return <PageShell {...props}>
    <header className="collection-header">
      <h1>Projects</h1>
      <p>Retrieval, document intelligence, speech, and applied machine learning. Ideas built into working systems.</p>
      <a className="text-link" href="https://github.com/midhunprahash-ui" target="_blank" rel="noreferrer">Explore GitHub</a>
    </header>
    <section aria-label="Featured projects"><ProjectGrid items={projects} /></section>
    <section className="collection-secondary" aria-labelledby="earlier-projects-title">
      <h2 id="earlier-projects-title">Earlier explorations</h2>
      <div className="earlier-work__list">
        {earlierProjects.filter(project => !["studentai", "uniguide"].includes(project.id)).map(project => <article key={project.id}><h3>{project.name}</h3><p>{project.description}</p><span>{project.stack}</span></article>)}
      </div>
    </section>
  </PageShell>;
}

function PublicationsPage(props: PageProps) {
  return <PageShell {...props}>
    <header className="collection-header">
      <h1>Publications</h1>
      <p>Research in language understanding, transformer architectures, and psycholinguistic modeling.</p>
      <a className="text-link" href="https://scholar.google.com/citations?user=Gg4KbxIAAAAJ&hl=en" target="_blank" rel="noreferrer">View Google Scholar</a>
    </header>
    <article className="record-layout" aria-labelledby="publication-title">
      <div className="record-meta"><span>2026</span><p>Conference paper<br />IEEE ICITIIT</p></div>
      <div className="record-content">
        <h2 id="publication-title">Enhancing Transformer-Based Hidden Suicidal Intention Detection with Sequential Modeling and Psycholinguistic Feature Fusion.</h2>
        <p className="record-authors">{publicationAuthors}</p>
        <p>Exploring hidden suicidal intent in text through transformer-based language modeling, sequential modeling, and psycholinguistic features.</p>
        <a className="button button--solid" href="https://ieeexplore.ieee.org/abstract/document/11499725" target="_blank" rel="noreferrer">Read on IEEE Xplore</a>
      </div>
    </article>
    <aside className="collection-note"><h2>More research writing</h2><p>Read my framework for semantic spike representations and neuromorphic language processing.</p><a className="text-link" href="/articles">Explore articles</a></aside>
  </PageShell>;
}

function PatentsPage(props: PageProps) {
  return <PageShell {...props}>
    <header className="collection-header">
      <h1>Patents</h1>
      <p>Patent work on inclusive education and adaptive, agent-based learning support.</p>
    </header>
    <article className="record-layout" aria-labelledby="patent-title">
      <div className="record-meta"><span>Patent application</span><p>Application number<br /><strong>202541076262</strong></p></div>
      <div className="record-content">
        <h2 id="patent-title">Intelligent Agent for Personalized &amp; Inclusive Learning Support System for Adaptive Learning with Agentic Strategies.</h2>
        <p>Personalized and inclusive learning support using agentic strategies to adapt the learning experience.</p>
        <dl className="record-facts"><div><dt>Type</dt><dd>Patent application</dd></div><div><dt>Focus</dt><dd>Adaptive learning · AI in education</dd></div></dl>
        <a className="text-link" href="/midhun-prahash-resume-aiml.pdf" target="_blank" rel="noreferrer">View résumé</a>
      </div>
    </article>
    <aside className="collection-note"><h2>Related project</h2><p>StudentAI explores textbook-grounded explanations and personalized learning assessments.</p><a className="text-link" href="https://github.com/midhunprahash-ui/student.ai" target="_blank" rel="noreferrer">View StudentAI on GitHub</a></aside>
  </PageShell>;
}

function ArticlesPage({ theme, onThemeToggle }: PageProps) {
  return (
    <PageShell theme={theme} onThemeToggle={onThemeToggle}>
      <section className="articles-hero" aria-labelledby="articles-title">
        <p className="eyebrow">Articles</p>
        <h1 id="articles-title">Research Notes and Technical Essays</h1>
        <p>
          Long-form writing on AI systems, retrieval, neuromorphic language
          processing, and engineering ideas worth making concrete.
        </p>
      </section>

      <section className="article-list" aria-label="Published articles">
        {articles.map((article) => (
          <a
            className="article-card"
            href={`/articles/${article.slug}`}
            key={article.slug}
          >
            <span>{article.topic}</span>
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <time dateTime={article.date}>{article.date}</time>
          </a>
        ))}
      </section>
    </PageShell>
  );
}

function ArticlePage({
  article,
  theme,
  onThemeToggle,
}: {
  article: (typeof articles)[number];
} & PageProps) {
  return (
    <PageShell theme={theme} onThemeToggle={onThemeToggle}>
      <article className="article-page">
        <header className="article-header">
          <a className="article-back" href="/articles">
            Articles
          </a>
          <p className="eyebrow">{article.topic}</p>
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <div className="article-meta">
            <time dateTime={article.date}>{article.date}</time>
            <span>{article.readTime}</span>
          </div>
        </header>
        <Suspense fallback={<p role="status">Loading article…</p>}>
          <MarkdownArticle markdown={article.content} />
        </Suspense>
      </article>
    </PageShell>
  );
}

function NotFoundPage({ theme, onThemeToggle }: PageProps) {
  return (
    <PageShell theme={theme} onThemeToggle={onThemeToggle}>
      <section className="articles-hero" aria-labelledby="not-found-title">
        <p className="eyebrow">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p>The page you requested does not exist.</p>
        <a className="button button--solid" href="/">
          Back home
        </a>
      </section>
    </PageShell>
  );
}

export default App;
