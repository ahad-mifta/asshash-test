# Asshash Psychological Test Backend

## Run

1) Install dependencies

- Backend dependencies are installed in the root project (recommended) via `npm install` after updating `package.json`.
- Alternatively, install in `server/` if you prefer.

2) Configure environment

Copy `.env.example` to `.env` and fill SMTP + MongoDB.

3) Start backend

- `npm run server:dev`

## Endpoint

- `POST /api/psychological-tests`

Request body:
```json
{
  "user": { "name": "", "age": "", "email": "a@b.com", "phone": "" },
  "testId": "ocd",
  "testTitle": "ওসিডি পরীক্ষা",
  "score": 10,
  "resultTitle": "...",
  "reportText": "...",
  "answers": [0,1,2]
}
```

Saves the submission to MongoDB and sends an email to `user.email` with the report.

