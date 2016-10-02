ifeq ($(m),)
	m=update
endif

dev:
	TARGET=dev ./node_modules/.bin/webpack-dev-server --inline --hot --devtool eval


production:
	TARGET=production ./node_modules/.bin/webpack


bak:
	git add . &&\
	git commit -m '$(m)';\
	git push coding master -f
