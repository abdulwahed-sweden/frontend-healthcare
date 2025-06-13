import type { Student, Appointment, MedicalRecord, Message, HealthProblemReport } from './types';

export const mockStudents: Student[] = [
  { id: 'amira', name: 'Amira Benali', personnummer: '2012-03-15-XXXX', klass: '6B', sprak: 'Arabiska/Svenska', vardnadshavare: 'Yasmin Benali' },
  { id: 'erik', name: 'Erik Lindström', personnummer: '2011-08-22-XXXX', klass: '7A', sprak: 'Svenska', vardnadshavare: 'Maria Lindström' },
  { id: 'fatima', name: 'Fatima Al-Hassan', personnummer: '2013-11-08-XXXX', klass: '5A', sprak: 'Arabiska/Svenska', vardnadshavare: 'Ahmed Al-Hassan' },
  { id: 'jin', name: 'Jin Park', personnummer: '2012-05-17-XXXX', klass: '6A', sprak: 'Koreanska/Svenska', vardnadshavare: 'Mi-Young Park' },
  { id: 'liam', name: 'Liam O\'Connor', personnummer: '2011-12-03-XXXX', klass: '7C', sprak: 'Engelska/Svenska', vardnadshavare: 'Sarah O\'Connor' },
  { id: 'maja', name: 'Maja Petković', personnummer: '2013-09-28-XXXX', klass: '5B', sprak: 'Serbiska/Svenska', vardnadshavare: 'Milica Petković' },
  { id: 'mohammed', name: 'Mohammed Khalil', personnummer: '2010-01-10-XXXX', klass: '8C', sprak: 'Arabiska/Svenska', vardnadshavare: 'Ali Khalil' },
  { id: 'lina', name: 'Lina Svensson', personnummer: '2012-07-01-XXXX', klass: '6A', sprak: 'Svenska', vardnadshavare: 'Anna Svensson' },
];

export const mockDashboardAppointments: Appointment[] = [
  { id: 'dash1', tid: '09:00', datum: '2025-06-13', elev: 'Erik Johansson', klass: '7B', arende: 'Hälsokontroll', status: 'Inbokad' },
  { id: 'dash2', tid: '09:30', datum: '2025-06-13', elev: 'Fatima Al-Hassan', klass: '5A', arende: 'Vaccination - Hepatit B', status: 'Inbokad' },
  { id: 'dash3', tid: '10:15', datum: '2025-06-13', elev: 'Mohammed Khalil', klass: '8C', arende: 'Astmakontroll', status: 'Genomförd' },
  { id: 'dash4', tid: '11:00', datum: '2025-06-13', elev: 'Lina Svensson', klass: '6A', arende: 'Allergiutredning', status: 'Inbokad' },
];

export const mockAppointments: Appointment[] = [
  { id: 'app1', datum: '2025-06-13', tid: '09:00', elev: 'Erik Johansson', typ: 'Hälsokontroll', prioritet: 'Normal', status: 'Inbokad', personal: 'Anna Andersson', arende: 'Hälsokontroll' },
  { id: 'app2', datum: '2025-06-13', tid: '09:30', elev: 'Fatima Al-Hassan', typ: 'Vaccination', prioritet: 'Hög', status: 'Inbokad', personal: 'Dr. Lars Holm', arende: 'Vaccination' },
  { id: 'app3', datum: '2025-06-13', tid: '10:15', elev: 'Mohammed Khalil', typ: 'Astmakontroll', prioritet: 'Normal', status: 'Genomförd', personal: 'Anna Andersson', arende: 'Astmakontroll' },
];

export const mockMedicalRecords: MedicalRecord[] = [
  { id: 'rec1', elev: 'Amira Benali', typ: 'Allergi', datum: '2025-05-20', beskrivning: 'Nötallergier dokumenterade, EpiPen ordinerad', skapadAv: 'Dr. Lars Holm' },
  { id: 'rec2', elev: 'Mohammed Khalil', typ: 'Astma', datum: '2025-06-13', beskrivning: 'Rutinkontroll - inhalator fungerar bra', skapadAv: 'Anna Andersson' },
  { id: 'rec3', elev: 'Jin Park', typ: 'Vaccination', datum: '2025-06-10', beskrivning: 'HPV-vaccination dos 1/2 administrerad', skapadAv: 'Anna Andersson' },
];

export const mockMessages: Message[] = [
  { id: 'msg1', mottagare: 'Yasmin Benali', typ: 'SMS', meddelande: 'Påminnelse: Amiras hälsokontroll imorgon kl 14:00', sprak: 'Arabiska', status: 'Levererat', skickat: '13 jun 08:30' },
  { id: 'msg2', mottagare: 'Maria Lindström', typ: 'E-post', meddelande: 'Resultat från Eriks hälsokontroll finns tillgängliga', sprak: 'Svenska', status: 'Levererat', skickat: '12 jun 16:45' },
  { id: 'msg3', mottagare: 'Ahmed Al-Hassan', typ: 'SMS', meddelande: 'Samtycke för vaccination behövs - svara JA eller NEJ', sprak: 'Arabiska', status: 'Väntar svar', skickat: '12 jun 14:20' },
];

export const mockHealthProblemReports: HealthProblemReport[] = [
  { id: 'rep1', diagnos: 'Allergi - mat', antalFall: 8, aldersgrupp: '5-12 år', trend: 'Ökning' },
  { id: 'rep2', diagnos: 'Astma', antalFall: 6, aldersgrupp: '7-15 år', trend: 'Stabilt' },
  { id: 'rep3', diagnos: 'Huvudvärk', antalFall: 12, aldersgrupp: '13-16 år', trend: 'Minskning' },
  { id: 'rep4', diagnos: 'Hudproblem', antalFall: 9, aldersgrupp: '12-16 år', trend: 'Ökning' },
];

export const schoolClasses = ['5A', '5B', '6A', '6B', '7A', '7B', '7C', '8A', '8B', '8C', '9A', '9B'];
export const languages = ['Svenska', 'Engelska', 'Arabiska', 'Somaliska', 'Persiska', 'Finska', 'Serbiska', 'Polska', 'Annat'];
export const appointmentTypes = ['Hälsokontroll', 'Vaccination', 'Allergiutredning', 'Astmakontroll', 'Psykolog samtal', 'Kurator samtal', 'Akut besök', 'Uppföljning'];
export const appointmentPriorities = ['Normal', 'Hög', 'Låg', 'Akut'];
export const appointmentTimes = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'];
export const messageRecipients = [
  { group: 'Vårdnadshavare', options: mockStudents.map(s => ({ value: s.vardnadshavare, label: `${s.vardnadshavare} (${s.name}s vårdnadshavare)`})) },
  { group: 'Personal', options: [{ value: 'Dr. Lars Holm', label: 'Dr. Lars Holm'}, { value: 'Psykolog Emma Nilsson', label: 'Psykolog Emma Nilsson'}, { value: 'Kurator David Karlsson', label: 'Kurator David Karlsson'}]}
];
export const messageTypes = ['SMS', 'E-post', 'Push-notifikation'];
