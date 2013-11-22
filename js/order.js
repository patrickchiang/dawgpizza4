$(function() {
    var cart = new CartModel();
    var total = 0;

    for (var i = 0; i < com.dawgpizza.menu.pizzas.length; i++) {
        var pizza = com.dawgpizza.menu.pizzas[i];

        var dltag = $("<dl></dl>");
        var dttag = $("<dt></dt>");
        var ddtag = $("<dd></dd>");

        var small = $('<button type="button" class="btn btn-default btn-sm pizzas" data-type="pizza" data-name="' + pizza.name + '" data-size="small" data-price="' + pizza.prices[0] + '">Small $' + pizza.prices[0] + "</button>").addClass("order");
        var medium = $('<button type="button" class="btn btn-default btn-sm pizzas" data-type="pizza" data-name="' + pizza.name + '" data-size="medium" data-price="' + pizza.prices[1] + '">Medium $' + pizza.prices[1] + "</button>").addClass("order");
        var large = $('<button type="button" class="btn btn-default btn-sm pizzas" data-type="pizza" data-name="' + pizza.name + '" data-size="large" data-price="' + pizza.prices[2] + '">Large $' + pizza.prices[2] + "</button>").addClass("order");
        var priceSelects = $("<ul></ul>").html(small[0].outerHTML + medium[0].outerHTML + large[0].outerHTML).addClass("indent");

        $(ddtag).html(pizza.description + " " + priceSelects[0].outerHTML);
        $(dttag).html(pizza.name);
        $(dltag).html($(dttag)[0].outerHTML + $(ddtag)[0].outerHTML).addClass("indent");
        if (pizza.vegetarian) {
            $(dltag).appendTo(".veggie");
        } else {
            $(dltag).appendTo(".meat");
        }
    }

    for (var i = 0; i < com.dawgpizza.menu.drinks.length; i++) {
        var drinks = com.dawgpizza.menu.drinks[i];
        var litag = $("<ul><li></li></ul>");
        $(litag).html('<button type="button" class="btn btn-default btn-sm" data-type="drink" data-name="' + drinks.name + '" data-price="' + drinks.price + '">' + drinks.name + ' $' + drinks.price + "</button>").addClass("indent").find("button").addClass("order");
        $(litag).appendTo(".drinks").addClass("sides");
    }

    for (var i = 0; i < com.dawgpizza.menu.desserts.length; i++) {
        var desserts = com.dawgpizza.menu.desserts[i];
        var litag = $("<ul><li></li></ul>");
        $(litag).html('<button type="button" class="btn btn-default btn-sm" data-type="dessert" data-name="' + desserts.name + '" data-price="' + drinks.price + '">' + desserts.name + ' $' + desserts.price + "</button>").addClass("indent").find("button").addClass("order");
        $(litag).appendTo(".desserts").addClass("sides");
    }

    $(".indent button.order.btn.btn-default").click(addToCart);
    $(".submit-order-btn").click(function() {
        if (total >= 20) {// before taxes
            $("#submitOrderForm").modal();
            $(".finalSubmitButton").click(submitForm);
            $(".minimum").html("");
        } else {
            $(".minimum").html("To save the environment, there is a minimum purchase of $20.");
        }
    });

    $(".clear-cart").click(function() {
        cart.clearCart();
        total = 0;
        $(".cart-item").not(".template").remove();
        $(".cart-price").html("0");
    });

    function submitForm() {
        cart.populateInfo({
            name : $(".form-name").val(),
            address1 : $(".form-line1").val(),
            address2 : $(".form-line2").val(),
            zip : $(".form-zip").val(),
            phone : $(".form-phone").val(),
            nextUrl : "http://students.washington.edu/pchiang/info343/dawgpizza4/index.html",
            nextCaption : "Back to DawgPizza"
        });
        $("#jsonForm").val(JSON.stringify(cart));
        $(".address-form").find('[type="submit"]').trigger("click");
    }

    function addToCart() {
        $(".submit-order-btn").show();

        var name = $(this).data("name");
        var type = $(this).data("type");
        var price = $(this).data("price");
        var size = "";
        if (type == "pizza") {
            size = $(this).data("size");
        }

        var item = new ItemModel({
            name : name,
            type : type,
            size : size,
            quantity : 1
        });

        if (cart.existsInCart(item) == -1) {
            cart.addItem(item);
            var itemHtml = $(".template").clone().removeClass("template");
            itemHtml.html("1x $" + price + " " + size + " " + name + "<span class=\"glyphicon glyphicon-remove\"></span>");
            itemHtml.attr("data-name", name);
            itemHtml.attr("data-type", type);
            itemHtml.attr("data-size", size);
            itemHtml.attr("data-price", price);
            $(".cart").append(itemHtml);

            $(".cart-item").unbind();
            $(".cart-item").bind("click", removeFromCart);
        } else {
            cart.addItem(item);
            var itemHtml = $('.cart-item[data-name="' + name + '"].cart-item[data-size="' + size + '"]');
            itemHtml.html(cart.getQuantity(item) + "x $" + price + " " + size + " " + name + "<span class=\"glyphicon glyphicon-remove\"></span>");
            itemHtml.attr("data-quantity", cart.getQuantity(item));
        }

        total += price;
        $(".cart-price").html(total + " +$" + (total * 0.095).toFixed(2) + "(tax) = " + (total * 1.095).toFixed(2));
    }

    function removeFromCart() {
        var name = $(this).data("name");
        var type = $(this).data("type");
        var price = $(this).data("price");
        var size = "";
        if (type == "pizza") {
            size = $(this).data("size");
        }

        var item = new ItemModel({
            name : name,
            type : type,
            size : size,
            quantity : 0
        });

        total -= price * (cart.getQuantity(item));
        $(".cart-price").html(total + " +$" + (total * 0.095).toFixed(2) + "(tax) = " + (total * 1.095).toFixed(2));

        cart.removeItem(item);
        $(this).remove();

        if (total == 0) {
            $(".submit-order-btn").hide();
        }
    }

});
