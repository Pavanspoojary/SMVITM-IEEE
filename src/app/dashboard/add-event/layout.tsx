'use client'

import { withAdminAuth } from "@/hooks/use-auth";

function AddEventLayout({
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

export default withAdminAuth(AddEventLayout);
