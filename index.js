import { initServer } from './configs/app.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'
import { initUser } from './configs/init.config.js'

config()
connect()
initUser()
initServer()