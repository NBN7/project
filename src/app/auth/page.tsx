import { SignInButton } from "@/components/SignInButton";
import { Container } from "@/components/Container";

export default function AuthPage() {
  return (
    <Container sectionClassName="mt-20">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">
          Welcome to{" "}
          <span className="from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
            Notes
          </span>
        </h1>
        <p className="dark:text-greydark text-greylight">
          Sign In to make the most of the app
        </p>
        <SignInButton className="w-[200px] mt-4" />
      </div>
    </Container>
  );
}
