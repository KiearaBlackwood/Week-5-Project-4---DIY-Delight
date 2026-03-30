import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import dotenv from 'dotenv'
import carRouter from './routes/cars.js'
import { fileURLToPath } from 'url' 


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '.env') })

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())

app.use('/api', carRouter)

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve(__dirname, 'public/index.html'))
    )
}

app.listen(PORT, '127.0.0.1', () => {
    console.log(`🚀 Server listening on http://127.0.0.1:${PORT}`)
})