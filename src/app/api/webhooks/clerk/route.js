import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { connectDB } from '@/lib/mongoDB'
import User from '@/models/user'
import { NextResponse } from 'next/server'

export async function POST(req) {
  console.log('🔥 Webhook received!')
  
  try {
    // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
    
    console.log('🔑 Webhook secret exists:', !!WEBHOOK_SECRET)

    if (!WEBHOOK_SECRET) {
      console.error('❌ Missing CLERK_WEBHOOK_SECRET')
      return NextResponse.json({ error: 'Missing webhook secret' }, { status: 500 })
    }

    // Get the headers
    const headerPayload = headers()
    const svix_id = headerPayload.get("svix-id")
    const svix_timestamp = headerPayload.get("svix-timestamp")
    const svix_signature = headerPayload.get("svix-signature")

    console.log('📋 Headers:', { svix_id, svix_timestamp, svix_signature: !!svix_signature })

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.error('❌ Missing svix headers')
      return new Response('Error occured -- no svix headers', {
        status: 400
      })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload)
    
    console.log('📦 Payload received:', payload.type)

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET)

    let evt

    // Verify the payload with the headers
    try {
      evt = wh.verify(body, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      })
      console.log('✅ Webhook verified successfully')
    } catch (err) {
      console.error('❌ Error verifying webhook:', err)
      return new Response('Error occured', {
        status: 400
      })
    }

    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...')
    await connectDB()
    console.log('✅ MongoDB connected')

    // Handle the webhook
    const { id } = evt.data
    const eventType = evt.type

    console.log(`🎯 Webhook ID: ${id}, Type: ${eventType}`)

    if (eventType === 'user.created') {
      console.log('👤 Processing user.created event')
      const { id, email_addresses, first_name, last_name, image_url } = evt.data
      
      console.log('📧 User data:', {
        id,
        email: email_addresses?.[0]?.email_address,
        first_name,
        last_name,
        image_url
      })

      try {
        // Create user in MongoDB
        const userData = {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name || ''} ${last_name || ''}`.trim() || 'Unknown User',
          imageUrl: image_url || '',
        }
        
        console.log('💾 Creating user with data:', userData)
        
        const user = await User.create(userData)

        console.log('✅ User created in MongoDB:', user)
        return NextResponse.json({ success: true, user: user }, { status: 200 })
      } catch (error) {
        console.error('❌ Error creating user in MongoDB:', error)
        return NextResponse.json({ error: 'Failed to create user', details: error.message }, { status: 500 })
      }
    }

    if (eventType === 'user.updated') {
      console.log('🔄 Processing user.updated event')
      const { id, email_addresses, first_name, last_name, image_url } = evt.data

      try {
        // Update user in MongoDB
        const user = await User.findOneAndUpdate(
          { clerkId: id },
          {
            email: email_addresses[0].email_address,
            name: `${first_name || ''} ${last_name || ''}`.trim() || 'Unknown User',
            imageUrl: image_url || '',
          },
          { new: true }
        )

        console.log('✅ User updated in MongoDB:', user)
        return NextResponse.json({ success: true, user: user }, { status: 200 })
      } catch (error) {
        console.error('❌ Error updating user in MongoDB:', error)
        return NextResponse.json({ error: 'Failed to update user', details: error.message }, { status: 500 })
      }
    }

    if (eventType === 'user.deleted') {
      console.log('🗑️ Processing user.deleted event')
      const { id } = evt.data

      try {
        // Delete user from MongoDB
        await User.findOneAndDelete({ clerkId: id })
        console.log('✅ User deleted from MongoDB')
        return NextResponse.json({ success: true }, { status: 200 })
      } catch (error) {
        console.error('❌ Error deleting user from MongoDB:', error)
        return NextResponse.json({ error: 'Failed to delete user', details: error.message }, { status: 500 })
      }
    }

    console.log(`ℹ️ Unhandled event type: ${eventType}`)
    return NextResponse.json({ success: true, message: 'Event received but not processed' }, { status: 200 })
    
  } catch (error) {
    console.error('💥 Webhook handler error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
  }
}
