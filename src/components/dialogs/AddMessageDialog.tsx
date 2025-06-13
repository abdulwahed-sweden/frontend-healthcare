// @/components/dialogs/AddMessageDialog.tsx
"use client";
import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { languages, messageRecipients, messageTypes, appointmentPriorities } from '@/lib/data';
import { Send, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const messageSchema = z.object({
  mottagare: z.string().min(1, "Mottagare är obligatoriskt"),
  typ: z.string().min(1, "Typ av meddelande är obligatoriskt"),
  sprak: z.string().min(1, "Språk är obligatoriskt"),
  amne: z.string().min(1, "Ämne är obligatoriskt"),
  meddelande: z.string().min(1, "Meddelande är obligatoriskt"),
  prioritet: z.string().min(1, "Prioritet är obligatoriskt"),
  schemalagg: z.boolean().default(false),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface AddMessageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSendMessage: (message: MessageFormData) => void;
}

export default function AddMessageDialog({ open, onOpenChange, onSendMessage }: AddMessageDialogProps) {
  const { toast } = useToast();
  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      mottagare: "",
      typ: "SMS",
      sprak: "Svenska",
      amne: "",
      meddelande: "",
      prioritet: "Normal",
      schemalagg: false,
    },
  });

  const onSubmit: SubmitHandler<MessageFormData> = (data) => {
    onSendMessage(data);
    toast({ title: "Meddelande skickat", description: `Meddelande till ${data.mottagare} har skickats.` });
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline">Skicka meddelande</DialogTitle>
          <DialogDescription>Fyll i information för att skicka ett nytt meddelande.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="mottagare"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mottagare</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj mottagare" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {messageRecipients.map(group => (
                        <SelectGroup key={group.group}>
                          <Label className="px-2 py-1.5 text-sm font-semibold">{group.group}</Label>
                          {group.options.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="typ"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Typ av meddelande</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue placeholder="Välj typ" /></SelectTrigger></FormControl>
                    <SelectContent>
                      {messageTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
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
                  <FormLabel>Språk</FormLabel>
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
            </div>
            <FormField
              control={form.control}
              name="amne"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ämne</FormLabel>
                  <FormControl><Input placeholder="Meddelandets ämne" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="meddelande"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meddelande</FormLabel>
                  <FormControl><Textarea rows={4} placeholder="Skriv ditt meddelande här..." {...field} /></FormControl>
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
              name="schemalagg"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Schemalägg för senare</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <DialogClose asChild>
                <Button type="button" variant="outline"><X className="mr-2 h-4 w-4" /> Avbryt</Button>
              </DialogClose>
              <Button type="submit"><Send className="mr-2 h-4 w-4" /> Skicka meddelande</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
