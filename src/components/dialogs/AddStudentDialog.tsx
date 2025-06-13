// @/components/dialogs/AddStudentDialog.tsx
"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { schoolClasses, languages } from '@/lib/data';
import { Save, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const studentSchema = z.object({
  firstName: z.string().min(1, "Förnamn är obligatoriskt"),
  lastName: z.string().min(1, "Efternamn är obligatoriskt"),
  personnummer: z.string().regex(/^\d{4}-\d{2}-\d{2}-\d{4}$/, "Ogiltigt personnummerformat (YYYY-MM-DD-XXXX)"),
  klass: z.string().min(1, "Klass är obligatoriskt"),
  sprak: z.string().min(1, "Språk är obligatoriskt"),
});

type StudentFormData = z.infer<typeof studentSchema>;

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddStudent: (student: StudentFormData) => void;
}

export default function AddStudentDialog({ open, onOpenChange, onAddStudent }: AddStudentDialogProps) {
  const { toast } = useToast();
  const form = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      personnummer: "",
      klass: "",
      sprak: "Svenska",
    },
  });

  const onSubmit: SubmitHandler<StudentFormData> = (data) => {
    onAddStudent(data);
    toast({ title: "Elev tillagd", description: `${data.firstName} ${data.lastName} har lagts till i registret.` });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline">Lägg till ny elev</DialogTitle>
          <DialogDescription>Fyll i informationen nedan för att registrera en ny elev.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Förnamn</FormLabel>
                  <FormControl><Input placeholder="Elevens förnamn" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Efternamn</FormLabel>
                  <FormControl><Input placeholder="Elevens efternamn" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personnummer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Personnummer</FormLabel>
                  <FormControl><Input placeholder="YYYY-MM-DD-XXXX" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="klass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Klass</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj klass" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {schoolClasses.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sprak"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Språkpreferens</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj språk" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {languages.map(lang => <SelectItem key={lang} value={lang}>{lang}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline"><X className="mr-2 h-4 w-4" /> Avbryt</Button>
              </DialogClose>
              <Button type="submit"><Save className="mr-2 h-4 w-4" /> Spara elev</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
