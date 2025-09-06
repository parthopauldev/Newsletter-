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
  try {
  
    getElement('news-container').innerText='loading ...'
    let data = await fetch(`https://news-api-fs.vercel.app/api/categories/${id}`);
    let newsDatas = await data.json();
    let allNews=newsDatas.articles;
   
      showNewsByCategories(allNews)
      
   
} catch (err) {
 error()
 alert('wrong')
} 

  
  
  

};

// news details load function 
let viewDetails=async(id)=>{
let data=await fetch(`https://news-api-fs.vercel.app/api/news/${id}`)
let Details=await data.json();
let allDetails=Details.article

showNewsDetails(allDetails)

}
// showNewsDetails feature 
let showNewsDetails=(news)=>{
  console.log(news);
  
  let modulContainer=getElement('my_modal_5') ;
  modulContainer.innerHTML=` <div class="modal-box">
  <h3 class="text-[24px] mb-[20px] font-bold">${news.title}</h3>
   <img class='w-full h-[150px] mb-[10px]' src="${news.images[1].url}" alt="">
  <h3 class=" ">${news.content}</h3>
  
    <div class="modal-action">
     
         <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>`
  modulContainer.showModal()
}
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

let newsContainer=getElement('news-container') ;
let showNewsByCategories=(allNews)=>{
console.log(allNews);

  if (allNews.length === 0) {
    showEmtyMessage()
    return
  }

    newsContainer.innerHTML=' ';
    allNews.forEach(news => {
      
        
        newsContainer.innerHTML +=`
        <div class="w-[300px] min-h-[350px] p-[20px] pb-[20px] bg-[#efecec]">
    <img class='w-full h-[150px] mb-[10px]' src="${news.image.srcset[1].url}" alt="">
    <h2 class=' font-bold mb-[10px] '>${news.title}</h2>
    <h2 class=' mb-[10px] '>${news.time}</h2>
    <div class ='flex justify-between'>
    <button  class ='mb-[10px] btn' onclick="bookmark('${news.image.srcset[1].url}','${news.title}','${news.time}','${news.id}',)">Bookmark</button>
    <button onclick="viewDetails('${news.id}')" class ='mb-[10px] btn'>View Details</button>
    </div>

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
let bookmarkContainer=getElement('bookmark');
let bookmark=(img,title,time,id)=>{
console.log(id);


let allBookmark=bookmarkContainer.children;
let allId=[]
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
     <div class ='flex justify-between'>
    <button onclick="removeBookmark('${id}',)" class="btn">Remove</button>
    <button onclick="viewDetails('${id}')" class ='mb-[10px] btn'>View Details</button>
     </div>
      </div>
    `
}
bookmarkcount()
}
// remove bookmark feature 
let removeBookmark=id=>{
  let removeItem=getElement(id) ;
  removeItem.remove()
  console.log('fvfv'+removeItem);
  console.log(id);
  bookmarkcount()
  
}
let bookmarkcount=()=>{
  
  let bookmarkItem=bookmarkContainer.children
  let bookmarkNumber=getElement('bookmark-count') ;
  bookmarkNumber.innerText=bookmarkItem.length -1;
  console.log(bookmarkItem.length);
  
}
let error=()=>{
newsContainer.innerText='Something Went Wrong'
}
let showEmtyMessage=()=>{
  newsContainer.innerText='News Not Found'

}


