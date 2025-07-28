import React, { useEffect, useState } from "react";
import "./ProgramsPage.css";
import ProgramsAccordion from "./ProgramsAccordion";
import MarketingSoftboard from "./MarketingSoftboard";
import ProgramsBenefitsCard from "../components/ProgramsBenefitsCard";

const tracks = [
  {
    title: "1. Data Engineering Track",
    transitions: [
      "Analyst → Data Engineer",
      "Data Engineer → Senior Data Engineer",
      "Senior Data Engineer → Data Architect",
    ],
    tech: [
      "Python, SQL, PySpark, AWS, Azure, Snowflake, Databricks, Apache Airflow, Docker, CI/CD, Git, Delta Lake, Medallion Architecture, PostgreSQL, MongoDB",
    ],
    programs: [
      { name: "RaisePath — Break into Tech", desc: "Zero to Data Engineer with structured learning and real projects." },
      { name: "RaisePulse — Job Application & Interview Prep", desc: "You’ve got the skills — now get the job." },
      { name: "RaisePower — Junior to Intermediate Growth", desc: "Go deeper into pipelines, system design, and cloud-native tools." },
      { name: "RaisePinnacle — Senior-Level Growth", desc: "Architect scalable data platforms and mentor teams." },
    ],
  },
  {
    title: "2. AI & Data Science Track",
    transitions: [
      "Fresher → Data Scientist",
      "Data Scientist → Machine Learning Engineer",
      "ML Engineer → GenAI Specialist",
    ],
    tech: [
      "Scikit-Learn, XGBoost, TensorFlow, PyTorch, Hugging Face, LangChain, OpenAI API, RAG Pipelines, MLflow, DVC, Weights & Biases, SQL, MongoDB, Redis, FastAPI, Chroma, Pinecone, FAISS",
    ],
    programs: [
      { name: "RaisePath — Break into Tech", desc: "From non-coder to industry-ready Data Scientist." },
      { name: "RaisePulse — Job Application & Interview Prep", desc: "Mock interviews, resume revamp, real use-case projects." },
      { name: "RaisePower — Junior to Intermediate Growth", desc: "Model pipelines, APIs, deployment, and inference." },
      { name: "RaisePinnacle — Senior-Level Growth", desc: "Lead GenAI initiatives, productionize LLMs, build MLOps pipelines." },
    ],
  },
  {
    title: "3. Business Intelligence & Analytics Track",
    transitions: [
      "Excel User → BI Developer",
      "BI Developer → BI Lead",
      "Reporting Analyst → Data Storyteller",
    ],
    tech: [
      "Power BI, Tableau, Looker, SQL, DAX, Python (Pandas), Star/Snowflake Schema, Data Vault, UX Design, KPI Storytelling",
    ],
    programs: [
      { name: "RaisePath — Break into Tech", desc: "No-code to pro dashboards with real industry data." },
      { name: "RaisePulse — Job Application & Interview Prep", desc: "Mock dashboards, resume polishing, stakeholder role-play." },
      { name: "RaisePower — Junior to Intermediate Growth", desc: "Advanced modeling, SQL, and dashboard UX design." },
      { name: "RaisePinnacle — Senior-Level Growth", desc: "Lead BI strategy, mentor teams, and optimize reporting systems." },
    ],
  },
  {
    title: "4. Product & Program Management Track",
    transitions: [
      "Software Engineer → Associate Product Manager (APM)",
      "APM → PM → Sr PM",
      "BA / QA → Scrum Master / TPM",
    ],
    tech: [
      "Agile, Scrum, OKRs, Jira, Confluence, Notion, Miro, MVP, Roadmapping, Product Strategy, Case Interviews, Executive Storytelling",
    ],
    programs: [
      { name: "RaisePath — Break into Tech", desc: "Master product thinking, agile frameworks, and stakeholder navigation." },
      { name: "RaisePulse — Job Application & Interview Prep", desc: "Case interviews, personal brand, resume storytelling." },
      { name: "RaisePower — Junior to Intermediate Growth", desc: "Grow from PM to Sr PM or Scrum Master to TPM." },
      { name: "RaisePinnacle — Senior-Level Growth", desc: "Lead org-wide strategy, influence execs, manage cross-functional teams." },
    ],
  },
  {
    title: "5. AI Engineering & Generative AI Track",
    transitions: [
      "Backend Developer → GenAI Engineer",
      "ML Engineer → RAG App Developer",
      "Traditional AI → Full-Stack AI Builder",
    ],
    tech: [
      "OpenAI GPT, LLaMA 3, Mistral, LangChain, LlamaIndex, RAG Pipelines, Streamlit, FastAPI, Docker, Ollama, Prompt Engineering, Fine-tuning, Eval Harnesses",
    ],
    programs: [
      { name: "RaisePath — Break into Tech", desc: "Learn GenAI from scratch — from prompts to apps." },
      { name: "RaisePulse — Job Application & Interview Prep", desc: "Portfolio building, mock RAG projects, resume revamp." },
      { name: "RaisePower — Junior to Intermediate Growth", desc: "Ship production-grade LLM apps, integrate APIs, deploy locally or on cloud." },
      { name: "RaisePinnacle — Senior-Level Growth", desc: "Lead GenAI productization, fine-tune models, build scalable pipelines." },
    ],
  },
];

const benefits = [
  "Real Industry Case Studies (Retail, Healthcare, BFSI, SaaS)",
  "6–30 Mock Interviews",
  "Resume + LinkedIn Optimization",
  "1:1 Mentorship — Technical, Behavioral & Career Strategy",
];

const magnets = [
  "💥 “Ditch the dummy datasets. Train on what real companies use.”",
  "🧭 “Mentorship from hiring managers who’ve done the job.”",
  "🚀 “Don’t just learn — transition with a career roadmap.”",
  "🛠️ “Build ingestion frameworks, RAG apps, dashboards — not just notebooks.”",
  "👔 “From mock interviews to resume rewrites — we’ve got your back.”",
  "🌐 “Learn. Build. Deploy. Get hired.”",
];


import { Footer } from "../components/Footer";

export default function ProgramsPage() {
  // Typewriter effect state
  const before = "Choose Your Career ";
  const transitionWord = "Transition";
  const after = " Path";
  const [displayedText, setDisplayedText] = useState("");
  const [displayedTransition, setDisplayedTransition] = useState("");
  const [displayedTextEnd, setDisplayedTextEnd] = useState("");

  useEffect(() => {
    let idx = 0;
    let phase = 0;
    setDisplayedText("");
    setDisplayedTransition("");
    setDisplayedTextEnd("");
    // Type out 'before'
    const typeBefore = setInterval(() => {
      setDisplayedText(before.slice(0, idx + 1));
      idx++;
      if (idx === before.length) {
        clearInterval(typeBefore);
        // Type out 'Transition'
        let tIdx = 0;
        const typeTransition = setInterval(() => {
          setDisplayedTransition(transitionWord.slice(0, tIdx + 1));
          tIdx++;
          if (tIdx === transitionWord.length) {
            clearInterval(typeTransition);
            // Type out 'after'
            let j = 0;
            const typeAfter = setInterval(() => {
              setDisplayedTextEnd(after.slice(0, j + 1));
              j++;
              if (j === after.length) clearInterval(typeAfter);
            }, 60);
          }
        }, 70);
      }
    }, 55);
    return () => {
      clearInterval(typeBefore);
    };
  }, []);

  return (
    <div className="programs-bg user-programs-page">
      <h1 className="programs-title">
        <span className="typewriter-heading">
          {displayedText}
          <span className="programs-title-blue">{displayedTransition}</span>
          {displayedTextEnd}
        </span>
      </h1>
      <h2 className="programs-subheading">
        Break into Tech. Level Up. Pivot Smartly. Whether you're switching careers, accelerating your growth, or aiming for leadership — RoleRaise has your roadmap.
      </h2>

      <ProgramsAccordion tracks={tracks} />

      <ProgramsBenefitsCard />

      <MarketingSoftboard magnets={magnets} />
      <Footer />
    </div>
  );
}

