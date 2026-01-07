# Student Signup Form

This is a **web-based student registration form** built using **HTML, CSS, and JavaScript**. It allows users to register students with validation for required fields, proper formatting, and dynamic input handling.

---

## **Project Structure**

```
project/
│
├── form.html          # Main HTML page with the registration form
├── style.css          # CSS for styling the form and layout
├── script.js          # JavaScript for form handling and validation
└── image/             # Folder containing background images
```

---

## **HTML (`form.html`)**

The HTML file contains:

1. **Two main sections**:

   * **Image Section**: A visually appealing side background.
   * **Form Section**: Contains the student signup form.

2. **Form Fields**:

   * First Name (required)
   * Middle Name (optional)
   * Last Name (required)
   * Date of Birth (required)
   * Phone Number (required, 10 digits)
   * Desired Course (required, includes a dropdown with “Other” option)

3. **Dynamic Input**:

   * If the user selects **Other** in the course dropdown, a new input field appears for custom course entry.

4. **Success Message**:

   * Displays once a student is successfully registered.

---

## **CSS (`style.css`)**

The CSS handles:

1. **Layout**:

   * Split page layout with `flex` for image and form sections.
   * Fully responsive with media queries for smaller screens.

2. **Form Styling**:

   * Transparent form box with blur effect.
   * Rounded inputs and gradient buttons.
   * Error styling for invalid fields.

3. **Responsive Design**:

   * Switches to vertical layout on smaller screens.
   * Adjusts the height of image section and container.

4. **Error Handling**:

   * Highlights invalid fields in red using `.error-field` or `.error` class.

---

## **JavaScript (`script.js`)**

The JS file handles **all form logic**:

### **1. Variables & DOM Elements**

```javascript
const students = [];
const form = document.getElementById("signupForm");
const studentCountLabel = document.getElementById("studentCount");
const successMessage = document.getElementById("successMessage");
const courseSelect = document.getElementById("course");
const otherCourseInput = document.getElementById("otherCourse");
```

* `students`: Stores registered student objects.
* DOM references for form, student count, success message, and inputs.

---

### **2. Dynamic Course Input**

```javascript
courseSelect.addEventListener("change", function() {
    if (courseSelect.value === "Other") {
        otherCourseInput.style.display = "block";
    } else {
        otherCourseInput.style.display = "none";
        otherCourseInput.value = "";
    }
});
```

* Shows the “Other” input field if the user selects `Other`.
* Hides and clears the input when another course is selected.

---

### **3. Validation Functions**

```javascript
// Name: letters and spaces only
function isValidName(name) {
    return /^[A-Za-z\s]+$/.test(name);
}

// Course: letters, spaces, dots, hyphens allowed
function isValidCourse(name) {
    return /^[A-Za-z\s\.\-]+$/.test(name);
}

// Clear error highlights
function clearErrors() {
    document.querySelectorAll(".field").forEach(field => {
        field.classList.remove("error-field");
    });
}
```

* `isValidName` ensures only letters and spaces.
* `isValidCourse` allows letters, spaces, dots, and hyphens.
* `clearErrors` resets field highlighting before new validation.

---

### **4. Form Submission**

```javascript
form.addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent page refresh
    clearErrors();
    successMessage.style.display = "none";

    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value.trim();
    let course = courseSelect.value;
    const otherCourse = otherCourseInput.value.trim();

    if (course === "Other") {
        course = otherCourse;
    }

    // REQUIRED FIELD CHECK
    let isValid = true;
    let firstInvalidField = null;
    const requiredFields = [
        { value: firstName, id: "firstName" },
        { value: lastName, id: "lastName" },
        { value: dob, id: "dob" },
        { value: phone, id: "phone" },
        { value: course, id: "course" }
    ];

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id) || otherCourseInput;
        const wrapper = input.parentElement;

        if (!field.value) {
            wrapper.classList.add("error-field");
            isValid = false;
            firstInvalidField ??= input;
        }
    });

    if (!isValid) {
        alert("Please fill all required fields");
        firstInvalidField.focus();
        return;
    }

    // FORMAT VALIDATION
    if (!isValidName(firstName)) { ... }
    if (!isValidName(lastName)) { ... }
    if (!/^\d{10}$/.test(phone)) { ... }
    if (!isValidCourse(course)) { ... }

    // SUCCESS: Save student
    const student = { firstName, middleName, lastName, dateOfBirth: dob, phoneNumber: phone, desiredCourse: course };
    students.push(student);
    studentCountLabel.textContent = students.length;
    successMessage.style.display = "block";
    form.reset();
    otherCourseInput.style.display = "none";
});
```

**Key Steps**:

1. **Prevent Default Form Submission**

   * Avoid page refresh.

2. **Clear Previous Errors**

   * Removes all `.error-field` highlights.

3. **Required Field Check**

   * Ensures mandatory fields are filled.
   * Highlights first invalid field.

4. **Format Validation**

   * Names must be letters & spaces.
   * Phone number must be exactly 10 digits.
   * Course must follow allowed characters.

5. **Success**

   * Adds student object to `students` array.
   * Updates registered student count.
   * Shows success message.
   * Resets form and hides “Other” course input.

---

## **Features**

* ✅ Dynamic input for “Other” courses.
* ✅ Real-time validation for required fields and formatting.
* ✅ Highlights invalid inputs with red borders.
* ✅ Responsive design for all screen sizes.
* ✅ Tracks total registered students dynamically.

---

## **Usage**

1. Open `form.html` in any browser.
2. Fill in the required fields.
3. Select a course or type a custom one using “Other”.
4. Click **Register**.
5. Check the success message and updated student count.

---

This project is a **perfect example of a client-side validated registration form** with a modern responsive design and dynamic input handling.

