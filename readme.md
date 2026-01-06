# Techoon Student Signup Form

This project contains a responsive student signup form built with HTML, CSS, and JavaScript.

## Features

- Collects student details: First Name, Middle Name (optional), Last Name, Date of Birth, Phone Number, and Desired Course.
- Course selection via dropdown with an "Other" option to add a custom course.
- Validates inputs strictly:
  - Names allow letters and spaces only.
  - Phone number must be exactly 10 digits.
  - Course name validation supports letters, spaces, dots, and hyphens.
- Displays total number of registered students.
- Highlights missing or invalid fields with red outlines.
- Shows success message upon successful registration.
- Responsive design for mobile and desktop screens.

## Files

- `form.html` — Main HTML file containing the form structure.
- `style.css` — CSS styling for layout and appearance.
- `script.js` — JavaScript handling validation and form submission.

## How to run

1. Open `form.html` in a web browser.
2. Fill in the form and submit.
3. Registered students are stored temporarily in the browser session.

## Notes

- The project currently stores data in a JavaScript array (client-side only).
- No backend or database integration.
- Ideal for learning form validation and DOM manipulation.

---

*Created by [Your Name or Team Name]*  
*Date: 2026-01-06*
