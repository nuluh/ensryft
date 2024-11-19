import { redirect } from 'next/navigation';

export default async function HomePage() {
  return (
    <form action="/api/encrypt" method="post">
      <textarea
        name="text"
        required
        placeholder="Enter text to encrypt (max 255 characters)"
        maxLength={255}
      />
      <br />
      <input
        type="password"
        name="password"
        required
        placeholder="Enter a password to encrypt"
      />
      <br />
      <button type="submit">Encrypt & Save</button>
    </form>
  );
}
