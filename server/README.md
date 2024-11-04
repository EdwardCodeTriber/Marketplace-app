# Recipe App API

This is a RESTful API for managing recipes built using Node.js, Express, and MongoDB.

## Features

- CRUD operations for recipes
- Pagination for listing recipes
- Input validation
- Error handling

## Requirements

- Node.js v12+
- MongoDB

## Installation
- npm install express dotenv mongoose nodemon bcrypt validator body-parser cors jsonwebtoken

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/recipe-app-api.git
   cd recipe-app-api

## Authorization (Role-Based Access Control - RBAC)
- The Recipe App uses Role-Based Access Control (RBAC) for authorization. Users are assigned roles (e.g., admin, user) to control access to specific functionalities.

## Roles and Permissions
- Admin:

- Create, edit, and delete recipes.
- Access to all admin-level actions.
# User:

- View and create recipes.
- Limited access to edit or delete their own recipes.
- Role-Based Access Checks
- On each request, the app checks the user’s role and permissions before allowing specific actions. Permissions are enforced at the endpoint level to ensure only users with sufficient privileges can perform certain operations.

## Usage
# Login:

- Login to receive a JWT or Session ID.
- Copy the token, under Authorization type select the bearer token type
- paste the token generated for the logged in user in order to use it to perform actions. eg. edit, post and edit.
# Access Control:

- Based on the assigned role, access to different functionalities (like creating or editing recipes) will be managed automatically.
# Logout:

- End the session or invalidate the JWT as required to log out securely.
## Example API Endpoints
- POST /api/auth/login: Authenticates a user and returns a token or session.
- GET /api/recipes: Retrieves recipes (accessible to all users).
- POST /api/recipes: Allows a user to create a recipe (RBAC-enforced).
- PUT /api/recipes/:id: Allows an admin or the recipe’s owner to edit a recipe.
- DELETE /api/recipes/:id: Allows only an admin to delete a recipe.
## Development
# Run the Development Server:

- bash
- Copy code
- npm run dev
## Testing:

- bash
- Copy code
- npm test
- Security Considerations
- JWT Security: Ensure tokens are stored securely (e.g., HTTP-only cookies or secure storage).
- Session Security: Use secure cookies for session IDs.
- Role Checks: Always enforce RBAC checks before performing critical actions.
