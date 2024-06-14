const bcrypt =require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../model/Models');


exports.register=async(req,res)=>{
    const {username, email,password}=req.body;
    try {
        const hashedPassword= await bcrypt.hash(password,10);
        await User.create(username,email,hashedPassword );
        res.status(201).json({ message: 'The User is registered successfully'});
    } catch(err){
     res.status(500).json({error:'Error registering the user'});
    }
}

exports.login = async (req, res) => {
    const {email,password}=req.body;
    try {
        const user =await User.findByEmail(email);
        if (!user){
            return res.status(400).json({error:'Invalid credentials'});
        }
        const Mattch = await bcrypt.compare(password, user.password);
        if (!Mattch) {
            return res.status(400).json({ error:'Invalid credentials'}) ;
        }

        const token = jwt.sign({userId: user.id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.json({ token});
    } catch (err) {
        res.status(500).json({error:'Error logging in'});
    }
};

exports.profile= async(req,res)=>{
    try {
    const user = await User.findById(req.user.userId);
        res.json(user);
    } catch (err) {
        res.status(500).json({error:'Error fetching the  user profile'});
    };
};
