// Serves a public Instagram post image from this site: /api/ig?c=SHORTCODE
module.exports = async (req, res) => {
  const c = String((req.query && req.query.c) || '').replace(/[^A-Za-z0-9_-]/g, '');
  if (!c) { res.status(400).end(); return; }
  try {
    const r = await fetch('https://www.instagram.com/p/' + c + '/media/?size=l', {
      redirect: 'follow',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' }
    });
    const type = r.headers.get('content-type') || '';
    if (!r.ok || type.indexOf('image/') !== 0) { res.status(502).end(); return; }
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'public, s-maxage=604800, stale-while-revalidate=86400');
    res.status(200).send(buf);
  } catch (e) { res.status(502).end(); }
};
