# Canvas-Multi-Upload - https://colab.research.google.com/drive/1alz0smywrpYTjlwgxlVqLMACF8I_XQk4#scrollTo=ML4qVxEquVaF

# Canvas Automation Script README

Website Version

This allows you to automate the creating of assignments

To edit, download the code, and now play around with! All of the user's needs are taken care of, but some things I would like to add are; changed time, more orderly descriptions 

One more thing, I have made it very easy to implement changes through the HTML, PLEASE USE IT :). 
   - Go CLose to the bottom
   - In the list of parameters, go to the bottom
   - Make your own paramaters

Colab Version
## How to Use

This Python script allows you to automate the process of creating assignments and announcements in multiple courses on Canvas.

### Prerequisites

- Teacher Canvas Account
  

### Steps to Follow
- Make a copy of the colab
- CLICK FILE, THEN CLICK SAVE COPY IN DRIVE
- Then follow steps

1. Replace YOUR_API_KEY. in the script with your actual Canvas API key.
  - Get your api key by going to settings from your profile. Then scroll down and generate an API Key. There is a big slot that says REPLACE, so enter your API key. SAVE YOUR KEY ELSEWHERE.



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
My Personal Next Steps
- Get Github Pages to Work
- If your client wants it, add an auto module system
- Place to save the api key(web model)
- Add a way to  change upload time

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
