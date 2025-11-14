import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password, name } = RegisterSchema.parse(body)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'User already exists with this email' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hash(password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        credits: 10, // Give new users 10 free credits
      },
    })

    // Create free subscription for new user
    await prisma.subscription.create({
      data: {
        userId: user.id,
        plan: 'free',
        status: 'active',
        monthlyTrailerLimit: 2,
        maxDuration: 60,
        allowHDExports: false,
        allow4KExports: false,
        allowCustomBranding: false,
        allowCommercialUse: true,
        accessPremiumTemplates: false,
      },
    })

    // Log credit transaction
    await prisma.creditLedger.create({
      data: {
        userId: user.id,
        amount: 10,
        type: 'SIGNUP_BONUS',
        description: 'Welcome bonus: 10 free credits',
      },
    })

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.issues,
        },
        { status: 400 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
