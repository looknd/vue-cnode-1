flfip=115.28.83.193
flfhost=root@$(flfip)
path=server/project/vue-cnode

ifeq ($(m),)
	m=up
endif

.PHONY : dist production server


main: dist server

dist:
	TARGET=development gulp

production:
	TARGET=production gulp

server:
	node server.js

deploy: production
	git add -A &&\
	git commit -m $(m);\

	tar -czvf static.zip index.html dist/*.*
	scp static.zip $(flfhost):$(path)
	-rm static.zip
	ssh -t $(flfhost) "cd $(path); tar -xzvf static.zip && rm -f static"

