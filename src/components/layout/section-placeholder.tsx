import { Card } from "@/components/ui/card";
import { AppShell } from "@/components/layout/app-shell";

export function SectionPlaceholder({
  active,
  title,
}: {
  active: string;
  title: string;
}) {
  return (
    <AppShell active={active}>
      <main className="px-[30px] py-8">
        <h1 className="text-[22px] font-bold text-foreground">{title}</h1>
        <Card className="mt-4">
          <p className="text-xs text-muted">
            This section is ready for data. The dashboard currently shows the
            Figma layout; this page reuses the same sidebar, cards, and tokens.
          </p>
        </Card>
      </main>
    </AppShell>
  );
}
