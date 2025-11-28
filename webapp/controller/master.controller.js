sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/format/NumberFormat",
    "sap/ui/core/format/DateFormat"
], function (Controller, JSONModel, NumberFormat, DateFormat) {
    "use strict";

    return Controller.extend("quoteconvertor.quoteconvertor.controller.Master", {

        onInit: function () {
            // Wait for model to be set by Component
            var oModel = this.getOwnerComponent().getModel();
            
            if (oModel && oModel.getData().Quotes) {
                this._selectFirstItem();
            } else {
                // If model not ready, wait for it
                this.getOwnerComponent().getModel().attachRequestCompleted(function() {
                    this._selectFirstItem();
                }.bind(this));
            }
        },

        _selectFirstItem: function () {
            // Select the first item by default
            var oList = this.byId("masterList");
            var aItems = oList.getItems();
            if (aItems.length > 0) {
                oList.setSelectedItem(aItems[0]);
                this._showDetail(aItems[0]);
            }
        },

        _mergeQuotesWithItems: function (oQuoteModel, oItemsModel) {
            var aQuotes = oQuoteModel.getData().Quotes || oQuoteModel.getData();
            var aItems = oItemsModel.getData();

            // Add items array to each quote
            aQuotes.forEach(function (oQuote) {
                oQuote.Items = aItems.filter(function (oItem) {
                    return oItem.QuoteID === oQuote.QuoteID;
                });
            });

            oQuoteModel.setData({ Quotes: aQuotes });
            
            // Debug: Check if Items were merged correctly
            console.log("Merged Quotes:", aQuotes);
            console.log("First quote items:", aQuotes[0] ? aQuotes[0].Items : "No quotes");
        },

        onSelectionChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            this._showDetail(oItem);
        },

        _showDetail: function (oItem) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oContext = oItem.getBindingContext();
            var sPath = oContext.getPath();
            var sQuoteId = oContext.getProperty("QuoteID");
            
            oRouter.navTo("detail", {
                quotePath: encodeURIComponent(sPath.substr(1))
            });
        },

        formatCurrency: function (sValue, sCurrency) {
            if (!sValue) {
                return "";
            }
            var oFormat = NumberFormat.getCurrencyInstance({
                currencyCode: false
            });
            return sCurrency + " " + oFormat.format(sValue);
        },

        formatDate: function (sDate) {
            if (!sDate) {
                return "";
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
        }
    });
});