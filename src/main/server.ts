import * as dotenv from 'dotenv'
import app from './config/app'
dotenv.config()

app.listen(4000, () => console.log('Server running at http://localhost:4000'))
