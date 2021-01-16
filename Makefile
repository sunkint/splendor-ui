NAME = splendor-ui

usage = "\
Usage: make [target]\n\n\
Available targets:\n\
install         安装项目依赖\n\
dev             启动文档调试\n\
build           打包\n\
build-doc       文档打包\n\
docker          文档部署（暂时不用）\n\
"

# Must be the first target!
usage:
	@echo $(usage)

install:
	yarn install

dev:
	yarn dev

build:
	yarn build

build-doc:
	yarn build-doc
	cp .vitepress/public/* .vitepress/dist

version:
	yarn version

publish: version build
	npm publish

publish-beta: version build
	npm publish --tag beta

publish-doc: build-doc
	npx cloudbase hosting:deploy .vitepress/dist

docker-kill:
	-docker kill $(NAME)
	-docker rm $(NAME)

docker-build:
	docker build -t $(NAME) .

docker-run: docker-kill
	docker run -d -p 80:3000 --name $(NAME) --net qas --net-alias $(NAME) --restart always $(NAME)

docker: docker-build docker-run

docker-restart:
	docker restart $(NAME)
