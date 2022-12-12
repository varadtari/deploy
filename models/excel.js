const mongoose=require("mongoose")

const ExcelSchema = new mongoose.Schema({
    "Sl No": {
      type: Number,
     // required: true,
      unique: true,
      dropDups: true,
  },
  DOJ: {
    type: String,
    //required: true,
  },
  DateJoin:{
    type:Date
   },
  "Emp Code": {
      type: Number,
      //required: true,
      unique:true,
      dropDups: true,
  },
  "Employee Name": {
    type: String,
    //required: true,
  },
  
  "Father Name": {
    type: String,
    //required: true,
  },
  Education: {
    type: String,
    //required: true,
  },
  "Department": {
    type: String,
   // required: true,
  },
  Contractor: {
    type: String,
    //required: true,
  },
  });

  const Excel=mongoose.model("Excel",ExcelSchema)
  exports.ExcelSchema=ExcelSchema
  exports.Excel=Excel