// @/components/sections/AiTool.tsx
"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Wand2, Lightbulb } from 'lucide-react';
import { clarifyMessage, ClarifyMessageInput, ClarifyMessageOutput } from '@/ai/flows/clarify-message';
import type { Audience } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AiToolSection() {
  const [originalMessage, setOriginalMessage] = useState('');
  const [audience, setAudience] = useState<Audience | ''>('');
  const [clarifiedResult, setClarifiedResult] = useState<ClarifyMessageOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!originalMessage || !audience) {
      setError("Vänligen ange både meddelande och målgrupp.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setClarifiedResult(null);

    try {
      const input: ClarifyMessageInput = {
        message: originalMessage,
        audience: audience as Audience, // Cast as we've checked it's not empty
      };
      const result = await clarifyMessage(input);
      setClarifiedResult(result);
    } catch (e) {
      console.error("AI clarification error:", e);
      setError("Ett fel uppstod vid bearbetning av meddelandet. Försök igen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold font-headline">AI Meddelandeklarhet</h2>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center"><Wand2 className="mr-2 h-6 w-6 text-primary" /> Förbättra ditt meddelande</CardTitle>
          <CardDescription>Använd AI för att omformulera ditt meddelande så att det blir tydligare för din valda målgrupp.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="original-message" className="mb-2 block font-medium">Originalmeddelande</Label>
            <Textarea
              id="original-message"
              placeholder="Skriv ditt meddelande här..."
              value={originalMessage}
              onChange={(e) => setOriginalMessage(e.target.value)}
              rows={5}
              className="resize-none"
            />
          </div>
          <div>
            <Label htmlFor="audience-select" className="mb-2 block font-medium">Målgrupp</Label>
            <Select value={audience} onValueChange={(value) => setAudience(value as Audience)}>
              <SelectTrigger id="audience-select">
                <SelectValue placeholder="Välj målgrupp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="students">Elever</SelectItem>
                <SelectItem value="parents">Föräldrar/Vårdnadshavare</SelectItem>
                <SelectItem value="medical professionals">Medicinsk personal</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Fel</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} disabled={isLoading || !originalMessage || !audience}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wand2 className="mr-2 h-4 w-4" />
            )}
            Klarifiera meddelande
          </Button>
        </CardFooter>
      </Card>

      {clarifiedResult && (
        <Card className="mt-6 shadow-md bg-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center"><Lightbulb className="mr-2 h-6 w-6 text-primary" /> AI Förslag</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Klarifierat meddelande:</h3>
              <p className="p-3 bg-background rounded-md border text-sm">{clarifiedResult.clarifiedMessage}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Motivering:</h3>
              <p className="p-3 bg-background rounded-md border text-sm">{clarifiedResult.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
