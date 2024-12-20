document.addEventListener("DOMContentLoaded", function () {
    const noRequestsMessage = document.getElementById("noRequestsMessage");
    const hodContainer = document.getElementById("hodContainer");

    // Define mappings for department, class, and year
    const departmentMap = {
        dept1: "UID",
        dept2: "UIT",
        dept3: "UWSL"
        // Add more mappings as needed
    };

    const classMap = {
        class1: "UIT - B.tech or CSE",
        class2: "UID - Departments of fine Arts",
        class3: "UID - Departments of Fashion",
        class4: "UWSL - BA",
        class5: "UWSL - LLB"
        // Add more mappings as needed
    };

    const yearMap = {
        year1: "Year 1",
        year2: "Year 2",
        year3: "Year 3",
        year4: "Year 4"
        // Add more mappings as needed
    };

    // Function to create card HTML element
    function createCard(cardData) {
        const departmentName = departmentMap[cardData.department] || "Unknown Department";
        const className = classMap[cardData.class] || "Unknown Class"; // Use 'class' instead of 'className'
        const yearName = yearMap[cardData.year] || "Unknown Year";

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <h2>Submitted Information:</h2>
        <p><strong>Enrollment Number:</strong> ${cardData.enrollmentNumber}</p>
        <p><strong>Student Name:</strong> ${cardData.studentName}</p>
        <p><strong>Department:</strong> ${departmentName}</p>
        <p><strong>Class:</strong> ${className}</p>
        <p><strong>Year:</strong> ${yearName}</p>
        <p><strong>Date:</strong> ${cardData.date}</p>
        <p><strong>Time:</strong> ${cardData.time}</p>
        <p><strong>Approval Status:</strong> ${cardData.approvalStatus}</p>
    `;

        return card;
    }

    // Function to handle logout
    function logout() {
        // Remove submitted enrollments data from local storage
        localStorage.removeItem("submittedEnrollments");
        // Redirect to homepage
        window.location.href = "HOMEPAGE.html";
    }

    // Add event listener for logout button
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", logout);

    // Retrieve submitted enrollments data from local storage
    let submittedCards = [];
    try {
        submittedCards = JSON.parse(localStorage.getItem("submittedEnrollments")) || [];
    } catch (error) {
        console.error("Error parsing submitted enrollments:", error);
    }

    // Check if there are submitted cards
    if (submittedCards.length > 0) {
        // If there are submitted cards, create and display cards
        submittedCards.forEach(cardData => {
            const card = createCard(cardData);
            hodContainer.appendChild(card);
        });
        // Hide the "No requests" message
        noRequestsMessage.style.display = "none";
    } else {
        // If there are no submitted cards, display the "No requests" message
        noRequestsMessage.style.display = "block";
    }
});
