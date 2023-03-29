const {MongoClient} = require('mongodb')
require('dotenv').config()

const {MONGO_URI} = process.env;

const option = {
    useNewUrlParser:true,
    useUnifiedTopology: true,
}

// get a single user
const getSingleUser = async(request,response) => {
  const client = new MongoClient(MONGO_URI,option)
  const user_id = request.params.userId
  try {
      await client.connect()
      const db = client.db('db-name')
      const user = await db.collection('users').findOne({_id : user_id})
      if(user === null){
          throw new Error('Something went wrong trying to retrieve user from the database')
      }
      client.close()
      return response.status(200).json({status : 200, message : "Retrieved user from databse successfully", data : user})
  } catch (error) {
      client.close()
      return response.status(404).json({status:404,error: error.message})
  }
}
