import { cn } from "@/lib/utils";

export default function FormContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full border border-border rounded-lg p-8 shadow-lg bg-card",
        className
      )}
    >
      {children}
    </div>
  );
}
