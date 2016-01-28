
.PHONY : dist production server


main: dist server

dist:
	TARGET=development gulp

production:
	TARGET=production gulp

server:
	node server.js
