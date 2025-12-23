
export type DocType = 'CC' | 'CE' | 'TI' | 'PAS';

export enum EducationType {
  PRIMARIA = 'Primaria',
  SECUNDARIA = 'Secundaria',
  TECNICO = 'Técnico',
  TECNOLOGICO = 'Tecnológico',
  UNIVERSITARIO = 'Universitario',
  ESPECIALISTA = 'Especialista',
  MAGISTER = 'Magister',
  DIPLOMADO = 'Diplomado',
  CURSO = 'Curso',
  COMPETENCIA = 'Competencia'
}

export interface Education {
  id: string;
  type: EducationType;
  institution: string;
  title: string;
  year: string;
  city: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  city: string;
  current: boolean;
}

export interface Reference {
  id: string;
  type: 'Personal' | 'Familiar';
  name: string;
  profession: string;
  phone: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  professionalTitle: string; // New field for the header title
  photo?: string; // Base64 string
  docType: DocType;
  docNumber: string;
  expeditionPlace: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  neighborhood: string; // Barrio
  phone: string;
  email: string;
  city: string;
}

export interface Attachment {
  id: string;
  title: string; // e.g., "Antecedentes Policía"
  image: string; // Base64 string
}

export interface ResumeData {
  id?: string; // Unique ID for persistence
  lastModified?: string;
  personal: PersonalInfo;
  education: Education[];
  hasExperience: boolean;
  experience: Experience[];
  references: Reference[];
  attachments: Attachment[]; // New field for supports
  templateId: 'design-a' | 'design-b' | 'design-c' | 'design-d' | 'ats' | 'design-green' | 'design-red' | 'design-orange';
}

export interface User {
  id?: string; // Database ID
  username: string; 
  password: string; 
  resumes: ResumeData[];
}

export const INITIAL_DATA: ResumeData = {
  personal: {
    firstName: '',
    lastName: '',
    professionalTitle: '',
    docType: 'CC',
    docNumber: '',
    expeditionPlace: '',
    birthDate: '',
    birthPlace: '',
    address: '',
    neighborhood: '',
    phone: '',
    email: '',
    city: 'Barrancabermeja'
  },
  education: [],
  hasExperience: false,
  experience: [],
  references: [],
  attachments: [],
  templateId: 'design-a'
};
