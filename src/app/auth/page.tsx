import { SignInButton } from "@/components/CustomButtons";
import { Container } from "@/components/Container";

export default function AuthPage() {
  return (
    <Container sectionClassName="mt-20">
      {/* title */}
      <h1 className="text-4xl font-semibold text-pretty">
        Welcome to{" "}
        <span className="from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
          [App]
        </span>
      </h1>

      {/* description */}
      <p className="text-xl dark:text-greydark text-greylight">
        Sign In to do the most of the app.
      </p>

      {/* buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <SignInButton />
      </div>
    </Container>
  );
}
