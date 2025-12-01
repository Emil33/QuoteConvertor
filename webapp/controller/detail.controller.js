sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/core/format/DateFormat"
], function (Controller, NumberFormat, DateFormat) {
    "use strict";

    return Controller.extend("quoteconvertor.quoteconvertor.controller.Detail", {

        onInit: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sPath = decodeURIComponent(oEvent.getParameter("arguments").quotePath);
            this.getView().bindElement({
                path: "/" + sPath
            });
            
            // Debug: Log the quote data to see if Items exist
            var oModel = this.getView().getModel();
            var oQuote = oModel.getProperty("/" + sPath);
            console.log("Quote data:", oQuote);
            console.log("Items:", oQuote ? oQuote.Items : "No quote data");
        },

        onMenuPress: function (oEvent) {
            var oButton = oEvent.getSource();
            
            // Create action sheet if it doesn't exist
            if (!this._actionSheet) {
                this._actionSheet = sap.ui.xmlfragment(
                    "quoteconvertor.quoteconvertor.view.DetailMenu",
                    this
                );
                this.getView().addDependent(this._actionSheet);
            }
            
            this._actionSheet.openBy(oButton);
        },


        onCreateQuote: function () {
            MessageToast.show("Create Quote functionality - Coming soon");
        },

        onEditQuote: function () {
            MessageToast.show("Edit Quote functionality - Coming soon");
        },

        onAddDiscount: function () {
            MessageToast.show("Add Discount functionality - Coming soon");
        },

        onDeleteQuote: function () {
            MessageToast.show("Delete Quote functionality - Coming soon");
        },



        // UTIL Functions /////
        formatCurrency: function (sValue, sCurrency) {
            if (!sValue && sValue !== 0) {
                return "";
            }
            var oFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            return sCurrency + " " + oFormat.format(sValue);
        },

        formatDate: function (sDate) {
            if (!sDate) {
                return "N/A";
            }
            var oDateFormat = DateFormat.getDateInstance({
                pattern: "dd/MM/yyyy"
            });
            
            // Handle JSON date format /Date(timestamp)/
            var oDate;
            if (typeof sDate === "string" && sDate.indexOf("/Date(") === 0) {
                var timestamp = parseInt(sDate.match(/\d+/)[0]);
                oDate = new Date(timestamp);
            } else {
                oDate = new Date(sDate);
            }
            
            return oDateFormat.format(oDate);
        },

        formatStatusState: function (sStatus) {
            switch (sStatus) {
                case "Approved":
                    return "Success";
                case "Pending":
                    return "Warning";
                case "Completed":
                    return "Success";
                case "Draft":
                    return "Information";
                case "Rejected":
                    return "Error";
                default:
                    return "None";
            }
        },

        formatBoolean: function (bValue) {
            return bValue ? "Yes" : "No";
        },

        formatDiscount: function (sPercent, sAmount, sCurrency) {
            if (!sPercent && !sAmount) {
                return "No discount";
            }
            var oFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            return sPercent + "% (" + sCurrency + " " + oFormat.format(sAmount) + ")";
        },

        formatDimensions: function (sWidth, sHeight, sUnit) {
            if (!sWidth || !sHeight) {
                return "";
            }
            return sWidth + " x " + sHeight + " " + sUnit;
        },

        formatSquareMeters: function (sValue) {
            if (!sValue) {
                return "";
            }
            return sValue + " m²";
        }
    });
});