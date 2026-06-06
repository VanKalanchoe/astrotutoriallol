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

export async function GET({ request }: APIContext) {
  if (!verifyAuth(request)) {
    return unauthorizedResponse();
  }

  const db = env.DB;

  const testResults: any = {
    setup: {},
    createTest: {},
    readTest: {},
    updateTest: {},
    deleteTest: {},
  };

  try {
    // 1. Setup
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
      )
    `).run();

    testResults.setup = { success: true };

    // 2. CREATE (THIS WAS MISSING)
    const insert = await db.prepare(
      "INSERT INTO items (name, description) VALUES (?, ?)"
    ).bind("Test Item", "Hello").run();

    testResults.createTest = {
      success: true,
      id: insert.meta?.last_row_id,
    };

    // 3. READ
    const read = await db.prepare("SELECT * FROM items").all();

    testResults.readTest = {
      success: true,
      data: read.results,
    };

    return new Response(JSON.stringify({
      message: "CRUD Test completed",
      results: testResults,
    }));

  } catch (err) {
    return new Response(JSON.stringify({
      error: String(err),
      results: testResults,
    }), { status: 500 });
  }
}