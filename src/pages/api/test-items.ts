import type { APIContext } from 'astro';
import { verifyAuth, unauthorizedResponse } from '../../utils/auth';
import { env } from "cloudflare:workers";

interface CloudflareLocals {
  runtime: {
    env: {
      DB: any; // D1 database
    };
  };
}

export async function GET({ locals, request }: APIContext & { locals: CloudflareLocals }) {
  // Check authentication
  if (!verifyAuth(request)) {
    return unauthorizedResponse();
  }

  const db = env.DB;
  
  const testResults = {
    setup: { success: false, message: '' },
    createTest: { success: false, message: '', id: null },
    readTest: { success: false, message: '', data: null },
    updateTest: { success: false, message: '' },
    deleteTest: { success: false, message: '' },
    cleanup: { success: false, message: '' }
  };
  
  try {
    // 1. Setup - ensure the table exists
    try {
      await db.prepare(`
        CREATE TABLE IF NOT EXISTS items (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          description TEXT
        )
      `).run();
      testResults.setup = { success: true, message: 'Table setup successful' };
      
      // Run through all CRUD operations to test
      // See full implementation in the source code
      
    } catch (error) {
      testResults.setup = { 
        success: false, 
        message: `Table setup failed: ${error instanceof Error ? error.message : String(error)}` 
      };
    }
    
    return new Response(JSON.stringify({
      message: "CRUD Test completed",
      results: testResults,
      time: new Date().toISOString()
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Test error:', error);
    return new Response(JSON.stringify({ 
      error: 'Test failed', 
      message: error instanceof Error ? error.message : String(error),
      results: testResults
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}