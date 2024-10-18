This project is a backend system built using Node.js, Express, and MongoDB for managing courses, user enrollment, and tracking user progress in lessons. The system follows the MVC (Model-View-Controller) structure, and provides:

Admin CRUD operations for courses and lessons.
User enrollment in courses.
Lesson completion tracking for each enrolled user.
JWT-based authentication with role-based access control for admin and regular users.


Features
Authentication: User registration and login with password hashing and JWT authentication.
Authorization: Role-based access control to restrict course and lesson management to admins.
Course Management: Admins can create, update, and delete courses.
Lesson Management: Admins can create and manage lessons within a course.
User Enrollment: Users can enroll in courses.
Lesson Completion: Users can track their progress by marking lessons as completed.
Progress Tracking: The system tracks the percentage of course completion for each user based on completed lessons.


