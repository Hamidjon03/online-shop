const moment = require('moment');

const hbsHelper = (handlebars) => {
  handlebars.registerHelper('formatDate', function(dateString){
    return new handlebars.SafeString(
      moment(dateString).format("DD.MM.YYYY").toUpperCase()
    );
  })

  handlebars.registerHelper('paginate', require('handlebars-paginate'))
}

module.exports = hbsHelper