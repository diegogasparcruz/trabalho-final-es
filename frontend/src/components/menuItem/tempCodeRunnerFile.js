 var menuContainer = document.getElementById("menu-container");

        var items = menuContainer.getElementsByClassName("row");

        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("click", function () {
                var current = document.getElementsByClassName("text-white");

                if (current.length > 0) {
                    current[0].className = current[0].className.replace(" text-white", " text-secondary");
                }

                this.classList.add("text-white")
                this.classList.remove("text-secondary")
            });
        }