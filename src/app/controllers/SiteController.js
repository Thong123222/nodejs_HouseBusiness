const User = require('../models/user.model');

class SiteController {
    //[GET] /home
    home(req, res, next){
        //PROMISE
        // User.find({})
        //     .then(users => res.render('home'))
        //     .catch(error => next(error))

        res.render('home');
        // res.json(users);
    }

    async register(req, res, next){
        const { name, email, phone, password } = req.body;

        try {    
            // Tạo người dùng mới
            const newUser = new User({
                name: name,
                email: email,
                phone: phone,
                password: password,
            });
    
            await newUser.save();
            res.render('home');
        } catch (err) {
            console.log(err);
            res.status(500).send("Có lỗi xảy ra trong quá trình đăng ký.");
        }
    }
}

module.exports = new SiteController();