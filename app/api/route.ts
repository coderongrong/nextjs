export async function POST(req: Request) {
    const body = await req.json();
    console.log(body);
    return new Response(JSON.stringify(body));
}

export async function GET(req: Request) {
    return new Response(JSON.stringify({hello: 'world'}));
}