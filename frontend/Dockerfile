FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm install

# run dev server
CMD ["npm", "run", "dev"]