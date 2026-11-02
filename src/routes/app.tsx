import { createFileRoute } from "@tanstack/react-router";
import Workspace from "@/components/cm/Workspace";

export const Route = createFileRoute("/app")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Заявки — Телеком Инжиниринг" }],
  }),
  component: Workspace,
});
