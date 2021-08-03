if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
const port =  process.env.PORT || 3000
const secret = process.env.SECRET || 'thisIsTheSecret'

//framework
const express = require('express')
const path = require('path')
//to get another method to forms (put,delete..)
const methodOverride = require('method-override')
//db
const mongoose = require('mongoose')

//logging
const morgan = require('morgan')
//to use ejs templates
const ejsMate = require('ejs-mate')
//const catchAsync = require('./utils/catchAsync')
//const ExpressError = require('./utils/ExpressError')
//data validations
//const Validators = require('./validateSchemas/index')
//routes
const baseRoutes = require('./routes/base')
const duplicitiesRoutes = require('./routes/duplicities')
const formatRoutes = require('./routes/format')
const logicRoutes = require('./routes/logic')
const sculptureRoutes = require('./routes/sculpture')
const usersRoutes = require('./routes/users')
//session control
const session = require('express-session');
const MongoStore = require('connect-mongo');
//flashing messages
const flash = require('connect-flash')
//authenitifcation
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/users');
//to prevent mongo injection
const mongoSanitize = require('express-mongo-sanitize');
//protection
const helmet = require('helmet')

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/nostress-office'
//const dbUrl = 'mongodb://localhost:27017/yelp-camp'
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}
    )
const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'))
db.once('open', () =>{
    console.log('database connected')
})

const app = express()

//to accept api calls
app.use(express.urlencoded({extended:true}))
//method overide 
app.use(methodOverride('_method'))
app.use(mongoSanitize());

//cookies
const store = MongoStore.create({
    mongoUrl: dbUrl,
    toutchAfter: 24 * 3600,
    crypto: {
        secret: secret,
    }  
})

store.on('error', function(e){
    console.log('SESSION ERROR', e)
})


const sessionConfig = {
    store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
       // to work only when https
       // secure: true,
        maxAge : (1000*3600*24*7),
    }
}
app.use(session(sessionConfig))

//auth
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
//needed to add for new version 
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//flash
app.use(flash())
app.use((req, res, next) =>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

/**
 * security layer
 */
/* app.use(helmet( { contentSecurityPolicy: false } ) ) */

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/",
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
/* app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/simon-zajicek/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
                "https://source.unsplash.com/"
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
); */




//router
app.use('/',baseRoutes)
app.use('/duplicities',duplicitiesRoutes)
app.use('/format',formatRoutes)
app.use('/logic',logicRoutes)
app.use('/sculpture',sculptureRoutes)
app.use('/users',usersRoutes)

app.use(express.static('public'))








app.engine('ejs',ejsMate)
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


app.get('/', (req, res) => {
    res.render('homepage')
    //res.send('yup 2')
})

/**
 * 404 route
 */

app.all('*',(req,res,next) =>{
    next(new ExpressError('Page not Found', 404))

})

/**
 * error handler
 */
app.use((err,req,res,next) =>{
    const {statusCode = 500, message = 'Something went wrong'} = err
    res.status(statusCode).render('general/error',{err})

})



app.listen(port, () => {
    console.log(`starting app ${port}`)
    console.log(process.env.BASE_URL)
})