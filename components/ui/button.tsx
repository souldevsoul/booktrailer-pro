"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  size?: "sm" | "md" | "lg" | "xl" | "icon"
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    asChild,
    className,
    children,
    disabled,
    ...props
  }, ref) => {

    // Size styles - Minimal
    const sizeStyles = {
      sm: "h-9 px-4 text-sm rounded",
      md: "h-11 px-6 text-base rounded",
      lg: "h-12 px-8 text-base rounded-md",
      xl: "h-14 px-10 text-lg rounded-md",
      icon: "h-11 w-11 rounded",
    }

    // Variant styles - Minimalist black/white/red
    const variantStyles = {
      primary: "bg-black text-white hover:bg-gray-800 shadow-minimal-sm font-medium transition-all duration-200",
      secondary: "bg-white text-black border border-gray-200 hover:border-black hover:shadow-minimal-md font-medium transition-all duration-200",
      outline: "border border-black text-black hover:bg-black hover:text-white font-medium transition-all duration-200",
      ghost: "text-gray-700 hover:bg-gray-100 font-medium transition-all duration-200",
      destructive: "bg-red-600 text-white hover:bg-red-700 shadow-minimal-sm font-medium transition-all duration-200",
      link: "text-black hover:text-red-600 underline underline-offset-4 font-medium transition-colors duration-200",
    }

    const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

    // If asChild is true, just render the children directly with styling
    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && "w-full",
          className,
          (children as any).props.className
        ),
      })
    }

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          sizeStyles[size],
          variantStyles[variant],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {leftIcon && <span>{leftIcon}</span>}
        {children}
        {rightIcon && <span>{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
