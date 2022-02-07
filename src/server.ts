import express from "express"
import './database'
import { routes } from "./routes";
import 'dotenv/config'
import cors from "cors"
import swaggerUi from "swagger-ui-express"
import swaggerDocs from './swagger.json'

const app = express()
app.use(cors())
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(routes)

app.listen(process.env.PORT || 3000, () => console.log('funcionando'))