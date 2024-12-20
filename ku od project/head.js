document.addEventListener('DOMContentLoaded', function () {
    const enrollmentForm = document.getElementById('enrollmentForm');
    const submittedCards = document.getElementById('submittedCards');
    const sendButton = document.querySelector('.send-button');
    const logoutButton = document.getElementById('logoutButton');
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    let submittedEnrollments = JSON.parse(localStorage.getItem('submittedEnrollments')) || [];

    // Mappings for department, class, and year
    const departmentMap = {
        dept1: 'UID',
        dept2: 'UIT',
        dept3: 'UWSL'
    };

    const classMap = {
        class1: 'UIT - B.tech or CSE',
        class2: 'UID - Departments of fine Arts',
        class3: 'UID - Departments of Fashion',
        class4: 'UWSL - BA',
        class5: 'UWSL - LLB'
    };

    const yearMap = {
        year1: 'Year 1',
        year2: 'Year 2',
        year3: 'Year 3',
        year4: 'Year 4'
    };

    function createCard(data) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
    <h2>Submitted Information:</h2>
    <p><strong>Enrollment Number:</strong> ${data.enrollmentNumber}</p>
    <p><strong>Student Name:</strong> ${data.studentName}</p>
    <p><strong>Department:</strong> ${departmentMap[data.department]}</p>
    <p><strong>Class:</strong> ${classMap[data.class]}</p>
    <p><strong>Year:</strong> ${yearMap[data.year]}</p>
    <p><strong>Date:</strong> ${data.date}</p>
    <p><strong>Time:</strong> ${data.time}</p>
`;
        return card;
    }

    function submitEnrollment(event) {
        event.preventDefault();

        const formData = new FormData(enrollmentForm);
        const submittedData = {};
        for (const [key, value] of formData.entries()) {
            submittedData[key] = value;
        }
        const dateInput = document.getElementById('dateInput').value;
        const timeInput = document.getElementById('timeInput').value;
        submittedData.date = dateInput;
        submittedData.time = timeInput;

        submittedEnrollments.push(submittedData);
        localStorage.setItem('submittedEnrollments', JSON.stringify(submittedEnrollments));

        const card = createCard(submittedData);
        submittedCards.appendChild(card);
        enrollmentForm.reset();
    }

    function sendToAdminPage() {
        const adminPageURL = 'welcome_admin.html'; // Replace with actual admin page URL
        localStorage.setItem('dataToSend', JSON.stringify(submittedEnrollments));
        window.location.href = adminPageURL;
    }

    function logout() {
        localStorage.removeItem('submittedEnrollments');
        window.location.href = 'HOMEPAGE.html'; // Replace with actual login page URL
    }

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    enrollmentForm.addEventListener('submit', submitEnrollment);
    sendButton.addEventListener('click', sendToAdminPage);
    logoutButton.addEventListener('click', logout);
});
