function ItemModel(input) {
    var type = input.type;
    var name = input.name;
    var quantity = input.quantity;
    var size = input.size;
}

function CartModel() {

    this.items = [];
    this.name = "";
    this.address1 = "";
    this.address2 = "";
    this.zip = "";
    this.phone = "";
    this.nextUrl = "";
    this.nextCaption = "";

    this.clearCart = function() {
        items = [];
    };

    this.populateInfo = function(input) {
        this.name = input.name;
        this.address1 = input.address1;
        this.address2 = input.address2;
        this.zip = input.zip;
        this.phone = input.phone;
        this.nextUrl = input.nextUrl;
        this.nextCaption = input.nextCaption;
    };

    this.addItem = function(item) {
        if (existsInCart(item) > -1) {
            
        } else {
            this.items.push(item);
        }
    };

    this.existsInCart = function(item) {
        for (var i = 0; i < items.length; i++) {
            if (this.items[i].name == item.name && this.items[i].size == item.size) {
                return i;
            }
        }
        return -1;
    };

    this.removeItem = function(item) {
        var index = this.items.indexOf(item);
        if (index > -1) {
            this.items.splice(index, 1);
        }
    };
}
