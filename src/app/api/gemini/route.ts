import { NextResponse } from 'next/server';
// Import will be available after npm package installation
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { message, model } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Google Gemini API key is not configured');
    }
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Map the assistant model to the corresponding Gemini model
    let geminiModel;
    switch (model) {
      case 'Gemini-Flash':
        geminiModel = 'gemini-2.0-flash';
        break;
      case 'Gemini-Ultra':
        geminiModel = 'gemini-2.0-ultra';
        break;
      case 'Gemini-Pro':
      default:
        geminiModel = 'gemini-2.0-flash';
        break;
    }
    
    const gemini = genAI.getGenerativeModel({ 
      model: geminiModel,
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    
    // Create a proper content structure for the request
    const result = await gemini.generateContent(message);
    const response = await result.response;
    const aiResponse = response.text();

    return NextResponse.json({ text: aiResponse });
  } catch (error) {
    console.error('Google Gemini API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 