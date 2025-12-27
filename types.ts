
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
  professionalTitle: string;
  photo?: string;
  docType: DocType;
  docNumber: string;
  expeditionPlace: string;
  birthDate: string;
  birthPlace: string;
  address: string;
  neighborhood: string;
  phone: string;
  email: string;
  city: string;
}

export type NeutralPalette = 'verde' | 'naranja' | 'rojo' | 'amarillo' | 'rosado' | 'negro';

export interface ResumeData {
  id?: string;
  lastModified?: string;
  personal: PersonalInfo;
  education: Education[];
  hasExperience: boolean;
  experience: Experience[];
  references: Reference[];
  templateId: 'masculino' | 'femenino' | 'ats' | 'neutro';
  neutralPalette?: NeutralPalette;
}

export interface User {
  id?: string;
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
  templateId: 'masculino',
  neutralPalette: 'negro'
};
