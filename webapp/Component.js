sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
    "use strict";

    return UIComponent.extend("quoteconvertor.quoteconvertor.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Create the views based on the url/hash
            this.getRouter().initialize();
        },

        getContentDensityClass: function () {
            if (!this._sContentDensityClass) {
                if (!Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});