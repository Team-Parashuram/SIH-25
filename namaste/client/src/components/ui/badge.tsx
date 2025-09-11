import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { badgeVariants } from "./badge-variants"

type BadgeVariant = "default" | "secondary" | "destructive" | "outline" | null | undefined;

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  variant?: BadgeVariant;
  asChild?: boolean;
}

function Badge({ className, variant, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
