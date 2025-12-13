# Multistage builds

Allows you to use multiple temporal images to build apps and then only copy
the needed files for the final image

Result: smaller images, secure and clean

# Example:
```
# ---------- STAGE 1: build ----------
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- STAGE 2: runtime ----------
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

CMD ["node", "dist/index.js"]
```

# Concepts

1. As builder
This gives a name to the stage

2. Each FROM is a new stage

3. The final image is the last stage

