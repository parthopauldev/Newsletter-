let getElement = (id) => document.getElementById(id);


// nav categories load 
let loadData = async (showContainer) => {
  let data = await fetch('https://news-api-fs.vercel.app/api/categories');
  let useableDatas = await data.json();
  allData=useableDatas.categories
  showData(allData,showContainer)
  

};
// news by categories load 
let loadNewsByCategories = async (id) => {
  let data = await fetch(`https://news-api-fs.vercel.app/api/categories/${id}`);
  let newsDatas = await data.json();
  let allNews=newsDatas.articles;
  showNewsByCategories(allNews)

  
  
  

};
// nav item show feature
let showData = (useableDatas, showContainer) => {
  showContainer.innerHTML = " ";

  useableDatas.forEach((item) => {
    
    showContainer.innerHTML += `
        <a id='${item.id}' class='hover:border-b-2 pb-[10px] hover:border-b[red]' href="#">${item.title}</a>

        `;
  });
  let firstNavItem=getElement('main');
firstNavItem.classList.add('active')
};

let showNewsByCategories=(allNews)=>{
    let newsContainer=getElement('news-container') ;
    newsContainer.innerHTML=' ';
    allNews.forEach(news => {
      
        
        newsContainer.innerHTML +=`
        <div class="w-[300px] h-[350px] p-[20px] pb-[20px] bg-[#efecec]">
    <img class='w-full h-[150px] mb-[10px]' src="${news.image.srcset[1].url}" alt="">
    <h2 class=' font-bold mb-[10px] '>${news.title}</h2>
    <h2 class=' mb-[10px] '>${news.time}</h2>
<button  onclick="bookmark('${news.image.srcset[1].url}','${news.title}','${news.time}','${news.id}',)" class="btn">Bookmark</button>
</div>
        `
    });
}
//get nav containeter 
let navContainer = getElement("nav-links-box");
// called nav item loaddata function
   loadData(navContainer);




// nav item active status add and remove feature
navContainer.addEventListener("click", (e) => {
  let allNavItem = navContainer.querySelectorAll("a");

  // remove active class
  allNavItem.forEach((item) => {
    item.classList.remove("active");
  });

  // add class
  if (e.target.localName === "a") {

    loadNewsByCategories(e.target.id)
    e.target.classList.add("active");
  }
});

loadNewsByCategories('main')
// bookmark feature 
let bookmark=(img,title,time,id)=>{
let bookmarkContainer=getElement('bookmark');
console.log(id);


let allBookmark=bookmarkContainer.children;
let allId=[22]
for (const element of allBookmark) {
let id= element.getAttribute('id');
    allId.push(id)

}
console.log(allId);
if (allId.includes(id)) {
    
   
}else{
    
    
    bookmarkContainer.innerHTML +=`
    
    <div id='${id}' class="w-[300px]  p-[20px] pb-[20px] bg-[#efecec]">
    <img class='w-full h-[150px] mb-[10px]' src="${img}" alt="">
    <h2 class=' font-bold mb-[10px] '>${title}</h2>
    <h2 class=' mb-[10px] '>${time}</h2>
    <button onclick="removeBookmark('${id}',)" class="btn">Remove</button>
    `
}
}
// remove bookmark feature 
let removeBookmark=id=>{
  let removeItem=getElement(id) ;
  removeItem.remove()
  console.log('fvfv'+removeItem);
  console.log(id);
  
  
}
