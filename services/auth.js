import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

// Load environment variables from 
const secret="siddharthbehl_is_awesome@*(#EU@DHOI@HH@D)ESJEIOJ*EDIH@EDOIJEH)*EX*U!WSZI"
// Destructure environment variables

// Access environment variables


export function set_user(data) {
   return jwt.sign({
      _id: data._id,
      Email: data.Email,
      role:data.role
   }, secret)
}
export function get_user(token) {
   try {
      return jwt.verify(token, secret)
   }
   catch {
   }
}

