const db = require('../db');

const {NotFoundError, UnauthorizedError, BadRquestError} = require('../expressError');
const bcrypt = require('bcrypt');
const {BCRYPT_WORK_FACTOR} = require('../config');

class User{

    constructor({id, username}){
        this.id = id;
        this.username = username;
    }

    static async authenticate(username, password){
        const result = await db.query(`
            SELECT * FROM users
            WHERE username = $1`,[username]);
        const user = result.rows[0];
        if(user){
            const valid = await bcrypt.compare(password, user.password);
            if(valid){
                delete user.password;
                return new User(result.rows[0]);
            }else{
                throw new UnauthorizedError('Invalid password');
            };
        }else{
            throw new NotFoundError(`No user named ${username}`);
        };  
    };

    static async post({username, password}){
        const dupeCheck = await db.query(`
            SELECT username FROM users WHERE username = $1`,
            [username]);
        if(dupeCheck.rows[0]){
            throw new BadRquestError(`User ${username} already exists`);
        };
        const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(`
            INSERT INTO users (username, password)
            VALUED ($1, $2)
            RETURNING id, username`,
            [username, hashedPwd]);
        return new User(result.rows[0])
    };

    static async get(id){
        const result = await db.query(`
            SELECT id, username FROM users WHERE id = $1`,[id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No user id: ${id}`);
        }
        return new User(result.rows[0]);
    };

    /**ADMIN ONLY ROUTE */
    static async getAll(){
        const results = await db.query(`SELECT * FROM users`);
        return results.rows;
    };

    static async updatePassword(user, oldPwd, newPwd){
        try{
            User.authenticate(user.username, oldPwd);
        }catch(e){
            return e;
        };
        const newHashedPwd = await bcrypt.hash(newPwd, BCRYPT_WORK_FACTOR);
        const result = await db.query(`
            UPDATE users
            SET password = $1
            WHERE id = $2
            RETURNING id, username`,
            [newHashedPwd, user.id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No user id: ${id}`)
        }
        return new User(result.rows[0]);
    }

    static async delete(id){
        const result = await db.query(`
            DELETE FROM users
            WHERE id=$1
            RETURNING id`,
            [id]);
        if(!result.rows[0]){
            throw new NotFoundError(`No user id: ${id}`)
        };
    };
};

module.exports = User;