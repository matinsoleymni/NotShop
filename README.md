# notShop

This is a React project built with React Router.

## Project Structure

The project follows a standard structure with `app/` containing the source code, `public/` for static assets, and configuration files at the root.

- `app/`: Contains the main application code, including components, contexts, pages, routes, services, stores, and utilities.
- `public/`: Contains static assets like `favicon.ico`, `tonconnect-manifest.json`, and images.
- `Dockerfile`: Defines the Docker image for the application.
- `package.json`: Lists project dependencies and scripts.

## Setup

To set up the project, clone the repository and install the dependencies:

```bash
git clone <repository_url>
cd notShop
npm install
```

## Available Scripts

In the project directory, you can run:

- `npm run build`: Builds the project for production.
- `npm run dev`: Runs the app in development mode.
- `npm run start`: Starts the production server after building.
- `npm run typecheck`: Checks TypeScript types.

## Deployment

The project can be deployed using the provided `Dockerfile`. This Dockerfile sets up a multi-stage build to create a production-ready image.

To build the Docker image:

```bash
docker build -t notshop .
```

To run the Docker container:

```bash
docker run -p 3000:3000 notshop
```

This will start the application, accessible at `http://localhost:3000`.

For deployment with a domain and SSL, you would typically use a cloud provider (like AWS, Google Cloud, Azure) or a platform (like Vercel, Netlify, Heroku) that supports Docker deployments and provides domain and SSL management. You would need to configure your domain's DNS records to point to your deployed application and set up SSL certificates through the provider's tools.
