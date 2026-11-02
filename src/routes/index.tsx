import { createFileRoute } from "@tanstack/react-router";
import LoginCard from "@/components/auth/LoginCard";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <LoginCard />;
}
