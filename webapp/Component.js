sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
    "use strict";

    return UIComponent.extend("quoteconvertor.quoteconvertor.Component", {

        metadata: {
            manifest: "json"
        },

        init: function () {
            // Call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // Load and set the data model at component level
            this._loadData();

            // Create the views based on the url/hash
            this.getRouter().initialize();
        },

        _loadData: function () {
            var that = this;
            var sModulePath = jQuery.sap.getModulePath("quoteconvertor.quoteconvertor");
            
            // Load quotes
            var oQuotesModel = new JSONModel();
            oQuotesModel.loadData(sModulePath + "/mockdata/Quotes.json");
            
            // Load items
            var oItemsModel = new JSONModel();
            oItemsModel.loadData(sModulePath + "/mockdata/QuoteItems.json");
            
            // Wait for both to load
            Promise.all([
                new Promise((resolve) => {
                    oQuotesModel.attachRequestCompleted(resolve);
                }),
                new Promise((resolve) => {
                    oItemsModel.attachRequestCompleted(resolve);
                })
            ]).then(function() {
                that._mergeQuotesWithItems(oQuotesModel, oItemsModel);
                that.setModel(oQuotesModel);
            });
        },

        _mergeQuotesWithItems: function (oQuoteModel, oItemsModel) {
            var aQuotes = oQuoteModel.getData();
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

        getContentDensityClass: function () {
            if (!this._sContentDensityClass) {
                if (!sap.ui.Device.support.touch) {
                    this._sContentDensityClass = "sapUiSizeCompact";
                } else {
                    this._sContentDensityClass = "sapUiSizeCozy";
                }
            }
            return this._sContentDensityClass;
        }
    });
});