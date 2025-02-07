# Developers Management System

This repository contains a complete **Levels Management System** consisting of a **/Next.js** frontend and a **NestJS** backend. The system allows you to manage levels and developers through a responsive user interface and a scalable REST API. The entire stack is designed with modern technologies, type safety, and containerized deployment readiness using **Docker**.

---

## Features

### Frontend

- **CRUD Operations**: Perform create, read, update, and delete operations for levels.
- **Responsive UI**: Built using **Material-UI** for an accessible and modern interface.
- **Client-Side Validation**: Implements validation using **Zod** for clean, error-resilient inputs.
- **State Management with React Query**: Handles data fetching, caching, and updating efficiently.
- **Environment Customization**: Adjust API endpoints via environment variables for seamless integration.

### Backend

- **REST API**: Endpoints for managing levels and developers with full CRUD capabilities.
- **Validation Pipes**: Built-in validation using **Class-Validator** and **Class-Transformer**.
- **Scalable Architecture**: Clean and modular design using **NestJS**.
- **CORS Support**: Fully configured to allow cross-origin requests from the frontend.
- **Global Error Handling**: Handles various error scenarios consistently.

### Full Stack Features

- **Dockerized Deployment**: Both frontend and backend include Docker support for easier setup in production.
- **Environment Configuration**: You can customize essential settings using `.env` files for both parts of the system.

---

## Project Structure

### Frontend

The **React/Next.js** application resides in the root directory with all components for the user interface.

Key files:
- **`page.tsx`**: Main logic for fetching, submitting, and rendering levels list and forms.
- **`Dockerfile`**: For containerizing the frontend application.

### Backend

The **NestJS** backend application resides in the `backend` folder with endpoints for levels and developers.

Key files:
- **`main.ts`**: Entry point of the backend server for configuration and initialization.
- **`.env-example`**: Example of required environment variables for backend configuration.
- **`Dockerfile`**: For containerizing the backend application.

---

## Prerequisites

To set up the project, you will need the following installed:

- **Node.js** (version 22 or higher)
- **pnpm** (preferred package manager)
- **Docker** (optional, for containerized environments)
- **PostgreSQL** (or another compatible database, for the backend)

---

## Environment Variables

### Frontend

Create a `.env` file in the root directory of the frontend project and configure the following variable:

- `NEXT_PUBLIC_API_BASE_URL`: URL of the backend API (e.g., `http://localhost:5000`).

### Backend

Create a `.env` file in the `backend` folder and configure the following variables:

- `DATABASE_URL`: Connection string for your PostgreSQL database (e.g., `postgresql://user:password@localhost:5432/dbname`).
- `PORT`: The port for the backend (default: `5000`).
- `CORS_ORIGIN`: Allowed origin for CORS requests (e.g., `http://localhost:3000`).

Refer to `.env-example` in the backend folder for more details.

---

## Installation and Setup

### Local Development

#### Backend
1. Navigate to the `backend` directory:
   ```sh
   cd backend
   ```

2. Install backend dependencies:
   ```sh
   pnpm install
   ```

3. Set up the `.env` file:
    - Create a `.env` file in the `backend` folder and add required variables.

4. Run the backend server:
   ```sh
   pnpm start:dev
   ```

5. The API will be available at:
   ```
   http://localhost:5000/api/v1
   ```

#### Frontend
1. Navigate back to the main directory or frontend root.

2. Install frontend dependencies:
   ```sh
   pnpm install
   ```

3. Set up the `.env` file:
    - Create a `.env` file and configure `NEXT_PUBLIC_API_BASE_URL` to point to the backend.

4. Run the development server:
   ```sh
   pnpm dev
   ```

5. Access the frontend at:
   ```
   http://localhost:3000
   ```

---

### Running with Docker Compose

This project is designed to run easily with Docker Compose, handling both the **frontend**, **backend**, and optional **database** services.

1. Ensure Docker and Docker Compose are installed on your system.

2. Create `.env` files for both the `frontend` and `backend` following the examples provided.

3. Run the application using Docker Compose:
   ```sh
   docker-compose up --build
   ```

4. Access the frontend at:
   ```
   http://localhost:3000
   ```

5. The backend can be accessed at:
   ```
   http://localhost:5000/api/v1
   ```

6. PostgreSQL (if included in Docker Compose) will also be running and connected to the backend.

To stop the services:
```sh
docker-compose down
```


---

## Usage

### Frontend

- **List Levels**: View a table of levels retrieved from the backend API.
- **Create Levels**: Use the modal to add a new level by filling out the form.
- **Update Levels**: Edit existing levels by selecting them and modifying in the modal.
- **Delete Levels**: Remove levels using the delete operation.

### Backend

Levels Management API:

- **GET /api/v1/niveis**: Retrieves all levels.
- **POST /api/v1/niveis**: Creates a new level.
- **PUT /api/v1/niveis/:id**: Updates an existing level.
- **DELETE /api/v1/niveis/:id**: Deletes an existing level.

Developers Management API (*optional enhancement*):

- **GET /api/v1/desenvolvedores**: Retrieves all developers.
- **POST /api/v1/desenvolvedores**: Creates a new developer.
- **PUT /api/v1/desenvolvedores/:id**: Updates an existing developer.
- **DELETE /api/v1/desenvolvedores/:id**: Deletes a developer.

---

## Technologies Used

### Frontend
- **React** & **Next.js**
- **TypeScript**
- **Material-UI**
- **React Query**
- **Zod**
- **Docker**

### Backend
- **NestJS**
- **TypeScript**
- **Class-Validator** & **Class-Transformer**
- **PostgreSQL** (or compatible database)
- **Docker**

---

## Contributing

Contributions are welcome and greatly appreciated. To contribute:

1. Fork the repository and create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```sh
   git commit -m "Add your feature or fix here"
   ```

3. Push your changes and open a pull request:
   ```sh
   git push origin feature/your-feature-name
   ```

4. Submit your pull request and describe your changes.

---

## License

This project is licensed under the MIT License.

---

## Issues

If you encounter any issues, feel free to [open an issue](https://github.com/your-repository-url/issues).

---

## Acknowledgements

- [React Query Documentation](https://tanstack.com/query/v4)
- [Material-UI Documentation](https://mui.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---
