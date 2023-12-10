
const Submission = require('../Models/GoogleDocSubmission');
const ReportData = require('../Models/FinalReport');

const submitForm = async (req, res) => {
  const { docLink, reportName, email } = req.body;

  // Validate the input (you may want to add more validation)
  if (!docLink || !reportName || !email) {
    return res.status(400).json({ error: 'Both Google Doc Link and Report Name are required.' });
  }

  try {
    // Save the submission to the MongoDB database
    const googledocsubmission = await Submission.create({ docLink, reportName, email, submissionStatus: 'submitted' });

    res.json({ message: 'Submission successful!', googledocsubmission });
    console.log("Submission done");
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getVivavoce = async (req, res) => {
  const { email } = req.body;

  try {
    const vivavocesubmission = await Submission.findOne({ email });

    if (vivavocesubmission) {
      res.status(200).json({ message: 'Report already submitted', submitted: true, finalreport: true, submission: vivavocesubmission });
    } else {
      const finalreport = await ReportData.findOne({ username: email });

      if (finalreport) {
        res.status(200).json({ message: 'Final report already submitted', submitted: false, finalreport: true, submission: null });
      } else {
        res.status(200).json({ message: 'Report submission pending', submitted: false, finalreport: false, submission: null });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { submitForm, getVivavoce };
