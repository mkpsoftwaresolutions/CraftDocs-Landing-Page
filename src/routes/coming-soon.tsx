import { useEffect } from "react";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CRAFTDOCS_APP_URL } from "@/lib/craftdocs";

export const Route = createFileRoute("/coming-soon")({
  beforeLoad: () => {
    throw redirect({ href: CRAFTDOCS_APP_URL, statusCode: 301 });
  },
  component: ComingSoonRedirect,
});

function ComingSoonRedirect() {
  useEffect(() => {
    window.location.replace(CRAFTDOCS_APP_URL);
  }, []);

  return null;
}
