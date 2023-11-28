document.addEventListener('DOMContentLoaded', function() {
    // Event listener for API key submission
    document.getElementById('apiKeyForm').addEventListener('submit', function(event){
        event.preventDefault();
        const apiKey = document.getElementById('apiKey').value;
        fetchCourses(apiKey);
    });
});

function fetchCourses(apiKey) {
    const canvasApiUrl = 'https://canvas.instructure.com';
    fetch(canvasApiUrl, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(courses => {
        populateCoursesDropdown(courses);
    })
    .catch(error => {
        console.error('Error fetching courses:', error);
    });
}

function populateCoursesDropdown(courses) {
    const coursesSelect = document.getElementById('courses');
    coursesSelect.innerHTML = ''; // Clear existing options
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.name;
        coursesSelect.appendChild(option);
    });
}

document.getElementById('assignmentForm').addEventListener('submit', function(event){
    event.preventDefault();

    const apiKey = document.getElementById('apiKey').value;
    const selectedCourseId = document.getElementById('courses').value;
    const assignmentName = document.getElementById('assignmentName').value;
    const dueDate = document.getElementById('dueDate').value;

    createAssignment(apiKey, selectedCourseId, assignmentName, dueDate);
});

function createAssignment(apiKey, courseId, name, dueDate) {
    const canvasApiUrl = `https://canvas.instructure.com/api/v1/courses/${courseId}/assignments`;
    
    fetch(canvasApiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            assignment: {
                name: name,
                due_at: dueDate
            }
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Assignment created:', data);
        alert('Assignment created successfully!');
    })
    .catch(error => {
        console.error('Error creating assignment:', error);
        alert('Error creating assignment. See console for details.');
    });
}
