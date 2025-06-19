import fs from 'fs'
import path from 'path'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { ArticleOGP } from './components/ArticleOGP/index.tsx'

const OGP_WIDTH = 1200
const OGP_HEIGHT = 630

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
