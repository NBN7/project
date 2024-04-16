import { CircularProgress } from "@nextui-org/progress";

export default function LoadingPage() {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <CircularProgress aria-label="Loading..." size="sm" color="primary" />;
    </main>
  );
}
