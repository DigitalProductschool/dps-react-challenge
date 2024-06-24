 # stage1 as builder
FROM node:lts-alpine as builder
WORKDIR /app
# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install
# Copy rest of the files
COPY . .
# Build the project
RUN npm run build


FROM nginx:alpine as production-build
RUN addgroup -S vite && adduser -S vite -G vite
RUN mkdir -p /var/cache/nginx/ /var/run/nginx \
    && chown -R vite:vite /var/cache/nginx /var/run/nginx
COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*
# Copy from the stage 1
COPY --chown=vite:vite --from=builder /app/dist /workspace/build
EXPOSE 3000
USER vite
ENTRYPOINT ["nginx", "-g", "daemon off;"]