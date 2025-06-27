# Job Application Tracker

A full-stack Next.js application for tracking job applications with AI-powered job description analysis.

## Features

- **Add, Edit, Delete Job Applications**: Complete CRUD operations for managing job applications
- **Status Tracking**: Track application status (Applied, Interviewing, Rejected, Offer)
- **AI Job Analysis**: Paste job descriptions to get AI-powered summaries and skill recommendations (via Groq)
- **Dashboard**: Visual overview with statistics and application management
- **Local Storage**: Uses JSON file storage (no database required)

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **AI**: Groq AI (llama3-70b-8192)
- **Storage**: Local JSON file
- **Icons**: Lucide React

## Getting Started

1. **Clone and Install**:

   ```bash
   npm install
   ```

2. **Set up Groq API Key**:
   Create a `.env.local` file and add the content inside the .env.example as below:
   **Note:** The Key might have been deactivated by the time this assessment is assessed due to groq's security policy, kindly create a new key here: https://console.groq.com/keys

   ```
   GROQ_API_KEY=GROQQ_API_KEY
   ```

4. **Run Development Server**:

   ```bash
   npm run dev
   ```

5. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## API Endpoints

- `GET /api/jobs` - Fetch all job applications
- `POST /api/jobs` - Create a new job application
- `PUT /api/jobs/[id]` - Update a job application
- `DELETE /api/jobs/[id]` - Delete a job application
- `POST /api/analyze` - Analyze job description with AI

## File Structure

```
├── app/
│   ├── api/
│   │   ├── jobs/
│   │   │   ├── route.ts
│   │   │   └── [id]/route.ts
│   │   └── analyze/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/Job
│   ├── index.tsx
│   ├── JobForm.tsx
│   ├── JobTable.tsx
│   └── JobAnalyzer.tsx
├── lib/
│   ├── storage.ts
│   ├── groqqai.ts
│   └── openai.ts
├── types/
│   └── job.ts
└── data/
    └── jobs.json (created automatically)
```

## Usage

1. **Add Job Applications**: Fill out the form with job details and click "Add Application"
2. **View Dashboard**: See statistics and all applications in a table format
3. **Edit/Delete**: Use the action buttons in the table to modify applications
4. **AI Analysis**: Paste job descriptions in the AI analyzer to get insights and skill recommendations

## AI Features

The AI analyzer uses GROQQ AI to:

- Provide concise job summaries
- Suggest top 3 skills to highlight in your resume
- Help you better understand job requirements

## Build for Production

```bash
npm run build
npm start
```
