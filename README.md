# Nginx Reverse Proxy with Docker and Docker Compose

This project demonstrates how to set up an Nginx reverse proxy using Docker and Docker Compose. It integrates with the [Bookmark app](https://github.com/VasudevKishan/Bookmark) and provides a guide to configuring Nginx, Docker, and Docker Compose.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [How it works in this setup](#how-it-works-in-this-setup)
- [Project Structure](#project-structure)
- [Docker and Docker Compose](#docker-and-docker-compose)
- [Nginx Reverse Proxy](#nginx-reverse-proxy)
- [Nginx Configuration: Commands, Directives, and Options](#nginx-configuration-commands-directives-and-options)
- [Usage](#usage)
- [References](#references)

---

## Project Overview

This project sets up an Nginx reverse proxy in front of your **Bookmark** application. The reverse proxy handles incoming HTTP requests and forwards them to the appropriate backend service (the bookmark app), enabling features like SSL termination, load balancing, and centralized routing.

### How it works in this setup

- **bookmark-compose.yaml** launches three Bookmark app containers (`bookmark1`, `bookmark2`, `bookmark3`) by pulling the latest image from Docker Hub.
- **nginx-docker-compose.yaml** launches an Nginx container that acts as a reverse proxy and load balancer for the Bookmark app instances.
- Both use a shared Docker network (`bookmark-network`) for service discovery.

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- Basic knowledge of Nginx and containerization

---

## Project Structure

```
bookmark-compose.yaml            # Docker Compose for Bookmark app instances
nginx-docker/
├── nginx.conf                   # Nginx configuration file
├── nginx-docker-compose.yaml    # Docker Compose for Nginx reverse proxy
README.md                        # Project documentation
```

---

## Docker and Docker Compose

### Docker

Docker is a platform for developing, shipping, and running applications in containers. Containers package software and its dependencies, ensuring consistency across environments.

**Common Docker Commands:**

- `docker pull <image-name>` — Pull an image from a registry.
- `docker run -d -p 80:80 <image-name>` — Run a container in detached mode.
- `docker ps` — List running containers.
- `docker stop <container-id>` — Stop a running container.

### Docker Compose

Docker Compose is a tool for defining and running multi-container Docker applications using a YAML file.

**Common Docker Compose Commands:**

- `docker compose up -d` — Start all services in detached mode.
- `docker compose down` — Stop and remove containers, networks, and volumes.
- `docker compose logs` — View output from services.
- `docker compose start` — Start existing stopped services defined in a Compose file.
- `docker compose stop` — Stop running services without removing containers.

---

## Usage

1. **Clone this repository:**

   ```sh
   git clone <this-repo-url>
   cd Nginx-reverse-proxy
   ```

2. **Ensure you have a Docker Hub account and are logged in:**

   - If you don't have an account, [sign up at Docker Hub](https://hub.docker.com/signup).
   - Log in via the CLI:

     ```sh
     docker login
     ```

   Enter your Docker Hub username and password when prompted.

3. **Create the Docker network (if not already created):**

   ```sh
   docker network create bookmark-network
   ```

4. **Start the Bookmark app services:**

   ```sh
   docker compose -f bookmark-compose.yaml up -d
   ```

   This will pull the latest Bookmark app image from Docker Hub and start three containers (`bookmark1`, `bookmark2`, `bookmark3`).

5. **Start the Nginx reverse proxy:**

   ```sh
   docker compose -f nginx-docker/nginx-docker-compose.yaml up -d
   ```

   This will start the Nginx container, which listens on port `8080` and load balances requests to the Bookmark app containers.

6. **Access the application:**

   Open [http://localhost:8080](http://localhost:8080) in your browser.

7. **Stop all services:**

   ```sh
   docker compose -f nginx-docker/nginx-docker-compose.yaml down
   docker compose -f bookmark-compose.yaml down
   ```

---

## References

- [Nginx Documentation](https://nginx.org/en/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Reverse Proxy Concepts](https://www.nginx.com/resources/glossary/reverse-proxy-server/)

---

**Feel free to customize the configuration and extend the setup as needed for your use case.**
