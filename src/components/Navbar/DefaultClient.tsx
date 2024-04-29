import { LinkUI } from "@/components/LinkUI";

import { ROUTES } from "@/constants/routes";

export const DefaultClient = () => {
  return (
    <LinkUI className="ml-2" href={ROUTES.AUTH}>
      Sign In
    </LinkUI>
  );
};
