const db = require('../db');

const {NotFoundError, UnauthorizedError, BadRquestError} = require('../expressError');

class Bid{
    constructor({id, name, user_id}){
        this.id = id;
        this.name = name;
        this.user_id = user_id;
    };

    static async post({name, user_id}){
        const result = await db.query(`
            INSERT INTO bids (name, user_id)
            VALUES ($1, $2)
            RETURNING *`,
            [name, user_id]);
        return new Bid(result.rows[0]);
    };

    static async getAll(){
        const results = await db.query(`
            SELECT * FROM bids`);
        return results.rows;
    };

    static async get(id){
        const result = await db.query(`
            SELECT * FROM bids WHERE id = $1`,[id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No bid id: ${id} for BID GET`);
        }
        return new Bid(result.rows[0]);
    };

    static async patch(id, newName){
        const result = await db.query(`
            UPDATE bids
            SET name = $1
            WHERE id = $2
            RETURNING *`,
            [id, newName]);
        if(!result.rows[0]){
            throw new NotFoundError(`No bid id: ${id} for BID PATCH`);
        }
        return new Bid(result.rows[0]);
    };

    static async delete(id){
        const result = await db.query(`
            DELETE FROM bids
            WHERE id=$1
            RETURNING id`,
            [id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No bid id: ${id} for BID DELETE`)
        };
    };



}
module.exports = Bid;