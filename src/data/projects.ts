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
      { src: "/images/speqtro.gif", label: "CLI demo — live terminal session" },
    ],
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
    title: "SAE-RL",
    tagline: "Mechanistic interpretability of reinforcement learning",
    description:
      "End-to-end pipeline for mechanistic interpretability of RL-trained models: PPO fine-tuning (verl), activation caching, Sparse Autoencoder training (SAELens, BatchTopK), and automated feature analysis across training checkpoints. Developed feature lifecycle analysis (born/died/stable features) and decoder cosine similarity tracking to quantify representational drift during RL training.",
    techStack: ["Python", "PyTorch", "SAELens", "verl", "PPO", "Sparse Autoencoders"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/sae_rl" }],
  },
  {
    id: "pacmc",
    title: "PACMC",
    tagline: "CMC Regulatory Change Agent",
    description:
      "Agent pipeline for classifying pharmaceutical CMC regulatory changes across FDA, EMA, and PMDA simultaneously. Built on deterministic decision trees encoded from regulatory guidance — not RAG — resolving cross-jurisdictional interactions that no single document addresses. Replaces months of manual review with structured, auditable output.",
    techStack: ["Python", "RAG", "Decision Trees", "FastAPI"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/PACMC" }],
  },
  {
    id: "p-pinpoint",
    title: "P-Pinpoint",
    tagline: "AI-powered business location recommender",
    description:
      "Describe your business in plain English. Pinpoint scores all 50 US states against real BEA economic data and returns ranked location recommendations with explanations — all from a terminal CLI.",
    techStack: ["Python", "BEA Data", "CLI"],
    links: [{ label: "GitHub", href: "https://github.com/OhhMoo/P-Pinpoint" }],
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
