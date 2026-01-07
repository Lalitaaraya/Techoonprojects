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

    if (course === "Other") {
        course = otherCourse;
    }

    let isValid = true;
    let firstInvalidField = null;

    const requiredFields = [
        { value: firstName, id: "firstName" },
        { value: lastName, id: "lastName" },
        { value: dob, id: "dob" },
        { value: phone, id: "phone" },
        { value: course, id: "course" }
    ];

    // 🔹 STEP 1: REQUIRED FIELD CHECK ONLY
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

    // 🔹 STEP 2: FORMAT VALIDATION (RUNS ONLY IF REQUIRED PASSES)

    if (!isValidName(firstName)) {
        document.getElementById("firstName").parentElement.classList.add("error-field");
        alert("First Name should contain only letters.");
        document.getElementById("firstName").focus();
        return;
    }

    if (!isValidName(lastName)) {
        document.getElementById("lastName").parentElement.classList.add("error-field");
        alert("Last Name should contain only letters.");
        document.getElementById("lastName").focus();
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        document.getElementById("phone").parentElement.classList.add("error-field");
        alert("Phone number must contain exactly 10 digits.");
        document.getElementById("phone").focus();
        return;
    }

    if (!isValidCourse(course)) {
        courseSelect.parentElement.classList.add("error-field");
        alert("Desired Course should only contain letters, spaces, dots or hyphens.");
        courseSelect.focus();
        return;
    }

    // ✅ SUCCESS (UNCHANGED)
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
