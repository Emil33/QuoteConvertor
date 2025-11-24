sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("quoteconvertor.quoteconvertor.controller.detail", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sPath = decodeURIComponent(oEvent.getParameter("arguments").productPath);
            this.getView().bindElement({
                path: "/" + sPath
            });
        },

        onNavBack: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("master");
        },

        formatStatus: function (sStatus) {
            switch (sStatus) {
                case "Available":
                    return "Success";
                case "Low Stock":
                    return "Warning";
                case "Out of Stock":
                    return "Error";
                default:
                    return "None";
            }
        }
    });
});