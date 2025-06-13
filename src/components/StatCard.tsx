import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, description, icon, className }: StatCardProps) {
  return (
    <Card className={`shadow-lg bg-gradient-to-br from-primary to-primary/80 text-primary-foreground ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">{value}</div>
        <p className="text-xs text-primary-foreground/80">{description}</p>
      </CardContent>
    </Card>
  );
}
