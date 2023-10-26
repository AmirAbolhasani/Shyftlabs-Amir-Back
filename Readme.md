# Backend Project Documentation

This README provides an overview of the backend project assessment done by **Amir Abolhasani** for **Shyftlabs**, including its structure, setup instructions, technology stack, database design, and API documentation.

## Project Structure
-  `/src`: This directory contains the source code for the backend.
-  `/src/controller`: This directory contains folders for each entity handing the endpoint source code.
-  `/src/database`: This directory contains folders for database management.
-  `/src/database/attributes`: This directory contains attributes to create tables.
-  `/src/database/model`: This directory contains models of database tables.
-  `/src/database/table`: This directory contains tables which has source code for each entity.
-  `/src/middleware`: This directory contains files about middleware taking control of each request that comes to the backend.
-  `/src/route`: This directory contains files handling the routing of the project.

## Requirement
Please install the following before we get started.
1. Install NodeJS
2. Install TypeScript
4. Install MySQL
5. Create a MySQL database and provide the connection info

## Installation and Setup
  To set up and run this backend project locally, follow these steps:
1.  **Clone the repository:**
```bash
git clone <repository_url>
cd <repository_directory>
```

2. **Install dependencies:**
```bash
npm install		# to install dependencies
tsc 			# to build typescript files
```

3. **Environment Variables:**
	Create a .env file and configure environment variables. 
	
	There is a file in the route of the project named '.env.template' having the below content: 
	```yaml
	## server
	SERVER_PORT  =  4000  

	## database
	DATABASE_NAME  =  ""
	DATABASE_USER  =  ""
	DATABASE_PASS  =  ""
	DATABASE_HOST  =  ""
	DATABASE_PORT  =  ""
	```
	Copy the content into the .env file you created and init the values for database connection.

4. **Start The Application:**
	```bash
	node ./dist/index.js
	```

The backend server will be accessible at http://localhost:4000.

## Technology Stack
Node.js TypeScript
Express
MySQL
Sequelize
Swagger

## Database Design
We have 3 tables in this project
1. Course
	```
	id: number;
	name: string;
	```

1. Student
	```
	id: number;
	name: string;
	family: string;
	birth_date: Date;
	email: string;
	```

1. Result
	```
	id: number;
	student_id:  number;
	course_id: number;
	score : enum("A","B","C","D","E","F");
	```

## API Documentation
After you run the backend app, http://localhost:4000 gives you a full details of the API powered by **swagger**.
You can also find the list of them here.

### Course
- GET **/course/all**
Get all courses
- POST **/course**
Create a course
	-body: 
	```json
	{
		"name": "string"
	}
	```
- DELETE **/course/{id}**
Delete a course by ID

### Result
- GET **/result/all**
Get all results
- POST **/result**
Create a result
	-body: 
	```json
	{
	  "student_id": 0,
	  "course_id": 0,
	  "score": "A"
	}
	```

### Student
- GET **/student/all**
Get all students
- POST **/student**
Create a student
	-body: 
	```json
	{
		"name": "string",
		"family": "string",
		"birth_date": "2023-10-26",
		"email": "user@example.com"
	}
	```
- DELETE **/student/{id}**
Delete a student by ID