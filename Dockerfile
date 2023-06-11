# ---- Base Node ----
FROM sitespeedio/node:ubuntu-20.04-nodejs-18.16.0 AS build
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

# Extract version from package.json, assign it to an environment variable, and rename the package
RUN VERSION=$(node -p "require('./package.json').version") && mv sbxw-$VERSION.tgz sbxw.tgz

# Clean up unnecessary files
RUN rm -rf node_modules

# ---- Release ----
FROM ghcr.io/dxatscale/sfpowerscripts


# Copy 'dist' folder from build stage
COPY --from=build /app/sbxw.tgz .

# Install sbxw from local tarball and clean up unnecessary packages/files after their use
RUN npm i -g sbxw.tgz && \
    npm cache clean --force && rm -rf sbxw.tgz


# Install gh-cli
RUN type -p curl >/dev/null || (sudo apt update && sudo apt install curl -y)
RUN curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg \
&& sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg \
&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
&& sudo apt update \
&& sudo apt install gh -y

# Check global installation
RUN sbxw --version
