document.addEventListener("DOMContentLoaded", function () {

    const app = document.querySelector(".app");

    let products = [];
    let page = 1;

    const fetchProducts = async () => {
        try {
            const res = await fetch("https://dummyjson.com/products?limit=100");
            const data = await res.json();

            if(data && data.products) {
                products = data.products;
                render();

                console.log(products);
            }

        } 
        catch (error) {
            console.log("Error fetching products : ", error);
        }
    };



    const render = () => {
        const productsContainer = document.createElement("div");
        productsContainer.classList.add("products");

        const pagination = document.createElement("div");
            pagination.classList.add("pagination");

        if(products.length > 0) {
            let eachPage = products.slice(page * 10 - 10, page * 10);
            eachPage.forEach((product) => {
                const productElement = document.createElement("div");
                productElement.classList.add("products__single");

                productElement.innerHTML = `
                    <img src="${product.thumbnail}" alt="${product.title}" />
                    <span>${product.title}</span>
                `;

                productsContainer.appendChild(productElement);
            });


            

            // for prev button
            if(page > 1) {
                const prevButton = createPaginationButton("⏮️", () => {
                    selectPageHandler(page - 1);
                });
                pagination.appendChild(prevButton);
            }


            //for middle numbers
            for(let i=0; i<products.length / 10; i++) {
                const pageButton = createPaginationButton(i+1, () => {
                        selectPageHandler(page + 1);
                    },
                    page === i+1
                );
                pagination.appendChild(pageButton);
            }


            // for next button
            if(page < products.length / 10) {
                const nextButton = createPaginationButton("⏭️", () => {
                    selectPageHandler(page + 1);
                });
                pagination.appendChild(nextButton);
            }

        };


        app.innerHTML = ""

        app.appendChild(productsContainer);
        app.appendChild(pagination);

        const pageNo = document.createElement("span");
        pageNo.innerText = page;
        pageNo.classList.add("page-no");

        app.appendChild(pageNo);
    };


    const createPaginationButton = (text, clickHandler, isSelected = false) => {
        const button = document.createElement("button");
        button.innerText = text;
        button.addEventListener("click", clickHandler);

        if(isSelected) {
            button.classList.add("pagination_selected");
        }

        return button;
    }   


    const selectPageHandler = (seletedPage) => {
        if(seletedPage >= 1 && seletedPage <= products.length / 10 && seletedPage != page) {
            page = seletedPage;
            render();
        }
    }

    

    fetchProducts();
})