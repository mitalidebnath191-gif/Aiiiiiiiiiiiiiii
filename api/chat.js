export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;
    
    // Vercel Environment Variable থেকে Key-টি রিড করছে
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

    if (!OPENROUTER_API_KEY) {
        return res.status(500).json({ error: "Vercel-এ API Key সেট করা নেই!" });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "nvidia/nemotron-3-super-120b-a12b:free",
                messages: messages
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
        
    } catch (error) {
        return res.status(500).json({ error: "সার্ভার এরর: " + error.message });
    }
}
