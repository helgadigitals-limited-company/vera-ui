# Docker Guide for Vera UI Documentation

This guide provides instructions for building and running the Vera UI documentation site using Docker.

## Prerequisites

- Docker Desktop installed and running
- Git repository cloned locally

## Building the Docker Image

### Build Command

```bash
docker build -f packages/docs/Dockerfile -t vera-docs:latest .
```

**Command breakdown:**
- `-f packages/docs/Dockerfile` - Specifies the Dockerfile location
- `-t vera-docs:latest` - Tags the image as `vera-docs` with `latest` tag
- `.` - Sets build context to the project root directory

### Build Process

The build process includes:
1. **Base setup** - Node.js 22 Alpine with pnpm via Corepack
2. **Dependency installation** - Installs workspace dependencies with caching
3. **UI package build** - Builds the component library and creates tarball
4. **Dependency replacement** - Replaces workspace dependency with local tarball
5. **Fumadocs regeneration** - Regenerates MDX source files for compatibility
6. **Documentation build** - Builds the Next.js documentation site
7. **Runtime preparation** - Creates optimized runtime container

**Expected build time:** ~3 minutes (178 seconds)

## Running the Container

### Basic Run

```bash
docker run -p 3000:3000 vera-docs:latest
```

### Background Run

```bash
docker run -d -p 3000:3000 --name vera-docs-container vera-docs:latest
```

**Parameters:**
- `-p 3000:3000` - Maps container port 3000 to host port 3000
- `-d` - Runs container in detached mode (background)
- `--name vera-docs-container` - Assigns a name to the container

### Accessing the Application

Once running, the documentation site will be available at:
- **Local:** http://localhost:3000
- **Network:** http://0.0.0.0:3000

## Container Management

### View Running Containers

```bash
docker ps
```

### View All Containers

```bash
docker ps -a
```

### Stop Container

```bash
docker stop vera-docs-container
```

### Remove Container

```bash
docker rm vera-docs-container
```

### View Container Logs

```bash
docker logs vera-docs-container
```

### Execute Commands in Container

```bash
docker exec -it vera-docs-container sh
```

## Image Management

### List Images

```bash
docker images
```

### Remove Image

```bash
docker rmi vera-docs:latest
```

### Build Different Tags

```bash
# Development build
docker build -f packages/docs/Dockerfile -t vera-docs:dev .

# Version-specific build
docker build -f packages/docs/Dockerfile -t vera-docs:v1.0.0 .
```

## Dockerfile Architecture

The Dockerfile uses a multi-stage build approach:

### Stage 1: Base
- Node.js 22 Alpine Linux
- pnpm package manager via Corepack
- Basic system dependencies

### Stage 2: Build
- Installs all workspace dependencies
- Builds UI component library
- Packages UI library as tarball
- Installs tarball in docs package
- Regenerates Fumadocs source files
- Builds Next.js documentation site

### Stage 3: Runtime
- Minimal Node.js Alpine runtime
- Copies standalone Next.js application
- Copies static assets to correct locations
- Includes health check utilities
- Optimized for production deployment

## Troubleshooting

### Build Failures

1. **Cache issues:** Clear Docker build cache
   ```bash
   docker builder prune
   ```

2. **Context issues:** Ensure you're in the project root
   ```bash
   pwd  # Should show /path/to/vera-ui
   ```

3. **Memory issues:** Increase Docker memory allocation in Docker Desktop

### Runtime Issues

1. **Port conflicts:** Use different port mapping
   ```bash
   docker run -p 8080:3000 vera-docs:latest
   ```

2. **Container won't start:** Check logs
   ```bash
   docker logs vera-docs-container
   ```

3. **Assets not loading:** Verify the build completed successfully and all static files are present

### Performance Optimization

1. **Use .dockerignore:** Ensure `.dockerignore` excludes unnecessary files
2. **Layer caching:** Dependencies are cached for faster rebuilds
3. **Multi-stage builds:** Reduces final image size by excluding build dependencies

## Health Checks

The container includes curl for health checking. You can verify the application is running:

```bash
docker exec vera-docs-container curl -f http://localhost:3000 || echo "Health check failed"
```

## Production Deployment

For production deployments, consider:

1. **Environment variables:** Configure production settings
2. **Reverse proxy:** Use nginx or similar for SSL termination
3. **Container orchestration:** Deploy with Docker Compose or Kubernetes
4. **Monitoring:** Add logging and monitoring solutions
5. **Security:** Run as non-root user and scan for vulnerabilities

## Development Workflow

For active development:

1. **Local development:** Use `pnpm dev:docs` for hot reloading
2. **Testing builds:** Build Docker image to test production deployment
3. **CI/CD integration:** Automate builds in your CI/CD pipeline

---

**Note:** This Docker setup is optimized for the Vera UI documentation site with proper handling of Next.js standalone mode, static assets, and the fumadocs MDX system.