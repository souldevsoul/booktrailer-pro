'use client'

import { MantineProvider } from '@/components/mantine-provider'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <MantineProvider>{children}</MantineProvider>
}
