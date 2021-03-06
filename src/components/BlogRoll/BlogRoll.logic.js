import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql, StaticQuery } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import Post from './Post'

const BlogRollGrid = styled(Grid)``
const BlogRollGridItems = styled(Grid)`
    height: 100%;
`
export const BlogRoll = (props) => {
    const { data, showAll } = props
    const { edges: posts } = data.allMarkdownRemark
    return (
        <BlogRollGrid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            spacing={5}
        >
            {posts &&
                posts.map(({ node: post }, idx) => {
                    if (showAll || idx < 4) {
                        return (
                            <BlogRollGridItems item xs={12} sm={6}>
                                <Post post={post} />
                            </BlogRollGridItems>
                        )
                    }
                })}
            {posts.length % 2 !== 0 && <Grid item xs={12} sm={6} />}
        </BlogRollGrid>
    )
}

BlogRoll.propTypes = {
    data: PropTypes.shape({
        allMarkdownRemark: PropTypes.shape({
            edges: PropTypes.array,
        }),
    }),
}

export default ({ showAll }) => (
    <StaticQuery
        query={graphql`
            query BlogRollQuery {
                allMarkdownRemark(
                    sort: { order: DESC, fields: [frontmatter___date] }
                    filter: {
                        frontmatter: { templateKey: { eq: "blog-post" } }
                    }
                ) {
                    edges {
                        node {
                            excerpt(pruneLength: 400)
                            id
                            fields {
                                slug
                                readingTime {
                                    text
                                }
                            }
                            frontmatter {
                                title
                                templateKey
                                date(formatString: "MMMM DD, YYYY")
                                featuredpost
                                description
                                tags
                            }
                        }
                    }
                }
            }
        `}
        render={(data, count) => (
            <BlogRoll data={data} count={count} showAll={showAll} />
        )}
    />
)
