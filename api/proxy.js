export default async function handler(req, res) {
  const targetUrl = 'http://192.168.43.233:8000'; // URL вашего целевого сервера

  try {
    const response = await fetch(targetUrl + req.url, {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
        ...req.headers,
      },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined,
    });

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при проксировании запроса' });
  }
}
