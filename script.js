// Replace YOUR_API_KEY and YOUR_CANVAS_URL
const api_key = 'YOUR_API_KEY';
const canvas_url = 'YOUR_CANVAS_URL';

const headers = {
  'Authorization': `Bearer ${api_key}`
};

async function get_all_courses() {
    const response = await fetch(`${canvas_url}/api/v1/courses?enrollment_type=teacher`, {headers: headers});
    if (response.ok) {
        return await response.json();
    } else {
        console.error('Failed to get courses:', response.status, await response.text());
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

    // Populate the courseSelect element with courses
    const courseSelect = document.getElementById("courseSelect");
    courses.forEach((course) => {
        const option = document.createElement('option');
        option.text = `${course['name']} (ID: ${course['id']})`;
        option.value = course['id'];
        courseSelect.add(option);
    });

    const submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", async function() {
        // Get all the form values
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
