FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build  # Transpile TypeScript -> JavaScript

EXPOSE 3000
CMD ["npm", "run", "start"]
