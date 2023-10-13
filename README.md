# Canvas-Multi-Upload - https://colab.research.google.com/drive/1HlIhtGWA6b4McfxaIapNZzkB4nhP8u2P#scrollTo=ML4qVxEquVaF

# Canvas Automation Script README

## How to Use

This Python script allows you to automate the process of creating assignments and announcements in multiple courses on Canvas.

### Prerequisites

- Python installed on your system.
- requests Python package. Install it using pip if you haven't:
  pip install requests

### Steps to Follow

1. Replace YOUR_API_KEY and YOUR_CANVAS_URL in the script with your actual Canvas API key and Canvas URL.
   api_key = 'your_actual_api_key_here'
   canvas_url = 'https://your.canvas.url.here'
   If you are from nueva, no need to change canvas url
   You can get the api key, by going to settings from your profile, scrolling down, and making a new API KEY. MAKE SURE to save your API key elsewhere

3. Run the script:
   Go to the top and click on runtime, and hit 'run all'

4. You'll see a list of available courses. Enter the numbers corresponding to the courses where you want to create the assignment or announcement, separated by commas.

5. Choose whether to create an assignment or an announcement by entering 'a' or 'n'.

6. For assignments, you'll be prompted to enter details like assignment name, description, total points, and due date.

7. For announcements, you'll be prompted to enter details like title, message, whether you'd like to delay the posting, etc.

8. The script will confirm the successful creation of assignments or announcements or show an error message if something goes wrong.



## How to Extend or Add Features

The script is modular, making it easy to extend or add features.

### Adding a New Feature

1. Create a new function similar to create_assignment_in_course or create_announcement_in_course.

   def my_new_feature(course_id, info):
       # Your code here

2. In the main part of the script, add a new choice for your feature:

   choice = input("Would you like to create an assignment, an announcement, or use my new feature? (Enter 'a' for assignment, 'n' for announcement, 'm' for my new feature): ")

3. Extend the if-elif-else block to include your new feature:

   elif choice.lower() == 'm':
       # Your code to get user input for your feature
       # Call your function here

### Modifying Existing Features

- To modify how assignments or announcements are created, update the create_assignment_in_course or create_announcement_in_course functions.

- You can also modify how courses are fetched by updating the get_all_courses function.

Feel free to experiment and add new functionalities as you see fit!

Thanks,
  Govind Ramanan
