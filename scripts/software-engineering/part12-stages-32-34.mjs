/**
 * Part 12: subtopics + sub-subtopics for stages 32-34
 *   32. Software Engineering Ethics & Professionalism
 *   33. Specialized Software Engineering Domains
 *   34. Software Engineering Education, Career & Interviews
 *
 * Run with: node scripts/software-engineering/part12-stages-32-34.mjs
 */
import { addTopics } from './addTopics.mjs'

addTopics([
  /* ============================================================
   * STAGE 32 — Software Engineering Ethics & Professionalism
   * ============================================================ */

  /* ---- engineering-ethics-fundamentals ---- */
  { id: 'engineering-ethics-fundamentals--definition', title: 'Definition of Engineering Ethics', parentId: 'engineering-ethics-fundamentals' },
  { id: 'engineering-ethics-fundamentals--why-ethics-in-software', title: 'Why Ethics Matters in Software', parentId: 'engineering-ethics-fundamentals' },
  { id: 'engineering-ethics-fundamentals--famous-failures', title: 'Famous Software Failures (Therac-25, Boeing 737 MAX, Volkswagen Diesel, Horizon Post Office)', parentId: 'engineering-ethics-fundamentals' },
  { id: 'engineering-ethics-fundamentals--ethics-frameworks', title: 'Ethics Frameworks (Consequentialism, Deontology, Virtue, Care)', parentId: 'engineering-ethics-fundamentals' },
  { id: 'engineering-ethics-fundamentals--social-responsibility', title: 'Social Responsibility', parentId: 'engineering-ethics-fundamentals' },
  { id: 'engineering-ethics-fundamentals--moral-machine-problem', title: 'Moral Machine & Algorithmic Decision-Making', parentId: 'engineering-ethics-fundamentals' },

  /* ---- acm-code-of-ethics ---- */
  { id: 'acm-code-of-ethics--general-principles', title: 'General Ethical Principles (1.1–1.7)', parentId: 'acm-code-of-ethics' },
  { id: 'acm-code-of-ethics--professional-responsibilities', title: 'Professional Responsibilities (2.1–2.9)', parentId: 'acm-code-of-ethics' },
  { id: 'acm-code-of-ethics--leadership-principles', title: 'Professional Leadership Principles (3.1–3.7)', parentId: 'acm-code-of-ethics' },
  { id: 'acm-code-of-ethics--compliance', title: 'Compliance with the Code (4.1–4.2)', parentId: 'acm-code-of-ethics' },
  { id: 'acm-code-of-ethics--applying-the-code', title: 'Applying the Code in Practice', parentId: 'acm-code-of-ethics' },

  /* ---- ieee-cs-code-of-ethics ---- */
  { id: 'ieee-cs-code-of-ethics--ieee-cs-acm-joint-code', title: 'IEEE-CS / ACM Joint SE Code of Ethics', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--public-principle', title: 'Public Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--client-and-employer', title: 'Client & Employer Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--product-principle', title: 'Product Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--judgment-principle', title: 'Judgment Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--management-principle', title: 'Management Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--profession-principle', title: 'Profession Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--colleagues-principle', title: 'Colleagues Principle', parentId: 'ieee-cs-code-of-ethics' },
  { id: 'ieee-cs-code-of-ethics--self-principle', title: 'Self Principle', parentId: 'ieee-cs-code-of-ethics' },

  /* ---- professional-responsibility ---- */
  { id: 'professional-responsibility--duty-to-public', title: 'Duty to the Public', parentId: 'professional-responsibility' },
  { id: 'professional-responsibility--duty-to-employer-client', title: 'Duty to Employer & Client', parentId: 'professional-responsibility' },
  { id: 'professional-responsibility--duty-to-profession', title: 'Duty to the Profession', parentId: 'professional-responsibility' },
  { id: 'professional-responsibility--duty-to-self', title: 'Duty to Self', parentId: 'professional-responsibility' },
  { id: 'professional-responsibility--conflicts-of-interest', title: 'Conflicts of Interest', parentId: 'professional-responsibility' },
  { id: 'professional-responsibility--moonlighting-and-ip', title: 'Moonlighting & IP Conflicts', parentId: 'professional-responsibility' },
  { id: 'professional-responsibility--professional-misconduct', title: 'Professional Misconduct', parentId: 'professional-responsibility' },

  /* ---- whistleblowing-in-software ---- */
  { id: 'whistleblowing-in-software--what-is-whistleblowing', title: 'What Is Whistleblowing?', parentId: 'whistleblowing-in-software' },
  { id: 'whistleblowing-in-software--legal-protections', title: 'Legal Protections (US, EU, UK)', parentId: 'whistleblowing-in-software' },
  { id: 'whistleblowing-in-software--internal-vs-external', title: 'Internal vs External Whistleblowing', parentId: 'whistleblowing-in-software' },
  { id: 'whistleblowing-in-software--famous-cases', title: 'Famous Cases (VW Diesel, Theranos, Frances Haugen)', parentId: 'whistleblowing-in-software' },
  { id: 'whistleblowing-in-software--decision-framework', title: 'Decision Framework for Whistleblowing', parentId: 'whistleblowing-in-software' },
  { id: 'whistleblowing-in-software--retaliation-and-protection', title: 'Retaliation & Protection', parentId: 'whistleblowing-in-software' },

  /* ---- responsible-ai-engineering ---- */
  { id: 'responsible-ai-engineering--engineer-obligations', title: 'Engineer Obligations for AI Systems', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--bias-and-fairness', title: 'Bias & Fairness Engineering', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--explainability-engineering', title: 'Explainability Engineering', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--accountability', title: 'Accountability Engineering', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--model-cards-data-sheets', title: 'Model Cards & Datasheets', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--eu-ai-act-engineer-view', title: 'EU AI Act (Engineer View)', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--nist-ai-rmf', title: 'NIST AI RMF', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--iso-iec-42001', title: 'ISO/IEC 42001 (AI Management Systems)', parentId: 'responsible-ai-engineering' },
  { id: 'responsible-ai-engineering--ethical-ai-checklists', title: 'Ethical AI Checklists', parentId: 'responsible-ai-engineering' },

  /* ---- privacy-by-design-ethics ---- */
  { id: 'privacy-by-design-ethics--cavoukian-7-principles', title: 'Cavoukian 7 Foundational Principles', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--proactive-not-reactive', title: 'Proactive Not Reactive', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--privacy-as-default', title: 'Privacy as Default', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--end-to-end-security', title: 'End-to-End Security', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--privacy-engineering', title: 'Privacy Engineering Discipline', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--data-minimization', title: 'Data Minimization', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--gdpr-engineer-view', title: 'GDPR (Engineer View)', parentId: 'privacy-by-design-ethics' },
  { id: 'privacy-by-design-ethics--dark-patterns', title: 'Dark Patterns & Ethical Design', parentId: 'privacy-by-design-ethics' },

  /* ---- software-engineering-licensing ---- */
  { id: 'software-engineering-licensing--should-se-be-licensed', title: 'Should SE Be a Licensed Profession? (Debate)', parentId: 'software-engineering-licensing' },
  { id: 'software-engineering-licensing--p-eng-canada', title: 'P.Eng. (Canada)', parentId: 'software-engineering-licensing' },
  { id: 'software-engineering-licensing--peng-australia-uk', title: 'PEng / CEng (Australia, UK)', parentId: 'software-engineering-licensing' },
  { id: 'software-engineering-licensing--pe-software-us', title: 'PE Software (US — Discontinued 2019)', parentId: 'software-engineering-licensing' },
  { id: 'software-engineering-licensing--bcs-charter', title: 'BCS Chartered Engineer (UK)', parentId: 'software-engineering-licensing' },
  { id: 'software-engineering-licensing--ec-council-and-international-routes', title: 'International Routes & Engineering Councils', parentId: 'software-engineering-licensing' },
  { id: 'software-engineering-licensing--liability-and-malpractice', title: 'Liability & Engineering Malpractice', parentId: 'software-engineering-licensing' },

  /* ============================================================
   * STAGE 33 — Specialized Software Engineering Domains
   * ============================================================ */

  /* ---- real-time-software-engineering ---- */
  { id: 'real-time-software-engineering--what-is-real-time', title: 'What Is Real-Time Software?', parentId: 'real-time-software-engineering' },
  { id: 'real-time-software-engineering--hard-vs-firm-vs-soft', title: 'Hard vs Firm vs Soft Real-Time', parentId: 'real-time-software-engineering' },
  { id: 'real-time-software-engineering--scheduling-rate-monotonic', title: 'Rate-Monotonic Scheduling', parentId: 'real-time-software-engineering' },
  { id: 'real-time-software-engineering--scheduling-edf', title: 'Earliest-Deadline-First (EDF)', parentId: 'real-time-software-engineering' },
  { id: 'real-time-software-engineering--worst-case-execution-time', title: 'WCET Analysis', parentId: 'real-time-software-engineering' },
  { id: 'real-time-software-engineering--rtos-overview', title: 'RTOS Overview (FreeRTOS, Zephyr, QNX, VxWorks, RT-Thread)', parentId: 'real-time-software-engineering' },
  { id: 'real-time-software-engineering--time-sensitive-networking', title: 'Time-Sensitive Networking (TSN)', parentId: 'real-time-software-engineering' },

  /* ---- embedded-software-engineering ---- */
  { id: 'embedded-software-engineering--what-is-embedded', title: 'What Is Embedded Software?', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--mcu-vs-mpu', title: 'MCU vs MPU', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--bare-metal-vs-rtos', title: 'Bare-Metal vs RTOS', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--memory-constraints', title: 'Memory & Power Constraints', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--cross-compilation-embedded', title: 'Cross-Compilation Toolchains', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--firmware-update-strategies', title: 'Firmware Update Strategies (A/B, OTA)', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--debug-with-jtag-swd', title: 'Debugging with JTAG/SWD', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--rust-for-embedded-2026', title: 'Rust for Embedded (2026)', parentId: 'embedded-software-engineering' },
  { id: 'embedded-software-engineering--embedded-testing', title: 'Embedded Testing (HIL, SIL, MIL)', parentId: 'embedded-software-engineering' },

  /* ---- safety-critical-software ---- */
  { id: 'safety-critical-software--definition', title: 'Definition & Scope', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--do-178c-aviation', title: 'DO-178C (Aviation)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--iec-61508', title: 'IEC 61508 (Functional Safety)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--iso-26262-automotive', title: 'ISO 26262 (Automotive)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--iec-62304-medical', title: 'IEC 62304 (Medical Devices)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--iec-60880-nuclear', title: 'IEC 60880 (Nuclear)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--en-50128-rail', title: 'EN 50128 (Rail)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--sil-asil-dal-levels', title: 'SIL / ASIL / DAL Levels', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--mc-dc-coverage', title: 'MC/DC Coverage Requirements', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--safety-cases', title: 'Safety Cases (GSN)', parentId: 'safety-critical-software' },
  { id: 'safety-critical-software--certification-and-audit', title: 'Certification & Audit Process', parentId: 'safety-critical-software' },

  /* ---- mission-critical-software ---- */
  { id: 'mission-critical-software--definition', title: 'Definition & Examples', parentId: 'mission-critical-software' },
  { id: 'mission-critical-software--five-nines-and-availability', title: 'Five-Nines & Availability Targets', parentId: 'mission-critical-software' },
  { id: 'mission-critical-software--fault-tolerance-engineering', title: 'Fault-Tolerance Engineering', parentId: 'mission-critical-software' },
  { id: 'mission-critical-software--byzantine-fault-tolerance-process', title: 'BFT (Process Considerations)', parentId: 'mission-critical-software' },
  { id: 'mission-critical-software--dual-redundancy', title: 'Dual & Triple Redundancy', parentId: 'mission-critical-software' },
  { id: 'mission-critical-software--graceful-degradation', title: 'Graceful Degradation', parentId: 'mission-critical-software' },
  { id: 'mission-critical-software--postmortem-and-blameless-culture-mc', title: 'Postmortem & Blameless Culture (MC View)', parentId: 'mission-critical-software' },

  /* ---- scientific-software-engineering ---- */
  { id: 'scientific-software-engineering--research-code-vs-prod-code', title: 'Research Code vs Production Code', parentId: 'scientific-software-engineering' },
  { id: 'scientific-software-engineering--reproducibility-in-research', title: 'Reproducibility in Research', parentId: 'scientific-software-engineering' },
  { id: 'scientific-software-engineering--research-software-engineering-rse', title: 'Research Software Engineer (RSE) Role', parentId: 'scientific-software-engineering' },
  { id: 'scientific-software-engineering--rse-societies', title: 'RSE Societies (US-RSE, UK RSE Assoc., DE-RSE)', parentId: 'scientific-software-engineering' },
  { id: 'scientific-software-engineering--better-scientific-software', title: 'Better Scientific Software (BSSw)', parentId: 'scientific-software-engineering' },
  { id: 'scientific-software-engineering--jupyter-and-notebook-engineering', title: 'Jupyter & Notebook Engineering Practices', parentId: 'scientific-software-engineering' },
  { id: 'scientific-software-engineering--data-and-code-availability', title: 'Data & Code Availability Statements', parentId: 'scientific-software-engineering' },

  /* ---- hpc-software-engineering ---- */
  { id: 'hpc-software-engineering--what-is-hpc', title: 'What Is HPC?', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--mpi', title: 'MPI', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--openmp', title: 'OpenMP', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--gpgpu-cuda-rocm', title: 'GPGPU (CUDA, ROCm, oneAPI)', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--exascale-software', title: 'Exascale Software (Frontier, Aurora, El Capitan)', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--workflow-managers', title: 'Workflow Managers (Slurm, Snakemake, Nextflow, Pegasus)', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--hpc-package-managers', title: 'HPC Package Managers (Spack, EasyBuild)', parentId: 'hpc-software-engineering' },
  { id: 'hpc-software-engineering--hpc-performance-tools', title: 'HPC Performance Tools (TAU, HPCToolkit, Score-P)', parentId: 'hpc-software-engineering' },

  /* ---- mobile-engineering-process ---- */
  { id: 'mobile-engineering-process--ios-vs-android-process', title: 'iOS vs Android Process Differences', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--app-store-and-play-review', title: 'App Store & Play Review Cycles', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--phased-rollouts-mobile', title: 'Phased Rollouts on Mobile', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--feature-flags-mobile', title: 'Feature Flags on Mobile', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--code-push-and-otas-mobile', title: 'Code Push & Mobile OTA Updates', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--mobile-testing-process', title: 'Mobile Testing Process', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--device-fragmentation', title: 'Device Fragmentation Strategy', parentId: 'mobile-engineering-process' },
  { id: 'mobile-engineering-process--mobile-release-trains', title: 'Mobile Release Trains', parentId: 'mobile-engineering-process' },

  /* ---- web-engineering-process ---- */
  { id: 'web-engineering-process--web-release-cadence', title: 'Web Release Cadence', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--ssr-vs-csr-process', title: 'SSR vs CSR (Process View)', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--browser-compat-strategy', title: 'Browser Compatibility Strategy', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--web-performance-budgets', title: 'Web Performance Budgets', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--accessibility-engineering-web', title: 'Accessibility Engineering (Web)', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--seo-engineering', title: 'SEO Engineering', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--cdn-and-edge-process', title: 'CDN & Edge (Process View)', parentId: 'web-engineering-process' },
  { id: 'web-engineering-process--feature-flags-web', title: 'Feature Flags on Web', parentId: 'web-engineering-process' },

  /* ---- game-engineering-process ---- */
  { id: 'game-engineering-process--game-sdlc', title: 'Game SDLC (Concept, Pre-Production, Production, Post-Launch)', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--engines-overview', title: 'Engines Overview (Unity, Unreal, Godot, Bevy)', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--asset-pipelines', title: 'Asset Pipelines', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--build-cooking', title: 'Build Cooking & Packaging', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--qa-and-certification', title: 'QA & Console Certification', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--live-ops-process', title: 'Live Ops Process', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--multiplayer-engineering', title: 'Multiplayer Engineering Considerations', parentId: 'game-engineering-process' },
  { id: 'game-engineering-process--anti-cheat-process', title: 'Anti-Cheat Engineering Process', parentId: 'game-engineering-process' },

  /* ---- ml-engineering-process ---- */
  { id: 'ml-engineering-process--ml-vs-traditional-se', title: 'ML SE vs Traditional SE', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--mlops-overview', title: 'MLOps Overview', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--data-versioning', title: 'Data Versioning (DVC, lakeFS)', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--model-versioning', title: 'Model Versioning & Registry', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--feature-stores-process', title: 'Feature Stores (Process View)', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--training-pipelines', title: 'Training Pipelines', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--model-evaluation-and-validation', title: 'Model Evaluation & Validation', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--model-deployment', title: 'Model Deployment & Serving', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--model-monitoring-and-drift', title: 'Model Monitoring & Drift', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--llmops-2026', title: 'LLMOps (2026)', parentId: 'ml-engineering-process' },
  { id: 'ml-engineering-process--responsible-ml-process', title: 'Responsible ML Engineering Process', parentId: 'ml-engineering-process' },

  /* ---- data-engineering-process ---- */
  { id: 'data-engineering-process--data-pipeline-engineering', title: 'Data Pipeline Engineering', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--dataops-overview', title: 'DataOps Overview', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--data-mesh-process', title: 'Data Mesh (Process View)', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--data-contracts-process', title: 'Data Contracts (Process)', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--data-quality-engineering', title: 'Data Quality Engineering', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--data-lineage-process', title: 'Data Lineage (Process)', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--analytics-engineering', title: 'Analytics Engineering Discipline (dbt-Era)', parentId: 'data-engineering-process' },
  { id: 'data-engineering-process--lakehouse-engineering', title: 'Lakehouse Engineering Practices', parentId: 'data-engineering-process' },

  /* ---- iot-engineering-process ---- */
  { id: 'iot-engineering-process--iot-architecture-process', title: 'IoT Architecture (Edge / Fog / Cloud)', parentId: 'iot-engineering-process' },
  { id: 'iot-engineering-process--device-provisioning', title: 'Device Provisioning', parentId: 'iot-engineering-process' },
  { id: 'iot-engineering-process--ota-updates-iot', title: 'OTA Updates (IoT)', parentId: 'iot-engineering-process' },
  { id: 'iot-engineering-process--device-management', title: 'Device Management at Scale', parentId: 'iot-engineering-process' },
  { id: 'iot-engineering-process--mqtt-and-coap-process', title: 'MQTT & CoAP (Process View)', parentId: 'iot-engineering-process' },
  { id: 'iot-engineering-process--iot-security-process', title: 'IoT Security (Process)', parentId: 'iot-engineering-process' },
  { id: 'iot-engineering-process--matter-and-thread-2026', title: 'Matter & Thread (2026)', parentId: 'iot-engineering-process' },

  /* ---- robotics-engineering ---- */
  { id: 'robotics-engineering--ros-and-ros2', title: 'ROS & ROS 2', parentId: 'robotics-engineering' },
  { id: 'robotics-engineering--robotics-sdlc', title: 'Robotics SDLC', parentId: 'robotics-engineering' },
  { id: 'robotics-engineering--simulation-first-development', title: 'Simulation-First Development (Gazebo, Isaac Sim)', parentId: 'robotics-engineering' },
  { id: 'robotics-engineering--hil-for-robotics', title: 'HIL for Robotics', parentId: 'robotics-engineering' },
  { id: 'robotics-engineering--robotics-safety-standards', title: 'Robotics Safety Standards (ISO 10218, ISO 13482)', parentId: 'robotics-engineering' },
  { id: 'robotics-engineering--ros2-quality-standards', title: 'ROS 2 Quality Levels', parentId: 'robotics-engineering' },
  { id: 'robotics-engineering--autonomous-vehicle-engineering', title: 'Autonomous Vehicle Engineering', parentId: 'robotics-engineering' },

  /* ============================================================
   * STAGE 34 — Software Engineering Education, Career & Interviews
   * ============================================================ */

  /* ---- engineering-career-tracks ---- */
  { id: 'engineering-career-tracks--ic-vs-management', title: 'IC vs Management Tracks', parentId: 'engineering-career-tracks' },
  { id: 'engineering-career-tracks--dual-ladder', title: 'Dual Ladder Concept', parentId: 'engineering-career-tracks' },
  { id: 'engineering-career-tracks--specialist-vs-generalist', title: 'Specialist vs Generalist', parentId: 'engineering-career-tracks' },
  { id: 'engineering-career-tracks--t-shaped-vs-pi-shaped', title: 'T-Shaped vs Pi-Shaped Engineers', parentId: 'engineering-career-tracks' },
  { id: 'engineering-career-tracks--ic-management-switching', title: 'Switching Between IC & Management', parentId: 'engineering-career-tracks' },
  { id: 'engineering-career-tracks--ai-era-career-shifts-2026', title: 'AI-Era Career Shifts (2026)', parentId: 'engineering-career-tracks' },

  /* ---- ic-engineering-ladder ---- */
  { id: 'ic-engineering-ladder--junior-engineer', title: 'Junior / Software Engineer I', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--mid-level-engineer', title: 'Mid-Level / Software Engineer II', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--senior-engineer', title: 'Senior Engineer', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--staff-engineer', title: 'Staff Engineer', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--senior-staff-and-principal', title: 'Senior Staff & Principal Engineer', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--distinguished-and-fellow', title: 'Distinguished Engineer & Fellow', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--staff-archetypes', title: 'Staff Archetypes (Tech Lead, Architect, Solver, Right Hand)', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--staff-engineer-book', title: '"The Staff Engineer’s Path" / "Staff Engineer" Books', parentId: 'ic-engineering-ladder' },
  { id: 'ic-engineering-ladder--levels-fyi-comparisons', title: 'Levels.fyi Cross-Company Comparisons', parentId: 'ic-engineering-ladder' },

  /* ---- continuous-learning-strategies ---- */
  { id: 'continuous-learning-strategies--learning-mindset', title: 'Growth Mindset for Engineers', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--learning-budget', title: 'Personal Learning Budget', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--deliberate-practice', title: 'Deliberate Practice', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--reading-strategy', title: 'Reading Strategy (Books, Papers, Code)', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--paper-clubs', title: 'Paper Clubs / Reading Groups', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--writing-and-blogging', title: 'Writing & Blogging to Learn', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--teaching-and-talks', title: 'Teaching & Talks', parentId: 'continuous-learning-strategies' },
  { id: 'continuous-learning-strategies--ai-as-tutor-2026', title: 'AI as Tutor (2026)', parentId: 'continuous-learning-strategies' },

  /* ---- learning-resources-curated ---- */
  { id: 'learning-resources-curated--foundational-books', title: 'Foundational Books (Pragmatic Programmer, Clean Code, Code Complete, SICP, etc.)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--architecture-books', title: 'Architecture Books (Fundamentals of Software Architecture, DDIA, Building Microservices)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--leadership-books', title: 'Engineering Leadership Books (Staff Engineer, Tech Lead, An Elegant Puzzle)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--ai-coding-books-2026', title: 'AI Coding Books (2026)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--mooc-platforms', title: 'MOOC Platforms (Coursera, edX, Udemy, Pluralsight, Frontend Masters)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--podcasts', title: 'Podcasts (Software Engineering Daily, CoRecursive, Soft Skills Eng)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--newsletters', title: 'Newsletters (Pragmatic Engineer, Bytebytego, TLDR, Latent Space)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--blogs-and-essays', title: 'Blogs & Essays (Joel on Software, Coding Horror, etc.)', parentId: 'learning-resources-curated' },
  { id: 'learning-resources-curated--youtube-channels', title: 'YouTube Channels for Engineers', parentId: 'learning-resources-curated' },

  /* ---- coding-interviews-process ---- */
  { id: 'coding-interviews-process--ds-and-algo-prep', title: 'DS & Algorithms Prep', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--leetcode-and-hackerrank', title: 'LeetCode & HackerRank', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--system-design-interview-process', title: 'System Design Interview Process', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--whiteboarding', title: 'Whiteboarding', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--mock-interviews', title: 'Mock Interviews (Pramp, Interviewing.io)', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--cracking-the-coding-interview', title: 'Cracking the Coding Interview (McDowell)', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--ai-era-interviews-2026', title: 'AI-Era Interview Formats (2026)', parentId: 'coding-interviews-process' },
  { id: 'coding-interviews-process--anti-leetcode-movement', title: 'Anti-LeetCode Movement', parentId: 'coding-interviews-process' },

  /* ---- behavioral-interviews-process ---- */
  { id: 'behavioral-interviews-process--star-method', title: 'STAR Method', parentId: 'behavioral-interviews-process' },
  { id: 'behavioral-interviews-process--carl-method', title: 'CARL Method', parentId: 'behavioral-interviews-process' },
  { id: 'behavioral-interviews-process--leadership-stories', title: 'Leadership Stories', parentId: 'behavioral-interviews-process' },
  { id: 'behavioral-interviews-process--values-fit-interviews', title: 'Values-Fit / Bar-Raiser Interviews', parentId: 'behavioral-interviews-process' },
  { id: 'behavioral-interviews-process--amazon-leadership-principles', title: 'Amazon Leadership Principles', parentId: 'behavioral-interviews-process' },
  { id: 'behavioral-interviews-process--tell-me-about-yourself', title: '"Tell Me About Yourself" Strategy', parentId: 'behavioral-interviews-process' },
  { id: 'behavioral-interviews-process--questions-for-interviewer', title: 'Questions for the Interviewer', parentId: 'behavioral-interviews-process' },

  /* ---- take-home-and-pair-interviews ---- */
  { id: 'take-home-and-pair-interviews--take-home-strategy', title: 'Take-Home Strategy', parentId: 'take-home-and-pair-interviews' },
  { id: 'take-home-and-pair-interviews--pair-programming-interview', title: 'Pair-Programming Interview', parentId: 'take-home-and-pair-interviews' },
  { id: 'take-home-and-pair-interviews--debugging-interview', title: 'Debugging Interview', parentId: 'take-home-and-pair-interviews' },
  { id: 'take-home-and-pair-interviews--codebase-exercise', title: 'Codebase Exercise / "Live Code in IDE"', parentId: 'take-home-and-pair-interviews' },
  { id: 'take-home-and-pair-interviews--ai-allowed-interviews-2026', title: 'AI-Allowed Interviews (2026)', parentId: 'take-home-and-pair-interviews' },
  { id: 'take-home-and-pair-interviews--scope-and-fairness', title: 'Take-Home Scope & Fairness Debates', parentId: 'take-home-and-pair-interviews' },

  /* ---- portfolios-side-projects ---- */
  { id: 'portfolios-side-projects--why-side-projects', title: 'Why Side Projects Matter', parentId: 'portfolios-side-projects' },
  { id: 'portfolios-side-projects--portfolio-sites', title: 'Portfolio Sites', parentId: 'portfolios-side-projects' },
  { id: 'portfolios-side-projects--github-as-portfolio', title: 'GitHub as Portfolio', parentId: 'portfolios-side-projects' },
  { id: 'portfolios-side-projects--oss-contributions-as-portfolio', title: 'OSS Contributions as Portfolio', parentId: 'portfolios-side-projects' },
  { id: 'portfolios-side-projects--writing-as-portfolio', title: 'Writing & Blogging as Portfolio', parentId: 'portfolios-side-projects' },
  { id: 'portfolios-side-projects--ai-projects-as-portfolio-2026', title: 'AI Projects as Portfolio (2026)', parentId: 'portfolios-side-projects' },
  { id: 'portfolios-side-projects--side-project-anti-patterns', title: 'Side Project Anti-Patterns', parentId: 'portfolios-side-projects' },

  /* ---- engineering-conferences ---- */
  { id: 'engineering-conferences--why-attend', title: 'Why Attend Conferences?', parentId: 'engineering-conferences' },
  { id: 'engineering-conferences--academic-conferences', title: 'Academic Conferences (ICSE, FSE, ASE, ESEC, OOPSLA)', parentId: 'engineering-conferences' },
  { id: 'engineering-conferences--practitioner-conferences', title: 'Practitioner Conferences (QCon, GOTO, KubeCon, AWS re:Invent)', parentId: 'engineering-conferences' },
  { id: 'engineering-conferences--language-conferences', title: 'Language Conferences (PyCon, JSConf, RustConf, Devoxx, GopherCon)', parentId: 'engineering-conferences' },
  { id: 'engineering-conferences--submitting-talks', title: 'Submitting Talks (CFPs)', parentId: 'engineering-conferences' },
  { id: 'engineering-conferences--writing-papers', title: 'Writing Conference Papers', parentId: 'engineering-conferences' },
  { id: 'engineering-conferences--virtual-and-hybrid-conferences-2026', title: 'Virtual & Hybrid Conferences (2026)', parentId: 'engineering-conferences' },

  /* ---- communities-of-practice ---- */
  { id: 'communities-of-practice--what-are-cops', title: 'What Are CoPs?', parentId: 'communities-of-practice' },
  { id: 'communities-of-practice--internal-cops', title: 'Internal CoPs', parentId: 'communities-of-practice' },
  { id: 'communities-of-practice--external-cops', title: 'External CoPs', parentId: 'communities-of-practice' },
  { id: 'communities-of-practice--meetups', title: 'Meetups', parentId: 'communities-of-practice' },
  { id: 'communities-of-practice--slack-and-discord-communities', title: 'Slack & Discord Communities', parentId: 'communities-of-practice' },
  { id: 'communities-of-practice--cncf-and-other-special-interest-groups', title: 'CNCF SIGs & Other Working Groups', parentId: 'communities-of-practice' },
  { id: 'communities-of-practice--running-a-cop', title: 'Running a CoP', parentId: 'communities-of-practice' },

  /* ---- engineering-certifications ---- */
  { id: 'engineering-certifications--istqb-certifications', title: 'ISTQB Certifications (Foundation, Advanced)', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--scrum-and-agile-certs', title: 'Scrum & Agile Certs (CSM, PSM, SAFe)', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--aws-certs', title: 'AWS Certifications', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--azure-certs', title: 'Azure Certifications', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--gcp-certs', title: 'GCP Certifications', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--kubernetes-certs', title: 'Kubernetes Certifications (CKA, CKAD, CKS)', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--security-certs', title: 'Security Certs (CISSP, CSSLP, OSCP)', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--language-certs', title: 'Language-Specific Certs (Oracle Java, Microsoft .NET)', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--certs-pros-and-cons', title: 'Certs: Pros & Cons', parentId: 'engineering-certifications' },
  { id: 'engineering-certifications--ai-certifications-2026', title: 'AI Engineering Certifications (2026)', parentId: 'engineering-certifications' },
])
