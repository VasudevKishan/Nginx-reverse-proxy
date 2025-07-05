# Nginx Reverse Proxy with Docker and Docker Compose

This project demonstrates how to set up an Nginx reverse proxy using Docker and Docker Compose. It integrates with an existing project called **bookmark** ([link to Bookmark repository](https://github.com/VasudevKishan/Bookmark)) and provides a comprehensive guide to configuring Nginx, Docker, and Docker Compose.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Docker and Docker Compose](#docker-and-docker-compose)
- [Nginx Reverse Proxy](#nginx-reverse-proxy)
- [Nginx Configuration: Commands, Directives, and Options](#nginx-configuration-commands-directives-and-options)
- [Usage](#usage)
- [References](#references)

---

## Project Overview

This project sets up an Nginx reverse proxy in front of your **Bookmark** application. The reverse proxy handles incoming HTTP requests and forwards them to the appropriate backend service (the bookmark app), enabling features like SSL termination, load balancing, and centralized routing.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Basic knowledge of Nginx and containerization

---

## Project Structure

```

bookmark/                # Cloned Bookmark app directory (all files reside here)
├── Dockerfile           # Dockerfile for the Bookmark app
├── docker-compose.yml   # Docker Compose configuration
├── nginx/
│   ├── nginx.conf       # Nginx configuration file
│   └── Dockerfile       # Dockerfile for Nginx reverse proxy
└── README.md            # Project documentation
```

- `docker-compose.yml`: Defines services (Nginx, bookmark app) and their configuration.
- `nginx/nginx.conf`: Nginx configuration file.
- `README.md`: Project documentation.

---

## Docker and Docker Compose

### Docker

Docker is a platform for developing, shipping, and running applications in containers. Containers package software and its dependencies, ensuring consistency across environments.

**Common Docker Commands:**

- `docker build -t <image-name> .` — Build an image from a Dockerfile.
- `docker run -d -p 80:80 <image-name>` — Run a container in detached mode.
- `docker ps` — List running containers.
- `docker stop <container-id>` — Stop a running container.

### Common Dockerfile Directives

- `FROM`: Specifies the base image.
- `COPY`: Copies files/directories into the image.
- `ADD`: Similar to `COPY` but supports remote URLs and unpacking archives.
- `RUN`: Executes commands in a new layer.
- `CMD`: Sets default command and arguments for the container.
- `ENTRYPOINT`: Configures a container to run as an executable.
- `EXPOSE`: Documents the port(s) the container listens on.
- `ENV`: Sets environment variables.
- `WORKDIR`: Sets the working directory for instructions that follow.
- `VOLUME`: Creates a mount point for external storage.
- `USER`: Sets the user to run subsequent commands.

**Example Dockerfile:**

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8000
CMD ["node", "server.js"]
```

### Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file.

**Common Docker Compose Commands:**

- `docker-compose up -d` — Start all services in detached mode.
- `docker-compose down` — Stop and remove containers, networks, and volumes.
- `docker-compose logs` — View output from services.
- `docker-compose start` — Start existing stopped services defined in `docker-compose.yml`.
- `docker-compose stop` — Stop running services without removing containers.

### Common `docker-compose.yml` Directives

- `version`: Specifies the Compose file format version.
- `services`: Defines the containers to be run.
- `build`: Configuration options for building images.
- `context`: Sets the build context directory for the Docker build process.
- `image`: Name of the image to use or build.
- `container_name`: Assigns a custom name to the container.
- `ports`: Maps host ports to container ports.
- `volumes`: Mounts host paths or named volumes.
- `environment`: Sets environment variables.
- `depends_on`: Specifies service dependencies.
- `networks`: Configures custom networks for services.
- `restart`: Sets the restart policy for containers.
- `command`: Overrides the default command.

**Example `docker-compose.yml`:**

```yaml
version: '3.8'
services:
  bookmark:
    build: ./bookmark
    container_name: bookmark-app
    ports:
      - '8000:8000'
    networks:
      - backend
  nginx:
    build: ./nginx
    container_name: nginx-proxy
    ports:
      - '8080:80'
    depends_on:
      - bookmark
    networks:
      - backend
networks:
  backend:
```

---

## Nginx Reverse Proxy

Nginx is a high-performance web server and reverse proxy. In this setup, Nginx listens for incoming requests and forwards them to the **Bookmark** backend service (`server.js` file in Bookmark repository).

**Benefits:**

- Centralized routing
- SSL termination
- Load balancing
- Security and access control

---

## Nginx Configuration: Commands, Directives, and Options

### Key Directives

- `worker_processes`: Number of worker processes.
- `events`: Connection processing configuration.
- `http`: Main HTTP configuration block.
- `server`: Defines a virtual server.
- `listen`: Port and protocol to listen on.
- `server_name`: Domain names for the server.
- `location`: URI matching and routing.
- `proxy_pass`: Forwards requests to backend services.
- `proxy_set_header`: Sets headers for proxied requests.

### Example `nginx.conf`

```nginx
worker_processes 1;

events { worker_connections 1024; }

http {
  server {
    listen 80;
    server_name localhost;

    location / {
      proxy_pass http://bookmark:8000;
      proxy_set_header Host $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
}
```

---

## Usage

1. **Clone the repository:**

   ```sh
   git clone <this-repo-url>
   cd Nginx-reverse-proxy
   ```

2. **Start the services:**
   You can either start the services with `up` (which builds images if needed) or use `start` if the containers have already been created:

- To build and start everything:

  ```sh
  docker-compose -f bookmark-compose.yaml up -d
  ```

- To start previously created (stopped) containers:
  ```sh
  docker-compose start
  ```

3. **Access the application:**
   - Open [http://localhost:8080](http://localhost:8080) in your browser.

---

## References

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Reverse Proxy Concepts](https://www.nginx.com/resources/glossary/reverse-proxy-server/)

---

**Feel free to customize the configuration and extend the setup as needed for your use case.**
