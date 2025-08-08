import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoDB';
import Contact from '@/models/contact';

export async function POST(request) {
  try {
    // Connect to database
    await connectDB();
    
    // Parse request body
    const body = await request.json();
    const { name, email, subject, category, message } = body;

    // Validation
    const errors = {};

    // Name validation
    if (!name || name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    } else if (name.trim().length > 50) {
      errors.name = 'Name cannot exceed 50 characters';
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!email || !emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!subject || subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters long';
    } else if (subject.trim().length > 100) {
      errors.subject = 'Subject cannot exceed 100 characters';
    }

    // Message validation
    if (!message || message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long';
    } else if (message.trim().length > 1000) {
      errors.message = 'Message cannot exceed 1000 characters';
    }

    // Category validation
    const validCategories = ['general', 'support', 'feature', 'billing'];
    if (!category || !validCategories.includes(category)) {
      errors.category = 'Please select a valid category';
    }

    // If there are validation errors, return them
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors 
        },
        { status: 400 }
      );
    }

    // Check for duplicate submissions (same email and message content)
    const existingContact = await Contact.findOne({
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    if (existingContact) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'You have already submitted this exact message. Please modify your message or contact us through other means if this is urgent.',
          type: 'duplicate'
        },
        { status: 409 }
      );
    }

    // Additional check for very recent submissions from same email (within 1 minute)
    const oneMinuteAgo = new Date(Date.now() - 1 * 60 * 1000);
    const recentSubmission = await Contact.findOne({
      email: email.trim().toLowerCase(),
      submittedAt: { $gte: oneMinuteAgo }
    });

    if (recentSubmission) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please wait at least 1 minute before submitting another message.',
          type: 'rate_limit'
        },
        { status: 429 }
      );
    }

    // Create new contact
    const newContact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      category,
      message: message.trim(),
      // Set priority based on category
      priority: category === 'billing' ? 'high' : category === 'support' ? 'medium' : 'low'
    });

    // Save to database
    const savedContact = await newContact.save();

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully!',
        contactId: savedContact.contactId,
        data: {
          id: savedContact._id,
          contactId: savedContact.contactId,
          name: savedContact.name,
          email: savedContact.email,
          subject: savedContact.subject,
          category: savedContact.category,
          status: savedContact.status,
          submittedAt: savedContact.submittedAt
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle MongoDB validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach(key => {
        validationErrors[key] = error.errors[key].message;
      });

      return NextResponse.json(
        { 
          success: false, 
          message: 'Validation failed', 
          errors: validationErrors 
        },
        { status: 400 }
      );
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'A submission with this information already exists.' 
        },
        { status: 409 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while processing your request. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    // Connect to database
    await connectDB();

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-message -notes'); // Exclude sensitive fields for listing

    // Get total count for pagination
    const totalContacts = await Contact.countDocuments(filter);
    const totalPages = Math.ceil(totalContacts / limit);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages,
        totalContacts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'An error occurred while fetching contacts.' 
      },
      { status: 500 }
    );
  }
}
