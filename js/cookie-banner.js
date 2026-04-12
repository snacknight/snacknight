(function () {
  var COOKIE_KEY = 'sn_cookie_consent';

  // Check if visitor has already made a choice
  var consent = localStorage.getItem(COOKIE_KEY);
  if (consent === null) {
    document.getElementById('sn-cookie-banner').style.display = 'block';
  } else if (consent === 'accepted') {
    onAccept();
  }

  window.snCookieAccept = function () {
    localStorage.setItem(COOKIE_KEY, 'accepted');
    document.getElementById('sn-cookie-banner').style.display = 'none';
    onAccept();
  };

  window.snCookieDecline = function () {
    localStorage.setItem(COOKIE_KEY, 'declined');
    document.getElementById('sn-cookie-banner').style.display = 'none';
  };

  function onAccept() {
    // ---------------------------------------------------------
    // ADD YOUR ANALYTICS / TRACKING SCRIPTS HERE
    // This runs when the visitor accepts cookies,
    // or on return visits if they previously accepted.
    //
    // Example — Google Analytics:
    //
    // var script = document.createElement('script');
    // script.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX';
    // script.async = true;
    // document.head.appendChild(script);
    // script.onload = function() {
    //   window.dataLayer = window.dataLayer || [];
    //   function gtag(){dataLayer.push(arguments);}
    //   gtag('js', new Date());
    //   gtag('config', 'G-XXXXXXX');
    // };
    //
    // Example — Vercel Analytics:
    //
    // var script = document.createElement('script');
    // script.src = '/_vercel/insights/script.js';
    // script.defer = true;
    // document.head.appendChild(script);
    // ---------------------------------------------------------
  }
})();