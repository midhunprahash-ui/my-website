import './App.css'

type Experience = {
  id: string
  company: string
  role: string
  period: string
  bullets: string[]
}

type Project = {
  id: string
  name: string
  type: string
  stack: string
  description: string
}

type SkillGroup = {
  id: string
  label: string
  skills: string[]
}

const signals = [
  'GraphRAG',
  'Hybrid Retrieval',
  'Voice AI',
  'Vector Search',
  'FastAPI',
  'Supabase',
  'Neo4j',
]

const experiences: Experience[] = [
  {
    id: 'cospin',
    company: 'Cospin',
    role: 'AI Engineering Intern',
    period: 'Jan 2026 - Mar 2026',
    bullets: [
      'Built Python and FastAPI voice microservices for real-time speech ingestion, LLM orchestration, transcript persistence, and audio delivery.',
      'Engineered streaming ASR and TTS workflows with Google Speech-to-Text v2, Google Cloud Text-to-Speech, WebSockets, containers, and low-latency inference.',
    ],
  },
  {
    id: 'lightcast',
    company: 'Lightcast',
    role: 'AI/ML Intern',
    period: 'Sep 2025 - Jan 2026',
    bullets: [
      'Built a GraphRAG hybrid search and skill normalization pipeline for unstructured job descriptions and standardized taxonomy IDs.',
      'Designed Neo4j knowledge graphs with aliases, category relationships, vector indexes, Gemini 2.5 Flash workflows, and all-mpnet-base-v2 embeddings.',
      'Implemented exact match, alias resolution, semantic similarity, hierarchical context search, and threshold tuning to reduce hallucinations and improve precision.',
    ],
  },
  {
    id: 'orion',
    company: 'Orion Governance',
    role: 'Machine Learning Intern',
    period: 'Jun 2025 - Jul 2025',
    bullets: [
      'Developed a fuzzy string matching Random Forest classifier in Scikit-learn and Pandas with 89% accuracy for unauthorized username detection.',
    ],
  },
]

const projects: Project[] = [
  {
    id: 'studentai',
    name: 'StudentAI',
    type: 'RAG Learning Assistant',
    stack: 'Python / FAISS / Sentence Transformers / OpenAI / OCR',
    description:
      'End-to-end educational RAG pipeline with OCR ingestion, semantic chunking, dense retrieval, source-grounded explanations, and question generation.',
  },
  {
    id: 'uniguide',
    name: 'UniGuide',
    type: 'Production RAG System',
    stack: 'FastAPI / PostgreSQL / Supabase / pgvector / JWT / RLS',
    description:
      'Multi-tenant institutional knowledge backend with vector search, full-text search, BM25, reranking, semantic caching, org-scoped controls, and streaming responses.',
  },
  {
    id: 'username-matcher',
    name: 'Username Matcher',
    type: 'ML Security Application',
    stack: 'Python / Scikit-learn / Pandas / Django / Fuzzy Matching',
    description:
      'Unauthorized username detection workflow using fuzzy string matching and a Random Forest model, integrated into a Django web application.',
  },
  {
    id: 'review-analyzer',
    name: 'Review Analyzer',
    type: 'Sentiment Analysis',
    stack: 'Selenium / NLTK / VADER / TextBlob / Matplotlib / Seaborn',
    description:
      'Automated scraping, sentiment classification, and visual summaries for product reviews across positive, negative, and neutral distributions.',
  },
]

const skillGroups: SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    skills: ['Python', 'Java', 'SQL'],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    skills: ['Classification', 'Feature Engineering', 'Model Evaluation', 'Threshold Tuning', 'Scikit-learn', 'PyTorch'],
  },
  {
    id: 'llm',
    label: 'NLP + LLM Systems',
    skills: ['RAG', 'GraphRAG', 'Semantic Search', 'Hybrid Search', 'Embeddings', 'Reranking', 'OpenAI API', 'Google Gemini'],
  },
  {
    id: 'infra',
    label: 'Data Infrastructure',
    skills: ['FastAPI', 'PostgreSQL', 'Supabase', 'pgvector', 'FAISS', 'Neo4j', 'WebSockets', 'SSE', 'Docker', 'Linux'],
  },
]

const contactLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/midhunprahash-ui',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/midhunprahash',
  },
  {
    label: 'Email',
    href: 'mailto:midhuntech2023@gmail.com',
  },
]

function App() {
  return (
    <main className="site-shell">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__frame">
          <p className="eyebrow">AI / ML systems portfolio</p>
          <h1 id="hero-title">Midhun Prahash SR</h1>
          <p className="hero__subtitle">
            I build retrieval-heavy AI systems: GraphRAG pipelines, voice AI microservices,
            vector databases, and grounded LLM workflows that survive real data.
          </p>

          <div className="hero__actions" aria-label="Primary links">
            <a className="button button--solid" href="/midhun-prahash-resume-aiml.pdf" target="_blank" rel="noreferrer">
              Resume.pdf
            </a>
            {contactLinks.map((link) => (
              <a key={link.label} className="button" href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <aside className="terminal-panel" aria-label="Profile snapshot">
          <div className="terminal-panel__bar">
            <span />
            <span />
            <span />
          </div>
          <pre>{`profile.load({
  degree: "B.Tech AI + Data Science",
  cgpa: "8.4/10",
  status: "Expected 2027",
  current_focus: [
    "RAG systems",
    "LLM orchestration",
    "knowledge graphs"
  ]
})`}</pre>
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

      <section className="section-grid section-grid--wide" aria-labelledby="projects-title">
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
              Enhancing Transformer-Based Hidden Suicidal Intention Detection with Sequential
              Modeling and Psycholinguistic Feature Fusion.
            </p>
          </article>
          <article>
            <span>Patent</span>
            <p>
              Intelligent agent for personalized and inclusive learning support systems for
              adaptive learning with agentic strategies.
            </p>
          </article>
          <article>
            <span>Top 2 / 800+</span>
            <p>Runner-up at the 2025 Thoothukudi District Police Cyber Hackathon.</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default App
