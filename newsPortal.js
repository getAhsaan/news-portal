const fetchCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => showCategories(data.data))
}
// fetchCategories();
const showCategories = data => {
    data?.news_category.forEach(singleCategory => {
        // console.log(singleCategory);
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.innerHTML += `
        <a class="nav-link" href="#" onclick="fetchCategoryNews('${singleCategory.category_id}', '${singleCategory?.category_name}' )">${singleCategory?.category_name}</a>
        `
    })
};

const fetchCategoryNews = (category_id, category_name) => {
    fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
        .then(res => res.json())
        .then(data => showCategoryNews(data.data, category_name))
};
const showCategoryNews = (data, category_name) => {
    document.getElementById('items-count').innerHTML = data.length;
    document.getElementById('category-name').innerHTML = category_name;
    const card = document.getElementById('card-container');
    card.innerHTML = '';
    data.forEach(news => {
        console.log(news);
        card.innerHTML += `

    <div class="card mb-3">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${news.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${news.title}</h5>
                <p class="card-text">${news.details.slice(0, 200)}...</p>
                <div class="d-flex align-items-center gap-3">
                    <img class="rounded-circle" height="40" width="40" src="${news.author.img}">
                    <div>
                    <span>${news.author.name ? news.author.name : 'Anonymous'}</span> <br>
                    <span>${news.author.published_date.slice(0, 10)}</span>
                    </div>
                    <div>
                    <i class="fa-solid fa-eye"></i> <span>${news.total_view ? news.total_view : '0'}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    `
    })
};
