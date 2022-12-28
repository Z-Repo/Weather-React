# Chooses the back-end image from dockerhub
FROM node:19-alpine
# Chooses the name of the file in the container
WORKDIR /weather-app
# Chooses to copy only the package.json
COPY package.json .
# Installs all the dependancies in the json
RUN npm install
# Copies the remaining files
COPY . .
# Documentation for which port will and should be in use
EXPOSE 3000
# Applies the `npm start` command
CMD ["npm", "start"]