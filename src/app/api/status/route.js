export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      endpoints: {
        'test-db': '/api/test-db (GET)',
        'clerk-webhook': '/api/webhooks/clerk (POST)',
        'user-create': '/api/user/create (POST)'
      }
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}
