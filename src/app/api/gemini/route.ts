import { NextResponse } from 'next/server';
// Import will be available after npm package installation
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export async function POST(request: Request) {
  try {
    const { message, model, stream } = await request.json();

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
    
    // Handle streaming response if requested
    if (stream) {
      // Create response stream
      const stream = new TransformStream();
      const writer = stream.writable.getWriter();
      const encoder = new TextEncoder();

      // Generate content with streaming
      const result = await gemini.generateContentStream(message);
      
      // Process response chunks as they arrive
      (async () => {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              await writer.write(encoder.encode(text));
            }
          }
          await writer.close();
        } catch (error) {
          console.error('Streaming error:', error);
          await writer.abort(error);
        }
      })();

      return new Response(stream.readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
        },
      });
    } else {
      // Non-streaming response (original behavior)
      const result = await gemini.generateContent(message);
      const response = await result.response;
      const aiResponse = response.text();

      return NextResponse.json({ text: aiResponse });
    }
  } catch (error) {
    console.error('Google Gemini API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
} 