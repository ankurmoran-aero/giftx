// api/mail.js - Serverless Function for GiftX Mailbox Sync
export default async function handler(req, res) {
  // Allow cross-origin requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const GITHUB_REPO = 'ankurmoran-aero/giftx';
  const ISSUE_NUMBER = 1;
  const GITHUB_TOKEN =
    process.env.GITHUB_PAT ||
    Buffer.from(
      'Z2l0aHViX3BhdF8xMUIyS1pHN0EwRDRyRjZKV3VNZGpTX1FHQkk3ckdzQTdNelZURHJrbUJReGNqZG5SckNDbnM4WURIM1NjWHBTRzBZVE1PU0JDREkzeWN5V3hw',
      'base64'
    ).toString('utf8');

  try {
    if (req.method === 'GET') {
      const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${ISSUE_NUMBER}`, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'User-Agent': 'giftx-app',
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (!ghRes.ok) {
        return res.status(ghRes.status).json({ error: 'Failed to fetch from GitHub', status: ghRes.status });
      }

      const ghData = await ghRes.json();
      let mails = [];
      if (ghData.body) {
        try {
          const parsed = JSON.parse(ghData.body);
          if (Array.isArray(parsed)) {
            mails = parsed;
          }
        } catch (e) {
          console.error('Error parsing issue body:', e);
        }
      }

      return res.status(200).json({ success: true, mails, updatedAt: ghData.updated_at });
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      let bodyData = req.body;
      if (typeof bodyData === 'string') {
        try {
          bodyData = JSON.parse(bodyData);
        } catch {
          bodyData = {};
        }
      }

      const mails = Array.isArray(bodyData?.mails) ? bodyData.mails : bodyData;
      if (!Array.isArray(mails)) {
        return res.status(400).json({ error: 'Payload must contain a mails array' });
      }

      const payloadStr = JSON.stringify(mails);

      const ghRes = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues/${ISSUE_NUMBER}`, {
        method: 'PATCH',
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          'User-Agent': 'giftx-app',
          Accept: 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ body: payloadStr }),
      });

      if (!ghRes.ok) {
        return res.status(ghRes.status).json({ error: 'Failed to update GitHub issue', status: ghRes.status });
      }

      const ghData = await ghRes.json();
      return res.status(200).json({ success: true, count: mails.length, mails, updatedAt: ghData.updated_at });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Mail API error:', err);
    return res.status(500).json({ error: 'Internal server error', details: String(err) });
  }
}
