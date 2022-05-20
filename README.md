# Camera Input Plugin for GLPI
This ties into the global search box, Physical Inventory plugin's search box, and my Asset Audit plugin's search box and allows you to use your camera as a digital barcode reader.
Since browsers can only use webcams/cameras in a secure context, you must be connected to your GLPI instance over HTTPS or localhost.

Currently, this only really works well under ideal circumstances where there is no glare, and the camera is of a good quality.
In other cases, it is preferable to use an actual laser barcode scanner.
This could be improved in the future by tweaking parameters used with the library being used, or by switching to a standardized JS Shape Detection/Barcode Detection API if any get finalized.

## Locale Support
- Contribute to existing localizations on [POEditor](https://poeditor.com/join/project?hash=UJXnGBmw5g).
- To request new languages, please open a GitHub issue.

## Version Support

Multiple versions of this plugin are supported at the same time to ease migration.
Only 2 major versions will be supported at the same time (Ex: v1 and v2).
When a new minor version is released, the previous minor version will have support ended after a month.
Only the latest bug fix version of each minor release will be supported.

Note: There was no official version support policy before 2022-05-19.
The following version table may be reduced based on the policy stated above.

| Plugin Version | GLPI Versions | Start of Support | End of Support |
|----------------|---------------|------------------|----------------|
| 1.0.3          | 9.5.X         | 2021-11-15       | In Support     |
| 2.0.0          | 10.0.X        | 2022-04-20       | In Support     |
