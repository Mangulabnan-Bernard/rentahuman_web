# Mock Data Structure

This directory contains all mock data for the Human Service Marketplace application. Each file represents a specific data entity with comprehensive interfaces and helper functions.

## 📁 File Structure

```
mock/
├── agents.ts      # Human agents/professionals
├── clients.ts     # Business clients
├── tasks.ts       # Task listings and assignments
├── earnings.ts    # Financial records and payments
├── notifications.ts # System notifications
├── messages.ts    # Communication between users
├── index.ts       # Central exports and API helpers
└── README.md      # This file
```

## 🎯 Purpose

This mock data structure is designed to:

1. **Provide realistic test data** for development and testing
2. **Enable easy database migration** with proper schema definitions
3. **Support rapid prototyping** without backend dependencies
4. **Maintain type safety** with comprehensive TypeScript interfaces
5. **Facilitate easy replacement** with real database calls

## 📊 Data Overview

### Agents (`agents.ts`)
- **6 professional agents** with detailed profiles
- Skills, availability, ratings, locations
- Verification status and performance metrics
- Helper functions for filtering and searching

### Clients (`clients.ts`)
- **6 business clients** from various industries
- Company information, spending history, ratings
- Industry categorization and company sizes
- Helper functions for client management

### Tasks (`tasks.ts`)
- **6 diverse AI-related tasks** with full lifecycle
- Categories: Data Validation, Content Moderation, Healthcare AI, etc.
- Milestones, attachments, requirements, deliverables
- Helper functions for task management

### Earnings (`earnings.ts`)
- **5 earning records** with financial details
- Payment processing, fees, tax information
- Monthly earnings summaries and payout methods
- Helper functions for financial reporting

### Notifications (`notifications.ts`)
- **8 system notifications** covering all user interactions
- Task assignments, payments, deadlines, system updates
- Priority levels and expiration handling
- Helper functions for notification management

### Messages (`messages.ts`)
- **7 conversation messages** between clients and agents
- Task-specific communication with attachments
- Read status and conversation threading
- Helper functions for message management

## 🔄 Migration to Database

The `index.ts` file includes:

- **`mockApi` object** - Simulates async database operations
- **Database schema** - Complete SQL migration scripts
- **Type exports** - All interfaces re-exported for easy access
- **Helper functions** - Ready-to-use data manipulation functions

### Example Migration:

```sql
-- The mock/index.ts contains complete CREATE TABLE statements
-- Just copy and execute the createMigrationSQL() output
```

### Example API Replacement:

```typescript
// Before (mock)
import { mockApi } from '@/mock'

const agents = await mockApi.getUsers({ role: 'AI Training' })

// After (database)
import { db } from '@/lib/database'

const agents = await db.users.findMany({ 
  where: { role: 'AI Training' } 
})
```

## 🎨 Data Features

### Realistic Attributes
- **Professional avatars** using Unsplash and DiceBear
- **Detailed descriptions** with industry-specific terminology
- **Logical relationships** between entities
- **Timestamps** in ISO format for consistency
- **Status workflows** matching real business processes

### Comprehensive Coverage
- **Edge cases** (disputed tasks, expired notifications)
- **Financial details** (fees, taxes, payment methods)
- **Communication patterns** (replies, attachments, read receipts)
- **Performance metrics** (ratings, completion rates, response times)

### Extensible Design
- **Modular interfaces** for easy extension
- **Helper functions** for common operations
- **Type-safe exports** for maintainable code
- **Database-ready schema** for production deployment

## 🚀 Usage Examples

### Import Specific Data:
```typescript
import { MOCK_AGENTS, Agent } from '@/mock/agents'
import { MOCK_TASKS, Task } from '@/mock/tasks'
```

### Use Helper Functions:
```typescript
import { agentHelpers } from '@/mock/agents'
import { taskHelpers } from '@/mock/tasks'

const availableAgents = agentHelpers.getAvailableAgents()
const urgentTasks = taskHelpers.getTasksByUrgency('high')
```

### Access All Data:
```typescript
import { mockApi, Agent, Task } from '@/mock'

const agents = await mockApi.getUsers()
const tasks = await mockApi.getTasks({ status: 'open' })
```

## 📈 Production Readiness

This mock data structure is **production-ready** and designed for:

- **Easy database migration** - SQL scripts included
- **API replacement** - Same function signatures
- **Type safety** - Full TypeScript support
- **Testing** - Comprehensive test scenarios
- **Documentation** - Clear interface definitions

## 🔧 Customization

To extend or modify the mock data:

1. **Add new entities** - Create new files following the same pattern
2. **Extend interfaces** - Add fields to existing types
3. **Update helpers** - Add new filtering/manipulation functions
4. **Update schema** - Modify migration scripts accordingly
5. **Update index** - Export new data and helpers

This structure ensures a smooth transition from mock data to a fully functional database-backed application.
