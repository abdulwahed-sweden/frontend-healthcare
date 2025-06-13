import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from 'react';
import { cn } from "@/lib/utils";

type Importance = 'default' | 'info' | 'warning' | 'success';

interface StatCardProps {
  title: string;
  value: string | number;
  description: string;
  icon?: React.ReactNode;
  className?: string;
  importance?: Importance;
}

export function StatCard({ title, value, description, icon, className, importance = 'default' }: StatCardProps) {
  let cardClasses = "shadow-lg";
  let titleClasses = "text-sm font-medium";
  let iconContainerClasses = ""; // For potential icon styling if needed, not directly color

  switch (importance) {
    case 'info':
      cardClasses = cn(cardClasses, "bg-blue-100 border-2 border-blue-500");
      titleClasses = cn(titleClasses, "text-blue-700");
      iconContainerClasses = "text-blue-700";
      break;
    case 'warning':
      cardClasses = cn(cardClasses, "bg-yellow-100 border-2 border-yellow-500");
      titleClasses = cn(titleClasses, "text-yellow-700");
      iconContainerClasses = "text-yellow-700";
      break;
    case 'success':
      cardClasses = cn(cardClasses, "bg-green-100 border-2 border-green-500");
      titleClasses = cn(titleClasses, "text-green-700");
      iconContainerClasses = "text-green-700";
      break;
    case 'default':
    default:
      cardClasses = cn(cardClasses, "bg-card border border-muted");
      titleClasses = cn(titleClasses, "text-muted-foreground");
      iconContainerClasses = "text-muted-foreground";
      break;
  }

  let finalIcon = icon;
  if (React.isValidElement(icon)) {
    // Add importance-based color to the icon, preserving existing classes
    finalIcon = React.cloneElement(icon as React.ReactElement<any>, {
      className: cn((icon.props as any).className, iconContainerClasses)
    });
  }


  return (
    <Card className={cn(cardClasses, className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={titleClasses}>{title}</CardTitle>
        {finalIcon}
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-foreground">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
