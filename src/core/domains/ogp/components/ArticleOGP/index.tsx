import type { FC } from 'react'

type ArticleOGPProps = {
  title: string
  iconBase64: string
}

export const ArticleOGP: FC<ArticleOGPProps> = ({ title, iconBase64 }) => {
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
