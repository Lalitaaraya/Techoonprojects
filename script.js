const students = [];

const form = document.getElementById("signupForm");
const studentCountLabel = document.getElementById("studentCount");
const successMessage = document.getElementById("successMessage");

const courseSelect = document.getElementById("course");
const otherCourseInput = document.getElementById("otherCourse");

// Show/hide Other course input
courseSelect.addEventListener("change", function() {
    if (courseSelect.value === "Other") {
        otherCourseInput.style.display = "block";
    } else {
        otherCourseInput.style.display = "none";
        otherCourseInput.value = "";
    }
});

// Name & Course validation: letters and spaces only
function isValidName(name) {
    return /^[A-Za-z\s]+$/.test(name);
}

// Course validation: letters, spaces, dots, hyphens allowed
function isValidCourse(name) {
    return /^[A-Za-z\s\.\-]+$/.test(name);
}
// Clear all error highlights
function clearErrors() {
    document.querySelectorAll(".field").forEach(field => {
        field.classList.remove("error-field");
    });
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();
    successMessage.style.display = "none";

    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const dob = document.getElementById("dob").value;
    const phone = document.getElementById("phone").value.trim();
    let course = courseSelect.value;
    const otherCourse = otherCourseInput.value.trim();

    // Handle Other course
    if (course === "Other") {
        course = otherCourse;
    }

    // Validation
    let isValid = true;
    let firstInvalidField = null;

    // Required fields
    const requiredFields = [
        { value: firstName, id: "firstName", type: "name" },
        { value: lastName, id: "lastName", type: "name" },
        { value: dob, id: "dob" },
        { value: phone, id: "phone", type: "phone" },
        { value: course, id: "course", type: "course" }
    ];

    requiredFields.forEach(field => {
        const input = document.getElementById(field.id) || otherCourseInput;
        const wrapper = input.parentElement;

        if (!field.value) {
            wrapper.classList.add("error-field");
            isValid = false;
            firstInvalidField ??= input;
        }

        // Name validation
        if (field.type === "name" && field.value && !isValidName(field.value)) {
            wrapper.classList.add("error-field");
            alert(`Field "${input.previousElementSibling.textContent}" should contain only letters.`);
            isValid = false;
            firstInvalidField ??= input;
        }

        // Phone validation
        if (field.type === "phone" && !/^\d{10}$/.test(field.value)) {
            wrapper.classList.add("error-field");
            alert(`Phone number must contain exactly 10 digits.`);
            isValid = false;
            firstInvalidField ??= input;
        }

        // Course validation (letters, spaces, dots, hyphens)
        if (field.type === "course" && field.value && !isValidCourse(field.value)) {
          wrapper.classList.add("error-field");
          alert("Desired Course should only contain letters, spaces, dots or hyphens.");
          isValid = false;
          firstInvalidField ??= input;
}

    });

    if (!isValid) {
        firstInvalidField.focus();
        return;
    }

    const student = {
        firstName,
        middleName,
        lastName,
        dateOfBirth: dob,
        phoneNumber: phone,
        desiredCourse: course
    };

    students.push(student);

    studentCountLabel.textContent = students.length;
    successMessage.style.display = "block";
    form.reset();
    otherCourseInput.style.display = "none";

    console.log("Registered Students:", students);
});
