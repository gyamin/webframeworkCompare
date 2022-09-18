const connection = require("./../lib/db.js")

class PostalCode {
    constructor() {
    }

    sleep(millSec) {
        return new Promise(resolve => setTimeout(resolve, millSec));
    }

    async selectPostalInfoByCity() {
        await this.sleep(2000);

        const con = connection
        // const sql = "select postal_code, address_1, address_2, address_3 from postal_code where address_2 like '%大津%';"
        const sql = "select postal_code, address_1, address_2, address_3 from postal_code;"
        const [rows, fields] = await con.promise().query(sql);
        return rows;
    }
}
module.exports = PostalCode;