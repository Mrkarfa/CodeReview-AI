import { Sidebar } from "@/components/dashboard/sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - CodeReview AI",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
