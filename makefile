# flfip=192.168.1.111
# flfhost=root@$(flfip)
# path=server/project/vue-cnode
# coding=git@git.coding.net:flfwzgl/cnode.git

ifeq ($(p),)
	p=8888
endif

ifeq ($(m),)
	m=update
endif

.PHONY :  dev production bak deploy


# main: dev server

dev:
	TARGET=dev ./node_modules/.bin/webpack-dev-server --inline --hot --devtool eval


production:
	TARGET=production ./node_modules/.bin/webpack



# bak:
# 	git add -A &&\
# 	git commit -m '$(m)';\
# 	git push $(coding) master -f

# deploy:
# 	tar -czvf static.zip index.html favicon.png $(dist)/*
# 	scp static.zip $(flfhost):$(path)
# 	-rm static.zip
# 	ssh -t $(flfhost) "cd $(path) && tar -xzvf static.zip && rm -f static.zip"

# all: production bak deploy

