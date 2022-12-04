const mongoose = required('mongooose')

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/p2')
}

const student = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        unique: true
    },
    faveFoods: [{type: String}],
    info: {
        school: {
            type: String
        },
        showSize: {
            type: Number
        }
    },
    school: {
        type: mongoose.Schema.Type.ObjectId,
        required: true,
        ref: 'school'
    }
}, {timestamps: true})

const school = new mongoose.Schema({
    name: String
    openSince: Number,
    students: Number,
    isGreat: Boolean
})

const School = mongoose.model('school', school)
const Student = mongoose.model('student', student)

connect()
.then(async connection => {
    const school = await School.create({name: 'Richards elementary'}).exe()
    const student = await Student.create({firstName: 'Mike', school: school._id}).exec()

    const match = await Student.findById(student.id)
        .populate('school')
        .exec()
    console.log(match)
})
.catch(e => console.error(e))