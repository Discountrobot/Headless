// generate random login data


signup = function() {

  function validateEmail(email) {
  
    $.ajax({
      type: "POST",
      url: "/Signup/IsUserExist",
      dataType: "json",
      data: { "EmailAddress": email }
    }).done(function(data){ 
      if (data !== true) {
        console.log(email);
        location.reload();
      } else { console.log('email is fine'); }
    });
  
  }

  // Danish firstnames
  var firstnames = [
  "aage","abel","agnes","alfred","amalie","anders","andreas","anna","anne","arne","bent","bente","birgit","birgitte","birte","bjarne","bodil","børge","camilla","carl","caroline","cecilie","charlotte","christian","christine","christoffer","clara","daniel","edith","egon","elisabeth","ellen","else","emil","emilie","emma","erik","erna","finn","flemming","frederik","freja","gerda","gitte","gorm","grethe","gudrun","hanne","hans","harald","helene","helle","henning","henrik","henry","holger","ida","inge","ingeborg","inger","ingrid","irene","jacob","jakob","jan","jens","jesper","jette","joachim","johanne","johannes","john","jonas","josefine","julie","jytte","jørgen","kaj","kamilla","karen","karina","karoline","kasper","katrine","kim","kirsten","kirstine","klara","knud","kristian","kristine","kristoffer","kurt","lars","laura","leif","lene","line","lis","lise","lone","louise","lucas","lærke","mads","magnus","maja","malene","marcus","margrethe","maria","marianne","marie","martin","mary","mathias","mathilde","mette","michael","mikkel","mogens","morten","niels","nikolaj","ole","oliver","oluf","otto","ove","paul","peder","per","peter","pia","poul","preben","rasmus","ruth","sebastian","signe","silke","sofie","sten","susanne","svend","søren","thomas","tilnavn","tobias","torben","tove","ulla","valdemar","vibeke","victor","victoria","viggo","åge","åse"];
  
  // danish surnames
  var lastnames = [
    "arendt", "ballin", "bernstorff", "bjørnholt", "bøttger", "bratt",
    "brøgger", "buhr", "bødker", "drescher", "dybdahl", "dybvad", "dyrholm",
    "eichler", "engelstoft", "falch", "frederiksen", "frische", 
    "hansen", "hemmer", "huneke", "hviid", "jensen", "jørgensen", 
    "kampmann", "kjærgaard", "kjærsgaard", "kofoed", "kretz", 
    "kähler", "larsen", "lauridsen", "lund", "monrad", "nielsen", "olsen", 
    "panum", "passer", "pedersen", "prahl", "rasmussen", "reidar", "rohde",
    "solberg", "steen", "strandberg", "sørensen", "teller", "tetens",
    "thomsen", "topsøe", "toubro", "troelsgaard", "tvedebrink", "westerman",
    "westermann", "wilke", "winckler"
  ];
  
  // disposable emails
  var emails = ['email.com'];
  
  Array.prototype.getRandom = function() {
    return this[Math.floor(Math.random() * this.length)];
  };

  var scamble = Math.random().toString(36).substring(10),
      firstname = firstnames.getRandom(),
      lastname = lastnames.getRandom(),
      email = scamble + '@' + emails.getRandom();

  // check if the email domain is blocked
  validateEmail(email); 

  // hijack the submit onclick event
  var submitFunc = $('#submit').attr('onclick');

  $('#submit').removeAttr('onclick').on('click', function() {

    // save the email
    var accounts = localStorage.getItem('goAccounts') && JSON.parse(localStorage.getItem('goAccounts')) || []; 
        accounts.push(email);
        localStorage.setItem('goAccounts', JSON.stringify(accounts));

    // run the original event
    eval(submitFunc); // jshint ignore:line
  });

  // fill out that shit
  $('#FirstName').val(firstname);
  $('#LastName').val(lastname);
  $('#EmailAddress, #RepeatEmailAddress').val(email);
  $('#password, #confirmPassword').val(scamble);
  $('#spnMale').click();
  ConfirmDisclaimer = function() { return true; };
};

// due to the sandboxed nature of chrome extensions, we inject the script via. a <SCRIPT> tag.

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ signup +')();'));
(document.body || document.head || document.documentElement).appendChild(script);

