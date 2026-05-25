# Multivariate Analysis - Interactive Classroom Platform (NEP 2020)

This is a premium, highly interactive, static educational web application designed to deliver advanced postgraduate engineering/science topics in **Multivariate Analysis** to a lecture hall of 60 students. It is optimized for projector displays with high-contrast UI, custom sized typography controls, and real-time interactive parameters tuning.

---

## 🚀 Key Features

1. **Projector-Optimized UI**:
   - Double-enlarged typography (minimum body text `18px`, scalable to `22px+` on one click).
   - High-contrast, anti-glare Dark Mode to reduce classroom eye strain and make equations visible on low-contrast school projectors.
2. **Interactive Mathematical Modelling**:
   - Custom LaTeX rendering with KaTeX (integrated securely without React 19 dependency warnings).
   - Dynamic parameter tuning (mean vector and covariance matrix sliders) that deforms a 60-point scatter plot in real-time.
   - Run-time computation of correlation coefficients ($\rho$) and eigenvalue profiles.
3. **NEP 2020 Active & Project Learning**:
   - 4-level activity pathways (Teacher Do, Teacher+Student, All Students Group, Individual Student).
   - Structured Capstone projects mapped to TRL Level 3 showing budgeting, Gantt timelines, resource matrices, and risk heatmaps.
4. **Learning Analytics & Mapping**:
   - Mapped to Course Outcomes (CO1-CO6) showing overall progress.
   - Interactive Topic Dependency Graph mapping prerequisite hierarchies using animated SVG paths.
5. **Classroom Diagnostics**:
   - Diagnostic mapping to evaluate prerequisite student skill levels (Matrix Algebra, Univariate Normal variables, Integration, etc.).

---

## 🛠️ Technology Stack

- **Core**: React 19 (TypeScript) + Vite
- **Styling**: Tailwind CSS v4 (configured via native CSS `@theme` directives for Vite compatibility)
- **Animation**: Framer Motion
- **Visualizations**: Recharts (with custom responsive wrappers)
- **Math Engine**: KaTeX (for zero-latency math expressions)
- **Icons**: Lucide React

---

## 💻 Environment Setup & Run Guide

### Prerequisites
Make sure you have Node.js (version 18 or above) installed on your system.

### 1. Installation
Clone the repository and install the dependencies:
```bash
# Navigate to the website root
cd website

# Install dependencies (utilizes legacy-peer-deps for React 19 compatibility if required)
npm install
```

### 2. Running Locally (Development Server)
To start the hot-reloading development server for classroom presentations:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Static Production Build
To compile the static bundle optimized for deployment:
```bash
npm run build
```
This builds static artifacts under the `dist/` directory.

---

## ⚡ Deployment Instructions

### Deploying to Vercel (Static Hosting)

Since this is a static, frontend-only project, it is fully optimized for Vercel's Edge network:

1. **Via Vercel CLI**:
   Install the Vercel CLI globally and deploy:
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```
2. **Via Vercel GitHub Integration**:
   - Go to your Vercel Dashboard.
   - Click **Add New Project** and select the import source: `muzabasha/gkvkpg`.
   - Configure the Build and Output settings (pre-filled automatically for Vite projects):
     - **Framework Preset**: `Vite`
     - **Build Command**: `npm run dev` or `npm run build`
     - **Output Directory**: `dist`
   - Click **Deploy**. Vercel will automatically configure SSL, edge cache, and redeploy on every commit to the `main` branch.

---

## 📚 Curriculum Structure (Recursive Content Plan)

The platform is designed around the **Human-in-the-Loop (HIL)** reviewer framework:
1. **Block I: Introduction to Multivariate Analysis**
   - **Topic 1**: Concept of random vector, expectation and Variance-Covariance matrix (*Fully Implemented*)
   - **Topic 2**: Marginal and joint distributions of random vectors (*Locked until Topic 1 approval*)
   - **Topic 3**: Conditional distributions and independence (*Locked*)
   - **Topic 4**: Multinomial distribution (*Locked*)
   - **Topic 5**: Multivariate Normal distribution (*Locked*)
   - **Topic 6**: Sample mean vector and its distribution (*Locked*)
   - **Topic 7**: MLE of mean vector and dispersion matrix (*Locked*)
   - **Topic 8**: Tests of hypothesis (*Locked*)
2. **Block II: Multivariate Tests** (Hotelling's $T^2$, Mahalanobis $D^2$, Wilks' Lambda, LDF)
3. **Block III: Data Reduction and Classification** (PCA, Factor Analysis, Cluster Analysis, MDS)
