/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["quoteconvertor/quoteconvertor/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
