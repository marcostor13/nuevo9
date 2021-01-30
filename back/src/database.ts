import * as mongoose from 'mongoose';
import { mongodb } from './keys'

const dbOptions:mongoose.ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}
mongoose.connect(mongodb.DB.URI, dbOptions)
const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('MongoDB Start')
})
connection.once('Error', (e) => {
    console.log('MongoDB Error',e)
})