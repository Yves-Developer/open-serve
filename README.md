# OpenServe 🌐

> A modern **Citizen‑Engagement Platform** that bridges the gap between the public and government agencies.  
> Citizens can report issues in seconds, agencies can respond transparently, and everyone can track progress in real‑time.

![OpenServe hero](./public/mockup-preview.png)

---

## Live Demo

| Environment    | URL                             |
| -------------- | ------------------------------- |
| **Production** | <https://open-serve.vercel.app> |

---

## Features (MVP)

| Module                   | Capabilities                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| **Complaint Submission** | Guided form with category & agency autocomplete, markdown‑style descriptions, image uploads (coming soon). |
| **Smart Routing**        | Each complaint is auto‑tagged and sent to the correct agency inbox.                                        |
| **Citizen Dashboard**    | Track ticket status (`submitted → in‑progress → resolved/closed`) and receive notifications.               |
| **Agency Workspace**     | Lightweight admin UI to triage, comment, and mark complaints resolved.                                     |
| **Realtime Updates**     | Displays status changes instantly via server actions & React Server Components.                            |

> Designed for extensibility – upcoming milestones include AI‑assisted routing, public analytics, and SMS/USSD channels.

---

## 🛠 Tech Stack

| Layer            | Tools                                                                          |
| ---------------- | ------------------------------------------------------------------------------ |
| **Framework**    | [Next.js 14](https://nextjs.org/) – App Router + Server Actions + RSC          |
| **Styling / UI** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Database**     | MongoDB Atlas + Mongoose ODM                                                   |
| **Auth**         | [NextAuth.js](https://next-auth.js.org/) – Google OAuth (JWT strategy)         |
| **Charts**       | [VisX](https://airbnb.io/visx/) – ticket volume & SLA metrics                  |
| **Deployment**   | Vercel (CI/CD & Edge Functions)                                                |

##  Local Development

1. **Clone & install**

   ```bash
   git clone https://github.com/your‑org/open‑serve.git
   cd open‑serve
   npm install

   ```

# Environment variables

    Create a .env.local file:

    ```bash

# AuthJs.dev

AUTH_SECRET= # Added by `npx auth`. Read more: https://cli.authjs.dev
#GITHUB
AUTH_GITHUB_ID=XXXXXXXXXXXXXXXXXXXX
AUTH_GITHUB_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#GOOGLE
AUTH_GOOGLE_ID=XXXXXXXXXXXXXXXXXXXXX.apps.googleusercontent.com
AUTH_GOOGLE_SECRET=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
#MONGODB
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.zznah.mongodb.net/OpenServeDB?retryWrites=true&w=majority&appName=Cluster0
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000

````

# Run dev server

    ``bash
    npm run dev
    ```

# ➜ http://localhost:3000
````
