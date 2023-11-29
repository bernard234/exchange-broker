
const jwt = require('jsonwebtoken')
const Deposit = require("../Model/depositSchema");
const User = require("../Model/User");
const Widthdraw = require("../Model/widthdrawSchema");
const nodemailer = require('nodemailer');
// const bcrypt = require('bcrypt');


const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '', };

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}


const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'piuscandothis', {
    expiresIn: maxAge
  });
};


module.exports.loginAdmin_post = async(req, res) =>{
  try {
    const { email, password } = req.body;

    const user = await User.findOne({email: email});

    if(user){
    const passwordMatch = await (password, user.password);

    if (passwordMatch) {
      
      if(!user.role == "admin"){
        res.render('login', handleErrors('Email and password is incorrect') )
      }else{
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
      }
      
    } else {
      res.render('login', handleErrors() )
    }
    } else{
      res.render('login',handleErrors() )
    }
    
  } catch (error) {
    console.log(error)
  }
    
}




module.exports.adminPage = async(req, res) =>{
        let perPage = 100;
        let page = req.query.page || 1;
    
        try {
          const user = await User.aggregate([ { $sort: { createdAt: -1 } } ])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec(); 
          // const count = await User.count();
    
          res.render('adminDashboard', {
            user,
            current: page,
            pages: Math.ceil( perPage),
          });
    
        } catch (error) {
          console.log(error);
        } 
    } 


module.exports.viewUser = async(req, res) =>{
    try {
        const user = await User.findOne({ _id: req.params.id })
    
    
        res.render('viewUser', {
          user
        })
    
      } catch (error) {
        console.log(error);
      }
    
    }
  

module.exports.editUser = async(req, res) =>{
    try {
        const user = await User.findOne({ _id: req.params.id })
    
        res.render('editUser', {
          user
        })
    
      } catch (error) {
        console.log(error);
      }
}

const sendEmail = async ( fullname,email, available,  balance, bonus, widthdrawBalance,profit,totalDeposit,totalWidthdraw,signal,verifiedStatus,level ) =>{
    
  try {
  const transporter =  nodemailer.createTransport({
    host: 'mail.lyron-trades.com',
    port:  465,
    auth: {
        user: 'lyrontra',
        // pass: 'dstJfTV7KfC9RB7'
        pass: 'hy&a1![1I~pQ' 
    }

    });
    const mailOptions = {
      from:'lyrontra@lyron-trades.com',
      to:email,
      subject: 'Dashboard Update',
      html: `<p>Hello  ${fullname},<br>Here are your availabe balances and your trading account status.<br>
      login to see your dashboard:<br>Email:${email}<br>Available balance: ${available}<br>Deposit Balance: ${balance}<br>Bonus:${bonus}<br>Widthdrawal Balance: ${widthdrawBalance}<br>Account Profit:${profit}<br>Total Deposit:${totalDeposit}<br>TTotal Widthdraw: ${totalWidthdraw}<br> Account Signals:${signal}<br> Verification status: ${verifiedStatus}<br>Account Level: ${level}You can login here: https://maxtrade-exchange/login<br>.<br>Thank you.</p>`
  }
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
        console.log(error);
        res.send('error');
    }else{
        console.log('email sent: ' + info.response);
        res.send('success')
    }
})

// Hello Pius,

// Thank you for registering on our site.

// Your login information:

// Login: Matera 
// Password: 000000

// You can login here: https://masi-trades.org/

// Contact us immediately if you did not authorize this registration.

// Thank you.

  } catch (error) {
    console.log(error.message);
  }
}

module.exports.editUser_post = async(req, res) =>{
    try {
        await User.findByIdAndUpdate(req.params.id,{
          fullname: req.body.fullname,
          country: req.body.country,
          gender: req.body.gender,
          tel: req.body.tel,
          email: req.body.email,
          available: req.body.available,
          bonus: req.body.bonus,
          balance: req.body.balance,
          widthdrawBalance: req.body.widthdrawBalance,
          profit: req.body.profit,
          totalDeposit: req.body.totalDeposit,
          totalWidthdraw: req.body.totalWidthdraw,
          notification: req.body.notification,
          signal:req.body.signal,
          verifiedStatus:req.body.verifiedStatus,
          level:req.body.level,
          updatedAt: Date.now()
        });
        if(User){
          sendEmail(req.body.fullname,req.body.email, req.body.available, req.body.balance, req.body.bonus,req.body.widthdrawBalance, req.body.profit, req.body.totalDeposit,req.body.totalWidthdraw,req.body.signal, req.body.verifiedStatus,req.body.level )
        }else{
          console.log(error);
        }
        await res.redirect(`/editUser/${req.params.id}`);
        
        console.log('redirected');
      } catch (error) {
        console.log(error);
      }
    
}
// module.exports.editUser_post = async(req, res) =>{
//     try {
//         await User.findByIdAndUpdate(req.params.id,{
//           fullname: req.body.fullname,
//           country: req.body.country,
//           gender: req.body.gender,
//           tel: req.body.tel,
//           email: req.body.email,
//           available: req.body.available,
//           bonus: req.body.bonus,
//           balance: req.body.balance,
//           widthdrawBalance: req.body.widthdrawBalance,
//           updatedAt: Date.now()
//         });
//         await res.redirect(`/editUser/${req.params.id}`);
        
//         console.log('redirected');
//       } catch (error) {
//         console.log(error);
//       }
    
// }

module.exports.deletePage = async(req, res) =>{
    try {
        await User.deleteOne({ _id: req.params.id });
        res.redirect("/adminRoute")
      } catch (error) {
        console.log(error);
      }
}

module.exports.allDeposit = async(req, res) =>{
    let perPage = 100;
    let page = req.query.page || 1;

    try {
      const deposit = await Deposit.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      // const count = await Deposit.count();

      res.render('allFunding', {
        deposit,
        current: page,
        pages: Math.ceil( perPage),
      });

    } catch (error) {
      console.log(error);
    } 
}

module.exports.viewDeposit = async(req, res) =>{
    try {
        const deposit = await Deposit.findOne({ _id: req.params.id })
    
        res.render('viewDeposits', {
          deposit
        })
    
      } catch (error) {
        console.log(error);
      }

}

module.exports.editDeposit = async(req, res) =>{
    try {
        const deposit = await Deposit.findOne({ _id: req.params.id })
    
        res.render('editDeposit', {
          deposit
        })
    
      } catch (error) {
        console.log(error);
      }
  
}

module.exports.editDeposit_post  = async(req, res) =>{
    try {
        await Deposit.findByIdAndUpdate(req.params.id,{
          wallet: req.body.wallet,
          amount: req.body.amount,
          status: req.body.status,
          updatedAt: Date.now()
        });
        await res.redirect(`/editDeposit/${req.params.id}`);
        
        console.log('redirected');
      } catch (error) {
        console.log(error);
      }
    
}

module.exports.deleteDeposit = async(req, res) =>{
    try {
        await Deposit.deleteOne({ _id: req.params.id });
        res.redirect("/adminRoute")
      
    } catch (error) {
        console.log(error)
    }
    
}

module.exports.allWidthdrawal = async(req, res) =>{
    let perPage = 100;
    let page = req.query.page || 1;

    try {
      const widthdraw = await Widthdraw.aggregate([ { $sort: { createdAt: -1 } } ])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec(); 
      // const count = await Widthdraw.count();

      res.render('allWidthdrawals', {
        widthdraw,
        current: page,
        pages: Math.ceil( perPage),
      });

    } catch (error) {
      console.log(error);
    } 
}


module.exports.viewWidthdrawal = async(req, res) =>{
    try {
        const widthdraw = await Widthdraw.findOne({ _id: req.params.id })
    
        res.render('viewWidthdrawals', {
          widthdraw
        })
    
      } catch (error) {
        console.log(error);
      }
}


module.exports.editWidthdrawal = async(req, res) =>{
    try {
        const widthdraw = await Widthdraw.findOne({ _id: req.params.id })
    
        res.render('editWidthdrawals', {
            widthdraw
        })
    
      } catch (error) {
        console.log(error);
      }
}

module.exports.editWidthdrawal_post = async(req, res) =>{
    try {
        await Widthdraw.findByIdAndUpdate(req.params.id,{
          wallet: req.body.wallet,
          amount: req.body.amount,
          status: req.body.status,
          updatedAt: Date.now()
        });
        await res.redirect(`/editWidthdrawals/${req.params.id}`);
        
        console.log('redirected');
      } catch (error) {
        console.log(error);
      }
    
}

module.exports.deleteWidthdraw = async(req, res) =>{
    try {
        await Widthdraw.deleteOne({ _id: req.params.id });
        res.redirect("/adminRoute")
      
    } catch (error) {
        console.log(error)
    }
}

