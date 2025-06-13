// @/components/sections/Reports.tsx
"use client";
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockHealthProblemReports } from '@/lib/data';
import type { HealthProblemReport } from '@/lib/types';
import { StatCard } from '@/components/StatCard';
import { Percent, Activity, Users, ShieldCheck, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { CheckCircle } from 'lucide-react';


export default function ReportsSection() {
  const reports: HealthProblemReport[] = mockHealthProblemReports;

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'Ökning': return <TrendingUp className="inline-block h-4 w-4 ml-1 text-red-500" />;
      case 'Stabilt': return <Minus className="inline-block h-4 w-4 ml-1 text-yellow-500" />;
      case 'Minskning': return <TrendingDown className="inline-block h-4 w-4 ml-1 text-green-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">Rapporter & Statistik</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Vaccinationstäckning" value="89%" description="Andel vaccinerade elever" icon={<ShieldCheck className="h-6 w-6 text-primary-foreground/80" />} />
        <StatCard title="Genomförda Kontroller" value="156" description="Denna månad" icon={<Activity className="h-6 w-6 text-primary-foreground/80" />} />
        <StatCard title="Akuta Ärenden" value="12" description="Senaste 30 dagarna" icon={<Users className="h-6 w-6 text-primary-foreground/80" />} /> {/* Using Users as placeholder, could be AlertTriangle */}
        <StatCard title="Föräldranöjdhet" value="95%" description="Baserat på senaste enkät" icon={<Percent className="h-6 w-6 text-primary-foreground/80" />} />
      </div>

      <Alert variant="default" className="bg-green-100 border-green-500 text-green-700 dark:bg-green-900/50 dark:border-green-700 dark:text-green-300">
        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="font-semibold">Månadsrapport: Maj 2025</AlertTitle>
        <AlertDescription>
          Alla vaccinationsmål uppnådda. Särskilt bra resultat för HPV-vaccination (94% täckning).
        </AlertDescription>
      </Alert>

      <div>
        <h3 className="text-xl font-semibold mb-3 font-headline">Vanligaste hälsoproblem (senaste månaden)</h3>
        <div className="rounded-lg border overflow-hidden shadow-sm bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Diagnos/Problem</TableHead>
                <TableHead>Antal fall</TableHead>
                <TableHead>Åldersgrupp</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.diagnos}</TableCell>
                  <TableCell>{report.antalFall}</TableCell>
                  <TableCell>{report.aldersgrupp}</TableCell>
                  <TableCell>
                    {report.trend} {getTrendIcon(report.trend)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
