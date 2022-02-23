module.exports = {
  siteMetadata: {
    title: `A Gatsby Blog`,
    author: {
      name: `Eric Dodds`,
      summary: `who gets your data where it needs to be.`,
    },
    description: `A blog using RudderStack`,
    siteUrl: `https://gatsbystarterblogsource.gatsbyjs.io/`,
    social: {
      twitter: `ericdodds`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Gatsby Starter Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `A Gatsby Blog`,
        short_name: `Eric's Gatsby Blog`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-react-helmet`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    {
    resolve: `gatsby-plugin-rudderstack`,
    options: {
      // your rudderstack write key for your production environment
      // when process.env.NODE_ENV === 'production'
      // required; non-empty string
      //NOTE: Do not commit this to git. Process from env.
      prodKey: `25WjMTuJEZeXbgC0Dn0pqlxJBid`,

      // if you have a development env for your rudderstack account, paste that key here
      // when process.env.NODE_ENV === 'development'
      // optional; non-empty string
      //NOTE: Do not commit this to git. Process from env.
      devKey: `25WjMTuJEZeXbgC0Dn0pqlxJBid`,

      // boolean (defaults to false) on whether you want
      // to include analytics.page() automatically
      // if false, see below on how to track pageviews manually
      trackPage: true,

      // number (defaults to 50); time to wait after a route update before it should
      // track the page change, to implement this, make sure your `trackPage` property is set to `true`
      trackPageDelay: 50,

      // If you need to proxy events through a custom data plane,
      // add a `dataPlaneUrl` property (defaults to https://hosted.rudderlabs.com )
      // RudderStack docs:
      //   - https://docs.rudderstack.com/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk#3-1-load
      dataPlaneUrl: `https://rudderstac.dataplane.rudderstack.com/`,

      // Add a `controlPlaneUrl` property if you are self-hosting the Control Plane
      // RudderStack docs:
      //   - https://docs.rudderstack.com/rudderstack-sdk-integration-guides/rudderstack-javascript-sdk#3-1-1-self-hosted-control-plane
      // controlPlaneUrl: `https://override-control-plane-url`,

      // boolean (defaults to false); whether to delay load RudderStack
      // ADVANCED FEATURE: only use if you leverage client-side routing (ie, Gatsby <Link>)
      // This feature will force RudderStack to load _after_ either a page routing change
      // or user scroll, or after `delayLoadTime` elapses, whichever comes first. This feature is used to help improve your website's
      // TTI (for SEO, UX, etc).  See links below for more info.
      // NOTE: But if you are using server-side routing and enable this feature,
      // RudderStack will never load (because although client-side routing does not do
      // a full page refresh, server-side routing does, thereby preventing RudderStack
      // from ever loading).
      // See here for more context:
      // GIF: https://github.com/benjaminhoffman/gatsby-plugin-segment/pull/19#issuecomment-559569483
      // TTI: https://github.com/GoogleChrome/lighthouse/blob/master/docs/scoring.md#performance
      // Problem/solution: https://marketingexamples.com/seo/performance
      delayLoad: false,

      // number (default to 1000); time to wait after the page loads
      // to load the RudderStack SDK
      // To be used when `delayLoad` is set to `true`
      // delayLoadTime: 1000

      // Whether to completely skip calling `analytics.load()`.
      // ADVANCED FEATURE: only use if you are calling `analytics.load()` manually
      // elsewhere in your code or are using a library
      // that will call it for you.
      // Useful for only loading the tracking script once a user has opted in to being tracked, for example.
      // *Another use case is if you want to add callbacks to the methods at load time.
      manualLoad: false,

      useNewSDK: true,

      // string ('async' or 'defer'); whether to load the RudderStack SDK async or defer. Anything else
      // will load normally.
      // 'async' will load the SDK as <script async></script>
      // 'defer' will load the SDK as <script defer></script>
      loadType: 'default'
    }
  }
  ],
}
