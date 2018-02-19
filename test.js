
const isAutoreply = require('.');
const assert      = require('assert');

// Test Auto-Submitted header
assert.ok(!isAutoreply({ 'Auto-Submitted': 'No' }));
assert.ok(!isAutoreply({ 'auto-submitted': 'no' }));
assert.ok(isAutoreply({ 'Auto-Submitted': 'Yes' }));
assert.ok(isAutoreply({ 'auto-submitted': 'yes' }));
assert.ok(isAutoreply({ 'auto-submitted': '' }));
assert.ok(isAutoreply({ 'auto-submitted': 'auto-replied' }));

// Test Return-Path header
assert.ok(!isAutoreply({ 'Return-Path': '' }));
assert.ok(!isAutoreply({ 'Return-Path': 'foo@example.com' }));
assert.ok(!isAutoreply({ 'return-path': 'foo@example.com' }));
assert.ok(isAutoreply({ 'Return-Path': '<>' }));
assert.ok(isAutoreply({ 'return-path': '<>' }));

// Test Preference and X-Preference header
assert.ok(isAutoreply({ 'Preference': 'auto_reply' }));
assert.ok(isAutoreply({ 'preference': 'auto_reply' }));
assert.ok(!isAutoreply({ 'Preference': 'not_auto_reply' }));
assert.ok(isAutoreply({ 'X-Preference': 'auto_reply' }));
assert.ok(isAutoreply({ 'x-preference': 'auto_reply' }));
assert.ok(!isAutoreply({ 'X-Preference': 'not_auto_reply' }));

// Test X-AutoRepsond header
assert.ok(isAutoreply({ 'X-AutoRespond': '' }));
assert.ok(isAutoreply({ 'x-autorespond': '' }));

// Test X-Autogenerated header
assert.ok(!isAutoreply({ 'X-Autogenerated': 'None' }));
assert.ok(isAutoreply({ 'x-autogenerated': 'Forward' }));
assert.ok(isAutoreply({ 'X-Autogenerated': 'Group' }));
assert.ok(isAutoreply({ 'x-autogenerated': 'letter' }));
assert.ok(isAutoreply({ 'X-Autogenerated': 'mirror' }));
assert.ok(isAutoreply({ 'x-autogenerated': 'Redirect' }));
assert.ok(isAutoreply({ 'X-Autogenerated': 'Reply' }));

// Test X-AutoReply-From and X-Mail-Autoreply header
assert.ok(isAutoreply({ 'X-AutoReply-From': '' }));
assert.ok(isAutoreply({ 'x-autoreply-from': '' }));
assert.ok(isAutoreply({ 'X-Mail-Autoreply': '' }));
assert.ok(isAutoreply({ 'x-mail-autoreply': '' }));

// Test X-FC-MachineGenerated header
assert.ok(!isAutoreply({ 'X-FC-MachineGenerated': 'false' }));
assert.ok(!isAutoreply({ 'x-fc-machinegenerated': 'False' }));
assert.ok(isAutoreply({ 'X-FC-MachineGenerated': 'true' }));
assert.ok(isAutoreply({ 'x-fc-machinegenerated': 'True' }));
assert.ok(!isAutoreply({ 'x-fc-machinegenerated': '' }));

// Test Precedence header
assert.ok(isAutoreply({ 'precedence': 'bulk' }));
assert.ok(isAutoreply({ 'Precedence': 'Bulk' }));
assert.ok(!isAutoreply({ 'precedence': 'somethingelse' }));
assert.ok(!isAutoreply({ 'Precedence': 'somethingelse' }));

// Test X-Autoreply header
assert.ok(isAutoreply({ 'x-autoreply': 'Yes' }));
assert.ok(isAutoreply({ 'X-Autoreply': 'yes' }));
assert.ok(!isAutoreply({ 'x-autoreply': 'NO' }));
assert.ok(!isAutoreply({ 'x-autoreply': 'no' }));
assert.ok(!isAutoreply({ 'x-autoreply': '' }));

// Test X-POST-MessageClass header
assert.ok(isAutoreply({ 'X-POST-MessageClass': '9; autoresponder' }));
assert.ok(isAutoreply({ 'x-post-messageclass': '9; Autoresponder' }));
assert.ok(!isAutoreply({ 'x-post-messageclass': '7; Somethingelse' }));
assert.ok(!isAutoreply({ 'X-POST-MessageClass': '' }));

// Test Delivered-To header
assert.ok(isAutoreply({ 'Delivered-To': 'autoresponder' }));
assert.ok(isAutoreply({ 'delivered-to': 'Autoresponder' }));
assert.ok(!isAutoreply({ 'dlivered-to': 'Somethingelse' }));
assert.ok(!isAutoreply({ 'Delivered-To': '' }));

// Test X-Auto-Response-Suppress header
assert.ok(!isAutoreply({ 'X-Auto-Response-Suppress': 'None' }));
assert.ok(!isAutoreply({ 'x-auto-response-suppress': 'none' }));
assert.ok(isAutoreply({ 'X-Auto-Response-Suppress': 'OOF' }));
assert.ok(isAutoreply({ 'x-auto-response-suppress': 'oof' }));
assert.ok(isAutoreply({ 'x-auto-response-suppress': 'RN, NRN' }));
assert.ok(isAutoreply({ 'x-auto-response-suppress': '' }));

// Test string headers
assert.ok(isAutoreply('Delivered-To: Autoresponder'));
assert.ok(isAutoreply('Delivered-To:   Autoresponder  '));
assert.ok(isAutoreply('X-POST-MessageClass: 9; autoresponder'));
assert.ok(isAutoreply('X-POST-MessageClass:     9;      autoresponder     '));
assert.ok(!isAutoreply('MIME-Version: 1.0'));

// Test buffer headers
assert.ok(isAutoreply(Buffer.from('Delivered-To: Autoresponder')));
assert.ok(isAutoreply(Buffer.from('Delivered-To:   Autoresponder  ')));
assert.ok(isAutoreply(Buffer.from('X-POST-MessageClass: 9; autoresponder')));
assert.ok(isAutoreply(Buffer.from('X-POST-MessageClass:     9;      autoresponder     ')));
assert.ok(!isAutoreply(Buffer.from('MIME-Version: 1.0')));

// Test falsy header values
assert.ok(!isAutoreply());
assert.ok(!isAutoreply(''));
assert.ok(!isAutoreply(Buffer.from('')));
assert.ok(!isAutoreply(null));
assert.ok(!isAutoreply([]));
assert.ok(!isAutoreply({}));
