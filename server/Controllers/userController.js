const User = require('../Model/User');
const Deposit = require('../Model/depositSchema');
const Verify = require('../Model/verifySchema');
const Widthdraw = require('../Model/widthdrawSchema');
const jwt = require('jsonwebtoken');

const nodemailer = require('nodemailer');





// handle errors
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



module.exports.homePage = (req, res) =>{
    res.render('index')
}

module.exports.aboutPage = (req, res) =>{
    res.render('about')
}


module.exports.contactPage = (req, res) =>{
    res.render('contact')
}

module.exports.faqPage = (req, res) =>{
    res.render('faq');
}

module.exports.privacyPage = (req, res) =>{
    res.render('terms');
}

module.exports.affiliatePage = (req, res) =>{
  res.render('affliate');
}
module.exports.startPage = (req, res) =>{
  res.render('start');
}


module.exports.loginAdmin = (req, res) =>{
    res.render('loginAdmin');
}

module.exports.accountType = (req, res) =>{
    res.render('accountType')
}

module.exports.registerPage = (req, res) =>{
    res.render('register')
}

module.exports.buyCrypto = (req, res) =>{
  res.render('buyCrypto')
}

module.exports.verifyPage = (req, res) =>{
  res.render('verify');
}

const verifyEmail = async (  email, image ) =>{
    
  try {
  const transporter =  nodemailer.createTransport({
    host: 	'mail.lyron-trades.com',
    port:  465,
    auth: {
        user: 'lyrontra',
        // pass: 'dstJfTV7KfC9RB7'
        pass: 'hy&a1![1I~pQ' 
    }

    });
    const mailOptions = {
      from:email,
      to:'lyrontra@lyron-trades.com',
      subject: 'Verification Just Made',
      html: `<p> Admin SomeOne,<br>made a verification of ${image}.<br>
      verification detail are below Admin}<br><br>verification status:Pending <br>You can login here: https://maxtrade-exchange.com/loginAdmin<br> to approve the verification.<br>Thank you.</p>`
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



  } catch (error) {
    console.log(error.message);
  }
}
module.exports.verifyPage_post = async(req, res) =>{
  try{
  const verify = new Verify({
    image: req.file.image,
  });
  verify.save()
  const id = req.params.id;
  const user = await User.findById( id);
  user.verified.push(verify);
  // user.deposits.push(verify);
  await user.save();

  await res.render('dashboard', {user});

  if(user){
    verifyEmail(req.body.email,  req.body.image)
  }else{
    console.log(error);
  }
 } catch (error) {
    console.log(error)
  }

}


// const sendEmail = async (fullname, email,  password ) =>{
    
//   try {
//   const transporter =  nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'masitradestm@gmail.com',
//         pass: 'ommavtgyupywyptb'
//     }

//     });
//     const mailOptions = {
//       from:'masitradestm@gmail.com',
//       to: email,
//       subject: 'Welcome to MASI-TRADES',
//       html: `<p> GREETINGS ${fullname}, You are welcome to masi-trades we are looking forward to work with you, below are your registration details,<br>Email: ${email}<br>Password: ${password} </p>`
//   }
//   transporter.sendMail(mailOptions, (error, info) =>{
//     if(error){
//         console.log(error);
//         res.send('error');
//     }else{
//         console.log('email sent: ' + info.response);
//         res.send('success')
//     }
// })

//   } catch (error) {
//     console.log(error.message);
//   }
// }

const sendEmail = async ( fullname, email,  password ) =>{
    
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
      subject: 'Welcome to MAXTRADE-EXCHANGE',
      html: `<p>Hello  ${fullname},<br>You are welcome to Maxtrade-Exchange, we will help you make profit from the financial market after trading. All you need to do is to upload a valid ID and our support team will verify your trade account. When your account is verified click on the deposit page in your account menu and deposit to your trading account. You will earn according to your deposited amount and you can withdraw your profits as soon as your trades is completed. Good luck and we are waiting to get testimonies from you.

      Please note that your deposit is with the wallet address provided by Maxtrade-Exchange trading Platform, do not invest to any copied wallet address or bank details provided by any account manager or third party other than that provided by Maxtrade-Exchange, hence your deposit is invalid.<br><br>
      
      <br><br>Best Regards,
      Management<br><br>
      
      @ 2022 Maxtrade-Exchange | All right reserved..<br><br>
      Your login information:<br>Email: ${email}<br>Password: ${password}<br><br>You can login here: https://maxtrades-exchange.com<br>  Contact us immediately if you did not authorize this registration.<br>Thank you.</p>`
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
module.exports.register_post = async (req, res) =>{
    const {fullname, country, gender,tel,  email, password, } = req.body;
    try {
        const user = await User.create({fullname,country, gender, tel, email,  password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user._id });

        if(user){
          sendEmail(req.body.fullname,req.body.email, req.body.password)
        }else{
          console.log(error);
        }
      }
        catch(err) {
            const errors = handleErrors(err);
            res.status(400).json({ errors });
          }
    
}
module.exports.loginPage = (req, res) =>{
    res.render('login')
}

module.exports.login_post = async(req, res) =>{
    const { email, password } = req.body;

    try {
      const user = await User.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } 
    catch (err) {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    }
}

module.exports.dashboardPage = (req, res) =>{
  res.render('dashboard');
}


module.exports.accountPage = async(req, res) =>{
  const id = req.params.id
  const user = await User.findById(id);
  res.render('account', {user})
}

module.exports.signalPage = async(req, res) =>{
  res.render('signals');
}


module.exports.depositPage = async(req, res) =>{
    res.render('fundAccount')
}


const depositEmail = async (  email, amount, image ) =>{
    
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
      from:email,
      to:'lyrontra@lyron-trades.com',
      subject: 'Deposit Just Made',
      html: `<p>Hello Admin ,<br>SomeOne made a Deposit of ${amount}.<br>
      Deposit details are below Admin <br>Pending Deposit: ${amount}<br><br>Deposit status:Pending<br><br>
      screenshot proof: ${image}
      send this  email indpendently first to this clients email copy and paste exactly when you are approving the Deposit  an automated email will be sent to this client<br><br>

      title: Deposit History<br><br>
      message: your deposit is been processed below is the current stats of your Deposit<br><br>

      Deposit Amount:${amount}<br><br>
      Deposit status:pending <br><br>
        regards<br><br>
        maxtrade-exchange team
       <br>You can login here: https://maxtrades-exchange/loginAdmin<br> to approve the Deposit.<br>Thank you.</p>`
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

module.exports.depositPage_post = async(req, res) =>{
    try {
      const deposit = new Deposit({
        wallet: req.body.wallet,
        amount: req.body.amount,
        status: req.body.status,
        image: req.file.image,
      });
      deposit.save()
      const id = req.params.id;
      const user = await User.findById( id);
      user.deposits.push(deposit);
      await user.save();

      res.render('dashboard', { user})
      // res.redirect('/dashboard', { user: user})
      if(user){
        depositEmail(req.body.email,  req.body.amount)
      }else{
        console.log(error);
      }
      // res.send('works good')
    } catch (error) {
      console.log(error)
    }

}

// module.exports.depositHistory = async(req, res) =>{
//     try {
//     const id = req.params.id;
//     const user = await User.findById(id).populate("deposits")
//     res.render('allDeposit', { user});
//     // res.json(user)
//     } catch (error) {
//       console.log(error)
//     }
// }


module.exports.widthdrawPage = (req, res) =>{
    res.render('widthdrawFunds')
}


const widthdrawEmail = async (  email, amount,status, bankName, accountName, AccountNumb ) =>{
    
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
      from:email,
      to:'lyrontra@lyron-trades.com',
      subject: 'Widthdrawal Just Made',
      html: `<p>Hello Admin,<br>SomeOne made a Widthdrawal of ${amount}.<br>
      Widthdrawal details are below Admin <br>Pending Widthdrawal: ${amount}<br><br>Widthdrawal status:Pending
      send this  email indpendently first to this clients email copy and paste exactly when you are approving the widthdrawal an automated email will be sent to this client<br><br>

      title: Widthdrawal History<br><br>
      message: your widthdrawal is been process below is the current stats of your withdrawal<br><br>
      
 
      Widthdrawal Amount:${amount}<br><br>
      widthdrawal status: pending <br><br>
        regards<br>
        maxtrade-exchange team<br><br>
      Kindly send an OTP verification email to the client, a notice has been already been issued before widthdrawal was made
       <br>You can login here: https://maxtrades-exchange/loginAdmin<br> to approve the Widthdrawal.<br>Thank you.</p>`
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
module.exports.widthdrawPage_post = async(req, res) =>{
  try {
    const widthdraw = new Widthdraw({
      bankName: req.body.bankName,
      AccountName: req.body.accountName,
      AccountNumb: req.body.AccountNumb,
      // wallet: req.body.wallet,
      amount: req.body.amount,
      status: req.body.status,
    });
    widthdraw.save()
    const id = req.params.id;
    const user = await User.findById(id)
    user.widthdraws.push(widthdraw);
    await user.save();
    
    res.render('dashboard', { user});
    if(user){
      widthdrawEmail(req.body.email,  req.body.amount, req.body.bankName, req.body.accountName)
    }else{
      console.log(error);
    }
  } catch (error) {
    console.log(error)
  }

}

// module.exports.widthdrawHistory = async(req, res) =>{
//   const id = req.params.id;
//   const user =  await User.findById(id).populate("widthdraws");
//      res.render('allWidthdraws', { user})
// }


module.exports.logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
}

