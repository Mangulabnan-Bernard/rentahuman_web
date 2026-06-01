import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Compliance - RentHuman',
  description: 'RentHuman compliance practices and regulatory commitments.',
}

export default function CompliancePage() {
  return (
    <LegalLayout
      title="Compliance"
      lastUpdated="June 1, 2026"
      intro="RentHuman is committed to operating responsibly and in line with applicable regulations across the markets we serve."
    >
      <LegalSection heading="Know Your Customer">
        <p>
          Clients and agents may be asked to verify their identity before transacting. Verification helps
          prevent fraud and keeps the marketplace trustworthy.
        </p>
      </LegalSection>

      <LegalSection heading="Data Protection">
        <p>
          We handle personal data in accordance with our privacy policy and applicable data-protection laws,
          collecting only what is necessary and retaining it only as long as needed.
        </p>
      </LegalSection>

      <LegalSection heading="Tax and Reporting">
        <p>
          Agents are responsible for reporting income earned through the platform. Where required, we provide
          documentation to support your records.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For compliance inquiries, reach out through our contact page and your request will be routed to the
          appropriate team.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
