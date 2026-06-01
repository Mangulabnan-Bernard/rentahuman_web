import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy - RentHuman',
  description: 'How RentHuman collects, uses, and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="June 1, 2026"
      intro="This Privacy Policy explains what information we collect, how we use it, and the choices you have. We collect only what we need to operate the platform."
    >
      <LegalSection heading="Information We Collect">
        <p>
          We collect account information you provide (such as your name, email, and role), profile details you
          choose to add, and usage data generated as you interact with the platform.
        </p>
      </LegalSection>

      <LegalSection heading="How We Use Information">
        <p>
          Information is used to provide and improve the service, match clients with agents, process payments,
          maintain security, and communicate with you about your account.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and Sessions">
        <p>
          We use a secure, signed session cookie to keep you logged in and to authorize access to protected
          areas. This cookie is essential to the operation of the platform.
        </p>
      </LegalSection>

      <LegalSection heading="Data Sharing">
        <p>
          We do not sell your personal information. We share data only with service providers necessary to
          operate the platform and where required by law.
        </p>
      </LegalSection>

      <LegalSection heading="Your Rights">
        <p>
          You may access, correct, or delete your account information at any time from your settings, or by
          contacting us through the support channels listed on our contact page.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
