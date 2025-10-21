# Best practice docker

1. Use offical docker images whenever possible

2. Alpine is not always the best choice
 Some know issues with performance for some tech
 Most vulneravilities are not recognized

3. Limit image layers amount
Each RUN instruction in your Dockerfile will end up creating an additional laye
r in your final image. 
The best practice is to limit the amount of layers to keep the image lightweight.

3. Multi stage builds
Multi-stage builds are useful to anyone who 
has struggled to optimize Dockerfiles while keeping them easy to read and maintain.

With multi-stage builds, you use multiple FROM statements in your Dockerfile.

## Traditional
FROM node:20

WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "server.js"]

But your image now includes npm, build tools, caches, etc.

The multistage version
# Build Stage
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
CoPY . .

# Runtime Stage
FROM node:20-slim

WORKDIR /app
COPY --from=builder /app ./

CMD ["node", "server.js"]


# Rebuild images often
Images are immutable. 
To keep your images up-to-date and secure.

docker build --no-cache my-image:tag .

# Exclude with .dockerignore

# 




