const getInfo = require('./service/notion');
const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static('public'));

app.route('/habits')
    .get( async (req, res)=>{
        const habitshow = await getInfo();
        res.json(habitshow);
    })


app.listen(PORT, ()=>{
    console.log("System is running on "+PORT);
})

    // ; (async () => {
    //     const nHabit = await getInfo()
    //     console.log(nHabit);
    // })()
