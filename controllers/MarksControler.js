const UserData = require('../Models/UserData');

const getMarks = async(req,res) => {
    try {
    const username = req.params.id ;

    const user = await UserData.findOne({username});

    const marksData = {
        week_1_marks: user.week_1_marks ? user.week_1_marks: '',
        week_2_marks: user.week_2_marks ? user.week_2_marks: '',
        week_3_marks: user.week_3_marks ? user.week_3_marks: '',
        finalreport_marks: user.finalreport_marks ? user.finalreport_marks: '',
        vivavoce_marks: user.vivavoce_marks ? user.vivavoce_marks: '',
        week_1_cmnts: user. week_1_cmnts ? user.week_1_cmnts: '',
        week_2_cmnts: user.week_2_cmnts ? user.week_2_cmnts: '',
        week_3_cmnts: user.week_3_cmnts ? user.week_3_cmnts: '',
        final_cmnts: user.final_cmnts ? user.final_cmnts: '',
        viva_cmnts: user.viva_cmnts ? user.viva_cmnts: '',
    }
    
    console.log(marksData)
    console.log(user)
    res.status(200).json({marks: marksData})
    } catch (error) {
        console.log(error)
        res.status(200).json({message: 'User not found'})
        
    }
    
}

module.exports = getMarks