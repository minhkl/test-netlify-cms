import Link from 'next/link'
import Image from 'next/image'

export default function FirstPost() {
  return (
    <>
      <h1>Profile</h1>
      <Image
        src="/images/profile.jpg"
        alt="Picture of the author"
        width={500}
        height={500}
      />
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  )
}