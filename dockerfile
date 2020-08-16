FROM node:12.13.0-alpine
COPY . /app
WORKDIR /app
RUN yarn --registry https://registry.npm.taobao.org
RUN yarn global add http-server --registry https://registry.npm.taobao.org
RUN yarn build-doc
RUN cp .vitepress/public/favicon.ico .vitepress/dist
CMD http-server /app/.vitepress/dist -p 80
EXPOSE 80