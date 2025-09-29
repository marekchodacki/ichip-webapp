# iChip WebApp

## Project Overview

**iChip WebApp** is a prototype service page web application designed for clients of a mobile device repair service. The website serves both as an informational platform and as a convenient way for customers to submit repair requests online. With an advanced repair request form and a searchable price list, clients can easily configure a submission and check detailed repair costs for their device.

## Key Features

- **Repair request form:** An intuitive form for customers to report device issues and request repair services, including device shipping options.
- **Price list with model search:** A dynamic search allowing users to look up repair costs (e.g. screen replacement, battery repair) by device model.
- **Location on map:** An interactive map displaying the service location, helping customers find the company easily.
- **About/Company info section:** Company description and contact details (replaced with placeholder/demo data).

## Tech Stack

Built with modern frontend technologies:

- **Vue 3** – Progressive JavaScript framework for building UIs.
- **TypeScript** – For improved code reliability and structure.
- **Vite** – Fast project bundler and dev tool.
- **Vue Router** – Managing multiple views (form, price list, contact, etc.).
- **TailwindCSS** – Utility-first CSS framework for responsive and modern styling.
- **Vee-Validate + Zod** – For robust form validation.
- **EmailJS** – For handling contact form submissions without backend.

## Project Status

Prototype/demonstration stage. Publicly available for educational and portfolio purposes. Contact and location details are placeholders.  
The project currently uses Vite 5.x. An upgrade to Vite 7.x would resolve known esbuild vulnerabilities, but may require adjustments to configuration or plugins.

## Demo

[ichip-webapp.vercel.app](https://ichip-webapp.vercel.app/)

---

## Installation & Local Setup

```bash
# Clone repo
git clone https://github.com/marekchodacki/ichip-webapp
cd ichip-webapp

# Install dependencies
npm install

# Copy example environment file
cp .env.example .env

# Run development server
npm run dev
```

---

## Usage After Installation

Once the development server is running (`npm run dev`), follow these steps to ensure everything works correctly:

### 1. Configure Environment Variables

Copy `.env.example` to `.env` (already shown above) and fill in your actual values:

```bash
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

---

### 2. EmailJS Setup

The contact form relies on [EmailJS](https://www.emailjs.com/) for sending emails without a backend.

#### Step 1 – Account

- Sign up at [https://www.emailjs.com/](https://www.emailjs.com/)
- Verify your email

#### Step 2 – Create Email Service

- Go to **Email Services** in the EmailJS dashboard
- Click **Add New Service** and connect your provider (e.g. Gmail, Outlook, etc.)
- Copy the generated **Service ID**

#### Step 3 – Create Email Template

- In **Email Templates**, click **Create New Template**
- Example template:

```
Subject: New Repair Request - {{device_model}}

Hello,

You have received a new repair request:

Customer: {{customer_name}} ({{customer_email}})
Device: {{device_model}}
Issue: {{device_issue}}
Details: {{issue_description}}

Repair Type: {{repair_type}}
Shipping Required: {{shipping_required}}
```

- Save and copy the **Template ID**

#### Step 4 – Get Public Key

- Go to **Account → General**
- Copy your **Public Key**

#### Step 5 – Test Integration

1. Restart the dev server: `npm run dev`
2. Navigate to the contact form in your browser
3. Submit a test request
4. Verify if the email has been successfully delivered

---

## Security Notes

- **Never commit real API keys** to `.env` or to the repo. Always use `.env.example` with placeholders.
- `.env` should remain in `.gitignore` for local development.
- In production (e.g. Vercel, Netlify), set the environment variables in your hosting provider’s dashboard.

---

## Author

[marekchodacki.pl](https://marekchodacki.pl)
