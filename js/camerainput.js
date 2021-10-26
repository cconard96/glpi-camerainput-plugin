/*
 -------------------------------------------------------------------------
 Camera Input
 Copyright (C) 2020-2021 by Curtis Conard
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

/* global CFG_GLPI */
/* global GLPI_PLUGINS_PATH */

window.GlpiPluginCameraInput = null;
class CameraInput {

   constructor() {
      this.possibleHooks = [this.hookGlobalSearch, this.hookPhysicalInventoryPlugin, this.hookAssetAuditPlugin];
      this.init();
   }

   checkSupport() {
      return (typeof navigator.mediaDevices !== 'undefined' && typeof navigator.mediaDevices.getUserMedia !== 'undefined');
   }

   getPluginConfig() {
      let plugin_config = {
         barcode_formats: ["code_39_reader", "code_128_reader"]
      };
      $.ajax({
         method: "GET",
         url: (CFG_GLPI.root_doc+"/"+GLPI_PLUGINS_PATH.camerainput + "/ajax/config.php"),
         async: false
      }).done((config) => {
         plugin_config = config;
      });
      return plugin_config;
   }

   getQuaggaConfig() {
      let plugin_config = this.getPluginConfig();
      return {
         numOfWorkers: 0,
         locate: true,
         inputStream : {
            name : "Live",
            type : "LiveStream",
            target: '#camera-input-viewport'
         },
         decoder : {
            readers : plugin_config['barcode_formats']
         },
         locator: {
            halfSample: false,
            patchSize: "medium", // x-small, small, medium, large, x-large
         }
      };
   }

   initViewport() {
      $(`<div id="camera-input-viewport" class="modal" role="dialog">
         <div class="modal-dialog" role="dialog">
            <div class="modal-body"><video autoplay muted preload="auto"></video></div>
         </div>
      </div>`).appendTo('main');
      $('#camera-input-viewport').modal({
         show: false
      });
      // $('#camera-input-viewport').dialog({
      //    autoOpen: false,
      //    width: 640,
      //    height: 400,
      //    position: {
      //       my: "center",
      //       at: "center",
      //       of: window
      //    },
      //    resizable: false,
      //    close: function() {
      //       Quagga.stop();
      //    }
      // });
   }

   registerListeners() {
      $("#camera-input-viewport video").on('loadedmetadata', () => {
         const vidWidth = Math.min(window.innerWidth - 10, 640);
         const vidHeight = vidWidth * 0.5625; // 16:9
         this.width = vidWidth;
         this.height = vidHeight;
         $('#camera-input-viewport').dialog("option", "width", vidWidth);
         $('#camera-input-viewport').dialog("option", "height", vidHeight + 60);
      });
   }

   getCameraInputButton() {
      return `
         <button type="button" class="camera-input btn btn-outline-secondary" title="Camera search">
             <i class="fas fa-camera fa-lg"></i>
         </button>`
   }

   hookGlobalSearch(class_obj) {
      const global_search = $('input[name="globalsearch"]').closest('.input-group');
      if (global_search.length > 0) {
         global_search.append(class_obj.getCameraInputButton());
         global_search.find('.camera-input').on('click', () => {
            $('#camera-input-viewport').modal('show');
            Quagga.init(class_obj.getQuaggaConfig(), (err) => {
               if (err) {
                  console.log(err);
                  return
               }
               Quagga.start();
            });

            Quagga.onDetected((data) => {
               Quagga.stop();
               global_search.find('input[name="globalsearch"]').val(data.codeResult.code);
               global_search.find('button[type="submit"]').click();
            });
         });
      }
   }

   hookPhysicalInventoryPlugin(class_obj) {
      if (window.location.href.indexOf('/physicalinv/front') > -1) {
         const physinv_search = $('main form').first();
         if (physinv_search) {
            physinv_search.find('input[name="searchnumber"]').after(class_obj.getCameraInputButton());
            physinv_search.find('.camera-input').on('click', () => {
               $('#camera-input-viewport').dialog('open');
               Quagga.init(class_obj.getQuaggaConfig(), (err) => {
                  if (err) {
                     console.log(err);
                     return
                  }
                  Quagga.start();
               });

               Quagga.onDetected((data) => {
                  Quagga.stop();
                  physinv_search.find('input[name="searchnumber"]').val(data.codeResult.code);
                  physinv_search.find('input[type="submit"]').click();
               });
            });
         }
      }
   }

   hookAssetAuditPlugin(class_obj) {
      if (window.location.href.indexOf('/assetaudit/front') > -1) {
         const assetaudit_search = $('main form').first();
         if (assetaudit_search) {
            assetaudit_search.find('input[name="search_criteria"]').after(class_obj.getCameraInputButton());
            assetaudit_search.find('.camera-input').on('click', () => {
               $('#camera-input-viewport').dialog('open');
               Quagga.init(class_obj.getQuaggaConfig(), (err) => {
                  if (err) {
                     console.log(err);
                     return
                  }
                  Quagga.start();
               });

               Quagga.onDetected((data)  => {
                  Quagga.stop();
                  assetaudit_search.find('input[name="search_criteria"]').val(data.codeResult.code);
                  assetaudit_search.find('input[type="submit"]').click();
               });
            });
         }
      }
   }

   init() {
      if (!this.checkSupport()) {
         return;
      }

      this.initViewport();
      this.registerListeners();

      $.each(this.possibleHooks, (i, func) => {
         func(this);
      });
   }
}

$(document).on('ready', () => {
   window.GlpiPluginCameraInput = new CameraInput();
});
