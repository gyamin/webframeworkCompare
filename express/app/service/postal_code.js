const connection = require("./../lib/db.js")

class PostalCode {
    constructor() {
    }

    sleep(millSec) {
        return new Promise(resolve => setTimeout(resolve, millSec));
    }

    async selectPostalInfoByCity() {

        // await this.sleep(2000);
        let cities = ["大阪府", "東京都", "京都府", "愛知県", "島根県"]

        const con = connection
        let results = []
        for (const elem of cities) {
            let sql = "select postal_code, address_1, address_2, address_3 from postal_code where postal_code.address_1 = ?;"
            const [ret, fields] = await con.promise().execute(sql, [elem]);
            results = results.concat(ret)
        }

        return results
    }
}
module.exports = PostalCode;