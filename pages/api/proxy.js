export default async function handler(req, res) {
  const { query } = req;
  const url = `http://192.168.43.233:8000/${query.path}`;

  try {
    const response = await fetch(url, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    for (let key of response.headers.keys()) {
      res.setHeader(key, response.headers.get(key));
    }

    res.status(response.status).send(await response.text());
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
