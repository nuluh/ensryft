import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function EntryPage({
  params: asyncParams,
}: {
  params: Promise<{ entry: string }>;
}) {
  const params = await asyncParams; // Await the `params` object.
  const entry = await prisma.entry.findUnique({
    where: { id: params.entry },
  });

  if (!entry) {
    return <div>Entry not found.</div>;
  }

  return (
    <form method="post" action={`/api/decrypt`}>
      <input type="hidden" name="id" value={entry.id} />
      <input
        type="password"
        name="password"
        required
        placeholder="Enter the password to decrypt"
      />
      <button type="submit">Decrypt</button>
    </form>
  );
}
