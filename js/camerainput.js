/*
 -------------------------------------------------------------------------
 Camera Input
 Copyright (C) 2020 by Curtis Conard
 https://github.com/cconard96/glpi-camerainput-plugin
 -------------------------------------------------------------------------
 LICENSE
 This file is part of Camera Input.
 Camera Input is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License, or
 (at your option) any later version.
 Camera Input is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.
 You should have received a copy of the GNU General Public License
 along with Camera Input. If not, see <http://www.gnu.org/licenses/>.
 --------------------------------------------------------------------------
*/

$(document).on('ready', function() {
   if (typeof navigator.mediaDevices === 'undefined' || typeof navigator.mediaDevices.getUserMedia === 'undefined' || typeof ImageCapture === 'undefined') {
      return;
   }

   function getQuaggaConfig() {
      return {
         numOfWorkers: 0,
         locate: true,
         inputStream : {
            name : "Live",
            type : "LiveStream",
            target: '#camera-input-viewport'
         },
         decoder : {
            readers : ["code_39_reader"]
         },
         locator: {
            halfSample: false,
            patchSize: "medium", // x-small, small, medium, large, x-large
         }
      };
   }

   // Initialize viewport
   $(`<div id="camera-input-viewport"><video autoplay muted preload="auto"></video></div>`).appendTo('main');
   $('#camera-input-viewport').dialog({
      autoOpen: false,
      close: function() {
         Quagga.stop();
      }
   });

   // Hook into global search box
   const global_search = $('#champRecherche');
   if (global_search.length > 0) {
      global_search.append(`
         <button type="button" class="camera-input" style="border-radius: 3px 3px 3px 3px; padding: 3px" title="Camera search">
             <i class="fas fa-camera"></i>
         </button>`);
      global_search.find('.camera-input').on('click', function() {
         $('#camera-input-viewport').dialog('open');
         Quagga.init(getQuaggaConfig(), function(err) {
            if (err) {
               console.log(err);
               return
            }
            Quagga.start();
         });

         Quagga.onDetected(function(data) {
            Quagga.stop();
            global_search.find('input[name="globalsearch"]').val(data.codeResult.code);
            global_search.find('button[type="submit"]').click();
         });
      });
   }

   // Hook into Physical Inventory plugin search (if present)
   if (window.location.href.indexOf('/physicalinv/front') > -1) {
      const physinv_search = $('main form').first();
      if (physinv_search) {
         physinv_search.find('input[name="searchnumber"]').after(`
         <button type="button" class="camera-input" style="border-radius: 3px 3px 3px 3px; padding: 3px; background: white; border: none; height: 40px" title="Camera search">
             <i class="fas fa-camera fa-lg"></i>
         </button>`);
         physinv_search.find('.camera-input').on('click', function() {
            $('#camera-input-viewport').dialog('open');
            Quagga.init(getQuaggaConfig(), function(err) {
               if (err) {
                  console.log(err);
                  return
               }
               Quagga.start();
            });

            Quagga.onDetected(function(data) {
               Quagga.stop();
               physinv_search.find('input[name="searchnumber"]').val(data.codeResult.code);
               physinv_search.find('input[type="submit"]').click();
            });
         });
      }
   }
});