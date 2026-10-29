# Developer Portfolio & Resume Generator

A browser-based resume builder for creating a developer resume from a live form. The page has an editor on the left and a resume preview on the right. Personal details and skills update as they are entered, while education, work experience, and project entries can be added or removed. The finished preview can be exported as a PDF.

## Features

- Live preview for personal information, skills, and interests.
- Three selectable resume themes: Classic Serif, Modern Teal, and Minimal Dark.
- Add and remove education, work experience, and project entries.
- Display multiline descriptions as bullet points in the preview.
- Export the resume preview to PDF.
- Responsive layout: the editor and preview stack on screens 900px wide or narrower.

## Project Files

### `index.html` — Application structure

Defines the document structure and the two main areas of the application:

- **Editor panel:** theme selector and form sections for personal details, education, skills, work experience, projects, and interests.
- **Preview panel:** the resume layout, with elements identified by IDs so JavaScript can update them.

The page links `style.css`, loads `html2pdf.js` from a CDN for PDF export, and loads `app.js` at the end of the body.

**Main snippet — preview structure and script integration:**

```html
<div class="preview-card theme-classic" id="resumePreview">
  <header class="preview-header">
    <h1 id="previewName">First Last</h1>
    <div class="contact-info">
      <span id="previewEmail">name@email.com</span>
      <span class="sep">|</span>
      <span id="previewGithub">github.com/name</span>
    </div>
  </header>

  <section class="preview-section">
    <h2>Education</h2>
    <div id="previewEducation" class="education-list">
      <!-- Dynamic education entries are inserted here -->
    </div>
  </section>
</div>

<script src="app.js"></script>
```

### `app.js` — Application behavior

Waits for the `DOMContentLoaded` event before looking up form and preview elements. It then:

1. Connects static form fields to their preview counterparts. Empty fields display fallback text.
2. Changes the preview theme when the theme selector changes.
3. Creates paired editor and preview entries for education, work experience, and projects. Each entry has input handlers to keep its preview current and a button to remove both parts.
4. Splits multiline descriptions into individual bullet points.
5. Uses `html2pdf.js` to export the preview card as a PDF. The output filename is based on the entered name, with `Resume` as the fallback.

**Main snippet — live text binding:**

```javascript
function bindInput(input, element, fallbackText) {
  input.addEventListener('input', () => {
    element.textContent = input.value.trim() || fallbackText;
  });
}

bindInput(inputName, previewName, 'First Last');
bindInput(inputEmail, previewEmail, 'name@email.com');
bindInput(inputGithub, previewGithub, 'github.com/name');
```

**Main snippet — dynamic theme switching:**

```javascript
themeSelect.addEventListener('change', (e) => {
  previewCard.className = `preview-card theme-${e.target.value}`;
});
```

**Main snippet — PDF export options:**

```javascript
const opt = {
  margin: 0.3,
  filename: `${name}_Resume.pdf`,
  image: { type: 'jpeg', quality: 1.0 },
  html2canvas: {
    scale: 3,
    useCORS: true,
    letterRendering: true,
    logging: false,
    scrollY: 0
  },
  jsPDF: {
    unit: 'in',
    format: [elementWidth, elementHeight],
    orientation: 'portrait',
    compress: true
  }
};

html2pdf().set(opt).from(element).save();
```

### `style.css` — Layout and visual design

Contains the global reset, typography, editor form styles, buttons, preview-card layout, resume entry styles, and theme-specific appearance. The editor occupies 45% of the desktop layout and the preview 55%. The preview card is styled separately for each theme.

**Main snippet — theme styles and responsive layout:**

```css
.preview-card.theme-modern h1 {
  color: #0d9488;
}

.preview-card.theme-dark {
  background: #0f172a;
  color: #f8fafc;
}

@media (max-width: 900px) {
  .app-container {
    flex-direction: column;
    height: auto;
    overflow: visible;
  }

  .editor-panel,
  .preview-panel {
    width: 100%;
  }
}
```

## How to Run

1. Keep `index.html`, `app.js`, and `style.css` in the same folder.
2. Open `index.html` in a modern web browser.
3. Enter resume details in the editor. Use the add buttons to create additional education, experience, or project entries.
4. Select a theme to change the preview's appearance.
5. Click **Download PDF** to export the resume.

The PDF export library is loaded from a CDN, so an internet connection is required to load that library.

## Technologies

- HTML5
- CSS3
- JavaScript and browser DOM APIs
- `html2pdf.js` via CDN

## Notes

- This is a front-end-only application; it does not include a backend or automatically save form data.
- The resume preview is built from the form values in the current browser session.
