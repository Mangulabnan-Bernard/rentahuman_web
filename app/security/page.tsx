import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Security - RentHuman',
  description: 'How RentHuman protects accounts, sessions, and payments.',
}

export default function SecurityPage() {
  return (
    <LegalLayout
      title="Security"
      lastUpdated="June 1, 2026"
      intro="Security is built into how RentHuman handles authentication, authorization, and payments. This page summarizes the safeguards in place."
    >
      <LegalSection heading="Authentication and Sessions">
        <p>
          Sessions are issued as signed, httpOnly cookies and validated on the server for every request to a
          protected route. Access control is never based on values stored in the browser alone.
        </p>
      </LegalSection>

      <LegalSection heading="Authorization">
        <p>
          Role-based access control is enforced server-side. Sensitive areas such as the administrator console
          are restricted to accounts with the appropriate role, verified on each request.
        </p>
      </LegalSection>

      <LegalSection heading="Payments">
        <p>
          Task funds are held in escrow and released only on completion, reducing risk for both clients and
          agents.
        </p>
      </LegalSection>

      <LegalSection heading="Reporting a Vulnerability">
        <p>
          If you believe you have found a security issue, please contact us through our contact page. We
          appreciate responsible disclosure and will respond promptly.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
