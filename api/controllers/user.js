module.exports = {


  friendlyName: 'User',


  description: 'User something.',


  inputs: {

  },

  exits: {
    success: {
      viewTemplatePath: 'pages/userprofile'
    }
  },


  fn: async function (inputs) {
    // Find user in db
    // console.log(this.req.session);
    let isAdmin = this.req.session.isAdmin;
    let user = await TestUser.findOne({
       where: { id: this.req.session.userId }
    });

    let pointsBalance = this.req.session.points - this.req.session.reservedPoints;
    // All done.
    return  { user : user, pointsBalance : pointsBalance, isAdmin:isAdmin } ;
  }
};


 