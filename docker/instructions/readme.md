# FROM
Defines the base image and starts a new stage

```
from node:20 as builder
```

# LABEL
Adds metadata to the image.
```
LABEL maintainer="kevin@example.com"
LABEL version="1.0"
```

# WORKDIR 
Sets the working directory.
```
workdir /app
```
Creates it if it doesn’t exist
Preferred over RUN cd ...

# COPY
Copies files from build context into the image.
```
COPY . .
COPY package.json /app/
COPY --from=builder /app/dist ./dist

```

# ADD
Like COPY but with extras
```
ADD file.tar.gz /app/
ADD https://example.com/file.txt /tmp/
```
Auto-extract tar
Can download URLs

# RUN 
executes commands at build time

```
RUN apt-get update  && 
```
Each RUN = new layer
Combine to reduce layers

# ARG
BUild time variables
```
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}
```

# CMD 
Default command (can be overridden)
```
CMD ["node", "index.js"]
```





| Category | Instructions                |
| -------- | --------------------------- |
| Base     | `FROM`, `LABEL`             |
| Files    | `WORKDIR`, `COPY`, `ADD`    |
| Build    | `RUN`, `ARG`                |
| Runtime  | `CMD`, `ENTRYPOINT`         |
| Env      | `ENV`, `USER`               |
| Network  | `EXPOSE`                    |
| Health   | `HEALTHCHECK`, `STOPSIGNAL` |
| Data     | `VOLUME`                    |
| Advanced | `SHELL`, `ONBUILD`          |
