export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Only POST allowed' });
    }
  
    const prompt = req.body.prompt;
  
    try {
      const response = await fetch('https://api.textsynth.com/v1/engines/gptj_6B/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 06ddec29175b9472d6dd1c3cd20747b1'
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 100
        })
      });
  
      const data = await response.json();
  
      if (response.ok) {
        res.status(200).json({ reply: data.text });
      } else {
        res.status(500).json({ error: data.error || 'API error' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  }
  