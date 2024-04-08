const {Schema, model} = require("mongoose");

const AboutSchema = new Schema({
    about_title: String,
    about_description: String
})


const About = model("About", AboutSchema);
export default About;