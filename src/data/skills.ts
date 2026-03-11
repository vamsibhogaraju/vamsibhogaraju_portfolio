export interface SkillCategory {
  name: string
  primary: string[]
  secondary: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'Cloud & Big Data',
    primary: ['Azure Databricks', 'Microsoft Azure', 'Azure Data Lake', 'Azure Synapse'],
    secondary: ['Delta Lake', 'PySpark', 'SparkSQL', 'Apache Spark', 'Azure Data Factory'],
  },
  {
    name: 'SQL & Databases',
    primary: ['SQL', 'T-SQL'],
    secondary: ['MySQL', 'PostgreSQL', 'CTEs', 'Window Functions', 'Joins'],
  },
  {
    name: 'Data Engineering',
    primary: ['ETL Pipelines', 'Data Warehousing', 'Data Transformation', 'Data Ingestion'],
    secondary: ['Data Lineage', 'Data Modeling', 'Data Validation'],
  },
  {
    name: 'Programming',
    primary: ['Python'],
    secondary: ['Pandas', 'NumPy'],
  },
  {
    name: 'BI & Visualization',
    primary: ['Power BI', 'DAX'],
    secondary: ['Data Visualization', 'KPI Reporting', 'Dashboard Development'],
  },
  {
    name: 'NLP & ML',
    primary: ['NLP', 'T5 Transformer'],
    secondary: ['BERT', 'GPT-2', 'AllenNLP', 'Machine Learning'],
  },
]

export const radarData = [
  { skill: 'Cloud', A: 90 },
  { skill: 'SQL', A: 92 },
  { skill: 'Engineering', A: 88 },
  { skill: 'Python', A: 85 },
  { skill: 'BI', A: 90 },
  { skill: 'NLP/ML', A: 75 },
]
