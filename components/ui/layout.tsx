// import Head from 'next/head'

const Layout = (props: any // eslint-disable-line @typescript-eslint/no-explicit-any
) => (
  <>
    <div>
      <title>{props.title}</title>
      <meta name={props.title} content={props.description}></meta>
    </div>

    <main>
      <div className="layoutcontainer">{props.children}</div>
    </main>


    <style jsx global>{`
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        color: #333;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          'Helvetica Neue', Arial, Noto Sans, sans-serif, 'Apple Color Emoji',
          'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      }
      .layoutcontainer {
        max-width: 60vw;
        margin: 0 auto;
        padding: 2rem 1.25rem;
      }
    `}</style>
  </>
)

export default Layout
