
function getWeekday(idx) {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekdays[idx];
}

function getMonthWord(idx) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[idx];
}

function formatTwoDigits(str) {
  return (`00${str}`).slice(-2);
}

function getRFC1123DateTime() {
  const nowDate = new Date();
  const weekday = getWeekday(nowDate.getDay());
  const day = formatTwoDigits(nowDate.getDate());
  const month = getMonthWord(nowDate.getMonth());
  const year = nowDate.getUTCFullYear();
  const hours = formatTwoDigits(nowDate.getUTCHours());
  const minutes = formatTwoDigits(nowDate.getUTCMinutes());
  const seconds = formatTwoDigits(nowDate.getUTCSeconds());

  return `${weekday}, ${day} ${month} ${year} ${hours}:${minutes}:${seconds} GMT`;
}
export function signQuery(privateKey, param, queryType, host, db, auth) {
  const dbLower = "test/one"
  const formattedDate = getRFC1123DateTime();
  const digest = window.fluree.crypto.sha2_256_normalize(param, 'base64');

  const uri = `/fdb/${dbLower}/${queryType.toLowerCase()}`;

  const signingString = `(request-target): post ${uri
  }\nx-fluree-date: ${formattedDate
  }\ndigest: SHA-256=${digest}`;
  const sig = window.fluree.crypto.sign_message(signingString, privateKey);

  let authStr;
  if (auth) {
    authStr = auth;
  } else {
    authStr = 'na';
  }
  const signature = `keyId="${authStr}",`
        + 'headers="(request-target) x-fluree-date digest",'
        + 'algorithm="ecdsa-sha256",'
        + `signature="${sig}"`;

  const headers = {
    'Content-Type': 'application/json',
    'X-Fluree-Date': formattedDate,
    Digest: `SHA-256=${digest}`,
    Signature: signature,
  };

  return {
    method: 'POST',
    headers,
    body: param,
  };
}
