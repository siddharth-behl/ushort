import mongoose from "mongoose";
mongoose.set('strictQuery', false);
function mongoconnector(url) {
   return mongoose.connect(url)
}

export default mongoconnector