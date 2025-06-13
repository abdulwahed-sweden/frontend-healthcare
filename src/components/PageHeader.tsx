// @/components/PageHeader.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { Hospital } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function PageHeader() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('sv-SE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <Card className="mb-6 shadow-md">
      <CardContent className="p-6">
        <div className="flex items-center gap-4 mb-2">
          <Hospital className="h-10 w-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary font-headline">Skolhälsa Pro</h1>
        </div>
        <p className="text-muted-foreground mb-4">Elevhälsa Management System - Digitalt vårdhanteringssystem för skolor</p>
        <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary text-sm">
          <p><strong>Inloggad som:</strong> Anna Andersson (Skolsköterska)</p>
          <p><strong>Skola:</strong> Södermalms Grundskola</p>
          <p><strong>Datum:</strong> <span id="currentDate">{currentDate || "Laddar datum..."}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
