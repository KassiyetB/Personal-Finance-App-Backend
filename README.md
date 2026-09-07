## Install Dependencies

```bash
npm install
```

## Environment Variables Setup
```bash
PORT = 3000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
```

## Generate Prisma Client
```bash
npx prisma generate
```

## Run Database Migrations (Optional / Recommended)

```bash
npx prisma migrate dev
```