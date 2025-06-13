// @/components/dialogs/AddAppointmentDialog.tsx
"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { mockStudents, appointmentTypes, appointmentPriorities, appointmentTimes } from '@/lib/data';
import { CalendarPlus, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const appointmentSchema = z.object({
  elevId: z.string().min(1, "Elev är obligatoriskt"),
  datum: z.string().min(1, "Datum är obligatoriskt"), // Should be validated as date
  tid: z.string().min(1, "Tid är obligatoriskt"),
  typ: z.string().min(1, "Typ av besök är obligatoriskt"),
  prioritet: z.string().min(1, "Prioritet är obligatoriskt"),
  anteckningar: z.string().optional(),
  meddelaVardnadshavare: z.boolean().default(false),
});

type AppointmentFormData = z.infer<typeof appointmentSchema>;

interface AddAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddAppointment: (appointment: AppointmentFormData) => void;
}

export default function AddAppointmentDialog({ open, onOpenChange, onAddAppointment }: AddAppointmentDialogProps) {
  const { toast } = useToast();
  const form = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      elevId: "",
      datum: new Date().toISOString().split('T')[0], // Default to today
      tid: "",
      typ: "",
      prioritet: "Normal",
      anteckningar: "",
      meddelaVardnadshavare: false,
    },
  });

  const onSubmit: SubmitHandler<AppointmentFormData> = (data) => {
    onAddAppointment(data);
    const studentName = mockStudents.find(s => s.id === data.elevId)?.name || 'Okänd elev';
    toast({ title: "Bokning skapad", description: `Ny bokning för ${studentName} den ${data.datum} kl ${data.tid}.` });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline">Ny bokning</DialogTitle>
          <DialogDescription>Fyll i detaljer för den nya bokningen.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="elevId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Elev</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj elev" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {mockStudents.map(student => <SelectItem key={student.id} value={student.id}>{student.name} ({student.klass})</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="datum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Datum</FormLabel>
                    <FormControl><Input type="date" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tid</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj tid" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {appointmentTimes.map(time => <SelectItem key={time} value={time}>{time}</SelectItem>)}
                    </SelectContent>
                  </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="typ"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ av besök</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj typ" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {appointmentTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="prioritet"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prioritet</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj prioritet" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {appointmentPriorities.map(prio => <SelectItem key={prio} value={prio}>{prio}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="anteckningar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anledning/Anteckningar</FormLabel>
                  <FormControl><Textarea placeholder="Beskriv anledningen till besöket..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meddelaVardnadshavare"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Meddela vårdnadshavare</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline"><X className="mr-2 h-4 w-4" /> Avbryt</Button>
              </DialogClose>
              <Button type="submit"><CalendarPlus className="mr-2 h-4 w-4" /> Boka tid</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
