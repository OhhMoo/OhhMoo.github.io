export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  links: { label: string; href: string }[];
  featured?: boolean;
  /** Optional: path to project image, e.g. "/images/pacmc.png" */
  image?: string;
  /** Aspect ratio (height/width) for the featured panel image box. Default 0.34 (wide/shallow). */
  imageAspect?: number;
  /** How the image fills its box. "contain" shows full image, "cover" fills all space. Default "contain". */
  imageFit?: "contain" | "cover";
  /** Optional: media rendered below the description — iframes (.html) or images (.gif/.png) */
  iframes?: { src: string; label?: string }[];
};

export const projects: Project[] = [
  {
    id: "speqtro",
    title: "SPEQTRO",
    tagline: "Autonomous spectroscopy reasoning agent",
    description:
      "Agentic AI system for autonomous spectroscopy analysis with CLI, GUI, and MCP interfaces. Features multi-format spectral parsers (JCAMP-DX, Bruker FID, CSV), an ensemble scoring pipeline combining 4 independent ML evidence streams, and a full test suite (34 unit tests). Pip-installable: pip install speqtro.",
    techStack: ["Python", "PyTorch", "MCP", "NMR", "Mass Spec"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/SPEQTRO" }],
    featured: true,
    image: "/images/speqtro-logo.png",
    imageFit: "contain",
    iframes: [
      { src: "/images/speqtro-demo.mov", label: "CLI demo — live terminal session" },
    ],
  },
  {
    id: "langalpha",
    title: "LangAlpha",
    tagline: "AI investment research agent harness",
    description:
      "Persistent agent system for financial research where work compounds across sessions in dedicated sandbox workspaces, each with an agent.md memory file. Uses Programmatic Tool Calling (PTC) — the agent writes code to process market data locally instead of flooding LLM context. Ships 23 pre-built finance skills (DCF, earnings, comps, morning notes), a parallel subagent swarm with live steering, multi-provider LLM failover, and per-workspace encrypted secret vaults.",
    techStack: ["Python", "FastAPI", "LangGraph", "React", "PostgreSQL", "Daytona"],
    links: [
      { label: "GitHub", href: "https://github.com/ginlix-ai/LangAlpha" },
      { label: "Live site", href: "https://langalpha.com/" },
    ],
    featured: true,
  },
  {
    id: "water-clustering",
    title: "Water Clustering",
    tagline: "Supercooled water structural analysis pipeline",
    description:
      "Large-scale molecular dynamics simulations on HPC studying structural heterogeneity in supercooled water. Automated pipelines for preprocessing, feature scaling, and visualization of high-dimensional order-parameter datasets. Applied DBSCAN and GMM clustering to characterize distinct structural motifs, validated against the two-state liquid framework (Shi & Tanaka, JACS 2020).",
    techStack: ["Python", "OpenMM", "NumPy", "HDBSCAN", "MD Simulation"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/Water_Clustering" }],
    featured: true,
    iframes: [
      { src: "/plotly/water-3d-cluster0.html", label: "Cluster 0 — Low-density (LFTS)" },
      { src: "/plotly/water-3d-cluster1.html", label: "Cluster 1 — High-density (DNLS)" },
    ],
  },
  {
    id: "sae-rl",
    title: "SAE Research",
    tagline: "Mechanistic interpretability of reinforcement learning",
    description:
      "End-to-end pipeline for mechanistic interpretability of RL-trained models: PPO fine-tuning (verl), activation caching, Sparse Autoencoder training (SAELens, BatchTopK), and automated feature analysis across training checkpoints. Developed feature lifecycle analysis (born/died/stable features) and decoder cosine similarity tracking to quantify representational drift during RL training.",
    techStack: ["Python", "PyTorch", "SAELens", "verl", "PPO", "Sparse Autoencoders"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/sae_rl" }],
  },
  {
    id: "iceberg-pyg",
    title: "ICEBERG-PyG",
    tagline: "DGL → PyTorch Geometric migration",
    description:
      "Migrated the ICEBERG MS/MS fragmentation prediction codebase (19 files, 8 GNN model families) from DGL to PyTorch Geometric, restoring cross-platform compatibility on Windows and macOS. Rewrote GGNN, PNA, and GINE layers using PyG's MessagePassing API and redesigned the DAG fragment-level data pipeline with PyG's Batch and scatter operations.",
    techStack: ["Python", "PyTorch", "PyG", "GNN", "Cheminformatics"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/ms-pred-PyG-ver" }],
  },
];
