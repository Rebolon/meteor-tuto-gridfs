Images = new FS.Collection("cfstest_images", {
      stores: [new FS.Store.GridFS("cfstest_images")]
    });

if (Meteor.isClient) {
  zone.helpers({
    "imageCounter": Images.find().count()
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log('start');
    Images.insert("https://mongolab.com//base/img/mongolab-logo-215x56.png", function (err, fileObj) {
      //Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
      if (err) {
        console.log('erreur', err);
        return;
      }
      
      console.log('success');
    });
    console.log('end');
  });
}
