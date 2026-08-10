import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { loadGoogleFont } from '~/lib/og-font';
import { getPost, getPosts } from '~/lib/posts';

export const alt = 'ryu';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map(({ slug }) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = await getPost(slug);

  const title = meta.title;
  const subTitle = meta.subTitle ?? '';
  const date = meta.date;

  const [goudyData, notoData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/goudy-old-style-regular.ttf')),
    loadGoogleFont('Noto Serif JP', `${title}${subTitle}${date}`),
    readFile(join(process.cwd(), 'src/app/icon.png')),
  ]);

  const iconSrc = `data:image/png;base64,${iconData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          backgroundColor: '#c4c4c4',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Soft prism / light-leak accents (matches site OG) */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            right: -80,
            width: 720,
            height: 520,
            backgroundImage:
              'radial-gradient(ellipse at 62% 38%, rgba(255,255,255,0.72) 0%, rgba(255,236,214,0.28) 26%, rgba(196,210,255,0.18) 46%, rgba(255,190,210,0.1) 58%, rgba(196,196,196,0) 72%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 20,
            right: 40,
            width: 420,
            height: 380,
            backgroundImage:
              'radial-gradient(ellipse at 40% 20%, rgba(255,255,255,0.4) 0%, rgba(220,230,255,0.14) 35%, rgba(196,196,196,0) 68%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img
              src={iconSrc}
              width={56}
              height={56}
              alt=""
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                fontSize: 36,
                fontFamily: 'Goudy Old Style',
                color: '#111111',
                letterSpacing: '-0.02em',
              }}
            >
              ryu
            </div>
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: 'Noto Serif JP',
              color: 'rgba(17,17,17,0.55)',
            }}
          >
            {date}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            width: '100%',
            maxWidth: 980,
            position: 'relative',
            flex: 1,
            justifyContent: 'center',
            paddingBottom: 24,
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? 52 : 64,
              fontFamily: 'Goudy Old Style, Noto Serif JP',
              color: '#111111',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              display: 'flex',
              flexWrap: 'wrap',
            }}
          >
            {title}
          </div>
          {subTitle ? (
            <div
              style={{
                fontSize: 30,
                fontFamily: 'Noto Serif JP',
                color: 'rgba(17,17,17,0.55)',
                lineHeight: 1.4,
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {subTitle}
            </div>
          ) : null}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Goudy Old Style',
          data: goudyData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Noto Serif JP',
          data: notoData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
