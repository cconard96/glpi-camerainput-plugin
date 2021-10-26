window.$ = window.jQuery = require('jquery');

// Set faux CFG_GLPI variable. We cannot get the real values since they are set inline in PHP.
window.CFG_GLPI = {
   root_doc: '/'
};
window.GLPI_PLUGINS_PATH = {
   workflows: 'plugins/camerainput'
}


// Mock user media
const mockGetUserMedia = jest.fn(async () => {
   return new Promise(resolve => {
      resolve();
   });
})
Object.defineProperty(global.navigator, 'mediaDevices', {
   value: {
      getUserMedia: mockGetUserMedia,
   },
})
