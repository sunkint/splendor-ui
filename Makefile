usage = "\
Usage: make [target]\n\n\
Available targets:\n\
install         安装项目依赖\n\
dev             启动调试\n\
build           前端打包\n\
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
