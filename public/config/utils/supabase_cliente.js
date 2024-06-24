"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = 'https://xhnrrtnynnrvpduxhkbp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhobnJydG55bm5ydnBkdXhoa2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTAyODUyMTQsImV4cCI6MjAyNTg2MTIxNH0.8nNbeqg7YHvS6IBMDQ0saIlmeNWPj-NIe1HDrbmxqfs';
const supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.default = supabase;
