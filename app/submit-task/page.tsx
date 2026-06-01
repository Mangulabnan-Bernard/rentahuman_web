'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import RouteGuard from '../components/RouteGuard'
import { CATEGORIES } from '../utils/constants'

const URGENCY_OPTIONS = ['low', 'medium', 'high'] as const

function SubmitTaskForm() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    budget: '',
    deadline: '',
    location: 'Remote',
    skills: '',
    urgency: 'medium' as (typeof URGENCY_OPTIONS)[number],
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          skills: form.skills
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean),
        }),
      })
      const result = await response.json()
      if (result.success) {
        setSubmitted(true)
      } else {
        setError(result.error || 'Failed to create task')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-card border border-border rounded-lg p-8 text-center" role="status" aria-live="polite">
        <div className="w-14 h-14 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-7 h-7 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Task posted</h2>
        <p className="text-muted-foreground mb-6">Your task is now live and visible to agents.</p>
        <Link href="/dashboard/tasks" className="text-primary hover:underline font-medium">
          View your tasks
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-red-800 dark:text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-foreground mb-2">
          Task title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g. Validate training data for a language model"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Describe the work, requirements, and deliverables"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-foreground mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-foreground mb-2">
            Budget (USD)
          </label>
          <input
            id="budget"
            name="budget"
            type="number"
            min="0"
            value={form.budget}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="500"
          />
        </div>

        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-foreground mb-2">
            Deadline
          </label>
          <input
            id="deadline"
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="urgency" className="block text-sm font-medium text-foreground mb-2">
            Urgency
          </label>
          <select
            id="urgency"
            name="urgency"
            value={form.urgency}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {URGENCY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="skills" className="block text-sm font-medium text-foreground mb-2">
          Required skills
        </label>
        <input
          id="skills"
          name="skills"
          value={form.skills}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Comma separated, e.g. Data Annotation, Quality Assurance"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-md hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? 'Posting...' : 'Post task'}
      </button>
    </form>
  )
}

export default function SubmitTaskPage() {
  return (
    <RouteGuard requiredRole="client">
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit a task</h1>
            <p className="text-muted-foreground">
              Post a task for human agents to complete. Funds are held in escrow until the work is delivered.
            </p>
          </div>
          <SubmitTaskForm />
        </main>
        <Footer />
      </div>
    </RouteGuard>
  )
}
