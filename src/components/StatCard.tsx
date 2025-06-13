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
  let iconContainerClasses = ""; 
  let valueClasses = "text-4xl font-bold text-foreground";
  let descriptionClasses = "text-xs text-muted-foreground";

  switch (importance) {
    case 'info':
      cardClasses = cn(cardClasses, "bg-blue-100 border-2 border-blue-500");
      titleClasses = cn(titleClasses, "text-blue-700");
      iconContainerClasses = "text-blue-700";
      valueClasses = cn(valueClasses, "text-blue-900"); // Darker blue for value
      descriptionClasses = cn(descriptionClasses, "text-blue-600");
      break;
    case 'warning':
      cardClasses = cn(cardClasses, "bg-yellow-100 border-2 border-yellow-500");
      titleClasses = cn(titleClasses, "text-yellow-700");
      iconContainerClasses = "text-yellow-700";
      valueClasses = cn(valueClasses, "text-yellow-900"); // Darker yellow for value
      descriptionClasses = cn(descriptionClasses, "text-yellow-600");
      break;
    case 'success':
      cardClasses = cn(cardClasses, "bg-green-100 border-2 border-green-500");
      titleClasses = cn(titleClasses, "text-green-700");
      iconContainerClasses = "text-green-700";
      valueClasses = cn(valueClasses, "text-green-900"); // Darker green for value
      descriptionClasses = cn(descriptionClasses, "text-green-600");
      break;
    case 'default':
    default:
      cardClasses = cn(cardClasses, "bg-card border border-border"); // Changed border-muted to border-border
      titleClasses = cn(titleClasses, "text-muted-foreground");
      iconContainerClasses = "text-muted-foreground";
      // valueClasses and descriptionClasses use their default foreground/muted-foreground
      break;
  }

  let finalIcon = icon;
  if (React.isValidElement(icon)) {
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
        <div className={valueClasses}>{value}</div>
        <p className={descriptionClasses}>{description}</p>
      </CardContent>
    </Card>
  );
}
