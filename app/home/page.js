import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <h1> Welcome to GenshinUA </h1>
      <p>Here you will find the best guids for your favorite characters</p>
      <p><Link href="/auth-form">Sign Up</Link></p>
    </>
  )
}