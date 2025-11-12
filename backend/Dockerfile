# Use Node LTS
FROM node:18

# Create app directory
WORKDIR /app

# Copy package files and install
COPY package*.json ./
RUN npm install

# Copy code
COPY . .

# Expose backend port
EXPOSE 8080

# Run backend
CMD ["npm", "start"]
