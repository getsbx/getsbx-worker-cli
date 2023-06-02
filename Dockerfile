# ---- Base Node ----
FROM ghcr.io/dxatscale/sfpowerscripts AS build
WORKDIR /app

# Copy project file
COPY package.json .

# Copy all source files
COPY . .


# Install all dependencies
RUN npm i


# Build application
RUN npm run prepack


# Build application
RUN npm pack

# ---- Release ----
FROM ghcr.io/dxatscale/sfpowerscripts
WORKDIR /app

# Copy 'dist' folder from build stage
COPY --from=build /app/sbxw-0.0.0.tgz .

# Install sbxw from local tarball
RUN npm i -g sbxw-0.0.0.tgz







