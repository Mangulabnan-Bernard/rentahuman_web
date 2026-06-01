'use client'

import { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/DashboardSidebar'
import Tabs from '../../components/Tabs'
import { useToast } from '../../components/Toast'
import { DollarSign, TrendingUp, Calendar, CheckCircle, Loader2 } from 'lucide-react'

interface EarningDTO {
  id: number
  taskId: number | null
  taskTitle: string | null
  amount: number
  status: 'pending' | 'claimable' | 'paid_out'
  description: string | null
  date: string
}

const STATUS_LABEL: Record<EarningDTO['status'], string> = {
  paid_out: 'Paid Out',
  claimable: 'Claimable',
  pending: 'Pending',
}

const STATUS_BADGE: Record<EarningDTO['status'], string> = {
  paid_out: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300',
  claimable: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300',
}

function OverviewTab({ earnings }: { earnings: EarningDTO[] }) {
  const sumBy = (status: EarningDTO['status']) =>
    earnings.filter((e) => e.status === status).reduce((sum, e) => sum + e.amount, 0)

  const cards = [
    { label: 'Total Earnings', value: sumBy('paid_out'), icon: DollarSign, accent: 'text-green-600' },
    { label: 'Claimable', value: sumBy('claimable'), icon: CheckCircle, accent: 'text-blue-600' },
    { label: 'Pending', value: sumBy('pending'), icon: Calendar, accent: 'text-yellow-600' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon
          return (
            <div key={c.label} className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{c.label}</h3>
                <Icon className={`w-4 h-4 ${c.accent}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">${c.value.toLocaleString()}</p>
            </div>
          )
        })}
      </div>

      {earnings.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Lifetime</h3>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Across {earnings.length} transaction{earnings.length !== 1 ? 's' : ''}</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">
                ${earnings.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}
              </span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TransactionHistory({ earnings }: { earnings: EarningDTO[] }) {
  const toast = useToast()

  if (earnings.length === 0) {
    return (
      <div className="text-center py-16 bg-card border border-border rounded-lg">
        <DollarSign className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No earnings yet. Completed tasks will appear here.</p>
      </div>
    )
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">Task</th>
              <th className="text-left p-4 font-medium text-foreground">Amount</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Date</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((earning) => (
              <tr key={earning.id} className="border-t border-border">
                <td className="p-4">
                  <p className="font-medium text-foreground">{earning.taskTitle ?? 'Task'}</p>
                  {earning.description && (
                    <p className="text-sm text-muted-foreground">{earning.description}</p>
                  )}
                </td>
                <td className="p-4">
                  <span className="font-semibold text-foreground">${earning.amount}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${STATUS_BADGE[earning.status]}`}>
                    {STATUS_LABEL[earning.status]}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{earning.date}</td>
                <td className="p-4">
                  {earning.status === 'claimable' && (
                    <button
                      onClick={() => toast(`Claim requested for "${earning.taskTitle ?? 'task'}"`)}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Claim Now
                    </button>
                  )}
                  {earning.status === 'paid_out' && (
                    <button
                      onClick={() => toast('Invoice download started')}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Download Invoice
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PayoutSettings() {
  const toast = useToast()
  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Payout Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Payout Method</label>
            <select className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              <option>Bank Transfer</option>
              <option>PayPal</option>
              <option>Wise</option>
              <option>Crypto</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Minimum Payout Threshold</label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                className="w-32 px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                defaultValue="100"
              />
              <span className="text-sm text-muted-foreground">USD</span>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border mt-6">
          <button
            onClick={() => toast('Payout settings saved')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  )
}

export default function EarningsPage() {
  const [earnings, setEarnings] = useState<EarningDTO[] | null>(null)

  useEffect(() => {
    let active = true
    fetch('/api/earnings?scope=mine')
      .then((r) => r.json())
      .then((data) => {
        if (active) setEarnings(data.success ? data.data : [])
      })
      .catch(() => {
        if (active) setEarnings([])
      })
    return () => {
      active = false
    }
  }, [])

  const list = earnings ?? []
  const tabs = [
    { id: 'overview', label: 'Overview', content: <OverviewTab earnings={list} /> },
    { id: 'transactions', label: 'Transaction History', content: <TransactionHistory earnings={list} /> },
    { id: 'settings', label: 'Payout Settings', content: <PayoutSettings /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Earnings</h1>
            <p className="text-muted-foreground">
              Track your earnings, manage payouts, and view transaction history.
            </p>
          </div>

          {earnings === null ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading earnings…
            </div>
          ) : (
            <Tabs tabs={tabs} defaultTab="overview" />
          )}
        </main>
      </div>
    </div>
  )
}
