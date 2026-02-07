import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, action } = body

    if (action === 'login') {
      if (email === 'demo@rentahuman.com' && password === 'demo123') {
        return NextResponse.json({
          success: true,
          user: {
            id: 1,
            email: 'demo@rentahuman.com',
            name: 'Demo User',
            role: 'client',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          },
          token: 'demo-jwt-token'
        })
      } else {
        return NextResponse.json(
          { success: false, error: 'Invalid credentials' },
          { status: 401 }
        )
      }
    }

    if (action === 'register') {
      return NextResponse.json({
        success: true,
        user: {
          id: Date.now(),
          email: body.email,
          name: `${body.firstName} ${body.lastName}`,
          role: body.role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${body.email}`
        },
        token: 'new-user-jwt-token'
      })
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 })
}
