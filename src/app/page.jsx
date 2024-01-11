import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex gap-10">
      <Link href="/signup" className="p-2 border border-black">
        Sign Up
      </Link>
      <Link href="/login" className="p-2 border border-black">
        Login
      </Link>
    </main>
  );
}
