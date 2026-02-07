'use client'

import { useState } from 'react'
import DashboardSidebar from '../components/DashboardSidebar'
import Tabs from '../components/Tabs'
import { DollarSign, TrendingUp, Calendar, Download, ArrowUpRight, CheckCircle } from 'lucide-react'

const mockEarnings = [
  {
    id: 1,
    taskId: "AI Model Training Data Validation",
    client: "TechCorp AI",
    amount: 500,
    status: "paid_out",
    date: "2024-02-01",
    description: "Completed data validation for language model training"
  },
  {
    id: 2,
    taskId: "Content Moderation Review",
    client: "ChatAI Inc",
    amount: 300,
    status: "claimable",
    date: "2024-01-28",
    description: "Reviewed AI responses for safety and accuracy"
  },
  {
    id: 3,
    taskId: "Customer Service AI Training",
    client: "SupportBot Co",
    amount: 450,
    status: "pending",
    date: "2024-01-25",
    description: "Provided conversation examples for AI training"
  },
  {
    id: 4,
    taskId: "Image Classification Project",
    client: "AutoDrive AI",
    amount: 800,
    status: "paid_out",
    date: "2024-01-20",
    description: "Classified road scenarios from dashcam footage"
  },
  {
    id: 5,
    taskId: "Legal Document Analysis",
    client: "LegalTech Corp",
    amount: 1500,
    status: "pending",
    date: "2024-01-15",
    description: "Annotated legal documents for AI training"
  }
]

const OverviewTab = () => {
  const totalEarnings = mockEarnings
    .filter(e => e.status === 'paid_out')
    .reduce((sum, e) => sum + e.amount, 0)
  
  const claimableEarnings = mockEarnings
    .filter(e => e.status === 'claimable')
    .reduce((sum, e) => sum + e.amount, 0)
  
  const pendingEarnings = mockEarnings
    .filter(e => e.status === 'pending')
    .reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Total Earnings</h3>
            <DollarSign className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">${totalEarnings.toLocaleString()}</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Claimable</h3>
            <CheckCircle className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">${claimableEarnings.toLocaleString()}</p>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-muted-foreground">Pending</h3>
            <Calendar className="w-4 h-4 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-foreground">${pendingEarnings.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Earnings Overview</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">This Month</span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-foreground">$1,250</span>
              <div className="flex items-center text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12%</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Last Month</span>
            <span className="text-xl font-semibold text-foreground">$1,116</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const TransactionHistory = () => (
  <div className="space-y-6">
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium text-foreground">Task</th>
              <th className="text-left p-4 font-medium text-foreground">Client</th>
              <th className="text-left p-4 font-medium text-foreground">Amount</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">Date</th>
              <th className="text-left p-4 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockEarnings.map((earning) => (
              <tr key={earning.id} className="border-t border-border">
                <td className="p-4">
                  <div>
                    <p className="font-medium text-foreground">{earning.taskId}</p>
                    <p className="text-sm text-muted-foreground">{earning.description}</p>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{earning.client}</td>
                <td className="p-4">
                  <span className="font-semibold text-foreground">${earning.amount}</span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    earning.status === 'paid_out' ? 'bg-green-100 text-green-800' :
                    earning.status === 'claimable' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {earning.status === 'paid_out' ? 'Paid Out' :
                     earning.status === 'claimable' ? 'Claimable' : 'Pending'}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground">{earning.date}</td>
                <td className="p-4">
                  {earning.status === 'claimable' && (
                    <button className="text-primary hover:underline text-sm font-medium">
                      Claim Now
                    </button>
                  )}
                  {earning.status === 'paid_out' && (
                    <button className="text-primary hover:underline text-sm font-medium">
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
  </div>
)

const PayoutSettings = () => (
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter bank name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Account Number</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter account number"
            />
          </div>
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
          <p className="text-sm text-muted-foreground">
            Payouts will be processed automatically when your available balance reaches this threshold.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="autoPayout"
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary"
            defaultChecked
          />
          <label htmlFor="autoPayout" className="text-sm text-foreground">
            Enable automatic monthly payouts
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-border">
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
          Save Settings
        </button>
      </div>
    </div>
  </div>
)

export default function EarningsPage() {
  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      content: <OverviewTab />
    },
    {
      id: 'transactions',
      label: 'Transaction History',
      content: <TransactionHistory />
    },
    {
      id: 'settings',
      label: 'Payout Settings',
      content: <PayoutSettings />
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />
        
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Earnings
            </h1>
            <p className="text-muted-foreground">
              Track your earnings, manage payouts, and view transaction history.
            </p>
          </div>

          <Tabs tabs={tabs} defaultTab="overview" />
        </main>
      </div>
    </div>
  )
}
