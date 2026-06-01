import type { Metadata } from 'next'
import LegalLayout, { LegalSection } from '../components/LegalLayout'

export const metadata: Metadata = {
  title: 'Terms of Service - RentHuman',
  description: 'The terms and conditions governing your use of the RentHuman platform.',
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="June 1, 2026"
      intro="These Terms of Service govern your access to and use of RentHuman. By creating an account or using the platform, you agree to be bound by these terms."
    >
      <LegalSection heading="1. Accounts and Eligibility">
        <p>
          You must be at least 18 years old to use RentHuman. You are responsible for maintaining the
          confidentiality of your account credentials and for all activity that occurs under your account.
        </p>
      </LegalSection>

      <LegalSection heading="2. Platform Roles">
        <p>
          RentHuman supports clients, who post and fund tasks, and agents, who complete them. The role you
          select at registration determines the features available to you. Administrative access is granted
          internally and cannot be self-assigned.
        </p>
      </LegalSection>

      <LegalSection heading="3. Payments and Escrow">
        <p>
          Funds for tasks are held in escrow and released to agents upon satisfactory completion. RentHuman
          charges a platform fee on completed transactions, disclosed before a task is funded.
        </p>
      </LegalSection>

      <LegalSection heading="4. Non-Circumvention">
        <p>
          To protect both parties and the integrity of escrow, arranging payment outside the platform for work
          introduced through RentHuman is prohibited and may result in account suspension.
        </p>
      </LegalSection>

      <LegalSection heading="5. Acceptable Use">
        <p>
          You agree not to use the platform for unlawful purposes, to post fraudulent tasks, or to attempt to
          gain unauthorized access to other accounts or systems.
        </p>
      </LegalSection>

      <LegalSection heading="6. Changes to These Terms">
        <p>
          We may update these terms from time to time. Material changes will be communicated through the
          platform, and continued use after changes take effect constitutes acceptance.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
