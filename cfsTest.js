Images = new FS.Collection("cfstest_images", {
      stores: [new FS.Store.GridFS("cfstest_images")]
    });

if (Meteor.isClient) {
  Template.zone.helpers({
    "imageCounter": function() {
      return Images.find().count();
    }
  });
  
  Template.zone.events({
    "click button": function() {
      Meteor.call('dl');
    }
  })
}

if (Meteor.isServer) {
  var dl = function() {
    console.log('start');
    Images.find().forEach(function(item){Images.remove({_id: item._id});});
    Images.insert("https://mongolab.com//base/img/mongolab-logo-215x56.png", function (err, fileObj) {
      //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      if (err) {
        console.log('erreur', err);
        return;
      }
      
      console.log('success');
    });
    console.log('end');  
  };
  
  Meteor.startup(function () {
    dl();
    
    FS.HTTP.mount([
      '/cfs/files/cfstest_images'
      ]);
  });
  
  Meteor.methods({
    "dl": function() {
      dl();
    },
    
    "url": function() {
      var list = Images.findOne();
      console.log(list);
      console.log(list.url({"brokenIsFine": true}));
    }
  })
}
