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
        $(litag).html('<button type="button" class="btn btn-default btn-sm" data-type="dessert" data-name="' + desserts.name + '" data-price="' + drinks.price + '">' + drinks.name + ' $' + drinks.price + "</button>").addClass("indent").find("button").addClass("order");
        $(litag).appendTo(".desserts").addClass("sides");
    }

    $(".indent button.order.btn.btn-default").click(addToCart);

    function addToCart() {
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

        if (cart.existsInCart(item) == -1) {
            cart.addItem(item);
            total += price;
            var itemHtml = $(".template").clone().removeClass("template");
            itemHtml.html("1x " + size + " " + name);
            itemHtml.attr("data-name", name);
            itemHtml.attr("data-type", type);
            itemHtml.attr("data-size", size);
            itemHtml.attr("data-price", price);
            $(".cart").append(itemHtml);
        } else {
            cart.addItem(item);
            total += price;
            $('.cart-item[data-name="' + name + '"].cart-item[data-size="' + size + '"]').html(cart.getQuantity(item) + 1 + "x " + size + " " + name);
        }
    }

});
