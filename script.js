const api_key = '6936~lmiEmoqxdwHzIgXxZgS1boDoCk4ZDJhchviPlzQeVlcKvtKacPSp8gIw5uT7sHpa';
const canvas_url = 'https://k12.instructure.com';
const headers = {
  'Authorization': `Bearer ${api_key}`
};

async function get_all_courses() {
    const response = await fetch(`${canvas_url}/api/v1/courses?enrollment_type=teacher`, {
        headers: headers
    });
    if (response.ok) {
        const courses = await response.json();
        console.log("Fetched courses: ", courses);  // Debug line
        return courses;
    } else {
        console.error("Failed to fetch courses:", await response.text());
        return [];
    }
}

async function create_assignment_in_course(course_id, assignment_info) {
    const response = await fetch(`${canvas_url}/api/v1/courses/${course_id}/assignments`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(assignment_info)
    });
    if (response.ok) {
        console.log(`Successfully created assignment in course ${course_id}`);
    } else {
        console.error(`Failed to create assignment in course ${course_id}:`, response.status, await response.text());
    }
}

document.addEventListener("DOMContentLoaded", async function() {
    const courses = await get_all_courses();

    // Debug line to ensure courses are fetched successfully
    console.log("Courses fetched and passed to DOMContentLoaded: ", courses);

    const courseSelect = document.getElementById("courseSelect");
    if(courseSelect) {  // Check if the dropdown exists
        courses.forEach((course) => {
            const option = document.createElement('option');
            option.text = `${course['name']} (ID: ${course['id']})`;
            option.value = course['id'];
            courseSelect.add(option);
        });
    } else {
        console.error("Dropdown with ID 'courseSelect' not found.");
    }
    
    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", async function() {
        const selectedCourseIds = Array.from(courseSelect.selectedOptions).map(option => Number(option.value));
        const assignmentName = document.getElementById("assignmentName").value;
        const assignmentDescription = document.getElementById("assignmentDescription").value;
        const dueDate = document.getElementById("dueDate").value;
        const gradingType = document.getElementById("gradingType").value;
        const pointsPossible = document.getElementById("pointsPossible").value;
        const submissionTypes = document.getElementById("submissionTypes").value;

        if (!selectedCourseIds.length) {
            console.log("No valid course numbers were selected.");
            return;
        }

        const assignment_info = {
            'assignment[name]': assignmentName,
            'assignment[description]': assignmentDescription,
            'assignment[points_possible]': pointsPossible,
            'assignment[grading_type]': gradingType,
            'assignment[due_at]': `${dueDate}T23:59:00Z`
        };

        if (submissionTypes === 'yes') {
            assignment_info['assignment[submission_types]'] = ['online_url'];
            assignment_info['assignment[allowed_extensions]'] = ['html'];
        } else {
            assignment_info['assignment[submission_types]'] = ['none'];
        }

        for (const course_id of selectedCourseIds) {
            await create_assignment_in_course(course_id, assignment_info);
        }
    });
});
