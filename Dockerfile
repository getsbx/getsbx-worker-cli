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

# ---- Release ----
FROM ghcr.io/dxatscale/sfpowerscripts
WORKDIR /app

# Copy 'dist' folder from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/bin ./bin
COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json .
COPY --from=build /app/oclif.manifest.json .


# Install CLI application globally
RUN npm link -g




