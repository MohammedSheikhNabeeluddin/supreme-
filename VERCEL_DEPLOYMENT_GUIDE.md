# Vercel Deployment Guide for Supreme E-Commerce Bookstore

## Overview
This guide helps you deploy your Next.js e-commerce application to Vercel. The build errors have been fixed in PR #2, and this document walks you through the final configuration steps.

---

## 🔧 What Was Fixed (PR #2 Summary)

### 1. **ESLint Configuration Fix**
**Problem:** ESLint couldn't resolve module paths during Vercel builds.

**Solution:** Updated `eslint.config.mjs` to use `FlatCompat` for proper module resolution with Next.js.

**File:** `eslint.config.mjs`
```javascript
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**"]
  },
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  // ... rules
];
```

### 2. **Prisma Build Step Addition**
**Problem:** Prisma client types weren't generated before Next.js build.

**Solution:** Added `prisma generate` to the build script.

**File:** `package.json`
```json
{
  "scripts": {
    "build": "prisma generate && next build"
  }
}
```

### 3. **Environment Variable Configuration for Database**
**Problem:** Hardcoded database path and plain-text admin password.

**Solution:** Migrated to use Turso database with environment variables.

**File:** `lib/db.ts`
```typescript
import { createClient } from "@libsql/client";

const libsql = createClient({
  url: process.env.TURSO_DATABASE_URL || "file:prisma/dev.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const adapter = new PrismaLibSql(libsql as any);
```

### 4. **Authentication Security**
**Problem:** Admin password hardcoded in source code.

**Solution:** Use environment variable with validation.

**File:** `lib/auth.ts`
```typescript
const ADMIN_PASSWORD = (() => {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD environment variable must be set");
  }

  return password;
})();
```

---

## 📋 Environment Variables Setup

### Step 1: Get Turso Database Credentials
1. Visit [Turso.tech](https://turso.tech)
2. Create a free account
3. Create a new database
4. Copy your:
   - **Database URL** (`TURSO_DATABASE_URL`)
   - **Auth Token** (`TURSO_AUTH_TOKEN`)

### Step 2: Generate NextAuth Secret
Run this command locally:
```bash
openssl rand -base64 32
```
Copy the output for `NEXTAUTH_SECRET`

### Step 3: Add Variables to Vercel
1. Go to your Vercel Project Dashboard
2. Click **Settings** → **Environment Variables**
3. Add the following variables:

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `TURSO_DATABASE_URL` | `libsql://your-db.turso.io` | From Turso dashboard |
| `TURSO_AUTH_TOKEN` | `your-auth-token` | From Turso dashboard |
| `ADMIN_PASSWORD` | `your-secure-password` | Create a strong password |
| `NEXTAUTH_URL` | `https://your-domain.vercel.app` | Your Vercel URL |
| `NEXTAUTH_SECRET` | `generated-secret-above` | From openssl command |

**Important:** These should only be added to **Production** environment. For preview/development, use `.env.local` locally.

---

## 🚀 Local Development Setup

### 1. Clone Repository
```bash
git clone https://github.com/MohammedSheikhNabeeluddin/supreme-.git
cd supreme-
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create `.env.local` (Local Only)
```env
TURSO_DATABASE_URL=file:prisma/dev.db
TURSO_AUTH_TOKEN=
ADMIN_PASSWORD=dev-password
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=local-dev-secret
```

### 4. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## ✅ Vercel Deployment Checklist

- [ ] PR #2 is merged (already done ✓)
- [ ] All environment variables added to Vercel Settings
- [ ] Turso database created and credentials copied
- [ ] NEXTAUTH_SECRET generated and added
- [ ] ADMIN_PASSWORD set to a secure value
- [ ] Trigger a new deployment from Vercel dashboard
- [ ] Test the deployed application
- [ ] Verify database operations (create orders, etc.)

---

## 🐛 Troubleshooting

### Build Fails: "ADMIN_PASSWORD environment variable must be set"
**Solution:** Add `ADMIN_PASSWORD` to Vercel environment variables.

### Build Fails: "Cannot find module @libsql/client"
**Solution:** Run `npm install` and ensure all dependencies are installed.

### Build Fails: ESLint errors
**Solution:** The new ESLint config in PR #2 should fix this. Make sure the merge is complete.

### Database Connection Errors
**Solution:** Verify `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` are correctly copied from Turso dashboard.

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Turso Documentation](https://docs.turso.tech)
- [Prisma Adapter for LibSQL](https://www.prisma.io/docs/orm/overview/databases/turso)
- [NextAuth.js Configuration](https://next-auth.js.org/configuration/options)

---

## 💡 Pro Tips

1. **Use Vercel's Preview Environment:** Each PR gets its own preview URL for testing before merging.
2. **Monitor Deployment Logs:** Check Vercel dashboard → Deployments → Logs for detailed error info.
3. **Database Backups:** Turso automatically backs up your data.
4. **Scaling:** Turso provides SQLite scaling without code changes.

---

**Need Help?** Check the GitHub Issues or contact support via your Vercel dashboard.
