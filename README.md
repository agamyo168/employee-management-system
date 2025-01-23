# Employement Management System

This a project for Employement Management System (EMS) built with Node.js, Express, TypeScript, PostgreSQL, and Docker. This system provides RESTful API endpoints to manage employee data efficiently.

## Technologies

- **Node.js & Express**: Back-end server and API routing.
- **TypeScript**: Static typing for enhanced code quality.
- **PostgreSQL**: Relational database for storing employee data.
- **Docker & Docker Compose**: Containerization and service orchestration.
- **Sequelize & Sequelize cli**: ORM for SQL and database migrations.
- **Jest**: Integration and Unit tests.
- **JWT**: Authentication and Authorization
- **JOI**: Input validation

## Installation

To get started, follow these steps:

1. Install Node.js and npm if you haven't already.
2. Clone this repository:

```bash
git clone https://github.com/agamyo168/employement-management-system.git
```

3. Change into the project directory then install dependencies:

```bash
cd employement-management-system
npm install
```

4. Create `.env` file use the `.env.example`

5. Start development server:

```bash
npm run dev
```

6. access API Documentation at `http://localhost:${PORT}/api/docs`

## Docker

1. Clone this repository:

```bash
git clone https://github.com/agamyo168/employement-management-system.git
```

2. Create a `.env` for Docker where `DB_HOST` is `ems_db`.

3. Run this command:

```bash
sudo npm run docker
```
