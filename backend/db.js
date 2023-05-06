const mongoose= require('mongoose');
const mongoURI='mongodb://localhost:27017/inotebook'
const connectToMongo=()=>{
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to database');
}).catch((error) => {
  console.log('Error connecting to database:', error.message);
});
}

module.exports=connectToMongo;