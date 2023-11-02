FROM node:16 as development
WORKDIR /usr/src/app
COPY package*.json ./
ADD dist dist
#RUN npm install
COPY . .
#RUN npm run build

FROM node:16 as production


#create app directory

WORKDIR /puente_services_saleforce/src/app

ARG PORT_ARG=3000

COPY package*.json ./

#RUN npm --verbose install --only=production

COPY --from=development /usr/src/app/dist  ./dist

COPY . .

EXPOSE ${PORT_ARG}

CMD ["node", "dist/main" ]