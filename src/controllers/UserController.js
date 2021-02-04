var CreateUser = require('../models/create');
var RegisterStudent = require('../models/registerStudent');
var shortid = require('shortid');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
import _ from 'lodash'

export const addNewUser = async (req, res) => {
	try {
	  const body = req.body
	  let user = await CreateUser.findOne({ email: body.email })
	  if (!user) {
		  const salt = await bcrypt.genSalt(10)
		  body.password = await bcrypt.hash(body.password, salt)
		  user = await CreateUser.create(body)
		  return res.status(200).json({
			  status: true,
			  message: "User created successfully.",
			  data: user
		  })
	  } else {
		  return res.status(200).json({
			  status: false,
			  message: "User already exists with this email address!!!",
			  data: []
		  })
	  }
	} catch (error) {
	  res.json({
		status: false,
		message: error.message,
		data: ''
	  })
	}
}

export const login = async (req, res)=>{
	try{
	  let user = await CreateUser.findOne({ email: req.body.email })
	  if(user){ 
		const passwordCheck = await bcrypt.compare(req.body.password, user.password)
		if (passwordCheck) {
			res.json({ success: true, message: "Login has been done successfully.", data: user })
		}else{
			res.json({ success: false, message: "Password doesn't match", data: [] })
		}
	  }else{
		res.json({ success: false, message: "Unauthorized Access!.", data: [] })
	  }     
	}catch(err){
		console.log('rrrrrrrr', err)
	  res.json({ success: false, message: "Something went wrong...", data: [] })
	}
};

export const userRegistration = async (req, res) => {
	try {
	  const body = req.body
	  if(body.id === ''){
		let user = await RegisterStudent.findOne({ email: body.email })
		if (!user) {
			user = await RegisterStudent.create(body)
			return res.status(200).json({
				status: true,
				message: "Student created successfully.",
				data: user
			})
		} else {
			return res.status(200).json({
				status: false,
				message: "Student already exists with this email address!!!",
				data: []
			})
		}
	  }else{
		const obj = {
			images: req.body.images,
			firstName: req.body.firstName,
			lastName: req.body.lastName, 
			fatherName: req.body.fatherName,
			email: req.body.email,
			address: req.body.address,
			mobileNo: req.body.mobileNo,
			gender: req.body.gender,
			dob: req.body.dob,
			country: req.body.country
		}
		let user = await RegisterStudent.findOneAndUpdate({ _id: body.id }, { $set: obj })
		if (user) {
			return res.status(200).json({
				status: true,
				message: "Student Updated successfully.",
				data: user
			})
		} else {
			return res.status(200).json({
				status: false,
				message: "Student Not Found!!!",
				data: []
			})
		}
	  }
	  
	} catch (error) {
	  res.json({
		status: false,
		message: error.message,
		data: ''
	  })
	}
  }

  export const getStudents = async (req, res) => {
	try {
	  let user = await RegisterStudent.find({})
	  if (user) {
		return res.status(200).json({
			status: true,
			message: "Get students data successfully...",
			data: user
		})
	  } else {
		return res.status(200).json({
			status: true,
			message: "Get students data successfully...",
			data: user
		})
	  }
	} catch (error) {
	  res.json({
		status: false,
		message: error.message,
		data: ''
	  })
	}
  }

  export const DeleteStudentById = async (req, res) => {
	try {
	  let user = await RegisterStudent.findByIdAndRemove({ _id: req.body.id })
	  if (user) {
		return res.status(200).json({
			status: true,
			message: "Delete Student Successfully...",
			data: user
		})
	  } else {
		return res.status(200).json({
			status: false,
			message: "something went wrong...",
			data: user
		})
	  }
	} catch (error) {
	  res.json({
		status: false,
		message: error.message,
		data: ''
	  })
	}
  }