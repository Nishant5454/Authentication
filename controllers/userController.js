import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
class UserController {
  static home = (req, res) =>{
    res.render("index")
  }
  static registration = (req, res) =>{
    res.render("registration")
  }

  static createUserDoc = async (req, res) =>{
    try {
      // Creating New Document using Model
      const doc = new UserModel({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
      })
      // saving document
      await doc.save()
      res.redirect('/login')
    } catch (error) {
      console.log(error)
    }
  } 

  

  static login = (req, res) =>{
    res.render("login")
  }

  static verifyLogin = async (req, res) =>{
    try {
      const {email, password} = req.body
      const result = await UserModel.findOne({email:email})
      // console.log(result)
      if(result != null){
        if(result.email == email && result.password == password){
          res.send(`<h1>Dashboard ---- ${result}</h1>`)
        } else{
          res.send("<h1>Email or Password is not Valid</h1>")
        }
      } else{
        res.send("<h1>Kindly Register first at the Portal</h1>")
      }      
    } catch (error) {
      console.log(error)
    }
  }
 
  
}

export default UserController