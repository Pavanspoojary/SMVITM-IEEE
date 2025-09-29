'use client'

import withAuth from "@/hooks/use-auth";

function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        {children}
      </section>
    )
  }

export default withAuth(DashboardLayout);
