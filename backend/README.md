## Installation Steps

### 1. Environment Configuration

Create your environment configuration file by copying the example file:

```bash
cp .env.example .env
```

### 2. Install Dependencies

Install all required project dependencies:

```bash
npm i
```

### 3. Database Setup

#### a. Seed Data to Database

```bash
npm run seed-context
```

> **Note:** This process may take 1-2 minutes to complete. Please wait until it finishes before proceeding to the next step.

#### b. Create Vector Index

```bash
npm run create-index
```

> **Note:** Index creation may take 1-2 minutes depending on your system and database size.

#### c. Test Vector Search (Optional)

To verify that vector search is working correctly with your MongoDB setup:

```bash
npm run sample-search
```

This command runs a test query to confirm the vector search functionality is operational.

### 4. Running the Development Server

Once the database is properly configured and seeded, start the development server:

```bash
npm run dev
```

The application should now be running and accessible at the configured port (check the console output for the URL).

<!--
{
  "fields": [
    {
      "type": "vector",
      "path": "embeddings",
      "numDimensions": 768,
      "similarity": "cosine"
    }
  ]
}
-->
