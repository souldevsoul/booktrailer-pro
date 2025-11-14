'use client'

import { MantineProvider as MantineProviderOriginal } from '@mantine/core'
import '@mantine/core/styles.css'

export function MantineProvider({ children }: { children: React.ReactNode }) {
  return (
    <MantineProviderOriginal
      theme={{
        primaryColor: 'indigo',
        fontFamily: 'var(--font-inter), Inter, system-ui',
      }}
    >
      {children}
    </MantineProviderOriginal>
  )
}
