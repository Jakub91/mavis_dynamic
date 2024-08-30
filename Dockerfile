# Installs Node.js image
FROM node:20.11.0

# sets the working directory for any RUN, CMD, COPY command
WORKDIR /usr/src/app

# Copies package.json, package-lock.json, tsconfig.json, .env to the root of WORKDIR
COPY ["package.json", "package-lock.json", "tsconfig.json", ".env", "./"]

# Copies everything in the src directory to WORKDIR/src
COPY ./src ./src

# Installs all packages
RUN npm install
RUN npm install ejs sass sass-middleware

# Create necessary directories
RUN mkdir -p /usr/src/app/public/css

# Runs the dev npm script to build & start the server
CMD npm run dev
