export interface ExperienceItem {
  role: string
  company: string
  location: string
  date: string
  bullets: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Research Assistant',
    company: 'Lakehead University',
    location: 'Thunder Bay, ON',
    date: 'Dec 2024 – May 2025',
    bullets: [
      'Improved model classification accuracy to 97.3% across 341 high-dimensional multi-omics datasets by applying feature engineering, PCA-based dimensionality reduction, and iterative cross-validation.',
      'Accelerated research reporting by delivering visual dashboards and insight summaries enabling both technical and non-technical stakeholders to act on findings confidently.',
      'Enhanced dataset quality by applying unsupervised clustering and classification techniques to identify behavioral segments and anomalies across complex biological datasets.',
    ],
  },
  {
    role: 'Data Analyst',
    company: 'UB Entertainments',
    location: 'Hyderabad, IN',
    date: 'Jan 2023 – May 2023',
    bullets: [
      'Reduced manual data correction effort by 80% across 50K+ records by automating cleaning and validation pipelines in Python (Pandas), eliminating recurring reporting inconsistencies.',
      'Improved dashboard accuracy by designing SQL-based validation logic to detect and flag missing, duplicate, and inconsistent records before reporting.',
      'Enabled data-driven marketing decisions by building Power BI dashboards tracking operational and financial KPIs, improving performance visibility across teams.',
      'Strengthened data accuracy by writing optimized SQL queries using joins, CTEs, and window functions across 50K+ operational records.',
    ],
  },
  {
    role: 'Data Associate Intern, ETL & Data Quality',
    company: 'Hindustan Petroleum Corp Ltd',
    location: 'Hyderabad, IN',
    date: 'Sep 2022 – Nov 2022',
    bullets: [
      'Eliminated manual data entry for 1,000+ invoice documents by building a Python + Tesseract OCR pipeline extracting invoice number, date, vendor, and amount to support a system migration.',
      'Improved processing efficiency by developing end-to-end Python ETL workflows to clean, transform, and load extracted invoice data into structured formats.',
      'Strengthened audit readiness by implementing database-level validation checks that automatically flagged missing and duplicate records across operational datasets.',
    ],
  },
]
