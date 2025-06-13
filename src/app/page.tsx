// @/app/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import PageHeader from '@/components/PageHeader';
import DashboardSection from '@/components/sections/Dashboard';
import StudentsSection from '@/components/sections/Students';
import AppointmentsSection from '@/components/sections/Appointments';
import MedicalRecordsSection from '@/components/sections/MedicalRecords';
import NotificationsSection from '@/components/sections/Notifications';
import ReportsSection from '@/components/sections/Reports';
import AiToolSection from '@/components/sections/AiTool';

import { LayoutDashboard, Users2, CalendarClock, ClipboardPlus, Bell, BarChartHorizontalBig, Wand2, HelpCircle } from 'lucide-react';

const TABS_CONFIG = [
  { value: "dashboard", label: "Översikt", Icon: LayoutDashboard, Component: DashboardSection },
  { value: "students", label: "Elever", Icon: Users2, Component: StudentsSection },
  { value: "appointments", label: "Bokningar", Icon: CalendarClock, Component: AppointmentsSection },
  { value: "medical", label: "Journaler", Icon: ClipboardPlus, Component: MedicalRecordsSection },
  { value: "notifications", label: "Meddelanden", Icon: Bell, Component: NotificationsSection },
  { value: "reports", label: "Rapporter", Icon: BarChartHorizontalBig, Component: ReportsSection },
  { value: "ai-tool", label: "AI Verktyg", Icon: Wand2, Component: AiToolSection },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].value);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        const numKey = parseInt(event.key);
        if (numKey >= 1 && numKey <= TABS_CONFIG.length) {
          event.preventDefault();
          setActiveTab(TABS_CONFIG[numKey - 1].value);
        }
      }
      if (event.key === 'Escape') {
        setIsHelpModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <PageHeader />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mb-6 bg-transparent p-0">
            {TABS_CONFIG.map(tab => (
              <TabsTrigger 
                key={tab.value} 
                value={tab.value} 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md hover:bg-primary/10 transition-colors py-2.5 px-3 rounded-lg"
              >
                <tab.Icon className="mr-0 md:mr-2 h-5 w-5" />
                <span className="hidden md:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {TABS_CONFIG.map(tab => (
            <TabsContent key={tab.value} value={tab.value} className="bg-card p-6 rounded-xl shadow-lg">
              <tab.Component />
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Dialog open={isHelpModalOpen} onOpenChange={setIsHelpModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-headline flex items-center"><HelpCircle className="mr-2 h-6 w-6 text-primary"/> Hjälp & Information</DialogTitle>
            <DialogDescription>
              Användbara tips och kortkommandon för Skolhälsa Pro.
            </DialogDescription>
          </DialogHeader>
          <ul className="list-disc space-y-2 pl-5 text-sm mt-4">
            <li>Använd <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Ctrl/Cmd</kbd> + <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">1-7</kbd> för att snabbt växla mellan sektioner.</li>
            <li>Tryck <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">Esc</kbd> för att stänga dialogrutor (som denna).</li>
            <li>Sökfunktioner är tillgängliga på relevanta sidor.</li>
            <li>All data hanteras säkert och enligt GDPR.</li>
            <li>Systemet stöder flerspråkig kommunikation.</li>
          </ul>
        </DialogContent>
      </Dialog>
      
      <Button 
        variant="default" 
        size="icon" 
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50"
        onClick={() => setIsHelpModalOpen(true)}
        aria-label="Hjälp"
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}
