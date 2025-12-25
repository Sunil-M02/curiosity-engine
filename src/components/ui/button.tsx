import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground transition-all duration-150 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_hsl(var(--primary)/0.3)]",
        destructive: "bg-destructive text-destructive-foreground transition-colors hover:bg-destructive/90",
        outline: "border border-border bg-transparent transition-colors hover:bg-secondary hover:text-secondary-foreground",
        secondary: "bg-secondary text-secondary-foreground transition-colors hover:bg-secondary/80",
        ghost: "transition-colors hover:bg-secondary hover:text-secondary-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Custom variants for CuriosityFields
        hero: "bg-primary text-primary-foreground font-semibold transition-all duration-150 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.4)]",
        heroOutline: "border-2 border-primary/50 text-foreground transition-all duration-150 hover:bg-primary/10 hover:border-primary hover:-translate-y-0.5",
        nav: "text-muted-foreground transition-colors hover:text-foreground hover:bg-transparent",
        category: "bg-secondary/50 text-secondary-foreground border border-border/50 transition-all duration-150 hover:bg-secondary hover:-translate-y-0.5",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
