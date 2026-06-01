'use client'

import { useEffect, useState } from 'react'
import DashboardSidebar from '../../components/DashboardSidebar'
import Tabs from '../../components/Tabs'
import { useToast } from '../../components/Toast'
import { authUtils } from '../../utils/auth'
import { Bell, Shield, CreditCard, Mail, Smartphone } from 'lucide-react'

const ProfileSettings = () => {
  const toast = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    title: '',
    location: '',
    hourlyRate: '',
    bio: '',
  })

  // Load the signed-in user's real profile from the API.
  useEffect(() => {
    let active = true
    fetch('/api/profile')
      .then((r) => r.json())
      .then((data) => {
        if (active && data.success && data.user) {
          const u = data.user
          setProfile({
            name: u.name ?? '',
            email: u.email ?? '',
            title: u.title ?? '',
            location: u.location ?? '',
            hourlyRate: u.hourlyRate != null ? String(u.hourlyRate) : '',
            bio: u.bio ?? '',
          })
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: profile.name,
          title: profile.title,
          location: profile.location,
          hourlyRate: profile.hourlyRate,
          bio: profile.bio,
        }),
      })
      const data = await res.json()
      if (data.success && data.user) {
        // Keep the cached user (navbar/sidebar) in sync.
        const current = authUtils.getCurrentUser()
        if (current) authUtils.setCurrentUser({ ...current, ...data.user })
        toast('Profile saved')
      } else {
        toast(data.error || 'Could not save profile', 'error')
      }
    } catch {
      toast('Network error. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Profile Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              disabled={loading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              disabled
              title="Email cannot be changed here"
              className="w-full px-3 py-2 border border-border rounded-md bg-muted text-muted-foreground"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Professional Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                disabled={loading}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Hourly Rate ($)</label>
              <input
                type="number"
                min="0"
                value={profile.hourlyRate}
                onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                disabled={loading}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Location</label>
            <input
              type="text"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              disabled={loading}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              disabled={loading}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
          </div>
        </div>

        <div className="pt-6 border-t border-border mt-6">
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

const NotificationSettings = () => {
  const toast = useToast()
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    paymentAlerts: true,
    marketingEmails: false,
    weeklyDigest: true,
  })

  const toggles: { key: keyof typeof notifications; label: string; icon: typeof Mail }[] = [
    { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
    { key: 'pushNotifications', label: 'Push Notifications', icon: Smartphone },
    { key: 'taskReminders', label: 'Task Reminders', icon: Bell },
    { key: 'paymentAlerts', label: 'Payment Alerts', icon: CreditCard },
    { key: 'marketingEmails', label: 'Marketing Emails', icon: Mail },
    { key: 'weeklyDigest', label: 'Weekly Digest', icon: Mail },
  ]

  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Notification Preferences</h3>

        <div className="space-y-4">
          {toggles.map(({ key, label, icon: Icon }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
              <button
                onClick={() => handleToggle(key)}
                role="switch"
                aria-checked={notifications[key]}
                aria-label={label}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[key] ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-border mt-6">
          <button
            onClick={() => toast('Notification preferences saved')}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

const SecuritySettings = () => {
  const toast = useToast()
  const [saving, setSaving] = useState(false)
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' })

  const handleUpdate = async () => {
    if (!pw.current || !pw.next) {
      toast('Fill in your current and new password', 'error')
      return
    }
    if (pw.next !== pw.confirm) {
      toast('New passwords do not match', 'error')
      return
    }
    if (pw.next.length < 6) {
      toast('New password must be at least 6 characters', 'error')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pw.current, newPassword: pw.next }),
      })
      const data = await res.json()
      if (data.success) {
        toast('Password updated')
        setPw({ current: '', next: '', confirm: '' })
      } else {
        toast(data.error || 'Could not update password', 'error')
      }
    } catch {
      toast('Network error. Please try again.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Security Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Current Password</label>
            <input
              type="password"
              value={pw.current}
              onChange={(e) => setPw({ ...pw, current: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter current password"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
              <input
                type="password"
                value={pw.next}
                onChange={(e) => setPw({ ...pw, next: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
              <input
                type="password"
                value={pw.confirm}
                onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Two-Factor Authentication</label>
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-foreground">Add an extra layer of security</span>
              </div>
              <button
                onClick={() => toast('Two-factor setup is not available in this demo', 'info')}
                className="text-primary hover:underline text-sm"
              >
                Configure
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <button
              onClick={handleUpdate}
              disabled={saving}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const tabs = [
    { id: 'profile', label: 'Profile Settings', content: <ProfileSettings /> },
    { id: 'notifications', label: 'Notifications', content: <NotificationSettings /> },
    { id: 'security', label: 'Security', content: <SecuritySettings /> },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DashboardSidebar />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your profile, notifications, and security preferences.
            </p>
          </div>

          <Tabs tabs={tabs} defaultTab="profile" />
        </main>
      </div>
    </div>
  )
}
