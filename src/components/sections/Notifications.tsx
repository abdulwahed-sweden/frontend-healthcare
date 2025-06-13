// @/components/sections/Notifications.tsx
"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockMessages } from '@/lib/data';
import type { Message } from '@/lib/types';
import AddMessageDialog from '@/components/dialogs/AddMessageDialog';
import { StatCard } from '@/components/StatCard';
import { Send, Mail, BellRing, CheckCircle2, MessageCircleQuestion } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function NotificationsSection() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isAddMessageDialogOpen, setIsAddMessageDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (newMessageData: Omit<Message, 'id' | 'status' | 'skickat'>) => {
    const newMessage: Message = {
      id: String(Date.now()), // Simple ID generation
      ...newMessageData,
      status: 'Skickat', // Default status
      skickat: new Date().toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [newMessage, ...prev]); // Add to beginning of list
  };

  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case 'levererat': return 'status-completed';
      case 'skickat': return 'status-scheduled'; // Using 'scheduled' style for 'skickat'
      case 'väntar svar': return 'status-waiting';
      case 'misslyckades': return 'status-cancelled';
      default: return 'bg-gray-200 text-gray-800';
    }
  };


  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">Meddelanden & Kommunikation</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Skickade SMS Idag" value="23" description="Totalt antal SMS" icon={<Send className="h-6 w-6 text-primary-foreground/80" />} />
        <StatCard title="E-post Skickat" value="47" description="Totalt antal e-post" icon={<Mail className="h-6 w-6 text-primary-foreground/80" />} />
        <StatCard title="Väntande Svar" value="5" description="Meddelanden som inväntar svar" icon={<MessageCircleQuestion className="h-6 w-6 text-primary-foreground/80" />} />
        <StatCard title="Leveransgrad" value="98%" description="Framgångsrika leveranser" icon={<CheckCircle2 className="h-6 w-6 text-primary-foreground/80" />} />
      </div>
      
      <div className="flex justify-end">
        <Button onClick={() => setIsAddMessageDialogOpen(true)}>
          <BellRing className="mr-2 h-5 w-5" /> Skicka nytt meddelande
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-3 font-headline">Senaste meddelanden</h3>
        <div className="rounded-lg border overflow-hidden shadow-sm bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mottagare</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Meddelande</TableHead>
                <TableHead>Språk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Skickat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id}>
                  <TableCell>{message.mottagare}</TableCell>
                  <TableCell>{message.typ}</TableCell>
                  <TableCell className="max-w-xs truncate">{message.meddelande}</TableCell>
                  <TableCell>{message.sprak}</TableCell>
                  <TableCell>
                    <span className={`status-badge ${getStatusClass(message.status)}`}>
                      {message.status}
                    </span>
                  </TableCell>
                  <TableCell>{message.skickat}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddMessageDialog
        open={isAddMessageDialogOpen}
        onOpenChange={setIsAddMessageDialogOpen}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
