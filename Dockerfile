FROM node:lts-alpine

COPY . /app

WORKDIR /app

RUN npm config set proxy $http_proxy && \
    npm config set https-proxy $https_proxy && \
    npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

