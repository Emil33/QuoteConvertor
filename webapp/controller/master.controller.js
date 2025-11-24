sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("quoteconvertor.quoteconvertor.controller.master", {

        onInit: function () {
            // Create sample data
            var oData = {
                Products: [
                    {
                        ProductID: "P001",
                        Name: "Laptop Pro 15",
                        Category: "Electronics",
                        Price: 1299.99,
                        Currency: "USD",
                        Supplier: "Tech Corp",
                        Status: "Available",
                        Description: "High-performance laptop with 15-inch display, perfect for professionals.",
                        UnitsInStock: 45,
                        UnitsOnOrder: 20,
                        ReorderLevel: 10
                    },
                    {
                        ProductID: "P002",
                        Name: "Wireless Mouse",
                        Category: "Accessories",
                        Price: 29.99,
                        Currency: "USD",
                        Supplier: "Peripheral Inc",
                        Status: "Available",
                        Description: "Ergonomic wireless mouse with precision tracking.",
                        UnitsInStock: 150,
                        UnitsOnOrder: 50,
                        ReorderLevel: 30
                    },
                    {
                        ProductID: "P003",
                        Name: "Mechanical Keyboard",
                        Category: "Accessories",
                        Price: 89.99,
                        Currency: "USD",
                        Supplier: "KeyTech Ltd",
                        Status: "Available",
                        Description: "Premium mechanical keyboard with RGB lighting.",
                        UnitsInStock: 80,
                        UnitsOnOrder: 30,
                        ReorderLevel: 20
                    },
                    {
                        ProductID: "P004",
                        Name: "27-inch Monitor",
                        Category: "Electronics",
                        Price: 349.99,
                        Currency: "USD",
                        Supplier: "Display Solutions",
                        Status: "Low Stock",
                        Description: "4K UHD monitor with HDR support and adjustable stand.",
                        UnitsInStock: 8,
                        UnitsOnOrder: 25,
                        ReorderLevel: 10
                    },
                    {
                        ProductID: "P005",
                        Name: "USB-C Hub",
                        Category: "Accessories",
                        Price: 49.99,
                        Currency: "USD",
                        Supplier: "Connect Pro",
                        Status: "Available",
                        Description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.",
                        UnitsInStock: 120,
                        UnitsOnOrder: 0,
                        ReorderLevel: 25
                    },
                    {
                        ProductID: "P006",
                        Name: "Noise-Cancelling Headphones",
                        Category: "Audio",
                        Price: 199.99,
                        Currency: "USD",
                        Supplier: "Audio Masters",
                        Status: "Available",
                        Description: "Premium wireless headphones with active noise cancellation.",
                        UnitsInStock: 60,
                        UnitsOnOrder: 40,
                        ReorderLevel: 15
                    }
                ]
            };

            // Set the model
            var oModel = new JSONModel(oData);
            this.getView().setModel(oModel);

            // Select the first item by default
            var oList = this.byId("masterList");
            oList.attachEventOnce("updateFinished", function() {
                var aItems = oList.getItems();
                if (aItems.length > 0) {
                    oList.setSelectedItem(aItems[0]);
                    this._showDetail(aItems[0]);
                }
            }, this);
        },

        onSelectionChange: function (oEvent) {
            var oItem = oEvent.getParameter("listItem") || oEvent.getSource();
            this._showDetail(oItem);
        },

        _showDetail: function (oItem) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oContext = oItem.getBindingContext();
            var sPath = oContext.getPath();
            var sProductId = oContext.getProperty("ProductID");
            
            oRouter.navTo("detail", {
                productPath: encodeURIComponent(sPath.substr(1))
            });
        }
    });
});