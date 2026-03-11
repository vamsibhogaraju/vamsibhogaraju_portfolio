export interface Project {
  type: string
  category: string
  title: string
  bullets: string[]
  tags: string[]
  accent: string
  featured?: boolean
  github?: string
}

export const projects: Project[] = [
  {
    type: 'Data Engineering & Big Data',
    category: 'Data Engineering & Big Data',
    title: 'Azure Databricks Lakehouse Data Pipeline',
    bullets: [
      'Reduced data processing complexity for 180K+ transactional records by designing an end-to-end Azure Lakehouse (Bronze–Silver–Gold) on Databricks, producing analytics-ready datasets from raw source data.',
      'Enabled accurate monthly sales reporting by translating business rules into optimized Spark SQL transformations generating KPIs including gross sales and net revenue.',
      'Ensured full traceability by maintaining data lineage through all pipeline layers, supporting audit-ready analytical outputs and Power BI dashboards.',
    ],
    tags: ['Azure Databricks', 'PySpark', 'Spark SQL', 'Delta Lake', 'Azure Data Lake', 'Power BI', 'ETL'],
    accent: '#3b82f6',
    featured: true,
  },
  {
    type: 'Data Analytics',
    category: 'Data Analytics',
    title: 'Wholesale Vendor Performance & Inventory Analytics',
    bullets: [
      'Improved vendor data reliability across 10K+ records by identifying and resolving data quality issues including missing values, duplicates, and formatting errors using Python and SQL.',
      'Enabled operational decision-making by building Power BI dashboards surfacing vendor trends, exceptions, and inventory turnover metrics.',
    ],
    tags: ['Python', 'SQL', 'Power BI', 'Pandas', 'Data Quality', 'Dashboard Development'],
    accent: '#6366f1',
  },
  {
    type: 'Data Analytics',
    category: 'Data Analytics',
    title: 'Customer Shopping Behavior Analysis',
    bullets: [
      'Uncovered actionable purchasing patterns by applying EDA and customer segmentation techniques to transaction data using Python and Pandas.',
      'Supported targeted marketing decisions by translating findings into visual dashboards highlighting behavioral trends and buying cycles.',
    ],
    tags: ['Python', 'Pandas', 'SQL', 'EDA', 'Customer Segmentation'],
    accent: '#6366f1',
  },
  {
    type: 'Data Engineering & Big Data',
    category: 'Data Engineering & Big Data',
    title: 'Uber Ride Data Analysis with Apache Spark',
    bullets: [
      'Extracted insights on ride demand, peak hours, and geographic patterns from large-scale Uber data by building distributed PySpark transformation workflows.',
      'Demonstrated production-grade scalability by designing the pipeline for large data volumes reflecting real-world big data engineering standards.',
    ],
    tags: ['Apache Spark', 'PySpark', 'SparkSQL', 'Big Data'],
    accent: '#8b5cf6',
  },
  {
    type: 'NLP / ML Research',
    category: 'NLP/ML',
    title: 'Attendance Face Recognition System',
    bullets: [
      'Built a real-time attendance monitoring system using face recognition that automatically detects and identifies students from live video, marking them present without manual input.',
      'Implemented a two-stage pipeline: Haar Cascade Algorithm for face detection (locating and extracting faces from frames) followed by LBPH Algorithm for face recognition (matching extracted faces against a pre-fed student image database).',
      'Designed the system to recognize both frontal and side-profile faces using Local Binary Pattern Histogram, enabling robust identification across varying angles and lighting conditions.',
    ],
    tags: ['Python', 'OpenCV', 'Haar Cascade', 'LBPH', 'Face Recognition', 'Computer Vision'],
    accent: '#10b981',
  },
  {
    type: 'ML & Recommendation Systems',
    category: 'NLP/ML',
    title: 'Movie Recommendation System',
    bullets: [
      'Built a content-based movie recommender system using Cosine Similarity from Scikit-learn, recommending films by analyzing keyword attributes and measuring vector similarity across a multi-dimensional feature space.',
      'Engineered the full ML pipeline using Pandas and NumPy for data processing, with similarity scores ranging 0 to 1 to rank recommendations by relevance.',
      'Deployed the Streamlit web application to Heroku with TMDB API integration for live movie data and poster retrieval, making it production-ready and publicly accessible.',
    ],
    tags: ['Python', 'Scikit-learn', 'Cosine Similarity', 'Pandas', 'NumPy', 'Streamlit', 'Heroku', 'TMDB API'],
    accent: '#6366f1',
    github: 'https://github.com/vamsibhogaraju/movie-recommendation-system',
  },
  {
    type: 'NLP / ML Research',
    category: 'NLP/ML',
    title: 'NLP-Driven Automated Question Generator',
    bullets: [
      'Reduced manual question creation effort by building an NLP pipeline generating MCQs, Fill in the Blanks, and True/False questions from any input text.',
      'Achieved high-quality MCQ distractors by integrating WordNet and Sense2Vec for contextually accurate wrong answer choices.',
      'Validated via peer-reviewed IEEE ICTCS 2025 publication combining T5, BERT, GPT-2, and AllenNLP.',
    ],
    tags: ['NLP', 'Python', 'T5', 'BERT', 'GPT-2', 'AllenNLP', 'ML'],
    accent: '#10b981',
  },
]

export const projectCategories = ['All', 'Data Analytics', 'Data Engineering & Big Data', 'NLP/ML']
