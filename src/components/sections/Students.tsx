// @/components/sections/Students.tsx
"use client";
import React, { useState, useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStudents } from '@/lib/data';
import type { Student } from '@/lib/types';
import AddStudentDialog from '@/components/dialogs/AddStudentDialog';
import { PlusCircle, Search, Eye, CalendarPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function StudentsSection() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const { toast } = useToast();

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      Object.values(student).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [students, searchTerm]);

  const handleAddStudent = (newStudentData: Omit<Student, 'id' | 'vardnadshavare'> & { firstName: string, lastName: string }) => {
    const newStudent: Student = {
      id: String(Date.now()), // Simple ID generation for mock
      name: `${newStudentData.firstName} ${newStudentData.lastName}`,
      personnummer: newStudentData.personnummer,
      klass: newStudentData.klass,
      sprak: newStudentData.sprak,
      vardnadshavare: "Ej angivet", // Placeholder, ideally part of form
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const handleViewStudent = (student: Student) => {
    toast({ title: "Visa elev", description: `Visar detaljer för ${student.name}. (Demo)` });
  };

  const handleBookAppointmentForStudent = (student: Student) => {
     toast({ title: "Boka tid", description: `Öppnar bokningsformulär för ${student.name}. (Demo)` });
     // Here you would typically open an appointment dialog, passing student info
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">Elevregister</h2>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            type="text" 
            placeholder="Sök elev..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>
        <Button onClick={() => setIsAddStudentDialogOpen(true)} className="w-full sm:w-auto">
          <PlusCircle className="mr-2 h-5 w-5" /> Lägg till ny elev
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Namn</TableHead>
              <TableHead>Personnummer</TableHead>
              <TableHead>Klass</TableHead>
              <TableHead>Språk</TableHead>
              <TableHead>Vårdnadshavare</TableHead>
              <TableHead>Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.personnummer}</TableCell>
                <TableCell>{student.klass}</TableCell>
                <TableCell>{student.sprak}</TableCell>
                <TableCell>{student.vardnadshavare}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleViewStudent(student)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="default" size="sm" onClick={() => handleBookAppointmentForStudent(student)}>
                    <CalendarPlus className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
             {filteredStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  Inga elever matchade sökningen.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <AddStudentDialog 
        open={isAddStudentDialogOpen} 
        onOpenChange={setIsAddStudentDialogOpen}
        onAddStudent={handleAddStudent}
      />
    </div>
  );
}
