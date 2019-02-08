/* ===========================================================================
 * Copyright (C) 2019 CapsicoHealth, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 define(function(require, exports, module) {

  var aesjs     = require('aes-js')

  var EncryptionHelper = {
    aesDecrypt: function(key_hex_str, encrypted_hex_str) {
      var key_str = key_hex_str
      var encrypted_str = encrypted_hex_str;
      // Convert Key String to Bytes
      var key_bytes = aesjs.utils.hex.toBytes(key_str)
      // Init AES plugin
      let aesCtr = new aesjs.ModeOfOperation.ctr(key_bytes, new aesjs.Counter(0));
      // Convert Encrypted Str to Bytes
      let encrypted_bytes  = aesjs.utils.hex.toBytes(encrypted_str);
      // Run AES Decryption (with Key Bytes & Encrypted Bytes)
      let decrypted_bytes = aesCtr.decrypt(encrypted_bytes);
      // Convert Decrypted Bytes to Str
      let decrypted_str       = aesjs.utils.utf8.fromBytes(decrypted_bytes);
      return decrypted_str;
    }
  }
  return EncryptionHelper;
})