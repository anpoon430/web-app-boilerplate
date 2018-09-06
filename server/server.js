const app = require('./index')
const { db } = require('./db')
const PORT = process.env.PORT || 1337;

(async() => {
  try {
    await db.sync()
    console.log("Database synced!")
    app.listen(PORT, ()=>{
      console.log("Listening on port ", PORT)
    })
  } catch(err){
    console.error(err);
  }
})()

