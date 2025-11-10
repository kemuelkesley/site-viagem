<div align="center">
   <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/18sfISmPoqx54BnQtfedb2YArbYeVIwdr

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Forms (Netlify Forms)

This project includes a contact form that is configured to work with Netlify Forms. A few notes to make submissions arrive and, optionally, be forwarded to email:

- The app contains a hidden static form in `index.html` so Netlify can detect the form at build time. The client-side React form (`components/Contact.tsx`) submits via AJAX to `/` using URL-encoded body.
- To receive submissions in Netlify and/or send email notifications:
   1. Deploy the site to Netlify (connect the repository and deploy).
 2. In the Netlify UI, go to Site > Forms and ensure **Form detection** is enabled.
 3. In Site > Configuration > Notifications > Form submission notifications, add an email notification so form submissions are emailed to you.

Testing locally: the form submission will POST to `/` on the local dev server and return success/failure, but Netlify's form inbox and notifications only work on an actual Netlify deploy. To test behaviour locally you can inspect the network request in devtools; after deploy you should see real submissions in Netlify's UI.

If you prefer sending emails directly from the site (without Netlify notifications), we can add a serverless function (Netlify Function) that uses an SMTP provider or a transactional email API (SendGrid, Mailgun, etc.). Tell me if you want that and which provider you prefer.
