// ==UserScript==
// @name         MD_to_JIRA
// @namespace    https://github.com/sindbach/
// @version      0.1
// @description  Converts MD to JIRA format
// @author       Wan Bachtiar
// @include      https?://jira.*
// @updateURL    https://raw.githubusercontent.com/sindbach/md_to_jira/master/md_to_jira.user.js
// ==/UserScript==
/* jshint -W097 */
'use strict';

/* Grab the text-area for adding comment edit. */
var textid = "comment";
if (document.getElementById(textid)==null){textid = "description";}
if (document.getElementById(textid)==null){console.log("No text to convert"); return;}
var text = document.getElementById(textid).value;

/* code block */
var result = text.replace(/```(.+)/gi, "{code:$1}").replace(/```/gi, "{code}");

/* emphasis */
result = result.replace(/`([^`]+)`/gi, "{{\$1}}");

/* links */
result = result.replace(/\[([^\]]+)\]\(([^\)]+[^\s+]+)\)/gi, "[$1|$2]");

/* bold */
result = result.replace(/(?:\_\_|\*\*)(\w+)(?:\_\_|\*\*)/gi, "*$1*");

document.getElementById(textid).value = result;
