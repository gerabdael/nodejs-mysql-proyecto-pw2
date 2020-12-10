const passport = require('passport');
const LocalStrategy = require ('passport-local').Strategy;
const pool = require('../database');
 const helpers = require('../lib/helpers')

 passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
 }, async (req, username, password,done)=>{
     console.log(req.body);
     const rows = await pool.query('SELECT * FROM users WHERE username = ? AND borradolog=1', [username]);
     if(rows.length > 0){
         const user = rows[0];
         const validPassword = await helpers.matchPassword(password,user.password);
         if(validPassword){
             done(null,user,console.log(1));
         }else{
             done(null,false,console.log(2));
         }
     }else{
         return done(null, false,console.log(3));
     }
 }));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req,username,password, done)=>{
    const { fullname }= req.body;
    const { correo }= req.body;
    const { public }= req.body;
    const newUser = {
        username,
        password,
        fullname,
        correo,
        public
    };
    /*if (password.match(/[a-z]/g) && password.match( 
        /[A-Z]/g) && password.match( 
        /[0-9]/g) && password.match( 
        /[^a-zA-Z\d]/g) && password.length >= 8){ */
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
   newUser.id = result.insertid;
  return done(null, newUser); 
     
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?',[id]);
    done(null,rows[0]);
});