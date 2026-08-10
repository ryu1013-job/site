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

  const [goudyData, notoSerifData, notoSansData, iconData] = await Promise.all([
    readFile(join(process.cwd(), 'src/app/goudy-old-style-regular.ttf')),
    loadGoogleFont('Noto Serif JP', `${title}${subTitle}`),
    loadGoogleFont('Noto Sans JP', date),
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
          backgroundColor: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            width: '100%',
          }}
        >
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
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            width: '100%',
            maxWidth: 980,
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontSize: title.length > 40 ? 52 : 64,
              fontFamily: 'Noto Serif JP',
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

        <div
          style={{
            fontSize: 22,
            fontFamily: 'Noto Sans JP',
            color: 'rgba(17,17,17,0.55)',
          }}
        >
          {date}
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
          data: notoSerifData,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Noto Sans JP',
          data: notoSansData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
