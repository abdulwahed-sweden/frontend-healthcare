// @/components/sections/Dashboard.tsx
"use client";
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { mockDashboardAppointments } from '@/lib/data';
import type { Appointment } from '@/lib/types';
import { StatCard } from '@/components/StatCard';
import { Users, CalendarClock, ShieldAlert, Activity } from 'lucide-react';
import { Info } from 'lucide-react';

export default function DashboardSection() {
  const appointments: Appointment[] = mockDashboardAppointments;

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'inbokad': return 'status-scheduled';
      case 'genomförd': return 'status-completed';
      case 'avbokad': return 'status-cancelled';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">Dagens översikt</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Registrerade Elever" 
          value="247" 
          description="Totalt antal elever" 
          icon={<Users className="h-6 w-6" />} 
          importance="default" 
        />
        <StatCard 
          title="Bokningar Idag" 
          value="8" 
          description="Planerade och genomförda" 
          icon={<CalendarClock className="h-6 w-6" />} 
          importance="info" 
        />
        <StatCard 
          title="Väntande Vaccinationer" 
          value="3" 
          description="Kommande denna vecka" 
          icon={<ShieldAlert className="h-6 w-6" />} 
          importance="warning" 
        />
        <StatCard 
          title="Aktiva Medicinska Ärenden" 
          value="12" 
          description="Pågående uppföljningar" 
          icon={<Activity className="h-6 w-6" />} 
          importance="success" 
        />
      </div>

      <Alert className="bg-accent/30 border-accent">
        <Info className="h-5 w-5 text-accent-foreground" />
        <AlertTitle className="font-semibold text-accent-foreground">Påminnelse</AlertTitle>
        <AlertDescription className="text-accent-foreground/90">
          Influensavaccination börjar nästa vecka. 47 elever har ännu inte lämnat samtycke från vårdnadshavare.
        </AlertDescription>
      </Alert>

      <div>
        <h3 className="text-xl font-semibold mb-3 font-headline">Kommande bokningar</h3>
        <div className="rounded-lg border overflow-hidden shadow-sm bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tid</TableHead>
                <TableHead>Elev</TableHead>
                <TableHead>Klass</TableHead>
                <TableHead>Ärende</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{appointment.tid}</TableCell>
                  <TableCell>{appointment.elev}</TableCell>
                  <TableCell>{appointment.klass}</TableCell>
                  <TableCell>{appointment.arende}</TableCell>
                  <TableCell>
                    <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                      {appointment.status}
                    </span>
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
