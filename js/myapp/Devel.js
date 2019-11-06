/*
 * $Id: Devel.js,v 1.27 2014/01/08 16:38:06 gaudenz Exp $
 * Copyright (c) 2006-2013, JGraph Ltd
 */
// This provides an indirection to make sure the mxClient.js
// loads before the dependent classes below are loaded. This
// is used for development mode where the JS is in separate
// files and the mxClient.js loads other files.
// Adds external dependencies
mxscript(drawDevUrl + 'js/cryptojs/aes.min.js');
mxscript(drawDevUrl + 'js/spin/spin.min.js');
mxscript(drawDevUrl + 'js/deflate/pako.min.js');
mxscript(drawDevUrl + 'js/deflate/base64.js');
mxscript(drawDevUrl + 'js/jscolor/jscolor.js');
mxscript(drawDevUrl + 'js/sanitizer/sanitizer.min.js');
mxscript(drawDevUrl + 'js/jquery/jquery.min.js');
mxscript(drawDevUrl + 'js/jquery/jcanvas.min.js');
/*mxscript(drawDevUrl + 'js/jquery/canvas2image.js');*/

// Uses grapheditor from devhost
mxscript(geBasePath + '/Editor.js');
mxscript(geBasePath + '/EditorUi.js');
mxscript(geBasePath + '/Sidebar.js');
mxscript(geBasePath + '/Graph.js');
mxscript(geBasePath + '/Format.js');
mxscript(geBasePath + '/Shapes.js');
mxscript(drawDevUrl + 'js/myapp/Shapes/MyImage.js');
mxscript(drawDevUrl + 'js/myapp/Shapes/MySeqNum.js');
mxscript(drawDevUrl + 'js/myapp/Shapes/MyMagnifyTarget.js');
mxscript(geBasePath + '/Actions.js');
mxscript(geBasePath + '/Menus.js');
mxscript(geBasePath + '/Toolbar.js');
mxscript(geBasePath + '/Dialogs.js');

// Loads main classes
mxscript(drawDevUrl + 'js/myapp/Sidebar.js');

//mxscript(drawDevUrl + 'js/diagramly/util/mxJsCanvas.js');
//mxscript(drawDevUrl + 'js/diagramly/util/mxAsyncCanvas.js');

mxscript(drawDevUrl + 'js/diagramly/DrawioFile.js');
mxscript(drawDevUrl + 'js/diagramly/LocalFile.js');
mxscript(drawDevUrl + 'js/diagramly/LocalLibrary.js');
mxscript(drawDevUrl + 'js/diagramly/StorageFile.js');
mxscript(drawDevUrl + 'js/diagramly/StorageLibrary.js');
// mxscript(drawDevUrl + 'js/diagramly/RemoteFile.js');
// mxscript(drawDevUrl + 'js/diagramly/RemoteLibrary.js');
mxscript(drawDevUrl + 'js/myapp/Editor.js');
mxscript(drawDevUrl + 'js/myapp/EditorUi.js');
mxscript(drawDevUrl + 'js/myapp/Dialogs.js');
mxscript(drawDevUrl + 'js/diagramly/Settings.js');
// mxscript(drawDevUrl + 'js/diagramly/DiffSync.js');
// mxscript(drawDevUrl + 'js/diagramly/DrawioFileSync.js');


//Comments
// mxscript(drawDevUrl + 'js/diagramly/DrawioComment.js');
// mxscript(drawDevUrl + 'js/diagramly/DriveComment.js');

// Excluded in base.min.js
mxscript(drawDevUrl + 'js/diagramly/DrawioClient.js');
mxscript(drawDevUrl + 'js/diagramly/DrawioUser.js');
mxscript(drawDevUrl + 'js/diagramly/UrlLibrary.js');
mxscript(drawDevUrl + 'js/diagramly/DriveFile.js');
// mxscript(drawDevUrl + 'js/diagramly/DriveLibrary.js');
// mxscript(drawDevUrl + 'js/diagramly/DriveClient.js');
mxscript(drawDevUrl + 'js/diagramly/DropboxFile.js');
// mxscript(drawDevUrl + 'js/diagramly/DropboxLibrary.js');
// mxscript(drawDevUrl + 'js/diagramly/DropboxClient.js');
// mxscript(drawDevUrl + 'js/diagramly/GitHubFile.js');
// mxscript(drawDevUrl + 'js/diagramly/GitHubLibrary.js');
// mxscript(drawDevUrl + 'js/diagramly/GitHubClient.js');
mxscript(drawDevUrl + 'js/diagramly/OneDriveFile.js');
// mxscript(drawDevUrl + 'js/diagramly/OneDriveLibrary.js');
// mxscript(drawDevUrl + 'js/diagramly/OneDriveClient.js');
// mxscript(drawDevUrl + 'js/diagramly/TrelloFile.js');
// mxscript(drawDevUrl + 'js/diagramly/TrelloLibrary.js');
// mxscript(drawDevUrl + 'js/diagramly/TrelloClient.js');

mxscript(drawDevUrl + 'js/myapp/App.js');
mxscript(drawDevUrl + 'js/myapp/Menus.js');
mxscript(drawDevUrl + 'js/myapp/Pages.js');
// mxscript(drawDevUrl + 'js/diagramly/Trees.js');
// mxscript(drawDevUrl + 'js/diagramly/Minimal.js');
// mxscript(drawDevUrl + 'js/diagramly/DistanceGuides.js');
mxscript(drawDevUrl + 'js/diagramly/DevTools.js');

// Vsdx/vssx support
// mxscript(drawDevUrl + 'js/diagramly/vsdx/VsdxExport.js');
// mxscript(drawDevUrl + 'js/diagramly/vsdx/mxVsdxCanvas2D.js');
// mxscript(drawDevUrl + 'js/diagramly/vsdx/bmpDecoder.js');
// mxscript(drawDevUrl + 'js/diagramly/vsdx/importer.js');
// mxscript(drawDevUrl + 'js/jszip/jszip.min.js');

// mxRuler
// mxscript(drawDevUrl + 'js/diagramly/ruler/mxRuler.js');

//GraphMl Import
// mxscript(drawDevUrl + 'js/diagramly/graphml/mxGraphMlCodec.js');

//Table Layout
// if (urlParams['tableLayout'] == '1')
// {
//   mxscript(drawDevUrl + 'js/diagramly/mxTableLayout.js');
// }
