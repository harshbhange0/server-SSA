import { Schema, model } from "mongoose";

const AdminS = new Schema({
  admin_user_name: {
    type: String,
    required: true, // Makes the field required
  },
  admin_user_password: {
    type: String,
    required: true, // Makes the field required
  },
});

const Admin = model("admins", AdminS);

export default Admin;
