# Encrypted Text Storage App

A lightweight Next.js application for securely storing and retrieving encrypted text online. Users can encrypt text with a password, save it in the database, and retrieve it using a unique URL. No login or signup is required.

## Features

- **Text Encryption**: Securely encrypts text up to 255 characters using a user-provided password.
- **Unique URL**: Each encrypted text is accessible via a unique URL for easy sharing.
- **No Authentication**: No login or signup is required, ensuring a simple user experience.
- **Supabase Integration**: Data is securely stored in a Supabase-hosted PostgreSQL database.
- **Prisma ORM**: Manages database interactions with Prisma for simplicity and flexibility.
- **Zero Styling**: The app relies on the browser's default styling, with no additional CSS or inline styles.
- **Minimal JavaScript**: Focuses on server-side functionality with minimal client-side JavaScript.

## How It Works

1. **Create Encrypted Text**:
   - Go to [ensryft.nuluh.com](ensryft.nuluh.com)
   - Enter your text and a password.
   - Receive a unique URL to access your encrypted text.
   - Bookmark the URL for future reference.

2. **Retrieve and Decrypt Text**:
   - Visit the bookmarked URL.
   - Enter the password used during encryption.
   - View the decrypted text.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/encrypted-text-storage.git
   cd encrypted-text-storage
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables:
   - Create a `.env` file in the root directory.
   - Add your Supabase database connection string:
     ```env
     DATABASE_URL="postgres://username:password@host:port/database"
     ```

4. Set up Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Visit `http://localhost:3000` in your browser.

### Deployment

To deploy the application:

1. Ensure your `DATABASE_URL` environment variable is set in your hosting platform (e.g., Vercel, Netlify).
2. Deploy the app using your preferred method (e.g., Vercel).

### API Endpoints

- **POST /create**: Encrypts and stores text in the database.
- **GET /entry/[id]**: Retrieves and decrypts the stored text.

## Technologies Used

- **Next.js**: React framework for server-side rendering.
- **Supabase**: Cloud-hosted PostgreSQL database.
- **Prisma**: ORM for database management.
- **Node.js Crypto**: For secure encryption and decryption.

## Project Structure

```plaintext
.
├── prisma/                     # Prisma schema and migrations
│   ├── schema.prisma           # Database schema
├── src/                        # Source code
│   ├── app/                    # Next.js app router
│   │   ├── create/             # Encrypted text creation logic
│   │   ├── entry/[id]/         # Decryption and display logic
│   ├── lib/                    # Utility libraries
│   │   ├── prisma.ts           # Prisma client
│   │   ├── crypto.ts           # Encryption and decryption utilities
├── .env                        # Environment variables
├── README.md                   # Project documentation
```

## To-Do

- **Prevent Duplicate Entries**: 
  - Before creating a new entry, calculate the hash of the text content (e.g., using SHA-256).
  - Check if the hash already exists in the database.
  - If a duplicate is found, return the existing entry's ID to avoid creating redundant entries.
- Add rate-limiting to prevent abuse of the encryption service.
- Implement unit tests for encryption, decryption, and database interactions.
- Add better error handling and user feedback for invalid inputs or server issues.
- Provide an option to delete an entry by providing the password.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
