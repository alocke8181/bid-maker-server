const db = require('../db');
const {sqlForUpdate} = require('../helpers/sql');

const {NotFoundError, UnauthorizedError, BadRquestError} = require('../expressError');

class Workday{
    constructor({id, name, bidID}){
        this.id = id;
        this.name = name;
        this.bidID = bidID;
    };

    static async post({name, bidID}){
        const result = await db.query(`
            INSERT INTO workdays (name, bid_id)
            VALUES ($1, $2)
            RETURNING *`,
            [name, bidID]);
        return new Workday(result.rows[0]);
    };

    static async getAll(){
        const results = await db.query(`
            SELECT * FROM workdays`);
        return results.rows;
    };

    static async get(id){
        const result = await db.query(`
            SELECT * FROM workdays WHERE id = $1`,[id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No workday id: ${id} for WORKDAY GET`);
        }
        return new Workday(result.rows[0]);
    };

    /**Can patch name or the associated bid (if it exists) */
    static async patch(id, data){
        if(data.bid_id){
            const checkBid = await db.query(`
                SELECT * FROM bids WHERE id = $1`,[data.bid_id]);
            if(!checkBid.rows[0]){
                throw new NotFoundError(`No bid id: ${id} for WORKDAY PATCH`);
            }
        }
        let {setCols, values, lastIdx} = sqlForUpdate(data);
        const result = await db.query(`
            UPDATE workdays
            SET ${setCols}
            WHERE id = ${lastIdx}
            RETURNING *`,
            [...values, id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No workday id: ${id} for WORKDAY PATCH`);
        }
        return new Workday(result.rows[0]);
    };

    static async delete(id){
        const result = await db.query(`
            DELETE FROM workdays
            WHERE id=$1
            RETURNING id`,
            [id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No workday id: ${id} for WORKDAY DELETE`)
        };    
    }
}