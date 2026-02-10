import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "default" | "sm";
}

export function Card({
  className,
  size = "default",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 bg-white/80 text-zinc-950 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-50",
        size === "default" && "p-6",
        size === "sm" && "p-4",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mb-4 flex flex-col gap-1 border-b border-zinc-100 pb-4 dark:border-zinc-800",
        className
      )}
      {...props}
    />
  );
}

export function CardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-tight tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-sm text-zinc-600 dark:text-zinc-400",
        className
      )}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("space-y-2 text-sm leading-relaxed", className)}
      {...props}
    />
  );
}

export function CardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-between gap-2 border-t border-zinc-100 pt-4 text-sm dark:border-zinc-800",
        className
      )}
      {...props}
    />
  );
}

