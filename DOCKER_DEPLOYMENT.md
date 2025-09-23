# Docker-based Deployment Setup

This document explains the new Docker-based deployment workflow for Vera UI documentation.

## Overview

The updated GitHub Actions workflow (`docs-deploy.yml`) now:

1. **Extracts version** from the UI package.json
2. **Builds a Docker image** using the existing Dockerfile
3. **Tags the image** with UI version + git commit hash (e.g., `1.0.0-abc1234`)
4. **Pushes to Docker registry** (Docker Hub or custom registry)
5. **SSH to VPS** and deploys the new container
6. **Health checks** to ensure successful deployment
7. **Automatic cleanup** of old images

## Required GitHub Secrets

Configure these secrets in your GitHub repository settings:

### Docker Registry Secrets

```
DOCKER_REGISTRY     # Optional: Custom registry URL (defaults to docker.io)
DOCKER_USERNAME     # Docker Hub username or registry username
DOCKER_PASSWORD     # Docker Hub token or registry password
```

### VPS Access Secrets

```
VPS_HOST           # VPS hostname or IP address
VPS_PORT           # SSH port (optional, defaults to 22)
VPS_USER           # SSH username
VPS_SSH_KEY        # Private SSH key content
```

## Docker Image Tagging

Images are tagged with:

- **Versioned tag**: `{UI_VERSION}-{GIT_COMMIT_HASH}` (e.g., `1.0.0-abc1234`)
- **Latest tag**: `latest`

The version is automatically extracted from `packages/ui/package.json`.

## VPS Requirements

Your VPS needs:

1. **Docker installed** and running
2. **SSH access** configured for the deployment user
3. **Port 3000** available for the container
4. **Network access** to pull from Docker registry

## Container Management

The deployment script:

- Stops and removes any existing `vera-ui-docs` container
- Pulls the new image
- Starts a new container with:
  - Auto-restart policy (`unless-stopped`)
  - Port mapping (3000:3000)
  - Built-in health checks
- Waits for container to become healthy
- Cleans up old images (keeps last 3 versions)

## Health Monitoring

The application includes:

- **Health endpoint**: `/api/health` returns app status
- **Docker health check**: Built into the Dockerfile
- **Deployment verification**: Workflow waits for healthy status

## Manual Deployment Commands

If needed, you can deploy manually on your VPS:

```bash
# Pull the latest image
docker pull {registry}/{username}/vera-ui-docs:latest

# Stop existing container
docker stop vera-ui-docs
docker rm vera-ui-docs

# Run new container
docker run -d \
  --name vera-ui-docs \
  --restart unless-stopped \
  -p 3000:3000 \
  {registry}/{username}/vera-ui-docs:latest

# Check status
docker ps
docker logs vera-ui-docs
```

## Troubleshooting

### Check container logs

```bash
docker logs vera-ui-docs --tail 50
```

### Check container health

```bash
docker inspect vera-ui-docs --format='{{.State.Health.Status}}'
```

### Manual health check

```bash
curl http://localhost:3000/api/health
```

### Rollback to previous version

```bash
# List available tags
docker images {registry}/{username}/vera-ui-docs

# Run specific version
docker run -d \
  --name vera-ui-docs \
  --restart unless-stopped \
  -p 3000:3000 \
  {registry}/{username}/vera-ui-docs:1.0.0-abc1234
```

## Security Notes

1. **Docker credentials**: Use access tokens instead of passwords
2. **SSH keys**: Use dedicated deployment keys with minimal permissions
3. **Network**: Consider restricting Docker registry access
4. **Container**: Application runs as non-root user in container

## Migration from Previous Deployment

If migrating from the previous tar-based deployment:

1. **Backup**: Ensure you have a backup of your current deployment
2. **Stop services**: Stop any existing systemd services
3. **Clean up**: Remove old deployment directories if desired
4. **Configure secrets**: Set up the new GitHub secrets
5. **Test**: Run a test deployment to verify everything works
6. **Monitor**: Watch the first few deployments closely

The new Docker-based approach provides:

- ✅ Consistent deployment environment
- ✅ Easy rollbacks
- ✅ Better resource isolation
- ✅ Simplified dependency management
- ✅ Built-in health monitoring
