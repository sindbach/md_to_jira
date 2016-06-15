// ==UserScript==
// @name         MD_to_JIRA
// @namespace    http://github.com/sindbach
// @version      0.2
// @description  Converts MD to JIRA format
// @author       Wan Bachtiar
// @include      https?://jira.*
// @updateURL    https://raw.githubusercontent.com/sindbach/md_to_jira/master/md_to_jira.user.js
// @run-at context-menu
// ==/UserScript==
/* jshint -W097 */
'use strict';

/* Grab the text-area for adding comment edit. */
var textid = "comment";
if (document.getElementById(textid)===null){textid = "description";}
if (document.getElementById(textid)===null){return;}
var text = document.getElementById(textid).value;

/* code block: find triple backticks */
var result = text.replace(/```(.+)/gi, "{code:$1}").replace(/```/gi, "{code}");

/* emphasis: find word(s) surrounded by backticks */
result = result.replace(/`([^`]+)`/gi, "{{\$1}}");

/* links: find matching [title](url) */
result = result.replace(/\[([^\]]+)\]\(([^\)]+[^\s+]+)\)/gi, "[$1|$2]");

/* bold: find word(s) is surrounded by double "_" or "*" */
result = result.replace(/(?:\_\_|\*\*)(\w+)(?:\_\_|\*\*)/gi, "*$1*");

/* quote: find line that has ">" at the beginning, or prefix by a new line */
result = result.replace(/^\>|(\n)\>/gi, "$1bq. ");

document.getElementById(textid).value = result;
