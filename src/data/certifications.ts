export interface Certification {
  title: string
  issuer: string
  badge: string
  description: string
  initial: string
  color: string
}

export const certifications: Certification[] = [
  {
    title: 'Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    badge: 'PL-300',
    description:
      'Validates expertise in designing scalable data models, transforming data, and building advanced Power BI analytics solutions.',
    initial: 'M',
    color: '#3b82f6',
  },
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    badge: 'Professional',
    description:
      'Comprehensive training in data analytics including data cleaning, analysis, visualization, and structured analytical thinking.',
    initial: 'G',
    color: '#10b981',
  },
  {
    title: 'Machine Learning Certificate',
    issuer: 'Cognibot',
    badge: 'Oct 2021',
    description:
      'Completed an intensive live Machine Learning program including hands-on project work covering core ML concepts, model building, and real-world application.',
    initial: 'C',
    color: '#8b5cf6',
  },
]
