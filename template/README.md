# Docsendara Template Usage

This directory contains starter templates for integrating the Docsendara documentation engine into your own Next.js project.

## 📦 What is this?
The `blank` directory provides a minimal, ready-to-use set of files for Docsendara's documentation engine. You can use it to quickly add interactive, GitHub-powered documentation to any Next.js app.

## 🚀 How to Integrate
1. **Copy the Template:**
   - Copy all files from `template/blank/` into a new directory in your Next.js project. For example, create `src/app/docs` and paste the contents there.
   - Your structure should look like: `your-app/src/app/docs/DocsLayout.js`, `your-app/src/app/docs/DocsContent.js`, etc.

2. **Configure Your Docs:**
   - Edit `utils/docsConfig.js` to set your sidebar structure, GitHub repo, and page metadata.
   - Optionally, adjust `utils/styleConfig.js` for custom colors, fonts, and themes.

3. **Add Markdown Content:**
   - Place your Markdown files in the appropriate directory as configured in `docsConfig.js`.

4. **Use in Your App:**
   - Route to `/docs` (or whatever path you used) to view your documentation engine in action.

## 🧩 Flexible Integration
- Use this template to add documentation to an existing Next.js project without replacing your main site.
- All logic for fetching, rendering, and styling docs is self-contained in the copied directory.

## 🛠️ Customization
- Sidebar, navigation, and page metadata: `utils/docsConfig.js`
- Styling and themes: `utils/styleConfig.js`
- Navigation buttons: `utils/navConfig.js`