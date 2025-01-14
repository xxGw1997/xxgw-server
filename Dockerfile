# Use an official Node.js runtime as the base image
# This line specifies the base image for the Docker image. In this case, we're using an official Node.js runtime image with version 18.18 and the # Alpine Linux distribution.
FROM node:22.13-alpine3.20

# This line sets the working directory inside the container to /usr/src/app. This is where we'll copy our application code and where the # application will run.
WORKDIR /app

COPY package*.json prisma .

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

# Copy the rest of your application code to the container
COPY . .

RUN npm run build

# This line generates the Prisma client code based on the schema defined in the application.
RUN npx prisma generate

# Expose the port that your application will run on (Nest.js default is 3000)
EXPOSE 9798

# Define the command to run your application
CMD ["node", "/app/dist/main.js"]