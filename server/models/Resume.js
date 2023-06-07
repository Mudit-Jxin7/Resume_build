const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ResumeSchema = new Schema({
    name: String,
    role: String,
    phone: String,
    address: String,
    linkedin: String,
    github: String,
    gmail: String,
    skills: String,
    experience1: String,
    experience2: String,
    qualifications1: String,
    qualifications2: String,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
});


const ResumeModel = model('Resume', ResumeSchema);

module.exports = ResumeModel;