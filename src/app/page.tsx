import { Container } from "@/components/Container";

export default function HomePage() {
  return (
    <main>
      <Container sectionClassName="mt-20 font-semibold">
        <div className="text-4xl text-pretty">
          <p>
            <span className=" from-[#0070F0] to-[#19cfff] bg-clip-text text-transparent bg-gradient-to-b">
              Jot it down
            </span>
            , make it last, transform your day.
          </p>
        </div>
      </Container>
    </main>
  );
}
