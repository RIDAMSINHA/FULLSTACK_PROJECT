
import { serve } from "https://deno.fresh.dev/std@v9.6.1/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json'
};

interface BFHLRequest {
  data: string[];
}

interface BFHLResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_alphabet: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204, // Use 204 No Content for OPTIONS requests
      headers: corsHeaders
    });
  }

  // Handle GET request
  if (req.method === 'GET') {
    return new Response(
      JSON.stringify({ operation_code: 1 }),
      { headers: corsHeaders }
    );
  }

  // Handle POST request
  if (req.method === 'POST') {
    try {
      const request: BFHLRequest = await req.json();
      
      if (!request.data || !Array.isArray(request.data)) {
        throw new Error('Invalid request format');
      }

      const numbers: string[] = [];
      const alphabets: string[] = [];

      // Process each item in the data array
      request.data.forEach(item => {
        if (/^\d+$/.test(item)) {
          numbers.push(item);
        } else if (/^[a-zA-Z]$/.test(item)) {
          alphabets.push(item);
        }
      });

      // Find highest alphabet (case insensitive)
      const highest_alphabet = alphabets.length > 0 
        ? [alphabets.reduce((max, curr) => 
            curr.toLowerCase() > max.toLowerCase() ? curr : max
          )]
        : [];

      const response: BFHLResponse = {
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        numbers,
        alphabets,
        highest_alphabet
      };

      return new Response(
        JSON.stringify(response),
        { headers: corsHeaders }
      );
    } catch (error) {
      console.error('Error processing request:', error);
      
      return new Response(
        JSON.stringify({
          is_success: false,
          error: 'Failed to process request'
        }),
        { 
          headers: corsHeaders,
          status: 400 
        }
      );
    }
  }

  // Handle unsupported methods
  return new Response(
    JSON.stringify({ error: 'Method not allowed' }),
    { 
      headers: corsHeaders,
      status: 405 
    }
  );
});
