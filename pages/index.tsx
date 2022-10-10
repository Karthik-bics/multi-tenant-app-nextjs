import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = ({ host } : InferGetServerSidePropsType<typeof getServerSideProps> ) => {
  return (
      <div>
        Hello from {host}
      </div>
  )
}


export const getServerSideProps : GetServerSideProps = async (ctx) => {
  console.log(ctx.req.headers.host)
  return {
    props: {
      host : ctx.req.headers.host
    }
  }
}

export default Home
