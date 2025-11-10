"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CardProps extends React.PropsWithChildren<React.HTMLAttributes<HTMLDivElement>> {
  variant?: "default" | "elevated" | "gradient"
  hover?: "none" | "lift" | "glow"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = "default",
    hover = "none",
    className,
    children,
    ...props
  }, ref) => {

    // Variant styles - Cinematic cards with film aesthetic
    const variantStyles = {
      default: "bg-white border border-slate-200 shadow-cinema-md rounded-xl",
      elevated: "bg-white border border-slate-200 shadow-cinema-xl rounded-2xl",
      gradient: "bg-gradient-primary text-white shadow-cinema-lg rounded-2xl border-2 border-gray-400",
    }

    // Hover styles - Cinematic effects
    const hoverStyles = {
      none: "",
      lift: "hover-lift",
      glow: "hover-glow",
    }

    return (
      <div
        ref={ref}
        className={cn(
          "p-6 transition-all duration-300",
          variantStyles[variant],
          hoverStyles[hover],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 mb-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-display font-bold leading-tight tracking-tight text-slate-900",
      className
    )}
    {...props}
  >
    {children}
  </h3>
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-600 leading-relaxed", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-6 mt-6 border-t border-slate-200", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent
}
