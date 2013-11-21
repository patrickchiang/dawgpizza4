$(function() {
    for (var i = 0; i < com.dawgpizza.menu.pizzas.length; i++) {
        var pizza = com.dawgpizza.menu.pizzas[i];

        var dltag = $("<dl></dl>");
        var dttag = $("<dt></dt>");
        var ddtag = $("<dd></dd>");

        var small = $("<li></li>").html("Small: $" + pizza.prices[0]);
        var medium = $("<li></li>").html("Medium: $" + pizza.prices[1]);
        var large = $("<li></li>").html("Large: $" + pizza.prices[2]);
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
        $(litag).html(drinks.name + " $" + drinks.price + "");
        $(litag).appendTo(".drinks").addClass("indent").addClass("sides");
    }

    for (var i = 0; i < com.dawgpizza.menu.desserts.length; i++) {
        var desserts = com.dawgpizza.menu.desserts[i];
        var litag = $("<ul><li></li></ul>");
        $(litag).html(desserts.name + " $" + desserts.price + "");
        $(litag).appendTo(".desserts").addClass("indent").addClass("sides");
    }
});
