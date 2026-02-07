import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Code, Copy, Check, Terminal, Database, Shield, Zap } from 'lucide-react'

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            API Documentation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Integrate RentHuman's human intelligence capabilities into your AI applications with our comprehensive REST API.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Fast & Reliable</h3>
            <p className="text-muted-foreground">
              Our API delivers sub-second response times with 99.9% uptime guarantee.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Secure</h3>
            <p className="text-muted-foreground">
              Enterprise-grade security with OAuth 2.0 authentication and data encryption.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Scalable</h3>
            <p className="text-muted-foreground">
              Handle thousands of concurrent requests with automatic load balancing.
            </p>
          </div>
        </div>

        <div className="space-y-16">
          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Authentication</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                All API requests require authentication using Bearer tokens. Include your API key in the Authorization header:
              </p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">HTTP Header</span>
                  <button className="text-primary hover:underline">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <code>Authorization: Bearer your_api_key_here</code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Base URL</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">All API endpoints are relative to:</p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Base URL</span>
                  <button className="text-primary hover:underline">
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                <code>https://api.renthuman.com/v1</code>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">API Endpoints</h2>
            
            <div className="space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">Get Available Agents</h3>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded">
                    GET
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Retrieve a list of available human agents based on specified criteria.
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Endpoint</span>
                    <button className="text-primary hover:underline">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <code>/agents</code>
                </div>
                
                <h4 className="font-semibold text-foreground mb-3">Query Parameters</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2">Parameter</th>
                        <th className="text-left py-2">Type</th>
                        <th className="text-left py-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">skills</td>
                        <td className="py-2">string</td>
                        <td className="py-2">Comma-separated list of required skills</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">availability</td>
                        <td className="py-2">string</td>
                        <td className="py-2">Filter by availability status</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 font-mono">limit</td>
                        <td className="py-2">integer</td>
                        <td className="py-2">Maximum number of results (default: 20)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">Create Task</h3>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded">
                    POST
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Create a new task that requires human intervention.
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Endpoint</span>
                    <button className="text-primary hover:underline">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <code>/tasks</code>
                </div>
                
                <h4 className="font-semibold text-foreground mb-3">Request Body</h4>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  <pre>{`{
  "title": "Data Validation Task",
  "description": "Validate AI training data",
  "category": "Data Validation",
  "budget": 500,
  "deadline": "2024-02-15",
  "skills": ["Data Annotation", "Quality Assurance"],
  "urgency": "high"
}`}</pre>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-foreground">Get Task Status</h3>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-sm font-medium rounded">
                    GET
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  Retrieve the current status and progress of a specific task.
                </p>
                <div className="bg-muted rounded-lg p-4 font-mono text-sm mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground">Endpoint</span>
                    <button className="text-primary hover:underline">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <code>/tasks/{'{task_id}'}</code>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Response Format</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                All API responses follow a consistent JSON format:
              </p>
              <div className="bg-muted rounded-lg p-4 font-mono text-sm overflow-x-auto">
                <pre>{`{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully",
  "timestamp": "2024-02-01T12:00:00Z"
}`}</pre>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">Rate Limits</h2>
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground mb-4">
                API requests are rate-limited to ensure fair usage:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Free Tier</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 1,000 requests per hour</li>
                    <li>• 10,000 requests per day</li>
                    <li>• Standard response time</li>
                  </ul>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Pro Tier</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 10,000 requests per hour</li>
                    <li>• 100,000 requests per day</li>
                    <li>• Priority response time</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-foreground mb-8">SDKs & Libraries</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">JavaScript</h3>
                <p className="text-sm text-muted-foreground mb-4">Node.js and browser support</p>
                <button className="text-primary hover:underline text-sm">View Documentation →</button>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Python</h3>
                <p className="text-sm text-muted-foreground mb-4">Python 3.7+ compatible</p>
                <button className="text-primary hover:underline text-sm">View Documentation →</button>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">REST</h3>
                <p className="text-sm text-muted-foreground mb-4">Direct API access</p>
                <button className="text-primary hover:underline text-sm">View Documentation →</button>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground mb-8">
            Get your API key and start integrating human intelligence into your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              Get API Key
            </button>
            <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
              View Examples
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
