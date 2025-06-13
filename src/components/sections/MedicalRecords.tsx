// @/components/sections/MedicalRecords.tsx
"use client";
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { mockMedicalRecords } from '@/lib/data';
import type { MedicalRecord } from '@/lib/types';
import { Lock, Eye } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function MedicalRecordsSection() {
  const medicalRecords: MedicalRecord[] = mockMedicalRecords;
  const { toast } = useToast();

  const handleViewFullRecord = (record: MedicalRecord) => {
    toast({ title: "Visa journal", description: `Visar fullständig journal för ${record.elev}. (Demo)` });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">Medicinska journaler</h2>
      
      <Alert variant="default" className="bg-primary/10 border-primary text-primary-foreground">
        <Lock className="h-5 w-5 text-primary" />
        <AlertTitle className="font-semibold text-primary">Säkerhetsmeddelande</AlertTitle>
        <AlertDescription className="text-primary/90">
          All medicinsk information är krypterad och loggas enligt GDPR-kraven.
        </AlertDescription>
      </Alert>

      <div className="rounded-lg border overflow-hidden shadow-sm bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Elev</TableHead>
              <TableHead>Typ av journal</TableHead>
              <TableHead>Datum</TableHead>
              <TableHead>Beskrivning</TableHead>
              <TableHead>Skapad av</TableHead>
              <TableHead>Åtgärder</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.elev}</TableCell>
                <TableCell>{record.typ}</TableCell>
                <TableCell>{record.datum}</TableCell>
                <TableCell>{record.beskrivning}</TableCell>
                <TableCell>{record.skapadAv}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" onClick={() => handleViewFullRecord(record)}>
                    <Eye className="mr-2 h-4 w-4" /> Visa fullständig journal
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
