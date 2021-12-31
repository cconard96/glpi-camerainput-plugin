describe('Camera Input Plugin', () => {
   const mockLocationURL = (url) => {
      global.window = Object.create(window);
      Object.defineProperty(window, 'location', {
         value: {
            href: url
         },
         writable: true
      });
   }

   test('Mocks', () => {
      mockLocationURL('https://localhost/front/central.php');
      expect(window.location.href).toBe('https://localhost/front/central.php');
      mockLocationURL('https://localhost/plugins/assetaudit/front/audit.php');
      expect(window.location.href).toBe('https://localhost/plugins/assetaudit/front/audit.php');
   });

   test('Global search button', () => {
      mockLocationURL('https://localhost/front/central.php');
      $(document.body).append(`<div id="main"><div class="input-group"><input name="globalsearch"</div></div>`)
      require('../../js/camerainput.js');
      $(document).on('ready', () => {
         window.GlpiPluginCameraInput.init();
         const container = $('input[name="globalsearch"]').closest('.input-group');
         console.dir(container);
         console.dir(container.children());
         expect(container.find('button.camera-input').length).toBe(1);
      })
   });
});
