import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  const iconSize = "20px";

  return (
    <main className="w-full h-[calc(100vh-64px)] flex items-center justify-center">
      <Loader2 size={iconSize} className="animate-spin" />
    </main>
  );
}
