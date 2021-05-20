const dotenv = require('dotenv').config();
const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN
})
const database_id = process.env.NOTION_DATABASE_ID

// LIST DATABASE
// const listDB = async () => {
//     const res = await notion.databases.list()
//     console.log(res);
// }
// listDB()

// QUERY DATABASE
module.exports = async function getInfo() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST',
    }

    const { results } = await notion.request(payload)
    //console.log(results);


    const habit = results.map((page) => {
        // console.log(page);

        // console.log(page.properties.Mentioner.title[0].plain_text);
        let tit = page.properties.Mentioner.title[0].plain_text;
        let exec = String(page.properties.Execrise.checkbox);
        let FLang = page.properties.ForeignLang.multi_select;
        var Flangtext = '';

        FLang.forEach(lang => {
            Flangtext = Flangtext.concat(lang.name, ', ');
        });

        return {
            id: page.id,
            title: tit.substring(0, 10),
            execrise: exec,
            foreignLang: Flangtext
        }
    })

    return habit;
}
