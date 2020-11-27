# Camera Input Plugin for GLPI
This is more of a proof of concept / experiment than a qualified GLPI plugin.
It ties into the global search box, Physical Inventory plugin search box, and my Asset Audit search box and allows you to use your camera as a digital barcode reader.

Currently, this only really works well under ideal circumstances where there is no glare, and the camera is of a good quality.
In other cases, it is preferable to use an actual laser barcode scanner. This could be improved by tweaking parameters used with the library being used, or by switching to the standard Shape Detection if/when it is ever finalized and adopted.