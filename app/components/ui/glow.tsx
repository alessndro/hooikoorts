"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const glowVariants = cva("absolute inset-0 w-full min-h-full pointer-events-none overflow-visible", {
  variants: {
    variant: {
      top: "top-0",
      above: "-top-[128px]",
      bottom: "bottom-0",
      below: "-bottom-[128px]",
      center: "top-[50%]",
    },
  },
  defaultVariants: {
    variant: "top",
  },
});

/* Grote ellipsen zodat de gloed de hele pagina dekt; bij bottom staat de bron onderaan */
const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof glowVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(glowVariants({ variant }), className)}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 w-[200vmax] h-[120vmax] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,_var(--glow-foreground)_0%,_var(--glow-foreground)_8%,_transparent_50%)]",
        variant === "bottom" && "bottom-0 translate-y-[65%]",
        variant === "top" && "top-0 -translate-y-1/2",
        variant === "center" && "top-1/2 -translate-y-1/2"
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 w-[160vmax] h-[100vmax] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,_var(--glow-soft)_0%,_var(--glow-soft)_6%,_transparent_45%)]",
        variant === "bottom" && "bottom-0 translate-y-[65%]",
        variant === "top" && "top-0 -translate-y-1/2",
        variant === "center" && "top-1/2 -translate-y-1/2"
      )}
    />
  </div>
));
Glow.displayName = "Glow";

export { Glow };
