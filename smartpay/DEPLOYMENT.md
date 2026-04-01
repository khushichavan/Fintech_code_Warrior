# 🌐 Deployment Guide

## Deployment Options

### Option 1: Heroku (Easiest)

#### Backend Deployment

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Create Heroku account** at heroku.com

3. **Login to Heroku**
   ```bash
   heroku login
   ```

4. **Create Heroku app**
   ```bash
   cd backend
   heroku create smartpay-backend
   ```

5. **Deploy**
   ```bash
   git push heroku main
   ```

6. **View logs**
   ```bash
   heroku logs --tail
   ```

#### Frontend Deployment (Netlify)

1. **Build React app**
   ```bash
   cd frontend
   npm run build
   ```

2. **Update API URL** in `src/context/SmartPayContext.js`:
   ```javascript
   const API_BASE_URL = 'https://smartpay-backend.herokuapp.com/api';
   ```

3. **Connect to Netlify**
   - Go to netlify.com
   - Connect GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Deploy!

### Option 2: AWS

#### EC2 Instance
```bash
# 1. Launch Ubuntu EC2 instance
# 2. SSH into instance
# 3. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 4. Clone repository
git clone <your-repo>
cd smartpay/backend

# 5. Install dependencies
npm install

# 6. Start with PM2
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```

#### Configure Security Group
- Add inbound rule: Port 5000 (Custom TCP)
- Add inbound rule: Port 3000 (Custom TCP)
- Add inbound rule: Port 80 (HTTP)

### Option 3: Docker

#### Dockerfile for Backend
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - PORT=5000
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend
```

#### Build and Run
```bash
docker-compose up
```

### Option 4: Vercel (Frontend) + Railway (Backend)

#### Backend on Railway

1. Go to railway.app
2. Connect GitHub
3. Select backend folder
4. Set environment variables
5. Deploy!

#### Frontend on Vercel

1. Go to vercel.com
2. Connect GitHub
3. Set build command: `npm run build`
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-railway-backend.railway.app/api
   ```
5. Deploy!

## Production Checklist

### Security
- [ ] Remove console.log statements
- [ ] Enable HTTPS everywhere
- [ ] Add rate limiting
- [ ] Implement proper authentication (JWT)
- [ ] Add API key validation
- [ ] Hash passwords (bcrypt)
- [ ] Enable CORS selectively
- [ ] Add input validation
- [ ] Add SQL injection protection

### Performance
- [ ] Enable gzip compression
- [ ] Minify assets
- [ ] Use CDN for static files
- [ ] Add caching headers
- [ ] Implement database indexing
- [ ] Use connection pooling
- [ ] Add monitoring (Sentry)
- [ ] Set up error tracking

### Database
- [ ] Switch from mock to real database
- [ ] Add automated backups
- [ ] Create database indexes
- [ ] Set up replication
- [ ] Add monitoring alerts
- [ ] Plan disaster recovery

### Monitoring
- [ ] Set up log aggregation
- [ ] Add uptime monitoring
- [ ] Create performance dashboards
- [ ] Set up alerts
- [ ] Monitor database performance
- [ ] Track API response times

## Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=production
DB_HOST=your-db-host
DB_USER=your-db-user
DB_PASS=your-db-password
JWT_SECRET=your-secret-key
CORS_ORIGIN=https://your-frontend.com
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend.com/api
REACT_APP_ENV=production
```

## Database Migration

To switch from mock to MongoDB:

1. **Install MongoDB driver**
   ```bash
   npm install mongodb
   ```

2. **Create database connection**
   ```javascript
   const MongoClient = require('mongodb').MongoClient;
   const url = process.env.MONGODB_URI;
   const client = new MongoClient(url);
   ```

3. **Replace mock database**
   ```javascript
   // Replace mockUsers object with database queries
   const usersCollection = client.db('smartpay').collection('users');
   const user = await usersCollection.findOne({ _id: userId });
   ```

## Scaling Strategy

### Phase 1: MVP (Current)
- Single server
- In-memory database
- No caching

### Phase 2: Stability
- Database (MongoDB/PostgreSQL)
- Error tracking (Sentry)
- Monitoring (DataDog)
- CDN for assets

### Phase 3: Growth
- Load balancing
- Redis caching
- Database replication
- Message queues

### Phase 4: Enterprise
- Microservices
- Kubernetes
- Auto-scaling
- Advanced monitoring

## SSL Certificate

### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --standalone -d yourdomain.com

# Configure in Express
const https = require('https');
const fs = require('fs');

const options = {
  cert: fs.readFileSync('/etc/letsencrypt/live/domain/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/domain/privkey.pem')
};

https.createServer(options, app).listen(443);
```

## CI/CD Pipeline

### GitHub Actions Example
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "smartpay-backend"
          heroku_email: ${{secrets.HEROKU_EMAIL}}
```

## Cost Estimation

| Service | Plan | Monthly Cost |
|---------|------|--------------|
| Heroku | Basic | $5-50 |
| AWS EC2 | t2.micro | $5-20 |
| Netlify | Free | $0 |
| Railway | Free/Paid | $0-100 |
| MongoDB Atlas | Free | $0-500 |
| Datadog | Basic | $15+ |

## Post-Deployment

1. **Set up monitoring**
2. **Configure backups**
3. **Set up alerts**
4. **Create runbooks**
5. **Document processes**
6. **Plan maintenance**
7. **Review logs regularly**

---

**Ready to go live? Pick your deployment platform and start! 🚀**
