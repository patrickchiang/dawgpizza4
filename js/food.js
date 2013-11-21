$(function() {
    for (var i = 0; i < com.dawgpizza.menu.pizzas.length; i++) {
        var pizza = com.dawgpizza.menu.pizzas[i];

        var dltag = $("<dl></dl>");
        var dttag = $("<dt></dt>");
        var ddtag = $("<dd></dd>");

        $(ddtag).html(pizza.description + " $" + pizza.prices[0] + "/$" + pizza.prices[1] + "/$" + pizza.prices[2]);
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
        $(litag).html(drinks.name + " ($" + drinks.price + ")");
        $(litag).appendTo(".drinks").addClass("indent").addClass("sides");
    }

    for (var i = 0; i < com.dawgpizza.menu.desserts.length; i++) {
        var desserts = com.dawgpizza.menu.desserts[i];
        var litag = $("<ul><li></li></ul>");
        $(litag).html(desserts.name + " ($" + desserts.price + ")");
        $(litag).appendTo(".desserts").addClass("indent").addClass("sides");
    }
});
