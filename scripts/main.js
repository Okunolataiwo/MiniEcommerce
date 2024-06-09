let number = document.querySelector('.number');
let addButton = document.querySelectorAll('.add');
let cart = document.querySelector('.icons');
let plusBtn = document.querySelectorAll('.plusBtn');
let minusBtn = document.querySelectorAll('.minusBtn');
let increaseBtn = document.querySelectorAll('.increase');
let increased = document.querySelectorAll('.increased');
let sideBar = document.querySelector('.container');
let dataSet = document.querySelectorAll('[data-id]');
let dataName = document.querySelectorAll('[data-name]');
let search = document.querySelector('.search');
let bar = document.querySelector('.bar');
let subnav = document.querySelector('.subnav');
let inputHolder = document.querySelector('.input');
let options = document.querySelectorAll(".options");
let items = document.querySelectorAll(".items");
// let datafilter = document.querySelectorAll("[data-filter");

search.addEventListener('keyup', (e) => {
    e.preventDefault();
    items = document.querySelectorAll(".item");
    let value = search.value.toLowerCase().trim();
    console.log(value);

    items.forEach((item)=>{
        let filtered = item.dataset.name;
        if(filtered == value){
            item.style.display = 'flex';
        } else if(value == "") {
            item.style.display = 'flex';
        } else{
            item.style.display = 'none';
        }
    })
        
})
options.forEach((option)=>{
    option.addEventListener('click', ()=>{
        let filtered = option.dataset.filter;
        // console.log(filtered);
        options.forEach((option)=>{
            option.classList.remove('active');
        })
        option.classList.add('active');

        items = document.querySelectorAll(".item");
        // console.log(items);
        items.forEach((item)=>{
            if(filtered == "all") {
                // console.log('yes');
                item.style.display = 'flex';
            } else{
                if(item.dataset.name == filtered) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            }
        })
    });
})

// console.log($(dataSet).attr("data-id"));
number.textContent = 0;
let count = 0;

bar.addEventListener('click', () => {
    subnav.classList.toggle('active');
    inputHolder.classList.toggle('active');

})


function change() {
    let circle = document.querySelector('.circle');
    number = document.querySelector('.number');
    count++;
    circle.style.display = 'flex';
    number.textContent = Number(count);
    this.nextElementSibling.style.display = "flex";
    this.style.display = "none";
    let h1 = $('.container').find('h1');
    $(h1).text('You Ordered for');

}
addButton.forEach((el) => {
    el.addEventListener('click', change);
    el.addEventListener('click', createSideBar)
});

// plusBtn.forEach((el) => {
//     el.addEventListener('click', () => {
//         $(el).siblings(".minusBtn").prop({ disabled: false })
//         let value = Number(el.previousElementSibling.textContent);
//     })
// })


function increase(el) {
    let parent = $(el).parents(".item");
    let dataId = $(parent).data("id");
    let items = [...$(".item")].filter((item) => {
        return $(item).data("id") == dataId;
    })
    // let items = $(".item");
    // let filterItem = [];
    // $.each(items, (index, item) => {
    //     if ($(item).data("id") == dataId) {
    //         filterItem.push(item);
    //     }
    // })
    // console.log(filterItem);
    // let dataPrice = $(el).parents('.item').attr("data-price");
    // console.log(dataPrice);

    items.forEach(item => {
        let button = $(item).find(".plusBtn");
        $(button).siblings('.minusBtn').prop({ disabled: false });
        let value = Number($(button).siblings('.increased').text());
        $(button).siblings('.increased').text(++value);

        let actualPrice = $(item).data("price");
        let factor = $(item).find(".increased").text();
        // console.log(factor);

        $(item).find('.price').text(actualPrice * factor);


    })


}


// function equals(num) {
//     return num;
// }
function decrease(el) {

    let parent = $(el).parents(".item");
    let dataId = $(parent).data("id");
    let items = [...$(".item")].filter((item) => {
        return $(item).data("id") == dataId;
    })
    items.forEach(item => {
        let button = $(item).find(".minusBtn");
        let value = Number(button[0].nextElementSibling.textContent);
        --value;

        let actualPrice = $(item).data("price");
            console.log(actualPrice);
            let currentPrice = $(item).find(".price").text();
            // let slicedPrice = currentPrice.slice(1);
            
            // console.log(slicedPrice);
            let answer = currentPrice - actualPrice;
            // let decreasedValue = "#" + answer + ".00";
            $(item).find('.price').text(answer);
        // console.log(button, button[0]);
        if (value <= 1) {
            $(button).prop({ disabled: true })
            // button.disabled = true;
            button[0].nextElementSibling.textContent = 1;
        } else {
            button[0].nextElementSibling.textContent = value;
            


        }
    })
}

plusBtn.forEach((el) => {
    el.addEventListener('click', () => increase(el));
})
minusBtn.forEach((el) => {
    el.addEventListener('click', () => decrease(el));
})

cart.addEventListener("click", () => {
    if (number.textContent < 1) return;
    number = document.querySelector('.number');
    sideBar = document.querySelector('.container');
    sideBar.classList.toggle('active')
});


window.addEventListener('click', (event) => {
    sideBar = document.querySelector('.container');
    if (!event.target.matches('.cart')) {
        if (sideBar.classList.contains('active')) {
            sideBar.classList.remove('active');
        }
    }

    if (!event.target.matches('.bar')) {
        if (subnav.classList.contains('active')) {
            subnav.classList.remove('active');
        }
    }
    sideBar.addEventListener('click', event => event.stopPropagation());
    cart.addEventListener('click', event => event.stopPropagation());
    bar.addEventListener('click', event => event.stopPropagation());
    subnav.addEventListener('click', event => event.stopPropagation());
})

window.addEventListener('click', (event) => {
    subnav = document.querySelector('.subnav');
})


function createSideBar() {
    let mySidebar = (image, name, price, dataId, dataPrice) => `
        <div class = "item itemTemplate" data-id = "${dataId}" data-price = "${dataPrice}">
        <div class="image">
        <img src="${image}" alt="">
        </div>
    <p class="name nameTemplate">${name}</p>
    <p class="price priceTemplate">${price}</p>
    <button class="remove" onclick = "remove(this)">Remove Item</button>
            <div class="increase active">
        <button class="minusBtn" onclick = "decrease(this)"><i class="fas fa-minus"></i></button>
        <span class="increased">1</span>
        <button class="plusBtn" onclick = "increase(this)"><i class="fas fa-plus"></i></button>
            </div>
        </div>
        `
    let parent = $(this).parents(".item");
    let dataId = $(parent).attr("data-id");
    let dataPrice = $(parent).attr("data-price");
    // console.log(dataId);
    let image = parent.find("img").prop('src');
    let name = parent.find(".name").text();
    let price = parent.find(".price").text();
    $('.container').append(mySidebar(image, name, price, dataId, dataPrice));


}

function remove(el) {
    let item = document.querySelector('.item');
    number = document.querySelector('.number');
    count--;
    number.textContent = count;
    addButton = document.querySelectorAll('.add');
    addButton.forEach((el) => {
        if ($(el).parents('.item').attr('data-id') == $(item).attr("data-id")) {
            el.style.display = 'block';
            el.nextElementSibling.style.display = "none";
        }
    });
    $(el).parents('.item').remove();
    let bigContainer = $('.container');
    if ($(bigContainer).children().length == 1) {
        $(bigContainer).removeClass("active");
    }
    
    // let price = $(el).parents('.item').find('.price');
    // console.log(price);
    // $(item).find('.price').text($(item).attr('data-price'));
}


let ages = [10, 9, 8, 6, 15, 20, 17, 45, 26, 98, 102, 56, 67, 48];

let filteredAges = ages.filter(function(age){
return age
})