/** importing dependencies */


// home page
export const home = async (req, res) =>{
    res.render('index.ejs', {title: 'Home page'})
}
// dashboard page
export const dashboard = async (req, res) =>{
    res.render('dashboard.ejs', {title: 'Dashboard'})
}
// error page
export const error = async (req, res) =>{
    res.render('error.ejs', {title: 'error'})
}
