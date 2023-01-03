function doPost(e) {
    var postData = JSON.parse(e.postData.getDataAsString());
    if(postData.type == 'url_verification') {
      return ContentService.createTextOutput(postData.challenge);
    } else if (
      postData.event.channel_type == 'im'
    ) {
      return reply(postData);
    }
  }
  

  
  function reply(postData){
    var slackUrl = '';//取得したwebhookのURLをここに貼る。
    var contents = postData.event.text;
    var user1 = postData.event.user;
    let date = new Date();
    var dailynumber = date.getDate()
    var user = user1 + dailynumber
    var anonuser1 = MD5(user)
    var anonuser = anonuser1.substr( 0, 5 )
    var message = contents+"("+anonuser+")"
    var messageData = {
      'text': message
    };
  
    var options = {
      'method'  : 'POST',
      'headers' : {'Content-type': 'application/json'},
      'payload' : JSON.stringify(messageData)
    };
  
    return UrlFetchApp.fetch(slackUrl, options); 
  }
  
  
  
  function MD5(input) {
    var rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, input, Utilities.Charset.UTF_8);
    var txtHash = '';
    for (i = 0; i < rawHash.length; i++) {
      var hashVal = rawHash[i];
      if (hashVal < 0) {
        hashVal += 256;
      }
      if (hashVal.toString(16).length == 1) {
        txtHash += '0';
      }
      txtHash += hashVal.toString(16);
    }
    return txtHash;
  }