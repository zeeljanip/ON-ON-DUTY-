document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('container');
    const noRequestsMessage = document.getElementById('noRequestsMessage');
    const filterButton = document.getElementById('filterButton');
    const logoutButton = document.getElementById('logoutButton');

    function getSelectedOptions(selectElement) {
        return Array.from(selectElement.options)
            .filter(option => option.selected)
            .map(option => option.value);
    }
    function applyFilter() {
        const departmentSelect = document.getElementById('departmentSelect');
        const classSelect = document.getElementById('classSelect');
        const yearSelect = document.getElementById('yearSelect');

        const selectedDepartments = getSelectedOptions(departmentSelect);
        const selectedClasses = getSelectedOptions(classSelect);
        const selectedYears = getSelectedOptions(yearSelect);

        const submittedEnrollments = JSON.parse(localStorage.getItem('submittedEnrollments')) || [];

        if (submittedEnrollments.length > 0) {
            const filteredEnrollments = submittedEnrollments.filter(data => {
                return (
                    (selectedDepartments.length === 0 || selectedDepartments.includes(data.department)) &&
                    (selectedClasses.length === 0 || selectedClasses.includes(data.className)) &&
                    (selectedYears.length === 0 || selectedYears.includes(data.year))
                );
            });

            container.innerHTML = ''; // Clear previous cards

            if (filteredEnrollments.length > 0) {
                filteredEnrollments.forEach(data => {
                    const card = createCard(data);
                    if (card) {
                        container.appendChild(card);
                    }
                });

                // Hide the "No OD Request" message if cards are available
                noRequestsMessage.style.display = 'none';
            } else {
                // Show the "No OD Request" message if no matching cards are found
                noRequestsMessage.style.display = 'block';
            }
        } else {
            // Show the "No OD Request" message if no cards are available
            noRequestsMessage.style.display = 'block';
        }
    }
    function getDepartmentName(departmentCode) {
        switch (departmentCode) {
            case 'dept1':
                return 'UID';
            case 'dept2':
                return 'UIT';
            case 'dept3':
                return 'UWSL';
            default:
                return 'Unknown Department';
        }
    }

    function getClassName(classCode) {
        switch (classCode) {
            case 'class1':
                return 'UIT - B.tech or CSE';
            case 'class2':
                return 'UID - Departments of fine Arts';
            case 'class3':
                return 'UID - Departments of Fashion';
            case 'class4':
                return 'UWSL - BA';
            case 'class5':
                return 'UWSL - LLB';
            default:
                return 'Unknown Class';
        }
    }

    function getYearName(yearCode) {
        switch (yearCode) {
            case 'year1':
                return 'Year 1';
            case 'year2':
                return 'Year 2';
            case 'year3':
                return 'Year 3';
            case 'year4':
                return 'Year 4';
            default:
                return 'Unknown Year';
        }
    }

    function createCard(data) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = data.enrollmentNumber;
        card.dataset.department = data.department;
        card.dataset.class = data.className;
        card.dataset.year = data.year;
        card.innerHTML = `
            <h2>Submitted Information:</h2>
            <p><strong>Enrollment Number:</strong> ${data.enrollmentNumber}</p>
            <p><strong>Student Name:</strong> ${data.studentName}</p>
            <p><strong>Department:</strong> ${getDepartmentName(data.department)}</p>
            <p><strong>Class:</strong> ${getClassName(data.class)}</p>
            <p><strong>Year:</strong> ${getYearName(data.year)}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
            <p class="approval-status"><strong>Approval Status:</strong> ${data.approvalStatus}</p>
        `;

        const approvalOptions = document.createElement('div');
        approvalOptions.classList.add('approval-options');
        approvalOptions.innerHTML = `
            <button class="button allow-button">Allow</button>
            <button class="button deny-button">Deny</button>
        `;
        card.appendChild(approvalOptions);

        const allowButton = card.querySelector('.allow-button');
        const denyButton = card.querySelector('.deny-button');

        allowButton.addEventListener('click', (event) => {
            event.preventDefault();
            data.approvalStatus = 'Allowed by Admin';
            updateCard(card, data);
        });

        denyButton.addEventListener('click', (event) => {
            event.preventDefault();
            data.approvalStatus = 'Denied by Admin';
            updateCard(card, data);
        });

        return card;
    }

    function updateCard(card, data) {
        const approvalStatusElement = card.querySelector('.approval-status');
        if (data.approvalStatus === 'Allowed by Admin') {
            // Update approval status text to 'Allowed' and change color to green
            approvalStatusElement.innerHTML = `<strong>Approval Status:</strong> Allowed by Admin`;
            approvalStatusElement.style.color = 'green';
        } else if (data.approvalStatus === 'Denied by Admin') {
            // Update approval status text to 'Denied' and change color to red
            approvalStatusElement.innerHTML = `<strong>Approval Status:</strong> Denied by Admin`;
            approvalStatusElement.style.color = 'red';
        }

        // Save the updated data to local storage
        saveCardData(data);
    }

    function saveCardData(data) {
        let savedData = JSON.parse(localStorage.getItem('submittedEnrollments')) || [];
        const existingCardIndex = savedData.findIndex(card => card.enrollmentNumber === data.enrollmentNumber);
        if (existingCardIndex !== -1) {
            savedData[existingCardIndex] = data;
        } else {
            savedData.push(data);
        }
        localStorage.setItem('submittedEnrollments', JSON.stringify(savedData));
    }


    function loadCardData() {
        const submittedEnrollments = JSON.parse(localStorage.getItem('submittedEnrollments'));

        if (submittedEnrollments && submittedEnrollments.length > 0) {
            container.innerHTML = ''; // Clear previous cards

            submittedEnrollments.forEach(data => {
                const card = createCard(data);
                if (card) {
                    container.appendChild(card);
                }
            });

            // Hide the "No OD Request" message if cards are available
            noRequestsMessage.style.display = 'none';
        } else {
            // Show the "No OD Request" message if no cards are available
            noRequestsMessage.style.display = 'block';
        }
    }

    loadCardData();

    filterButton.addEventListener('click', applyFilter);

    function handleLogout() {
        const container = document.getElementById('container');
        container.innerHTML = '';

        localStorage.removeItem('userData');
        localStorage.removeItem('submittedEnrollments');

        window.location.href = 'HOMEPAGE.html';
    }

    logoutButton.addEventListener('click', handleLogout);
});
