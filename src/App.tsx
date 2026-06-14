import {
  Fragment,
  createElement,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import "./App.css";
import semanticSpikeArticle from "./content/articles/semantic-spike-language-framework.md?raw";

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
};

type SkillGroup = {
  id: string;
  label: string;
  skills: string[];
};

const signals = [
  "GraphRAG",
  "Hybrid Retrieval",
  "Voice AI",
  "Vector Search",
  "FastAPI",
  "Supabase",
  "Neo4j",
];

const experiences: Experience[] = [
  {
    id: "IIITK",
    company: "Indian Institute of Information Technology, Kottayam",
    role: "Machine Learning Intern",
    period: "Currently Working",
    bullets: ["Coming Soon"],
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

const projects: Project[] = [
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
    skills: ["Python", "Java", "SQL"],
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
    href: "https://www.linkedin.com/in/midhunprahash",
  },
  {
    label: "Email",
    href: "mailto:midhuntech2023@gmail.com",
  },
];

const profileHighlights = [
  {
    label: "Degree",
    value: "B.Tech AI + Data Science",
  },
  {
    label: "CGPA",
    value: "8.4 / 10",
  },
  {
    label: "Expected",
    value: "2027",
  },
];

const commandItems = [
  "Design grounded RAG systems",
  "Ship voice AI microservices",
  "Tune hybrid retrieval pipelines",
];

const articles = [
  {
    slug: "semantic-spike-language-framework",
    title: "Direct Semantic Spike Representations for Neuromorphic Language Processing",
    description:
      "A research-grade framework for replacing pretrained dense embeddings with emergent spike-based language representations.",
    date: "2026-06-09",
    topic: "Neuromorphic NLP",
    readTime: "Research framework",
    content: semanticSpikeArticle,
  },
];

type MarkdownBlock =
  | { type: "heading"; level: number; content: string }
  | { type: "paragraph"; content: string }
  | { type: "blockquote"; content: string }
  | { type: "code"; language: string; content: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "table"; rows: string[][] }
  | { type: "hr" };

type HeadingTag = "h2" | "h3" | "h4" | "h5" | "h6";

function parseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({
        type: "code",
        language,
        content: codeLines.join("\n"),
      });
      index += 1;
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(trimmed);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        content: heading[2],
      });
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(trimmed)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push({ type: "blockquote", content: quoteLines.join(" ") });
      continue;
    }

    if (isTableStart(lines, index)) {
      const rows: string[][] = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        if (!isTableDivider(lines[index])) {
          rows.push(parseTableRow(lines[index]));
        }
        index += 1;
      }
      blocks.push({ type: "table", rows });
      continue;
    }

    const unorderedItem = /^[-*]\s+(.+)$/.exec(trimmed);
    const orderedItem = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (unorderedItem || orderedItem) {
      const ordered = Boolean(orderedItem);
      const items: string[] = [];

      while (index < lines.length) {
        const item = ordered
          ? /^\d+\.\s+(.+)$/.exec(lines[index].trim())
          : /^[-*]\s+(.+)$/.exec(lines[index].trim());

        if (!item) {
          break;
        }

        items.push(item[1]);
        index += 1;
      }

      blocks.push({ type: "list", ordered, items });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      const next = lines[index].trim();
      if (
        next.startsWith("```") ||
        next.startsWith("#") ||
        next.startsWith(">") ||
        /^(-{3,}|\*{3,})$/.test(next) ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next) ||
        isTableStart(lines, index)
      ) {
        break;
      }
      paragraphLines.push(lines[index]);
      index += 1;
    }

    blocks.push({ type: "paragraph", content: paragraphLines.join("\n") });
  }

  return blocks;
}

function isTableStart(lines: string[], index: number) {
  return (
    lines[index]?.trim().startsWith("|") &&
    index + 1 < lines.length &&
    isTableDivider(lines[index + 1])
  );
}

function isTableDivider(line: string) {
  return /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderInline(content: string) {
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part.split(/( {2,}\n|\n)/g).map((segment, segmentIndex) =>
      segment.includes("\n") ? (
        <br key={`${index}-${segmentIndex}`} />
      ) : (
        <Fragment key={`${index}-${segmentIndex}`}>{segment}</Fragment>
      ),
    );
  });
}

function MarkdownArticle({ markdown }: { markdown: string }) {
  const blocks = parseMarkdown(markdown);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const Heading = `h${Math.min(block.level + 1, 6)}` as HeadingTag;
          return createElement(Heading, { key: index }, renderInline(block.content));
        }

        if (block.type === "paragraph") {
          return <p key={index}>{renderInline(block.content)}</p>;
        }

        if (block.type === "blockquote") {
          return <blockquote key={index}>{renderInline(block.content)}</blockquote>;
        }

        if (block.type === "code") {
          return (
            <pre key={index}>
              <code>{block.content}</code>
            </pre>
          );
        }

        if (block.type === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List key={index}>
              {block.items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </List>
          );
        }

        if (block.type === "table") {
          const [head, ...body] = block.rows;
          return (
            <div className="article-table-wrap" key={index}>
              <table>
                {head ? (
                  <thead>
                    <tr>
                      {head.map((cell) => (
                        <th key={cell}>{renderInline(cell)}</th>
                      ))}
                    </tr>
                  </thead>
                ) : null}
                <tbody>
                  {body.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${rowIndex}-${cellIndex}`}>{renderInline(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return <hr key={index} />;
      })}
    </div>
  );
}

type SiteNavProps = {
  theme: Theme;
  onThemeToggle: () => void;
};

type PageProps = SiteNavProps;

function LiquidBackdrop() {
  return (
    <div className="liquid-backdrop" aria-hidden="true">
      <span className="liquid-blob liquid-blob--one" />
      <span className="liquid-blob liquid-blob--two" />
      <span className="liquid-blob liquid-blob--three" />
      <span className="liquid-sheen" />
    </div>
  );
}

function PageShell({
  children,
  theme,
  onThemeToggle,
}: {
  children: ReactNode;
} & SiteNavProps) {
  return (
    <main className="site-shell">
      <LiquidBackdrop />
      <SiteNav theme={theme} onThemeToggle={onThemeToggle} />
      {children}
    </main>
  );
}

function SiteNav({ theme, onThemeToggle }: SiteNavProps) {
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a href="/">Midhun Prahash SR</a>
      <div>
        <a href="/#projects-title">Projects</a>
        <a href="/articles">Articles</a>
        <a href="/midhun-prahash-resume-aiml.pdf" target="_blank" rel="noreferrer">
          Resume
        </a>
        <button
          className="theme-toggle"
          type="button"
          aria-label={`Switch to ${nextTheme} theme`}
          aria-pressed={theme === "dark"}
          onClick={onThemeToggle}
        >
          <span className="theme-toggle__track" aria-hidden="true">
            <span className="theme-toggle__thumb" />
          </span>
          <span>{theme}</span>
        </button>
      </div>
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
        <div className="hero__frame">
          <p className="eyebrow">AI / ML systems portfolio</p>
          <h1 id="hero-title">Midhun Prahash SR</h1>
          <p className="hero__subtitle">
            I build retrieval-heavy AI systems: GraphRAG pipelines, voice AI
            microservices, vector databases, and grounded LLM workflows that
            survive real data.
          </p>

          <div className="hero__actions" aria-label="Primary links">
            <a
              className="button button--solid"
              href="/midhun-prahash-resume-aiml.pdf"
              target="_blank"
              rel="noreferrer"
            >
              Resume.pdf
            </a>
            {contactLinks.map((link) => (
              <a
                key={link.label}
                className="button"
                href={link.href}
                target="_blank"
                rel="noreferrer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="command-panel" aria-label="Profile snapshot">
          <div className="command-panel__search">
            <span>AI</span>
            <p>Profile snapshot</p>
            <kbd>RAG</kbd>
          </div>

          <div className="command-panel__metrics">
            {profileHighlights.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>

          <div className="command-panel__list">
            {commandItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>

          <div className="command-panel__footer">
            <span>Current focus</span>
            <strong>Knowledge graphs + LLM orchestration</strong>
          </div>
        </aside>
      </section>

      <section className="signal-strip" aria-label="Technical signals">
        {signals.map((signal) => (
          <span key={signal}>{signal}</span>
        ))}
      </section>

      <section className="section-grid" aria-labelledby="experience-title">
        <div className="section-heading">
          <p className="eyebrow">Experience</p>
          <h2 id="experience-title">Applied AI Work</h2>
        </div>
        <div className="timeline">
          {experiences.map((experience) => (
            <article className="timeline-card" key={experience.id}>
              <div className="timeline-card__meta">
                <span>{experience.period}</span>
                <strong>{experience.company}</strong>
              </div>
              <div>
                <h3>{experience.role}</h3>
                <ul>
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="section-grid section-grid--wide"
        aria-labelledby="projects-title"
      >
        <div className="section-heading">
          <p className="eyebrow">Projects</p>
          <h2 id="projects-title">Systems Built</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" key={project.id}>
              <p>{project.type}</p>
              <h3>{project.name}</h3>
              <span>{project.stack}</span>
              <p>{project.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-grid" aria-labelledby="skills-title">
        <div className="section-heading">
          <p className="eyebrow">Technical Skills</p>
          <h2 id="skills-title">Stack Map</h2>
        </div>
        <div className="skill-board">
          {skillGroups.map((group) => (
            <article className="skill-group" key={group.id}>
              <h3>{group.label}</h3>
              <div>
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="research-panel" aria-labelledby="research-title">
        <div>
          <p className="eyebrow">Research + Achievements</p>
          <h2 id="research-title">Research, IP, and Wins</h2>
        </div>
        <div className="research-panel__items">
          <article>
            <span>IEEE 2026</span>
            <p>
              Enhancing Transformer-Based Hidden Suicidal Intention Detection
              with Sequential Modeling and Psycholinguistic Feature Fusion.
            </p>
          </article>
          <article>
            <span>Patent</span>
            <p>
              Intelligent agent for personalized and inclusive learning support
              systems for adaptive learning with agentic strategies.
            </p>
          </article>
          <article>
            <span>Top 2 / 800+</span>
            <p>
              Runner-up at the 2025 Thoothukudi District Police Cyber Hackathon.
            </p>
          </article>
        </div>
      </section>
    </PageShell>
  );
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
        <MarkdownArticle markdown={article.content} />
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
