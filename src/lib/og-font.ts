/**
 * Load a Google Font subset covering only the given text.
 * Uses a User-Agent that receives TTF/OTF (Satori does not support WOFF2).
 */
export async function loadGoogleFont(
  family: string,
  text: string,
  weight: number = 400,
): Promise<ArrayBuffer> {
  const unique = [...new Set(text)].join('');
  const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family,
  )}:wght@${weight}&text=${encodeURIComponent(unique)}`;

  const css = await fetch(cssUrl, {
    headers: {
      // Request truetype instead of woff2
      'User-Agent':
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Failed to fetch Google Font CSS for ${family}: ${res.status}`);
    }
    return res.text();
  });

  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match?.[1]) {
    throw new Error(`Could not parse font URL for ${family}`);
  }

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) {
    throw new Error(`Failed to fetch font file for ${family}: ${fontRes.status}`);
  }

  return fontRes.arrayBuffer();
}
