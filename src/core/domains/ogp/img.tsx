import fs from 'fs'
import path from 'path'
import type { FC } from 'react'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'

const OGP_WIDTH = 1200
const OGP_HEIGHT = 630

type ArticleOGPProps = {
  title: string
  iconBase64: string
}

const ArticleOGP: FC<ArticleOGPProps> = ({ title, iconBase64 }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        color: '#222',
        backgroundColor: '#fff',
        fontSize: '42px',
        fontWeight: '700',
        padding: '60px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          margin: '0 60px 60px 0',
          padding: '0 60px 0 0',
          borderRight: '2px solid #ccc',
        }}
      >
        <img
          src={`data:image/png;base64,${iconBase64}`}
          width="120"
          height="120"
        />
        <div
          style={{
            display: 'flex',
            margin: '40px 0 0',
            fontSize: '36px',
          }}
        >
          @kimulaco/blog
        </div>
      </div>
      <div
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          whiteSpace: 'pre-wrap',
        }}
      >
        {title}
      </div>
    </div>
  )
}

export const generateOgpImage = async (title: string) => {
  const fontPath = path.resolve(
    process.cwd(),
    'src/assets/font/NotoSansJP-Bold.ttf'
  )
  const fontData = fs.readFileSync(fontPath)

  const iconPath = path.resolve(process.cwd(), 'src/assets/img/icon-logo.png')
  const iconBuffer = fs.readFileSync(iconPath)
  const iconBase64 = iconBuffer.toString('base64')

  const svg = await satori(
    <ArticleOGP title={title} iconBase64={iconBase64} />,
    {
      width: OGP_WIDTH,
      height: OGP_HEIGHT,
      fonts: [
        {
          name: 'Noto Sans JP',
          data: fontData,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  )

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: OGP_WIDTH,
    },
  })
  const image = resvg.render()

  return image.asPng()
}
