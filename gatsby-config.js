module.exports = {
    siteMetadata: {
        siteUrl: 'https://www.notesbyanmol.com',
        title: 'Notes by Anmol',
        description:
            'This is a space where I share notes from the audio books I listen to.',
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-plugin-google-analytics`,
            options: {
                trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'none',
                head: true,
                anonymize: true,
                exclude: ['/preview/**'],
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Notes By Anmol`,
                short_name: `NotesByAnmol`,
                start_url: `/`,
                background_color: `#87CBAC`,
                theme_color: `#87CBAC`,
                display: `standalone`,
                icon: `${__dirname}/static/img/portrait.jpg`,
            },
        },
        {
            resolve: `gatsby-plugin-offline`,
            options: {
                precachePages: [`/my-story/`, `/blog/*`],
            },
        },
        'gatsby-plugin-sitemap',
        {
            resolve: 'gatsby-plugin-robots-txt',
            options: {
                policy: [{ userAgent: '*', allow: '/' }],
            },
        },
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-plugin-nprogress`,
            options: {
                showSpinner: false,
            },
        },
        {
            resolve: 'gatsby-plugin-page-progress',
            options: {
                prependToBody: true,
                includePaths: [{ regex: '^/blog/' }],
                height: 3,
                color: `#f50057`,
            },
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Nunito\:400,400i,700, 700i`,
                    // `Kaushan+Script\:400` --> this font isn't getting the correct version through this plugin
                ],
                display: 'swap',
            },
        },
        {
            resolve: `gatsby-theme-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        `gatsby-plugin-styled-components`,
        {
            // keep as first gatsby-source-filesystem plugin for gatsby image support
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/static/img`,
                name: 'uploads',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/img`,
                name: 'images',
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    {
                        resolve: 'gatsby-remark-relative-images',
                        options: {
                            name: 'uploads',
                        },
                    },
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            // It's important to specify the maxWidth (in pixels) of
                            // the content container as this plugin uses this as the
                            // base for generating different widths of each image.
                            maxWidth: 2048,
                        },
                    },
                    {
                        resolve: 'gatsby-remark-copy-linked-files',
                        options: {
                            destinationDir: 'static',
                        },
                    },
                    `gatsby-remark-reading-time`,
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-netlify-cms',
            options: {
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        {
            resolve: 'gatsby-plugin-purgecss', // purges all unused/unreferenced css rules
            options: {
                develop: true, // Activates purging in npm run develop
                purgeOnly: ['/all.sass'], // applies purging only on the bulma css file
            },
        }, // must be after other CSS plugins
        'gatsby-plugin-netlify', // make sure to keep it last in the array
    ],
}
