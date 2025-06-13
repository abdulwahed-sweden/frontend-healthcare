// @/components/sections/Appointments.tsx
"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockAppointments } from '@/lib/data';
import type { Appointment } from '@/lib/types';
import AddAppointmentDialog from '@/components/dialogs/AddAppointmentDialog';
import { PlusCircle, FilePenLine, XCircle, ClipboardList } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function AppointmentsSection() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [isAddAppointmentDialogOpen, setIsAddAppointmentDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddAppointment = (newAppointmentData: Omit<Appointment, 'id' | 'status' | 'personal' | 'arende'> & { elevId: string }) => {
    const student = mockAppointments.find(a => a.id === newAppointmentData.elevId); // This logic needs adjustment. Assuming elevId is student name for now
    const newAppointment: Appointment = {
      id: String(Date.now()), // Simple ID generation
      datum: newAppointmentData.datum,
      tid: newAppointmentData.tid,
      elev: student?.elev || newAppointmentData.elevId, // Fallback if student name not found
      typ: newAppointmentData.typ,
      prioritet: newAppointmentData.prioritet as Appointment['prioritet'],
      status: 'Inbokad', // Default status
      personal: 'Anna Andersson', // Default personal
      arende: newAppointmentData.typ, // Use typ as arende for simplicity
    };
    setAppointments(prev => [...prev, newAppointment]);
  };
  
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'inbokad': return 'status-scheduled';
      case 'genomförd': return 'status-completed';
      case 'avbokad': return 'status-cancelled';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const getPriorityClass = (priority?: string) => {
    if (!priority) return 'bg-gray-200 text-gray-800';
    switch (priority.toLowerCase()) {
      case 'hög': return 'priority-high';
      case 'normal': return 'priority-normal';
      case 'låg': return 'priority-low';
      case 'akut': return 'priority-high'; // Akut uses high priority styling
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  const handleEditAppointment = (appointment: Appointment) => {
    toast({ title: "Redigera bokning", description: `Redigerar bokning för ${appointment.elev}. (Demo)` });
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => prev.map(app => app.id === appointmentId ? {...app, status: 'Avbokad'} : app));
    toast({ title: "Bokning avbokad", description: `Bokningen har markerats som avbokad.`, variant: "destructive" });
  };

  const handleViewJournal = (appointment: Appointment) => {
    toast({ title: "Visa journal", description: `Visar journal relaterad till bokning för ${appointment.elev}. (Demo)` });
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-headline">Bokningshantering</h2>
        <Button onClick={() => setIsAddAppointmentDialogOpen(true)}>
          <PlusCircle className="mr-2 h-5 w-5" /> Ny bokning
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Datum & Tid</TableHead>
              <TableHead>Elev</TableHead>
              <TableHead>Typ</TableHead>
              <TableHead>Prioritet</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Personal</TableHead>
              <TableHead>Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.datum} {appointment.tid}</TableCell>
                <TableCell>{appointment.elev}</TableCell>
                <TableCell>{appointment.typ}</TableCell>
                <TableCell>
                  <span className={`status-badge ${getPriorityClass(appointment.prioritet)}`}>
                    {appointment.prioritet}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`status-badge ${getStatusClass(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </TableCell>
                <TableCell>{appointment.personal}</TableCell>
                <TableCell className="space-x-1">
                  {appointment.status !== 'Genomförd' && appointment.status !== 'Avbokad' && (
                    <>
                    <Button variant="outline" size="sm" onClick={() => handleEditAppointment(appointment)}>
                      <FilePenLine className="h-4 w-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleCancelAppointment(appointment.id)}>
                      <XCircle className="h-4 w-4" />
                    </Button>
                    </>
                  )}
                  {appointment.status === 'Genomförd' && (
                     <Button variant="outline" size="sm" onClick={() => handleViewJournal(appointment)}>
                        <ClipboardList className="h-4 w-4" />
                     </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <AddAppointmentDialog 
        open={isAddAppointmentDialogOpen} 
        onOpenChange={setIsAddAppointmentDialogOpen}
        onAddAppointment={handleAddAppointment}
      />
    </div>
  );
}
