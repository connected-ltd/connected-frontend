# build environment
FROM node:latest AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install --ignore-engines
COPY . ./

# set env
ARG VITE_CONNECTED_BACKEND_URL
ENV VITE_CONNECTED_BACKEND_URL=${VITE_CONNECTED_BACKEND_URL}
RUN echo 'VITE_CONNECTED_BACKEND_URL=${VITE_CONNECTED_BACKEND_URL}' > .env.production


# run build
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
