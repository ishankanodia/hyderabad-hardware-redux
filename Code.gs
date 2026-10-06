/**
 * Hyderabad Hardware — 3BHK landing page leads → Google Sheet
 *
 * Setup (once):
 *  1. Open the leads spreadsheet → Extensions → Apps Script.
 *  2. Replace everything in Code.gs with this file and click Save.
 *  3. Deploy → New deployment → type "Web app"
 *       Execute as:      Me
 *       Who has access:  Anyone
 *     → Deploy → authorise with your Google account → copy the Web app URL (ends in /exec).
 *  4. Paste that URL into CONFIG.sheetEndpoint in
 *     public/3bhk-interiors-hyderabad-Andhrapradesh/index.html and redeploy the site.
 *
 * After editing this script later: Deploy → Manage deployments → ✏️ → Version: "New version" → Deploy
 * (the /exec URL stays the same).
 */

const SHEET_NAME = 'Leads';
const SECRET = 'hh-3bhk-leads-7Q2x'; // must match CONFIG.sheetSecret on the landing page

const COLUMNS = [
  ['Received at', null],
  ['Name', 'name'],
  ['Phone', 'phone'],
  ['Location', 'location'],
  ['Home type', 'bhk'],
  ['Requirement', 'need'],
  ['Possession', 'possession'],
  ['Budget', 'budget'],
  ['WhatsApp updates', 'whatsapp_updates'],
  ['Form', 'form'],
  ['Page', 'page'],
  ['utm_source', 'utm_source'],
  ['utm_medium', 'utm_medium'],
  ['utm_campaign', 'utm_campaign'],
  ['utm_term', 'utm_term'],
  ['utm_content', 'utm_content'],
  ['gclid', 'gclid'],
  ['gbraid', 'gbraid'],
  ['wbraid', 'wbraid'],
  ['matchtype', 'matchtype'],
  ['device', 'device'],
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'bad json' });
  }
  if (data.secret !== SECRET) return json_({ ok: false, error: 'forbidden' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const row = COLUMNS.map(([, key]) => (key ? clean_(data[key]) : new Date()));
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return json_({ ok: true });
}

// Visiting the /exec URL in a browser shows this — handy to confirm the deployment is live.
function doGet() {
  return json_({ ok: true, service: 'hh-3bhk-leads' });
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([header]) => header));
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');
  }
  return sheet;
}

// Store everything as plain text: stops "+91…" phone numbers being turned into numbers,
// and stops form input starting with = + - @ being run as a spreadsheet formula.
function clean_(value) {
  if (value === undefined || value === null) return '';
  const s = String(value).slice(0, 1000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
