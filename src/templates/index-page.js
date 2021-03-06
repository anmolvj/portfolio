import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { GiSpellBook } from 'react-icons/gi'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import { Button } from 'gatsby-theme-material-ui'
import { IoMdArrowRoundForward } from 'react-icons/io'
import { AiOutlineRead } from 'react-icons/ai'
import colors from '../colors'
const MainContainer = styled.div``

const BannerContainer = styled.div``
const ReadMoreButton = styled(Button)`
    color: ${colors.VERY_DARK_GREY};
    font-size: 1rem;
    font-weight: bold;
    font-family: Nunito;
`
const NameContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Kaushan Script', cursive;
    font-size: 4rem;
    justify-content: center;
    align-items: center;
    max-width: 1024px;
    margin: auto;

    @media (min-width: 768px) {
        flex-direction: row;
        font-size: 6rem;
    }
    @media (min-width: 800px) {
        font-size: 6.5rem;
    }
    @media (min-width: 1024px) {
        font-size: 8rem;
    }
`

const FnameContainer = styled.div`
    @media (min-width: 768px) {
        margin-right: 1rem;
    }
    @media (min-width: 1024px) {
        margin-right: 2rem;
    }
`
const LnameContainer = styled.div``

const OpenerUnderName = styled.h3`
    padding: 5px;
    text-align: center;
    font-size: 1rem;
`

const BlogRollContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: auto;
`
const BlogRollHeader = styled.div`
    font-size: 2rem;
    margin: 20px auto;
    font-weight: bold;
`
export const IndexPageTemplate = ({ fname, lname, subheading }) => (
    <MainContainer>
        <BannerContainer>
            <NameContainer>
                <FnameContainer>{fname}</FnameContainer>
                <LnameContainer>{lname}</LnameContainer>
            </NameContainer>
            <OpenerUnderName>{subheading}</OpenerUnderName>
        </BannerContainer>
        <BlogRollContainer>
            <BlogRollHeader>
                Latest Posts <GiSpellBook />
            </BlogRollHeader>
            <BlogRoll />
            <div className="column is-12 has-text-centered">
                <Link to="/blog">
                    <ReadMoreButton
                        variant="text"
                        startIcon={<AiOutlineRead />}
                        endIcon={<IoMdArrowRoundForward />}
                        size="large"
                    >
                        Read more
                    </ReadMoreButton>
                </Link>
            </div>
        </BlogRollContainer>
    </MainContainer>
)

IndexPageTemplate.propTypes = {
    fname: PropTypes.string,
    lname: PropTypes.string,
    subheading: PropTypes.string,
}

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark

    return (
        <Layout>
            <IndexPageTemplate
                fname={frontmatter.fname}
                lname={frontmatter.lname}
                subheading={frontmatter.subheading}
            />
        </Layout>
    )
}

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
}

export default IndexPage

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                fname
                lname
                subheading
            }
        }
    }
`
