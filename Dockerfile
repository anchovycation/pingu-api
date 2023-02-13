FROM node:18-alpine3.15 AS backend

ARG NODE_ENV=production
ARG PORT=3000
ARG YOUTUBE_API_KEY=
ARG MONGO_CONNECTION_STRING=
ARG REDIS_CONNECTION_STRING=

# environment variables
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV YOUTUBE_API_KEY=$YOUTUBE_API_KEY
ENV MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING
ENV REDIS_CONNECTION_STRING=$REDIS_CONNECTION_STRING

# create project directory
WORKDIR /usr/src/pingu-api

# bundle app source
COPY . .

# install dependencies
# enviroment is development because we use babel
RUN NODE_ENV=development npm install
RUN npm run build

EXPOSE $app_port
CMD ["npm", "run", "start"]


FROM node:18-alpine3.15 AS development
ARG NODE_ENV=development
ARG PORT=3000
ARG YOUTUBE_API_KEY=
ARG MONGO_CONNECTION_STRING=
ARG REDIS_CONNECTION_STRING=

# environment variables
ENV NODE_ENV=$NODE_ENV
ENV PORT=$PORT
ENV YOUTUBE_API_KEY=$YOUTUBE_API_KEY
ENV MONGO_CONNECTION_STRING=$MONGO_CONNECTION_STRING
ENV REDIS_CONNECTION_STRING=$REDIS_CONNECTION_STRING

# create project directory
WORKDIR /usr/src/pingu-api

# bundle app source
COPY . .

# install dependencies
RUN npm install

EXPOSE $app_port
CMD ["npm", "run", "start:dev"]