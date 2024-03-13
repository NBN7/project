import { SignInButton } from "@/components/SignInButton";
import { Container } from "@/components/Container";

export default function AuthPage() {
  return (
    <Container sectionClassName="mt-20">
      <h1 className="text-2xl font-semibold">Sign In</h1>
      <SignInButton className="w-[200px]" />
    </Container>
  );
}
