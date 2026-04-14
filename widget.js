(function () {
  var API_URL            = '__API_URL__';
  var CLIENT_LOGO        = '__CLIENT_LOGO_URL__';
  var CLIENT_NAME        = '__CLIENT_NAME__';
  var CLIENT_PHONE       = '__CLIENT_PHONE__';
  var CLIENT_EMAIL       = '__CLIENT_EMAIL__';
  var CLIENT_PRIVACY_URL = '__CLIENT_PRIVACY_URL__';

  var displayName = CLIENT_NAME || 'Chat with Us';

  /* ── Styles ─────────────────────────────────────────────────────────── */
  var style = document.createElement('style');
  style.textContent = [
    '#ae-chat-btn {',
    '  position:fixed; bottom:28px; right:28px;',
    '  width:60px; height:60px;',
    '  background:#007994; border-radius:50%;',
    '  cursor:pointer; display:flex;',
    '  align-items:center; justify-content:center;',
    '  box-shadow:0 4px 16px rgba(0,0,0,0.18);',
    '  z-index:99999; border:none; transition:transform 0.2s;',
    '}',
    '#ae-chat-btn:hover { transform:scale(1.08); }',
    '#ae-chat-panel {',
    '  position:fixed; bottom:100px; right:28px;',
    '  width:410px; background:white;',
    '  border-radius:16px; display:none; flex-direction:column;',
    '  box-shadow:0 8px 32px rgba(0,0,0,0.18);',
    '  z-index:99999; overflow:hidden;',
    '  max-height:calc(100vh - 130px);',
    '  font-family:-apple-system,BlinkMacSystemFont,sans-serif;',
    '}',
    '#ae-chat-header {',
    '  background:#007994; color:white;',
    '  padding:24px 18px;',
    '  display:flex; align-items:center; justify-content:space-between; flex-shrink:0;',
    '}',
    '#ae-header-left { display:flex; align-items:center; gap:12px; }',
    '#ae-client-logo {',
    '  height:80px; width:auto; max-width:160px;',
    '  object-fit:contain; border-radius:6px; background:white; padding:2px 6px;',
    '}',
    '#ae-client-name { font-weight:700; font-size:22px; }',
    '#ae-chat-close { cursor:pointer; font-size:22px; line-height:1; }',
    /* ── Chat view ── */
    '#ae-chat-view { display:flex; flex-direction:column; flex:1; min-height:0; overflow:hidden; }',
    '#ae-privacy-notice {',
    '  background:#f0f9ff; border-bottom:1px solid #bae6fd;',
    '  padding:10px 16px; font-size:13px; color:#0c4a6e; line-height:1.5; flex-shrink:0;',
    '}',
    '#ae-privacy-notice a { color:#0369a1; }',
    '#ae-chat-messages {',
    '  flex:1; min-height:0; overflow-y:scroll; padding:16px;',
    '  display:flex; flex-direction:column; gap:12px;',
    '  -webkit-overflow-scrolling:touch; overscroll-behavior:contain;',
    '}',
    '.ae-msg {',
    '  padding:11px 15px; border-radius:12px;',
    '  font-size:14px; line-height:1.55; max-width:88%;',
    '}',
    '.ae-msg.user {',
    '  background:#007994; color:white;',
    '  align-self:flex-end; border-radius:12px 12px 4px 12px;',
    '}',
    '.ae-msg.assistant {',
    '  background:#f1f5f9; color:#1e293b;',
    '  align-self:flex-start; border-radius:12px 12px 12px 4px;',
    '}',
    '#ae-chat-typing {',
    '  color:#94a3b8; font-size:13px;',
    '  padding:0 16px 8px; display:none;',
    '}',
    '#ae-chat-input-row {',
    '  display:flex; padding:12px; border-top:1px solid #e2e8f0; gap:8px; flex-shrink:0;',
    '}',
    '#ae-chat-input {',
    '  flex:1; border:1px solid #e2e8f0; border-radius:10px;',
    '  padding:10px 14px; font-size:14px; outline:none;',
    '  resize:none; font-family:inherit;',
    '}',
    '#ae-chat-send {',
    '  background:#007994; color:white; border:none;',
    '  border-radius:10px; padding:10px 18px;',
    '  cursor:pointer; font-size:14px; font-weight:600;',
    '}',
    '#ae-chat-send:hover { background:#006880; }',
    '#ae-chat-send:disabled { opacity:0.5; cursor:not-allowed; }',
    '#ae-scroll-btns {',
    '  display:flex; justify-content:flex-end; gap:6px;',
    '  padding:4px 12px; border-top:1px solid #e2e8f0; flex-shrink:0;',
    '}',
    '.ae-scroll-btn {',
    '  background:#f1f5f9; border:1px solid #e2e8f0; border-radius:6px;',
    '  padding:2px 14px; cursor:pointer; font-size:15px; color:#64748b; line-height:1.6;',
    '}',
    '.ae-scroll-btn:hover { background:#e2e8f0; }',
    /* ── Footer ── */
    '#ae-chat-footer {',
    '  display:flex; flex-direction:column; align-items:stretch;',
    '  border-top:1px solid #e2e8f0; background:#f8fafc; flex-shrink:0;',
    '}',
    '#ae-action-buttons {',
    '  display:flex; flex-direction:row; gap:8px;',
    '  padding:16px 16px 8px;',
    '}',
    '.ae-action-btn {',
    '  flex:1; display:flex; align-items:center; justify-content:center; gap:8px;',
    '  padding:12px 8px; border-radius:10px;',
    '  background:#f1f5f9; color:#1e293b;',
    '  text-decoration:none; font-size:13px; font-weight:500;',
    '  border:1px solid #e2e8f0; transition:background 0.15s; cursor:pointer;',
    '}',
    '.ae-action-btn:hover { background:#e2e8f0; }',
    '.ae-action-icon { font-size:16px; }',
    '#ae-qa-branding {',
    '  display:flex; flex-direction:column; align-items:center;',
    '  padding:12px 24px 16px;',
    '}',
    '#ae-qa-logo { height:44px; width:auto; opacity:0.90; }',
    '#ae-qa-logo-link { display:flex; align-items:center; }',
    '#ae-powered { font-size:12px; color:#64748b; margin-top:4px; font-weight:500; }',
    /* ── Callback view ── */
    '#ae-callback-view { display:none; flex-direction:column; flex:1; min-height:0; overflow:hidden; }',
    '#ae-callback-header {',
    '  display:flex; align-items:center; gap:12px;',
    '  padding:14px 16px; border-bottom:1px solid #e2e8f0; flex-shrink:0;',
    '}',
    '#ae-callback-back {',
    '  background:none; border:none; cursor:pointer;',
    '  color:#007994; font-size:14px; font-weight:600; padding:4px 0;',
    '}',
    '#ae-callback-title { font-size:24px; font-weight:700; color:#1e293b; }',
    '#ae-callback-body {',
    '  padding:16px; display:flex; flex-direction:column; gap:12px;',
    '  flex:1; min-height:0; overflow-y:auto; -webkit-overflow-scrolling:touch;',
    '}',
    '#ae-callback-desc { font-size:15px; color:#334155; margin:0; }',
    '.ae-cb-row { display:flex; gap:10px; }',
    '.ae-cb-row .ae-cb-input { flex:1; min-width:0; }',
    '.ae-cb-input, .ae-cb-textarea {',
    '  width:100%; box-sizing:border-box;',
    '  border:1px solid #e2e8f0; border-radius:8px;',
    '  padding:10px 12px; font-size:13px; font-family:inherit; outline:none;',
    '  background:white; color:#1e293b;',
    '}',
    '.ae-cb-textarea { resize:vertical; min-height:80px; }',
    '#ae-cb-text-label { font-size:13px; color:#64748b; margin:0; }',
    '#ae-cb-text-group { display:flex; gap:8px; }',
    '.ae-cb-radio-opt {',
    '  flex:1; padding:10px 8px; border:1.5px solid #e2e8f0; border-radius:8px;',
    '  font-size:13px; color:#64748b; cursor:pointer; background:white;',
    '  text-align:center; font-family:inherit; transition:all 0.15s;',
    '}',
    '.ae-cb-radio-opt.ae-selected { background:#007994; color:white; border-color:#007994; font-weight:600; }',
    '#ae-cb-disclaimer { font-size:12px; color:#64748b; line-height:1.5; margin:0; }',
    '#ae-cb-disclaimer a { color:#007994; }',
    '.ae-cb-send-row { display:flex; justify-content:flex-end; }',
    '#ae-cb-send {',
    '  background:#007994; color:white; border:none;',
    '  border-radius:10px; padding:11px 28px;',
    '  cursor:pointer; font-size:14px; font-weight:600;',
    '}',
    '#ae-cb-send:hover { background:#006880; }',
    '#ae-cb-send:disabled { opacity:0.5; cursor:not-allowed; }',
    '@media (max-width:480px) {',
    '  #ae-chat-panel {',
    '    position:fixed; inset:0; width:100%; height:100%;',
    '    border-radius:0; bottom:0; right:0; max-height:100%;',
    '  }',
    '  #ae-chat-btn { bottom:16px; right:16px; }',
    '}'
  ].join(' ');
  document.head.appendChild(style);

  /* ── Privacy notice text ────────────────────────────────────────────── */
  var privacyLinkOpen  = CLIENT_PRIVACY_URL ? '<a href="' + CLIENT_PRIVACY_URL + '" target="_blank">' : '<span>';
  var privacyLinkClose = CLIENT_PRIVACY_URL ? '</a>' : '</span>';
  var privacyNoticeHtml =
    '<div id="ae-privacy-notice">' +
      'By using this chat, you agree to our collection and processing of conversation data in accordance with our ' +
      privacyLinkOpen + 'Privacy Policy' + privacyLinkClose + '.' +
    '</div>';

  /* ── Callback form disclaimer ───────────────────────────────────────── */
  var cbPrivLink = CLIENT_PRIVACY_URL
    ? '<a href="' + CLIENT_PRIVACY_URL + '" target="_blank">Privacy Policy</a>'
    : 'Privacy Policy';
  var cbDisclaimer =
    'By submitting this form, you acknowledge and agree to our ' + cbPrivLink +
    ' and Acceptable Use Policy. If you choose to receive text messages, you agree to receive texts from ' +
    displayName + ' related to your inquiry. Message frequency varies. Msg &amp; data rates may apply. ' +
    'Reply STOP to opt out or HELP for help. Consent to receive text messages is not required to submit this form or receive services.';

  /* ── Build header HTML ──────────────────────────────────────────────── */
  var logoHtml = CLIENT_LOGO
    ? '<img id="ae-client-logo" src="' + CLIENT_LOGO + '" alt="">'
    : '';
  var headerHtml =
    '<div id="ae-chat-header">' +
      '<div id="ae-header-left">' +
        logoHtml +
        '<span id="ae-client-name">' + displayName + '</span>' +
      '</div>' +
      '<span id="ae-chat-close">&#x2715;</span>' +
    '</div>';

  /* ── Build action buttons (always shown) ────────────────────────────── */
  var actionHtml = '<div id="ae-action-buttons">';
  if (CLIENT_PHONE) {
    actionHtml +=
      '<a href="tel:' + CLIENT_PHONE + '" id="ae-call-btn" class="ae-action-btn">' +
        '<span class="ae-action-icon">&#128222;</span>Call Us' +
      '</a>';
  }
  if (CLIENT_EMAIL) {
    actionHtml +=
      '<a href="mailto:' + CLIENT_EMAIL + '" class="ae-action-btn">' +
        '<span class="ae-action-icon">&#9993;</span>Email' +
      '</a>';
  }
  actionHtml +=
    '<button class="ae-action-btn" id="ae-callback-btn">' +
      '<span class="ae-action-icon">&#128203;</span>Request a Callback' +
    '</button>';
  actionHtml += '</div>';

  /* ── Footer: action buttons + QA branding ──────────────────────────── */
  var footerHtml =
    '<div id="ae-chat-footer">' +
      actionHtml +
      '<div id="ae-qa-branding">' +
        '<a id="ae-qa-logo-link" href="https://qadigitalads.com/en/home/" target="_blank" rel="noopener">' +
          '<img id="ae-qa-logo" src="' + API_URL + '/qa-logo.png" alt="QA Digital">' +
        '</a>' +
        '<span id="ae-powered">Powered by QA Digital</span>' +
      '</div>' +
    '</div>';

  /* ── Callback form view ─────────────────────────────────────────────── */
  var callbackViewHtml =
    '<div id="ae-callback-view">' +
      '<div id="ae-callback-header">' +
        '<button id="ae-callback-back">&#8592; Back</button>' +
        '<span id="ae-callback-title">Request a Callback</span>' +
      '</div>' +
      '<div id="ae-callback-body">' +
        '<p id="ae-callback-desc">Please enter your name, phone number, and any details you\'d like to mention.</p>' +
        '<div class="ae-cb-row">' +
          '<input class="ae-cb-input" id="ae-cb-first" type="text" placeholder="First Name*">' +
          '<input class="ae-cb-input" id="ae-cb-last" type="text" placeholder="Last Name*">' +
        '</div>' +
        '<input class="ae-cb-input" id="ae-cb-phone" type="tel" placeholder="Phone Number*">' +
        '<p id="ae-cb-text-label">Can we text you?</p>' +
        '<div id="ae-cb-text-group">' +
          '<button type="button" class="ae-cb-radio-opt" data-val="yes" onclick="aeCbSelect(this)">Yes, text me</button>' +
          '<button type="button" class="ae-cb-radio-opt" data-val="no" onclick="aeCbSelect(this)">No, don\'t text me</button>' +
        '</div>' +
        '<textarea class="ae-cb-textarea" id="ae-cb-message" placeholder="Message (optional)"></textarea>' +
        '<p id="ae-cb-disclaimer">' + cbDisclaimer + '</p>' +
        '<div class="ae-cb-send-row"><button id="ae-cb-send">Send</button></div>' +
      '</div>' +
    '</div>';

  /* ── Assemble widget ────────────────────────────────────────────────── */
  var container = document.createElement('div');
  container.innerHTML =
    '<button id="ae-chat-btn" aria-label="Chat with us">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="white">' +
        '<path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H6l-2 2V4h16v10z"/>' +
      '</svg>' +
    '</button>' +
    '<div id="ae-chat-panel">' +
      headerHtml +
      '<div id="ae-chat-view">' +
        privacyNoticeHtml +
        '<div id="ae-chat-messages">' +
          '<div class="ae-msg assistant">Hello! Welcome to ' + displayName + '. How can I help you today?</div>' +
        '</div>' +
        '<div id="ae-chat-typing">Typing...</div>' +
        '<div id="ae-scroll-btns">' +
          '<button class="ae-scroll-btn" id="ae-scroll-up">&#9650;</button>' +
          '<button class="ae-scroll-btn" id="ae-scroll-down">&#9660;</button>' +
        '</div>' +
        '<div id="ae-chat-input-row">' +
          '<textarea id="ae-chat-input" placeholder="Type your message..." rows="1"></textarea>' +
          '<button id="ae-chat-send">Send</button>' +
        '</div>' +
        footerHtml +
      '</div>' +
      callbackViewHtml +
    '</div>';
  document.body.appendChild(container);

  /* ── DOM references ─────────────────────────────────────────────────── */
  var btn          = document.getElementById('ae-chat-btn');
  var panel        = document.getElementById('ae-chat-panel');
  var chatView     = document.getElementById('ae-chat-view');
  var callbackView = document.getElementById('ae-callback-view');
  var closeBtn     = document.getElementById('ae-chat-close');
  var messages     = document.getElementById('ae-chat-messages');
  var input        = document.getElementById('ae-chat-input');
  var sendBtn      = document.getElementById('ae-chat-send');
  var typing       = document.getElementById('ae-chat-typing');
  var callbackBtn  = document.getElementById('ae-callback-btn');
  var callbackBack = document.getElementById('ae-callback-back');
  var cbFirst      = document.getElementById('ae-cb-first');
  var cbLast       = document.getElementById('ae-cb-last');
  var cbPhone      = document.getElementById('ae-cb-phone');
  var cbTextGroup  = document.getElementById('ae-cb-text-group');
  var cbMessage    = document.getElementById('ae-cb-message');
  var cbSendBtn    = document.getElementById('ae-cb-send');
  var callBtn      = document.getElementById('ae-call-btn');
  var sessionId    = null;
  var isOpen       = false;

  /* ── View switching ─────────────────────────────────────────────────── */
  function showChatView() {
    callbackView.style.display = 'none';
    chatView.style.display = 'flex';
  }

  function showCallbackView() {
    chatView.style.display = 'none';
    callbackView.style.display = 'flex';
  }

  /* ── Panel toggle ───────────────────────────────────────────────────── */
  function togglePanel() {
    isOpen = !isOpen;
    panel.style.display = isOpen ? 'flex' : 'none';
    if (isOpen) {
      showChatView();
      input.focus();
    }
  }

  btn.addEventListener('click', togglePanel);
  closeBtn.addEventListener('click', togglePanel);
  if (callBtn) {
    callBtn.addEventListener('click', function () {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', API_URL + '/api/chat/call-click');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify({ session_id: sessionId }));
    });
  }
  callbackBtn.addEventListener('click', showCallbackView);
  callbackBack.addEventListener('click', showChatView);
  document.getElementById('ae-scroll-up').addEventListener('click', function () {
    messages.scrollBy({ top: -120, behavior: 'smooth' });
  });
  document.getElementById('ae-scroll-down').addEventListener('click', function () {
    messages.scrollBy({ top: 120, behavior: 'smooth' });
  });

  /* ── Markdown renderer ──────────────────────────────────────────────── */
  function renderMarkdown(text) {
    var div = document.createElement('div');
    var html = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^#{1,3}\s+(.+)$/gm, '<strong>$1</strong>')
      .replace(/\[cta\]([\s\S]*?)\[\/cta\]/g, '<em style="color:#38bdf8;font-style:italic">$1</em>')
      .replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" style="color:#0369a1;text-decoration:underline">$1</a>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/^[-*]\s+(.+)$/gm, '&bull; $1')
      .replace(/\n/g, '<br>');
    div.innerHTML = html;
    return div;
  }

  function addMessage(role, content) {
    var msg = document.createElement('div');
    msg.className = 'ae-msg ' + role;
    msg.appendChild(renderMarkdown(content));
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  function showInjectionBlock() {
    var msg = document.createElement('div');
    msg.className = 'ae-msg assistant';
    var phone = CLIENT_PHONE ? '<br><br><strong>' + CLIENT_PHONE + '</strong>' : '';
    msg.innerHTML = 'For assistance, please contact us directly.' + phone + '<br>Available 7am\u20136pm daily';
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
    input.disabled = true;
    sendBtn.disabled = true;
    input.placeholder = 'Chat ended. Please contact us directly.';
  }

  /* ── Chat session ───────────────────────────────────────────────────── */
  function createSession(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL + '/api/chat/session');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        sessionId = data.session_id;
        callback(null);
      } else {
        callback(new Error('Session error'));
      }
    };
    xhr.onerror = function () { callback(new Error('Network error')); };
    xhr.send('{}');
  }

  function postMessage(text, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL + '/api/chat/message');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        if (data.type === 'injection_detected') {
          callback(null, data.content, true);
        } else {
          callback(null, data.content, false);
        }
      } else if (xhr.status === 429) {
        var fallback = CLIENT_PHONE
          ? 'You\'ve reached the message limit. Please call us at ' + CLIENT_PHONE + '.'
          : 'You\'ve reached the message limit for this session.';
        callback(null, fallback, false);
      } else {
        callback(new Error('API error'), null, false);
      }
    };
    xhr.onerror = function () { callback(new Error('Network error'), null, false); };
    xhr.send(JSON.stringify({ session_id: sessionId, content: text }));
  }

  function sendMessage() {
    var text = input.value.trim();
    if (!text || sendBtn.disabled) { return; }
    input.value = '';
    addMessage('user', text);
    typing.style.display = 'block';
    sendBtn.disabled = true;

    function doSend() {
      postMessage(text, function (err, reply, injected) {
        typing.style.display = 'none';
        sendBtn.disabled = false;
        if (err) {
          var errMsg = CLIENT_PHONE
            ? 'Hmm, I\'m having a little trouble connecting right now. Feel free to try again, or give us a call at ' + CLIENT_PHONE + ' \u2014 we\'re available 7am\u20136pm every day!'
            : 'Hmm, I\'m having a little trouble connecting right now. Feel free to try again in a moment!';
          addMessage('assistant', errMsg);
        } else if (injected) {
          showInjectionBlock();
        } else {
          addMessage('assistant', reply);
        }
      });
    }

    if (!sessionId) {
      createSession(function (err) {
        if (err) {
          typing.style.display = 'none';
          sendBtn.disabled = false;
          addMessage('assistant', 'Sorry, something went wrong. Please try again.');
        } else {
          doSend();
        }
      });
    } else {
      doSend();
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  /* ── Callback text opt toggle ──────────────────────────────────────── */
  window.aeCbSelect = function (el) {
    cbTextGroup.querySelectorAll('.ae-cb-radio-opt').forEach(function(b) { b.classList.remove('ae-selected'); });
    el.classList.add('ae-selected');
  };

  /* ── Callback form submit ───────────────────────────────────────────── */
  function submitCallback() {
    var first  = cbFirst.value.trim();
    var last   = cbLast.value.trim();
    var phone  = cbPhone.value.trim();
    var selBtn = cbTextGroup ? cbTextGroup.querySelector('.ae-selected') : null;
    var canTxt = selBtn ? selBtn.dataset.val : '';
    var msg    = cbMessage.value.trim();

    if (!first || !last || !phone || !canTxt) {
      alert('Please fill in all required fields.');
      return;
    }

    cbSendBtn.disabled = true;
    cbSendBtn.textContent = 'Sending...';

    var xhr = new XMLHttpRequest();
    xhr.open('POST', API_URL + '/api/callback');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status === 200) {
        cbSendBtn.textContent = 'Sent! \u2713';
        cbFirst.value = '';
        cbLast.value = '';
        cbPhone.value = '';
        if (cbTextGroup) { cbTextGroup.querySelectorAll('.ae-cb-radio-opt').forEach(function(b) { b.classList.remove('ae-selected'); }); }
        cbMessage.value = '';
        setTimeout(function () {
          showChatView();
          cbSendBtn.disabled = false;
          cbSendBtn.textContent = 'Send';
        }, 2000);
      } else {
        cbSendBtn.disabled = false;
        cbSendBtn.textContent = 'Send';
        alert('Something went wrong. Please try again or call us directly.');
      }
    };
    xhr.onerror = function () {
      cbSendBtn.disabled = false;
      cbSendBtn.textContent = 'Send';
      alert('Network error. Please try again.');
    };
    xhr.send(JSON.stringify({
      first_name: first,
      last_name:  last,
      phone:      phone,
      can_text:   canTxt === 'yes',
      message:    msg
    }));
  }

  cbSendBtn.addEventListener('click', submitCallback);
})();
