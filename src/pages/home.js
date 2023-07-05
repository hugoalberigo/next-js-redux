// import Head from 'next/head'
// import styles from '@/styles/Home.module.css'
import Layout from "../components/Layout";
import Header from "../components/Header";
import HomePage from "./homepage";



export default function Home() {
  return (
    <>
      <Layout pageTitle="Home Page Nextjs">
        <Header />
        <HomePage />  
      </Layout>
    </>
  )
}
