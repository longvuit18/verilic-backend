FROM node:14
# Create app directory
WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY pm2.config.js .
COPY ./dist/ ./dist/

RUN npm install --production
RUN npm install -g pm2
# If you are building your code for production
# RUN npm ci --only=production

# Inform Docker that the container is listening on the specified port at runtime.
EXPOSE 5000

# Run the specified command within the container.
# Environment variable mongoDb override NODE_ENV
ENV NODE_ENV="production"

CMD [ "npm", "run", "production" ]
