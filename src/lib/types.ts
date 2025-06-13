export interface Student {
  id: string;
  name: string;
  personnummer: string;
  klass: string;
  sprak: string;
  vardnadshavare: string;
}

export interface Appointment {
  id: string;
  tid: string;
  datum: string;
  elev: string;
  klass?: string; // Optional if elev name implies student object
  arende: string;
  typ?: string; // Added for Appointments section
  prioritet?: 'Hög' | 'Normal' | 'Låg' | 'Akut'; // Added for Appointments section
  status: 'Inbokad' | 'Genomförd' | 'Avbokad';
  personal?: string; // Added for Appointments section
}

export interface MedicalRecord {
  id: string;
  elev: string;
  typ: string;
  datum: string;
  beskrivning: string;
  skapadAv: string;
}

export interface Message {
  id: string;
  mottagare: string;
  typ: 'SMS' | 'E-post' | 'Push-notifikation';
  meddelande: string;
  sprak: string;
  status: 'Levererat' | 'Skickat' | 'Väntar svar' | 'Misslyckades';
  skickat: string;
}

export interface HealthProblemReport {
  id: string;
  diagnos: string;
  antalFall: number;
  aldersgrupp: string;
  trend: 'Ökning' | 'Stabilt' | 'Minskning';
}

export type Audience = 'students' | 'parents' | 'medical professionals';
